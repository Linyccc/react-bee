import React, { PureComponent, Fragment } from 'react';
import { Input, Icon, Modal } from 'antd';
import PropTypes from 'prop-types';

class PopEdit extends PureComponent {
  static propTypes = {
    inputProps: PropTypes.object,
    formProps: PropTypes.object,
    modalProps: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  onOpen = () => {
    this.setState({
      isVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      isVisible: false,
    });
  };

  handleOk = () => {
    const {
      modalProps: { onOk },
    } = this.props;
    onOk();
    this.setState({
      isVisible: false,
    });
  };

  renderInput = () => {
    const { formProps, inputProps } = this.props;
    const inputRender = (
      <Input {...inputProps} suffix={<Icon type="select" onClick={this.onOpen} />} />
    );
    if (Object.keys(formProps).length > 0) {
      const { getFieldDecorator, id, options } = formProps;
      return getFieldDecorator(id, {
        ...options,
      })(inputRender);
    }
    return inputRender;
  };

  render() {
    const { modalProps } = this.props;
    const { isVisible } = this.state;
    const modalNewProps = {
      ...modalProps,
      onCancel: this.handleCancel,
    };
    Object.keys(modalProps).forEach(key => {
      if (key !== 'render') modalNewProps[key] = modalProps[key];
    });
    return (
      <Fragment>
        {this.renderInput()}
        {isVisible && (
          <Modal visible {...modalNewProps} onOk={() => this.handleOk()}>
            {modalProps.render()}
          </Modal>
        )}
      </Fragment>
    );
  }
}

PopEdit.defaultProps = {
  modalProps: {
    title: 'Title',
    visible: true,
  },
  formProps: {},
  inputProps: {},
};

PopEdit.propTypes = {
  modalProps: PropTypes.shape({
    onOk: PropTypes.func,
    render: PropTypes.func,
    title: PropTypes.string,
    visible: PropTypes.bool,
  }),
  formProps: PropTypes.shape({
    getFieldDecorator: PropTypes.any,
    id: PropTypes.string,
    options: PropTypes.object,
  }),
  inputProps: PropTypes.object,
};

export default PopEdit;
