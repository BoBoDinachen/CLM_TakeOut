<template>
  <div class="login-box" ref="loginBox">
    <div class="background">
      <svg class="icon" aria-hidden="true" @click="goToHome">
        <use xlink:href="#icon-zhuye"></use>
      </svg>
      <h3>我喜欢你呀</h3>
      <h3>就像春天里的油菜花</h3>
    </div>
    <div class="login-input">
      <div class="user-input">
        <label>手机号</label>
        <input type="tel" placeholder="请输入手机号" v-model="state.tel" />
        <span></span>
      </div>
      <div class="pwd-input">
        <label>密码</label>
        <input type="password" placeholder="请输入密码" v-model="state.pwd" />
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
import { ref, onMounted, reactive, inject } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { login } from "../../request/api/login";
const toast = inject(["toast"]);
const loginBox = ref(null);
const router = useRouter(); // 访问路由
const store = useStore(); // 访问store

const state = reactive({
  tel: sessionStorage["tel"],
  pwd: "",
});
onMounted(() => {
  loginBox.value.style.height = document.body.clientHeight + "px";
});

// 去主页
function goToHome() {
  router.replace("/app/home");
}
function handleLogin() {
  // 发起登录请求
  // 判断输入框格式
  if (state.tel != "" && state.pwd != "") {
    login({
      tel: state.tel,
      pwd: state.pwd,
    }).then((res) => {
      const { type, message, data } = res;
      switch (type) {
        case "warning":
          toast({
            text: message,
            type: "warning",
          });
          break;
        case "error":
          toast({
            text: message,
            type: "error",
          });
          break;
        case "success":
          toast({
            text: message,
            type: "success",
          });
          localStorage["token"] = data.token;
          sessionStorage["uid"] = data.uid;
          sessionStorage["tel"] = data.tel;
          setTimeout(() => {
            router.push("/app/home");
          }, 300);
          break;
        default:
      }
    });
  } else {
    toast({
      text: "手机号和密码必填!",
      type: "warning",
    });
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
