<template>
  <div class="settle-box">
    <!-- 返回按钮 -->
    <div class="back-box">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <span @click="goBack">返回购物车</span>
    </div>
    <!-- 送餐地址 -->
    <div class="address-box">
      <!-- 大概地址 -->
      <label>选择送餐地址</label>
      <div class="address-info">
        <h4>重庆市 沙坪坝 大学城 电子工程职业学院</h4>
        <span>南区宿舍 2栋 2106寝室</span>
      </div>
    </div>
    <!-- 姓名 -->
    <div class="name-box">
      <label>姓名</label>
      <span>薛定谔的猫</span>
    </div>
    <!-- 电话 -->
    <div class="tel-box">
      <label>电话</label>
      <span>17815377345</span>
    </div>
    <!-- 商品列表 -->
    <div class="goods-list">
      <label>商品列表</label>
      <ul>
        <li v-for="goods in state.goodsList" :key="goods.id">
          <img src="@image/炒牛肉.jpeg" alt="" />
          <div class="info-box">
            <div>
              <span>{{ goods.name + "(" + goods.shop_name + ")" }}</span>
              <span>￥{{ goods.price }}</span>
            </div>
            <div>
              <span>{{ goods.type }}</span>
              <span>×{{ goods.amount }}</span>
            </div>
          </div>
        </li>
      </ul>
      <!-- 备注 -->
      <div class="remarks">
        <label>备注</label>
        <span>加辣，多加辣</span>
      </div>
      <div class="total-price">
        <span
          >总计:<b>￥{{ totalPrice }}</b></span
        >
      </div>
    </div>
    <!-- 支付方式 -->
    <div class="payment">
      <label>支付方式</label>
      <span>在线支付</span>
    </div>
    <!-- 现在付款，稍后付款按钮 -->
    <div class="btn-group">
      <button>稍后付款</button>
      <button>现在付款</button>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
export default {
  methods: {
    goBack() {
      this.$router.push("/app/shoppingCart");
    },
  },
  setup(props) {
    const state = reactive({
      goodsList: [
        {
          id: "001",
          name: "炒牛肉",
          shop_name: "南昌小吃店",
          price: "14",
          amount: 3,
          type: "盖饭",
        },
        {
          id: "002",
          name: "炒牛肉",
          shop_name: "南昌小吃店",
          price: "14",
          amount: 3,
          type: "盖饭",
        },
        {
          id: "002",
          name: "炒牛肉",
          shop_name: "南昌小吃店",
          price: "14",
          amount: 3,
          type: "盖饭",
        },
      ],
    });
    // 处理总价格
    const totalPrice = computed(() => {
      let result = 0;
      state.goodsList.map((goods, index) => {
        result += goods.price * goods.amount;
      });
      return result;
    });
    return {
      state,
      totalPrice,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
