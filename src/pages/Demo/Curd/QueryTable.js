import React, { Component, Fragment } from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Popconfirm,
  Divider,
  message,
  Badge,
} from 'antd';
import SlickTable from '@/components/SlickTable';
import Ellipsis from '@/components/Ellipsis';
import PopEdit from '@/components/PopEdit';
import remove from 'lodash/remove';
import omit from 'lodash/omit';
import map from 'lodash/map';
import PubSub from 'pubsub-js';
import request from '@/utils/request';
import styles from './styles.less';

const moduleName = 'moduleName';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

@Form.create()
class QueryTable extends Component {
  state = {
    expandForm: false,
    formValues: {},
    selectedRows: [], // 选中项
    pagination: {
      current: 1,
      pageSize: 10,
    },
    creator: 'Mr.Lin',
    list: [],
    listLoading: false,
    filteredInfo: {},
    sortedInfo: {
      field: 'createDate',
      order: 'descend',
    },
    statusMap: [],
    unit: [],
    typeMap: [],
  };

  componentDidMount() {
    request('/myOrder/map', { data: ['statusMap', 'typeMap'], expiry: 1000 * 60 }).then(res => {
      const {
        resultData: { statusMap, typeMap },
      } = res;
      this.setState({ statusMap, typeMap });
    });
    this.handleSearch();

    // 订阅 - 创建
    PubSub.subscribe(`${moduleName}.create`, (msg, data) => {
      const { list, pagination } = this.state;
      list.unshift(data);
      pagination.total += 1;
      this.setState({
        list,
        pagination,
      });
    });

    // 订阅 - 删除
    PubSub.subscribe(`${moduleName}.delete`, (msg, data) => {
      // eslint-disable-next-line prefer-const
      let { list, pagination } = this.state;
      remove(list, item => {
        return item.id === data.id;
      });
      pagination.total -= 1;
      this.setState({
        list,
        pagination,
      });
      message.success('删除成功！');
    });

    // 订阅 - 编辑
    PubSub.subscribe(`${moduleName}.edit`, (msg, data) => {
      let { list } = this.state;
      list = map(list, item => {
        if (item.id === data.id) {
          return { ...item, ...data };
        }
        return item;
      });

      this.setState({
        list,
      });
    });
  }

  componentWillUnmount() {
    PubSub.unsubscribe(`${moduleName}`);
  }

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
      sortedInfo: {},
      filteredInfo: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  query = params => {
    this.setState({ listLoading: true });
    request('/myOrder/queryList', {
      data: params,
    })
      .then(result => {
        if (result.resultCode === '0') {
          const {
            resultData: { list, pagination },
          } = result;
          this.setState({ list, pagination });
        }
      })
      .always(() => {
        this.setState({ listLoading: false });
      });
  };

