import React, { createElement } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import config from './typeConfig';
import styles from './index.less';

class Exception extends React.PureComponent {
  static defaultProps = {
    backText: '返回首页',
    redirect: '/',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      className,
      backText,
      linkElement = 'a',
      type,
      title,
      desc,
      img,
      actions,
      redirect,
      ...rest
    } = this.props;
    const pageType = type in config ? type : '404';
    const clsString = classNames(styles.exception, className);
    return (
      <div className={styles.exception}>
        <div className="middle-item">
          <b className="middle-item-hack" />
          <div className="middle-item-body">
            <div className="media-box" style={{ width: 860, margin: '0 auto' }}>
              <div className="media-left">
                <div
                  className={styles.img}
                  style={{ backgroundImage: `url(${img || config[pageType].img})` }}
                />
              </div>
              <div className={classNames('media-body', styles.content)}>
                <h1>{title || config[pageType].title}</h1>
                <div className={styles.desc}>{desc || config[pageType].desc}</div>
                <div className={styles.actions}>
                  {actions ||
                    createElement(
                      linkElement,
                      {
                        to: redirect,
                        href: redirect,
                      },
                      <Button type="primary" size="large">
                        {backText}
                      </Button>
                    )}
                </div>
                <div className="media-body-text-hack" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Exception;
