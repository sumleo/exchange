import {doList} from '../services/api_option';

export default {
  namespace: 'option',

  state: {
    list:[],
  },

  effects: {
    *getPage({payload}, { call, put }) {
      console.log(payload)
      const response=yield call(doList,payload);
      console.log(response);
      yield put({
        type:"putList",
        payload:response,
      });
    },
  },

  reducers: {
    putList(state, { payload }) {
      return {
        ...state,
        list:payload.list||[],
      };
    },
  },
};
