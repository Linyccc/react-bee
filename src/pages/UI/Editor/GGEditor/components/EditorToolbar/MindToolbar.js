import React from 'react';
import { Divider } from 'antd';
import { Toolbar } from 'gg-editor';
import ToolbarButton from './ToolbarButton';
import ToolsaveButton from './ToolsaveButton';
import styles from './index.less';

const FlowToolbar = props => {
  return (
    <Toolbar className={styles.toolbar}>
      <ToolbarButton command="undo" text="撤销" />
      <ToolbarButton command="redo" text="重做" />
      <Divider type="vertical" />
      <ToolbarButton command="zoomIn" icon="zoom-in" text="放大" />
      <ToolbarButton command="zoomOut" icon="zoom-out" text="缩小" />
      <ToolbarButton command="autoZoom" icon="fit-map" text="适应尺寸" />
      <ToolbarButton command="resetZoom" icon="actual-size" text="正常尺寸" />
      <Divider type="vertical" />
      <ToolbarButton command="append" text="插入同级" />
      <ToolbarButton command="appendChild" icon="append-child" text="插入子级" />
      <Divider type="vertical" />
      <ToolbarButton command="collapse" text="折叠" />
      <ToolbarButton command="expand" text="展开" />
      <Divider type="vertical" />
      {props.handleSave ? (
        <ToolsaveButton icon="save" text="保存" handleSave={props.handleSave} />
      ) : null}
    </Toolbar>
  );
};

export default FlowToolbar;
