import React from 'react';
import { mount } from 'enzyme';
import DynamicAttribute from '..';
import Col from '../../col';
import Button from '../../button';

const colLayout = {
  xs: 12,
  sm: 12,
  md: 8,
  xl: 8,
}
const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 18 },
  },
}
let fieldsValue;
class BasicDynamicTest extends React.Component {

  handleSubmit = form => {
    form.validateFields((err, value) => {
      if (err) return;
      fieldsValue = value;
    });
  }

  render () {
    const dynamicProps = {
      formProps: {
        layout: 'inline',
        formItemLayout,
        onSubmit: this.handleSubmit
      },
      layout: [
        {
          id: "area",
          label: "area",
          type: "combobox",
          data: [
            { name: "江苏", value: "jiangsu" },
            { name: "浙江", value: "zhejiang" }
          ],
          rules: [{
            required: true,
          }],
          colLayout,
        },
        {
          id: "city",
          bindctrl: "area",
          label: "city",
          type: "combobox",
          data: [
            { name: "杭州", value: "hangzhou", bindTo: "zhejiang" },
            { name: "南京", value: "nanjing", bindTo: "jiangsu" },
            { name: "宁波", value: "ningbo", bindTo: "zhejiang" },
            { name: "苏州", value: "suzhou", bindTo: "jiangsu" },
            { name: "无锡", value: "wuxi", bindTo: "jiangsu" }
          ],
          rules: [{
            required: true,
          }],
          colLayout,
        },
        {
          id: "distict",
          bindctrl: "city",
          label: "distict",
          type: "multiselect",
          data: [
            { name: "江宁区", value: "jiangning", bindTo: "nanjing" },
            { name: "雨花区", value: "yuhua", bindTo: "nanjing" },
            { name: "相城区", value: "xiangcheng", bindTo: "suzhou" },
            { name: "吴中区", value: "wuzhong", bindTo: "suzhou" },
            { name: "江干区", value: "jianggan", bindTo: "hangzhou" },
            { name: "上城区", value: "shangcheng", bindTo: "hangzhou" },
          ],
          colLayout,
        }
      ],
      initValues: [
        { attrId: "area", attrValue: "jiangsu" },
        { attrId: "city", attrValue: "nanjing" },
        { attrId: "distict", attrValue: "jiangning|yuhua" },
      ]
    }

    return (
      <DynamicAttribute {...dynamicProps}>
        <Col span={2} style={{ marginTop: 12, textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Col>
      </DynamicAttribute>
    )
  }
}

describe('DynamicAttribute', () => {
  it('render correctly', () => {
    const wrapper = mount(<BasicDynamicTest />);
    const body = wrapper.find('.ant-row').exists();
    expect(body).toBe(true);
    const contentLength = wrapper.find('.ant-form-item-required').length;
    expect(contentLength).toBe(2);
    expect(wrapper.find('#area').find('.ant-select-selection-selected-value').getDOMNode().getAttribute('title')).toBe("江苏");
    expect(wrapper.find('#city').find('.ant-select-selection-selected-value').getDOMNode().getAttribute('title')).toBe("南京");
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('submit button trigger submit', () => {
    const wrapper = mount(<BasicDynamicTest />);
    wrapper.find('Form').at(0).simulate('submit');
    expect(fieldsValue).toEqual({ "area": "jiangsu", "city": "nanjing", "distict": ["jiangning", "yuhua"] });
  });
});
