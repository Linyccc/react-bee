import React, { useState, useEffect } from 'react';
import { Form, Table, Card, Input, Button, Divider, Popconfirm } from 'antd';
import classNames from 'classnames';
import { connect } from 'dva';
import styles from './index.less';

function DvaTest({ dispatch, list, loading, form: { getFieldDecorator, validateFields } }) {
  const [init, setInit] = useState(true);

  useEffect(() => {
    dispatch({
      type: 'dvaTest/getData',
      payload: '',
    }).then(() => {
      setInit(false);
    });
  }, [dispatch]);

  function onSearch() {
    validateFields((err, values) => {
      if (!err) {
        const { keyword } = values;
        dispatch({
          type: 'dvaTest/getData',
          payload: keyword,
        });
      }
    });
  }

  return (
    <Card loading={init}>
      <Form layout="inline" nSubmit={onSearch}>
        <Form.Item>
          {getFieldDecorator('keyword', {
            rules: [{ required: true, message: '请输入关键字' }],
          })(<Input placeholder="关键字" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" loading={loading} onClick={onSearch}>
            查询
          </Button>
        </Form.Item>
      </Form>
      <Table
        rowKey={record => record.id}
        dataSource={list}
        columns={[
          {
            title: '姓名',
            width: '30%',
            dataIndex: 'name',
          },
          {
            title: '年龄',
            width: '30%',
            dataIndex: 'age',
          },
          {
            title: '住址',
            width: '30%',
            dataIndex: 'address',
          },
          {
            title: '操作',
            key: 'action',
            width: '10%',
            render: (text, record) => {
              return (
                <Popconfirm
                  title="确定要删除吗"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => {
                    dispatch({
                      type: 'dvaTest/remove',
                      payload: record.id,
                    });
                  }}
                >
                  <a href="#">删除</a>
                </Popconfirm>
              );
            },
          },
        ]}
      />
    </Card>
  );
}

export default connect(({ dvaTest, loading }) => ({
  list: dvaTest.list,
  loading: loading.effects['dvaTest/getData'],
}))(Form.create()(DvaTest));
