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

// 添加地址
export function insertAddress(params) {
  return post("/address/insertAddress",params);
}

// 删除地址
export function deleteAddress(addressId) {
  return get("/address/deleteAddress/" + addressId);
}