/* eslint-disable */
import React, { Component } from 'react';
import { Icon, Card, Row, Col, Skeleton, Avatar } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const tabList = [
  {
    key: 'tab1',
    tab: 'tab1',
  },
  {
    key: 'tab2',
    tab: 'tab2',
  },
];

const contentList = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
};

const tabListNoTitle = [
  {
    key: 'article',
    tab: 'article',
  },
  {
    key: 'app',
    tab: 'app',
  },
  {
    key: 'project',
    tab: 'project',
  },
];

const contentListNoTitle = {
  article: <p>article content</p>,
  app: <p>app content</p>,
  project: <p>project content</p>,
};
const introduction = (
  <div>
    更多用法参考
    <a href="https://ant.design/components/card-cn/#API" target="_blank" rel="noopener noreferrer">
      这里
    </a>
  </div>
);

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'tab1',
      noTitleKey: 'app',
    };
  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
    const { key, noTitleKey } = this.state;
    return (
      <Row gutter={8}>
        <Col lg={18} xs={24}>
          <Card title="Card title" extra={<a href="#">More</a>}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card title="内嵌卡片">
            <p
              style={{
                fontSize: 14,
                color: 'rgba(0, 0, 0, 0.85)',
                marginBottom: 16,
                fontWeight: 500,
              }}
            >
              Group title
            </p>
            <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
              Inner Card content
            </Card>
            <Card
              style={{ marginTop: 16 }}
              type="inner"
              title="Inner Card title"
              extra={<a href="#">More</a>}
            >
              Inner Card content
            </Card>
          </Card>
          <Card title="网格型内嵌卡片">
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
          </Card>
          <Card
            title="Card title"
            extra={<a href="#">More</a>}
            tabList={tabList}
            activeTabKey={key}
            // eslint-disable-next-line no-shadow
            onTabChange={key => {
              this.onTabChange(key, 'key');
            }}
          >
            {contentList[key]}
          </Card>
          <Card
            tabList={tabListNoTitle}
            activeTabKey={noTitleKey}
            // eslint-disable-next-line no-shadow
            onTabChange={key => {
              this.onTabChange(key, 'noTitleKey');
            }}
          >
            {contentListNoTitle[noTitleKey]}
          </Card>
        </Col>
        <Col lg={6} xs={24}>
          <Card>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card loading>
            <Card.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title="预加载的卡片"
              description="This is the description"
            />
          </Card>
          <Card actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}>
            <Skeleton loading avatar active>
              <Card.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Skeleton>
          </Card>
          <Card
            hoverable
            cover={
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            }
          >
            <Card.Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>

          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
          >
            <Card.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title="Card title"
              description="This is the description"
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Demo;
