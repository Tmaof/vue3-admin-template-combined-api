## baseURL

`https://api.imooc-admin.lgdsunday.club/api`

## 国际化

通过请求头：`Accept-Language` 控制

## 身份验证

通过请求头：`Authorization` 传递 `token` 验证

##  登录

###  登录

- 请求路径：/sys/login
- 请求方法：post
- 请求参数

| 参数名   | 参数说明         | 备注                                                         |
| -------- | ---------------- | ------------------------------------------------------------ |
| username | 用户名           | 提供三种权限账号：<br />1. 超级管理员账号： super-admin<br />2. 管理员账号：admin<br />3. 测试可配置账号：test |
| password | 密码（MD5 加密） | 统一为：123456                                               |

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

## 用户信息

### 获取用户信息

- 请求路径：`/sys/profile`
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| token  | token    |      |

- 响应数据

```json
{
    "success":true,
    "code":200,
    "data":{
        "role":[
            {
                "id":"1",
                "title":"超级管理员"
            }
        ],
        "_id":"612710a0ec87aa543c9c341d",
        "id":"0",
        "username":"super-admin",
        "title":"超级管理员",
        "avatar":"https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png",
        "permission":{
            "menus":[
                "userManage",
                "roleList",
                "permissionList",
                "articleRanking",
                "articleCreate"
            ],
            "points":[
                "distributeRole",
                "importUser",
                "removeUser",
                "distributePermission"
            ]
        }
    },
    "message":"获取资料成功"
}
```



## 个人中心

### 获取项目功能

- 请求路径：/user/feature
- 请求方法：get
- 请求参数
- 响应数据

```json
{
    "success": true,
    "code": 10000,
    "data": [
        {
            "title": "Vue3 + 全家桶",
            "percentage": 100,
            "content": "项目基于最新的<a target=\"_blank\" href=\"https://v3.cn.vuejs.org/guide/introduction.html\">vue3</a>全家桶进行开发，全面使用最新的的<a target=\"_blank\" href=\"https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md\">RFC script setup</a>语法标准，为你带来不一样的 vue3 开发体验"
        },
        {
            "title": "Element-Plus",
            "percentage": 100,
            "content": "<a target=\"_blank\" href=\"https://element-plus.org/#/zh-CN\">Element Plus</a>，一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库。是 Element UI 的官方 vue 3 兼容版本"
        },
        {
            "title": "vue-element-admin",
            "percentage": 100,
            "content": "<a target=\"_blank\" href=\"https://panjiachen.github.io/vue-element-admin-site/zh/guide/\">vue-element-admin</a> 是一个后台前端解决方案，它基于 vue 和 element-ui实现，并有用 70K 的 <a target=\"_blank\" href=\"https://github.com/PanJiaChen/vue-element-admin\">star</a>。<br />本项目使用最新 vue 技术对其进行了重构，并在其现有功能上进行了扩展，致力于为大家带来更加符合 <b>现代后台开发的前端技术解决方案</b>"
        },
        {
            "title": "ESLint + Git Hooks",
            "percentage": 100,
            "content": "ESLint 对应编码规范，Git Hooks 对应 Git 规范。<br /> 想要开发出大厂标准的企业级项目，需要先从规范做起！"
        },
        {
            "title": "架构设计",
            "percentage": 100,
            "content": "阿里前端 P7 岗被称为 《技术专家》，也有人喜欢叫他们为 “前端架构师”，既然被称为 “架构师” ，那么架构设计当然是不可缺少的一环咯"
        },
        {
            "title": "权限验证（页面权限、功能权限、动态权限、权限配置）",
            "percentage": 100,
            "content": "全面的后台权限验证系统，实现了 <b>页面权限、功能权限、动态权限、权限配置</b> 等全方位的权限功能"
        },
        {
            "title": "功能引导",
            "percentage": 100,
            "content": "对用户的功能引导"
        },
        {
            "title": "可配置 + 收缩侧边栏",
            "percentage": 100,
            "content": "根据路由动态生成的 Menu 菜单，实现真正的 <b>配置 Menu</b>"
        },
        {
            "title": "动态面包屑",
            "percentage": 100,
            "content": "动态生成的面包屑数据"
        },
        {
            "title": "Tags View",
            "percentage": 100,
            "content": "便签快捷导航功能"
        },
        {
            "title": "svg sprite 图标",
            "percentage": 100,
            "content": "自定义的 svg Icon 配合 el Icon 自动分配导入"
        },
        {
            "title": "国际化",
            "percentage": 100,
            "content": "多语言的国际化功能实现"
        },
        {
            "title": "动态换肤",
            "percentage": 100,
            "content": "主题更换功能，提供缓存实现"
        },
        {
            "title": "页面搜索",
            "percentage": 100,
            "content": "根据路由配置自动化生成的页面搜索数据，无需手动配置"
        },
        {
            "title": "excel 导出、导入",
            "percentage": 100,
            "content": "excel 表格的导入、导出实现"
        },
        {
            "title": "zip 导入",
            "percentage": 100,
            "content": "页面数据导出为 zip "
        },
        {
            "title": "富文本 + MarkDown 编辑器",
            "percentage": 100,
            "content": "常用的编辑器功能，包含 富文本编辑器 && MarkDown 编辑器"
        },
        {
            "title": "动态表格 + 拖拽表格 + 内联编辑表格",
            "percentage": 100,
            "content": "表格列表的常见操作，多用于包含表格项的展示功能中。包括：动态表格 && 拖拽表格 && 内联编辑表格 "
        },
        {
            "title": "统一错误处理",
            "percentage": 100,
            "content": "页面级的错误处理由 vue-router 统一处理。包含 401 和 404 的错误处理"
        },
        {
            "title": "发布",
            "percentage": 100,
            "content": "构建与发布"
        },
        {
            "title": "其他",
            "percentage": 100,
            "content": "除了以上功能之外，我们还实现了很多其他的功能，比如：CDN、动态的环境变量配置、懒加载、跨域等等"
        }
    ],
    "message": "获取资料成功"
}
```



