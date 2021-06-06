<template>
  <div>
    <div class="search-box">
      <input type="text" class="search-input" placeholder="这里可以搜索你喜欢的商品噢~" />
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
    <!-- 公告图 -->
    <!-- <div class="carousel-box"></div> -->
    <img class="notice-img" src="../../assets/svg/live.svg" alt="" />

    <!-- 菜单列表 -->
    <ul class="menu-list">
      <li v-for="menu in state.menuList" :key="menu.icon">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="menu.icon"></use>
        </svg>
        <span>{{ menu.name }}</span>
      </li>
    </ul>

    <!-- 店铺列表 -->
    <div class="shop-list-box">
      <!-- 标题 -->
      <div class="shop-list-title">
        <span><label>新店推荐</label></span>
        <span><label>更多</label></span>
      </div>
      <!-- 列表 -->
      <ul class="shop-list">
        <li
          v-for="shop in state.shopList"
          :key="shop.shopId"
          @click="goToCategory(shop.shopId, shop.shopName)"
        >
          <img :src="shopImgUrl + '/getShopLogo/' + shop.shopId" alt="" />
          <div>
            <img src="../../assets/logo.jpg" alt="" /><span>{{ shop.shopName }}</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 商品推荐 -->
    <div class="goods-recommend-box">
      <!-- 标题 -->
      <div class="goods-recommend-title">
        <span><label>美食推荐</label></span>
        <span><label>更多</label></span>
      </div>
      <!-- 商品列表 -->
      <ul class="goods-recommend-list">
        <li
          v-for="goods in state.goodsList"
          :key="goods.goodsId"
          @click="handleGoods(goods)"
        >
          <img :src="imgUrl + '/getGoodsPicture/' + goods.goodsId" alt="" />
          <span>{{ goods.goodsName }}</span>
          <div>
            <span>￥{{ goods.price }}</span>
            <span>评分:{{ goods.score }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 销量排行 -->
    <div class="sales-ranking">
      <div class="sales-ranking-title">
        <span>销量排行</span>
        <span>只显示前十</span>
        <a>倒序显示</a>
      </div>
      <!-- 列表 -->
      <ul class="sales-ranking-list">
        <li
          v-for="goods in state.rankingList"
          :key="goods.goodsId"
          @click="handleGoods(goods)"
        >
          <img :src="imgUrl + '/getGoodsPicture/' + goods.goodsId" alt="" />
          <div class="goods-info">
            <div>
              <label>{{ goods.goodsType }}</label>
              <span>{{ goods.goodsName + "(" + goods.shopName + ")" }}</span>
            </div>
            <div>
              <span>★{{ goods.score }}</span>
              <span>销量:{{ goods.salesVolume }}</span>
              <span>售价:￥{{ goods.price }}</span>
            </div>
            <!-- 描述 -->
            <p>{{ goods.goodsDescribe }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, inject, defineProps, defineEmit } from "vue";
import { useRouter } from "vue-router";
import { getShopList, getShopById, shopImgUrl } from "../../request/api/shop";
import { getListAllRecommend, getConsider, imgUrl } from "../../request/api/goods";
const router = useRouter();
// 注入应用实例的方法
const toast = inject("toast");
const showGoodsDetails = inject("showGoodsDetails");
// 响应式数据
const state = reactive({
  menuList: [
    { icon: "#icon-tuijian1", name: "新店推荐" },
    { icon: "#icon-meishi", name: "美食推荐" },
    { icon: "#icon-meishi1", name: "销量排行" },
  ],
  shopList: [],
  goodsList: [],
  rankingList: [
    {
      id: "1",
      img_url: "",
      name: "炒牛肉",
      type: "盖饭",
      shop_name: "南昌小吃店",
      sales: "300",
      price: "14",
      score: "4",
      describe: "下饭又美味",
    },
  ],
});
onMounted(() => {});
// 加载店铺列表
getShopList().then((res) => {
  // console.log(res);
  state.shopList = res.data.shopList;
});
// 加载推荐商品
getListAllRecommend().then((res) => {
  // console.log(res.data.goodsList);
  state.goodsList = res.data.goodsList;
});
// 加载销量排行
getConsider().then((res) => {
  console.log(res);
  state.rankingList = res.data.goodsList;
});
// 点击商品
function handleGoods(goods) {
  showGoodsDetails({ goods });
}
// 点击店铺
function goToCategory(shopId, shopName) {
  console.log("触发了shopId:", shopId);
  router.push({
    path: "/app/shopList/category",
    query: {
      shopId: shopId,
      shopName: shopName,
    },
  });
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
