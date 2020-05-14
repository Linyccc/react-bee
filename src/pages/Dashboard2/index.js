/* eslint-disable */
import React, { Component } from 'react';
import { Card, Button, Row, Col, List, Table, Radio, Typography } from 'antd';
import { connect } from 'dva';
import { Bar } from '@/components/Charts';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import styles from './custom.less';

const Info = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <p>{value}</p>
    <span>{title}</span>
    {bordered && <em />}
  </div>
);

const data = [
  '控件大小。注：标准表单内的输入框大小限制为 large。可选 large default small',
  '声明 input 类型，同原生 input 标签的 type 属性，见：MDN(请直接使用 Input.TextArea 代替 type="textarea")。',
  '自适应内容高度，可设置为 true|false 或对象：{ minRows: 2, maxRows: 6 }',
  '输入框内容',
  'Input 的其他属性和 React 自带的 input 一致。',
];

const columns = [
  {
    title: '客户名称',
    dataIndex: 'name',
    key: 'name',
    width: '50%',
    render: text => (
      <Typography.Paragraph ellipsis={{ rows: 1, expandable: true }}>{text}</Typography.Paragraph>
    ),
  },
  {
    title: '合同名称',
    dataIndex: 'age',
    key: 'age',
  },
];
const barData = [
  {
    name: '存量',
    'Jan.': 18.9,
    'Feb.': 28.8,
    'Mar.': 39.3,
    'Apr.': 81.4,
    May: 47,
    'Jun.': 20.3,
    'Jul.': 24,
    'Aug.': 35.6,
  },
  {
    name: '增量',
    'Jan.': 12.4,
    'Feb.': 23.2,
    'Mar.': 34.5,
    'Apr.': 99.7,
    May: 52.6,
    'Jun.': 35.5,
    'Jul.': 37.4,
    'Aug.': 42.4,
  },
];
const ds = new DataSet();
const dv = ds.createView().source(barData);
dv.transform({
  type: 'fold',
  fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'],
  // 展开字段集
  key: '月份',
  // key字段
  value: '月均降雨量', // value字段
});
const tableData = [
  {
    key: '1',
    name:
      'John BrownNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { salesType: 'telephone' };
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  render() {
    const { salesType } = this.state;
    return (
      <div>
        <Row gutter={16}>
          <Col lg={12} md={24}>
            <Card bordered={false} className="margin-bottom">
              <Row>
                <Col sm={8} xs={24}>
                  <Info title="我的预警" value="278" bordered />
                </Col>
                <Col sm={8} xs={24}>
                  <Info title="我的待办" value="8278" bordered />
                </Col>
                <Col sm={8} xs={24}>
                  <Info title="我的待阅" value="28" />
                </Col>
              </Row>
            </Card>
            <Card
              bordered={false}
              title="我的客户"
              className="margin-bottom"
              extra={<a href="##">更多</a>}
            >
              <List
                bordered={false}
                dataSource={data}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </Card>
            <Card
              bordered={false}
              title="我的合同"
              className="margin-bottom"
              extra={<a href="##">更多</a>}
            >
              <Table columns={columns} dataSource={tableData} pagination={false} size="middle" />
            </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card
              bordered={false}
              title="我的收入"
              className="margin-bottom"
              extra={
                <div>
                  <Radio.Group
                    value={salesType}
                    onChange={this.handleChangeSalesType}
                    buttonStyle="solid"
                  >
                    <Radio.Button value="telephone" ghost>
                      固话
                    </Radio.Button>
                    <Radio.Button value="idc">IDC</Radio.Button>
                    <Radio.Button value="networkElement">网元出租</Radio.Button>
                    <Radio.Button value="circuit ">电路出租</Radio.Button>
                    <Radio.Button value="internet">互联网专线</Radio.Button>
                  </Radio.Group>
                </div>
              }
            >
              <Chart height={300} data={dv} forceFit padding={[40, 30]}>
                <Axis name="存量" />
                <Axis name="增量" />
                <Legend position="top-right" />
                <Tooltip
                  crosshairs={{
                    type: 'y',
                  }}
                />
                <Geom
                  type="interval"
                  position="月份*月均降雨量"
                  color={['name', ['#fd7766', '#7db8f9']]}
                  adjust={[
                    {
                      type: 'dodge',
                      marginRatio: 1 / 32,
                    },
                  ]}
                />
              </Chart>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
