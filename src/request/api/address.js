import { get, post } from '../http'

export function selectAddress(params) {
  return post("/address/select",params);
}

export function getAddressList(uid) {
  return get("/address/getList/"+uid);
}

// 获取当前正在使用的地址
export function getCurrentAddress(uid) {
  return get("/address/getCurrentAddress/" + uid);
}