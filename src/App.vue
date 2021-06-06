<template>
  <LayoutHeader />
  <router-view />
</template>

<script setup>
import LayoutHeader from "@layout/components/Header.vue";

import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
// 注册全局守卫,判断用户登录状态
router.beforeEach((to, from) => {
  const token = localStorage["token"];
  const customerId = sessionStorage["uid"];
  const pathName = to.path.split("/")[2];
  if (
    (token === "" || token === undefined || customerId === undefined) &&
    (pathName === "shoppingCart" || pathName === "order" || pathName === "personal")
  ) {
    router.push("/app/prompt");
  }
});
onMounted(() => {});
// 界面全屏的方法
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  height: 100vh;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
}
a {
  text-decoration: none;
  color: unset;
  /* 取消移动端a链接点击时的蓝色背景 */
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -moz-user-focus: none;
}
ul {
  list-style: none;
}
button {
  border: none;
  outline: none;
}
input {
  outline: none;
  border: none;
}
</style>
