import { queryRule } from '@/services/api';

export default {
  namespace: 'scene',

  state: {
    index: 0, // 表示当前场景的索引
    arr: [], // 用于保存当前场景的入参
  },

  effects: {
    *switch({ payload }, { call, put }) {
      yield call(queryRule, payload);
      yield put({
        type: 'saveScene',
        payload,
      });
    },
  },

  reducers: {
    saveScene(state, action) {
      const { arr } = state;
      arr[action.payload.index] = action.payload.data;
      return {
        ...state,
        scene: action.payload.index,
        arr,
      };
    },
  },
};