### 获取项目章节

- 请求路径：/user/chapter
- 请求方法：get
- 请求参数
- 响应数据

```json
{
    "success": true,
    "code": 10000,
    "data": [
        {
            "content": "课程导读",
            "timestamp": "第一章",
            "id": 1
        },
        {
            "content": " 标准化大厂编程规范解决方案之ESLint + Git Hooks ",
            "timestamp": "第二章",
            "id": 2
        },
        {
            "content": "项目架构解决方案之搭建登录基础架构",
            "timestamp": "第三章",
            "id": 3
        },
        {
            "content": "项目架构解决方案之搭建Layout基础架构",
            "timestamp": "第四章",
            "id": 4
        },
        {
            "content": "后台项目前端综合解决方案之 通用功能开发",
            "timestamp": "第五章",
            "id": 5
        },
        {
            "content": "vue3 + element plus 综合实现解决方案之个人中心页面",
            "timestamp": "第六章",
            "id": 6
        },
        {
            "content": "excel 、zip 与前端结合解决方案之用户管理页面实现",
            "timestamp": "第七章",
            "id": 7
        },
        {
            "content": "权限控制解决方案之角色、权限页面渲染实现项目的权限控制功能",
            "timestamp": "第八章",
            "id": 8
        },
        {
            "content": "列表排序解决方案之实现热门文章排名",
            "timestamp": "第九章",
            "id": 9
        },
        {
            "content": "文章编辑解决方案之实现创建文章功能",
            "timestamp": "第十章",
            "id": 10
        },
        {
            "content": "错误综合处理方案之错误页面的统一处理",
            "timestamp": "第十一章",
            "id": 11
        },
        {
            "content": "项目发布解决方案之构建与发布",
            "timestamp": "第十二章",
            "id": 12
        },
        {
            "content": "课程总结",
            "timestamp": "第十三章",
            "id": 13
        }
    ],
    "message": "获取资料成功"
}
```



## 员工管理

### 获取员工列表

- 请求路径：/user-manage/list
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注    |
| ------ | -------- | ------- |
| page   | 页码     | 默认为1 |
| size   | 每页条数 | 默认为2 |

- 响应数据

