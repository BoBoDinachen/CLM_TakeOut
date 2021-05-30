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
        <li v-for="shop in state.shopList" :key="shop.shopId">
          <img src="@image/炒牛肉.jpeg" alt="" />
          <div>
            <img src="../../assets/image/logo.jpg" alt="" /><span>{{
              shop.shopName
            }}</span>
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
        <li v-for="goods in state.goodsList" :key="goods.id" @click="handleGoods(goods)">
          <img src="@image/炒牛肉.jpeg" alt="" />
          <span>{{ goods.name }}</span>
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
          :key="goods.id"
          @click="handleGoods(goods)"
        >
          <img src="https://ali.xinshipu.cn/20180827/original/1535340097824.jpg" alt="" />
          <div class="goods-info">
            <div>
              <label>{{ goods.type }}</label>
              <span>{{ goods.name + "(" + goods.shop_name + ")" }}</span>
            </div>
            <div>
              <span>★{{ goods.score }}</span>
              <span>销量:{{ goods.sales }}</span>
              <span>售价:￥{{ goods.price }}</span>
            </div>
            <!-- 描述 -->
            <p>下饭又美味</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, inject, defineProps, defineEmit } from "vue";
import { useRouter } from "vue-router";
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
  shopList: [
    {
      shopId: "1",
      shopLog: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg",
      shopName: "好吃不火饭店",
    },
    {
      shopId: "2",
      shopLog: "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg",
      shopName: "吃得流泪饭店",
    },
    {
      shopId: "3",
      shopLog: "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg",
      shopName: "吃得流泪饭店",
    },
    {
      shopId: "4",
      shopLog: "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg",
      shopName: "吃得流泪饭店",
    },
    {
      shopId: "5",
      shopLog: "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg",
      shopName: "吃得流泪饭店",
    },
  ],
  goodsList: [
    { id: "1", goodsImgUrl: "", name: "炒牛肉", price: "14", score: 3 },
    {
      id: "2",
      goodsImgUrl: "",
      name: "炒牛肉",
      price: "14",
      score: 3,
    },
    { id: "3", goodsImgUrl: "", name: "炒牛肉", price: "14", score: 4 },
    { id: "4", goodsImgUrl: "", name: "炒牛肉", price: "14", score: 5 },
  ],
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
    {
      id: "2",
      img_url: "",
      name: "泡椒猪肝",
      type: "盖饭",
      shop_name: "南昌小吃店",
      sales: "255",
      price: "14",
      score: "4",
      describe: "下饭又美味",
    },
    {
      id: "3",
      img_url: "",
      name: "辣子鸡",
      type: "盖饭",
      shop_name: "南昌小吃店",
      sales: "567",
      price: "14",
      score: "4",
      describe: "下饭又美味",
    },
  ],
});
onMounted(() => {
  toast({
    text: "显示成功!",
    type: "success",
  });
});
// 点击商品
function handleGoods(goods) {
  showGoodsDetails({ goods });
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
