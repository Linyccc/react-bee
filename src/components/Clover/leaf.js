/* eslint-disable */
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './leaf.less';

class Leaf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
      type: 'type1',
      actived: false,
      ...this.props,
    };
  }

  toggleActive() {
    const flag = this.state.actived;
    this.setState({ actived: !flag });
  }

  render() {
    const { type, color, actived } = this.state;

    return (
      <div
        className={classNames(
          styles.base,
          styles[type],
          styles[color],
          actived ? styles.actived : ''
        )}
        onClick={e => {
          e.stopPropagation();
          this.props.dataPipe(this.state.color);
          this.toggleActive();
        }}
      >
        <div className="middle-item">
          <b className="middle-item-hack" />
          <div className="middle-item-body">{this.props.text}</div>
        </div>
      </div>
    );
  }
}

export default Leaf;
