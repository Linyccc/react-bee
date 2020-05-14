import React, { useEffect, useState, useReducer } from 'react';
import { Row, Col, Button } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap';
import { FlowContextMenu } from '../components/EditorContextMenu';
import { FlowToolbar } from '../components/EditorToolbar';
import { FlowItemPanel } from '../components/EditorItemPanel';
import { FlowDetailPanel } from '../components/EditorDetailPanel';
import styles from './style.less';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';

GGEditor.setTrackable(false);

class FlowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height:
        document.querySelectorAll('body')[0].clientHeight -
        document.querySelectorAll('.ant-layout-header')[0].clientHeight -
        44 -
        32 -
        45,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize, { passive: true });
  }

  @Bind()
  @Debounce(100)
  handleResize = () => {
    this.setState({
      height:
        document.querySelectorAll('body')[0].clientHeight -
        document.querySelectorAll('.ant-layout-header')[0].clientHeight -
        44 -
        32 -
        45,
    });
  };

  /**
   * handleSave保存当前Flow里画布的信息
   */
  handleSave = () => {
    console.log(this.flowRef.graph.save());
  };
  render() {
    const { height } = this.state;
    return (
      <GGEditor className={styles.editor}>
        <Row className={styles.editorHd}>
          <Col span={24}>
            <FlowToolbar handleSave={this.handleSave} />
          </Col>
        </Row>
        <Row>
          <Col span={4} className={styles.editorSidebar} style={{ height: `${height}px` }}>
            <FlowItemPanel />
          </Col>
          <Col span={16} style={{ height: `${height}px` }}>
            <Flow
              style={{ height: `${height}px` }}
              ref={ref => {
                this.flowRef = ref;
              }}
            />
          </Col>
          <Col span={4} className={styles.editorSidebar} style={{ height: `${height}px` }}>
            <FlowDetailPanel />
          </Col>
        </Row>
        <FlowContextMenu />
      </GGEditor>
    );
  }
}

export default FlowPage;
