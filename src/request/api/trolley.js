import { get, post } from '../http'

// 获取购物车
export function getTrolleyList(customerId) {
  return get("/trolley/list/"+customerId);
}

// 添加购物车
export function addTrolley(params) {
  return post("/trolley/addTrolley",params);
}

// 删除购物车
export function deleteTrolley(trolleyId) {
  return get("/trolley/delete/" + trolleyId);
}

// 清除购物车
export function clearTrolleyAll(customerId) {
  return get("/trolley/clearAll/"+customerId);
}

// 批量删除购物车
export function deleteTrolleyList(params) {
  return post("/trolley/deleteList",params);
}