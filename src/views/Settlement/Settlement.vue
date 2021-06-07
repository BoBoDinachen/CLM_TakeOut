<template>
  <div class="settle-box">
    <!-- 返回按钮 -->
    <!-- <div class="back-box">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <span @click="goBack">返回购物车</span>
    </div> -->
    <!-- 送餐地址 -->
    <div class="address-box">
      <!-- 大概地址 -->
      <label>选择送餐地址</label>
      <div class="address-info" @click="goToSelectAddress">
        <h4>{{ state.customerInfo.address }}</h4>
        <span>xxxxx xxx xxxxx</span>
      </div>
    </div>
    <!-- 姓名 -->
    <div class="name-box">
      <label>姓名</label>
      <span>{{ state.customerInfo.name }}</span>
    </div>
    <!-- 电话 -->
    <div class="tel-box">
      <label>电话</label>
      <span>{{ state.customerInfo.telephone }}</span>
    </div>
    <!-- 商品列表 -->
    <div class="goods-list">
      <label>商品列表</label>
      <ul>
        <li v-for="orderGoods in state.orderGoodsList" :key="orderGoods.goodsId">
          <img :src="imgUrl + '/getGoodsPicture/' + orderGoods.goodsId" alt="" />
          <div class="info-box">
            <div>
              <span>{{
                orderGoods.goods.goodsName + "(" + orderGoods.goods.shopName + ")"
              }}</span>
              <span>￥{{ orderGoods.goods.price }}</span>
            </div>
            <div>
              <span>{{ orderGoods.goods.goodsType }}</span>
              <span>×{{ orderGoods.goodsAmount }}</span>
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
      <button @click="laterPayment">稍后付款</button>
      <button @click="nowPayment">现在付款</button>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { imgUrl } from "../../request/api/goods";
import { getCurrentAddress } from "../../request/api/address";
import { createOrder, addOrderGoods } from "../../request/api/order";
import { deleteTrolleyList } from "../../request/api/trolley";
import { uuid } from "../../utils/utils";
import toast from "../../components/Toast";
export default {
  data() {
    return {
      imgUrl,
    };
  },
  methods: {
    goBack() {
      this.$router.push("/app/shoppingCart");
    },
    goToSelectAddress() {
      setTimeout(() => {
        this.$router.push("/app/personal/address");
      }, 300);
    },
  },
  setup(props) {
    const state = reactive({
      orderGoodsList: [
        // {
        //   id: "001",
        //   name: "炒牛肉",
        //   shop_name: "南昌小吃店",
        //   price: "14",
        //   amount: 3,
        //   type: "盖饭",
        // },
      ],
      customerInfo: {},
    });
    const router = useRouter();
    // 初始化订单商品数据
    const orderGoodsList = JSON.parse(sessionStorage["orderGoodsList"]);
    // console.log(orderGoodsList);
    state.orderGoodsList = orderGoodsList;
    // 获取客户配送信息
    getCurrentAddress(sessionStorage["uid"]).then((res) => {
      console.log(res);
      if (res.data.address.length != 0) {
        state.customerInfo = res.data.address[0];
      }
    });
    // 处理总价格
    const totalPrice = computed(() => {
      let result = 0;
      state.orderGoodsList.map((orderGoods, index) => {
        result += orderGoods.goods.price * orderGoods.goodsAmount;
      });
      return result;
    });

    // 付款方法
    function Payment(isPay) {
      // 判断当前有没有选择地址
      createOrder({
        customerId: sessionStorage["uid"],
        orderNumber: uuid(),
        orderTime: new Date().toLocaleString(),
        orderStatus: isPay,
        totalPrice: totalPrice.value,
        dispatchAddress: state.customerInfo.address,
        customerName: state.customerInfo.name,
        telephone: state.customerInfo.telephone,
      }).then((res) => {
        // 拿到订单id 和 购物车id列表
        const orderId = res.data.orderId; // 订单id
        const trolleyIds = []; // 购物车id列表
        if (res.statusCode === "200") {
          // 生成订单商品数据
          let dataList = [];
          state.orderGoodsList.forEach((orderGoods) => {
            dataList.push({
              orderId: orderId,
              goodsId: orderGoods.goodsId,
              goodsAmount: orderGoods.goodsAmount,
            });
            trolleyIds.push(orderGoods.trolleyId);
          });
          // 添加订单商品
          addOrderGoods({
            orderGoodsList: dataList,
          }).then((res) => {
            if (res.statusCode === "200") {
              toast({
                text: "已加入订单!",
                type: "success",
              });
              if (trolleyIds[0] !== undefined) {
                // 加入订单后,将购物车中对应的商品删除
                deleteTrolleyList({
                  trolleyIds: trolleyIds,
                }).then((res) => {
                  console.log(res);
                  if (res.statusCode === "200") {
                    router.push("/app/shoppingCart");
                  }
                });
              } else {
                router.push("/app/order");
              }
            }
            console.log(res);
          });
        }
        console.log(res);
      });
    }
    // 点击稍后付款  创建订单
    function laterPayment() {
      // 判断当前客户信息是否为空
      if (Object.keys(state.customerInfo).length === 0) {
        toast({
          text: "宁还煤油选择地址噢~",
          type: "warning",
        });
      } else {
        Payment(0);
      }
    }
    // 点击现在付款 创建订单
    function nowPayment() {
      // 判断当前客户信息是否为空
      if (Object.keys(state.customerInfo).length === 0) {
        toast({
          text: "宁还煤油选择地址噢~",
          type: "warning",
        });
      } else {
        Payment(1);
      }
    }
    return {
      state,
      totalPrice,
      laterPayment,
      nowPayment,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
