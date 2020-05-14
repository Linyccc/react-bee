## 功能说明

不新开标签页，在一个界面达到场景的按需加载和快速切换，只要传入场景的入参不变，则加载过的界面就不会刷新。

## 使用说明

- 以'umi/dynamic'方式引入，实现场景的按需加载。

- 在index.js中的getScene()方法注册所有场景，并给每个场景分配一个索引（从0开始 依次分配）

- 通过dispatch()方法 发送包含{index:0,params:{}}的payload。

    - `index` [Number] __必填项__ 表示要切换的场景，与注册时的索引一致。

    - `params` [Object] __非必选项__ 表示传入场景的入参，可以在对应组件的this.props取到。