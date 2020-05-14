/* eslint-disable import/prefer-default-export */
import request from '@/utils/request';

export async function queryData(params) {
  return request('/demo/dvaTest/queryData.do', {
    method: 'get',
    data: params,
  });
}
