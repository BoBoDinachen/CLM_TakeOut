<template>
  <div class="details-box" :class="[state.isShow ? 'box-fade' : '']">
    <div class="details-content">
      <!-- 图标 -->
      <svg class="icon-close" aria-hidden="true" @click="handleColse">
        <use xlink:href="#icon-guanbi"></use>
      </svg>
      <svg
        class="icon-favorite"
        :class="[state.favoriteActive ? 'favorite-active' : '']"
        aria-hidden="true"
        @click="handleFavorite"
      >
        <use xlink:href="#icon-shoucang1"></use>
      </svg>
      <!-- 图片 -->
      <img
        :src="imgUrl + '/getGoodsPicture/' + state.goods.goodsId"
        alt=""
        class="food-img"
      />
      <!-- 下面的盒子 -->
      <div class="content-box">
        <!-- 商品名 -->
        <h2>
          {{ state.goods.goodsName + "  (" + state.goods.shopName + ")" }}
          <a @click="goToShop(state.goods.shopId, state.goods.shopName)">去店铺逛逛</a>
        </h2>
        <!-- 标签 -->
        <div class="tag">
          <span>{{ state.goods.goodsType }}</span>
          <span>评分:{{ state.goods.score }}</span>
          <span>销量:{{ state.goods.salesVolume }}</span>
        </div>
        <!-- 描述 -->
        <div class="describe">
          <label>商品描述</label>
          <p>{{ state.goods.goodsDescribe }}</p>
        </div>
        <!-- 口味选择 -->
        <div class="select">
          <label>选择您的口味</label>
          <ul>
            <li
              :class="[state.selectActive === 0 ? 'active-select' : '']"
              @click="() => (state.selectActive = 0)"
            >
              微辣
            </li>
            <li
              :class="[state.selectActive === 1 ? 'active-select' : '']"
              @click="() => (state.selectActive = 1)"
            >
              中辣
            </li>
            <li
              :class="[state.selectActive === 2 ? 'active-select' : '']"
              @click="() => (state.selectActive = 2)"
            >
              爆辣
            </li>
          </ul>
        </div>
        <!-- 价钱 -->
        <div class="total-price">
          <span>￥{{ state.goods.price * state.goodsAmount }}</span>
          <div>
            <span @click="subtractNumber">-</span>
            <span>{{ state.goodsAmount }}</span>
            <span @click="increNumber">+</span>
          </div>
        </div>
        <!-- 加入购物车 -->
        <button @click="joinShoppCart">加入购物车</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import toast from "@comps/Toast/index.js";
import { imgUrl } from "../../request/api/goods";
import { addTrolley } from "../../request/api/trolley";

const router = useRouter();
// 响应式数据
const state = reactive({
  isShow: false,
  goods: {}, // 商品信息
  goodsAmount: 1, // 商品数量
  selectActive: 0, // 0 、1、2 选择口味
  favoriteActive: false,
});
onMounted(() => {
  show();
});
// 显示盒子
function show() {
  state.isShow = true;
}
// 关闭盒子
function handleColse() {
  state.isShow = false;
}
// 去对应的店铺
function goToShop(shopId, shopName) {
  setTimeout(() => {
    router.push({
      path: "/app/shopList/category",
      query: {
        shopId: shopId,
        shopName: shopName,
      },
    });
    handleColse();
  }, 300);
}
// 点击收藏夹
function handleFavorite() {
  state.favoriteActive = !state.favoriteActive;
  // 打开消息提示框
  if (state.favoriteActive) {
    toast({
      text: "已加入收藏夹√",
      type: "success",
    });
  } else {
    toast({
      text: "已取消收藏",
      type: "warning",
    });
  }
}
// 增加数量
function increNumber() {
  if (state.goodsAmount++ >= 10) {
    state.goodsAmount = 10;
    toast({
      text: "数量不能超过十噢!",
      type: "warning",
    });
  }
}
// 减去数量
function subtractNumber() {
  if (state.goodsAmount-- <= 1) {
    state.goodsAmount = 1;
    toast({
      text: "数量不能少于一噢!",
      type: "warning",
    });
  }
}
// 加入购物车
function joinShoppCart() {
  const uid = sessionStorage["uid"];
  const token = localStorage["token"];
  // console.log("uid", uid);
  if (uid === undefined || token === "") {
    toast({
      text: "请先登录!",
      type: "warning",
    });
  } else {
    addTrolley({
      goodsId: state.goods.goodsId,
      customerId: uid,
      goodsAmount: state.goodsAmount,
    }).then((res) => {
      if (res.statusCode === "200") {
        toast({
          text: "已加入购物车√",
          type: "success",
        });
      } else {
        toast({
          text: "添加失败!",
          type: "error",
        });
      }
    });
    setTimeout(() => {
      handleColse();
    }, 500);
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
