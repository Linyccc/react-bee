/* eslint-disable */
import React, { Component } from 'react';
import { Tabs, Select, Card, Row, Col } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;

const contentListNoTitle = {
  article: <p>article content</p>,
  app: <p>app content</p>,
  project: <p>project content</p>,
};

class Demo extends React.Component {
  state = {
    key: 'tab1',
    noTitleKey: 'app',
  };

  render() {
    const { key, noTitleKey } = this.state;
    return (
      <Row gutter={8}>
        <Col lg={12} xs={24}>
          <Card
            tabList={[
              {
                key: 'article',
                tab: '员工信息',
              },
              {
                key: 'app',
                tab: '组织关系',
              },
              {
                key: 'project',
                tab: '附件信息',
              },
            ]}
            // tabBarExtraContent={<a href="#">More</a>}
            activeTabKey={noTitleKey}
            onTabChange={key => {
              this.setState({ noTitleKey: key });
            }}
          >
            {contentListNoTitle[noTitleKey]}
          </Card>
          <Card
            headStyle={{ background: 'transparent' }}
            tabList={[
              {
                key: 'article',
                tab: '员工信息',
              },
              {
                key: 'app',
                tab: '组织关系',
              },
              {
                key: 'project',
                tab: '附件信息',
              },
            ]}
            // tabBarExtraContent={<a href="#">More</a>}
            activeTabKey={noTitleKey}
            onTabChange={key => {
              this.setState({ noTitleKey: key });
            }}
          >
            {contentListNoTitle[noTitleKey]}
          </Card>
        </Col>
        <Col lg={12} xs={24}>
          <Card
            title="Tabs"
            extra={
              <a href="https://ant.design/components/steps-cn/#API" target="_blank">
                API
              </a>
            }
          >
            <h4>基础用法</h4>
            <div style={{ marginBottom: 16 }}>
              <Tabs
                defaultActiveKey="1"
                onChange={key => {
                  console.log(key);
                }}
              >
                <Tabs.TabPane tab="Tab 1" key="1">
                  Content of Tab Pane 1
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 2" key="2">
                  Content of Tab Pane 2
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 3" key="3">
                  Content of Tab Pane 3
                </Tabs.TabPane>
              </Tabs>
            </div>
            <h4>卡片式</h4>
            <div style={{ marginBottom: 16 }}>
              <Tabs
                defaultActiveKey="1"
                type="card"
                onChange={key => {
                  console.log(key);
                }}
              >
                <Tabs.TabPane tab="Tab 1" key="1">
                  Content of Tab Pane 1
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 2" key="2">
                  Content of Tab Pane 2
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 3" key="3">
                  Content of Tab Pane 3
                </Tabs.TabPane>
              </Tabs>
            </div>
            <h4>垂直方向的</h4>
            <div className="margin-bottom">
              <Tabs tabPosition="left">
                <TabPane tab="员工信息" key="1">
                  Content of Tab 1
                </TabPane>
                <TabPane tab="组织关系" key="2">
                  Content of Tab 2
                </TabPane>
                <TabPane tab="附件信息" key="3">
                  Content of Tab 3
                </TabPane>
              </Tabs>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Demo;
