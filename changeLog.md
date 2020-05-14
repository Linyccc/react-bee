# 2.2.0 (2020-04-28)


### Bug Fixes

* **修复:** 测试修复 ([b3af829](https://gitlab.iwhalecloud.com/soon/react-slick/commit/b3af82988426b709ad2f9cdf666b8e0959c554e6))


### Features

* **blog:** add comment section ([38781f7](https://gitlab.iwhalecloud.com/soon/react-slick/commit/38781f71a5ad99d31f275ee9f0a1ed174f2a2964))



# 2.2.0 (2020-04-28)


### Features

* **blog:** add comment section ([38781f7](https://gitlab.iwhalecloud.com/soon/react-slick/commit/38781f71a5ad99d31f275ee9f0a1ed174f2a2964))



# 2.2.0 (2020-04-28)



# 更新日志

## 2.2.0

`2019-08-12`

- 添加**pubsub-js**模块：订阅发布功能
- **StepWizard**组件添加destroy功能：指定某个场景在被隐藏时，销毁视图，只在**isLazyMount**下有效
- 添加增删改查demo，基于**StepWizard**，**pubsub-js**和**SlickTable**的综合应用

`2019-07-05`

- 升级jquery版本至**jquery@1.12.4**

`2019-06-24`

- 升级 **antd@3.19.1** 至  **antd@3.19.6**
- 添加linter插件 **eslint-plugin-react-hooks** 
- 添加 **@/components/SlickUpload** 
- **global.less** 添加utils样式 

`2019-06-17`

- 优化 **@/components/SlickTable** 滚动条仅在过长时显示；修复pick模式下 水平滚动时左边列显示不完整
- 优化 **@/components/IframeWrapper** 
- 优化 **SceneSwitch2** demo 
- 屏蔽冗余的demo
- 增加 **getViewPort** 工具方法

`2019-06-14`

- 修复 **@/components/FooterToolbar** IE下 card切换时 依然可见的bug

## 2.1.3

`2019-06-10`

- 添加组件 **@/components/SlickTable**

`2019-06-04`

- 添加组件 **@/components/StepWizard**
- 添加 **StepWizard** demo
- eslint: 停止校验析构赋值 **react/destructuring-assignment**

`2019-05-31`

- 调整eslint规则：1、允许变量声明与外层作用域的变量同名；2、剔除所有mock 文件的校验

`2019-05-30`

- 移除basicLayout 冗余的console.log信息
- request优化：请求头添加language字段，并在readme补充国际化说明

## 2.1.2

`2019-05-29`

- readme文案优化
- 移除冗余的types目录
- 修复IEVersion方法
- 升级到antd@3.19.1，解决
- 修复IE9下Tabs无法正常切换(animated属性引起)

## 2.1.1

`2019-05-21`

- prettier遗留的没被格式化过的js、less文件 

## 2.1.0

`2019-05-20`

- 修改**components/ScrollBar** 滚动条颜色
- 优化：tab切换和关闭时即时更新url，同时修复路由权限问题
- 添加eslint自动化校验功能

## 2.0.1

`2019-04-19`

- 新增自定义图标组件IconFont
- 新增**react-custom-scrollbars**模块
- 优化SiderMenu滚动条

## 2.0.0

`2019-04-17`

- 新增分支drive-by-zeal-cube ，该分支引入的是zeal-cube组件
- 把源码中对'zeal-cube'的引用切换回'antd',移除config.js和basicLayout.js中的国际化配置。同时，移除package.json中的zeal-cube
- 升级umi至2.6.13, 
- 升级umi-plugin-react至1.7.4。
- react更新到16.8.3
- antd更新到3.16.3
- 调整siderMenu和header布局
- 拆分路由和国际化
- 更新pages/demo/sceneSwith和pages/Dashboard(旧首页更名为Dashboard2)

## 1.0.0

## 添加TableWrapper组件

统一table风格

demo : http://localhost:8000/#/log/detail

## 添加ComboCascader组件

demo : http://localhost:8000/#/form/inputs

## 添加SearchFilter组件

demo : http://localhost:8000/#/form/inputs

## 添加.cube-form-tooltip

扩展表单校验的错误样式

demo : http://localhost:8000/#/form/inputs

## 扩展card组件 样式：添加.cube-tabs-filled 和 .cube-tabs-lined

demo : http://localhost:8000/#/roleManage

## 扩展btn样式cube-btn-info和cube-btn-round

demo : http://localhost:8000/#/buttons