```json
{
    "success":true,
    "code":200,
    "data":{
        "list":[
            {
                "role":[
                    {
                        "id":"1",
                        "title":"超级管理员"
                    }
                ],
                "_id":"612710a0ec87aa543c9c341d",
                "id":"0",
                "openTime":"1433088000000",
                "username":"super-admin",
                "mobile":"188xxxx0001",
                "avatar":"https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
            },
            {
                "role":[
                    {
                        "id":"2",
                        "title":"管理员"
                    }
                ],
                "_id":"612710a0ec87aa543c9c341e",
                "id":"1",
                "username":"admin",
                "openTime":"1559318400000",
                "mobile":"188xxxx0002",
                "avatar":"https://img4.sycdn.imooc.com/61110c2b0001152907400741-140-140.jpg"
            }
        ],
        "total":7,
        "page":"1",
        "size":"2"
    },
    "message":"success"
}
```



### 获取所有员工列表

- 请求路径：/user-manage/all-list
- 请求方法：get
- 请求参数

- 响应数据

```json
{
    "success":true,
    "code":200,
    "data":{
        "list":[
            {
                "role":[
                    {
                        "id":"1",
                        "title":"超级管理员"
                    }
                ],
                "_id":"612710a0ec87aa543c9c341d",
                "id":"0",
                "openTime":"1433088000000",
                "username":"super-admin",
                "mobile":"188xxxx0001",
                "avatar":"https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
            },
            {
                "role":[
                    {
                        "id":"2",
                        "title":"管理员"
                    }
                ],
                "_id":"612710a0ec87aa543c9c341e",
                "id":"1",
                "username":"admin",
                "openTime":"1559318400000",
                "mobile":"188xxxx0002",
                "avatar":"https://img4.sycdn.imooc.com/61110c2b0001152907400741-140-140.jpg"
            }
        ],
        "total":7,
        "page":"1",
        "size":"2"
    },
    "message":"success"
}
```



### 获取指定员工信息

- 请求路径：/user-manage/detail/:id
- 请求方法：get
- 请求参数
- 响应数据

```json
{
    "success":true,
    "code":200,
    "data":{
        "role":[
            {
                "id":"1",
                "title":"超级管理员"
            }
        ],
        "remark":[
            "超级管理员",
            "BOSS"
        ],
        "experience":[
            {
                "startTime":"1538323200000",
                "endTime":"1551369600000",
                "title":"慕课网",
                "desc":"混合开发京东商城"
            },
            {
                "startTime":"1614528000000",
                "endTime":"1625068800000",
                "title":"慕课网",
                "desc":"uni-app 开发企业级小程序"
            }
        ],
        "_id":"612710a0ec87aa543c9c341d",
        "id":"0",
        "openTime":"1433088000000",
        "username":"super-admin",
        "title":"超级管理员",
        "mobile":"188xxxx0001",
        "avatar":"https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png",
        "gender":"男",
        "nationality":"汉",
        "address":"北京市朝阳区xx大道 11xx0 号 3 层",
        "major":"在线职业教育平台",
        "glory":"国内领先的线上 IT 教育品牌"
    },
    "message":"success"
}
```



### 新增员工（Excel 导入）

- 请求路径：/user-manage/batch/import
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 示例                                                         |
| ------ | -------- | ------------------------------------------------------------ |
| body   | 请求体   | [{"username":"刘备","mobile":15500000000,"role":"管理员" \|\| ["管理员","员工"],"openTime":"2021-08-12"}] |

- 响应数据

```json
{
    "success": true,
    "code": 200,
    "data": null,
    "message": "批量导入员工成功"
}
```



### 获取指定员工当前角色

- 请求路径：/user-manage/role/:userId
- 请求方法：get
- 请求参数
- 响应数据

```json
{
    "success":true,
    "code":200,
    "data":{
        "role":[
            {
                "id":"2",
                "title":"管理员"
            }
        ],
        "_id":"6124eacc0dafe231304546be"
    },
    "message":"success"
}
```



### 为员工分配角色

- 请求路径：/user-manage/update-role/:userId
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 示例                                                         |
| ------ | -------- | ------------------------------------------------------------ |
| roles  | 新角色   | [{id: "6", title: "员工", describe: "普通员工"}, {id: "5", title: "保安队长", describe: "主管安保相关业务"}] |

