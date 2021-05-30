<template>
  <div class="personal-box">
    <div class="personal-info-card">
      <div class="info">
        <h2>薛定谔的猫</h2>
        <p>17815377345</p>
        <span><label>积分:</label>222 <label>余额:</label>333</span>
      </div>
      <img src="@image/2ey9zm.jpg" alt="" />
    </div>
    <ul class="menu-list">
      <li>
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-peisongdizhi"></use>
          </svg>
        </span>
        <label>配送地址</label><span></span>
      </li>
      <li>
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shoucang"></use>
          </svg>
        </span>
        <label>收藏商品</label><span></span>
      </li>
      <li>
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiugaiziliao"></use>
          </svg>
        </span>
        <label>完善信息</label><span></span>
      </li>
      <li>
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiugai"></use>
          </svg>
        </span>
        <label>修改密码</label><span></span>
      </li>
      <li>
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-lianxi"></use>
          </svg>
        </span>
        <label>联系商家</label><span></span>
      </li>
    </ul>
    <button class="btn-logout" @touchend="handleLogout">退出</button>
  </div>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onBeforeMount(() => {
  console.log("token:", localStorage["token"]);
  // 组件挂载之前先判断是否有存在token
  if (localStorage["token"] == "" || localStorage["token"] === undefined) {
    router.push("/app/prompt"); // 进入提示页
  }
});
function handleLogout() {
  setTimeout(() => {
    localStorage["token"] = "";
    router.push("/login");
  }, 400);
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
