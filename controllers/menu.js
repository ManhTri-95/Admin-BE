exports.getMenu = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 200,
      message: 'Get menu list success',
      data:  [
        {
          "path": "/dashboard",
          "name": "Dashboard",
          "component": "/Home/index",
          "meta": {
            "icon": "ep:home-filled",
            "title": "Dashboard",
            "isLink": "",
            "isHide": false,
            "isFull": false,
            "isAffix": true,
            "isKeepAlive": true
          }
        },
        {
          "path": "/admin-user",
          "name": "AdminUser",
          "redirect": "/admin-user/list",
          "meta": { 
            "icon": "ep:user",
            "title": "Admin user",
            "isLink": "",
            "isHide": false,
            "isFull": false,
            "isAffix": false,
            "isKeepAlive": true
          },
          "children": [
            {
              "path": "/admin-user/list",
              "name": "ListUser",
              "component": "/adminUser/index",
              "meta": {
                "icon": "ep:list",
                "title": "List User",
                "isLink": "",
                "isHide": false,
                "isFull": false,
                "isAffix": false,
                "isKeepAlive": true
              }
            },
            {
              "path": "/admin-user/detail/:id",
              "name": "detailAdminUser",
              "component": "/admin-user/UserDetail/index",
              "meta": {
                "icon": "ep:list",
                "title": "User Detail",
                "isLink": "",
                "isHide": true,
                "isFull": false,
                "isAffix": false,
                "isKeepAlive": true
              }
            },
          ]
        },
        {
          "path": "/profile",
          "name": "Profile",
          "component": "/Profile/index",
          "meta": {
            "icon": "",
            "title": "Profile",
            "isLink": "",
            "isHide": true,
            "isFull": false,
            "isAffix": false,
            "isKeepAlive": true
          }
        },
        {
          "path": "/components",
          "name": "components",
          "redirect": "/components/card-list",
          "meta": {
            "icon": "ep:postcard",
            "title": "Components",
            "isLink": "",
            "isHide": false,
            "isFull": false,
            "isAffix": false,
            "isKeepAlive": true
          },
          "children": [
            {
              "path": "/components/card-list",
              "name": "CardList",
              "component": "/components/card-list/index",
              "meta": {
                "icon": "ep:list",
                "title": "Card List",
                "isLink": "",
                "isHide": false,
                "isFull": false,
                "isAffix": false,
                "isKeepAlive": true
              }
            },
            {
              "path": "/components/button",
              "name": "Button",
              "component": "/components/button/index",
              "meta": { 
                "icon": "ep:set-up",
                "title": "Component Button",
                "isLink": "",
                "isHide": false,
                "isFull": false,
                "isAffix": false,
                "isKeepAlive": true
              }
            },
            {
              "path": "/components/table",
              "name": "Table",
              "component": "/components/table/index",
              "meta": { 
                "icon": "ant-design:table-outlined",
                "title": "Table",
                "isLink": "",
                "isHide": false,
                "isFull": false,
                "isAffix": false,
                "isKeepAlive": true
              },
              "children": [
                {
                  "path": "/components/table",
                  "name": "Table",
                  "component": "/components/table/index",
                  "meta": { 
                    "icon": "tdesign:table-add",
                    "title": "Table Basic",
                    "isLink": "",
                    "isHide": false,
                    "isFull": false,
                    "isAffix": false,
                    "isKeepAlive": true
                  },
                },
                {
                  "path": "/table/useTableDemo",
                  "name": "UseTableDemo",
                  "component": "/components/table/useTableDemo",
                  "meta": { 
                    "icon": "mdi:table-minus",
                    "title": "Expand Table",
                    "isLink": "",
                    "isHide": false,
                    "isFull": false,
                    "isAffix": false,
                    "isKeepAlive": true
                  }
                },
                // {
                //   "path": "/table/searchTable",
                //   "name": "SearchTable",
                //   "component": "/table/SearchTable",
                //   "meta": { 
                //     "icon": "teenyicons:table-solid",
                //     "title": "Search Table",
                //     "isLink": "",
                //     "isHide": false,
                //     "isFull": false,
                //     "isAffix": false,
                //     "isKeepAlive": true
                //   }
                // },
                // {
                //   "path": "/table/multipleHeader",
                //   "name": "MultipleHeader",
                //   "component": "/table/MultipleHeader",
                //   "meta": { 
                //     "icon": "majesticons:table",
                //     "title": "Multiple Header",
                //     "isLink": "",
                //     "isHide": false,
                //     "isFull": false,
                //     "isAffix": false,
                //     "isKeepAlive": true
                //   }
                // },
                // {
                //   "path": "/table/multipleData",
                //   "name": "MultipleData",
                //   "component": "/table/TableMultipleData",
                //   "meta": { 
                //     "icon": "bx:data",
                //     "title": "Multiple Data",
                //     "isLink": "",
                //     "isHide": false,
                //     "isFull": false,
                //     "isAffix": false,
                //     "isKeepAlive": true
                //   }
                // }
              ]
            },
            {
              "path": "/components/count-to",
              "name": "CountTo",
              "component": "/components/count-to/index",
              "meta": { 
                "icon": "fluent:text-word-count-24-regular",
                "title": "Count To",
                "isLink": "",
                "isHide": false,
                "isFull": false,
                "isAffix": false,
                "isKeepAlive": true
              }
            }
          ]
        },
      ]
    })
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}