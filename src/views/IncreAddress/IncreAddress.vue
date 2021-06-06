<template>
  <div class="increAddress-box" ref="increAddressBox">
    <div class="header-box">
      <svg class="icon-back" aria-hidden="true" @click="goBack">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <span>添加地址</span>
    </div>
    <div class="input-box">
      <div>
        <label>联系人</label>
        <input type="text" placeholder="请填写联系人的姓名" />
      </div>
      <div>
        <label>手机号</label>
        <input type="text" placeholder="请填写手机号" />
      </div>
      <div>
        <label>收货地址</label>
        <input type="text" placeholder="请填写收货地址" />
      </div>
      <button>保存</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back();
    },
  },
  mounted() {
    this.$refs.increAddressBox.style.height =
      document.body.clientHeight - (32 + 72) + "px";
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
