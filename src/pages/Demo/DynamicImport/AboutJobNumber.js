/* eslint-disable */
import React, { Component } from 'react';
import { Button, Form, Icon, Col, Row, DatePicker, TimePicker, Input, Select } from 'antd';

const { Search, TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};

@Form.create()
class AboutJobNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;
    return (
      <div>
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.name}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入仓库名称' }],
                })(<Input placeholder="请输入仓库名称" />)}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.url}>
                {getFieldDecorator('url', {
                  rules: [{ required: true, message: '请选择' }],
                })(
                  <Input
                    style={{ width: '100%' }}
                    addonBefore="http://"
                    addonAfter=".com"
                    placeholder="请输入"
                  />
                )}
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item label={fieldLabels.owner}>
                {getFieldDecorator('owner', {
                  rules: [{ required: true, message: '请选择管理员' }],
                })(
                  <Select placeholder="请选择管理员">
                    <Option value="xiao">付晓晓</Option>
                    <Option value="mao">周毛毛</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.approver}>
                {getFieldDecorator('approver', {
                  rules: [{ required: true, message: '请选择审批员' }],
                })(
                  <Select placeholder="请选择审批员">
                    <Option value="xiao">付晓晓</Option>
                    <Option value="mao">周毛毛</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item label={fieldLabels.dateRange}>
                {getFieldDecorator('dateRange', {
                  rules: [{ required: true, message: '请选择生效日期' }],
                })(
                  <RangePicker placeholder={['开始日期', '结束日期']} style={{ width: '100%' }} />
                )}
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item label={fieldLabels.type}>
                {getFieldDecorator('type', {
                  rules: [{ required: true, message: '请选择仓库类型' }],
                })(
                  <Select placeholder="请选择仓库类型">
                    <Option value="private">私密</Option>
                    <Option value="public">公开</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default AboutJobNumber;
