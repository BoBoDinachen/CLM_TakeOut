<template>
  <div
    class="toast-box"
    :class="[state.isShow ? 'slip' : '', state.type ? `type-${state.type}` : '']"
  >
    {{ state.text }}
  </div>
</template>

<script setup>
import { defineProps, defineEmit, reactive, onMounted } from "vue";
// 接收的props
const props = defineProps({
  text: String,
});

// 响应数据
const state = reactive({
  text: props.text,
  isShow: false,
  type: "success",
});
onMounted(() => {
  show();
});
function show() {
  state.isShow = true;
  const timer = setTimeout(() => {
    state.isShow = false;
  }, 1500);
}
</script>

<style lang="scss" scoped>
.toast-box {
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -60px);
  width: 80%;
  height: 50px;
  border-radius: 0 0 50% 50%;
  text-align: center;
  color: white;
  background-color: #1989fa;
  line-height: 50px;
  font-size: 1.2em;
  transition: all 0.3s linear;
}
.slip {
  transform: translate(-50%, 0);
}
.type-success {
  background-color: #07c160;
}
.type-error {
  background-color: #ee0a24;
}
.type-warning {
  background-color: #ff976a;
}
</style>
