import { get, post } from '../http'

// 获取客户信息
export function getCustomerInfo(uid) {
  return get("/customer/"+uid);
}