- 响应数据

```json
{
    "success":true,
    "code":200,
    "data":null,
    "message":"更新成功"
}
```



### 删除员工（Super Administrator、Sunday、Zhang San 为默认数据不可删除）

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



## 角色列表

### 获取所有角色

- 请求路径：/role/list
- 请求方法：get
- 请求参数

```json
{
    "success":true,
    "code":200,
    "data":[
        {
            "id":"1",
            "title":"超级管理员",
            "describe":"唯一账号，可以操作系统所有功能"
        },
        {
            "id":"2",
            "title":"管理员",
            "describe":"由超管指定，可以为多个，协助超管管理系统"
        },
        {
            "id":"3",
            "title":"人事经理",
            "describe":"主管人事相关业务"
        },
        {
            "id":"4",
            "title":"销售经理",
            "describe":"主管销售相关业务"
        },
        {
            "id":"5",
            "title":"保安队长",
            "describe":"主管安保相关业务"
        },
        {
            "id":"6",
            "title":"员工",
            "describe":"普通员工"
        }
    ],
    "message":"获取资料成功"
}
```



### 获取指定角色的权限

- 请求路径：/role/permission/:roleId
- 请求方法：get
- 请求参数
- 响应数据

```json
{
    "success":true,
    "code":200,
    "data":[
        "1",
        "1-1",
        "1-2",
        "1-3",
        "2",
        "2-1",
        "3",
        "4",
        "5"
    ],
    "message":"获取资料成功"
}
```



### 为角色分配权限

- 请求路径：/role/distribute-permission
- 请求方法：POST
- 请求参数：

| 参数名      | 参数说明 | 示例                       |
| ----------- | -------- | -------------------------- |
| permissions | 角色权限 | ["1", "1-1", "1-2", "1-3"] |
| roleId      | 角色ID   |                            |

- 响应数据

```json
{"success":true,"code":200,"data":null,"message":"更新成功"}
```



## 权限列表

### 获取所有权限

- 请求路径：/permission/list
- 请求方法：get
- 请求参数
- 响应数据

```json
{
    "success":true,
    "code":200,
    "data":[
        {
            "id":"1",
            "permissionName":"员工管理",
            "permissionMark":"userManage",
            "permissionDesc":"员工管理菜单",
            "children":[
                {
                    "id":"1-1",
                    "permissionName":"分配角色",
                    "permissionMark":"distributeRole",
                    "permissionDesc":"为员工分配角色"
                },
                {
                    "id":"1-2",
                    "permissionName":"导入员工",
                    "permissionMark":"importUser",
                    "permissionDesc":"通过 excel 导入员工"
                },
                {
                    "id":"1-3",
                    "permissionName":"删除员工",
                    "permissionMark":"removeUser",
                    "permissionDesc":"删除员工"
                }
            ]
        },
        {
            "id":"2",
            "permissionName":"角色列表",
            "permissionMark":"roleList",
            "permissionDesc":"角色列表菜单",
            "children":[
                {
                    "id":"2-1",
                    "permissionName":"分配权限",
                    "permissionMark":"distributePermission",
                    "permissionDesc":"为角色分配权限"
                }
            ]
        },
        {
            "id":"3",
            "permissionName":"权限列表",
            "permissionMark":"permissionList",
            "permissionDesc":"权限列表菜单",
            "children":[

            ]
        },
        {
            "id":"4",
            "permissionName":"文章排名",
            "permissionMark":"articleRanking",
            "permissionDesc":"文章排名菜单",
            "children":[

            ]
        },
        {
            "id":"5",
            "permissionName":"创建文章",
            "permissionMark":"articleCreate",
            "permissionDesc":"创建文章页面",
            "children":[

            ]
        }
    ],
    "message":"获取资料成功"
}
```



## 文章排名

### 获取所有文章

- 请求路径：/article/list
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| page   | 页码     | 默认为1  |
| size   | 每页条数 | 默认为10 |

- 响应数据

