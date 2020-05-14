import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority, setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { setLocale } from 'umi/locale';
import { parseQuery, removeItem, setItem } from '@/utils/utils';
import request from '@/utils/request';
import Redirect from 'umi/redirect';

const Authority = getAuthority();
const Authorized = RenderAuthorized(Authority);
const { viewMode, loginApi, language } = parseQuery(window.location.href);

// 如果是单点登录，用token换取权限信息
if (viewMode === 'inner' && /^(https?):\/\/[^\s]+$/i.test(loginApi) && language) {
  removeItem('antd-pro-authority');
  removeItem('umi_locale', 'localStorage');
  request(loginApi, { async: false }).then(response => {
    if (response.resultCode === '0') {
      setAuthority(response.resultObject.currentAuthority);
      // 因为暂时只有中英文语言包
      if (['zh-CN', 'en-US'].indexOf(language) !== -1) {
        setItem('umi_locale', language, 'localStorage');
        setLocale(language);
      }
      reloadAuthorized();
    }
  });
}

export default ({ children }) => (
  <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/user/login" />}>
    {children}
  </Authorized>
);
