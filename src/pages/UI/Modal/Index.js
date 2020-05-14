/* eslint-disable */
import React, { Component } from 'react';
import { Icon, Card, Row, Col, Button, Modal, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import longImage from './img/KwPYo.jpg';

const buttonStyles = {
  style: { marginBottom: 12, marginRight: 12 },
};

const introduction = (
  <div>
    <div style={{ marginBottom: 16 }}>
      更多用法参考
      <a href="https://ant.design/components/modal-cn/#API" target="_blank">
        这里
      </a>{' '}
    </div>
  </div>
);

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { visible1: false, visible2: false };
  }

  render() {
    const { size } = this.state;
    return (
      <Row gutter={8}>
        <Col xs={24} lg={12}>
          <Card title="基础用法">
            <Button
              type="primary"
              onClick={() => {
                this.setState({
                  visible1: true,
                });
              }}
            >
              Open Modal
            </Button>
            <Modal
              title="Basic Modal"
              visible={this.state.visible1}
              onOk={e => {
                console.log(e);
                this.setState({
                  visible1: false,
                });
              }}
              onCancel={e => {
                console.log(e);
                this.setState({
                  visible1: false,
                });
              }}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </Card>
          <Card title="很高的弹窗">
            <Button
              type="primary"
              onClick={() => {
                this.setState({
                  visible2: true,
                });
              }}
            >
              Open Modal
            </Button>
            <Modal
              title="很高的弹窗"
              visible={this.state.visible2}
              onOk={e => {
                console.log(e);
                this.setState({
                  visible2: false,
                });
              }}
              onCancel={e => {
                console.log(e);
                this.setState({
                  visible2: false,
                });
              }}
            >
              <img src={longImage} alt="a long image" />
            </Modal>
          </Card>
          <Card title="手动更新和移除">
            <Button
              onClick={() => {
                let secondsToGo = 5;
                const modal = Modal.success({
                  title: 'This is a notification message',
                  content: `This modal will be destroyed after ${secondsToGo} second.`,
                });
                setInterval(() => {
                  secondsToGo -= 1;
                  modal.update({
                    content: `This modal will be destroyed after ${secondsToGo} second.`,
                  });
                }, 1000);
                setTimeout(() => modal.destroy(), secondsToGo * 1000);
              }}
            >
              5秒后自动关闭
            </Button>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Confirm">
            <Button
              {...buttonStyles}
              onClick={() => {
                {
                  Modal.confirm({
                    title: 'Do you Want to delete these items?',
                    content: 'Some descriptions',
                    onOk() {
                      console.log('OK');
                    },
                    onCancel() {
                      console.log('Cancel');
                    },
                  });
                }
              }}
            >
              Confirm
            </Button>
            <Button
              {...buttonStyles}
              onClick={() => {
                {
                  Modal.confirm({
                    title: 'Are you sure delete this task?',
                    content: 'Some descriptions',
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',
                    onOk() {
                      console.log('OK');
                    },
                    onCancel() {
                      console.log('Cancel');
                    },
                  });
                }
              }}
              type="dashed"
            >
              Delete
            </Button>
            <Button
              {...buttonStyles}
              onClick={() => {
                {
                  Modal.confirm({
                    title: 'Are you sure delete this task?',
                    content: 'Some descriptions',
                    okText: 'Yes',
                    okType: 'danger',
                    okButtonProps: {
                      disabled: true,
                    },
                    cancelText: 'No',
                    onOk() {
                      console.log('OK');
                    },
                    onCancel() {
                      console.log('Cancel');
                    },
                  });
                }
              }}
              type="dashed"
            >
              With extra props
            </Button>
          </Card>
          <Card title="信息提示">
            <Button
              {...buttonStyles}
              onClick={() => {
                Modal.info({
                  title: 'This is a notification message',
                  content: (
                    <div>
                      <p>some messages...some messages...</p>
                      <p>some messages...some messages...</p>
                    </div>
                  ),
                  onOk() {},
                });
              }}
            >
              Info
            </Button>
            <Button
              {...buttonStyles}
              onClick={() => {
                Modal.success({
                  title: 'This is a success message',
                  content: 'some messages...some messages...',
                });
              }}
            >
              Success
            </Button>
            <Button
              {...buttonStyles}
              onClick={() => {
                Modal.error({
                  title: 'This is an error message',
                  content: 'some messages...some messages...',
                });
              }}
            >
              Error
            </Button>
            <Button
              {...buttonStyles}
              onClick={() => {
                Modal.warning({
                  title: 'This is a warning message',
                  content: 'some messages...some messages...',
                });
              }}
            >
              Warning
            </Button>
          </Card>
          <Card title="Message">
            <Button
              {...buttonStyles}
              onClick={() => {
                message.info('This is a normal message');
              }}
            >
              Info
            </Button>
            <Button
              {...buttonStyles}
              onClick={() => {
                message.success('This is a message of success');
              }}
            >
              Success
            </Button>
            <Button
              {...buttonStyles}
              onClick={() => {
                message.error('This is a message of error');
              }}
            >
              Error
            </Button>
            <Button
              {...buttonStyles}
              onClick={() => {
                message.warning('This is message of warning');
              }}
            >
              Warning
            </Button>
            <Button
              {...buttonStyles}
              onClick={() => {
                const hide = message.loading('Action in progress..', 0);
                // Dismiss manually and asynchronously
                setTimeout(hide, 2500);
              }}
            >
              Loading
            </Button>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Demo;
