/* eslint-disable */
import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import { Alert, Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = e => {
    e.preventDefault();
    const { type } = this.state;
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: {
            ...values,
            type,
          },
        });
      }
    });
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="login-box">
        <FormItem style={{ marginBottom: 16 }}>
          {getFieldDecorator('loginName', {
            rules: [
              {
                required: true,
                // type: 'string',
                // len: 8,
                message: formatMessage({ id: 'jobNumberHelp' }),
              },
            ],
          })(
            <Input
              prefix={
                <Icon
                  type="user"
                  style={{
                    color: 'rgba(0,0,0,.25)',
                  }}
                />
              }
              placeholder="admin"
            />
          )}
        </FormItem>
        <FormItem style={{ marginBottom: 16 }}>
          {getFieldDecorator('loginPwd', {
            rules: [
              {
                required: true,
                // min: 8,
                message: formatMessage({ id: 'passwordHelp' }),
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="123"
            />
          )}
        </FormItem>
        <FormItem>
          <a
            href="#"
            className="pull-right"
            onClick={e => {
              e.preventDefault();
            }}
          >
            忘记密码
          </a>
          <Checkbox>自动登录</Checkbox>
        </FormItem>
        <FormItem>
          <Button type="primary" block size="large" htmlType="submit" loading={submitting}>
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(LoginPage);
