import { message } from 'antd';
import { fakeSubmitForm, queryAreaType } from '@/services/api';

export default {
  namespace: 'form',

  state: {
    currentStep: 0,
    areaType: [],
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
  },

  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      // yield put(routerRedux.push('/form/step-form/result'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *queryAreaType({ payload }, { call, put }) {
      try {
        const response = yield call(queryAreaType, payload);
        yield put({
          type: 'saveAreaType',
          payload: response.resultObject,
        });
      } catch (error) {
        // yield put({ type: 'saveFunctionOperationLog', error });
      }
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
        currentStep: payload.currentStep,
      };
    },
    saveAreaType(state, action) {
      return {
        ...state,
        areaType: action.payload,
      };
    },
  },
};
