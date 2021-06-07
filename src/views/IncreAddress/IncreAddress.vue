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
        <input
          type="text"
          placeholder="请填写联系人的姓名"
          v-model="submitAddress.name"
        />
      </div>
      <div>
        <label>手机号</label>
        <input type="text" placeholder="请填写手机号" v-model="submitAddress.telephone" />
      </div>
      <div>
        <label>收货地址</label>
        <input type="text" placeholder="请填写收货地址" v-model="submitAddress.address" />
      </div>
      <button @click="saveAddress">保存</button>
    </div>
  </div>
</template>

<script>
import toast from "../../components/Toast";
import { insertAddress } from "../../request/api/address";
export default {
  data() {
    return {
      submitAddress: {
        customerId: sessionStorage["uid"],
        name: "",
        telephone: "",
        address: "",
      },
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    saveAddress() {
      // 判断空
      if (
        this.submitAddress.name === "" ||
        this.submitAddress.telephone === "" ||
        this.submitAddress.address === ""
      ) {
        toast({
          text: "请填写必要信息!",
          type: "warning",
        });
      } else if (this.submitAddress.telephone.length !== 11) {
        toast({
          text: "手机号格式错误!",
          type: "warning",
        });
      } else {
        insertAddress(this.submitAddress).then((res) => {
          console.log(res);
          if (res.statusCode === "200") {
            toast({
              text: "保存成功!",
              type: "success",
            });
            this.$router.push("/app/personal/address");
          }
        });
      }
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
