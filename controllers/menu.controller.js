const httpStatus = require('http-status');
const { catchAsync, createResponse } = require('../utils/catchAsync');

// const getMenuRecursive = async (menuId) => {
//   const menu = await Menu.findById(menuId).exec();
  
//   if (!menu) return null;

//   // Check if the current menu ID is in roleMenu
//   //const hasAccess = roleMenu.includes(menuId);

//   // Recursively get children and determine their access status
//   const children = await Promise.all(menu.children.map(childId => getMenuRecursive(childId)));

//   // Determine if any child has access
//   const childHasAccess = children.some(child => child && child.hasAccess);

//   return {
//     ...menu.toObject(),
//     hasAccess: hasAccess || childHasAccess,
//     children: children.filter(child => child !== null),
//   };
// };

const getMenu = async (req, res, next) => {
  try {
    // Get root menus based on roleMenu
    //const rootMenus = await Menu.find({ parentId: null }).exec();
    //console.log(rootMenus);
    //const menus = await Promise.all(rootMenus.map(menu => getMenuRecursive(menu._id)));
    res.status(200).json({
      status: 200,
      message: 'Get menu success',
      data: [
        {
          "redirect": "",
          "_id": "66d9cf8c0355198b6706f818",
          "type": 1,
          "path": "/dashboard",
          "name": "Dashboard",
          "component": "/Home/index",
          "meta": {
            "icon": "ep:home-filled",
            "title": "Dashboard",
            "isLink": "",
            "isHide": false,
            "isFull": false,
            "isKeepAlive": "true",
            "isAffix": true
          },
          "parentId": null,
          "children": [],
          "__v": 0,
          "hasAccess": true
        },
        {
          "_id": "66d9cfee0355198b6706f81b",
          "type": 0,
          "path": "/system",
          "name": "SystemManagement",
          "component": "",
          "meta": {
            "icon": "ep:setting",
            "title": "System Management",
            "isLink": "",
            "isHide": false,
            "isFull": false,
            "isKeepAlive": "true",
            "isAffix": false
          },
          "parentId": null,
          "children": [
            {
              "redirect": "",
              "_id": "66d9dfcf86286a3f652a5d8b",
              "type": 1,
              "path": "/admin-user/list",
              "name": "AdminUser",
              "component": "/adminUser/index",
              "meta": {
                "icon": "ep:user",
                "title": "Admin user",
                "isLink": "",
                "isHide": false,
                "isFull": false,
                "isKeepAlive": "true",
                "isAffix": false
              },
              "parentId": "66d9cfee0355198b6706f81b",
              "children": [],
              "__v": 0,
              "hasAccess": true
            },
            {
              "redirect": "",
              "_id": "66d9e04e86286a3f652a5dc5",
              "type": 1,
              "path": "/admin-user/add",
              "name": "AddUser",
              "component": "/adminUser/addUser",
              "meta": {
                "icon": "ep:list",
                "title": "Add User",
                "isLink": "",
                "isHide": true,
                "isFull": false,
                "isKeepAlive": "true",
                "isAffix": false
              },
              "parentId": "66d9cfee0355198b6706f81b",
              "children": [],
              "__v": 0,
              "hasAccess": true
            },
            {
              "redirect": "",
              "_id": "66d9e20086286a3f652a5e34",
              "type": 1,
              "path": "/admin-user/edit/:id",
              "name": "editAdminUser",
              "component": "/adminUser/addUser",
              "meta": {
                "icon": "ep:list",
                "title": "Edit User",
                "isLink": "",
                "isHide": true,
                "isFull": false,
                "isKeepAlive": "true",
                "isAffix": false
              },
              "parentId": "66d9cfee0355198b6706f81b",
              "children": [],
              "__v": 0,
              "hasAccess": true
            },
            {
              "redirect": "",
              "_id": "66d9e2f186286a3f652a5ea1",
              "type": 0,
              "path": "/components",
              "name": "Components",
              "component": "",
              "meta": {
                "icon": "ep:postcard",
                "title": "Components",
                "isLink": "",
                "isHide": false,
                "isFull": false,
                "isKeepAlive": "true",
                "isAffix": false
              },
              "parentId": "66d9cfee0355198b6706f81b",
              "children": [
                {
                  "redirect": "",
                  "_id": "66d9e40186286a3f652a5ee3",
                  "type": 1,
                  "path": "/components/button",
                  "name": "Button",
                  "component": "/components/button/index",
                  "meta": {
                    "icon": "ep:set-up",
                    "title": "Component Button",
                    "isLink": "",
                    "isHide": false,
                    "isFull": false,
                    "isKeepAlive": "true",
                    "isAffix": false
                  },
                  "parentId": "66d9e2f186286a3f652a5ea1",
                  "children": [],
                  "__v": 0,
                  "hasAccess": true
                },
                {
                  "redirect": "",
                  "_id": "66d9e44886286a3f652a5f14",
                  "type": 0,
                  "path": "/components/table",
                  "name": "Table",
                  "component": "",
                  "meta": {
                    "icon": "ant-design:table-outlined",
                    "title": "Table",
                    "isLink": "",
                    "isHide": false,
                    "isFull": false,
                    "isKeepAlive": "true",
                    "isAffix": false
                  },
                  "parentId": "66d9e2f186286a3f652a5ea1",
                  "children": [
                    {
                      "redirect": "",
                      "_id": "66d9e4bb86286a3f652a5f3c",
                      "type": 1,
                      "path": "/components/table-basic",
                      "name": "TableBasic",
                      "component": "/components/table/index",
                      "meta": {
                        "icon": "tdesign:table-add",
                        "title": "Table Basic",
                        "isLink": "",
                        "isHide": false,
                        "isFull": false,
                        "isKeepAlive": "true",
                        "isAffix": false
                      },
                      "parentId": "66d9e44886286a3f652a5f14",
                      "children": [],
                      "__v": 0,
                      "hasAccess": true
                    },
                    {
                      "redirect": "",
                      "_id": "66d9e52b86286a3f652a5f73",
                      "type": 1,
                      "path": "/table/useTableDemo",
                      "name": "UseTableDemo",
                      "component": "/components/table/useTableDemo",
                      "meta": {
                        "icon": "mdi:table-minus",
                        "title": "UseTable",
                        "isLink": "",
                        "isHide": false,
                        "isFull": false,
                        "isKeepAlive": "true",
                        "isAffix": false
                      },
                      "parentId": "66d9e44886286a3f652a5f14",
                      "children": [],
                      "__v": 0,
                      "hasAccess": true
                    }
                  ],
                  "__v": 0,
                  "hasAccess": true
                },
                {
                  "redirect": "",
                  "_id": "66d9e58986286a3f652a5fad",
                  "type": 1,
                  "path": "/components/count-to",
                  "name": "CountTo",
                  "component": "/components/count-to/index",
                  "meta": {
                    "icon": "fluent:text-word-count-24-regular",
                    "title": "Count To",
                    "isLink": "",
                    "isHide": false,
                    "isFull": false,
                    "isKeepAlive": "true",
                    "isAffix": false
                  },
                  "parentId": "66d9e2f186286a3f652a5ea1",
                  "children": [],
                  "__v": 0,
                  "hasAccess": true
                }
              ],
              "__v": 0,
              "hasAccess": true
            },
            {
              "_id": "66e1c0a0fe8ed5299c1bc993",
              "type": 0,
              "path": "/menu",
              "name": "Menu List",
              "component": "",
              "meta": {
                "icon": "ep:menu",
                "title": "Menu Management",
                "isLink": "",
                "isHide": false,
                "isFull": false,
                "isAffix": false,
                "isKeepAlive": "false"
              },
              "parentId": "66d9cfee0355198b6706f81b",
              "children": [
                {
                  "redirect": "",
                  "_id": "66e1c1b9fe8ed5299c1bc9f1",
                  "type": 1,
                  "path": "/menu/list",
                  "name": "MenuList",
                  "component": "/menu/index",
                  "meta": {
                    "icon": "",
                    "title": "Menu list",
                    "isLink": "",
                    "isHide": false,
                    "isFull": false,
                    "isAffix": false,
                    "isKeepAlive": "false"
                  },
                  "parentId": "66e1c0a0fe8ed5299c1bc993",
                  "children": [],
                  "__v": 0,
                  "hasAccess": true
                },
                {
                  "_id": "66d9df6b86286a3f652a5d73",
                  "type": 1,
                  "path": "/menu/add",
                  "name": "AddMenu",
                  "component": "/menu/add",
                  "meta": {
                    "icon": "ep:menu",
                    "title": "Add menu",
                    "isLink": "false",
                    "isHide": true,
                    "isFull": false,
                    "isKeepAlive": "true",
                    "isAffix": false
                  },
                  "parentId": "66e1c0a0fe8ed5299c1bc993",
                  "children": [],
                  "__v": 0,
                  "redirect": "",
                  "hasAccess": true
                },
                {
                  "_id": "66e05fa360c236f3f7e2a242",
                  "type": 1,
                  "path": "/menu/edit/:id",
                  "name": "EditMenu",
                  "component": "/menu/add",
                  "meta": {
                    "icon": "",
                    "title": "Edit Menu",
                    "isLink": "false",
                    "isHide": true,
                    "isFull": false,
                    "isAffix": false,
                    "isKeepAlive": "false"
                  },
                  "parentId": "66e1c0a0fe8ed5299c1bc993",
                  "children": [],
                  "__v": 0,
                  "redirect": "",
                  "hasAccess": true
                }
              ],
              "__v": 0,
              "redirect": "/menu/list",
              "hasAccess": true
            },
            {
              "_id": "66e5174df2bf801f7a8c661b",
              "type": 1,
              "path": "/role",
              "name": "RoleManagement",
              "component": "/system/role/index",
              "meta": {
                "icon": "eos-icons:role-binding",
                "title": "Role Management",
                "isLink": "",
                "isHide": false,
                "isFull": false,
                "isAffix": false,
                "isKeepAlive": "false"
              },
              "parentId": "66d9cfee0355198b6706f81b",
              "children": [],
              "redirect": "",
              "__v": 0,
              "hasAccess": true
            },
            {
              "_id": "66e6e385757e99af3e471985",
              "type": 1,
              "path": "/role/edit/:id",
              "name": "EditRole",
              "component": "/system/role/add",
              "meta": {
                "icon": "",
                "title": "Edit Role",
                "isLink": "",
                "isHide": true,
                "isFull": false,
                "isAffix": false,
                "isKeepAlive": "false"
              },
              "parentId": "66d9cfee0355198b6706f81b",
              "children": [],
              "redirect": "",
              "__v": 0,
              "hasAccess": true
            },
            {
              "_id": "66e51890f2bf801f7a8c6646",
              "type": 1,
              "path": "/role/add",
              "name": "AddRole ",
              "component": "/system/role/add",
              "meta": {
                "icon": "",
                "title": "Add Role ",
                "isLink": "",
                "isHide": true,
                "isFull": false,
                "isAffix": false,
                "isKeepAlive": "false"
              },
              "parentId": "66d9cfee0355198b6706f81b",
              "children": [],
              "redirect": "",
              "__v": 0,
              "hasAccess": true
            }
          ],
          "__v": 0,
          "redirect": "/menu",
          "hasAccess": true
        },
        {
          "redirect": "",
          "_id": "66d9e2a286286a3f652a5e84",
          "type": 1,
          "path": "/profile",
          "name": "Profile",
          "component": "/Profile/index",
          "meta": {
            "icon": "",
            "title": "Profile",
            "isLink": "",
            "isHide": true,
            "isFull": false,
            "isKeepAlive": "true",
            "isAffix": false
          },
          "parentId": null,
          "children": [],
          "__v": 0,
          "hasAccess": true
        },
        {
          "redirect": "",
          "_id": "66e1b874fe8ed5299c1bc58f",
          "type": 1,
          "path": "/safe",
          "name": "Safe",
          "component": "/safe/index",
          "meta": {
            "icon": "ep:trend-charts",
            "title": "Safe",
            "isLink": "",
            "isHide": false,
            "isFull": false,
            "isAffix": false,
            "isKeepAlive": "false"
          },
          "parentId": null,
          "children": [],
          "__v": 0,
          "hasAccess": true
        }
      ]
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

module.exports = { 
  getMenu
}