import React, { useState, useEffect } from 'react';
import { Icon, Upload, Modal, message } from 'antd';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

function SlickUpload(props) {
  const [fileList, setFileList] = useState(props.fileList);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [count, setCount] = useState(props.fileList.length);
  const { accept, length, size } = props;

  const defaultProps = {
    action: '/upload-single',
    listType: 'picture-card',
    multiple: true,
    fileList,
  };

  const newProps = { ...defaultProps, ...props };

  useEffect(() => {
    setFileList(props.fileList);
  }, [props.fileList]);

  useEffect(() => {
    setFileList(fileList);
  }, [fileList]);

  useEffect(() => {
    // setFileList(props.fileList);
  }, [props.disabled]);

  return (
    <div>
      <Upload
        {...newProps}
        fileList={fileList}
        onSuccess={() => {
          return props.onSuccess && props.onSuccess();
        }}
        beforeUpload={file => {
          const ext = `.${file.name.substr(file.name.lastIndexOf('.') + 1)}`;
          const isValidFormat = accept.split(',').indexOf(ext) !== -1;
          const isSmall = file.size < size;
          const isValidLength = count <= length;

          if (!isValidFormat) {
            message.error('不支持的文件格式！');
          }

          if (!isSmall) {
            message.error('文件太大！');
          }

          if (!isValidLength) {
            message.error('已上传文件数量已超过允许的最大个数！');
          }

          if (isValidLength && isValidFormat && isSmall) {
            setCount(count + 1); // 已上传的文件个数（不包含初始化时的fileList）
          }
          return isValidLength && isValidFormat && isSmall;
        }}
        onPreview={file => {
          setPreviewImage(find(fileList, { uid: file.uid }).url);
          setPreviewVisible(true);
        }}
        onChange={({ file, fileList }) => {
          const targetIndex = findIndex(fileList, { uid: file.uid });

          // 不是图片格式，禁止给thumbUrl和url的赋值，这样预览按钮就会自动禁用
          if (file.status === 'done') {
            const { url, thumbUrl } = file.response.resultData[0];
            fileList[targetIndex].thumbUrl = thumbUrl;
            fileList[targetIndex].url = url;
            console.log(fileList);
          }

          if (file.status === 'error') {
            fileList.pop();
            message.error('文件上传接口，服务异常！');
          }

          if (file.status === 'removed') {
            // eslint-disable-next-line no-unused-expressions
            props.onDelete && props.onDelete(file);
            setCount(count - 1);
          }

          // beforeUpload 返回 false
          if (file.status === undefined) {
            fileList.pop();
          }
          setFileList(fileList);
        }}
      >
        {count >= length ? null : (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        )}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img alt="example" style={{ width: '100%', padding: 16 }} src={previewImage} />
      </Modal>
    </div>
  );
}

SlickUpload.defaultProps = {
  fileList: [],
  length: 999,
  size: 1024 * 1024 * 1024,
  listType: 'picture-card',
  accept:
    '.png,.jpeg,.gif,.bmp,.txt,.doc,.docx,.xls,.xlsx,.pdf,.ppt,.ogg,.mp4,.mp4,.mpg,.rm,.rmvb,.wmv,.mov,.mkv,.flv,.avi,.rar,.zip',
  disabled: false,
};

SlickUpload.propTypes = {
  action: PropTypes.string.isRequired,
  fileList: PropTypes.array,
  length: PropTypes.number,
  size: PropTypes.number,
  listType: PropTypes.oneOf(['text', 'picture', 'picture-card']),
  accept: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SlickUpload;
