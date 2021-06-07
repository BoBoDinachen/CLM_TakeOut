<template>
  <div class="category-box">
    <!-- 购物车浮窗 -->
    <div class="cart-box">
      <!-- 图标 -->
      <div @click="showOrderGoods">
        <svg class="icon-bao" aria-hidden="true">
          <use xlink:href="#icon-bao"></use>
        </svg>
        <span>{{ goodsAmount }}</span>
      </div>
      <label>￥{{ totalPrice }}</label>
      <a @click="goToSettlement">结算</a>
    </div>
    <!-- 返回按钮 -->
    <div class="back-box">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <span @click="goBack">返回店铺列表</span>
    </div>
    <!-- 店铺信息 -->
    <div class="shop-info-box">
      <label>{{ shopName }}</label>
      <div>
        <span>营业时间：9:00-20:00</span>
        <span>距离600m</span>
      </div>
      <span>节假日本店休息</span>
    </div>
    <!-- 商品分类标签页 -->
    <div class="goods-category">
      <!-- 标签列表 -->
      <ul class="goods-tags">
        <li
          v-for="type in state.goodsType"
          :key="type.icon"
          :class="[type.isActive ? 'tag-active' : '']"
          @click="handelClickType(type)"
        >
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="type.icon"></use>
          </svg>
          <span>
            {{ type.tag }}
          </span>
        </li>
      </ul>
      <!-- 对应标签页的商品列表 -->
      <ul class="goods-list">
        <label class="title">{{ activeTagName }}</label>
        <li v-for="goods in state.goodsList" :key="goods.goodsId">
          <!-- 商品图片 -->
          <img
            :src="imgUrl + '/getGoodsPicture/' + goods.goodsId"
            alt=""
            @click="showGoodsDetails({ goods })"
          />
          <!-- 商品信息 -->
          <div class="goods-info">
            <!-- 名字 -->
            <h3>{{ goods.goodsName }}</h3>
            <!-- 标签 -->
            <div class="goods-tag">
              <span>评分:{{ goods.score }}</span>
              <span>每月:{{ goods.salesVolume }}单</span>
            </div>
            <!-- 描述 -->
            <p>{{ goods.goodsDescribe }}</p>
            <div class="goods-price">
              <span
                ><label>￥{{ goods.price }}</label> 起</span
              >
              <div>
                <span v-show="goods.amount != 0" @click="handleDecrease(goods)">－</span>
                <span v-show="goods.amount != 0">{{ goods.amount }}</span>
                <span @click="handleAugment(goods)">＋</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, computed, inject, ref } from "vue";
