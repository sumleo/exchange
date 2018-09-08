import request from '../utils/request';


export async function doRegister(params) {
  const {username="",password="",email=""}=params;
  return request(`/user`,{
    method:"POST",
    body:{username,password,email},
  });
}

