<template>
  <header>
    <span
      @click.native="goBack"
      v-if="title === '订单详情' || title === '提交订单' || title === '我的购物车'"
    >
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
    </span>
    <h2>{{ title }}</h2>
  </header>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
// 当前的标题
const title = ref("吃了吗外卖");
function goBack() {
  router.back();
}
watch(
  () => route.path,
  async (newPath) => {
    // console.log(newPath.split("/")[3]);
    // 根据不同路由写入title
    // 判断第二级路由
    switch (newPath.split("/")[2]) {
      case "home":
        title.value = "吃了吗外卖";
        break;
      case "shopList":
        title.value = "选择店铺";
        break;
      case "shoppingCart":
        title.value = "我的购物车";
        break;
      case "order":
        title.value = "我的订单";
        break;
      case "personal":
        title.value = "个人中心";
        break;
      default:
        title.value = "吃了吗外卖";
    }
    if (newPath.split("/")[3] !== undefined) {
      // 判断第三级路由
      switch (newPath.split("/")[3]) {
        case "settlement":
          title.value = "提交订单";
          break;
        case "category":
          title.value = "店铺商品";
          break;
        case "details":
          title.value = "订单详情";
          break;
        default:
          title.value = "吃了吗外卖";
      }
    }
  }
);
</script>

<style lang="scss" scoped>
header {
  z-index: 1000;
  background-color: #333333;
  color: white;
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  h2 {
    font-size: 1.2em;
    text-align: center;
    width: 100%;
  }
  span {
    display: inline-block;
    position: absolute;
    left: 10px;
    width: 20px;
    height: 20px;
  }
  .icon {
    // position: absolute;
    // left: 10px;
    width: 1.2em;
    height: 1.2em;
    font-weight: bold;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
