import React, { Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import style from './Login.less';
import GlobalFooter from '@/components/GlobalFooter';
import BannerImage from './BannerImage';
import logo from './img/logo-200x200.png';

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2020 xxx前端技术部出品
  </Fragment>
);
class UserLayout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <DocumentTitle title={formatMessage({ id: 'app.title' })}>
        <div className={style.wrap}>
          <div className={style.container}>
            <div className={style.main}>
              <div className={style.picture}>
                <BannerImage />
              </div>
              <div className={style.form}>
                <div className={style.title}>
                  {/* <img src={logo} alt={formatMessage({ id: 'app.title' })} /> */}
                  <div>
                    <img src={logo} alt={formatMessage({ id: 'app.title' })} /> xxx 企业门户
                  </div>
                </div>
                <div className={style.panel}>
                  <div className={style.panelHead}>
                    <div className={style.panelTit}>登录</div>
                    <div className={style.panelSubtit}>使用员工工号登录</div>
                  </div>
                  <div className={style.panelBody}>{children}</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', width: '100%', textAlign: 'center', bottom: 0 }}>
            <GlobalFooter copyright={copyright} />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
