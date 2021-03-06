import request from '../utils/request';


export async function doLogin(params) {
  const {userName="",password=""}=params;
  const headers={
    'Access-Control-Allow-Credentials': 'true',
  };
  return request(`/user?username=${userName}&password=${password}`,{
    headers,
  });
}

export async function editEmail(param) {
  const {newEmail="",token=""} =param;
  const headers={
    "Authorization":`Bearer ${token}`,
    "Content-Type":"application/json",
  };
  return request(`/userProfile`,{
    headers,
    method:"PUT",
    body:{newEmail},
  });
}

