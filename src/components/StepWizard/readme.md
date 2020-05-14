## 功能说明

适用用单页场景切换控制。支持子组件按需加载，传参，且回退时能保留用户的操作记录（如input，select值）

## 使用

普通用法 

```jsx
<StepWizard>
  <Step1 />
  <Step2 />
  ...
  <Step5 />
</StepWizard>
```

推荐用法：懒加载（需要与'umi/dynamic'配合使用）

```jsx
const Scene1 = dynamic({
  loader: () => import('./Scene1'),
  loading: LoadingComponent,
});

const Scene2 = dynamic({
  loader: () => import('./Scene2'),
  loading: LoadingComponent,
});

const Scene3 = dynamic({
  loader: () => import('./Scene3'),
  loading: LoadingComponent,
});

<StepWizard isLazyMount>
  <Scene1 />
  <Scene2 destroy/>
  <Scene3 destroy />
</StepWizard>
```
__每个StepWizard的子组件 Props会接收到如下属性__

Prop | Data Type | Parameters
--- | --- | ---
isActive | `boolean`
currentStep | `integer`
totalSteps | `integer`
firstStep | `function` | 参数非必填，允许传一个`object`类型的参数，会传给对应的组件，通过this.props可以取到
lastStep | `function` | 同上
nextStep | `function` | 同上
previousStep | `function` | 同上
goToStep | `function` |  `goToStep(3)` 或  `goToStep(3,{name:'Mr.Lin'})` 第二个参数 是传给对应组件的参数
---

## StepWizard Props

Prop | Data Type | Default | Description
--- | --- | --- | ---
hashKey | `string` |`step{n}`| 启用hash，便于通过URL快速切换
initialStep | `integer` | 1 | 初始步骤
instance | `function` || 提供了 `StepWizard`的实例副本，用于在组件外部执行nextStep()，previousStep()等方法
isHashEnabled | `bool` | false | Persists the current step in the URL (hash)。注：hash路由时不建议打开
isLazyMount | `boolean` | false | 开启按需加载子组件（需要与'umi/dynamic'配合使用）
nav | `node` || 导航条，可以直接使用'@/components/FooterToolbar'组件
onStepChange | `function` || 切换步骤时的回调
transitions | `object`  || 设置过场动画。如：{enterRight:'animated enterRight',enterLeft:'',exitRight:'',exitLeft:''}


> 注：以上都是非必填项


## Step Props

Prop | Data Type | Default | Description
--- | --- | --- | ---
hashKey | `string` |`step{n}`| 启用hash，便于通过URL快速切换
destroy | `boolean` |`true`| 表示step 被隐藏时，是否销毁视图，只在`isLazyMount`下有效

## 参考

  - [react-step-wizard](https://github.com/jcmcneal/react-step-wizard)
