import request from '../utils/request';


export async function doList(param) {
  const {token=""}=param;
  const headers={
    "Authorization":`Bearer ${token}`,
  };
  console.log(headers);
  return request(`/trade/options`,{
    headers,
    method:"GET",
  });
}

