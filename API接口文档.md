<a name="GON4f"></a>
## 在线文档
[https://www.yuque.com/maofu-rzqcp/snisqw/vvbn1ococsfda8zg](https://www.yuque.com/maofu-rzqcp/snisqw/vvbn1ococsfda8zg)
<a name="baseURL"></a>
## baseURL
`/api`

<a name="899687f0"></a>
## 身份验证
通过请求头：`Authorization` 传递 `token` 验证

<a name="xZNXX"></a>
## 注册

- 请求路径：/sys/register
- 请求方法：post
- 请求参数
| 参数名 | 参数说明 |
| --- | --- |
| username | 用户名 |
| password | 密码（MD5 加密） |

- 响应数据
```json
{
    "success": true,
    "code": 10000,
    "data": {
       
    },
    "message": "执行成功"
}
```


<a name="402d19e5"></a>
## 登录
<a name="402d19e5-1"></a>
### 登录

- 请求路径：/sys/login
- 请求方法：post
- 请求参数
| 参数名 | 参数说明 | 备注 |
| --- | --- | --- |
| username | 用户名 | 提供三种权限账号：<br />1. 超级管理员账号：admin<br />2. 管理员账号：admin-look<br />3. 测试可配置账号：maofu |
| password | 密码（MD5 加密） | 统一为：000000 |

- 响应数据
```json
{
    "success": true,
    "code": 10000,
    "data": {
        "token": "Bearer d8c6ed7a-3fd4-46e4-a477-b20d1ce9cda0"
    },
    "message": "执行成功"
}
```

<a name="Uz6TB"></a>
### 退出登录

- 请求路径：/api/sys/logout
- 请求方法：post
- 通过请求头：`Authorization` 传递 `token` 验证
- 响应数据
```javascript
{
    success: true,
    code: 10000,
    data: {},
    message: '执行成功'
  }
```

<a name="6e354188"></a>
## 用户信息
<a name="259309fc"></a>
### 获取用户信息

- 请求路径：`/sys/profile`
- 请求方法：get
- 请求参数
| 参数名 | 参数说明 | 备注 |
| --- | --- | --- |
| token | token |  |

- 响应数据
```json
{
    "success": true,
    "code": 10000,
    "data": {
        "id": 0,
        "role": [
            2
        ],
        "openTime": "2023-05-04",
        "username": "admin",
        "avatar": "/favicon.ico",
        "permission": {
            "menus": [
                "acl",
                "user-list",
                "role-list",
                "menu-list",
                "client-management"
            ],
            "points": [
                "excel-import",
                "delete-user",
                "assign-role",
                "add-role",
                "delete-role",
                "assign-perm",
                "add-root-perm",
                "add-children-perm",
                "delete-perm"
            ]
        }
    },
    "message": "ok"
}
```

- `permission`中的`menus`是页面权限列表，包含了该用户拥有的对应前端路由记录的`name`
- `permission`中的`points`是按钮权限列表

<a name="b3360308"></a>
## 员工列表
<a name="e7d1a57f"></a>
### 获取员工列表

- 请求路径：/user-manage/list
- 请求方法：get
- 请求参数
| 参数名 | 参数说明 | 备注 |
| --- | --- | --- |
| page | 页码 | 默认为1 |
| size | 每页条数 | 默认为2 |

- 响应数据
```json
{
    "success": true,
    "code": 10000,
    "data": {
        "list": [
            {
                "role": [
                    {
                        "title": "管理员-仅查看",
                        "id": 4
                    }
                ],
                "openTime": 1683287809807,
                "username": "maofu-test",
                "password": "96e79218965eb72c92a549dd5a330112",
                "avatar": "",
                "id": 4
            },
            {
                "id": 3,
                "role": [
                    {
                        "id": 4,
                        "title": "管理员-仅查看"
                    }
                ],
                "openTime": "2023-05-04",
                "username": "admin-look",
                "password": "670b14728ad9902aecba32e22fa4f6bd",
                "avatar": "/favicon.ico"
            },
            {
                "id": 1,
                "role": [
                    {
                        "id": 3,
                        "title": "客户经理"
                    }
                ],
                "openTime": "2023-05-04",
                "username": "maofu",
                "password": "670b14728ad9902aecba32e22fa4f6bd",
                "avatar": "/favicon.ico"
            },
            {
                "id": 0,
                "role": [
                    {
                        "id": 2,
                        "title": "管理员"
                    }
                ],
                "openTime": "2023-05-04",
                "username": "admin",
                "password": "670b14728ad9902aecba32e22fa4f6bd",
                "avatar": "/favicon.ico"
            }
        ],
        "total": 4,
        "page": 1,
        "size": 5
    },
    "message": ""
}
```

<a name="53df1854"></a>
### 获取所有员工列表(用于 Excel 导出)

-  请求路径：/user-manage/all-list 
-  请求方法：get 
-  请求参数 
-  响应数据 
```json
{
    "success": true,
    "code": 10000,
    "data": {
        "list": [
            {
                "id": 0,
                "role": "管理员",
                "openTime": "2023-05-04",
                "username": "admin",
                "avatar": "/favicon.ico"
            },
            {
                "id": 1,
                "role": "客户经理",
                "openTime": "2023-05-04",
                "username": "maofu",
                "avatar": "/favicon.ico"
            },
            {
                "id": 3,
                "role": "管理员-仅查看",
                "openTime": "2023-05-04",
                "username": "admin-look",
                "avatar": "/favicon.ico"
            },
            {
                "role": "管理员-仅查看",
                "openTime": "2023-05-05",
                "username": "maofu-test",
                "avatar": "",
                "id": 4
            }
        ]
    },
    "message": "ok"
}
```

<a name="b2588a3d"></a>
### 新增员工（Excel 导入）

- 请求路径：/user-manage/batch/import
- 请求方法：post
- 请求参数
| 参数名 | 参数说明 | 示例 |
| --- | --- | --- |
| body | 请求体 | ```javascript
[
    {
        "username": "刘备",
        "role": "管理员",
        "openTime": '2021-08-12',
        "password": "9079b6ee1d5ca04ab00e44e877a222ee"
    },
    {
        "username": "关羽",
        "role": "人事经理，人事经理",
        "openTime": '2021-08-12',
        "password": "9079b6ee1d5ca04ab00e44e877a222ee"
    },
    {
        "username": "张飞,人事经理",
        "role": "销售经理",
        "openTime": '2021-08-12',
        "password": "9079b6ee1d5ca04ab00e44e877a222ee"
    },
    {
        "username": "赵云",
        "role": "保安队长",
        "openTime": '2021-08-12',
        "password": "9079b6ee1d5ca04ab00e44e877a222ee"
    }
]
```
 |


`username`用户名不可重复，否则不会添加。<br />`role`:` "人事经理，人事经理"`可由中文逗号或者英文逗号分隔。角色名称如若不存在于角色列表中，则不会添加。<br />`openTime`:`'2021-08-12'`为可选。<br />`password`默认的登录密码。<br />excel示例：<br />![user-excel.png](https://cdn.nlark.com/yuque/0/2023/png/34576819/1683075474056-5222cfd7-84fd-4a1a-9b1a-2880e94a63a5.png#averageHue=%23ddb370&clientId=u7dbc97e6-b73c-4&from=drop&id=u7eb44ecd&originHeight=467&originWidth=1264&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=41429&status=done&style=none&taskId=u8e5c7718-09d1-48c7-a6f1-27419031c9a&title=)

- 响应数据
```json
{
    "success": true,
    "code": 200,
    "data": null,
    "message": "批量导入员工成功"
}
```

<a name="5a3aaaa4"></a>
### 获取指定员工的角色（用于分配角色）

- 请求路径：/user-manage/role/:userId
- 请求方法：get
- 请求参数
- 响应数据
```json
{
    "success": true,
    "code": 10000,
    "data": {
        "role": [
            {
                "title": "管理员-仅查看",
                "id": 4
            }
        ]
    },
    "message": "ok"
}
```


<a name="99a8e0a0"></a>
### 为员工分配角色

- 请求路径：/user-manage/update-role/:userId
- 请求方法：post
- 请求参数
| 参数名 | 参数说明 | 示例 |
| --- | --- | --- |
| roles | 该员工拥有的**所有角色**列表。 | ```javascript
[
            {
                "title": "管理员-仅查看",
                "id": 4

            }
        ]
```
 |

- 响应数据
```json
{
    "success":true,
    "code":200,
    "data":null,
    "message":"更新成功"
}
```

<a name="65cf2964"></a>
### 删除员工

- 请求路径：/user-manage/detele/:id
- 请求方法：get
- 请求参数
- 响应数据
```json
{
    "success": true,
    "code": 200,
    "data": null,
    "message": "删除成功！"
}
```

<a name="f53b5122"></a>
## 角色列表
<a name="XVoln"></a>
### 添加角色

- 请求路径：/role/add
- 请求方法：post
- 请求参数
```javascript
{
    "title":"管理员",
    "describe":"唯一账号，可以操作系统所有功能"
},
```

<a name="8bd6bde8"></a>
### 获取所有角色

- 请求路径：/role/list
- 请求方法：get
- 请求参数
- 响应数据
```json
{
    "success": true,
    "code": 10000,
    "data": [
        {
            "title": "管理员",
            "describe": "拥有所有权限",
            "permissions": [
                "1",
                "1683201242256",
                "1683201972962",
                "1683201995991",
                "1683202016584",
                "1683201932454",
                "1683281633240",
                "1683281656214",
                "1683281699123",
                "1683281734858",
                "1683281758700",
                "1683281786841",
                "1683281825373",
                "1683281847403",
                "1683281866794"
            ],
            "id": 2,
            "names": [
                "所有权限数据",
                "权限管理",
                "员工列表",
                "角色列表",
                "权限列表",
                "客户管理",
                "excel导入员工",
                "删除员工",
                "为员工分配角色",
                "添加角色",
                "删除角色",
                "为角色分配权限",
                "添加根权限",
                "添加子权限",
                "删除权限"
            ]
        },
        {
            "title": "客户经理",
            "describe": "可查看客户管理",
            "permissions": [
                "1683201932454"
            ],
            "id": 3,
            "names": [
                "客户管理"
            ]
        },
        {
            "title": "管理员-仅查看",
            "describe": "只有查看权限",
            "permissions": [
                "1",
                "1683201242256",
                "1683201972962",
                "1683201995991",
                "1683202016584",
                "1683201932454"
            ],
            "id": 4,
            "names": [
                "所有权限数据",
                "权限管理",
                "员工列表",
                "角色列表",
                "权限列表",
                "客户管理"
            ]
        }
    ],
    "message": "ok"
}
```

<a name="b2853a5f"></a>
### 获取指定角色的权限（用于分配权限）

- 请求路径：/role/permission/:roleId
- 请求方法：get
- 请求参数
- 响应数据
```json
{
    "success": true,
    "code": 10000,
    "data": {
        "list": [
            {
                "id": "1",
                "pid": "0",
                "name": "所有权限数据",
                "code": "",
                "children": [
                    {
                        "id": "1683201242256",
                        "pid": "1",
                        "name": "权限管理",
                        "code": "acl",
                        "type": 1,
                        "children": [
                            {
                                "id": "1683201972962",
                                "pid": "1683201242256",
                                "name": "员工列表",
                                "code": "user-list",
                                "type": 1,
                                "children": [
                                    {
                                        "id": "1683281633240",
                                        "pid": "1683201972962",
                                        "name": "excel导入员工",
                                        "code": "excel-import",
                                        "type": 2,
                                        "children": []
                                    },
                                    {
                                        "id": "1683281656214",
                                        "pid": "1683201972962",
                                        "name": "删除员工",
                                        "code": "delete-user",
                                        "type": 2,
                                        "children": []
                                    },
                                    {
                                        "id": "1683281699123",
                                        "pid": "1683201972962",
                                        "name": "为员工分配角色",
                                        "code": "assign-role",
                                        "type": 2,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "id": "1683201995991",
                                "pid": "1683201242256",
                                "name": "角色列表",
                                "code": "role-list",
                                "type": 1,
                                "children": [
                                    {
                                        "id": "1683281734858",
                                        "pid": "1683201995991",
                                        "name": "添加角色",
                                        "code": "add-role",
                                        "type": 2,
                                        "children": []
                                    },
                                    {
                                        "id": "1683281758700",
                                        "pid": "1683201995991",
                                        "name": "删除角色",
                                        "code": "delete-role",
                                        "type": 2,
                                        "children": []
                                    },
                                    {
                                        "id": "1683281786841",
                                        "pid": "1683201995991",
                                        "name": "为角色分配权限",
                                        "code": "assign-perm",
                                        "type": 2,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "id": "1683202016584",
                                "pid": "1683201242256",
                                "name": "权限列表",
                                "code": "menu-list",
                                "type": 1,
                                "children": [
                                    {
                                        "id": "1683281825373",
                                        "pid": "1683202016584",
                                        "name": "添加根权限",
                                        "code": "add-root-perm",
                                        "type": 2,
                                        "children": []
                                    },
                                    {
                                        "id": "1683281847403",
                                        "pid": "1683202016584",
                                        "name": "添加子权限",
                                        "code": "add-children-perm",
                                        "type": 2,
                                        "children": []
                                    },
                                    {
                                        "id": "1683281866794",
                                        "pid": "1683202016584",
                                        "name": "删除权限",
                                        "code": "delete-perm",
                                        "type": 2,
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "1683201932454",
                        "pid": "1",
                        "name": "客户管理",
                        "code": "client-management",
                        "type": 1,
                        "children": []
                    }
                ],
                "select": 1
            }
        ],
        "selected": [
            "1",
            "1683201242256",
            "1683201972962",
            "1683201995991",
            "1683202016584",
            "1683201932454",
            "1683281633240",
            "1683281656214",
            "1683281699123",
            "1683281734858",
            "1683281758700",
            "1683281786841",
            "1683281825373",
            "1683281847403",
            "1683281866794"
        ]
    },
    "message": "ok"
}
```

- `list`中的每个对象中的`select`为1表示该角色拥有该权限，为0表示该角色没有该权限。
- `selected`该角色拥有的权限id列表。


<a name="1e62e21c"></a>
### 为角色分配权限

- 请求路径：/role/distribute-permission
- 请求方法：POST
- 请求参数：
| 参数名 | 参数说明 | 示例 |
| --- | --- | --- |
| permissions | 角色权限id列表 | ```json
[
            "1683184693282",
            "1683186150501",
            "1683186431548",
            "1683186454476",
            "1683186210739",
            "1683184718583",
            "1683184798806",
            "1683185672894"
        ]
```
 |
| roleId | 角色ID |  |

- 响应数据
```json
{"success":true,"code":200,"data":null,"message":"更新成功"}
```

:::info
注意：<br />如果有子页面权限，而没有父页面权限。子，父页面都会被渲染。<br />这是由前端实现动态路由的原理所决定的。
:::
![image.png](https://cdn.nlark.com/yuque/0/2023/png/34576819/1683197065002-f902ef41-0fdf-4344-b80d-9e2fddd0dd33.png#averageHue=%23fefefe&clientId=u3848bd39-39ea-4&from=paste&height=309&id=u9f659cb5&originHeight=386&originWidth=392&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=10364&status=done&style=none&taskId=ucd4aa7bf-d54e-49b6-985e-8732a05ec6b&title=&width=313.6)

<a name="gd4z1"></a>
### 删除角色

- 请求路径：/role/detele/:id
- 请求方法：get
- 请求参数
- 响应数据
```json
{
    "success": true,
    "code": 200,
    "data": null,
    "message": "删除成功！"
}
```
:::info
注意：<br />删除角色后，要删除员工的角色列表中的该角色。
:::

<a name="e6d693c1"></a>
## 权限列表

<a name="XKQIi"></a>
### 添加权限

- 请求路径：/permission/add
- 请求方法：post
- 请求参数
```json
{
"pid": "1",
"name": "权限管理",
"code": "acl",
"type": 1,
}
```

- `pid` 该权限的父权限id，如若添加根权限，pid要取1。
- `name` 权限名。
- `code` 权限代码，与前端页面的实际情况结合。
- `type` 权限类型，为1代表页面权限，为2代表按钮权限。

<a name="abf19eab"></a>
### 获取所有权限

- 请求路径：/permission/list
- 请求方法：get
- 请求参数
- 响应数据
```json
{
    "success": true,
    "code": 10000,
    "data": [
        {
            "id": "1683201242256",
            "pid": "1",
            "name": "权限管理",
            "code": "acl",
            "type": 1,
            "children": [
                {
                    "id": "1683201972962",
                    "pid": "1683201242256",
                    "name": "员工列表",
                    "code": "user-list",
                    "type": 1,
                    "children": [
                        {
                            "id": "1683281633240",
                            "pid": "1683201972962",
                            "name": "excel导入员工",
                            "code": "excel-import",
                            "type": 2,
                            "children": []
                        },
                        {
                            "id": "1683281656214",
                            "pid": "1683201972962",
                            "name": "删除员工",
                            "code": "delete-user",
                            "type": 2,
                            "children": []
                        },
                        {
                            "id": "1683281699123",
                            "pid": "1683201972962",
                            "name": "为员工分配角色",
                            "code": "assign-role",
                            "type": 2,
                            "children": []
                        }
                    ]
                },
                {
                    "id": "1683201995991",
                    "pid": "1683201242256",
                    "name": "角色列表",
                    "code": "role-list",
                    "type": 1,
                    "children": [
                        {
                            "id": "1683281734858",
                            "pid": "1683201995991",
                            "name": "添加角色",
                            "code": "add-role",
                            "type": 2,
                            "children": []
                        },
                        {
                            "id": "1683281758700",
                            "pid": "1683201995991",
                            "name": "删除角色",
                            "code": "delete-role",
                            "type": 2,
                            "children": []
                        },
                        {
                            "id": "1683281786841",
                            "pid": "1683201995991",
                            "name": "为角色分配权限",
                            "code": "assign-perm",
                            "type": 2,
                            "children": []
                        }
                    ]
                },
                {
                    "id": "1683202016584",
                    "pid": "1683201242256",
                    "name": "权限列表",
                    "code": "menu-list",
                    "type": 1,
                    "children": [
                        {
                            "id": "1683281825373",
                            "pid": "1683202016584",
                            "name": "添加根权限",
                            "code": "add-root-perm",
                            "type": 2,
                            "children": []
                        },
                        {
                            "id": "1683281847403",
                            "pid": "1683202016584",
                            "name": "添加子权限",
                            "code": "add-children-perm",
                            "type": 2,
                            "children": []
                        },
                        {
                            "id": "1683281866794",
                            "pid": "1683202016584",
                            "name": "删除权限",
                            "code": "delete-perm",
                            "type": 2,
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "id": "1683201932454",
            "pid": "1",
            "name": "客户管理",
            "code": "client-management",
            "type": 1,
            "children": []
        }
    ],
    "message": "ok"
}
```

- `pid` 该权限的父权限id，如若添加根权限，pid要取1。
- `name` 权限名。
- `code` 权限代码，与前端页面的实际情况结合。
- `type` 权限类型，为1代表页面权限，为2代表按钮权限。
- `children `子权限列表。
<a name="JuwTN"></a>
### 删除权限

- 请求路径：/permission/detele?id=123&pid=456
- 请求方法：get
- 请求参数
| id | 权限的id |
| --- | --- |
| pid | 权限的父权限的id |

:::info
注意：<br />删除权限时，会删除该权限的子权限。<br />若角色中有该权限（包括子权限），也会进行删除。
:::
