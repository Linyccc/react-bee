import React, { Component } from 'react';
import Clover from '@/components/Clover';
import styles from './styles.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const map = {
  default: '#rgb(240, 242, 245)',
  red: 'rgba(247, 114, 114, 0.984)',
  yellow: 'rgb(245, 245, 129)',
  blue: 'rgb(133, 219, 245)',
  green: 'rgb(193, 245, 115)',
};
const introduction = (
  <div>
    <div style={{ marginBottom: 16 }}>
      <p>涉及3个组件：Clover的父组件(即调用它的组件)，Clover和Clover的子组件Leaf。</p>
      <p>通过这个Demo，可以看到组件的props和state的用法，以及数据如何逐级向下传递的。</p>
    </div>
  </div>
);
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: 'default',
      menu: ['组件', '动画', 'dva', '通信'],
    };
  }

  dataPipe(data) {
    this.setState({ bgColor: data });
  }

  render() {
    const { menu, bgColor } = this.state;
    return (
      <PageHeaderWrapper title="组件的定义与调用" content={introduction}>
        <div className={styles.bg} style={{ backgroundColor: map[bgColor] }}>
          <div style={{ textAlign: 'center' }}>
            <Clover text={menu} size={400} dataPipe={msg => this.dataPipe(msg)} />
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Index;
