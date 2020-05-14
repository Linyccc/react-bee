import React, { Component } from 'react';
import { Card, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import numeral from 'numeral';

const { Description } = DescriptionList;

class Detail extends Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const {
      record: { name, createDate, tache, type, status },
    } = this.props;
    return (
      <div style={{ marginBottom: 80 }}>
        <Card>
          <DescriptionList size="small" title="基础信息">
            <Description term="申请单名称">{name}</Description>
            <Description term="提交时间">{createDate}</Description>
            <Description term="当前环节">{tache.label}</Description>
            <Description term="类型">{type.label}</Description>
            <Description term="状态">{status.label}</Description>
          </DescriptionList>
          <Divider />
          <DescriptionList size="small" title="基础信息">
            <Description term="申请单名称">{name}</Description>
            <Description term="提交时间">{createDate}</Description>
            <Description term="当前环节">{tache.label}</Description>
            <Description term="类型">{type.label}</Description>
            <Description term="状态">{status.label}</Description>
          </DescriptionList>
        </Card>

        <Card title="引入文件">
          <p />
        </Card>
      </div>
    );
  }
}

export default Detail;
