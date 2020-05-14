import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Cascader,
  Modal,
  Dropdown,
  Divider,
  message,
  Badge,
  Menu,
} from 'antd';
import SlickTable from '@/components/SlickTable';
import Ellipsis from '@/components/Ellipsis';
import numeral from 'numeral';
import Yuan from '@/utils/Yuan';
import request from '@/utils/request';
import omit from 'lodash/omit';
import styles from './TableList.less';

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
class QueryTable extends PureComponent {
  state = {
    expandForm: false,
    formValues: {},
    selectedRows: [], // 选中项
    pagination: {
      current: 1,
      pageSize: 10,
    },
    list: [],
    listLoading: false,
    filteredInfo: {},
    sortedInfo: {
      field: 'createDate',
      order: 'descend',
    },
    resourceType: [
      {
        value: '00',
        label: '全部',
      },
      {
        value: '01',
        label: '产品类',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
          },
        ],
      },
      {
        value: '02',
        label: '服务类',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
          },
        ],
      },
      {
        value: '03',
        label: '业务类',
        children: [
          {
            value: 'nanjing2',
            label: 'Nanjing2',
          },
        ],
      },
      {
        value: '04',
        label: '资源类',
        children: [
          {
            value: 'nanjing3',
            label: 'Nanjing3',
          },
        ],
      },
    ],
    sceneType: [],
    statusType: [
      {
        value: 0,
        label: '启用',
      },
      {
        value: 1,
        label: '停用',
      },
    ],
    chanelType: [],
  };

  componentDidMount() {
    // request('/scene/queryMaps', { method: 'get' }).then(res => {
    //   this.setState({ orderType: res.resultObject.orderType, staffOrg: res.resultObject.staffOrg });
    // });
    this.handleSearch();
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
    request('/scene/queryList', {
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
    e && e.preventDefault();
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
    const { resourceType } = this.state;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="权益资源" {...formItemLayout}>
              {getFieldDecorator('resourceName')(<Input allowClear placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="资源类型" {...formItemLayout}>
              {getFieldDecorator('resourceType')(
                <Cascader
                  expandTrigger="hover"
                  options={resourceType}
                  placeholder="请选择"
                  showSearch
                />
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                高级查询 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  renderAdvancedForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { resourceType, sceneType, chanelType, statusType } = this.state;

    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="权益资源" {...formItemLayout}>
              {getFieldDecorator('resourceName')(<Input allowClear placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="资源类型" {...formItemLayout}>
              {getFieldDecorator('resourceType')(
                <Cascader
                  expandTrigger="hover"
                  options={resourceType}
                  placeholder="请选择"
                  showSearch
                />
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="适用场景" {...formItemLayout}>
              {getFieldDecorator('sceneType')(
                <Select
                  allowClear
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  showSearch
                  optionFilterProp="children"
                >
                  {sceneType.length > 0
                    ? sceneType.map(item => (
                        <Select.Option key={item.value}>{item.label}</Select.Option>
                      ))
                    : null}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="启用状态" {...formItemLayout}>
              {getFieldDecorator('statusType')(
                <Select
                  allowClear
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  showSearch
                  optionFilterProp="children"
                >
                  {statusType.length > 0
                    ? statusType.map(item => (
                        <Select.Option key={item.value}>{item.label}</Select.Option>
                      ))
                    : null}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="渠道类型" {...formItemLayout}>
              {getFieldDecorator('chanelType')(
                <Select
                  allowClear
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  showSearch
                  optionFilterProp="children"
                >
                  {chanelType.length > 0
                    ? chanelType.map(item => (
                        <Select.Option key={item.value}>{item.label}</Select.Option>
                      ))
                    : null}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="商户名称" {...formItemLayout}>
              {getFieldDecorator('chanelName')(<Input allowClear placeholder="请输入" />)}
            </Form.Item>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
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
        </div>
      </Form>
    );
  };

  actionHandler = (e, mode, record) => {
    e.preventDefault();
    const { goToStep } = this.props;
    if (mode === 'view') {
      goToStep(3, record);
    }
    if (mode === 'audit') {
      goToStep(3, record);
    }
    if (mode === 'edit') {
      goToStep(3, record);
    }
    if (mode === 'create') {
      goToStep(2, { mode: 'create' });
    }
    if (mode === 'delete') {
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          message.success('删除成功！');
        },
      });
    }
  };

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { sortedInfo, list, pagination, listLoading, selectedRows } = this.state;
    return (
      <div className={styles.tableList}>
        <div className={styles.tableListForm}>{this.renderForm()}</div>
        {selectedRows.length > 0 && (
          <div className="margin-bottom">
            <Button>批量审核</Button>
          </div>
        )}
        <SlickTable
          rowKey={record => record.id}
          scroll={{ x: 'max-content', y: 400 }}
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
              title: '入库单编号',
              dataIndex: 'resourceCode',
              width: 120,
              render: text => `ZTZT00${text}`,
            },
            {
              title: '商户名称',
              dataIndex: 'resourceName',
              width: 300,
              render: text => {
                return (
                  <Ellipsis length={20} tooltip>
                    {text}
                  </Ellipsis>
                );
              },
            },
            {
              title: '资源数量',
              dataIndex: 'number1',
              needTotal: true,
              render: text => {
                return <span>{numeral(text).format('0,0')}</span>;
              },
            },
            {
              title: '入库数量',
              dataIndex: 'number2',
              render: text => {
                return <span>{numeral(text).format('0,0')}</span>;
              },
            },
            {
              title: '金额(元)',
              dataIndex: 'price',
              render: text => {
                return <Yuan>{text}</Yuan>;
              },
            },
            {
              title: '状态',
              dataIndex: 'statusType',
              render: (text, record) => {
                if (record.statusType === 0) {
                  return (
                    <Fragment>
                      <Badge status="success" /> 已入库
                    </Fragment>
                  );
                }
                if (record.statusType === 1) {
                  return (
                    <Fragment>
                      <Badge status="error" /> 驳回
                    </Fragment>
                  );
                }
                if (record.statusType === 2) {
                  return (
                    <Fragment>
                      <Badge status="processing" /> 待审核
                    </Fragment>
                  );
                }
                return null;
              },
            },
            {
              title: '建单人',
              dataIndex: 'creatorName',
            },
            {
              title: '审核人',
              dataIndex: 'auditorName',
            },
            {
              title: '库存失效日期',
              dataIndex: 'createDate',
              sorter: true,
              sortOrder: sortedInfo.field === 'createDate' && sortedInfo.order,
            },
            {
              title: '操作',
              key: 'action',
              width: 120,
              fixed: 'right',
              render: (text, record) => (
                <span>
                  <a
                    href="#"
                    onClick={e => {
                      this.actionHandler(e, 'view', record);
                    }}
                  >
                    详情
                  </a>
                  {record.statusType === 2 ? (
                    <Fragment>
                      <Divider type="vertical" />
                      <Dropdown
                        overlay={
                          <Menu onClick={({ key }) => this.actionHandler(key, record)}>
                            <Menu.Item key="audit">审核</Menu.Item>
                            <Menu.Item key="edit">修改</Menu.Item>
                            <Menu.Item key="delete">删除</Menu.Item>
                          </Menu>
                        }
                      >
                        <a>
                          更多 <Icon type="down" />
                        </a>
                      </Dropdown>
                    </Fragment>
                  ) : null}
                </span>
              ),
            },
          ]}
          onSelectRow={this.handleSelectRows}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default QueryTable;
