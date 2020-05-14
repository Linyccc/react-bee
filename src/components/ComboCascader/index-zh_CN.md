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
| options | 可选项，数据源 | Array |  |
| size | 可选项，输入框大小，可选 'large' \| 'small' | string | default |
| multiple | 可选项，单选设置false,默认多选 | boolean | true |
| placeholder | 可选项，输入框占位文本 | string | '请输入' |
| defaultInputValue | 可选项，模糊查询框的默认值 | string | '' |
| className | 可选项，自定义类名 | string | - |
| style | 可选项，自定义样式 | React.CSSProperties | - |
| limit | 可选项，默认false  表示允许同类（即拥有相同父节点）的节点被多选，只在multiple=true时有效 | boolean | false |
| expandTrigger | 可选项，展开子节点的触发方式,可选 'click' \| 'hover' | string | hover |
| hideChoice | 可选项，true表示 不显示choice部分 (隐藏时,options.choiceType可以不传) | boolean | false |
| onChange | 可选项，点击查询时的回调，会往回调函数内传入2个参数。第一个参数是对象{selectedItem:[],inputValue:''}；第二个参数是 __e__ | function | - |

```jsx
<ComboCascader
    options={[
    {
        value: 'v-zhejiang',
        label: 'Zhejiang',
        children: [
        {
            value: 'v-hangzhou',
            label: 'Hangzhou',
            children: [
            {
                value: 'v-xihu',
                label: 'West Lake',
                type: 'Mr.Lin',
            },
            ],
        },
        ],
    },
    {
        value: 'v-jiangsu',
        label: 'Jiangsu',
        children: [
        {
            value: 'v-nanjing',
            label: 'Nanjing',
            children: [
            {
                value: 'v-zhonghuamen',
                label: 'Zhong Hua Men',
            },
            ],
        },
        ],
    },
    ]}
/>
```
