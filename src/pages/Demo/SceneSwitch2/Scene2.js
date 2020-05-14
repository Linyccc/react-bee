import React, { Component } from 'react';
import { Card } from 'antd';

class Scene2 extends Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div style={{ marginBottom: 80 }}>
        <Card title="创建入库单">{this.props.mode}</Card>
      </div>
    );
  }
}

export default Scene2;
