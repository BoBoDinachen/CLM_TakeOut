<template>
  <div class="register-box" ref="regBox">
    <svg class="icon" aria-hidden="true" @click="handleBack">
      <use xlink:href="#icon-zuo2"></use>
    </svg>
    <h1>注册</h1>
    <div class="input-box">
      <ul class="input-submit">
        <li>
          <label>用户名</label>
          <input type="text" placeholder="输入用户名..." />
        </li>
        <li>
          <label>手机号</label>
          <input type="tel" placeholder="输入手机号..." />
        </li>
        <li>
          <label>密码</label>
          <input type="text" placeholder="输入密码..." />
        </li>
        <li>
          <label>确定密码</label>
          <input type="text" placeholder="确定密码..." />
        </li>
        <li>
          <button class="btn-submit">提交</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const regBox = ref(null);
const router = useRouter();
onMounted(() => {
  regBox.value.style.height = document.body.clientHeight + "px";
});
function handleBack() {
  router.push("/login");
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
.icon {
  width: 4em;
  height: 4em;
  vertical-align: -0.15em;
  fill: currentColor;
  position: absolute;
  left: 20px;
  margin-top: 2%;
  overflow: hidden;
}
</style>
