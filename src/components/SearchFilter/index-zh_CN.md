---
title: SearchFilter
subtitle: 过滤搜索条
category: Components
type: 通用
cols: 1
---

快速过滤搜索条，支持单选、多选及模糊查询

## API

### Input

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 可选项，选项数据源 | Object |  |
| size | 可选项，表示输入框大小 'large' \| 'small' | string | default |
| treePlaceholder | 可选项，tree占位文本 | string | '客户归属地' |
| inputPlaceholder | 可选项，输入框占位文本，可选 | string | '请输入' |
| defaultAreaValue | 可选项，默认归属地的value值(在整棵树范围内必须是唯一的) | string | '' |
| defaultInputValue | 可选项，模糊查询框的默认值 | string | '' |
| className | 可选项，自定义类名 | string | - |
| style | 可选项，自定义样式 | React.CSSProperties | - |
| limit | 可选项，choiceType选项部分是否限制多选 | boolean | false |
| required | 可选项，areaType是否必填 | boolean | false |
| hideArea | 可选项，true表示 不显示区域选择部分 (隐藏时,options.areaType可以不传)| boolean | false |
| hideChoice | 可选项，true表示 不显示choice部分 (隐藏时,options.choiceType可以不传) | boolean | false |
| loadData | 可选项，异步加载数据 | function(node) | - |
| onSearch | 可选项，点击查询时的回调，会往回调函数内传入2个参数。第一个参数是对象{selectedItem:[],inputValue:'',area:{label:"",value:"",filedname:""}}；第二个参数是 __e__ | function | - |

###方法

| 方法 | 说明 | 类型 |
| --- | --- | --- |
| value | 获取当前值 | function | - |
| valid | 校验，失败时返回false,成功时返回一个包含完整数据的对象 | function | - |

## 基础用法
```jsx
<SearchFilter
    options={[
    {
        value: 'v-zhejiang',
        label: 'Zhejiang',
        fieldname:"1",
        children: [
        {
            value: 'v-hangzhou',
            label: 'Hangzhou',
            fieldname:"1-1",
            children: [
            {
                value: 'v-xihu',
                label: 'West Lake',
                fieldname:"1-1-1",
            }
            ],
        },
        ],
    },
    {
        value: 'v-jiangsu',
        label: 'Jiangsu',
        fieldname:"2",
        children: [
        {
            value: 'v-nanjing',
            label: 'Nanjing',
            fieldname:"2-1",
            children: [
            {
                value: 'v-zhonghuamen',
                label: 'Zhong Hua Men',
                fieldname:"2-1-1",
            },
            ],
        },
        ],
    },
    ]}
/>
```
## 异步加载子节点

```jsx
 <SearchFilter
    onSearch={(value, e) => {
    console.log(JSON.stringify(value, null, '\t'));
    }}
    inputPlaceholder="输入关键字"
    size="large"
    loadData={(data)=>{
        //这里的data是组件传入的,{node:{},parentNode:{}}
        //表示展开的当前节点和父节点
        return new Promise((resolve) =>{
            request("/api/area",{data:data}).then(
            (result) => {resolve(result)}
            )
        })
    }}
    options={{
    areaType: areaType, //从后台返回的初始化数据
    choiceType: [
    {
        label: '客户类型',
        value: 'kehu',
        fieldname: 'eparchyCode',
        children: [
            {
                fieldname: 'custState',
                label: '在网',
                value: '0',
            },
            {
                fieldname: 'custState',
                label: '潜在',
                value: '1',
            }
        ],
    },
    {
        label: '客户资料类型',
        value: 'kehuleixin',
        fieldname: 'eparchyCode',
        children: [
            {
                fieldname: 'custClassType',
                label: '大客户',
                value: '3',
            },
            {
                fieldname: 'custClassType',
                label: '中小企业客户',
                value: '2',
            },
            {
                fieldname: 'custClassType',
                label: '小微企业客户',
                value: '1',
            },
        ],
        },
     ],
   }}
/>
```

## 调用组件内部的校验方法

```jsx

//添加
<SearchFilter
  wrappedComponentRef={inst => (this.formRef = inst)}
  ...
/>

//调用this.formRef.valid()，校验失败返回false;校验通过返回一个包含完整数据的对象
<Button
  onClick={() => {console.log(this.formRef.valid())}}
>
  校验
</Button>;
```