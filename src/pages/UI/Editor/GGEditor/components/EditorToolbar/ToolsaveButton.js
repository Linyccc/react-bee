import React from 'react';
import { Tooltip, Icon } from 'antd';
import IconFont from '../../common/IconFont';
import styles from './index.less';

const ToolsaveButton = props => {
  const { command, icon, text } = props;
  const handleSave = () => {
    props.handleSave();
  };
  return (
    <div className={styles.toolsave_button}>
      <Tooltip title={text} placement="bottom" overlayClassName={styles.tooltip}>
        <Icon type="save" onClick={handleSave} />
      </Tooltip>
    </div>
  );
};

export default ToolsaveButton;
