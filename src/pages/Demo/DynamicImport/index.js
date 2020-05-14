/* eslint-disable */
import React, { Component } from 'react';
import { Table, Tabs, Card, Input, Button } from 'antd';
import LoadingComponent from '@/components/PageLoading/index';
import TableWrapper from '@/components/TableWrapper';
import { fixPlaceholderForIE } from '@/utils/utils';
import dynamic from 'umi/dynamic';

const { TabPane } = Tabs;
const { Search } = Input;

const columns = [
  {
    title: '角色标识',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: '角色名称',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '角色编码',
    dataIndex: 'address',
    sorter: (a, b) => a.address.length - b.address.length,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

const tabListNoTitle = [
  {
    key: 'roleInfo',
    tab: '角色信息',
  },
  {
    key: 'aboutAuthority',
    tab: '关联权限',
  },
  {
    key: 'aboutJobNumber',
    tab: '关联工号',
  },
];

const LoadableRoleInfo = dynamic({
  loader: () => import('./RoleInfo'),
  loading: LoadingComponent,
});
const LoadableAboutAuthority = dynamic({
  loader: () => import('./AboutAuthority'),
  loading: LoadingComponent,
});
const LoadableAboutJobNumber = dynamic({
  loader: () => import('./AboutJobNumber'),
  loading: LoadingComponent,
});

// const contentListNoTitle = {
//   roleInfo: <LoadableRoleInfo />,
//   aboutAuthority: <LoadableAboutAuthority />,
//   jobNumber: <LoadableAboutJobNumber />,
// };

class RoleManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'tab1',
      noTitleKey: 'roleInfo',
    };
  }

  componentDidMount() {
    fixPlaceholderForIE();
  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  getChildren(key) {
    switch (key) {
      case 'roleInfo':
        return <LoadableRoleInfo />;
      case 'aboutAuthority':
        return <LoadableAboutAuthority />;
      case 'aboutJobNumber':
        return <LoadableAboutJobNumber />;
      default:
        return <LoadableRoleInfo />;
    }
  }

  render() {
    return (
      <div className="card-container">
        <div>
          <Card title="查询" className="cube-tabs-lined" bordered={false}>
            <div style={{ width: '60%', margin: '0 auto' }}>
              <Input.Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                enterButton="搜索"
              />
            </div>
          </Card>
          <Card
            title="纳税人资质列表"
            className="cube-tabs-lined"
            bordered={false}
            extra={
              <Button type="primary" ghost>
                新增
              </Button>
            }
          >
            <TableWrapper
              table={
                <Table
                  bordered
                  columns={columns}
                  dataSource={data}
                  onChange={onChange}
                  size="middle"
                  bordered={false}
                  pagination={false}
                />
              }
              actions={
                <div>
                  <Button>上传专票信息采集表</Button>
                  <Button>下载专票信息采集表</Button>
                </div>
              }
            />
          </Card>

          <Card
            style={{ width: '100%' }}
            className="cube-tabs-filled"
            tabList={tabListNoTitle}
            bordered={false}
            activeTabKey={this.state.noTitleKey}
            onTabChange={key => {
              this.onTabChange(key, 'noTitleKey');
            }}
          >
            {/* {contentListNoTitle[this.state.noTitleKey]} */}
            {this.getChildren(this.state.noTitleKey)}
          </Card>
          <Card
            title="角色管理"
            className="margin-z"
            extra={<Search placeholder="角色名称、角色编码" onSearch={() => ({})} />}
          >
            <Table bordered columns={columns} dataSource={data} onChange={onChange} size="middle" />
          </Card>
          <Card
            style={{ width: '100%' }}
            className="margin-z cube-tabs-filled"
            tabList={tabListNoTitle}
            activeTabKey={this.state.noTitleKey}
            onTabChange={key => {
              this.onTabChange(key, 'noTitleKey');
            }}
          >
            {/* {contentListNoTitle[this.state.noTitleKey]} */}
            {this.getChildren(this.state.noTitleKey)}
          </Card>
        </div>
      </div>
    );
  }
}

export default RoleManage;
