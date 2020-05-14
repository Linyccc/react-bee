import React, { Component } from 'react';
import { Card, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import numeral from 'numeral';

const { Description } = DescriptionList;

class Scene3 extends Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { resourceCode, resourceName, number1, number2, createDate, creatorName } = this.props;
    return (
      <div style={{ marginBottom: 80 }}>
        <Card style={{ marginBottom: 24 }}>
          <DescriptionList size="small" title="基础信息" style={{ marginBottom: 32 }}>
            <Description term="入库单号">{resourceCode}</Description>
            <Description term="资源名称">{resourceName}</Description>
            <Description term="建单人">{creatorName}</Description>
            <Description term="金额">￥ {numeral(number2).format('0,0')}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="small" title="库存信息" style={{ marginBottom: 32 }}>
            <Description term="资源数量">{numeral(number1).format('0,0')}</Description>
            <Description term="入库数量">{numeral(number2).format('0,0')}</Description>
            <Description term="库存失效时间">{createDate}</Description>
          </DescriptionList>
        </Card>

        <Card title="引入文件">
          <p />
        </Card>
      </div>
    );
  }
}

export default Scene3;
