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
          <input type="text" placeholder="输入用户名..." v-model="state.customerName" />
        </li>
        <li>
          <label>手机号</label>
          <input type="tel" placeholder="输入手机号..." v-model="state.telephone" />
        </li>
        <li>
          <label>密码</label>
          <input type="password" placeholder="输入密码..." v-model="state.customerPwd" />
        </li>
        <li>
          <label>确定密码</label>
          <input type="password" placeholder="确定密码..." v-model="state.affirmPwd" />
        </li>
        <li>
          <button class="btn-submit" @click="handleClick">提交</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { register } from "../../request/api/login";
import toast from "../../components/Toast/index";
const regBox = ref(null);
const router = useRouter();

const state = reactive({
  customerName: "",
  telephone: "",
  customerPwd: "",
  affirmPwd: "",
});
onMounted(() => {
  regBox.value.style.height = document.body.clientHeight + "px";
});
function handleBack() {
  router.push("/login");
}
function handleClick() {
  // 校验输入框的格式和是否输入
  if (
    state.customerName === "" ||
    state.telephone === "" ||
    state.customerPwd === "" ||
    state.affirmPwd === ""
  ) {
    toast({
      text: "所填字段不能为空!",
      type: "warning",
    });
  } else {
    // 判断手机号和确认密码
    if (state.telephone.length !== 11) {
      toast({
        text: "手机号格式错误~",
        type: "warning",
      });
    } else if (state.affirmPwd === state.customerPwd) {
      // 发起请求
      register({
        customerName: state.customerName,
        telephone: state.telephone,
        customerPwd: state.customerPwd,
      }).then((res) => {
        console.log(res);
        if (res.statusCode == 200) {
          toast({
            text: "注册成功!",
            type: "success",
          });
          sessionStorage["tel"] = state.telephone;
          router.push("/login");
        } else if (res.data.isExist !== undefined && res.data.isExist == true) {
          toast({
            text: "该手机号已被注册!",
            type: "warning",
          });
        }
      });
    } else {
      toast({
        text: "两次输入密码不一致!",
        type: "warning",
      });
    }
  }
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