  handleSearch = e => {
    if (e) {
      e.preventDefault();
    }
    const { form } = this.props;
    const { sortedInfo, filteredInfo } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let newFormValues = { ...omit(fieldsValue, 'createDateRange') };
      if (fieldsValue.createDateRange) {
        // 拆分fieldsValue.createDateRange
        // 同时格式化数值，因为默认取到的是这样的格式 ["2019-02-09T15:22:14.109Z", "2019-03-11T15:22:14.109Z"]
        const beginDate = moment(fieldsValue.createDateRange[0]).format('YYYY-MM-DD');
        const endDate = moment(fieldsValue.createDateRange[1]).format('YYYY-MM-DD');
        newFormValues = { ...newFormValues, beginDate, endDate };
      }
      this.query({ ...newFormValues, current: 1, pageSzie: 10, ...sortedInfo, ...filteredInfo });
    });
  };

  /**
   * 选中项发生变化时的回调
   * @ selectedRow {Array[object]} 数组对象，当前选中的所有行数据
   */
  handleSelectRows = selectedRows => {
    this.setState({
      selectedRows,
    });
  };

  /**
   * 切换分页，列头排序，列头过滤时都会触发这个回调
   * @ pagination {Object}
        {
          current: 1
          pageSize: 10
          showQuickJumper: true
          showSizeChanger: true
          showTotal: ƒunc
        }
   * @ filters {Object}
   * @ sort {Object}
        {
          column: {},
          dataIndex: 'createDate',
          sortOrder: false,
          sorter: true,
          title: '库存失效日期',
          columnKey: 'createDate',
          field: 'createDate',
          order: 'ascend',
        }
   */
  handleChange = (pagination, filters, sorter) => {
    const { formValues } = this.state;
    const { field, order } = sorter;
    const { current, pageSize, total } = pagination;
    this.setState({
      filteredInfo: filters,
      sortedInfo: {
        field,
        order,
      },
      current,
      pageSize,
    });

    this.query({ current, pageSize, total, field, order, ...filters, ...formValues });
  };

  renderSimpleForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { statusMap } = this.state;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="单号/名称" {...formItemLayout}>
              {getFieldDecorator('keyword')(<Input allowClear placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="发起人" {...formItemLayout}>
              <PopEdit
                {...{
                  modalProps: {
                    title: '选择发起人',
                    render: () => {
                      return <p>Welcome</p>;
                    },
                    onOk: () => {
                      console.log('触发onOk');
                    },
                  },
                  formProps: {
                    getFieldDecorator,
                    id: 'creator',
                    options: {
                      initialValue: this.state.creator,
                      isRequired: true,
                    },
                  },
                }}
              />
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <div className="margin-bottom">
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </div>
          </Col>
        </Row>
      </Form>
    );
  };

  renderAdvancedForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { statusMap, typeMap, unit } = this.state;

    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="单号/名称" {...formItemLayout}>
              {getFieldDecorator('keyword')(<Input allowClear placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="发起人" {...formItemLayout}>
              <PopEdit
                {...{
                  modalProps: {
                    title: '选择发起人',
                    render: () => {
                      return <p>Welcome</p>;
                    },
                    onOk: () => {
                      console.log('触发onOk');
                    },
                  },
                  formProps: {
                    getFieldDecorator,
                    id: 'creator',
                    options: {
                      initialValue: this.state.creator,
                      isRequired: true,
                    },
                  },
                }}
              />
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="状态" {...formItemLayout}>
              {getFieldDecorator('status')(
                <Select
                  allowClear
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  showSearch
                  optionFilterProp="children"
                >
                  {statusMap.map(item => (
                    <Select.Option key={item.value}>{item.label}</Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="上报单位" {...formItemLayout}>
              {getFieldDecorator('unit')(
                <Select
                  allowClear
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  showSearch
                  optionFilterProp="children"
                >
                  {unit.length > 0
                    ? unit.map(item => <Select.Option key={item.value}>{item.label}</Select.Option>)
                    : null}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="类型" {...formItemLayout}>
              {getFieldDecorator('type')(
                <Select
                  allowClear
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  showSearch
                  optionFilterProp="children"
                >
                  {typeMap.map(item => (
                    <Select.Option key={item.value}>{item.label}</Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <div className="margin-bottom">
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起 <Icon type="up" />
              </a>
            </div>
          </Col>
        </Row>
      </Form>
    );
  };

  actionHandler = (e, mode, record) => {
    e.preventDefault();
    const { goToStep } = this.props;
    // 详情
    if (mode === 'view') {
      goToStep(3, { record });
    }

    // 编辑
    if (mode === 'edit') {
      goToStep(2, { id: record.id, mode: 'edit' });
    }

    // 删除
    if (mode === 'delete') {
      PubSub.publish(`${moduleName}.delete`, { id: record.id });
    }
  };

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { sortedInfo, list, pagination, listLoading, selectedRows } = this.state;
    return (
      <Fragment>
        <div className="layout-flow">{this.renderForm()}</div>
        {/* {selectedRows.length > 0 && (
          <div className="margin-bottom">
            <Button>批量审核</Button>
          </div>
        )} */}
        <SlickTable
          rowKey={record => record.id}
          pick="checkbox"
          loading={listLoading}
          data={{
            list,
            pagination: {
              ...pagination,
            },
          }}
          columns={[
            {
              title: '单号',
              dataIndex: 'code',
            },
            {
              title: '申请单名称',
              dataIndex: 'name',
              render: (text, record) => {
                return (
                  <a
                    href="#"
                    onClick={e => {
                      this.actionHandler(e, 'view', record);
                    }}
                  >
                    <Ellipsis length={20} tooltip>
                      {text}
                    </Ellipsis>
                  </a>
                );
              },
            },
            {
              title: '上报单位',
              dataIndex: 'unit',
              // width: 220,
            },
            {
              title: '类型',
              dataIndex: 'type',
              // width: 150,
              render: val => {
                return <span>{val.label}</span>;
              },
            },
            {
              title: '状态',
              // width: 150,
              dataIndex: 'status',
              render: val => {
                if (+val.value === 4) {
                  return (
                    <Fragment>
                      <Badge status="success" /> {val.label}
                    </Fragment>
                  );
                }
                if (+val.value === 5) {
                  return (
                    <Fragment>
                      <Badge status="error" /> {val.label}
                    </Fragment>
                  );
                }
                if (+val.value === 2) {
                  return (
                    <Fragment>
                      <Badge status="processing" /> {val.label}
                    </Fragment>
                  );
                }
                if (+val.value === 1) {
                  return (
                    <Fragment>
                      <Badge status="default" /> {val.label}
                    </Fragment>
                  );
                }
                if (+val.value === 3) {
                  return (
                    <Fragment>
                      <Badge status="warning" /> {val.label}
                    </Fragment>
                  );
                }
                return null;
              },
            },
            {
              title: '当前环节',
              dataIndex: 'tache',
              // width: 200,
              render: val => {
                return <span>{val ? val.label : '发起'}</span>;
              },
            },
            {
              title: '提交时间',
              // width: 200,
              dataIndex: 'createDate',
            },
            {
              title: '操作',
              key: 'action',
              // width: 150,
              // fixed: 'right',
              render: (text, record) => {
                return (
                  <span>
                    <a
                      href="#"
                      onClick={e => {
                        this.actionHandler(e, 'edit', record);
                      }}
                    >
                      编辑
                    </a>
                    <Divider type="vertical" />
                    <Popconfirm
                      title="确定要删除吗"
                      okText="确定"
                      cancelText="取消"
                      onConfirm={e => {
                        this.actionHandler(e, 'delete', record);
                      }}
                    >
                      <a href="#">删除</a>
                    </Popconfirm>
                  </span>
                );
              },
            },
          ]}
          onSelectRow={this.handleSelectRows}
          onChange={this.handleChange}
        />
      </Fragment>
    );
  }
}

export default QueryTable;