import { useRoute } from "vue-router";
import { getGoodsListByType, getListByRecommend, imgUrl } from "../../request/api/goods";
import { addTrolley } from "../../request/api/trolley";
import toast from "../../components/Toast";
export default {
  data() {
    return {
      imgUrl,
    };
  },
  components: {},
  created() {
    getListByRecommend(this.shopId).then((res) => {
      this.state.goodsList = res.data.goodsList;
    });
  },
  methods: {
    goBack() {
      this.$router.push("/app/shopList");
    },
    // 去结算
    goToSettlement() {
      // 判断订单商品是否为空
      if (this.orderGoodsList.length === 0) {
        toast({
          text: "您还没有加入商品噢~",
          type: "warning",
        });
      } else {
        sessionStorage["orderGoodsList"] = JSON.stringify(this.orderGoodsList);
        setTimeout(() => {
          this.$router.push("/app/shoppingCart/settlement");
        }, 300);
      }
    },
    // 显示订单商品
    showOrderGoods() {
      // setTimeout(() => {
      //   this.$router.push("/app/shoppingCart");
      // }, 100);
      toast({
        text: "此功能暂未开发,抱歉~",
        type: "warning",
      });
    },
  },
  setup(props) {
    const route = useRoute();
    const shopName = ref(route.query.shopName);
    const shopId = route.query.shopId;
    console.log(route.query.shopId);
    // console.log(shopName.value);
    const state = reactive({
      goodsList: [
        // {
        //   goodsId: "",
        //   goodsName: "",
        //   sales: "",
        //   price: "",
        //   score: "",
        //   amount: 0,
        //   describe: "",
        // },
      ],
      goodsType: [
        { icon: "#icon-tuijian", tag: "招牌推荐", isActive: true },
        { icon: "#icon-gaifan-", tag: "盖饭", isActive: false },
        { icon: "#icon-rice", tag: "炒饭", isActive: false },
        { icon: "#icon-xiaochao", tag: "小炒", isActive: false },
        { icon: "#icon-zhishifufeiqiapianicon-", tag: "汤类", isActive: false },
        { icon: "#icon-xiaochiMBE", tag: "小吃", isActive: false },
        // { icon: "#icon-shucai", tag: "蔬菜", isActive: false },
      ],
    });
    // 消息提示组件
    const toast = inject(["toast"]);
    // 显示商品详情组件
    const showGoodsDetails = inject(["showGoodsDetails"]);
    // 计算当前选中状态的标签名称
    const activeTagName = computed(() => {
      let type = state.goodsType.filter((type) => {
        return type.isActive != false;
      });
      return type[0].tag;
    });
    // 计算商品列表中的所有数量
    const goodsAmount = computed(() => {
      let amount = 0;
      state.goodsList.forEach((goods) => {
        amount += goods.amount;
      });
      return amount;
    });
    // 计算购物车中的商品总价格
    const totalPrice = computed(() => {
      let totalPrice = 0;
      state.goodsList.forEach((goods) => {
        if (goods.amount != 0) {
          totalPrice += goods.price * goods.amount;
        }
      });
      return totalPrice;
    });

    // 计算加入到订单的商品列表，数量不为0
    const orderGoodsList = computed(() => {
      let list = state.goodsList.filter((goods) => {
        return goods.amount != 0;
      });
      let orderGoodsList = [];
      list.map((goods) => {
        orderGoodsList.push({
          goodsId: goods.goodsId,
          goodsAmount: goods.amount,
          goods: goods,
        });
      });
      return orderGoodsList;
    });
    // 点击选中商品类型时
    function handelClickType(type) {
      // 改变选中样式
      state.goodsType.forEach((type) => {
        type.isActive = false;
      });
      type.isActive = true;

      //根据当前选中的商品类别，发送请求，改变当前商品列表
      if (type.tag === "招牌推荐") {
        getListByRecommend(shopId).then((res) => {
          console.log(res);
          state.goodsList = res.data.goodsList;
        });
      } else {
        getGoodsListByType(shopId, type.tag).then((res) => {
          // console.log(res.data.goodsList);
          state.goodsList = res.data.goodsList;
        });
      }
    }
    // 减去订单商品数量
    function handleDecrease(goods) {
      goods.amount -= 1;
      if (goods.amount < 0) {
        goods.amount = 0;
      }
      console.log(orderGoodsList.value);
    }
    // 点击加入订单,显示数量和减号
    function handleAugment(goods) {
      // 加入订单商品时，先判断是否已登录
      const uid = sessionStorage["uid"];
      const token = localStorage["token"];
      if (uid === undefined || token === "") {
        toast({
          text: "请先登录!",
          type: "warning",
        });
      } else {
        goods.amount += 1;
        if (goods.amount > 10) {
          toast({
            text: "最多选择十个噢!",
            type: "warning",
          });
          goods.amount = 10;
        }
        console.log(orderGoodsList.value);
        // 将这个商品加入
        // addTrolley({
        //   goodsId: goods.goodsId,
        //   customerId: uid,
        // }).then((res) => {
        //   if (res.statusCode === "200") {
        //     toast({
        //       text: "已添加进购物车!",
        //       type: "success",
        //     });
        //   } else {
        //     toast({
        //       text: "添加失败!",
        //       type: "error",
        //     });
        //   }
        // });
      }
      // 发送请求
    }
    return {
      state,
      handelClickType,
      activeTagName,
      handleDecrease,
      handleAugment,
      goodsAmount,
      totalPrice,
      shopName,
      shopId,
      showGoodsDetails,
      orderGoodsList,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
