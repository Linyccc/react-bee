import React, { Component } from 'react';
import { Icon, Card, Row, Col, Button, Radio, Menu, Dropdown } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const topProps = {
  xs: 12,
  style: { marginBottom: 12, marginRight: 12 },
};

const introduction = (
  <div>
    <div style={{ marginBottom: 16 }}>
      更多用法参考
      <a
        href="https://ant.design/components/button-cn/#API"
        target="_blank"
        rel="noopener noreferrer"
      >
        这里
      </a>
    </div>
  </div>
);

function handleMenuClick(e) {
  console.log('click', e); // eslint-disable-line
}
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { size: 'large' };
  }

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    return (
      <PageHeaderWrapper title="关于按钮" content={introduction}>
        <Row gutter={16}>
          <Col xs={12}>
            <Card title="按钮类型" bordered={false} style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 16 }}>
                按钮有四种类型：主按钮、次按钮、虚线按钮、危险按钮。主按钮在同一个操作区域最多出现一次。
              </div>
              <div style={{ marginBottom: 16 }}>
                <Button type="primary" {...topProps}>
                  Primary
                </Button>
                <Button type="primary" {...topProps} ghost>
                  Primary
                </Button>
                <Button {...topProps} className="cube-btn-info">
                  Info
                </Button>
                <Button {...topProps}>Default</Button>
                <Button type="dashed" {...topProps}>
                  Dashed
                </Button>
                <Button type="danger" {...topProps}>
                  Danger
                </Button>
              </div>
              <p>
                追加样式<code>.cube-btn-round</code>
              </p>
              <div style={{ marginBottom: 16 }}>
                <Button type="primary" {...topProps} className="cube-btn-round">
                  Primary
                </Button>
                <Button type="primary" {...topProps} className="cube-btn-round" ghost>
                  Primary
                </Button>
                <Button {...topProps} className="cube-btn-info cube-btn-round">
                  Info
                </Button>
                <Button {...topProps} className="cube-btn-round">
                  Default
                </Button>
                <Button type="dashed" {...topProps} className="cube-btn-round">
                  Dashed
                </Button>
                <Button type="danger" {...topProps} className="cube-btn-round">
                  Danger
                </Button>
              </div>
            </Card>
            <Card title="按钮尺寸" bordered={false} style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 16 }}>
                <Radio.Group value={size} onChange={this.handleSizeChange}>
                  <Radio.Button value="large">Large</Radio.Button>
                  <Radio.Button value="default">Default</Radio.Button>
                  <Radio.Button value="small">Small</Radio.Button>
                </Radio.Group>
                <br />
                <br />
                <Button type="primary" size={size} {...topProps}>
                  Primary
                </Button>
                <Button size={size} {...topProps}>
                  Normal
                </Button>
                <Button type="dashed" size={size} {...topProps}>
                  Dashed
                </Button>
                <Button type="danger" size={size} {...topProps}>
                  Danger
                </Button>
                <br />
                <Button type="primary" shape="circle" icon="download" size={size} {...topProps} />
                <Button type="primary" icon="download" size={size} {...topProps}>
                  Download
                </Button>
                <br />
                <Button.Group size={size}>
                  <Button type="primary" {...topProps}>
                    <Icon type="left" />
                    Backward
                  </Button>
                  <Button type="primary" {...topProps}>
                    Forward
                    <Icon type="right" />
                  </Button>
                </Button.Group>
              </div>
            </Card>{' '}
            <Card title="块状按钮" bordered={false} style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 16 }}>添加block属性将使按钮适合其父宽度。。</div>
              <div style={{ marginBottom: 16 }}>
                <Button type="primary" block {...topProps}>
                  Primary
                </Button>
                <Button {...topProps} block>
                  Default
                </Button>
                <Button type="dashed" {...topProps} block>
                  Dashed
                </Button>
                <Button type="danger" {...topProps} block>
                  Danger
                </Button>
              </div>
            </Card>
          </Col>
          <Col xs={12}>
            <Card title="图标按钮" bordered={false} style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 16 }}>
                <Button type="primary" shape="circle" icon="search" {...topProps} />
                <Button type="primary" icon="search" {...topProps}>
                  Search
                </Button>
                <Button shape="circle" icon="search" {...topProps} />
                <Button icon="search" {...topProps}>
                  Search
                </Button>
                <br />
                <Button shape="circle" icon="search" {...topProps} />
                <Button icon="search" {...topProps}>
                  Search
                </Button>
                <Button type="dashed" shape="circle" icon="search" {...topProps} />
                <Button type="dashed" icon="search" {...topProps}>
                  Search
                </Button>
              </div>
            </Card>
            <Card title="多个按钮组合" bordered={false} style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 16 }}>
                按钮组合使用时，推荐使用1个主操作 + n 个次操作，3个以上操作时把更多操作放到
                Dropdown.Button 中组合使用。
              </div>
              <div style={{ marginBottom: 16 }}>
                <Button type="primary" {...topProps}>
                  primary
                </Button>
                <Button {...topProps}>secondary</Button>
                <Dropdown overlay={menu} {...topProps}>
                  <Button>
                    Actions <Icon type="down" />
                  </Button>
                </Dropdown>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Demo;
