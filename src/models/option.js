import {doList,buyLong,buyShort,kLine} from '../services/api_option';
import {message} from 'antd';

export default {
  namespace: 'option',

  state: {
    list:[],
    count:0,
    data:{},
    ts:0,
  },

  effects: {
    *getPage({payload}, { call, put }) {
      const response=yield call(doList,payload);
      console.log(response);
      yield put({
        type:"putList",
        payload:response,
      });
    },
    *buyLong({payload}, { call }) {
      const response=yield call(buyLong,payload);
      message.info(response);
    },
    *buyShort({payload}, { call }) {
      const response=yield call(buyShort,payload);
      message.info(response);
    },
    *getKLine(_,{call,put}){
      const response=yield call(kLine);
      yield put({
        type:"putKLine",
        payload:response,
      });
    },
  },

  reducers: {
    putList(state, { payload }) {
      return {
        ...state,
        list:payload.list||[],
        count:payload.count||0,
      };
    },
    putKLine(state,{payload}){
      return {
        ...state,
        data:payload.data||[],
        ts:payload.ts,
      }
    },
  },
};
