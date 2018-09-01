import request from '../utils/request';


export async function doLogin(params) {
  const {userName="",password=""}=params;
  return request(`/user?username=${userName}&password=${password}`);
}

