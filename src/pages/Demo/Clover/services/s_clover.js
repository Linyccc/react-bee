import request from '@/utils/request';

export async function queryAll(params) {
  return request('/demo/allLeafs', { data: params });
}

export async function queryLeaf1(params) {
  return request('/demo/leaf1', { data: params });
}

export async function queryLeaf2(params) {
  return request('/demo/leaf2', { data: params });
}

export async function queryLeaf3(params) {
  return request('/demo/leaf3', { data: params });
}

export async function queryLeaf4(params) {
  return request('/demo/leaf4', { data: params });
}

export async function queryMenuInSeries(params) {
  const res1 = await request('/demo/leaf1', { data: params });
  const res2 = await request('/demo/leaf2', { data: { arr: res1.resultObject[0] } });
  return { ...res2, resultObject: [...res1.resultObject, ...res2.resultObject] };
}
