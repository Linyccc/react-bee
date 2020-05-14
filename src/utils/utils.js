import moment from 'moment';
import React from 'react';
import nzh from 'nzh/cn';
import { parse, stringify } from 'qs';

const _storageMode = ['sessionStorage', 'localStorage'];

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  return nzh.toMoney(n);
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <span
          styles={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            lineHeight: 20,
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}

export function isAntdPro() {
  return window.location.hostname === 'preview.pro.ant.design';
}

/**
 * IE浏览器检测
 *
 * 返回值     值类型    值说明
 *    -1      Number    不是ie浏览器
 *    6       Number    ie版本<=6
 *    7       Number    ie7
 *    8       Number    ie8
 *    9       Number    ie9
 *   10       Number    ie10
 *   11       Number    ie11
 *  'edge'    String    ie的edge浏览器
 */
export function IEVersion() {
  const { userAgent } = navigator; // 取得浏览器的userAgent字符串
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
  const isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isIE) {
    const fIEVersion = userAgent.match(/MSIE (\d+)/)[1];
    if (fIEVersion === '7') {
      return 7;
    }
    if (fIEVersion === '8') {
      return 8;
    }
    if (fIEVersion === '9') {
      return 9;
    }
    if (fIEVersion === '10') {
      return 10;
    }
    return 6; // IE版本<=7
  }
  if (isEdge) {
    return 'edge'; // edge
  }
  if (isIE11) {
    return 11; // IE11
  }
  return -1; // 不是ie浏览器
}

const _fixPlaceholderForIE = function() {
  const isIE8 = IEVersion() === 8;
  const isIE9 = IEVersion() === 9;
  // fix html5 placeholder attribute for ie7 & ie8
  if (isIE8 || isIE9) {
    // ie8 & ie9
    // this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will be skipped(e.g: we need this for password fields)
    $(
      'input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)'
    ).each(function() {
      const input = $(this);

      if (input.val() === '' && input.attr('placeholder') !== '') {
        input.addClass('placeholder').val(input.attr('placeholder'));
      }

      input.focus(function() {
        if (input.val() === input.attr('placeholder')) {
          input.val('');
        }
      });

      input.blur(function() {
        if (input.val() === '' || input.val() === input.attr('placeholder')) {
          input.val(input.attr('placeholder'));
        }
      });
    });
  }
};

// Fix input placeholder issue for IE8 and IE9
export function fixPlaceholderForIE() {
  setTimeout(function() {
    _fixPlaceholderForIE();
  }, 600);
}

/**
 * 从 www.abc.com?id=1&name=Mr.Lin 字符串中提取 对应key的值
 * @ paramName {String}
 * @ searchString {String}
 */
export function getURLParameter(paramName, searchString) {
  const str = searchString.split('?')[1];
  let i;
  let val;
  const params = str.split('&');

  for (i = 0; i < params.length; i++) {
    val = params[i].split('=');
    if (val[0] === paramName) {
      return decodeURIComponent(val[1]);
    }
  }
  return null;
}

/**
 * 将URL中query部分(即?后面的)的参数转化为对象，重复的参数作为数组。
 * 如果？后面没有参数返回空对象{}
 *
 *  样例一：
 *  parseQuery('http:www.baidu.com/index?name=username&city=%E5%8C%97%E4%BA%AC&id=123&id=456#flag=66')
 *  输出：
 *  {
 *   name: 'username',
 *   city: '北京', // 中文需解码
 *   id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
 *  }
 *
 * 样例二：parseQuery('http://localhost:8000/#/demo/curd')  => {}
 *
 * @param {String} url
 */
export function parseQuery(url) {
  const result = {};
  const reg = /[?&]([^=&#]+)=([^&#]*)/g;
  const querys = url.match(reg);
  if (querys) {
    for (let i = 0; i < querys.length; i++) {
      const query = querys[i].split('=');
      const key = query[0].substr(1);
      const value = /^\d+$/.test(query[1]) ? parseFloat(query[1]) : decodeURIComponent(query[1]);
      if (result[key]) {
        result[key] = [].concat(result[key], value);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
}

/**
 * 获取视窗宽高
 * 关于视窗的各种尺寸可参考：
 * https://www.w3cplus.com/sites/default/files/blogs/2017/1707/vw-layout-4.png
 * @includeScollbar   {Boolean}  true为包含滚动条的宽度，false反之
 * @return            {Object}   返回一个包含width和height2个属性的对象。
 *                    width：浏览器视窗的宽度，height为窗口的高度
 */
export function getViewPort(includeScollbar) {
  const isInclude = includeScollbar || false;
  if (isInclude) {
    let e = window;
    let a = 'inner';
    if (!('innerWidth' in window)) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    return {
      width: e[`${a}Width`],
      height: e[`${a}Height`],
    };
  }
  const de = document.documentElement;
  const db = document.body;
  const viewW = de.clientWidth === 0 ? db.clientWidth : de.clientWidth;
  const viewH = de.clientHeight === 0 ? db.clientHeight : de.clientHeight;
  return {
    width: viewW,
    height: viewH,
  };
}

// "a=2&b=3&c=4" 序列化成 {a:2,b:3,c:4}
export function serialize(str) {
  // 修复 jquery.serialize() 会把空格转成'+'的坑
  const s = str.replace(/\+/g, ' ');
  const obj = {};
  const params = s.split('&');
  for (let i = 0; i < params.length; i++) {
    const val = params[i].split('=');
    // 多选的select，在jquery.serialize()的时候名称都是相同的，如右：rules=1&rules=3
    // 这个时候需要把值以数组的形式保存，如右：rules：[1,3]
    if (obj[val[0]]) {
      const arr = [];
      arr.push(obj[val[0]]); // 读取已存在的，保存到临时数组
      arr.push(unescape(val[1]));
      obj[val[0]] = arr;
    } else {
      obj[val[0]] = unescape(val[1]);
    }
  }
  return obj;
}

/**
 * 本地存储 - 存
 * @param {string} key 必填
 * @param {any} value 必填
 * @param {string} mode ' 非必填，默认是sessionStorage。'sessionStorage | localStorage'
 */
export function setItem(key, value, mode = 'sessionStorage') {
  if (_storageMode.indexOf(mode) !== -1) {
    if (value !== undefined) {
      window[mode].setItem(key, JSON.stringify(value));
    }
  }
}

/**
 * 本地存储 - 取
 * @param {string} key 必填
 * @param {string} mode  非必填，默认是sessionStorage。'sessionStorage | localStorage'
 */
export function getItem(key, mode = 'sessionStorage') {
  if (key !== undefined && key !== '' && _storageMode.indexOf(mode) !== -1) {
    return JSON.parse(window[mode].getItem(key));
  }
  return false;
}

/**
 * 本地存储 - 删
 * @param {string} key 必填
 * @param {string} mode  非必填，默认是sessionStorage。'sessionStorage | localStorage'
 */
export function removeItem(key, mode = 'sessionStorage') {
  if (_storageMode.indexOf(mode) !== -1) {
    if (key !== undefined) {
      window[mode].removeItem(key);
    }
  }
}
