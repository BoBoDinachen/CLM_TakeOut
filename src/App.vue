<template>
  <div class="main-container" ref="containerElem">
    <router-view />
  </div>
  <LayoutMenuBar />
</template>

<script setup>
import LayoutMenuBar from "layout/MenuBar.vue";
import { onMounted, ref } from "vue";
const containerElem = ref(null);
onMounted(() => {
  console.log(containerElem.value); // null
  containerElem.value.style.height = document.body.clientHeight - 57 + "px";
});
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
.main-container {
  background-color: #cccccc;
  height: 100vh;
}
</style>
