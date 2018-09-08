import request from '../utils/request';


export async function doList(param) {
  const {token=""}=param;
  const headers={
    "Authorization":`Bearer ${token}`,
  };
  const pageSize=20,page=1;
  return request(`/tx/option?pageSize=${pageSize}&page=${page}`,{
    headers,
    method:"GET",
  });
}

