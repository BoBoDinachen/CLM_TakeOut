import { get, post } from '../http';
export const shopImgUrl = "http://172.21.231.28:8080/app/shop";

export function getShopList() {
  return get("/shop/getShopList");
}

export function getShopById(shopId) {
  return get("/shop/getShopById/" + shopId);
}
