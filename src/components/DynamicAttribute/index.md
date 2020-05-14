DynamicAttribute 动态属性控件
===

## 定义

此控件属于 ngPoral `Feature Management`属性管理 组织员工管理中的一块脱离业务意义的功能，根据一段json生成对应的`form`表单控件

## 何时使用

获取`BFM_TABLE_EXT`和`BFM_TABLE_EXT_VALUE`两张表数据，根据返回数据动态生成相应的控件

## 基本用法

## 根据一段省市区json展示对应的select控件

<!--DemoStart-->
```jsx
import React, { Component } from "react";
import { DynamicAttribute, Col, Button } from "@whalecloud/fdx";

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

class Demo extends React.Component {
  handleSubmit = form => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log("values", fieldsValue);
    });
  }

  render() {
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
      <React.Fragment>
        <DynamicAttribute {...dynamicProps}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">提交</Button>
          </Col>
        </DynamicAttribute>
      </React.Fragment>
    )
  }
}
ReactDOM.render(<Demo />, _mount_);
```
<!--DemoEnd-->

## 根据一段复杂json生成对应的表单

<!--DemoStart-->
```jsx
import React, { Component } from "react";
import { Form, DynamicAttribute, Col, Button } from "@whalecloud/fdx";

const FormItem = Form.Item;
const colLayout = {
  xs: 24,
  sm: 24,
  md: 12,
  xl: 12,
}

const colAreaLayout = {
  xs: 24,
  sm: 24,
  md: 24,
  xl: 24,
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

const formAreaLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 3,
    },
  },
};

class Demo extends Component {
  state = {
    editState: '',
    readOnly: true
  }

  handleSubmit = form => {
    const { validateFields } = form;
    validateFields((err, fieldsValue) => {
      if (err) return;
      console.log("values", fieldsValue);
    });
  }

  reset = () => {
    this.setState({
      editState: '',
      readOnly: true,
    });
  }

  newForm = () => {
    this.setState({ readOnly: false, editState: 'new' });
  }

  editForm = () => {
    this.setState({ readOnly: false, editState: 'edit' });
  }

  cancelEdit = () => {
    this.formRef.resetFields()
    this.reset();
  }

  renderFooter = () => {
    const { editState } = this.state;
    if (editState === '') {
      return (
        <React.Fragment>
          <Button type="primary" onClick={this.newForm}>new</Button>
          <Button type="primary" onClick={this.editForm}>edit</Button>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Button type="primary" htmlType="submit">ok</Button>
        <Button onClick={this.cancelEdit}>cancel</Button>
      </React.Fragment>
    );
  }

  render() {
    const { readOnly, editState } = this.state;
    const dynamicProps = {
      formProps: {
        colLayout,
        formItemLayout,
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
        {
          "id": "remark",
          "label": "remark",
          "type": "textarea",
          "colLayout": colAreaLayout,
          "formItemLayout": formAreaLayout,
          "rules": [{
            "max": 120,
            "min": 12
          }],
          "ctrlProps": {
            readOnly
          },
        },
      ],
      "initValues": editState !== 'new' ? [
        { "attrId": "sex", "attrValue": "L" },
        { "attrId": "fruit", "attrValue": "banana|orange" },
        { "attrId": "date", "attrValue": "2019-04-29 09:23:45" },
        { "attrId": "remark", "attrValue": "remark12345678" },
        { "attrId": "text", "attrValue": "text123456781" },
        { "attrId": "ttt", "attrValue": "ttt" },
        { "attrId": "eee", "attrValue": "eeeText" }
      ] : []
    }

    return (
      <DynamicAttribute {...dynamicProps} wrappedComponentRef={(a) => { this.formRef = a }}>
        <Col span={24}>
          <FormItem {...tailFormItemLayout}>{this.renderFooter()}</FormItem>
        </Col>
      </DynamicAttribute>
    )
  }
}
ReactDOM.render(<Demo />, _mount_);
```
<!--DemoEnd-->

## 所有表单类型

