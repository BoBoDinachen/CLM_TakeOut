<template>
  <div class="prompt-box">
    <img src="../assets/svg/shop-background.svg" alt="" />
    <h3>亲您还没有登录呢~</h3>
    <button @click="handleGoToLogin">去登录</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function handleGoToLogin() {
  router.push("/login");
}
</script>

<style lang="scss" scoped>
.prompt-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
  }
  button {
    width: 60%;
    height: 40px;
    border-radius: 10px;
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
    background-color: #009966;
    color: white;
    transition: all 0.3s linear;
    &:active {
      background-color: #c1a5ff;
    }
  }
}
</style>
