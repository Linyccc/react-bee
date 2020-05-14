import React, { useEffect, useState, useReducer } from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Mind } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap';
import { MindContextMenu } from '../components/EditorContextMenu';
import { MindToolbar } from '../components/EditorToolbar';
import { MindDetailPanel } from '../components/EditorDetailPanel';
import data from '../mock/worldCup2018.json';
import styles from '../Flow/style.less';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';

GGEditor.setTrackable(false);

class MindPage extends React.Component {
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
    console.log(this.mindRef.graph.save());
  };
  render() {
    const { height } = this.state;
    return (
      <GGEditor className={styles.editor}>
        <Row className={styles.editorHd}>
          <Col span={24}>
            <MindToolbar handleSave={this.handleSave} />
          </Col>
        </Row>
        <Row>
          <Col span={20} style={{ height: `${height}px` }}>
            <Mind
              data={data}
              style={{ height: `${height}px` }}
              ref={ref => {
                this.mindRef = ref;
              }}
            />
          </Col>
          <Col span={4} className={styles.editorSidebar} style={{ height: `${height}px` }}>
            <MindDetailPanel />
            {/* <EditorMinimap /> */}
          </Col>
        </Row>
        <MindContextMenu />
      </GGEditor>
    );
  }
}

export default MindPage;
