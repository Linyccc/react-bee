import React, { Component } from 'react';
import { Icon, Upload, Modal, message, Button } from 'antd';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import remove from 'lodash/remove';
import findIndex from 'lodash/findIndex';

class SlickUpload extends Component {
  constructor(props) {
    super(props);

    const { fileList } = props;
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList,
      prevPropsFileList: fileList,
    };
    this.count = fileList.length;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // props.fileList 有更新
    if (!isEqual(nextProps.fileList, prevState.prevPropsFileList)) {
      return {
        ...prevState,
        fileList: nextProps.fileList,
        prevPropsFileList: nextProps.fileList,
      };
    }
    // 返回 null 表示不更新，此函数最后一定需要返回值
    return null;
  }

  getFileList = () => {
    return this.state.fileList;
  };

  renderButton = () => {
    if (this.props.listType === 'picture-card') {
      return (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">上传</div>
        </div>
      );
    }
    return (
      <Button>
        <Icon type="plus" />
        上传
      </Button>
    );
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const defaultProps = {
      action: '/upload-single',
      listType: 'picture-card',
      multiple: false,
      fileList,
    };

    const newProps = { ...defaultProps, ...this.props };
    const { accept, length, size, onRemove, listType } = newProps;
    return (
      <div className="clearfix">
        <Upload
          {...newProps}
          fileList={fileList}
          onRemove={file => {
            return onRemove(file);
          }}
          beforeUpload={file => {
            const ext = `.${file.name.substr(file.name.lastIndexOf('.') + 1)}`;
            const isValidFormat =
              accept
                .split(',')
                .map(val => val.trim())
                .indexOf(ext) !== -1;
            // IE9 不做size判断
            const isSmall = file.size === undefined ? true : file.size < size;
            const isValidLength = this.count + 1 <= length;
            if (!isValidFormat) {
              message.error('不支持的文件格式！');
              return false;
            }

            if (!isSmall) {
              message.error('文件太大！');
              return false;
            }

            if (!isValidLength) {
              message.error('已上传文件数量已超过允许的最大个数！');
              return false;
            }

            this.count += 1; // 已上传的文件个数（不包含初始化时的fileList）

            return true;
          }}
          onPreview={
            listType === 'picture-card'
              ? file => {
                  this.setState({
                    previewImage: find(fileList, { uid: file.uid }).url,
                    previewVisible: true,
                  });
                }
              : null
          }
          onChange={({ file, fileList }) => {
            const targetIndex = findIndex(fileList, { uid: file.uid });

            if (file.status === 'done') {
              const { url, thumbUrl } = file.response.resultData;
              const isImage = /^image\//.test(file.type);

              // 附件下载链接
              fileList[targetIndex].url = url;

              // 如果不是图片，且是 'picture-card' 模式，禁止给thumbUrl和url的赋值，这样预览按钮就会自动禁用
              if (isImage) {
                fileList[targetIndex].thumbUrl = thumbUrl || '';
              } else if (listType === 'picture-card') {
                fileList[targetIndex].url = '';
              }
            }

            if (file.status === 'error') {
              remove(fileList, item => item.uid === file.uid);
              this.count -= 1;
              message.error('文件上传接口，服务异常！');
            }

            if (file.status === 'removed') {
              this.count -= 1;
            }

            // beforeUpload 返回 false
            if (file.status === undefined) {
              remove(fileList, item => item.uid === file.uid);
            }

            this.setState({ fileList });
          }}
        >
          {this.count >= length ? null : this.renderButton()}
        </Upload>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={() => this.setState({ previewVisible: false })}
        >
          <img alt="example" style={{ width: '100%', padding: 16 }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

SlickUpload.defaultProps = {
  fileList: [],
  length: 999,
  size: 1024 * 1024 * 1024,
  listType: 'picture-card',
  accept:
    '.png,.jpg,.jpeg,.gif,.bmp,.txt,.doc,.docx,.xls,.xlsx,.pdf,.ppt,.ogg,.mp4,.mp4,.mpg,.rm,.rmvb,.wmv,.mov,.mkv,.flv,.avi,.rar,.zip',
};

SlickUpload.propTypes = {
  action: PropTypes.string.isRequired,
  fileList: PropTypes.array,
  length: PropTypes.number,
  size: PropTypes.number,
  listType: PropTypes.oneOf(['text', 'picture', 'picture-card']),
  accept: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
};

export default SlickUpload;
