import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.less';

function IPhone(props) {
  const [visible, setVisible] = useState(props.visible);
  const [size, setSize] = useState(props.size);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  useEffect(() => {
    setSize(props.size);
  }, [props.size]);

  return (
    <Modal
      visible={visible}
      destroyOnClose
      footer={null}
      onCancel={() => props.onCancel()}
      wrapClassName={classnames([styles.iphone, props.size === 'lg' && styles.lg])}
    >
      <div className={styles.device}>
        <div className={styles[`status-bar`]} />
        <div className={styles.window}>{props.children}</div>
        <div className={styles[`home-btn`]} />
      </div>
    </Modal>
  );
}

IPhone.defaultProps = {
  visible: false,
  size: 'default',
};

IPhone.propTypes = {
  visible: PropTypes.bool,
  size: PropTypes.oneOf(['lg', 'default']),
  children: PropTypes.node.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default IPhone;
