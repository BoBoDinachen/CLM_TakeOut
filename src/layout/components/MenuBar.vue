<template>
  <footer>
    <ul class="menu-container">
      <router-link to="/app/home">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-ziyuan1"></use>
        </svg>
        <span>发现</span>
      </router-link>
      <router-link to="/app/category">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenlei"></use>
        </svg>
        <span>分类</span>
      </router-link>
      <router-link
        to="/app/shoppingCart"
        :class="[isActive ? 'router-link-exact-active' : '']"
      >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-ziyuan2"></use>
        </svg>
        <span>购物车</span>
      </router-link>
      <router-link to="/app/order">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-ziyuan"></use>
        </svg>
        <span>订单</span>
      </router-link>
      <router-link to="/app/personal">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wode1"></use>
        </svg>
        <span>我的</span>
      </router-link>
    </ul>
  </footer>
</template>

<script setup>
import { watch, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const isActive = ref(false);
// 监听路由，保持活动
onMounted(() => {
  // 判断三级路由
  switch (route.path.split("/")[3]) {
    case "settlement":
      isActive.value = true;
      break;
    default:
      isActive.value = false;
      break;
  }
});
watch(
  () => route.path,
  async (newPaht) => {
    // 判断三级路由
    switch (newPaht.split("/")[3]) {
      case "settlement":
        isActive.value = true;
        break;
      default:
        isActive.value = false;
        break;
    }
  }
);
</script>

<style lang="scss" scoped>
.icon {
  width: 1.3em;
  height: 1.3em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
footer {
  background-color: white;
  width: 100vw;
  height: 68px;
}
// 菜单容器
.menu-container {
  padding: 5px 25px 5px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  text-align: center;
  a {
    position: relative;
    padding: 5px 0 5px;
    span {
      display: inline-block;
      margin-top: 30px;
      // font-size: 0.8em;
      font-weight: bold;
      font-size: 0.7em;
      opacity: 0.7;
    }
    transition: 0.2s all linear;
  }
  // 当前选中的菜单
  .router-link-exact-active {
    color: black;
    border-bottom: 2px solid black;
    span {
      width: 60px;
      font-size: 1em;
      margin-top: 25px;
      opacity: 1;
    }
    .icon {
      width: 1.6em;
      height: 1.6em;
    }
  }
}
</style>
