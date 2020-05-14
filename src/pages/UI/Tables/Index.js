import React, { Component } from 'react';
import { Card, Row, Col, Tag, Table, Icon, Switch, Radio, Form, Divider } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Link from 'umi/link';
import Resizeable from './Resizeable';
/* eslint-disable */
const topProps = {
  xs: 12,
  style: { marginBottom: 12, marginRight: 12 },
};
/* eslint-enable */
const introduction = (
  <div>
    <div>
      更多用法参考
      <a
        href="https://ant.design/components/table-cn/#API"
        target="_blank"
        rel="noopener noreferrer"
      >
        这里
      </a>
      <div>
        <Link to="/log/detail">服务端分页实例</Link> <Divider type="vertical" />
        <Link to="/list/table-list">高级用法实例</Link>
      </div>
    </div>
  </div>
);

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: `${i}2`,
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

const expandedRowRender = record => <p>{record.description}</p>;
const title = () => 'Here is title';
const showHeader = true;
const footer = () => 'Here is footer';
const scroll = { y: 240 };
const pagination = { position: 'bottom' };

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bordered: false,
      loading: false,
      pagination,
      size: 'default',
      expandedRowRender,
      title: undefined,
      showHeader,
      footer,
      rowSelection: {},
      scroll: undefined,
      hasData: true,
    };
  }

  handleToggle = prop => {
    return enable => {
      this.setState({ [prop]: enable });
    };
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  handleExpandChange = enable => {
    this.setState({ expandedRowRender: enable ? expandedRowRender : undefined });
  };

  handleTitleChange = enable => {
    this.setState({ title: enable ? title : undefined });
  };

  handleHeaderChange = enable => {
    this.setState({ showHeader: enable ? showHeader : false });
  };

  handleFooterChange = enable => {
    this.setState({ footer: enable ? footer : undefined });
  };

  handleRowSelectionChange = enable => {
    this.setState({ rowSelection: enable ? {} : undefined });
  };

  handleScollChange = enable => {
    this.setState({ scroll: enable ? scroll : undefined });
  };

  handleDataChange = hasData => {
    this.setState({ hasData });
  };

  handlePaginationChange = e => {
    const { value } = e.target;
    this.setState({
      pagination: value === 'none' ? false : { position: value },
    });
  };

  render() {
    const { state } = this;
    return (
      <PageHeaderWrapper title="关于表格" content={introduction}>
        <Card title="基础类型">
          <Table
            columns={[
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="#">{text}</a>,
              },
              {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
              },
              {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
              },
              {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => (
                  <span>
                    {tags.map(tag => (
                      <Tag color="blue" key={tag}>
                        {tag}
                      </Tag>
                    ))}
                  </span>
                ),
              },
              {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <a href="#">Invite {record.name}</a>
                    <Divider type="vertical" />
                    <a href="#">Delete</a>
                  </span>
                ),
              },
            ]}
            dataSource={[
              {
                key: '1',
                name: 'John Brown',
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
            ]}
          />
        </Card>

        <Card title="列宽可拖拽">
          <Resizeable />
        </Card>
        <Card title="高级表格 - 通过动态属性展示table能力">
          <div className="margin-bottom">
            <Form layout="inline">
              <Form.Item label="Bordered">
                <Switch checked={state.bordered} onChange={this.handleToggle('bordered')} />
              </Form.Item>
              <Form.Item label="loading">
                <Switch checked={state.loading} onChange={this.handleToggle('loading')} />
              </Form.Item>
              <Form.Item label="Title">
                <Switch checked={!!state.title} onChange={this.handleTitleChange} />
              </Form.Item>
              <Form.Item label="Column Header">
                <Switch checked={!!state.showHeader} onChange={this.handleHeaderChange} />
              </Form.Item>
              <Form.Item label="Footer">
                <Switch checked={!!state.footer} onChange={this.handleFooterChange} />
              </Form.Item>
              <Form.Item label="Expandable">
                <Switch checked={!!state.expandedRowRender} onChange={this.handleExpandChange} />
              </Form.Item>
              <Form.Item label="Checkbox">
                <Switch checked={!!state.rowSelection} onChange={this.handleRowSelectionChange} />
              </Form.Item>
              <Form.Item label="Fixed Header">
                <Switch checked={!!state.scroll} onChange={this.handleScollChange} />
              </Form.Item>
              <Form.Item label="Has Data">
                <Switch checked={!!state.hasData} onChange={this.handleDataChange} />
              </Form.Item>
              <Form.Item label="Size">
                <Radio.Group size="default" value={state.size} onChange={this.handleSizeChange}>
                  <Radio.Button value="default">Default</Radio.Button>
                  <Radio.Button value="middle">Middle</Radio.Button>
                  <Radio.Button value="small">Small</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Pagination">
                <Radio.Group
                  value={state.pagination ? state.pagination.position : 'none'}
                  onChange={this.handlePaginationChange}
                >
                  <Radio.Button value="top">Top</Radio.Button>
                  <Radio.Button value="bottom">Bottom</Radio.Button>
                  <Radio.Button value="both">Both</Radio.Button>
                  <Radio.Button value="none">None</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Form>
          </div>
          <Table
            {...this.state}
            columns={[
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: 150,
                render: text => <a href="#">{text}</a>,
              },
              {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                width: 70,
              },
              {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
              },
              {
                title: 'Action',
                key: 'action',
                width: 360,
                render: (text, record) => (
                  <span>
                    <a href="#">Action 一 {record.name}</a>
                    <Divider type="vertical" />
                    <a href="#">Delete</a>
                    <Divider type="vertical" />
                    <a href="#" className="ant-dropdown-link">
                      More actions <Icon type="down" />
                    </a>
                  </span>
                ),
              },
            ]}
            dataSource={state.hasData ? data : null}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Demo;
