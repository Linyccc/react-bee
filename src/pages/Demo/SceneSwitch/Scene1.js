/* eslint-disable  */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  InputNumber,
  DatePicker,
  Modal,
  Tag,
  Divider,
  Steps,
  Table,
  Radio,
  Pagination,
} from 'antd';
import omit from 'lodash/omit';
import { queryMaps } from './services/profile';
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

/* eslint react/no-multi-comp:0 */
@connect(({ taskList, scene, loading }) => ({
  taskList,
  index: scene.index,
  params: scene.arr,
  queryTaskListLoading: loading.effects['taskList/queryTaskList'],
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    expandForm: false,
    formValues: {},
    pagination: {
      current: 1,
      pageSize: 10,
    },
    filteredInfo: {},
    sortedInfo: {
      field: 'createDate',
      order: 'descend',
    },
    orderType: [],
    staffOrg: [],
  };

  componentDidMount() {
    queryMaps().then(res => {
      this.setState({ orderType: res.resultObject.orderType, staffOrg: res.resultObject.staffOrg });
    });
    console.log(this.props.form.getFieldsValue());
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
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

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;
    const { pagination, sortedInfo, filteredInfo } = this.state;
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

      dispatch({
        type: 'taskList/queryTaskList',
        payload: { ...newFormValues, ...pagination, ...sortedInfo, ...filteredInfo },
      });
    });
  };

  handleChange = (pagination, filters, sorter) => {
    const { dispatch, form } = this.props;
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
    dispatch({
      type: 'taskList/queryTaskList',
      payload: { current, pageSize, total, field, order, ...filters, ...this.state.formValues },
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="任务名称" {...formItemLayout}>
              {getFieldDecorator('taskName', {
                rules: [
                  {
                    required: true,
                    message: '不能为空',
                  },
                ],
              })(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="任务单号" {...formItemLayout}>
              {getFieldDecorator('taskNumber')(<InputNumber style={{ width: '100%' }} />)}
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
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { orderType, staffOrg } = this.state;

    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="任务名称" {...formItemLayout}>
              {getFieldDecorator('taskName')(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="任务单号" {...formItemLayout}>
              {getFieldDecorator('taskNumber')(<InputNumber style={{ width: '100%' }} />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="任务发起人" {...formItemLayout}>
              {getFieldDecorator('taskCreator')(<Input style={{ width: '100%' }} />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="申请时间" {...formItemLayout}>
              {getFieldDecorator('createDateRange', {
                initialValue: [moment().add(-30, 'days'), moment()],
              })(
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  disabledDate={current => {
                    // Can not select days after today and today
                    return current && current > moment().endOf('day');
                  }}
                />
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="任务单类型" {...formItemLayout}>
              {getFieldDecorator('orderType')(
                <Select style={{ width: '100%' }} showSearch optionFilterProp="children">
                  {orderType.length > 0
                    ? orderType.map(item => (
                        <Select.Option key={item.pcode} title="Mr.Lin">
                          {item.pname}
                        </Select.Option>
                      ))
                    : null}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <Form.Item label="部门类型" {...formItemLayout}>
              {getFieldDecorator('staffOrg')(
                <Select style={{ width: '100%' }} showSearch optionFilterProp="children">
                  {staffOrg.length > 0
                    ? staffOrg.map(item => (
                        <Select.Option key={item.pcode}>{item.pname}</Select.Option>
                      ))
                    : null}
                </Select>
              )}
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
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  deleteItem = (e, record) => {
    e.preventDefault();
    Modal.confirm({
      title: '删除任务',
      content: '确定删除该任务吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {},
    });

    // dispatch({
    //   type: 'list/submit',
    //   payload: { id },
    // });
  };

  viewDetail = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'scene/saveScene',
      payload: {
        index: 1,
        params: record,
      },
    });
  };

  render() {
    const {
      taskList: { list, pagination },
      queryTaskListLoading,
    } = this.props;
    const { filteredInfo, sortedInfo } = this.state;
    return (
      <Card
        title="我是标题我是标题"
        extra={
          <Button
            icon="plus"
            type="primary"
            ghost
            onClick={() => {
              this.props.dispatch({
                type: 'scene/saveScene',
                payload: {
                  index: 1,
                },
              });
            }}
          >
            创建任务
          </Button>
        }
      >
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <Table
            loading={queryTaskListLoading}
            rowKey={record => record.id}
            columns={[
              {
                title: '任务单类型/名称',
                dataIndex: 'taskName',
                render: (text, record) => (
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      this.props.dispatch({
                        type: 'scene/saveScene',
                        payload: {
                          index: 2,
                          params: record,
                        },
                      });
                    }}
                  >
                    {`【${record.orderType}】\n ${text}`}
                  </a>
                ),
              },
              {
                title: '任务单号',
                width: '12%',
                dataIndex: 'taskNumber',
              },
              {
                title: '任务发起人',
                width: '12%',
                dataIndex: 'taskCreator',
              },
              {
                title: '当前环节',
                width: '18%',
                dataIndex: 'currentTache',
                filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
                filteredValue: filteredInfo.currentTache || null,
                filterMultiple: true,
              },
              {
                title: '创建时间',
                dataIndex: 'createDate',
                width: '17%',
                sorter: true,
                sortOrder: sortedInfo.field === 'createDate' && sortedInfo.order,
              },
              {
                title: '操作',
                key: 'action',
                width: '12%',
                render: (text, record) => (
                  <span>
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        this.props.dispatch({
                          type: 'scene/saveScene',
                          payload: {
                            index: 1,
                            params: record,
                          },
                        });
                      }}
                    >
                      编辑
                    </a>
                    <Divider type="vertical" />
                    <a href="#" onClick={e => this.deleteItem(e, record)}>
                      删除
                    </a>
                  </span>
                ),
              },
            ]}
            dataSource={list}
            pagination={{
              ...pagination,
              ...{
                showQuickJumper: true,
                showTotal: total => {
                  return `共${total}条`;
                },
              },
            }}
            onChange={this.handleChange}
          />
        </div>
      </Card>
    );
  }
}

export default TableList;
