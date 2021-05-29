<template>
  <header>
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
watch(
  () => route.path,
  async (newPath) => {
    // 根据不同路由写入title
    // 判断第二级路由
    switch (newPath.split("/")[2]) {
      case "home":
        title.value = "吃了吗外卖";
        break;
      case "category":
        title.value = "食品分类";
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
    // 判断第三级路由
    switch (newPath.split("/")[3]) {
      case "settlement":
        title.value = "提交订单";
        break;
      default:
        title.value = "吃了吗外卖";
    }
  }
);
</script>

<style lang="scss" scoped>
header {
  z-index: -1000;
  background-color: white;
  h2 {
    font-size: 1.2em;
    text-align: center;
  }
}
</style>