<!--DemoStart-->
```jsx
import React, { Component } from "react";
import { DynamicAttribute, Col, Button } from "@whalecloud/fdx";

class Demo extends Component {
  handleSubmit = form => {
    const { validateFields } = form;
    validateFields((err, fieldsValue) => {
      if (err) return;
      console.log("values", fieldsValue);
    });
  }

  handleFormChange = (id, value) => {
    if (id === 'file') {
      if (value.file.status !== 'uploading') {
        console.log(value.file, value.fileList);
      }
      if (value.file.status === 'done') {
        message.success(`${value.file.name} file uploaded successfully`);
      } else if (value.file.status === 'error') {
        message.error(`${value.file.name} file upload failed.`);
      }
    }
    if (id === 'treeSelectSearch') {
      this.formRef.props.form.setFieldsValue({
        [id]: value
      });
    }
  };

  render() {
    const dynamicProps = {
      "formProps": {
        "layout": 'inline',
        "onSubmit": this.handleSubmit
      },
      "layout": [
        {
          "id": "name",
          "label": "文本",
          "type": "text",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "rules": [
            {
              "required": true,
              "message": "name is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "id": "password",
          "label": "密码",
          "type": "password",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "rules": [
            {
              "required": true,
              "message": "Password is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "id": "number",
          "label": "数字",
          "type": "number",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "rules": [
            {
              "required": true,
              "message": "Number is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false,
            "min": 0,
            "max": 5,
            "step": 1
          }
        },
        {
          "id": "treeSelect",
          "label": "树选择",
          "type": "treeSelect",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "rules": [
            {
              "required": true,
              "message": "TreeSelect is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false,
            "treeData": [
              {
                "title": "0-2",
                "value": "0-2",
                "key": "0-2",
                "children": [
                  {
                    "title": "0-0-1",
                    "value": "0-0-1",
                    "key": "0-0-1"
                  },
                  {
                    "title": "0-0-2",
                    "value": "0-0-2",
                    "key": "0-0-2"
                  }
                ]
              },
              {
                "title": "0-1",
                "value": "0-1",
                "key": "0-1"
              }
            ],
            "placeholder": "Please select",
            "treeDefaultExpandAll": true
          }
        },
        {
          "id": "treeSelectSearch",
          "label": "可搜索的树",
          "type": "treeSelect",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "rules": [
            {
              "required": true,
              "message": "TreeSelectSearch is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false,
            "treeData": [
              {
                "title": "0-2",
                "value": "0-2",
                "key": "0-2",
                "children": [
                  {
                    "title": "0-0-1",
                    "value": "0-0-1",
                    "key": "0-0-1"
                  },
                  {
                    "title": "0-0-2",
                    "value": "0-0-2",
                    "key": "0-0-2"
                  }
                ]
              },
              {
                "title": "0-1",
                "value": "0-1",
                "key": "0-1"
              }
            ],
            "placeholder": "Please select",
            "treeDefaultExpandAll": true,
            "showSearch": true
          }
        },
        {
          "id": "multiTreeSelect",
          "label": "多选-树选择",
          "type": "treeSelect",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "rules": [
            {
              "required": true,
              "message": "TreeSelect is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false,
            "treeData": [
              {
                "title": "0-2",
                "value": "0-2",
                "key": "0-2",
                "children": [
                  {
                    "title": "0-0-1",
                    "value": "0-0-1",
                    "key": "0-0-1"
                  },
                  {
                    "title": "0-0-2",
                    "value": "0-0-2",
                    "key": "0-0-2"
                  }
                ]
              },
              {
                "title": "0-1",
                "value": "0-1",
                "key": "0-1"
              }
            ],
            "multiple": true,
            "placeholder": "Please select",
            "treeDefaultExpandAll": true
          }
        },
        {
          "id": "treeCheckable",
          "label": "可勾选-树选择",
          "type": "treeSelect",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "rules": [
            {
              "required": true,
              "message": "TreeCheckableSelect is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false,
            "treeData": [
              {
                "title": "0-2",
                "value": "0-2",
                "key": "0-2",
                "children": [
                  {
                    "title": "0-0-1",
                    "value": "0-0-1",
                    "key": "0-0-1"
                  },
                  {
                    "title": "0-0-2",
                    "value": "0-0-2",
                    "key": "0-0-2"
                  }
                ]
              },
              {
                "title": "0-1",
                "value": "0-1",
                "key": "0-1"
              }
            ],
            "treeCheckable": true,
            "placeholder": "Please select",
            "treeDefaultExpandAll": true
          }
        },
        {
          "id": "file",
          "label": "文件上传",
          "type": "file",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "ctrlProps": {
            "readOnly": false,
            "name": "file",
            "action": "https://www.mocky.io/v2/5cc8019d300000980a055e76",
            "headers": {
              "authorization": "authorization-text"
            }
          }
        },
        {
          "id": "radioGroup",
          "label": "Radio.Group",
          "type": "radioGroup",
          "data": [
            { "value": "Curry", "label": "库里" },
            { "value": "Kelery", "label": "克莱" },
            { "value": "Lin", "label": "林书豪" }
          ],
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "rules": [
            {
              "required": true,
              "message": "Radio group is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "id": "checkbox",
          "label": "复选框",
          "type": "checkbox",
          "data": [
            { "value": "Curry", "label": "库里" },
            { "value": "Kelery", "label": "克莱" },
            { "value": "Lin", "label": "林书豪" }
          ],
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "rules": [
            {
              "required": true,
              "message": "Checkbox is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "id": "allStar",
          "label": "下拉框",
          "type": "combobox",
          "data": [
            { "value": "James", "name": "詹姆斯" },
            { "value": "Wade", "name": "韦德" },
            { "value": "Curry", "name": "库里" },
            { "value": "Kobe", "name": "科比" }
          ],
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "rules": [
            {
              "required": true,
              "message": "Combobox is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "format": "HH:mm:ss",
          "id": "timePicker",
          "label": "时间类型",
          "type": "timePicker",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "type": "divider",
          "colLayout": {
            "xs": { "span": 21, "offset": 3 },
            "sm": { "span": 21, "offset": 3 },
            "md": { "span": 21, "offset": 3 },
            "xl": { "span": 21, "offset": 3 }
          }
        },
        {
          "format": "yyyy-mm-dd",
          "id": "datepicker",
          "label": "日期类型",
          "type": "datetimepicker",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "rules": [
            {
              "required": true,
              "message": "Date picker is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "format": "yyyy-mm-dd HH:mm:ss",
          "id": "datetimepicker",
          "label": "日期时间类型",
          "type": "datetimepicker",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "rules": [
            {
              "required": true,
              "message": "Date time picker is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "format": "yyyy-mm-dd HH:mm:ss",
          "id": "dateRangePicker",
          "label": "日期范围选择类型",
          "type": "dateRangePicker",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "rules": [
            {
              "required": true,
              "message": "Date range picker is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "id": "rate",
          "label": "评分",
          "type": "rate",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "rules": [
            {
              "required": true,
              "message": "Rate is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "id": "sex",
          "label": "sex",
          "type": "combobox",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "data": [
            { "name": "男", "value": "L" },
            { "name": "女", "value": "M" }
          ],
          "rules": [
            {
              "required": true
            }
          ],
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "id": "fruit",
          "label": "fruits",
          "type": "multiselect",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "bindctrl": "sex",
          "data": [
            { "name": "苹果", "value": "apple", "bindTo": "M" },
            { "name": "香蕉", "value": "banana", "bindTo": "L" },
            { "name": "橙", "value": "orange", "bindTo": "L" }
          ],
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "id": "url",
          "label": "url地址",
          "type": "combination",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "addonBefore": ["Http://", "Https://", "Ftp://"],
          "addonAfter": [".com", ".jp", ".cn", ".org", ".aaa"],
          "prefixId": "prefix",
          "suffixId": "suffix",
          "rules": [
            {
              "required": true,
              "message": "Url range picker is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "id": "email",
          "label": "邮箱",
          "type": "email",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "data": ["gmail.com", "163.com", "qq.com"],
          "rules": [
            {
              "required": true,
              "message": "Email is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "id": "slider",
          "label": "滑动输入条",
          "type": "slider",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "data": {
            "0": "A",
            "20": "B",
            "40": "C",
            "60": "D",
            "80": "E",
            "100": "F"
          },
          "rules": [
            {
              "required": true,
              "message": "Slider is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "id": "hidden",
          "label": "隐藏域表单",
          "type": "hidden",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          }
        },
        {
          "id": "radioButton",
          "label": "Radio.Button",
          "type": "radioButton",
          "colLayout": {
            "xs": 12,
            "sm": 12,
            "md": 12,
            "xl": 12
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 8 },
              "sm": { "span": 6 }
            },
            "wrapperCol": {
              "xs": { "span": 16 },
              "sm": { "span": 18 }
            }
          },
          "data": [
            { "value": "Curry", "label": "库里" },
            { "value": "Kelery", "label": "克莱" },
            { "value": "Lin", "label": "林书豪" }
          ],
          "rules": [
            {
              "required": true,
              "message": "Radio button is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "id": "textArea",
          "label": "文本输入框",
          "type": "textarea",
          "colLayout": {
            "xs": 24,
            "sm": 24,
            "md": 24,
            "xl": 24
          },
          "formItemLayout": {
            "labelCol": {
              "xs": { "span": 3 },
              "sm": { "span": 3 }
            },
            "wrapperCol": {
              "xs": { "span": 21 },
              "sm": { "span": 21 }
            }
          },
          "rules": [
            {
              "required": true,
              "message": "TextArea is required"
            }
          ],
          "ctrlProps": {
            "readOnly": false
          }
        },
        {
          "type": "submit",
          "formItemLayout": {
            "wrapperCol": {
              "xs": { "span": 6, "offset": 15 },
              "sm": { "span": 6, "offset": 15 },
              "md": { "span": 6, "offset": 15 },
              "lg": { "span": 6, "offset": 15 }
            }
          },
          "btnProps": {
            "label": "提交"
          },
          "ctrlProps": {
            "readOnly": false
          }
        }
      ],
      "initValues": [
        { "attrId": "name", "attrValue": "Curry" },
        { "attrId": "age", "attrValue": 28 },
        { "attrId": "password", "attrValue": "password" },
        { "attrId": "number", "attrValue": 2 },
        { "attrId": "treeSelect", "attrValue": "0-0-2" },
        { "attrId": "multiTreeSelect", "attrValue": "0-0-2" },
        { "attrId": "treeCheckable", "attrValue": "0-0-2" },
        { "attrId": "treeSelectSearch", "attrValue": "0-0-2"},
        { "attrId": "radioGroup", "attrValue": "Lin" },
        { "attrId": "radioButton", "attrValue": "Kelery" },
        { "attrId": "checkbox", "attrValue": ["Curry"] },
        { "attrId": "allStar", "attrValue": "James" },
        { "attrId": "datetimepicker", "attrValue": "2019-06-13 15:06:27" },
        { "attrId": "timePicker", "attrValue": "15:06:27" },
        { "attrId": "datepicker", "attrValue": "2019-06-13" },
        { "attrId": "url", "attrValue": "baidu" },
        { "attrId": "slider", "attrValue": 30 },
        { "attrId": "hidden", "attrValue": "hidden-value" },
        { "attrId": "rate", "attrValue": 3.5 },
        { "attrId": "prefix", "attrValue": "Ftp://" },
        { "attrId": "suffix", "attrValue": ".org" },
        { "attrId": "textArea", "attrValue": "this is textArea"},
        { "attrId": "email", "attrValue": "iwhalecloud@163.com"},
        { "attrId": "sex", "attrValue": "L"},
        { "attrId": "fruit", "attrValue": "banana"},
        { "attrId": "dateRangePicker", "attrValue": ["2019-06-11 13:06:27", "2019-06-13 16:06:27"]}
      ],
      "onChange": this.handleFormChange,
    };

    return (
      <DynamicAttribute
        {...dynamicProps}
        wrappedComponentRef={ref => {
          this.formRef = ref;
        }}
      />
    )
  }
}
ReactDOM.render(<Demo />, _mount_);
```
<!--DemoEnd-->

