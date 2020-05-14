/* eslint-disable */
import React, { Component } from 'react';
import Clover from '@/components/Dclover';
import styles from './styles.less';
import { Spin } from 'antd';
import { connect } from 'dva';
import isEqual from 'lodash/isEqual';
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
      <p>异步请求获取叶子的数据</p>
      <p>借助dva数据流，摆脱react数据逐级向下传递的方式</p>
      <p>
        demo演示了多个异步请求的3种场景：串行，并行，串行+并行。可以在services/demo.js里打开注释，查看效果
      </p>
    </div>
  </div>
);

class AdvancedClover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: 'default',
      menu: [],
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: `m_clover/queryMenu`,
      payload: { name: 'Mr.Lin' },
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      !isEqual(nextProps.menu, prevState.menu) ||
      !isEqual(nextProps.currentBgColor, prevState.bgColor) ||
      !isEqual(nextProps.collapsed, prevState.collapsed)
    ) {
      return {
        menu: nextProps.menu,
        bgColor: nextProps.currentBgColor,
        collapsed: nextProps.collapsed,
      };
    }
    // 返回 null 表示不更新，此函数最后一定需要返回值
    return null;
  }

  dataPipe(data) {
    this.setState({ bgColor: data });
  }

  render() {
    const { menu, bgColor, collapsed } = this.state;
    return (
      <Spin spinning={this.props.queryMenuLoading}>
        <PageHeaderWrapper title="组件和dva的综合使用" content={introduction}>
          <div className={styles.bg} style={{ backgroundColor: map[bgColor] }}>
            <div style={{ textAlign: 'center' }}>
              {this.props.collapsed ? '左菜单收起' : '左菜单展开'}
              <Clover text={menu} size={400} />
            </div>
          </div>
        </PageHeaderWrapper>
      </Spin>
    );
  }
}

export default connect(({ m_clover, global, loading }) => ({
  menu: m_clover.menu,
  collapsed: global.collapsed,
  currentBgColor: m_clover.currentBgColor,
  queryMenuLoading: loading.effects['m_clover/queryMenu'],
}))(AdvancedClover);
