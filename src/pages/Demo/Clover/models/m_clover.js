/* eslint-disable */
import {
  queryAll,
  queryLeaf1,
  queryLeaf2,
  queryLeaf3,
  queryLeaf4,
  queryMenuInSeries,
} from '../services/s_clover';

export default {
  namespace: 'm_clover',

  state: {
    menu: ['组件', '动画', 'dva', '通信'],
    currentBgColor: 'default',
  },

  effects: {
    *queryMenu({ payload }, { call, put }) {
      try {
        // 串行 : 按顺序发4个请求，下一个请求的入参是上一个的回参
        // const resp1 = yield call(queryLeaf1, payload);
        // const resp2 = yield call(queryLeaf2, { name: resp1.resultObject[0] });
        // const resp3 = yield call(queryLeaf3, { name: resp2.resultObject[0] });
        // const resp4 = yield call(queryLeaf4, { name: resp3.resultObject[0] });
        // yield put({
        //   type: 'saveMenu',
        //   payload: [
        //     ...resp1.resultObject,
        //     ...resp2.resultObject,
        //     ...resp3.resultObject,
        //     ...resp4.resultObject,
        //   ],
        // });

        // 并行：同时发4个请求
        // const [resp1, resp2, resp3, resp4]  = yield [
        //   call(queryLeaf1, payload),
        //   call(queryLeaf2, payload),
        //   call(queryLeaf3, payload),
        //   call(queryLeaf4, payload)
        // ]
        // yield put({
        //   type: 'saveMenu',
        //   payload: [...resp1.resultObject,...resp2.resultObject,...resp3.resultObject,...resp4.resultObject],
        // });

        // 并行 + 串行：两条并行线，其中一条包含2个串行请求
        const [resp, resp3, resp4] = yield [
          call(queryMenuInSeries, payload),
          call(queryLeaf3, payload),
          call(queryLeaf4, payload),
        ];

        yield put({
          type: 'saveMenu',
          payload: [...resp.resultObject, ...resp3.resultObject, ...resp4.resultObject],
        });
      } catch (error) {}
    },
    *currentBgColor({ payload }, { call, put }) {
      yield put({
        type: 'saveColor',
        payload,
      });
    },
  },

  reducers: {
    saveMenu(state, action) {
      return {
        ...state,
        menu: action.payload,
      };
    },
    saveColor(state, action) {
      return {
        ...state,
        currentBgColor: action.payload,
      };
    },
  },
};
