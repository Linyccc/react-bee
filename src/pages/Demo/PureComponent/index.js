/* eslint-disable */
import React, { PureComponent, Component, Fragment } from 'react';
import { Button, Badge } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const introduction = (
  <Fragment>
    <div style={{ marginBottom: 16 }}>
      <p>
        Component不会比较当前和下个状态的props和state。因此，每当shouldComponentUpdate被调用时，组件默认的会重新渲染
      </p>
      <p>
        PureComponent将对props和state进行浅比较(
        <a
          href="https://imweb.io/topic/598973c2c72aa8db35d2e291"
          target="_blank"
          rel="noopener noreferrer"
        >
          什么是浅比较？
        </a>{' '}
        基本类型按值比较，引用类型按引用地址比较 )
      </p>

      <p>F12观察，当CounterButton组件渲染时控制台会打印CounterButton rendering</p>
    </div>
  </Fragment>
);

class CounterButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      words: {
        a: 'Mr.Lin',
      },
    };
  }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     if (this.props.type !== nextProps.type || this.state.count !== nextState.count) {
  //       return true;
  //     }
  //     return false;
  //   }

  add = () => {
    let { count } = this.state;
    this.setState({
      count: ++count,
    });
  };

  pushWord = () => {
    const { words } = this.state;
    words.a = Math.random();
    this.setState({ words });
  };

  render() {
    console.log('CounterButton rendering');
    const { type } = this.props;
    const { count, words } = this.state;
    return (
      <>
        <Button type={type} onClick={this.add} style={{ marginRight: 15 }}>
          点击累加
        </Button>

        <Button
          type={type}
          onClick={() => this.setState(() => ({ count: 3 }))}
          style={{ marginRight: 15 }}
        >
          设置Count = 3
        </Button>

        <Button type={type} onClick={this.pushWord} style={{ marginRight: 15 }}>
          设置title=Mr.Lin
        </Button>
        <Badge count={count} />
        <p>{words.a}</p>
      </>
    );
  }
}

class Handler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'default',
    };
  }

  setType = () => {
    this.setState({
      type: 'primary',
    });
  };

  render() {
    const { type } = this.state;
    return (
      <PageHeaderWrapper title="pureComponent和Component区别" content={introduction}>
        <div style={{ padding: 30, border: '2px solid #ddd', marginBottom: 30 }}>
          <Button type="default" onClick={this.setType}>
            点击
          </Button>{' '}
          设置CounterButton组件的props.type=primary
        </div>
        <div style={{ padding: 30, border: '2px solid #ddd' }}>
          <p>CounterButton组件</p>
          <p>props：type</p>
          <p>state:</p>
          <pre>{JSON.stringify({ count: 1, words: { a: 'Mr.Lin' } }, null, '\t')}</pre>
          <CounterButton type={type} />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Handler;
