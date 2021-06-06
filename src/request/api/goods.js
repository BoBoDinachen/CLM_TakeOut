import { get, post } from '../http';
// 商品图片的服务器路径
export const imgUrl = "http://172.21.231.28:8080/app/goods"
// 按照类型查询
export function getGoodsListByType(shopId, type) {
  return get("/goods/getListByType/" + shopId + "/" + type);
}

// 查询店铺的推荐商品
export function getListByRecommend(shopId) {
  return get("/goods/getListByRecommend/" + shopId + "/" + 1);
}

// 所有商品的推荐
export function getListAllRecommend() {
  return get("/goods/getListAllRecommend");
}

// 商品销量排行
export function getConsider() {
  return get("/goods/getConsider");
}