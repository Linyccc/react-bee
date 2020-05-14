import React, { Component } from 'react';
import {
  Card,
  Anchor,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Icon,
  Upload,
  Button,
  Row,
  Col,
  Affix,
  message,
  Divider,
} from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PubSub from 'pubsub-js';
import moment from 'moment';
import FooterToolbar from '@/components/FooterToolbar';
import mapKeys from 'lodash/mapKeys';
import request from '@/utils/request';
import styles from './styles.less';

const { Link } = Anchor;
const FormItem = Form.Item;
const { TextArea } = Input;
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

// {label:'',value:''} 互转 {label:'',key:''}
const serialize = (obj, before, after) => {
  return mapKeys(obj, (value, key) => {
    if (key === before) {
      return after;
    }
    return key;
  });
};

@Form.create()
class Create extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props;
    this.state = {
      loading: false,
      id,
    };
  }

  componentDidMount() {
    if (this.state.id) {
      this.setState({ loading: true });
      request('/myOrder/orderInfo', { data: { id: this.state.id } }).then(res => {
        // this.setState(({ prevState }) => {
        //   return { ...prevState, ...res.resultData, loading: false };
        // });
        this.setState({ loading: false });
        this.props.form.setFieldsValue({
          name: res.resultData.name,
          code: res.resultData.code,
          createDate: moment(res.resultData.createDate),
          type: serialize(res.resultData.type, 'value', 'key'),
          status: serialize(res.resultData.status, 'value', 'key'),
          unit: res.resultData.unit,
        });
      });
    }

    request('/myOrder/map', { data: ['statusMap', 'typeMap'], expiry: 1000 * 60 }).then(res => {
      const {
        resultData: { statusMap, typeMap },
      } = res;
      this.setState({ statusMap, typeMap });
    });
  }

  handleSubmit = e => {
    const { form, mode, goToStep } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let params = {
          ...values,
          type: serialize(values.type, 'key', 'value'),
          status: serialize(values.status, 'key', 'value'),
          createDate: moment(values.createDate).format('YYYY-MM-DD'),
        };
        // edit模式多一个id
        if (mode === 'edit') {
          params = { ...params, id: this.state.id };
        }

        request('/myOrder/save', { data: params }).then(res => {
          message.success('提交成功！');
          PubSub.publish(`moduleName.${mode}`, { ...params, id: res.resultData.id });
          goToStep(1);
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      goToStep,
    } = this.props;
    // map值务必要设置一个默认的空数组，否则初始化时会报错
    const { statusMap = [], typeMap = [] } = this.state;

    return (
      <div style={{ marginBottom: 80 }}>
        <Form onSubmit={this.handleSubmit} className={classNames('tableListForm', 'fixLabel')}>
          <Card title="申请单" loading={this.state.loading}>
            <h3 className={styles.title} id="basic">
              基本信息
            </h3>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={11} sm={24}>
                <FormItem {...formItemLayout} label="申请单名称">
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                      {
                        type: 'string',
                        message: '不能包含特殊符号',
                      },
                    ],
                  })(<Input placeholder="请输入" allowClear />)}
                </FormItem>
              </Col>
              <Col md={11} sm={24} push={1}>
                <FormItem {...formItemLayout} label="期望完成日期">
                  {getFieldDecorator('createDate', {
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                      {
                        type: 'object',
                        message: '请选择',
                      },
                    ],
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      disabledDate={current => {
                        // 今天之前的不能选
                        return current && current < moment().add(-1, 'days');
                      }}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={11} sm={24}>
                <FormItem {...formItemLayout} label="申请单类型">
                  {getFieldDecorator('type', {
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(
                    <Select
                      allowClear
                      placeholder="请选择"
                      style={{ width: '100%' }}
                      showSearch
                      labelInValue
                      optionFilterProp="children"
                    >
                      {typeMap.map(item => (
                        <Select.Option key={item.value}>{item.label}</Select.Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col md={11} sm={24} push={1}>
                <FormItem {...formItemLayout} label="单号">
                  {getFieldDecorator('code', {
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(<Input style={{ width: '100%' }} />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={11} sm={24}>
                <FormItem {...formItemLayout} label="状态">
                  {getFieldDecorator('status', {
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Select
                      allowClear
                      placeholder="请选择"
                      style={{ width: '100%' }}
                      showSearch
                      labelInValue
                      optionFilterProp="children"
                    >
                      {statusMap.map(item => (
                        <Select.Option key={item.value}>{item.label}</Select.Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col md={11} sm={24} push={1}>
                <FormItem {...formItemLayout} label="上报单位">
                  {getFieldDecorator('unit', {
                    rules: [{ required: true, message: '请输入' }],
                  })(<Input placeholder="请输入" allowClear />)}
                </FormItem>
              </Col>
            </Row>
            <Divider dashed />
            <h3 className={styles.title} id="business">
              业务分析信息
            </h3>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={11} sm={24}>
                <FormItem {...formItemLayout} label="设计依据">
                  {getFieldDecorator('des1', {
                    rules: [
                      {
                        message: '请输入',
                      },
                    ],
                  })(<TextArea style={{ minHeight: 32 }} placeholder="请输入" rows={4} />)}
                </FormItem>
              </Col>
              <Col md={11} sm={24} push={1}>
                <FormItem {...formItemLayout} label="申请方案描述">
                  {getFieldDecorator('des2', {
                    rules: [
                      {
                        message: '请输入',
                      },
                    ],
                  })(<TextArea style={{ minHeight: 32 }} placeholder="请输入" rows={4} />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={11} sm={24}>
                <FormItem {...formItemLayout} label="竞品分析说明">
                  {getFieldDecorator('des3', {
                    rules: [],
                  })(<TextArea style={{ minHeight: 32 }} placeholder="请输入" rows={4} />)}
                </FormItem>
              </Col>
              <Col md={11} sm={24} push={1}>
                <FormItem {...formItemLayout} label="附件说明">
                  {getFieldDecorator('des4', {
                    rules: [],
                  })(<TextArea style={{ minHeight: 32 }} placeholder="请输入" rows={4} />)}
                </FormItem>
              </Col>{' '}
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={11} sm={24}>
                <FormItem {...formItemLayout} label="预测发放量">
                  {getFieldDecorator('number1', {
                    rules: [
                      {
                        message: '请输入',
                      },
                    ],
                  })(<InputNumber placeholder="请输入" style={{ width: '100%' }} />)}
                </FormItem>
              </Col>

              <Col md={11} sm={24} push={1}>
                <FormItem {...formItemLayout} label="预测使用率">
                  {getFieldDecorator('number2', {
                    rules: [
                      {
                        message: '请输入',
                      },
                    ],
                  })(<InputNumber placeholder="请输入" style={{ width: '100%' }} />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={11} sm={24}>
                <FormItem {...formItemLayout} label="相关附件">
                  {getFieldDecorator('file', {
                    rules: [
                      {
                        message: '请输入',
                      },
                    ],
                  })(
                    <Upload
                      defaultFileList={[
                        {
                          uid: '1',
                          name: 'xxx.png',
                          status: 'done',
                          response: 'Server Error 500', // custom error message to show
                          url: 'http://www.baidu.com/xxx.png',
                        },
                        {
                          uid: '2',
                          name: 'yyy.png',
                          status: 'done',
                          url: 'http://www.baidu.com/yyy.png',
                        },
                      ]}
                    >
                      <Button>
                        <Icon type="upload" /> 上传
                      </Button>
                    </Upload>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Card>
          <FooterToolbar>
            <Button
              type="default"
              onClick={() => {
                goToStep(1);
              }}
            >
              返回
            </Button>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </FooterToolbar>
        </Form>
      </div>
    );
  }
}

export default Create;

Create.propTypes = {
  id: PropTypes.number,
  mode: PropTypes.oneOf(['edit', 'create']).isRequired,
};

Create.defaultProps = {
  id: 0,
};
