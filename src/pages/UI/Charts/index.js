import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Part1 from './Part1';
import Part2 from './Part2';
import Pie from './Pie';
import Radar from './Radar';
import Cloud from './Cloud';
import WaterWave from './WaterWave';
import TimeLine from './TimeLine';
import Bar from './Bar';

const topColResponsiveProps = {
  xs: 12,
  style: { marginBottom: 24 },
};

const introduction = (
  <div>
    <p>
      Ant Design Pro 提供的业务中常用的图表类型，都是基于 G2 按照 Ant Design
      图表规范封装，需要注意的是 Ant Design Pro
      的图表组件以套件形式提供，可以任意组合实现复杂的业务需求。 因为结合了 Ant Design
      的标准设计，本着极简的设计思想以及开箱即用的理念，简化了大量 API
      配置，所以如果需要灵活定制图表，可以参考 Ant Design Pro 图表实现，自行基于 G2
      封装图表组件使用。
    </p>
    <p>
      <a href="https://pro.ant.design/components/Charts-cn/">Pro antd 图表组件</a>
    </p>
  </div>
);
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PageHeaderWrapper title="Charts" content={introduction}>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <Part1 />
            <br />
            <Part2 />
            <br />
            <TimeLine />
          </Col>
          <Col {...topColResponsiveProps}>
            <Pie /> <br />
            <Radar /> <br />
            <Bar /> <br />
            <Cloud /> <br />
            <WaterWave />
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Demo;
