import React, { Component } from 'react';
import { connect } from 'dva';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';

@connect(({ global }) => ({
  url: global.iframe,
}))
class IframeWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height:
        document.querySelectorAll('body')[0].clientHeight -
        document.querySelectorAll('.ant-layout-header')[0].clientHeight -
        44 -
        32,
    };
  }

  componentDidMount() {
    document.querySelectorAll('body')[0].style.overflow = 'hidden';

    window.addEventListener('resize', this.calcIframeHeight, { passive: true });
  }

  componentWillUnmount() {
    document.querySelectorAll('body')[0].style.overflow = 'auto';
    window.removeEventListener('resize', this.calcIframeHeight);
  }

  @Bind()
  @Debounce(100)
  calcIframeHeight() {
    const height =
      document.querySelectorAll('body')[0].clientHeight -
      document.querySelectorAll('.ant-layout-header')[0].clientHeight -
      44 -
      32;
    this.setState({ height });
  }

  render() {
    const { height } = this.state;
    const { route } = this.props;
    return (
      <>
        <iframe
          title="iframe"
          src={route.iframe}
          frameBorder="0"
          height={height}
          width="100%"
          style={{ backgroundColor: '#fff' }}
        />
      </>
    );
  }
}

export default IframeWrapper;
