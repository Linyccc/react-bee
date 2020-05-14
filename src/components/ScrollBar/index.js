import { Scrollbars } from 'react-custom-scrollbars';
import React, { Component } from 'react';
// import 'react-perfect-scrollbar/dist/css/styles.css'
// import './index.less'

class ScrollBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: '#6c7884',
      borderRadius: '3px',
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  render() {
    return (
      <Scrollbars
        {...this.props}
        renderThumbHorizontal={this.renderThumb}
        renderThumbVertical={this.renderThumb}
      />
    );
  }
}

export default ScrollBar;
