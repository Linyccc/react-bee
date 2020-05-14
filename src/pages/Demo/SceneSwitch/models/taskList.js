import { queryTaskList } from '../services/profile';

export default {
  namespace: 'taskList',

  state: {
    list: null,
    pagination: null,
  },

  effects: {
    *queryTaskList({ payload }, { call, put }) {
      const response = yield call(queryTaskList, payload);
      yield put({
        type: 'saveTaskList',
        payload: response.resultObject,
      });
    },
  },

  reducers: {
    saveTaskList(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
