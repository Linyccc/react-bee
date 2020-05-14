模拟手机容器
======

用于PC界面预览手机端活动面效果

![demo](./iphone.gif)

## 用法

```jsx
import React, { Component } from 'react';
import Iphone from '@/components/Iphone';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false
    };
  }

  render() {
    const { visible } = this.state;
    return (
      <Iphone
        visible={visible}
        onCancel={() => {
          this.setState({ visible: false });
        }}
      >
        <div>iphone iphone</div>
      </Iphone>
    );
  }
}

export default Demo;
```

## options

| 参数（*非必选） | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onCancel | 关闭时的回调，需要在里面设置visible:false | function | default |
| visible | 控制弹窗显示与隐藏 | boolean | false |
| * size | 2个size 'default' 'lg' | string | default |

## 方法

无

### 事件

无

