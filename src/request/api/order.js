import { get, post } from '../http'

// 获取订单列表数据
export function getOrderList(customerId) {
  return get("/order/getOrderList/"+customerId);
}

// 获取订单商品列表数据
export function getOrderGoodsList(orderId) {
  return get("/order/getOrderGoodsList/"+orderId);
}

// 根据订单ID获取订单信息
export function getOrderInfoById(orderId) {
  return get("/order/getOrderInfo/" + orderId);
}

// 创建订单
export function createOrder(params) {
  return post("/order/createOrder",params);
}


// 添加订单商品
export function addOrderGoods(params) {
  // orderId  goodsId  goodsAmount
  return post("/order/addOrderGoods", params);
}

// 按照订单id删除
export function deleteOrderById(orderId) {
  return get("/order/deleteOrder/"+orderId);
}