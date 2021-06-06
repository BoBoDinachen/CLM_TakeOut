<template>
  <div class="personal-box">
    <router-view />
    <div class="personal-info-card">
      <div class="info">
        <h2>{{ state.customerInfo.customerName }}</h2>
        <svg class="icon-sex" aria-hidden="true">
          <use
            :xlink:href="state.customerInfo.sex === '男' ? '#icon-nan' : '#icon-nv'"
          ></use>
        </svg>
        <p>{{ state.customerInfo.telephone }}</p>
        <span
          ><label>积分:</label>{{ state.customerInfo.integral }} <label>余额:</label
          >{{ state.customerInfo.balance }}</span
        >
      </div>
      <img src="@image/2ey9zm.jpg" alt="" />
    </div>
    <ul class="menu-list">
      <li @click="goToAddress">
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
import { onBeforeMount, reactive, inject } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import toast from "../../components/Toast";
import { getCustomerInfo } from "../../request/api/customer";
const router = useRouter();
const store = useStore();
const confirm = inject(["confirm"]);

const state = reactive({
  customerInfo: {},
});
onBeforeMount(() => {
  // console.log("token:", localStorage["token"]);
  // 组件挂载之前先判断是否有存在token
  if (localStorage["token"] == "" || localStorage["token"] === undefined) {
    router.push("/app/prompt"); // 进入提示页
  }
});
// 获取用户信息
getCustomerInfo(sessionStorage["uid"]).then((res) => {
  // console.log(res);
  const { customerName, telephone, sex, balance, integral } = res.data.customer;
  state.customerInfo = {
    customerName,
    telephone,
    sex,
    balance,
    integral,
  };
});
function handleLogout() {
  setTimeout(() => {
    confirm({
      title: "确定要退出吗?",
      message: "退出登录",
    })
      .then((result) => {
        // 确定
        localStorage["token"] = "";
        toast({
          text: "退出成功!",
          type: "success",
        });
        router.push("/login");
      })
      .catch((err) => {
        // 取消
      });
  }, 300);
}

// 去地址页面
function goToAddress() {
  setTimeout(() => {
    router.push("/app/personal/address");
  }, 300);
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
