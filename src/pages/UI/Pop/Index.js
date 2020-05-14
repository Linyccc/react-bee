/* eslint-disable */
import React, { Component } from 'react';
import { Card, Row, Col, Button, Popconfirm, message, Popover, Tooltip, notification } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const buttonStyles = {
  style: { marginBottom: 12, marginRight: 12 },
};

const introduction = (
  <div>
    <div style={{ marginBottom: 16 }}>包含Popover、Popconfirm和Tooltip</div>
  </div>
);

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PageHeaderWrapper title="气泡提示" content={introduction}>
        <Row gutter={16}>
          <Col xs={12}>
            <Card
              title="Popconfirm"
              bordered={false}
              style={{ marginBottom: 16 }}
              extra={
                <a
                  href="https://ant.design/components/popconfirm-cn/#API"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  API
                </a>
              }
            >
              <div style={{ marginBottom: 16 }}>
                <p>
                  基础用法：
                  <Popconfirm
                    title="Are you sure delete this task?"
                    onConfirm={e => {
                      console.log(e);
                      message.success('Click on Yes');
                    }}
                    onCancel={e => {
                      {
                        console.log(e);
                        message.error('Click on No');
                      }
                    }}
                  >
                    <a href="#">Delete</a>
                  </Popconfirm>
                </p>

                <p>
                  可以通过设置
                  <b>placement</b>
                  指定泡泡的方向：
                  <Popconfirm
                    title="Are you sure delete this task?"
                    onConfirm={e => {
                      console.log(e);
                      message.success('Click on Yes');
                    }}
                    onCancel={e => {
                      {
                        console.log(e);
                        message.error('Click on No');
                      }
                    }}
                    placement="right"
                  >
                    <a href="#">Delete</a>
                  </Popconfirm>
                </p>
              </div>
            </Card>
            <Card
              title="Popover"
              bordered={false}
              style={{ marginBottom: 16 }}
              extra={
                <a href="https://ant.design/components/popover-cn/#API" target="_blank">
                  API
                </a>
              }
            >
              <div style={{ marginBottom: 16 }}>
                <p>
                  基础用法：
                  <Popover
                    content={
                      <div>
                        <p>Content</p>
                        <p>Content</p>
                      </div>
                    }
                    title="Title"
                  >
                    <Button {...buttonStyles}>Hover me</Button>
                  </Popover>
                  <Popover
                    content={
                      <div>
                        <p>Content</p>
                        <p>Content</p>
                      </div>
                    }
                    title="Title"
                    trigger="click"
                  >
                    <Button {...buttonStyles}>Click me</Button>
                  </Popover>
                </p>
              </div>
            </Card>
          </Col>
          <Col xs={12}>
            <Card
              title="Tooltip"
              bordered={false}
              style={{ marginBottom: 16 }}
              extra={
                <a href="https://ant.design/components/popover-cn/#API" target="_blank">
                  API
                </a>
              }
            >
              <div style={{ marginBottom: 16 }}>
                <Tooltip title="prompt text">
                  <Button {...buttonStyles}>Hover me</Button>
                </Tooltip>
                <Tooltip title="prompt text" placement="right">
                  <Button {...buttonStyles}>right</Button>
                </Tooltip>
              </div>
            </Card>
            <Card
              title="Tooltip"
              bordered={false}
              style={{ marginBottom: 16 }}
              extra={
                <a href="https://ant.design/components/popover-cn/#API" target="_blank">
                  API
                </a>
              }
            >
              <div style={{ marginBottom: 16 }}>
                <Button
                  type="primary"
                  onClick={() => {
                    notification.open({
                      message: 'Notification Title',
                      description: 'http://10.45.87.198:8090/ulogserver/UserLoginLogController',
                      duration: null,
                    });
                  }}
                >
                  Open the notification box
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Demo;
