<template>
  <div v-show="isShow" class="container">
    <div class="confirm-box">
      <label>{{ title }}</label>
      <p>{{ message }}</p>
      <div class="btns">
        <button @click="clickCancel">取消</button>
        <button @click="clickConfirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "默认标题",
      message: "默认消息",
      isShow: false, // 是否显示
      promiseStatus: null,
    };
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.isShow = false;
    },
    // 打开弹窗
    openDialog() {
      this.isShow = true;
    },
    confirm() {
      this.openDialog(); // 打开模态框
      return new Promise((resolve, reject) => {
        this.promiseStatus = { resolve, reject };
      });
    },
    // 取消
    clickCancel() {
      this.closeDialog();
      this.promiseStatus && this.promiseStatus.reject();
    },
    // 确定
    clickConfirm() {
      this.closeDialog();
      this.promiseStatus && this.promiseStatus.resolve();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
