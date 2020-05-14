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
      <ToolbarButton command="copy" text="复制" />
      <ToolbarButton command="paste" text="粘贴" />
      <ToolbarButton command="delete" text="删除" />
      <Divider type="vertical" />
      <ToolbarButton command="zoomIn" icon="zoom-in" text="放大" />
      <ToolbarButton command="zoomOut" icon="zoom-out" text="缩小" />
      <ToolbarButton command="autoZoom" icon="fit-map" text="适应尺寸" />
      <ToolbarButton command="resetZoom" icon="actual-size" text="正常尺寸" />
      <Divider type="vertical" />
      <ToolbarButton command="toBack" icon="to-back" text="向后" />
      <ToolbarButton command="toFront" icon="to-front" text="向前" />
      <Divider type="vertical" />
      <ToolbarButton command="multiSelect" icon="multi-select" text="多选" />
      <ToolbarButton command="addGroup" icon="group" text="建组" />
      <ToolbarButton command="unGroup" icon="ungroup" text="撤组" />
      <Divider type="vertical" />
      {props.handleSave ? (
        <ToolsaveButton icon="save" text="保存" handleSave={props.handleSave} />
      ) : null}
    </Toolbar>
  );
};

export default FlowToolbar;
