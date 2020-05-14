/* eslint-disable */
import React, { Component } from 'react';
import Leaf from './leaf';
import styles from './clover.less';

class Clover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 400,
      ...this.props,
    };
  }

  render() {
    const { size } = this.state;
    return (
      <div className={styles.clover} style={{ width: size, height: size }}>
        <Leaf text={this.props.text[0]} type="type1" color="red" />
        <Leaf text={this.props.text[1]} type="type2" color="yellow" />
        <Leaf text={this.props.text[2]} type="type2" color="green" />
        <Leaf text={this.props.text[3]} type="type1" color="blue" />
      </div>
    );
  }
}

export default Clover;
