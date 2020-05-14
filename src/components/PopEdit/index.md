Popedit 文本选择框
===

## 定义

通过点击输入框旁边的按钮，弹出一个模态框,模态框里面支持自定义展示内容。

## 何时使用

- 需要通过点击输入框旁边的按钮弹出模态框。

## 基本使用

<!--DemoStart-->
```jsx
import { Button, PopEdit } from "@whalecloud/fdx";

class Demo extends React.Component {
    constructor() {
        super();
        this.state = {
            current: '123'
        }
    }

    handleOk = () => {
        console.log('触发onOk');
    }

    onRender() {
        return <p>Welcome</p>
    }

    changeValue = () => {
        this.setState({
            current: Math.random()
        });
    }

    render() {
      const popeditProps = {
        inputProps: {
          value: this.state.current
        },
        modalProps: {
          title: '测试title',
          render: this.onRender,
          onOk: this.handleOk,
        }
      }
        return (
            <React.Fragment>
                <Button onClick={this.changeValue}>点击改变value值</Button>
                <PopEdit {...popeditProps} />
            </React.Fragment>
        )
    }
}
ReactDOM.render(<Demo />, _mount_);
```
<!--DemoEnd-->

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 弹出的模态框的标题 | string |  |
| value | 输入框的输入内容 | string |  |
| onOk | 模态框确认时的回调 | function(e) | |
| render | 模态框内容的渲染函数 | function(e) | |