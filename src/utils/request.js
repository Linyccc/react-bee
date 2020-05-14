import { notification } from 'antd';
import hash from 'hash.js';
import { getLocale } from 'umi/locale';
import defaultSettings from '@/defaultSettings';

let startTimer;

// 计数器,保证任意多个ajax请求页面上只有一个全局遮罩
let active = 0;

// 错误编码翻译表
const codeMessage = {
  0: '请求超时',
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 超过2秒再显示loading
const latencyThreshold = 2000;

// $.ajax默认配置
const defaultOptions = {
  dataType: 'json',
  method: 'post',
  contentType: 'application/json; charset=UTF-8',
  timeout: defaultSettings.timeout,
  showMask: false,
  showError: true,
};

// $.blockUI 默认配置
const maskOptions = {
  blockMsgClass: 'blocking',
  message: '加载中...',
  css: {
    border: 'none',
    padding: '5px 5px 5px 25px',
    left: '50%',
    top: '50%',
    marginLeft: '-60px',
    marginTop: '-18px',
    backgroundColor: '#646464',
    width: '120px',
    fontSize: '16px',
    color: '#fff',
  },
  overlayCSS: {
    opacity: 0.5,
  },
};

// 保存数据到sessionStorage
const cachedSave = (response, hashCode) => {
  sessionStorage.setItem(hashCode, JSON.stringify(response));
  sessionStorage.setItem(`${hashCode}:timestamp`, Date.now());
};

// 校验options中是否存在expiry且为有效值(即>0的数字)
const validExpiry = expiry => {
  const val = parseInt(expiry, 10);
  return !!(val && val !== 0);
};

/**
 * 基于$.ajax的二次封装，封装内容如下：
 *
 * 1、基于约定的回参格式，当resultCode="0"表示resultObject值按约定返回;
 * 其他值均表示错误。此时如果resultMsg有值，那么向用户呈现消息且不进行后续业务操作，否则返回全部数据
 * {
 *   resultCode:"0",
 *   resultMsg:"成功返归约定数据",
 *   resultObject:{}
 * }
 *
 * 2、options中扩展了3个属性，居然描述如下
 *
 * @param {String} url [必填]请求地址
 * @param {Object} options [选填] 与jquery.ajax的[settings](http://www.css88.com/jqapi-1.9/jQuery.ajax/)用法一致
 *                 同时扩展了3个属性
 *                 [options.showMask=false] 是否采用遮罩, 为true时, 使用全局遮罩; 为jQuery对象时, 使用该对象的局部遮罩
 *                 [options.showError=true] 是否采用默认的错误提示。在resultCode非0时,自动提示resultMsg的信息
 *                 [options.expiry=1000*60] 缓存请求结果多少毫秒，单位毫秒
 * @return {Object} 返回原生ajax对象,支持promise等方式调用
 */
function request(url, options = {}) {
  let hashCode;
  const deferred = $.Deferred();
  // 合并options
  const combined = $.extend({}, defaultOptions, options, {
    url: /^http(s)?:\/\//.test(url) ? url : window.API_HOST + url,
    headers: {
      language: getLocale(),
    },
  });
  const { method, showMask, data = {}, expiry, beforeSend, complete, error, success } = combined;

  // 针对post请求
  if (method.toLocaleLowerCase() === 'post' && Object.keys(data).length > 0) {
    $.extend(combined, { data: JSON.stringify(data) });
  }

  // 1、是否配置了有效的options.expiry，如果'有',则进一步判断
  // 2、如果sessionStorage中有值且没过期，直接返回sessionStorage中缓存的值
  // 3、如果有值但已过期，则从sessionStorage删除缓存
  if (validExpiry(expiry)) {
    // 标记构成
    const fingerprint =
      method + url + getLocale() + (Object.keys(data).length > 0 ? JSON.stringify(data) : '');
    // 生成唯一的hash
    hashCode = hash
      .sha256()
      .update(fingerprint)
      .digest('hex');
    const cached = sessionStorage.getItem(hashCode);
    const whenCached = sessionStorage.getItem(`${hashCode}:timestamp`);

    // 存在缓存
    if (cached !== null && whenCached !== null) {
      const age = Date.now() - whenCached;
      // 没过期
      if (age < parseInt(expiry, 10)) {
        return deferred.resolve(JSON.parse(cached));
      }
      // 过期删除
      sessionStorage.removeItem(hashCode);
      sessionStorage.removeItem(`${hashCode}:timestamp`);
    }
  }

  const defaultBeforeSend = function() {
    if (showMask && $.blockUI) {
      if ($.fn.blockUI && showMask instanceof $) {
        showMask.blockUI();
      } else if (active++ === 0) {
        if (latencyThreshold > 0) {
          $.blockUI(maskOptions);
          startTimer = setTimeout(function() {
            $('.blockUI.blocking').removeClass('blocking');
          }, latencyThreshold);
        } else {
          $.blockUI(maskOptions);
        }
      }
    }
  };

  const defaultComplete = function() {
    if (showMask && $.unblockUI) {
      if ($.fn.unblockUI && showMask instanceof $) {
        showMask.unblockUI();
      } else if (--active === 0) {
        if (latencyThreshold > 0) {
          clearTimeout(startTimer);
        }
        $.unblockUI();
      }
    }
  };

  const defaultError = function(jqXHR) {
    const errortext = codeMessage[jqXHR.status] || jqXHR.statusText;
    notification.error({
      message: `[${jqXHR.status}]错误：${url}`,
      description: errortext,
      placement: 'bottomRight',
    });
    deferred.reject();
  };

  const defaultSuccess = function(data) {
    // '0' 表示resultObject有按约定的返回，
    // 其它值,表示错误代码(自定义的，如：'sessionTimeOut','beenKickedFromLogin'等)
    if (`${data.resultCode}` === '0') {
      // 正常返回数据的情况
      deferred.resolve(data);
      // 需要缓存且只会缓存json格式的数据
      if (validExpiry(expiry) && combined.dataType.toLocaleLowerCase() === 'json') {
        cachedSave(data, hashCode);
      }
    } else if (data.resultMsg) {
      if (combined.showError) {
        // 如果服务器返回了消息，那么向用户呈现消息
        notification.error({
          message: '服务器返回错误消息',
          description: data.resultMsg,
          placement: 'bottomRight',
        });
      }
      // resolve(null)，表示不需要后续进行业务处理
      deferred.resolve(data);
    } else {
      // 如果服务器没返回消息，那么把 data 丢给外面的业务处理
      deferred.reject(data);
    }
  };

  combined.beforeSend = $.isFunction(beforeSend)
    ? [defaultBeforeSend, beforeSend]
    : defaultBeforeSend;
  combined.complete = $.isFunction(complete) ? [defaultComplete, complete] : defaultComplete;
  combined.error = $.isFunction(error) ? [defaultError, error] : defaultError;
  combined.success = $.isFunction(success) ? [defaultSuccess, success] : defaultSuccess;

  $.ajax(combined);

  return deferred.promise();
}

export default request;
