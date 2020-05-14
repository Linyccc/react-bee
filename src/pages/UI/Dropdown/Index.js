import React, { Component } from 'react';
import { Row, Col, Card, Menu, Dropdown, Icon, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const introduction = (
  <div>
    <p>
      更多用法参考
      <a
        href="https://ant.design/components/dropdown-cn/#API"
        target="_blank"
        rel="noopener noreferrer"
      >
        这里
      </a>
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
      <PageHeaderWrapper title="关于Dropdown" content={introduction}>
        <Row gutter={16}>
          <Col xs={12}>
            <Card title="最简单的下拉菜单" bordered={false} style={{ marginBottom: 16 }}>
              <p>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                          1st menu item
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                          2nd menu item
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                          3rd menu item
                        </a>
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <a
                    className="ant-dropdown-link"
                    href="#"
                    style={{ marginBottom: 16, marginRight: 16 }}
                  >
                    我是下拉菜单 <Icon type="down" />
                  </a>
                </Dropdown>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                          1st menu item
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                          2nd menu item
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                          3rd menu item
                        </a>
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottomLeft"
                >
                  <Button>我是下拉菜单</Button>
                </Dropdown>
              </p>
            </Card>
            <Card title="级联下拉菜单" bordered={false} style={{ marginBottom: 16 }}>
              <p>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>1st menu item</Menu.Item>
                      <Menu.Item>2nd menu item</Menu.Item>
                      <Menu.SubMenu title="sub menu">
                        <Menu.Item>3rd menu item</Menu.Item>
                        <Menu.Item>4th menu item</Menu.Item>
                      </Menu.SubMenu>
                      <Menu.SubMenu title="disabled sub menu" disabled>
                        <Menu.Item>5d menu item</Menu.Item>
                        <Menu.Item>6th menu item</Menu.Item>
                      </Menu.SubMenu>
                    </Menu>
                  }
                >
                  <a className="ant-dropdown-link" href="#">
                    我是级联下拉菜单 <Icon type="down" />
                  </a>
                </Dropdown>
              </p>
            </Card>
          </Col>
          <Col xs={12}>
            <Card title="右键菜单" bordered={false} style={{ marginBottom: 16 }}>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="1">1st menu item</Menu.Item>
                    <Menu.Item key="2">2nd menu item</Menu.Item>
                    <Menu.Item key="3">3rd menu item</Menu.Item>
                  </Menu>
                }
                trigger={['contextMenu']}
              >
                <span style={{ userSelect: 'none' }}>右键点击我</span>
              </Dropdown>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Demo;
