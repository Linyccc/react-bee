/* eslint-disable */
import React, { Component, useState } from 'react';
import { Row, Col, Card, Button, Icon, Upload, Modal, message } from 'antd';
import SlickUpload from '@/components/SlickUpload/index';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import request from '@/utils/request';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 上传图片相关
      previewVisible: false,
      previewImage: '',
      listType: 'picture-card',
      disabled: false,
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          // thumbUrl: ''  //没有thumbUrl时取url的值做缩略图
        },
      ],
      loading: false,
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

  componentDidMount() {}

  render() {
    const { listType, fileList, disabled } = this.state;
    return (
      <Card title="缩略图不采用base64（为了兼容IE9）">
        <div>
          <p>
            <a href="#/demo/curd?id=123&scene=2">创建</a>
          </p>
          <p>
            附件上传：<small>JPG/PNG/GIF，不超过2个，小于2M </small>
          </p>
          <div className="margin-bottom">
            <Button.Group>
              <Button
                onClick={() => {
                  this.setState({ listType: 'text' });
                }}
              >
                text
              </Button>
              <Button
                onClick={() => {
                  this.setState({ listType: 'picture' });
                }}
              >
                picture
              </Button>
              <Button
                onClick={() => {
                  this.setState({ listType: 'picture-card' });
                }}
              >
                picture-card
              </Button>
            </Button.Group>

            <Button
              type="default"
              onClick={() => {
                console.log(this.refs.upload.getFileList());
              }}
            >
              获取FileList
            </Button>
          </div>
          <SlickUpload
            action="http://localhost:3000/upload-single"
            fileList={fileList}
            listType={listType}
            accept=".jpg,.png,.gif"
            ref="upload"
            size={1024 * 1024 * 2}
            length={2}
            disabled={disabled}
            onRemove={file => {
              return request('/api/delete', { data: file }).then(function(result) {
                console.log(result);
              });
            }}
          />
        </div>
      </Card>
    );
  }
}

export default Demo;
