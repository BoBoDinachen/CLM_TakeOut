<template>
  <div class="order-box">
    <!-- 标签选项 -->
    <div class="tag-option">
      <span
        :class="currentOption === 0 ? 'active-option' : ''"
        @click="
          () => {
            currentOption = 0;
          }
        "
        >全部订单</span
      >
      <span
        :class="currentOption === 1 ? 'active-option' : ''"
        @click="
          () => {
            currentOption = 1;
          }
        "
        >待付款</span
      >
      <span
        :class="currentOption === 2 ? 'active-option' : ''"
        @click="
          () => {
            currentOption = 2;
          }
        "
        >正在进行</span
      >
      <span
        :class="currentOption === 3 ? 'active-option' : ''"
        @click="
          () => {
            currentOption = 3;
          }
        "
        >已完成</span
      >
    </div>
    <!-- 订单列表 -->
    <ul class="order-list">
      <li v-for="order in state.orderList" :key="order.orderId" class="order-item">
        <!-- 店铺名字 -->
        <div class="order-title">
          <!-- <span>{{ order.goodsList[0].shopName }}</span> -->
          <span
            >{{
              order.orderStatus === 0
                ? "待付款"
                : order.orderStatus === 1
                ? "正在配送"
                : order.orderStatus === 2
                ? "已完成"
                : ""
            }}
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-arr-right1"></use>
            </svg>
          </span>
          <span>￥{{ order.totalPrice }}</span>
        </div>
        <!-- 商品信息 -->
        <ul class="goods-info">
          <li
            v-for="orderGoods in order.orderGoodsList"
            :key="orderGoods.orderGoodsId"
            @click="goToOrderDetails(order.orderId)"
          >
            <img :src="imgUrl + '/getGoodsPicture/' + orderGoods.goodsId" alt="" />
            <span
              ><b>{{ orderGoods.goods.goodsName }}</b
              >x{{ orderGoods.goodsAmount }}</span
            >
          </li>
        </ul>
        <!-- 按钮 -->
        <div class="btn-group">
          <span>下单时间:{{ order.orderTime }}</span>
          <button v-show="order.orderStatus === 0" @click="deleteOrder(order.orderId)">
            取消订单
          </button>
          <button v-show="order.orderStatus === 0">立即付款</button>
          <button v-show="order.orderStatus === 1" @click="deleteOrder(order.orderId)">
            删除订单
          </button>
          <button v-show="order.orderStatus === 1">确定收货</button>
          <button v-show="order.orderStatus === 2" @click="deleteOrder(order.orderId)">
            删除订单
          </button>
          <button v-show="order.orderStatus === 2">再来一单</button>
        </div>
      </li>
    </ul>
    <!-- 订单为空时显示 -->
    <div class="prompt-box" v-show="state.orderList.length === 0">
      <img src="@svg/order-icon.svg" alt="" />
      <h2>订单为空噢~</h2>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { reactive, inject } from "vue";
import { imgUrl } from "../../request/api/goods";
import {
  getOrderList,
  getOrderGoodsList,
  deleteOrderById,
} from "../../request/api/order";
import toast from "../../components/Toast";
export default {
  data() {
    return {
      // 当前选项卡
      currentOption: 0,
      imgUrl,
    };
  },
  methods: {
    goToOrderDetails(orderId, customer) {
      this.$router.push({
        path: "/app/order/details",
        query: {
          orderId: orderId,
        },
      });
    },
  },
  created() {},
  setup(props) {
    // 订单列表数据
    const state = reactive({
      orderList: [
        // {
        //   orderId: "001",
        //   order_status: 0,
        //   total_price: 200,
        //   order_time: "2021/6/2",
        //   dispatch_address: "重庆电子工程职业学院",
        //   goodsList: [
        //     {
        //       goodsId: "001",
        //       goodsName: "炒牛肉",
        //       goodsAmount: 2,
        //       shopName: "好吃不火饭店",
        //     },
        //     {
        //       goodsId: "002",
        //       goodsName: "泡椒猪肝",
        //       goodsAmount: 2,
        //       shopName: "好吃不火饭店",
        //     },
        //   ],
        // },
      ],
    });
    const confirm = inject(["confirm"]);
    // 加载订单列表和订单信息
    initOrderList();
    function initOrderList() {
      getOrderList(sessionStorage["uid"]).then((res) => {
        console.log(res);
        const { orderList } = res.data;
        state.orderList = orderList;
        // 遍历订单列表
        state.orderList.forEach((order) => {
          // 根据订单id获取订单商品信息
          getOrderGoodsList(order.orderId).then((res) => {
            // console.log(res);
            order["orderGoodsList"] = res.data.orderGoodsList;
          });
        });
      });
    }
    // 删除订单
    function deleteOrder(orderId) {
      confirm({
        title: "确定要删除吗?",
        message: "删除订单",
      })
        .then(() => {
          // 确定
          deleteOrderById(orderId).then((res) => {
            console.log(res);
            if (res.statusCode === "200") {
              toast({
                text: "删除成功!",
                type: "success",
              });
              // 重新加载订单列表
              state.orderList = state.orderList.filter((order) => {
                return order.orderId != orderId;
              });
            }
          });
        })
        .catch(() => {
          // 取消
        });
    }
    return {
      state,
      deleteOrder,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
