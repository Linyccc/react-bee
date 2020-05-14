import request from '@/utils/request';

export async function queryUserLoginLog(params) {
  return request('/ulogserver/UserLoginLogController/queryUserLoginLog.do', { data: params });
}

export async function queryCountByTime(params) {
  return request('/ulogserver/UserLoginLogController/queryCountByTime.do', { data: params });
}

export async function queryUserClickLog(params) {
  return request('/ulogserver/UserClickLogController/queryUserClickLog.do', { data: params });
}

export async function queryExceptionLog(params) {
  return request('/ulogserver/ExceptionLogController/queryExceptionLog.do', { data: params });
}

export async function queryMenuClickData() {
  return request('/api/menuClickAnalysis');
}
