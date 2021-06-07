<template>
  <div class="order-details-box">
    <!-- 标题 -->
    <div class="details-title">
      <h3>
        {{
          order.orderInfo.orderStatus === 0
            ? "待付款"
            : order.orderInfo.orderStatus === 1
            ? "正在配送"
            : order.orderInfo.orderStatus === 2
            ? "已完成"
            : ""
        }}
      </h3>
      <div class="btn-group">
        <button v-show="order.orderInfo.orderStatus === 0">取消订单</button>
        <button v-show="order.orderInfo.orderStatus === 0">立即付款</button>
        <button v-show="order.orderInfo.orderStatus === 1">确定收货</button>
        <button v-show="order.orderInfo.orderStatus === 2">再来一单</button>
      </div>
    </div>
    <!-- 商品列表 -->
    <ul class="goods-list">
      <li
        v-for="orderGoods in order.orderInfo.orderGoodsList"
        :key="orderGoods.orderGoodsId"
      >
        <img :src="imgUrl + '/getGoodsPicture/' + orderGoods.goodsId" alt="" />
        <div class="goods-info-box">
          <!-- 名字和价格 -->
          <div>
            <span>{{ orderGoods.goods.goodsName }}</span>
            <span>￥{{ orderGoods.goods.price }}</span>
          </div>
          <!-- 数量 -->
          <div>x{{ orderGoods.goodsAmount }}</div>
        </div>
      </li>
    </ul>
    <!-- 订单的一些信息 -->
    <div class="order-info-box">
      <div>订单信息</div>
      <div><span>订单编号</span>{{ order.orderInfo.orderNumber }}</div>
      <div><span>下单时间</span>{{ order.orderInfo.orderTime }}</div>
      <div>
        <span>订单状态</span
        >{{
          order.orderInfo.orderStatus === 0
            ? "待付款"
            : order.orderInfo.orderStatus === 1
            ? "已付款,正在配送"
            : order.orderInfo.orderStatus === 2
            ? "已完成"
            : ""
        }}
      </div>
      <div>
        <span>配送费</span>
        <span>￥0</span>
      </div>
      <div>
        <span>合计:</span>
        <span>￥{{ order.orderInfo.totalPrice }}</span>
      </div>
    </div>
    <!-- 配送信息 -->
    <div class="dispatch-info-box">
      <div>配送信息</div>
      <div>
        <span>客户姓名</span>
        <b>{{ order.orderInfo.customerName }}</b>
      </div>
      <div>
        <span>客户电话</span>
        <b>{{ order.orderInfo.telephone }}</b>
      </div>
      <div>
        <span>配送地址</span>
        <b>{{ order.orderInfo.dispatchAddress }}</b>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { imgUrl } from "../../request/api/goods";
import { getOrderInfoById, getOrderGoodsList } from "../../request/api/order";
export default {
  data() {
    return {
      imgUrl,
    };
  },
  setup(props) {
    const route = useRoute();
    const orderId = ref(route.query.orderId);
    console.log(orderId.value);
    const order = reactive({
      orderInfo: {},
    });
    // 加载订单信息
    getOrderInfoById(orderId.value).then((res) => {
      // console.log(res);
      order.orderInfo = res.data.orderInfo;
      // 加载商品列表信息;
      getOrderGoodsList(orderId.value).then((res) => {
        order.orderInfo["orderGoodsList"] = res.data.orderGoodsList;
      });
    });
    // 加载订单商品信息
    return {
      order,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
