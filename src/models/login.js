import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { doLogin,editEmail} from '../services/api_login';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    accounts:[],
    email:"",
    token:"",
    username:"",
  },

  effects: {
    *login({ payload }, { call, put }) {
      let response = yield call(doLogin, payload);
      console.log(response);
      if(response.error===undefined){
        response.currentAuthority="admin";
        response.status="ok";
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
    *editEmail({payload},{call,put}){
      console.log(payload);
      const response= yield call(editEmail,payload);
      console.log(response);
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        accounts:payload.accounts||[],
        email:payload.email||"",
        token:payload.token||"",
        username:payload.username||"",
      };
    },
  },
};
