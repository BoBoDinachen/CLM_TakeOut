<template>
  <div class="login-box" ref="loginBox">
    <div class="background">
      <h3>我喜欢你呀</h3>
      <h3>就像春天里的油菜花</h3>
    </div>
    <div class="login-input">
      <div class="user-input">
        <label>手机号</label>
        <input type="tel" placeholder="请输入手机号" />
        <span></span>
      </div>
      <div class="pwd-input">
        <label>密码</label>
        <input type="password" placeholder="请输入密码" />
        <span></span>
      </div>
    </div>
    <button class="btn-login" @click="handleLogin">登录</button>
    <div class="link—register">
      <router-link style="text-decoration: underline" to="/register"
        >没有账号？去注册</router-link
      >
    </div>
    <!-- <p>登录即代表您已阅读并同意<span>《用户协议》</span>与<span>《隐私政策》</span></p> -->
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
const loginBox = ref(null);
const router = useRouter();
onMounted(() => {
  loginBox.value.style.height = document.body.clientHeight + "px";
});
function handleLogin() {
  setTimeout(() => {
    localStorage["token"] = "2222";
    router.push("/app/home");
  }, 400);
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
