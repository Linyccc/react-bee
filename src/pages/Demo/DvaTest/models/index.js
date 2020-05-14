import reject from 'lodash/reject';
import {queryData} from '../services/index';

export default {
  namespace: 'dvaTest',

  state: {
    list:[]
  },

  effects: {
    *getData({payload}, {call, put,select }) {
      const response = yield call(queryData,payload)
      if(response.resultCode === '0' ){
        yield put({
          type:'save',
          payload:response.resultData
        })
      }
    },
  },

  reducers: {
    save(state,{payload}){
      return {
        ...state,
        list:payload
      }
    },
    remove(state,{payload}){
      return {
        ...state,
        list: reject(state.list,{id:parseInt(payload,10)})
      }
    }
  },
};
