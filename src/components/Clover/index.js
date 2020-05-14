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
    const { text, dataPipe } = this.props;
    return (
      <div className={styles.clover} style={{ width: size, height: size }}>
        <Leaf text={text[0]} type="type1" color="red" dataPipe={msg => dataPipe(msg)} />
        <Leaf text={text[1]} type="type2" color="yellow" dataPipe={msg => dataPipe(msg)} />
        <Leaf text={text[2]} type="type2" color="green" dataPipe={msg => dataPipe(msg)} />
        <Leaf text={text[3]} type="type1" color="blue" dataPipe={msg => dataPipe(msg)} />
      </div>
    );
  }
}

export default Clover;
