import React from 'react';
import { mount } from 'enzyme';
import DynamicAttribute from '..';
import Col from '../../col';
import Button from '../../button';

const colLayout = {
  xs: 24,
  sm: 24,
  md: 12,
  xl: 12,
}
const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 18 },
  },
};
let fieldsValue;
class ReadonlyTest extends React.Component {

  handleSubmit = form => {
    form.validateFields((err, value) => {
      if (err) fieldsValue = false;
      else fieldsValue = value;
    });
  }

  render () {
    const readOnly = true;
    const dynamicProps = {
      formProps: {
        colLayout,
        formItemLayout,
        "layout": 'inline',
        "onSubmit": this.handleSubmit,
      },
      "layout": [
        {
          "id": "sex",
          "label": "sex",
          "type": "combobox",
          "data": [
            { "name": "男", "value": "L" },
            { "name": "女", "value": "M" }
          ],
          "rules": [{
            "required": true
          }],
          "ctrlProps": {
            readOnly
          },
        },
        {
          "id": "fruit",
          "label": "fruits",
          "type": "multiselect",
          "bindctrl": "sex",
          "data": [
            { "name": "苹果", "value": "apple", "bindTo": "M" },
            { "name": "香蕉", "value": "banana", "bindTo": "L" },
            { "name": "橙", "value": "orange", "bindTo": "L" }
          ],
          "rules": [{
            "required": true
          }],
          "ctrlProps": {
            readOnly
          },
        },
        {
          "id": "date",
          "label": "date",
          "type": "datetimepicker",
          "format": "YYYY-MM-DD HH:mm:ss",
          "rules": [{
            "required": true
          }],
          "ctrlProps": {
            readOnly
          },
        },
        {
          "id": "text",
          "label": "text",
          "type": "text",
          "required": true,
          "rules": [{
            "required": true,
            "min": 12
          }],
          "ctrlProps": {
            readOnly
          },
        },
        {
          "id": "ttt",
          "label": "ttt",
          "type": "text",
          "ctrlProps": {
            readOnly
          },
        },
        {
          "id": "eee",
          "label": "eee",
          "type": "text",
          "rules": [{
            "required": true,
            "max": 120
          }],
          "ctrlProps": {
            readOnly
          },
        },
      ],
      "initValues": [
        { "attrId": "sex", "attrValue": "L" },
        // { "attrId": "fruit", "attrValue": "banana|orange" },
        { "attrId": "date", "attrValue": "2019-04-29 09:23:45" },
        { "attrId": "text", "attrValue": "text123456781" },
        { "attrId": "ttt", "attrValue": "ttt" },
        { "attrId": "eee", "attrValue": "eeeText" }
      ]
    }

    return (
      <DynamicAttribute {...dynamicProps} wrappedComponentRef={(a) => { this.formRef = a }}>
        <Col span={2} style={{ marginTop: 12, textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Col>
      </DynamicAttribute>
    )
  }
}

describe('DynamicAttribute', () => {
  it('render correctly', () => {
    const wrapper = mount(<ReadonlyTest />);
    const formItem = wrapper.find('.ant-form-item').at(0).hasClass('readOnlyItem');
    expect(formItem).toBe(true);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('submit button trigger submit', () => {
    const wrapper = mount(<ReadonlyTest />);
    wrapper.find('Form').at(0).simulate('submit');
    expect(fieldsValue).toEqual(false);
  });
});
