/* eslint-disable */
import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  Menu,
  Dropdown,
  Icon,
  Button,
  Cascader,
  Checkbox,
  Radio,
  Input,
  DatePicker,
  TimePicker,
  Select,
  AutoComplete,
  InputNumber,
  Divider,
  Rate,
  Slider,
  Switch,
  Transfer,
  Upload,
  Modal,
  message,
  Form,
} from 'antd';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ComboCascader from '@/components/ComboCascader';
import SearchFilter from '@/components/SearchFilter';
import { connect } from 'dva';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';
import request from '@/utils/request';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const topProps = {
  xs: 12,
  style: { marginBottom: 12 },
};

const inputStyles = {
  style: { width: '100%' },
};
const introduction = (
  <div>
    <div className="margin-bottom">
      包含输入框、Checkbox、Radio、日期选择、下拉选择（单选和多选）、省市区联动、switcher、数字输入框、AutoComplete自动完成、Slider、Rate评分以及图片上传等常用表单元素
    </div>
  </div>
);
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
];

@connect(({ loading, form }) => ({
  areaType: form.areaType,
  areaTypeLoading: loading.effects['form/queryAreaType'],
}))
@Form.create()
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options,
      userName: '',
      dataSource: [],
      mockData: [],
      targetKeys: [],
      // 上传图片相关
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ],
      imageUrl: '',
      loading: false,
      areaType: [],
    };
    const OldDomain = document.domain;
    try {
      if (typeof File === 'undefined' && document.domain === OldDomain) {
        const arrayDomain = (document.domain && document.domain.split('.')) || [];
        document.domain =
          arrayDomain.length > 2 ? arrayDomain.slice(-2).join('.') : document.domain;
      }
    } catch {
      document.domain = OldDomain;
    }
  }

  componentDidMount() {
    this.getMock();
    const { dispatch } = this.props;
    dispatch({
      type: 'form/queryAreaType',
      payload: { name: 'Mr.Lin' },
    });
  }

  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.info('nextProps',nextProps)
    // console.info('prevState',prevState)
    const { areaType } = nextProps;
    const { params } = prevState;
    if (!isEqual(nextProps.areaType, prevState.areaType)) {
      return {
        ...prevState,
        areaType: nextProps.areaType,
      };
    }
    // 返回 null 表示不更新，此函数最后一定需要返回值
    return null;
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ];
      this.setState({
        options: [...this.state.options],
      });
    }, 1000);
  };

  render() {
    const { userName, dataSource, previewVisible, previewImage, fileList, imageUrl } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Row gutter={8}>
        <Col xs={24} lg={12}>
          <Card
            title="输入框"
            extra={
              <a href="https://ant.design/components/input-cn/#API" target="_blank">
                API
              </a>
            }
          >
            <Row gutter={16}>
              <Col {...topProps}>
                <Input placeholder="Basic usage" />
              </Col>
              <Col {...topProps}>
                <Input addonBefore="Http://" addonAfter=".com" defaultValue="mysite" />
              </Col>
              <Col {...topProps}>
                <Input.Group>
                  <Col span={10}>
                    <Input defaultValue="0571" />
                  </Col>
                  <Col span={14}>
                    <Input defaultValue="26888888" />
                  </Col>
                </Input.Group>
              </Col>
              <Col {...topProps}>
                <Input.Group compact>
                  <Input style={{ width: '40%' }} defaultValue="0571" />
                  <Input style={{ width: '60%' }} defaultValue="26888888" />
                </Input.Group>
              </Col>
              <Col {...topProps}>
                <Input
                  addonBefore={
                    <Select defaultValue="Http://" style={{ width: 90 }}>
                      <Select.Option value="Http://">Http://</Select.Option>
                      <Select.Option value="Https://">Https://</Select.Option>
                    </Select>
                  }
                  addonAfter={
                    <Select defaultValue=".com" style={{ width: 90 }}>
                      <Select.Option value=".com">.com</Select.Option>
                      <Select.Option value=".hk">.hk</Select.Option>
                      <Select.Option value=".tw">.tw</Select.Option>
                    </Select>
                  }
                  defaultValue="mysite"
                />
              </Col>
              <Col {...topProps}>
                <Input.Search
                  placeholder="input search text"
                  onSearch={value => console.log(value)}
                />
              </Col>
              <Col {...topProps}>
                <Input.Search
                  placeholder="input search text"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              </Col>
              <Col {...topProps}>
                <Input.Search
                  placeholder="input search text"
                  onSearch={value => console.log(value)}
                  enterButton="搜索"
                />
              </Col>
              <Col {...topProps}>
                <Input
                  placeholder="Enter your username"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  suffix={
                    userName ? (
                      <Icon
                        type="close-circle"
                        onClick={() => {
                          this.userNameInput.focus();
                          this.setState({ userName: '' });
                        }}
                      />
                    ) : null
                  }
                  value={userName}
                  onChange={e => {
                    this.setState({ userName: e.target.value });
                  }}
                  ref={node => (this.userNameInput = node)}
                />
              </Col>
            </Row>
          </Card>
          <Card
            title="表单校验"
            extra={
              <a href="https://ant.design/components/input-cn/#API" target="_blank">
                API
              </a>
            }
          >
            <h4>默认样式</h4>
            <Form
              onSubmit={e => {
                e.preventDefault();
                this.props.form.validateFields((err, values) => {
                  if (!err) {
                    console.log('Received values of form: ', values);
                  }
                });
              }}
              className="login-form"
            >
              <Form.Item>
                {getFieldDecorator('userName2', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password2', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
            </Form>
            <Divider />
            <h4>自定义样式：cube-form-tooltip</h4>
            <Form
              onSubmit={e => {
                e.preventDefault();
                this.props.form.validateFields((err, values) => {
                  if (!err) {
                    console.log('Received values of form: ', values);
                  }
                });
              }}
              className="cube-form-tooltip"
            >
              <Form.Item>
                {getFieldDecorator('userName3', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password3', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={() => this.props.form.resetFields()}>
                  重置
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Card
            title="省市区级联"
            extra={
              <a href="https://ant.design/components/cascader-cn/#API" target="_blank">
                API
              </a>
            }
          >
            <div className="margin-bottom">
              <Cascader
                options={[
                  {
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [
                      {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                        children: [
                          {
                            value: 'xihu',
                            label: 'West Lake',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    value: 'jiangsu',
                    label: 'Jiangsu',
                    children: [
                      {
                        value: 'nanjing',
                        label: 'Nanjing',
                        children: [
                          {
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men',
                          },
                        ],
                      },
                    ],
                  },
                ]}
                expandTrigger="hover"
                placeholder="基础款"
                {...inputStyles}
              />
            </div>
            <div className="margin-bottom">
              <Cascader
                options={this.state.options}
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect
                placeholder="动态加载数据"
                {...inputStyles}
              />
            </div>
            <div className="margin-bottom">
              <Cascader
                options={this.state.options}
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect
                disabled
                placeholder="我被禁用了"
                {...inputStyles}
              />
            </div>
          </Card>
          <Card
            title="Checkbox"
            extra={
              <a href="https://ant.design/components/checkbox-cn/#API" target="_blank">
                API
              </a>
            }
          >
            <Checkbox>Checkbox</Checkbox>
            <br />
            <br />
            <Checkbox.Group options={['Apple', 'Pear', 'Orange']} defaultValue={['Apple']} />
            <br />
            <br />
            <Checkbox.Group
              options={[
                { label: 'Apple', value: 'Apple' },
                { label: 'Pear', value: 'Pear' },
                { label: 'Orange', value: 'Orange', disabled: false },
              ]}
              disabled
              defaultValue={['Apple']}
            />
            <br />
          </Card>
          <Card
            title="Radio"
            extra={
              <a href="https://ant.design/components/radio-cn/#API" target="_blank">
                API
              </a>
            }
          >
            <Radio.Group defaultValue={3} className="margin-bottom block">
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
              <Radio value={3}>C</Radio>
              <Radio value={4}>D</Radio>
            </Radio.Group>

            <Radio.Group defaultValue="a" buttonStyle="solid" className="margin-bottom block">
              <Radio.Button value="a">Hangzhou</Radio.Button>
              <Radio.Button value="b">Shanghai</Radio.Button>
              <Radio.Button value="c">Beijing</Radio.Button>
              <Radio.Button value="d">Chengdu</Radio.Button>
            </Radio.Group>

            <Radio.Group defaultValue="a" className="margin-bottom block">
              <Radio.Button value="a">Hangzhou</Radio.Button>
              <Radio.Button value="b">Shanghai</Radio.Button>
              <Radio.Button value="c">Beijing</Radio.Button>
              <Radio.Button value="d">Chengdu</Radio.Button>
            </Radio.Group>
          </Card>
          <Card
            title="日期选择框"
            extra={
              <a href="https://ant.design/components/date-picker-cn/#API" target="_blank">
                API
              </a>
            }
          >
            <DatePicker {...inputStyles} placeholder="年-月-日" className="margin-bottom" />
            <MonthPicker placeholder="选择月份" {...inputStyles} className="margin-bottom" />

            <RangePicker {...inputStyles} className="margin-bottom" />

            <WeekPicker placeholder="选择周" {...inputStyles} className="margin-bottom" />
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              className="margin-bottom"
              disabledDate={current => {
                return current && current < moment().endOf('day');
              }}
              showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              placeholder="禁用当天之前"
              {...inputStyles}
            />
            <DatePicker
              className="margin-bottom"
              format="YYYY-MM-DD HH:mm:ss"
              defaultValue={moment()}
              placeholder="禁用当天之前"
              {...inputStyles}
            />
          </Card>
          <Card
            title="穿梭框"
            extra={
              <a href="https://ant.design/components/transfer-cn/#API" target="_blank">
                API
              </a>
            }
          >
            <Transfer
              dataSource={this.state.mockData}
              style={{
                textAlign: 'center',
              }}
              listStyle={{
                width: 240,
                height: 300,
              }}
              targetKeys={this.state.targetKeys}
              onChange={(targetKeys, direction, moveKeys) => {
                console.log(targetKeys, direction, moveKeys);
                this.setState({ targetKeys });
              }}
              render={item => {
                const customLabel = (
                  <span className="custom-item">
                    {item.title} - {item.description}
                  </span>
                );

                return {
                  label: customLabel, // for displayed item
                  value: item.title, // for title and filter matching
                };
              }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          {/* <Card
          title="过滤搜索"

          extra={
            <a href="https://ant.design/components/rate-cn/#API" target="_blank">
              API
            </a>
          }
        >
          <div className="margin-bottom">
            <Upload
              action="http://127.0.0.1:3000/upload-single"
              listType="picture-card"
              fileList={fileList}
              onPreview={file => {
                if (file.response.resultCode === '0') {
                  this.setState({
                    previewImage:
                      find(file.response.resultObject, { fileName: file.name }).fileUrl ||
                      file.thumbUrl,
                    previewVisible: true,
                  });
                }
              }}
              onChange={({ fileList }) => this.setState({ fileList })}
            >
              {fileList.length >= 3 ? null : (
                <div>
                  <Icon type="plus" />
                  <div className="ant-upload-text">Upload</div>
                </div>
              )}
            </Upload>
            <h4>default</h4>
            <SearchFilter
              onSearch={(value, e) => {
                console.log(JSON.stringify(value, null, '\t'));
              }}
              inputPlaceholder="输入关键字"
              defaultAreaValue="303"
              defaultInputValue="Mr.Lin"
              options={{
                areaType: [
                  {
                    fieldname: 'provinceCode',
                    label: '安徽',
                    value: '30',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '芜湖',
                        value: '303',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '六安',
                        value: '304',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '合肥',
                        value: '305',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '马鞍山',
                        value: '300',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '蚌埠',
                        value: '301',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '安庆',
                        value: '302',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '淮南',
                        value: '307',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '铜陵',
                        value: '308',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '巢湖',
                        value: '309',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '宣城',
                        value: '311',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '阜阳',
                        value: '306',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '宿州',
                        value: '313',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '淮北',
                        value: '314',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '黄山',
                        value: '316',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '滁州',
                        value: '312',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '池州',
                        value: '317',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '亳州',
                        value: '318',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '福建',
                    value: '38',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '福州',
                        value: '380',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '龙岩',
                        value: '384',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '莆田',
                        value: '385',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '三明',
                        value: '389',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '厦门',
                        value: '390',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '漳州',
                        value: '395',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '泉州',
                        value: '480',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '宁德',
                        value: '386',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '南平',
                        value: '387',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '甘肃',
                    value: '87',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '兰州',
                        value: '870',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '定西',
                        value: '871',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '平凉',
                        value: '872',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '庆阳',
                        value: '873',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '武威',
                        value: '874',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '张掖',
                        value: '875',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '嘉峪关',
                        value: '876',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '天水',
                        value: '877',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '临夏',
                        value: '878',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '白银',
                        value: '879',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '金昌',
                        value: '930',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '酒泉',
                        value: '931',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '陇南',
                        value: '960',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '甘南',
                        value: '961',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '广东',
                    value: '51',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '湛江',
                        value: '520',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '汕尾',
                        value: '525',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '揭阳',
                        value: '526',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '梅州',
                        value: '528',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '佛山',
                        value: '530',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '广州',
                        value: '510',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '云浮',
                        value: '538',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '深圳',
                        value: '540',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '江门',
                        value: '550',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '中山',
                        value: '556',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '韶关',
                        value: '558',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '汕头',
                        value: '560',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '阳江',
                        value: '565',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '茂名',
                        value: '568',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '潮州',
                        value: '531',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '清远',
                        value: '535',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '肇庆',
                        value: '536',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '东莞',
                        value: '580',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '珠海',
                        value: '620',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '河源',
                        value: '670',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '惠州',
                        value: '570',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '广西',
                    value: '59',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '贺州',
                        value: '588',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '柳州',
                        value: '593',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '梧州',
                        value: '594',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '玉林',
                        value: '595',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '百色',
                        value: '596',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '钦州',
                        value: '597',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '河池',
                        value: '598',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '北海',
                        value: '599',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '崇左',
                        value: '600',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '来宾',
                        value: '601',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '贵港',
                        value: '589',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '防城港',
                        value: '590',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '南宁',
                        value: '591',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '桂林',
                        value: '592',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '贵州',
                    value: '85',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '铜仁',
                        value: '785',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '遵义',
                        value: '787',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '黔南',
                        value: '788',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '黔东南',
                        value: '786',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '毕节',
                        value: '851',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '黔西南',
                        value: '852',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '安顺',
                        value: '789',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '贵阳',
                        value: '850',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '六盘水',
                        value: '853',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '海南',
                    value: '50',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '海南',
                        value: '501',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '湖北',
                    value: '71',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '武汉',
                        value: '710',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '宜昌',
                        value: '711',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '荆州',
                        value: '712',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '江汉',
                        value: '713',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '黄冈',
                        value: '714',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '孝感',
                        value: '717',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '鄂州',
                        value: '718',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '咸宁',
                        value: '719',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '十堰',
                        value: '721',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '随州',
                        value: '723',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '荆门',
                        value: '724',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '恩施',
                        value: '727',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '黄石',
                        value: '715',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '襄阳',
                        value: '716',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '湖南',
                    value: '74',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '株洲',
                        value: '742',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '湘潭',
                        value: '743',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '衡阳',
                        value: '744',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '长沙',
                        value: '741',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '永州',
                        value: '796',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '岳阳',
                        value: '745',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '益阳',
                        value: '747',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '郴州',
                        value: '748',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '常德',
                        value: '749',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '娄底',
                        value: '791',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '邵阳',
                        value: '792',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '湘西',
                        value: '793',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '张家界',
                        value: '794',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '怀化',
                        value: '795',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '宁夏',
                    value: '88',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '银川',
                        value: '880',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '吴忠',
                        value: '883',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '固原',
                        value: '885',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '中卫',
                        value: '886',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '石嘴山',
                        value: '884',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '青海',
                    value: '70',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '西宁',
                        value: '700',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '海东',
                        value: '701',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '格尔木',
                        value: '702',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '海西洲',
                        value: '704',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '海南洲',
                        value: '705',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '海北洲',
                        value: '706',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '黄南州',
                        value: '707',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '果洛州',
                        value: '708',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '玉树州',
                        value: '709',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '山西',
                    value: '19',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '太原',
                        value: '190',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '晋中',
                        value: '191',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '阳泉',
                        value: '192',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '大同',
                        value: '193',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '晋城',
                        value: '194',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '长治',
                        value: '195',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '运城',
                        value: '196',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '临汾',
                        value: '197',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '忻州',
                        value: '198',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '朔州',
                        value: '199',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '吕梁',
                        value: '200',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '上海',
                    value: '31',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '上海市',
                        value: '310',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '四川',
                    value: '81',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '成都',
                        value: '810',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '雅安',
                        value: '811',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '凉山州',
                        value: '812',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '攀枝花',
                        value: '813',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '乐山',
                        value: '814',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '泸州',
                        value: '815',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '内江',
                        value: '816',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '宜宾',
                        value: '817',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '自贡',
                        value: '818',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '眉山',
                        value: '819',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '达州',
                        value: '820',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '遂宁',
                        value: '821',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '南充',
                        value: '822',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '广安',
                        value: '823',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '绵阳',
                        value: '824',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '德阳',
                        value: '825',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '广元',
                        value: '826',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '巴中',
                        value: '827',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '甘孜',
                        value: '828',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '阿坝',
                        value: '829',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '资阳',
                        value: '830',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '江西',
                    value: '75',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '宜春',
                        value: '756',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '景德镇',
                        value: '740',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '南昌',
                        value: '750',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '上饶',
                        value: '757',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '萍乡',
                        value: '758',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '抚州',
                        value: '759',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '吉安',
                        value: '751',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '赣州',
                        value: '752',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '新余',
                        value: '753',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '鹰潭',
                        value: '754',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '九江',
                        value: '755',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '内蒙古',
                    value: '10',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '锡林郭勒盟',
                        value: '111',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '兴安盟',
                        value: '113',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '阿拉善盟',
                        value: '114',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '乌海市',
                        value: '106',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '呼和浩特市',
                        value: '101',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '赤峰市',
                        value: '107',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '包头市',
                        value: '102',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '呼伦贝尔市',
                        value: '108',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '乌兰察布市',
                        value: '103',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '鄂尔多斯市',
                        value: '104',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '巴彦淖尔市',
                        value: '105',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '通辽市',
                        value: '109',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '天津',
                    value: '13',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '天津市',
                        value: '130',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '西藏',
                    value: '79',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '拉萨',
                        value: '790',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '日喀则',
                        value: '797',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '山南',
                        value: '798',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '林芝',
                        value: '799',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '昌都',
                        value: '800',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '那曲',
                        value: '801',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '阿里',
                        value: '802',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '新疆',
                    value: '89',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '乌鲁木齐',
                        value: '890',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '昌吉',
                        value: '891',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '奎屯',
                        value: '892',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '石河子',
                        value: '893',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '吐鲁番',
                        value: '894',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '巴州',
                        value: '895',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '阿克苏',
                        value: '896',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '喀什',
                        value: '897',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '伊犁',
                        value: '898',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '克拉玛依',
                        value: '899',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '哈密',
                        value: '900',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '博乐',
                        value: '951',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '塔城',
                        value: '952',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '阿勒泰',
                        value: '953',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '克州',
                        value: '954',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '和田',
                        value: '955',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '云南',
                    value: '86',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '德宏',
                        value: '730',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '保山',
                        value: '731',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '文山',
                        value: '732',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '临沧',
                        value: '733',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '怒江',
                        value: '734',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '迪庆',
                        value: '735',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '西双版纳',
                        value: '736',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '昆明',
                        value: '860',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '红河',
                        value: '861',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '大理',
                        value: '862',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '丽江',
                        value: '863',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '楚雄',
                        value: '864',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '玉溪',
                        value: '865',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '曲靖',
                        value: '866',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '昭通',
                        value: '867',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '普洱',
                        value: '869',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '重庆',
                    value: '83',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '重庆市',
                        value: '831',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '辽宁',
                    value: '91',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '铁岭',
                        value: '911',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '鞍山',
                        value: '912',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '抚顺',
                        value: '913',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '本溪',
                        value: '914',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '丹东',
                        value: '915',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '锦州',
                        value: '916',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '营口',
                        value: '917',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '阜新',
                        value: '918',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '辽阳',
                        value: '919',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '朝阳',
                        value: '920',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '盘锦',
                        value: '921',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '葫芦岛',
                        value: '922',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '大连',
                        value: '940',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '沈阳',
                        value: '910',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '吉林',
                    value: '90',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '吉林市',
                        value: '902',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '四平',
                        value: '903',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '长春',
                        value: '901',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '通化',
                        value: '905',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '白城',
                        value: '907',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '白山',
                        value: '908',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '松原',
                        value: '904',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '辽源',
                        value: '906',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '延边',
                        value: '909',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '江苏',
                    value: '34',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '无锡',
                        value: '330',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '南京',
                        value: '340',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '镇江',
                        value: '343',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '连云港',
                        value: '346',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '盐城',
                        value: '348',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '宿迁',
                        value: '349',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '徐州',
                        value: '350',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '淮安',
                        value: '354',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '南通',
                        value: '358',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '扬州',
                        value: '430',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '常州',
                        value: '440',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '泰州',
                        value: '445',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '苏州',
                        value: '450',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '陕西',
                    value: '84',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '宝鸡',
                        value: '840',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '西安',
                        value: '841',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '延安',
                        value: '842',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '渭南',
                        value: '843',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '咸阳',
                        value: '844',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '榆林',
                        value: '845',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '铜川',
                        value: '846',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '商洛',
                        value: '847',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '安康',
                        value: '848',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '汉中',
                        value: '849',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '虚拟地市',
                        value: '804',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '浙江',
                    value: '36',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '杭州',
                        value: '360',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '湖州',
                        value: '362',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '温州',
                        value: '470',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '嘉兴',
                        value: '363',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '舟山',
                        value: '364',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '台州',
                        value: '476',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '绍兴',
                        value: '365',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '金华',
                        value: '367',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '宁波',
                        value: '370',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '衢州',
                        value: '468',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '丽水',
                        value: '469',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '全香港',
                    value: '000060',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '香港',
                        value: '000696',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '维多利亚',
                    value: '000061',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '澳洲电信',
                        value: '000738',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '中国台湾速博',
                    value: '000063',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '台湾速博',
                        value: '000698',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '加利福尼亚',
                    value: '000065',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '美国联通',
                        value: '000676',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '中国台湾固网',
                    value: '000066',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '台湾固网',
                        value: '000739',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '新加坡',
                    value: '000067',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '新加坡电信',
                        value: '000610',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '汉城',
                    value: '000068',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '韩国互联网',
                        value: '000612',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '北京',
                    value: '11',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '北京市',
                        value: '110',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '山东',
                    value: '17',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '威海',
                        value: '152',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '潍坊',
                        value: '155',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '济宁',
                        value: '158',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '烟台',
                        value: '161',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '泰安',
                        value: '172',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '东营',
                        value: '156',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '聊城',
                        value: '174',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '淄博',
                        value: '150',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '滨州',
                        value: '151',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '临沂',
                        value: '153',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '日照',
                        value: '154',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '枣庄',
                        value: '157',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '荷泽',
                        value: '159',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '莱芜',
                        value: '160',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '青岛',
                        value: '166',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '济南',
                        value: '170',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '德州',
                        value: '173',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '河北',
                    value: '18',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '沧州',
                        value: '180',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '廊坊',
                        value: '183',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '邯郸',
                        value: '186',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '承德',
                        value: '189',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '衡水',
                        value: '720',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '唐山',
                        value: '181',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '秦皇岛',
                        value: '182',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '张家口',
                        value: '184',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '邢台',
                        value: '185',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '保定',
                        value: '187',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '石家庄',
                        value: '188',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '黑龙江',
                    value: '97',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '哈尔滨',
                        value: '971',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '齐齐哈尔',
                        value: '973',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '佳木斯',
                        value: '976',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '大庆',
                        value: '981',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '牡丹江市',
                        value: '988',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '绥化',
                        value: '989',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '黑河',
                        value: '990',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '鸡西市',
                        value: '991',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '七台河',
                        value: '992',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '鹤岗',
                        value: '993',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '双鸭山',
                        value: '994',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '大兴安岭',
                        value: '995',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '伊春',
                        value: '996',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '河南',
                    value: '76',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '濮阳',
                        value: '773',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '鹤壁',
                        value: '774',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '南阳',
                        value: '777',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '新乡',
                        value: '764',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '开封',
                        value: '762',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '许昌',
                        value: '765',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '商丘',
                        value: '768',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '驻马店',
                        value: '771',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '郑州',
                        value: '760',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '洛阳',
                        value: '761',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '焦作',
                        value: '763',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '漯河',
                        value: '766',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '安阳',
                        value: '767',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '平顶山',
                        value: '769',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '周口',
                        value: '770',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '三门峡',
                        value: '772',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '信阳',
                        value: '776',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '济源',
                        value: '775',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '测试省',
                    value: '24',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '测试6市',
                        value: '246',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '测试15市',
                        value: '255',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '测试11市',
                        value: '251',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: 'A市',
                        value: '241',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '测试5市',
                        value: '245',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '测试3市',
                        value: '243',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '测试7市',
                        value: '247',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '测试F市',
                        value: '248',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '测试2市',
                        value: '242',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '测试9市',
                        value: '249',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '测试4市',
                        value: '244',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '测试10市',
                        value: '250',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '测试12市',
                        value: '252',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '测试13市',
                        value: '253',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '测试14市',
                        value: '254',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '测试Z市',
                        value: '256',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: 'A市',
                        value: '24z',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '联通智网科技有限公司',
                    value: '95',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '西南区分公司（重庆）',
                        value: '964',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '东北区分公司（吉林）',
                        value: '958',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '华南区分公司（广东）',
                        value: '963',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '西北区分公司（陕西）',
                        value: '965',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '华中区分公司（湖北）',
                        value: '959',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '市场营销一部',
                        value: '956',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '华东区分公司（上海）',
                        value: '962',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '市场营销二部',
                        value: '957',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '东信省',
                    value: '73',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '东信市',
                        value: '997',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '总部政企(虚拟省分)',
                    value: '60',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '总部政企(虚拟地市)',
                        value: '611',
                        isLeaf: true,
                      },
                    ],
                  },
                  {
                    fieldname: 'provinceCode',
                    label: '云数据公司',
                    value: '40',
                    isLeaf: false,
                    children: [
                      {
                        fieldname: 'eparchyCode',
                        label: '呼和浩特云数据中心',
                        value: '401',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '廊坊云数据中心',
                        value: '402',
                        isLeaf: true,
                      },
                      {
                        fieldname: 'eparchyCode',
                        label: '云数据公司运营中心',
                        value: '403',
                        isLeaf: true,
                      },
                    ],
                  },
                ],
                choiceType: [
                  {
                    label: '客户类型',
                    value: 'kehu',
                    fieldname: 'eparchyCode',
                    children: [
                      {
                        fieldname: 'custState',
                        label: '在网',
                        value: '0',
                      },
                      {
                        fieldname: 'custState',
                        label: '潜在',
                        value: '1',
                      },
                      {
                        fieldname: 'custState',
                        label: '冻结',
                        value: '2',
                      },
                      {
                        fieldname: 'custState',
                        label: '注销',
                        value: '4',
                      },
                    ],
                  },
                  {
                    label: '客户资料类型',
                    value: 'kehuleixin',
                    fieldname: 'eparchyCode',
                    children: [
                      {
                        fieldname: 'custClassType',
                        label: '大客户',
                        value: '3',
                      },
                      {
                        fieldname: 'custClassType',
                        label: '中小企业客户',
                        value: '2',
                      },
                      {
                        fieldname: 'custClassType',
                        label: '小微企业客户',
                        value: '1',
                      },
                    ],
                  },
                ],
              }}
            />
          </div>
          <div className="margin-bottom">
            <h4>异步获取子节点(dva)</h4>
            <SearchFilter
              onSearch={(value, e) => {
                console.log(JSON.stringify(value, null, '\t'));
              }}
              inputPlaceholder="22输入关键字"
              size="large"
              loadData={data => {
                return new Promise(resolve => {
                  request('/api/area', { data }).then(result => {
                    resolve(result);
                  });
                });
              }}
              wrappedComponentRef={inst => (this.formRef = inst)}
              options={{
                areaType: this.state.areaType,
                choiceType: [
                  {
                    label: '客户类型',
                    value: 'kehu',
                    fieldname: 'eparchyCode',
                    children: [
                      {
                        fieldname: 'custState',
                        label: '在网',
                        value: '0',
                      },
                      {
                        fieldname: 'custState',
                        label: '潜在',
                        value: '1',
                      },
                      {
                        fieldname: 'custState',
                        label: '冻结',
                        value: '2',
                      },
                      {
                        fieldname: 'custState',
                        label: '注销',
                        value: '4',
                      },
                    ],
                  },
                  {
                    label: '客户资料类型',
                    value: 'kehuleixin',
                    fieldname: 'eparchyCode',
                    children: [
                      {
                        fieldname: 'custClassType',
                        label: '大客户',
                        value: '3',
                      },
                      {
                        fieldname: 'custClassType',
                        label: '中小企业客户',
                        value: '2',
                      },
                      {
                        fieldname: 'custClassType',
                        label: '小微企业客户',
                        value: '1',
                      },
                    ],
                  },
                ],
              }}
            />
          </div>
          <div className="margin-bottom">
            <h4>隐藏tree-select</h4>
            <SearchFilter
              onSearch={(value, e) => {
                console.log(JSON.stringify(value, null, '\t'));
              }}
              inputPlaceholder="输入关键字"
              hideArea
              size="large"
              options={{
                choiceType: [
                  {
                    label: '客户类型',
                    value: 'kehu',
                    fieldname: 'eparchyCode',
                    children: [
                      {
                        fieldname: 'custState',
                        label: '在网',
                        value: '0',
                      },
                      {
                        fieldname: 'custState',
                        label: '潜在',
                        value: '1',
                      },
                      {
                        fieldname: 'custState',
                        label: '冻结',
                        value: '2',
                      },
                      {
                        fieldname: 'custState',
                        label: '注销',
                        value: '4',
                      },
                    ],
                  },
                  {
                    label: '客户资料类型',
                    value: 'kehuleixin',
                    fieldname: 'eparchyCode',
                    children: [
                      {
                        fieldname: 'custClassType',
                        label: '大客户',
                        value: '3',
                      },
                      {
                        fieldname: 'custClassType',
                        label: '中小企业客户',
                        value: '2',
                      },
                      {
                        fieldname: 'custClassType',
                        label: '小微企业客户',
                        value: '1',
                      },
                    ],
                  },
                ],
              }}
            />
          </div>
          <div className="margin-bottom">
            <h4>隐藏tree-select和choice</h4>
            <SearchFilter
              onSearch={(value, e) => {
                console.log(JSON.stringify(value, null, '\t'));
              }}
              inputPlaceholder="输入关键字"
              hideArea
              hideChoice
              size="large"
            />
          </div>
        </Card>
        <Card
          title="ComboCascader"

          extra={
            <a href="https://ant.design/components/rate-cn/#API" target="_blank">
              API
            </a>
          }
        >
          <div className="margin-bottom">
            <h4>单选</h4>
            <ComboCascader
              onChange={(selectedItem, e) => {
                console.log(selectedItem);
              }}
              multiple={false}
              options={[
                {
                  value: 'v-zhejiang4',
                  label: 'Zhejiang4',
                },
                {
                  value: 'v-zhejiang3',
                  label: 'Zhejiang3',
                },
                {
                  value: 'v-zhejiang',
                  label: 'Zhejiang',
                  children: [
                    {
                      value: 'v-hangzhou',
                      label: 'Hangzhou',
                      children: [
                        {
                          value: 'v-xihu',
                          label: 'West Lake',
                        },
                        {
                          value: 'v-xihu2',
                          label: 'West Lake2',
                        },
                      ],
                    },
                    {
                      value: 'v-hangzhou33',
                      label: 'Hangzhou33',
                      children: [
                        {
                          value: 'v-xihu33',
                          label: 'West Lake33',
                        },
                        {
                          value: 'v-xihu233',
                          label: 'West Lake233',
                        },
                      ],
                    },
                  ],
                },
                {
                  value: 'v-jiangsu',
                  label: 'Jiangsu',
                  children: [
                    {
                      value: 'v-nanjing',
                      label: 'Nanjing',
                      children: [
                        {
                          value: 'v-zhonghuamen',
                          label: 'Zhong Hua Men',
                        },
                      ],
                    },
                  ],
                },
              ]}
            />
          </div>
          <div className="margin-bottom">
            <h4>多选,但限制类型</h4>
            <ComboCascader
              onChange={(selectedItem, e) => {
                console.log(selectedItem);
              }}
              limit
              options={[
                {
                  value: 'v-zhejiang4',
                  label: 'Zhejiang4',
                },
                {
                  value: 'v-zhejiang3',
                  label: 'Zhejiang3',
                },
                {
                  value: 'v-zhejiang',
                  label: 'Zhejiang',
                  children: [
                    {
                      value: 'v-hangzhou',
                      label: 'Hangzhou',
                      children: [
                        {
                          value: 'v-xihu',
                          label: 'West Lake',
                        },
                        {
                          value: 'v-xihu2',
                          label: 'West Lake2',
                        },
                      ],
                    },
                    {
                      value: 'v-hangzhou33',
                      label: 'Hangzhou33',
                      children: [
                        {
                          value: 'v-xihu33',
                          label: 'West Lake33',
                        },
                        {
                          value: 'v-xihu233',
                          label: 'West Lake233',
                        },
                      ],
                    },
                  ],
                },
                {
                  value: 'v-jiangsu',
                  label: 'Jiangsu',
                  children: [
                    {
                      value: 'v-nanjing',
                      label: 'Nanjing',
                      children: [
                        {
                          value: 'v-zhonghuamen',
                          label: 'Zhong Hua Men',
                        },
                      ],
                    },
                  ],
                },
              ]}
            />
          </div>
          <div className="margin-bottom">
            <h4>size="large" 多选,不限制类型</h4>
            <ComboCascader
              onChange={(selectedItem, e) => {
                console.log(selectedItem);
              }}
              ref="okk"
              size="large"
              options={[
                {
                  value: 'v-zhejiang',
                  label: '登录类型',
                  children: [
                    {
                      value: 'success',
                      label: '成功',
                    },
                    {
                      value: 'error',
                      label: '失败',
                    },
                  ],
                },
                {
                  value: 'area',
                  label: '所属区域',
                  children: [
                    {
                      value: 'fujian',
                      label: '福建省',
                      children: [
                        {
                          value: 'v-zhonghuamen',
                          label: '福州市',
                          children: [
                            {
                              value: 'taijiang',
                              label: '台江区',
                            },
                            {
                              value: 'gulou',
                              label: '鼓楼区',
                            },
                            {
                              value: 'cangshang',
                              label: '仓山区',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ]}
            />
          </div>
        </Card>*/}
          <Card
            title="Rate评分"
            extra={
              <a href="https://ant.design/components/rate-cn/#API" target="_blank">
                API
              </a>
            }
          >
            <div className="margin-bottom">
              <Rate /> 基础用法
            </div>
            <div className="margin-bottom">
              <Rate allowHalf defaultValue={2.5} /> 支持选中半星。
            </div>
            <div className="margin-bottom">
              <Rate disabled defaultValue={2} /> 只读。
            </div>
          </Card>
          <Card
            title="Slider滑动输入条"
            extra={
              <a href="https://ant.design/components/slider-cn/#API" target="_blank">
                API
              </a>
            }
          >
            <div className="margin-bottom">
              <Slider
                marks={{
                  0: '0°C',
                  26: '26°C',
                  37: '37°C',
                  100: {
                    style: {
                      color: '#f50',
                    },
                    label: <strong>100°C</strong>,
                  },
                }}
                defaultValue={37}
              />
            </div>
          </Card>
          <Card
            title="Switch开关"
            extra={
              <a href="https://ant.design/components/switch-cn/#API" target="_blank">
                API
              </a>
            }
          >
            <div className="margin-bottom">
              <Switch /> 基础用法
            </div>
            <div className="margin-bottom">
              <Switch disabled /> 禁用
            </div>
            <div className="margin-bottom">
              <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked /> 带有文字
            </div>
            <div className="margin-bottom">
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                defaultChecked
              />
              带有图标
            </div>
          </Card>
          <Card
            title="Select选择器"
            extra={
              <a href="https://ant.design/components/select-cn/#API" target="_blank">
                API
              </a>
            }
          >
            <div className="margin-bottom">
              <Select style={{ width: 120, marginRight: 16 }} placeholder="基础款">
                <Select.Option value="jack">Jack</Select.Option>
                <Select.Option value="lucy">Lucy</Select.Option>
                <Select.Option value="disabled" disabled>
                  Disabled
                </Select.Option>
                <Select.Option value="Yiminghe">yiminghe</Select.Option>
              </Select>
              <Select defaultValue="lucy" style={{ width: 120 }} disabled placeholder="禁用状态">
                <Select.Option value="jack">Jack</Select.Option>
                <Select.Option value="lucy">默认值Lucy</Select.Option>
              </Select>
            </div>
            <div className="margin-bottom">
              <Select
                placeholder="多选"
                mode="multiple"
                style={{ width: '100%' }}
                defaultValue={['lucy']}
              >
                <Select.Option value="jack">Jack</Select.Option>
                <Select.Option value="lucy">Lucy</Select.Option>
                <Select.Option value="disabled" disabled>
                  Disabled
                </Select.Option>
                <Select.Option value="Yiminghe">yiminghe</Select.Option>
              </Select>
            </div>
          </Card>
          <Card
            title="AutoComplete自动完成"
            extra={
              <a href="https://ant.design/components/auto-complete-cn/#API" target="_blank">
                API
              </a>
            }
          >
            <AutoComplete
              dataSource={dataSource}
              style={{ width: '100%' }}
              onSelect={value => {
                console.log('onSelect', value);
              }}
              onSearch={value => {
                let result;
                if (!value || value.indexOf('@') >= 0) {
                  result = [];
                } else {
                  result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
                }
                this.setState({ dataSource: result });
              }}
              placeholder="input here"
            />
          </Card>
          <Card
            title="InputNumber数字输入框"
            extra={
              <a href="https://ant.design/components/input-number-cn/#API" target="_blank">
                API
              </a>
            }
          >
            <div className="margin-bottom">
              <InputNumber min={1} max={10} defaultValue={3} /> 设定范围
            </div>
            <div className="margin-bottom">
              <InputNumber min={0} defaultValue={1.08} max={10} step={0.01} /> 小数
            </div>
            <div className="margin-bottom">
              <InputNumber
                defaultValue={1000}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
              美元
            </div>
            <div className="margin-bottom">
              <InputNumber
                defaultValue={100}
                min={0}
                max={100}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
              />
              百分比
            </div>
          </Card>
          <Card
            title="TimePicker时间选择框"
            extra={
              <a href="https://ant.design/components/time-picker-cn/#API" target="_blank">
                API
              </a>
            }
          >
            <div className="margin-bottom">
              <TimePicker id="sd1" defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} /> 基本用法
            </div>
            <div className="margin-bottom">
              <TimePicker id="sd2" defaultValue={moment('12:08', 'HH:mm')} format="HH:mm" />
              时分
            </div>
            <div className="margin-bottom">
              <TimePicker id="sd3" use12Hours /> 12小时制
            </div>
          </Card>
          <Card
            title="图片上传"
            extra={
              <a href="https://ant.design/components/upload-cn/#API" target="_blank">
                API
              </a>
            }
          >
            <div className="margin-bottom">
              只能上传3个附件
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={() => this.setState({ previewVisible: false })}
              >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
            <div className="margin-bottom">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={file => {
                  const isJPG = file.type === 'image/jpeg';
                  if (!isJPG) {
                    message.error('You can only upload JPG file!');
                  }
                  const isLt2M = file.size / 1024 / 1024 < 2;
                  if (!isLt2M) {
                    message.error('Image must smaller than 2MB!');
                  }
                  return isJPG && isLt2M;
                }}
                onChange={info => {
                  if (info.file.status === 'uploading') {
                    this.setState({ loading: true });
                    return;
                  }
                  if (info.file.status === 'done') {
                    // Get this url from response in real world.
                    // getBase64(info.file.originFileObj, imageUrl =>
                    this.setState({
                      imageUrl,
                      loading: false,
                    });
                    // );
                  }
                  if (info.file.status === 'error') {
                    message.error('error');
                  }
                }}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" />
                ) : (
                  <div>
                    <Icon type={this.state.loading ? 'loading' : 'plus'} />
                    <div className="ant-upload-text">Upload</div>
                  </div>
                )}
              </Upload>
              限制用户上传的图片格式和大小
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Demo;
