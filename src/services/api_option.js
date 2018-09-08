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

export async function buyLong(param) {
  console.log(param);
  const {position="LONG",optID="",numBet="",hacAddress="",token=""} =param;
  const headers={
    "Authorization":`Bearer ${token}`,
    "Content-Type":"application/json",
  };
  return request(`/trade/buy-option`,{
    headers,
    method:"POST",
    body:{position,optID,numBet,hacAddress},
  });
}

export async function buyShort(param) {
  console.log(param);
  const {position="SHORT",optID="",numBet="",hacAddress="",token=""} =param;
  const headers={
    "Authorization":`Bearer ${token}`,
    "Content-Type":"application/json",
  };
  return request(`/trade/buy-option`,{
    headers,
    method:"POST",
    body:{position,optID,numBet,hacAddress},
  });
}

export async function kLine(){
  return request(
    'http://18.191.191.239:3000/api');
}

