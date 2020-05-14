import React, { Component, Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  TreeSelect,
  Button,
  Upload,
  Icon,
  Radio,
  Checkbox,
  TimePicker,
  AutoComplete,
  Slider,
  Divider,
  Rate,
  Modal,
} from 'antd';
import './index.less';

const __rest = (this && this.__rest) || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
};

const judgeShowTime = (values, id) => {
  const targetItem = values.find(v => v.attrId === id) || {};
  if (Object.keys(targetItem).length) {
      const { attrValue } = targetItem;
      return attrValue.indexOf(' ') > -1 && attrValue.split(' ').length === 2;
  }
  return false;
};
const transFishformToFdx = (format, values, id) => {
  const showTime = judgeShowTime(values, id);
  let fdxFormat = format.toUpperCase();
  fdxFormat = fdxFormat.replace('II', 'mm');
  fdxFormat = fdxFormat.replace('SS', 'ss');
  if (fdxFormat.split(' ').length > 1)
      return fdxFormat;
  return showTime ? `${fdxFormat} HH:mm:ss` : fdxFormat;
};
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const COMMONRule = {
  required: true,
  msg: 'Required',
};
const COMMONDATE_RULE = {
  type: 'object',
  required: true,
  msg: 'Required'
};
const COMMONARRAY_RULE = {
  type: 'array',
  required: true,
  msg: 'Required',
};
// 默认表单一行一组控件
const ColLayout = {
  xs: 24,
  sm: 24,
  md: 24,
  xl: 24,
};
// 默认label和输入控件的样式布局
const FormItemLayout = {
  labelCol: {
      span: 7,
  },
  wrapperCol: {
      span: 17,
  },
};
class DynamicAttribute extends Component {
  constructor() {
      super(...arguments);
      this.state = {
          emailSearchResult: [],
          popEditModalVisible: false,
      };
      // 暴露给外部的方法
      this.getFieldsValue = e => {
          if (e) {
              e.preventDefault();
          }
          const { form, layout, initValues, formProps } = this.props;
          const { onSubmit } = formProps;
          if (onSubmit) {
              onSubmit(form);
              return;
          }
          const values = {};
          let valid = true;
          form.validateFields((err, fieldsValue) => {
              if (err) {
                  valid = false;
                  return;
              }
              Object.keys(fieldsValue).forEach(key => {
                  const value = fieldsValue[key];
                  if (moment.isMoment(value)) {
                      const targetItem = layout.find(v => v.id === key);
                      const { id, format = 'YYYY-MM-DD' } = targetItem;
                      const realFormat = transFishformToFdx(format, initValues, id);
                      values[key] = value.format(realFormat);
                  }
                  else
                      values[key] = value;
              });
          });
          return valid ? values : false;
      };
      this.resetFields = () => {
          const { form: { resetFields } } = this.props;
          resetFields();
      };
      this.judgeIfContain = (item, currentValue, type) => {
          let containFlag = true;
          if (type === 'multiselect' && !Array.isArray(currentValue))
              currentValue = currentValue.split("|");
          const { form: { getFieldValue } } = this.props;
          const { bindctrl, data = [] } = item;
          const ctrlVal = getFieldValue(bindctrl);
          const options = data.filter(v => v.bindTo === ctrlVal);
          if (Array.isArray(currentValue)) {
              const optionValues = options.map(v => v.value);
              if (currentValue.some(v => !optionValues.includes(v))) {
                  containFlag = false;
              }
          }
          else if (!options.some(v => v.value === currentValue)) {
              containFlag = false;
          }
          return containFlag;
      };
      this.handleMultiValues = (type, value) => {
          if (type === 'multiselect') {
              if (!value)
                  return [];
              return value.split("|");
          }
          if (type === 'datetimepicker') {
              return value ? moment(value) : null;
          }
          return value;
      };
      this.handleInit = item => {
          const { initValues } = this.props;
          const { id, type, bindctrl } = item;
          if (initValues.length > 0) {
              const targetItem = initValues.find(v => v.attrId === id) || {};
              if (Object.keys(targetItem).length) {
                  if (bindctrl) {
                      if (targetItem.attrValue) {
                          if (!this.judgeIfContain(item, targetItem.attrValue, type)) {
                              return type === 'multiselect' ? [] : null;
                          }
                      }
                  }
                  return this.handleMultiValues(type, targetItem.attrValue);
              }
              return type === 'multiselect' ? [] : null;
          }
          return type === 'multiselect' ? [] : null;
      };
      this.generateSelectBefore = (data, restProps, id) => {
          const { form: { getFieldDecorator }, } = this.props;
          const { initValues } = this.props;
          const targetItem = initValues.find(v => v.attrId === id) || {};
          return getFieldDecorator('prefixProtocol', {
              initialValue: targetItem.attrValue,
          })(React.createElement(Select, Object.assign({ className: "dynamic-select", style: { width: 90 } }, restProps), data.length !== 0 && data.map((item, index) => React.createElement(Option, { value: item, key: `protocol-${index}` }, item))));
      };
      this.generateSelectAfter = (data, restProps, id) => {
          const { form: { getFieldDecorator }, } = this.props;
          const { initValues } = this.props;
          const targetItem = initValues.find(v => v.attrId === id) || {};
          return getFieldDecorator('suffixSite', {
              initialValue: targetItem.attrValue,
          })(React.createElement(Select, Object.assign({ className: "dynamic-select", style: { width: 80 } }, restProps), data.length !== 0 && data.map((item, index) => React.createElement(Option, { value: item, key: `site-${index}` }, item))));
      };
      this.renderOptions = item => {
          const { bindctrl, data, id, type } = item;
          const { form: { getFieldValue, resetFields } } = this.props;
          let options = data;
          if (bindctrl) {
              const ctrlVal = getFieldValue(bindctrl);
              if (ctrlVal) {
                  options = data.filter(v => v.bindTo === ctrlVal);
              }
              // 若当前选择项不全部属于bindctrl，需要清空选择项
              const currentValue = getFieldValue(id);
              if (currentValue) {
                  if (!this.judgeIfContain(item, currentValue, type)) {
                      resetFields([id]);
                  }
              }
          }
          return options.map(iem => (React.createElement(Option, { value: iem.value, key: `${bindctrl}_${iem.value}_${iem.name}` }, iem.name)));
      };
      this.renderItem = (item, index) => {
          const { formProps } = this.props;
          const { colLayout = ColLayout, formItemLayout = FormItemLayout } = formProps;
          const { type, label, colLayout: itemColLayout = colLayout, formItemLayout: itemFormLayout = formItemLayout, ctrlProps = {} } = item;
          const { readOnly = false } = ctrlProps;
          let renderFunc = null;
          switch (type) {
              case 'text':
              case 'textarea':
              case 'password':
              case 'hidden':
                  renderFunc = this.renderInput;
                  break;
              case 'datetimepicker':
              case 'dateRangePicker':
                  renderFunc = this.renderDatePicker;
                  break;
              case 'combobox':
              case 'multiselect':
                  renderFunc = this.renderSelect;
                  break;
              case 'number':
                  renderFunc = this.renderNumber;
                  break;
              case 'popedit':
                  renderFunc = this.renderPopEdit;
                  break;
              case 'treeSelect':
                  renderFunc = this.renderTreeSelect;
                  break;
              case 'file':
                  renderFunc = this.renderFile;
                  break;
              case 'radioGroup':
              case 'radioButton':
                  renderFunc = this.renderRadioGroup;
                  break;
              case 'checkbox':
                  renderFunc = this.renderCheckbox;
                  break;
              case 'timePicker':
                  renderFunc = this.renderTimePicker;
                  break;
              case 'combination':
                  renderFunc = this.renderCombination;
                  break;
              case 'email':
                  renderFunc = this.renderEmail;
                  break;
              case 'slider':
                  renderFunc = this.renderSlider;
                  break;
              case 'rate':
                  renderFunc = this.renderRate;
                  break;
              case 'submit':
                  renderFunc = this.renderSubmit;
                  break;
              default:
                  break;
          }
          return (React.createElement(Col, Object.assign({ key: `dynamic_${index}` }, itemColLayout), type === 'divider' ? React.createElement(Divider, null) :
              React.createElement(FormItem, Object.assign({ className: classNames('dynamic-form-item', { 'readOnlyItem': readOnly === true, 'hiddenItem': type === 'hidden' }) }, itemFormLayout, { label: label }), renderFunc(item, index))));
      };
      this.renderCommonAttrs = item => {
          const { onChange } = this.props;
          const { ctrlProps = {} } = item;
          const params = Object.assign({}, ctrlProps);
          if (onChange) {
              params.onChange = (value) => { onChange(item.id, value); };
          }
          return params;
      };
      this.renderSubmit = item => {
          const { ctrlProps = {}, btnProps = {}, } = item;
          const { readOnly = false } = ctrlProps;
          let restProps = {};
          if (readOnly)
              restProps.disabled = true;
          const { label = 'submit' } = btnProps;
          return React.createElement(Fragment, null,
              React.createElement(Button, Object.assign({ type: "primary", htmlType: "submit" }, restProps), label));
      };
      this.filterRules = (rules = []) => {
          rules.forEach(rule => {
              if (rule.pattern !== undefined) {
                  const flag = rule.flag || 'i';
                  rule.pattern = new RegExp(rule.pattern, flag);
              }
          });
          return rules;
      };
      this.renderInput = item => {
          const { form: { getFieldDecorator }, } = this.props;
          const { datarule = '', id, required, type, rules = [] } = item;
          const rulesDefault = this.filterRules(rules);
          if (required)
              rulesDefault.unshift(COMMONRule);
          const key = "length";
          if (datarule.length > 0 && datarule.indexOf(key) > -1) {
              const index = datarule.indexOf(key) + key.length;
              const maxmin = datarule.substring(index, datarule.length);
              const min = maxmin.substring(1, maxmin.indexOf("~"));
              const max = maxmin.substring(maxmin.indexOf("~") + 1, maxmin.length - 1);
              if (min !== '')
                  rulesDefault.unshift({
                      min: parseInt(min, 10)
                  });
              if (max !== '')
                  rulesDefault.unshift({
                      max: parseInt(max, 10)
                  });
          }
          if (type === 'textarea') {
              return getFieldDecorator(id, {
                  initialValue: this.handleInit(item),
                  rules: rulesDefault,
              })(React.createElement(TextArea, Object.assign({}, this.renderCommonAttrs(item))));
          }
          if (type === 'text') {
              return getFieldDecorator(id, {
                  initialValue: this.handleInit(item),
                  rules: rulesDefault,
              })(React.createElement(Input, Object.assign({}, this.renderCommonAttrs(item))));
          }
          if (type === 'password') {
              return getFieldDecorator(id, {
                  initialValue: this.handleInit(item),
                  rules: rulesDefault,
              })(React.createElement(Input.Password, Object.assign({}, this.renderCommonAttrs(item))));
          }
          else {
              return getFieldDecorator(id, {
                  initialValue: this.handleInit(item),
              })(React.createElement(Input, null));
          }
      };
      this.renderNumber = item => {
          const { form: { getFieldDecorator }, } = this.props;
          const { required, id, rules = [] } = item;
          const rulesDefault = this.filterRules(rules);
          if (required)
              rulesDefault.unshift(COMMONDATE_RULE);
          return getFieldDecorator(id, {
              initialValue: this.handleInit(item),
              rules: rulesDefault,
          })(React.createElement(InputNumber, Object.assign({ className: "dynamic-input-number" }, this.renderCommonAttrs(item))));
      };
      this.renderFile = item => {
          const { form: { getFieldDecorator }, } = this.props;
          const { required, id, rules = [], ctrlProps = {} } = item;
          const { readOnly = false } = ctrlProps;
          let restProps = {};
          if (readOnly)
              restProps.disabled = true;
          const rulesDefault = this.filterRules(rules);
          if (required)
              rulesDefault.unshift(COMMONDATE_RULE);
          const fileProps = Object.assign({}, this.renderCommonAttrs(item), restProps);
          return getFieldDecorator(id, {
              initialValue: this.handleInit(item),
              rules: rulesDefault,
          })(React.createElement(Upload, Object.assign({}, fileProps),
              React.createElement(Button, Object.assign({}, restProps),
                  React.createElement(Icon, { type: "upload" }),
                  " Click to Upload")));
      };
      this.renderSlider = item => {
          const { form: { getFieldDecorator }, } = this.props;
          const { required, id, rules = [], ctrlProps = {}, data = {} } = item;
          const { readOnly = false } = ctrlProps;
          let restProps = {};
          if (readOnly)
              restProps.disabled = true;
          const rulesDefault = this.filterRules(rules);
          if (required)
              rulesDefault.unshift(COMMONDATE_RULE);
          const sliderProps = Object.assign({}, this.renderCommonAttrs(item), restProps, { marks: data });
          return getFieldDecorator(id, {
              initialValue: this.handleInit(item) || 0,
              rules: rulesDefault,
          })(React.createElement(Slider, Object.assign({}, sliderProps)));
      };
      this.renderRate = item => {
          const { form: { getFieldDecorator }, } = this.props;
          const { required, id, rules = [], ctrlProps = {}, data = {} } = item;
          const { readOnly = false } = ctrlProps;
          let restProps = {};
          if (readOnly)
              restProps.disabled = true;
          const rulesDefault = this.filterRules(rules);
          if (required)
              rulesDefault.unshift(COMMONDATE_RULE);
          const sliderProps = Object.assign({}, this.renderCommonAttrs(item), restProps, { marks: data });
          return getFieldDecorator(id, {
              initialValue: this.handleInit(item),
              rules: rulesDefault,
          })(React.createElement(Rate, Object.assign({ className: "dynamic-rate" }, sliderProps)));
      };
      this.renderCombination = item => {
          const { form: { getFieldDecorator }, } = this.props;
          const { required, id, prefixId, suffixId, rules = [], ctrlProps = {}, addonBefore = ['Http://', 'Https://'], addonAfter = ['.com', '.jp', '.cn', '.org'] } = item;
          const { readOnly = false } = ctrlProps;
          let restProps = {};
          if (readOnly)
              restProps.disabled = true;
          const rulesDefault = this.filterRules(rules);
          if (required)
              rulesDefault.unshift(COMMONDATE_RULE);
          const urlProps = Object.assign({}, this.renderCommonAttrs(item), restProps, { allowClear: true, addonBefore: this.generateSelectBefore(addonBefore, restProps, prefixId), addonAfter: this.generateSelectAfter(addonAfter, restProps, suffixId) });
          return getFieldDecorator(id, {
              initialValue: this.handleInit(item),
              rules: rulesDefault,
          })(React.createElement(Input, Object.assign({}, urlProps)));
      };
      this.filterEmail = (value, data = []) => {
          let emailSearchResult;
          if (!value || value.indexOf('@') >= 0) {
              emailSearchResult = [];
          }
          else {
              emailSearchResult = data.map(domain => `${value}@${domain}`);
          }
          this.setState({
              emailSearchResult
          });
      };
      this.renderEmailOption = item => {
          const { data = [], id } = item;
          const { form: { getFieldValue } } = this.props;
          const target = getFieldValue(id);
          return this.filterEmail(target, data);
      };
      this.renderEmail = item => {
          const { form: { getFieldDecorator }, } = this.props;
          const { required, id, rules = [], ctrlProps = {} } = item;
          const { readOnly = false } = ctrlProps;
          const { emailSearchResult = [] } = this.state;
          const children = emailSearchResult.map(email => React.createElement(AutoComplete.Option, { key: email }, email));
          let restProps = {};
          if (readOnly)
              restProps.disabled = true;
          const rulesDefault = this.filterRules(rules);
          if (required)
              rulesDefault.unshift(COMMONDATE_RULE);
          const emailProps = Object.assign({}, this.renderCommonAttrs(item), restProps, { allowClear: true, style: { width: '100%' }, onSearch: () => this.renderEmailOption(item) });
          return getFieldDecorator(id, {
              initialValue: this.handleInit(item),
              rules: rulesDefault,
          })(React.createElement(AutoComplete, Object.assign({}, emailProps), children));
      };
      this.renderRadioGroup = item => {
          const { form: { getFieldDecorator }, } = this.props;
          const { required, id, rules = [], ctrlProps = {}, data = [], type } = item;
          const { readOnly = false } = ctrlProps;
          let restProps = {};
          if (readOnly)
              restProps.disabled = true;
          const rulesDefault = this.filterRules(rules);
          if (required)
              rulesDefault.unshift(COMMONDATE_RULE);
          const radioProps = Object.assign({}, this.renderCommonAttrs(item), restProps);
          return getFieldDecorator(id, {
              initialValue: this.handleInit(item),
              rules: rulesDefault,
          })(this.renderGroup(type, data, radioProps));
      };
      this.renderGroup = (type, data = [], props) => {
          if (type === 'radioGroup') {
              return React.createElement(Radio.Group, Object.assign({ className: "dynamic-radio-group" }, props), data.length !== 0 && data.map((radio, index) => React.createElement(Radio, { value: radio.value, key: `radio-group-${index}` }, radio.label)));
          }
          else {
              return React.createElement(Radio.Group, Object.assign({ className: "dynamic-radio-group" }, props), data.length !== 0 && data.map((radio, index) => React.createElement(Radio.Button, { value: radio.value, key: `radio-button-${index}` }, radio.label)));
          }
      };
      this.renderCheckbox = item => {
          const { form: { getFieldDecorator }, } = this.props;
          const { required, id, rules = [], ctrlProps = {}, data = [] } = item;
          const { readOnly = false } = ctrlProps;
          let restProps = {};
          if (readOnly)
              restProps.disabled = true;
          const rulesDefault = this.filterRules(rules);
          if (required)
              rulesDefault.unshift(COMMONDATE_RULE);
          const checkboxProps = Object.assign({ options: data }, this.renderCommonAttrs(item), restProps);
          return getFieldDecorator(id, {
              initialValue: this.handleInit(item),
              rules: rulesDefault,
          })(React.createElement(Checkbox.Group, Object.assign({ className: "dynamic-checkbox-group" }, checkboxProps)));
      };
      this.renderDateItem = (props, type) => {
          switch (type) {
              case 'datetimepicker':
                  return React.createElement(DatePicker, Object.assign({}, props));
              case 'dateRangePicker':
                  return React.createElement(DatePicker.RangePicker, Object.assign({ className: "dynamic-range-picker" }, props));
              default:
                  break;
          }
      };
      this.renderDatePicker = item => {
          const { form: { getFieldDecorator }, initValues, } = this.props;
          const { required, id, format = 'YYYY-MM-DD', type, ctrlProps = {}, rules = [] } = item;
          const { readOnly = false } = ctrlProps;
          let restProps = {};
          if (readOnly)
              restProps.disabled = true;
          const fdxFormat = transFishformToFdx(format, initValues, id);
          const rulesDefault = this.filterRules(rules);
          if (required)
              rulesDefault.unshift(COMMONDATE_RULE);
          const dateProps = Object.assign({ style: { width: '100%' }, format: fdxFormat, allowClear: true, showTime: judgeShowTime(initValues, id) }, this.renderCommonAttrs(item), restProps);
          const initTime = type === 'datetimepicker' ? this.handleInit(item) : this.formatRangeTime(this.handleInit(item), fdxFormat);
          return getFieldDecorator(id, {
              initialValue: initTime,
              rules: rulesDefault,
          })(this.renderDateItem(dateProps, type));
      };
      this.formatRangeTime = (value, format) => {
          if (value === null)
              return null;
          return value.map(time => moment(time, format));
      };
      this.renderTimePicker = item => {
          const { form: { getFieldDecorator }, } = this.props;
          const { required, id, format = 'HH:mm:ss', ctrlProps = {}, rules = [] } = item;
          const { readOnly = false } = ctrlProps;
          let restProps = {};
          if (readOnly)
              restProps.disabled = true;
          const rulesDefault = this.filterRules(rules);
          if (required)
              rulesDefault.unshift(COMMONDATE_RULE);
          const timeProps = Object.assign({ style: { width: '100%' }, format, allowClear: true }, this.renderCommonAttrs(item), restProps);
          const initTime = this.handleInit(item) ? moment(this.handleInit(item), format) : null;
          return getFieldDecorator(id, {
              initialValue: initTime,
              rules: rulesDefault,
          })(React.createElement(TimePicker, Object.assign({}, timeProps)));
      };
      this.renderSelect = item => {
          const { form: { getFieldDecorator }, } = this.props;
          const { required, id, type, rules = [], ctrlProps = {} } = item;
          const { readOnly = false } = ctrlProps;
          let restProps = {};
          if (readOnly)
              restProps.disabled = true;
          const rulesDefault = this.filterRules(rules);
          if (required)
              rulesDefault.unshift(type === "multiselect" ? COMMONARRAY_RULE : COMMONRule);
          const selectProps = Object.assign({ allowClear: true, width: '100%' }, this.renderCommonAttrs(item), restProps);
          if (type === "multiselect")
              selectProps.mode = "multiple";
          return getFieldDecorator(id, {
              initialValue: this.handleInit(item),
              rules: rulesDefault
          })(React.createElement(Select, Object.assign({ className: "dynamic-select" }, selectProps), this.renderOptions(item)));
      };
      this.renderTreeSelect = item => {
          const { form: { getFieldDecorator }, } = this.props;
          const { required, id, rules = [], ctrlProps = {} } = item;
          const { readOnly = false } = ctrlProps;
          let restProps = {};
          if (readOnly)
              restProps.disabled = true;
          const rulesDefault = this.filterRules(rules);
          if (required)
              rulesDefault.unshift(COMMONDATE_RULE);
          const selectTreeProps = Object.assign({ width: '100%', allowClear: true, dropdownStyle: { maxHeight: 400, overflow: 'auto' }, treeDefaultExpandAll: true }, this.renderCommonAttrs(item), restProps);
          return getFieldDecorator(id, {
              initialValue: this.handleInit(item),
              rules: rulesDefault
          })(React.createElement(TreeSelect, Object.assign({ className: "dynamic-select" }, selectTreeProps)));
      };
      this.renderPopEdit = item => {
          const { form: { getFieldDecorator }, } = this.props;
          const { required, id, modalProps = {}, rules = [], ctrlProps = {} } = item;
          const { readOnly = false } = ctrlProps;
          const rulesDefault = this.filterRules(rules);
          if (required)
              rulesDefault.unshift(COMMONDATE_RULE);
          let restProps = {};
          if (readOnly)
              restProps.disabled = true;
          const { render = () => { }, onOk = () => { } } = modalProps, rest = __rest(modalProps, ["render", "onOk"]);
          const inputProps = Object.assign({ width: '100%' }, this.renderCommonAttrs(item), restProps);
          return getFieldDecorator(id, {
              initialValue: this.handleInit(item),
              rules: rulesDefault
          })(React.createElement(Input, Object.assign({}, inputProps, { suffix: React.createElement(Icon, { type: "select", onClick: () => this.onPopEditModalOpen(onOk, render, rest) }) })));
      };
      this.handleProps = (formProps) => {
          // eslint-disable-next-line no-unused-vars
          const { colLayout = ColLayout, formItemLayout = FormItemLayout } = formProps, resetProps = __rest(formProps, ["colLayout", "formItemLayout"]);
          return Object.assign({}, colLayout, formItemLayout, resetProps);
      };
      this.onPopEditModalOk = () => {
          this.handlePopEditModalOk();
          this.setState({
              popEditModalVisible: false
          });
      };
      this.onPopEditModalCancel = () => {
          this.setState({
              popEditModalVisible: false
          });
      };
      this.onPopEditModalOpen = (onOk, render, rest) => {
          this.handlePopEditModalOk = onOk;
          this.renderPopEditModal = render;
          this.popEditProps = rest;
          this.setState({
              popEditModalVisible: true
          });
      };
  }
  render() {
      const { layout, formProps, children } = this.props;
      const { popEditModalVisible } = this.state;
      const modalProps = Object.assign({}, this.popEditProps, { visible: popEditModalVisible, onOk: this.onPopEditModalOk, onCancel: this.onPopEditModalCancel });
      return (React.createElement("div", { className: "fdx-form" },
          React.createElement(Form, Object.assign({}, this.handleProps(formProps), { onSubmit: this.getFieldsValue }),
              React.createElement(Row, null,
                  layout.map(this.renderItem),
                  children)),
          popEditModalVisible &&
              React.createElement(Modal, Object.assign({}, modalProps), this.renderPopEditModal())));
  }
}

DynamicAttribute.propTypes = {
  formProps: PropTypes.object,
  layout: PropTypes.array,
  initValues: PropTypes.array,
};
DynamicAttribute.defaultProps = {
  formProps: {
      colLayout: ColLayout,
      formItemLayout: FormItemLayout,
  },
  layout: [],
  initValues: [],
};

export default Form.create()(DynamicAttribute);
