import {
  queryMenuClickData,
  queryUserLoginLog,
  queryCountByTime,
  queryUserClickLog,
  queryExceptionLog,
} from '@/services/log';

export default {
  namespace: 'log',

  state: {
    list: [],
  },

  effects: {
    *queryUserLoginLog({ payload }, { call, put }) {
      try {
        const response = yield call(queryUserLoginLog, payload);
        yield put({
          type: 'saveUserLoginLog',
          payload: response.resultObject,
        });
      } catch (error) {
        yield put({ type: 'saveUserLoginLog', error });
      }
    },
    *queryCountByTime({ payload }, { call, put }) {
      try {
        const response = yield call(queryCountByTime, payload);
        yield put({
          type: 'saveFunctionOperationLog',
          payload: response.resultObject,
        });
      } catch (error) {
        yield put({ type: 'saveFunctionOperationLog', error });
      }
    },
    *queryUserClickLog({ payload }, { call, put }) {
      try {
        const response = yield call(queryUserClickLog, payload);
        yield put({
          type: 'saveUserClickLog',
          payload: response.resultObject,
        });
      } catch (error) {
        yield put({ type: 'saveUserClickLog', error });
      }
    },
    *queryExceptionLog({ payload }, { call, put }) {
      try {
        const response = yield call(queryExceptionLog, payload);
        yield put({
          type: 'saveExceptionLog',
          payload: response.resultObject,
        });
      } catch (error) {
        yield put({ type: 'saveExceptionLog', error });
      }
    },
    *fetch(_, { call, put }) {
      const response = yield call(queryMenuClickData);
      yield put({
        type: 'save',
        payload: Array.isArray(response.resultObject) ? response.resultObject : [],
      });
    },
  },

  reducers: {
    saveUserLoginLog(state, action) {
      return {
        ...state,
        UserLoginLog: action.payload,
      };
    },
    saveFunctionOperationLog(state, action) {
      return {
        ...state,
        FunctionOperationLog: action.payload,
      };
    },
    saveUserClickLog(state, action) {
      return {
        ...state,
        UserClickLog: action.payload,
      };
    },
    saveExceptionLog(state, action) {
      return {
        ...state,
        ExceptionLog: action.payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
