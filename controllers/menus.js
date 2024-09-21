const mongoose = require('mongoose');

const Menu = require('../models/menu');
const User = require('../models/user');
const Role = require('../models/roles');

const { createResponse } = require('../utils/responseHelper');

const getMenuRecursive = async (menuId, roleMenu) => {
  const menu = await Menu.findById(menuId).exec();
  
  if (!menu) return null;

  // Check if the current menu ID is in roleMenu
  const hasAccess = roleMenu.includes(menuId);

  // Recursively get children and determine their access status
  const children = await Promise.all(menu.children.map(childId => getMenuRecursive(childId, roleMenu)));

  // Determine if any child has access
  const childHasAccess = children.some(child => child && child.hasAccess);

  return {
    ...menu.toObject(),
    hasAccess: hasAccess || childHasAccess,
    children: children.filter(child => child !== null),
  };
};

exports.getMenu = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const role = await Role.findById(user.role);
    if (!role) {
      const error = new Error('Cannot find role');
      error.statusCode = 404;
      throw error;
    }

    // Get root menus based on roleMenu
    const rootMenus = await Menu.find({ parentId: null }).exec();
    
    // Process each root menu to include access information
    const menus = await Promise.all(rootMenus.map(menu => getMenuRecursive(menu._id, role.roleMenu)));

    res.status(200).json({
      status: 200,
      message: 'Get menu success',
      data: menus,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};


exports.postAddMenu = async (req, res, next) => {
  const { type, parentId, title, component, name, icon, path, isLink, isHide, isFull, isAffix, isKeepAlive } = req.body;
  try {
    const newParentId = parentId === -1 ? null : parentId; 

    const menu = new Menu({
      type: type,
      parentId: newParentId,
      component: component,
      name: name,
      path: path,
      meta: {
        icon: icon,
        title: title, 
        isLink: isLink,
        isHide: isHide,
        isFull: isFull,
        isAffix: isAffix,
        isKeepAlive: isKeepAlive
      }
    })

    const savedMenu = await menu.save();

    if(newParentId) {
      const parentMenu = await Menu.findByIdAndUpdate(
        newParentId, {
        $push: { children: savedMenu._id } ,
      });

      if (parentMenu && !parentMenu.redirect) {
        parentMenu.redirect = path;
        await parentMenu.save(); 
      }
    }

    res.status(200).json({ 
      status: 200,
      message: 'Add menu success',
    });
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.postDeleteMenu = async (req, res, next) => {
  const idsToDelete = req.body || [];
  try {
    if(!Array.isArray(idsToDelete) || idsToDelete.length === 0) {
      const error = new Error('Invalid user ID');
      error.statusCode = 400;
      throw error;
    }

    const objectIdArray = idsToDelete.map(id => {
      try {
        return new mongoose.Types.ObjectId(id);
      } catch (err) {
        throw new Error('Invalid ID format');
      }
    });

    // Find all menus to delete
    const menusToDelete = await Menu.find({ _id: { $in: objectIdArray } });

    const result = await Menu.deleteMany({ _id: { $in: objectIdArray } });

    if (result.deletedCount === 0) {
      const error = new Error('No users found to delete');
      error.statusCode = 404;
      throw error;
    }

    // Update parent menu: remove child menu ObjectId from `children` array
    for (const menu of menusToDelete) {
      if (menu.parentId) {
        await Menu.findByIdAndDelete(
          menu.parentId,
          { $pull: { children: menu._id } } // Remove children from children array
        )
      }
    }

    res.status(200).json(createResponse(
      200,
      'Delete menu success!',
      {
        deletedCount: result.deletedCount
      }
    ))
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.getMenuItemDetail = async (req, res, next) => {
  const menuId = req.query.id;
  try {
    const menuItem = await Menu.findById(menuId);
    if (!menuItem) {
      const error = new Error('Cannot find menu item');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(createResponse(
      200,
      'Get menu item success!',
      {
        menu_item: menuItem
      }
    ))
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.putEditMenu = async (req, res, next) => {
  const { id, type, parentId, title, component, name, icon, path, isLink, isHide, isFull, isAffix, isKeepAlive }= req.body;
  try {
    const menu = await Menu.findById(id);
    if(!menu) {
      const error = new Error('Cannot find menu');
      error.statusCode = 404;
      throw error;
    }

    const oldParentId = menu.parentId;

    menu.type = type;
    menu.parentId = parentId === -1 ? null : parentId;
    menu.component = component;
    menu.name = name;
    menu.path = path;
    menu.meta.icon = icon;
    menu.meta.title = title;
    menu.meta.isLink = isLink;
    menu.meta.isHide = isHide;
    menu.meta.isFull = isFull;
    menu.meta.isAffix = isAffix;
    menu.meta.isKeepAlive = isKeepAlive
    await menu.save();

    // If `parentId` has changed, update old parent menu and new parent menu
    if (oldParentId && oldParentId !== menu.parentId) {
      // Remove `menu._id` from the `children` array of the old parent menu
      await Menu.findByIdAndUpdate(
        oldParentId,
        { $pull: { children: menu._id } }
      );
    }

    // Add `menu._id` to the `children` array of the new parent menu
    if (menu.parentId) {
      await Menu.findByIdAndUpdate(
        menu.parentId,
        { $addToSet: { children: menu._id }} // Use $addToSet to avoid duplicates
      )
    }

    res.status(200).json(createResponse(
      200,
      'Update menu success!',
    ));
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}