```json
{
    "success":true,
    "code":200,
    "data":{
        "list":[
            {
                "_id":"612a198d218e733440da07e6",
                "ranking":1,
                "title":"ESLint + Git Hooks",
                "author":"Sunday",
                "publicDate":"1629099597000",
                "desc":"编码规范"
            },
            {
                "_id":"612a198d218e733440da07ec",
                "ranking":2,
                "title":"Tags View",
                "author":"Sunday",
                "publicDate":"1629099597000",
                "desc":"便签快捷导航功能"
            },
            {
                "_id":"612a198d218e733440da07e4",
                "ranking":3,
                "title":"Element-Plus",
                "author":"Sunday",
                "publicDate":"1629099597000",
                "desc":"基于 Vue 3.0 的桌面端组件库"
            },
            {
                "_id":"612a198d218e733440da07ea",
                "ranking":4,
                "title":"侧边栏",
                "author":"Sunday",
                "publicDate":"1629099597000",
                "desc":"根据路由动态生成的 Menu 菜单"
            },
            {
                "_id":"612a198d218e733440da07eb",
                "ranking":5,
                "title":"动态面包屑",
                "author":"Sunday",
                "publicDate":"1629099597000",
                "desc":"动态生成的面包屑数据"
            },
            {
                "_id":"612a198d218e733440da07e8",
                "ranking":6,
                "title":"权限验证",
                "author":"Sunday",
                "publicDate":"1629099597000",
                "desc":"页面权限、功能权限、动态权限、权限配置"
            },
            {
                "_id":"612a198d218e733440da07e5",
                "ranking":7,
                "title":"vue-element-admin",
                "author":"Sunday",
                "publicDate":"1629099597000",
                "desc":"后台前端解决方案"
            },
            {
                "_id":"612a198d218e733440da07e3",
                "ranking":8,
                "title":"Vue3 + 全家桶",
                "author":"Sunday",
                "publicDate":"1629099597000",
                "desc":"项目基于最新的vue3全家桶进行开发"
            },
            {
                "_id":"612a198d218e733440da07e9",
                "ranking":9,
                "title":"功能引导",
                "author":"Sunday",
                "publicDate":"1629099597000",
                "desc":"对用户的功能引导"
            },
            {
                "_id":"612a198d218e733440da07e7",
                "ranking":10,
                "title":"架构设计",
                "author":"Sunday",
                "publicDate":"1629099597000",
                "desc":"架构设计"
            }
        ],
        "total":20,
        "page":"1",
        "size":"10"
    },
    "message":"success"
}
```



### 修改文章排名

- 请求路径：/article/sort
- 请求方法：post
- 请求参数

| 参数名       | 参数说明 | 备注       |
| ------------ | -------- | ---------- |
| initRanking  | 最初排名 | 必须为数字 |
| finalRanking | 最终排名 | 必须为数字 |

- 响应数据

```json
{
    "success":true,
    "code":200,
    "data":null,
    "message":"排名重设成功"
}
```



### 创建文章

- 请求路径：/article/create
- 请求方法：post
- 请求参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| title   | 标题     |      |
| content | 内容     |      |

- 响应数据

```json
{
    "success":true,
    "code":200,
    "data":null,
    "message":"文章创建成功"
}
```



### 删除文章

- 请求路径：/article/delete/:id
- 请求方法：get
- 请求参数

- 响应数据

```json
{
    "success":true,
    "code":200,
    "data":null,
    "message":"文章删除成功"
}
```



### 查看文章详情

- 请求路径：/article/:id
- 请求方法：get
- 请求参数

- 响应数据

```json
{
    "success":true,
    "code":200,
    "data":{
        "_id":"612afcf2ba2d4031d04d1bff",
        "ranking":1,
        "author":"super-admin",
        "title":"测试 富文本",
        "desc":"测试 富文本 的内容",
        "content":"<p>测试 富文本 的内容</p>",
        "publicDate":"1630207218610",
        "__v":0
    },
    "message":"success"
}
```

### 编辑文章详情

- 请求路径：/article/edit
- 请求方法：post
- 请求参数

- 

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| id      | id       |      |
| title   | 标题     |      |
| content | 内容     |      |

- 响应数据

```json
{
    "success":true,
    "code":200,
    "data":null,
    "message":"success"
}
```