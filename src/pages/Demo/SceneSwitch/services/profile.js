import request from '@/utils/request';

export async function queryBasicProfile() {
  return request('/api/profile/basic', { method: 'get' });
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced', { method: 'get' });
}

export async function queryMaps() {
  return request('/scene/queryMaps', { method: 'get' });
}

export async function queryTaskList(params) {
  return request('/scene/queryTaskList', { data: params });
}
