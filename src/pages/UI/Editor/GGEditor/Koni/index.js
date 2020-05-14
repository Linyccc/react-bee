import React, { useEffect, useState, useReducer } from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Koni } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap';
import { KoniContextMenu } from '../components/EditorContextMenu';
import { KoniToolbar } from '../components/EditorToolbar';
import { KoniItemPanel } from '../components/EditorItemPanel';
import { KoniDetailPanel } from '../components/EditorDetailPanel';
import KoniCustomNode from './shape/nodes/KoniCustomNode';
import styles from '../Flow/style.less';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';

GGEditor.setTrackable(false);

class KoniPage extends React.Component {
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

  handleSave = () => {
    console.log(this.koniRef.graph.save());
  };
  render() {
    const { height } = this.state;
    return (
      <GGEditor className={styles.editor}>
        <Row className={styles.editorHd}>
          <Col span={24}>
            <KoniToolbar handleSave={this.handleSave} />
          </Col>
        </Row>
        <Row>
          <Col span={4} className={styles.editorSidebar} style={{ height: `${height}px` }}>
            <KoniItemPanel />
          </Col>
          <Col span={16} style={{ height: `${height}px` }}>
            <Koni
              style={{ height: `${height}px` }}
              ref={ref => {
                this.koniRef = ref;
              }}
            />
          </Col>
          <Col span={4} className={styles.editorSidebar} style={{ height: `${height}px` }}>
            <KoniDetailPanel />
            {/* <EditorMinimap /> */}
          </Col>
        </Row>
        <KoniCustomNode />
        <KoniContextMenu />
      </GGEditor>
    );
  }
}

export default KoniPage;