## API

### DynamicAttribute

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| formProps | 表单属性,具体配置见下 | object | - |
| layout | 需要展示的表单控件属性的数组,数组里每个对象的具体参数见下 | array | - |
| initValues | 表单控件的展示值，数组里每个对象的具体参数见下 | array | - |

### formProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| hideRequiredMark | 隐藏所有表单项的必选标记 | Boolean | false |
| labelAlign | `label` 标签的文本对齐方式 | 'left'\'right' | 'right' |
| layout | 表单布局 | 'horizontal'\'vertical'\'inline' | 'horizontal' |
| formItemLayout | 表单控件`lable`和`formItem`的布局 | object | {labelCol: {span: 7}, wrapperCol: {span: 17}} |
| colLayout | 栅格模式下，包裹在表单控件外部`Col`组件的布局,默认一行排列一个 | object | { xs: 24, sm: 24, md: 24, xl: 24 } |
| onSubmit | 数据验证成功后回调事件,该方法会将 `form` 传给父组件 | Function(form) |  |

### layout(item)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 表单控件的`name` | string |  |
| label | `label`标签的文本 | string |  |
| type | 表单控件类型,目前支持(`text`, `textarea`, `password`, `hidden`, `datetimepicker`, `dateRangePicker`, `timePicker`, `combobox`, `multiselect`, `number`, `popedit`, `treeSelect`, `file`, `radioGroup`, `radioButton`, `checkbox`, `combination`, `email`, `slider`, `rate`, `submit`, `divider`)22种类型 | string |  |
| data | 当控件类型为`select`、`multiSelect`、`radioGrou`、`checkbox`、`combobo`、`emai`、`slider`、`radioButton`时的option数组,他的具体格式见下 | array |  |
| bindctrl | 依赖的属性id(仅供`select`和`multiSelect`类型使用),过滤当前控件的下拉列表 | string |  |
| rules | 校验规则[同ant design校验规则](https://ant-design.gitee.io/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99)。特别的,当`rules`为`pattern`时,还需要指定`flag`参数,该值为`new RegExp(pattern, flag)`对象的第二个参数,可以为包含属性 `g`、`i` 和 `m`, 分别用于指定全局匹配、区分大小写的匹配和多行匹配,默认为`i` | array |  |
| ctrlProps | 表单控件额外属性 | object |  |

### data(item)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 属性名 | string |  |
| value | 属性值 | string |  |
| bindTo | 当且仅当`layout(item)`对象包含bindctrl属性时，该属性表示该条`option`对象依赖的`bindctrl`属性值；只有当它依赖的属性值 = `bindTo`，才可展示该条option | string |  |

### initValues(item)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| attrId | 属性名(对应`layout(item) id`) | string |  |
| attrValue | 属性值(对应`layout(item) value`) | string |  |

### onChange

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 触发`onChange`事件所对应的表单`id` | string |  |
| value | `onChange`回调函数的传参 | string |  |