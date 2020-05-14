export default {
  namespace: 'scene',

  state: {
    index: 0, // 表示当前场景的索引
    paramsArr: [], // 对象数组，用于保存传入每个场景的入参，可以在当前场景的this.props取到
  },

  effects: {},

  reducers: {
    saveScene(state, action) {
      const { paramsArr } = state;
      const { index, params } = action.payload;
      paramsArr[index] = params;
      return {
        ...state,
        index,
        paramsArr,
      };
    },
  },
};
