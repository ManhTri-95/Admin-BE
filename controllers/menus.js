const mongoose = require('mongoose');

const Menu = require('../models/menu');

const getMenuRecursive = async (menuId) => {
  const menu = await Menu.findById(menuId).exec();
  
  if (!menu) return null;

  const children = await Promise.all(menu.children.map(childId => getMenuRecursive(childId)));
  
  return {
    ...menu.toObject(),
    children: children.filter(child => child !== null),
  };
};

exports.getMenu = async (req, res, next) => {
  try {
    const rootMenus = await Menu.find({ parentId: null }).exec();
    
    const menus = await Promise.all(rootMenus.map(menu => getMenuRecursive(menu._id)));

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
  const { type, parentId, title, component, name, icon, path, isLink, isHide, isFull } = req.body;
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