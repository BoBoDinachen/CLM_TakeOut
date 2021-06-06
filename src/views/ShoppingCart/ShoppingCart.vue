<template>
  <div class="cart-box" ref="boxElem" @click="handleCloseSlide">
    <router-view />
    <!-- 标题栏 -->
    <div class="cart-title">
      <span
        >共有<b>&nbsp;{{ state.trolleyList.length }}&nbsp;</b>件商品</span
      >
      <span @click="clearCart">清空购物车</span>
    </div>
    <!-- 购物车图标 -->
    <div class="cart-icon-box" v-show="state.trolleyList.length === 0">
      <img src="@svg/cart-icon2.svg" alt="" />
      <span>购物车是空的噢~</span>
    </div>
    <!-- 商品列表 -->
    <ul class="goods-list">
      <slide-list
        v-for="trolley in state.trolleyList"
        :key="trolley.trolleyId"
        @changeActiveItem="changeActiveItem"
        @deleteItem="deleteItem"
        :index="trolley.trolleyId"
      >
        <!-- 内容 -->
        <template v-slot:content>
          <!-- 勾选框 -->
          <span class="check" @click="handleCheck(trolley)">
            <svg
              class="icon"
              :class="[trolley.check ? 'check-incon' : '']"
              aria-hidden="true"
            >
              <use xlink:href="#icon-gouxuanzhong"></use>
            </svg>
          </span>
          <!-- 图片 -->
          <img
            :src="imgUrl + '/getGoodsPicture/' + trolley.goodsId"
            alt=""
            @click="showGoodsDetails({ goods: trolley.goods })"
          />
          <div class="goods-info">
            <!-- 名称 -->
            <h4>{{ trolley.goods.goodsName + "(" + trolley.goods.shopName + ")" }}</h4>
            <!-- 种类 -->
            <span class="tag">{{ trolley.goods.goodsType }}</span>
            <!-- 价钱和数量 -->
            <div class="price-number">
              <label>￥{{ trolley.goods.price * trolley.goodsAmount }}</label>
              <div>
                <span @click="subtractNumber(trolley)">－</span>
                <span>{{ trolley.goodsAmount }}</span>
                <span @click="increNumber(trolley)">＋</span>
              </div>
            </div>
          </div>
        </template>
      </slide-list>
    </ul>
    <div class="cart-footer">
      <div>
        <span @click="selectAll"
          ><svg
            class="icon"
            :class="[state.isCheckAll ? 'checkAll-incon' : '']"
            aria-hidden="true"
          >
            <use xlink:href="#icon-gouxuanzhong"></use></svg></span
        >全选
      </div>
      <div>
        合计:<label>￥{{ totalPrice }}</label>
      </div>
      <button @click="goToSettlement">结算</button>
    </div>
  </div>
</template>
<script>
import SlideList from "@comps/SlideList/SlideList.vue";
import { onMounted, ref, reactive, computed, inject, watch } from "vue";
import {
  getTrolleyList,
  deleteTrolley,
  clearTrolleyAll,
} from "../../request/api/trolley";
import { imgUrl } from "../../request/api/goods";
import toast from "../../components/Toast";
export default {
  data() {
    return {
      activeItem: null,
      imgUrl,
    };
  },
  components: {
    SlideList,
  },
  created() {
    // 监听路由变化
    this.$watch(
      () => this.$route.path,
      () => {
        // 重新加载购物车信息
        getTrolleyList(sessionStorage["uid"]).then((res) => {
          this.state.trolleyList = res.data.trolleyList;
          // console.log(res);
        });
      }
    );
  },
  methods: {
    changeActiveItem(item) {
      // console.log(item.btnsWidth);
      if (this.activeItem === item) {
        return;
      }
      if (this.activeItem && this.activeItem.closeSlide) {
        this.activeItem.closeSlide(); // 关闭组件滑动
      }
      this.activeItem = item;
    },
    // 删除子项
    deleteItem(trolleyId) {
      console.log("当前子组件的index", trolleyId);
      // 遍历绑定的列表数据
      this.state.trolleyList = this.state.trolleyList.filter((trolley) => {
        return trolley.trolleyId !== trolleyId;
      });
      // 发送请求
      deleteTrolley(trolleyId).then((res) => {
        // console.log(res);
        if (res.statusCode === "200") {
          toast({
            text: "已移除购物车!",
            type: "success",
          });
        } else {
          toast({
            text: "删除失败!",
            type: "error",
          });
        }
      });
    },
    // 关闭滑动方法
    handleCloseSlide() {
      if (this.activeItem != null) {
        this.activeItem.closeSlide(); // 关闭组件滑动
      }
    },
    // 去结算
    goToSettlement() {
      if (this.orderGoodsList.length === 0) {
        toast({
          text: "您还没有选择商品噢~",
          type: "warning",
        });
      } else {
        setTimeout(() => {
          sessionStorage["orderGoodsList"] = JSON.stringify(this.orderGoodsList);
          this.$router.push({
            name: "settlement",
          });
        }, 300);
      }
    },
  },
  // 组合api入口函数
  setup(props) {
    const toast = inject(["toast"]);
    const confirm = inject(["confirm"]);
    const showGoodsDetails = inject(["showGoodsDetails"]);
    const boxElem = ref(null);
    // 响应式数据
    const state = reactive({
      isCheckAll: false, // 是否全选
      trolleyList: [
        // {
        //   id: "1",
        //   img_url: "",
        //   name: "炒牛肉",
        //   type: "盖饭",
        //   shop_name: "南昌小吃店",
        //   price: "14",
        //   amount: 5,
        //   isCheck: false,
        // },
      ],
      // orderGoodsList: [],
    });
    // 加载购物车列表
    getTrolleyList(sessionStorage["uid"]).then((res) => {
      state.trolleyList = res.data.trolleyList;
      console.log(res);
    });
    // 计算总价
    const totalPrice = computed(() => {
      let result = 0;
      state.trolleyList.forEach((trolley, index) => {
        // 是否是勾选上的
        if (trolley.check) {
          result += trolley.goodsAmount * trolley.goods.price;
        }
      });
      return result;
    });
    // 判断已勾选的商品
    const orderGoodsList = computed(() => {
      let list = state.trolleyList.filter((trolley, index) => {
        return trolley.check === true;
      });
      // console.log(list);
      return list;
    });
    // 页面挂载后，改变高度适应屏幕
    onMounted(() => {
      boxElem.value.style.height = document.body.clientHeight - (68 + 35) + "px";
    });

    // 勾选商品
    function handleCheck(trolley) {
      // console.log(trolley);
      trolley.check = !trolley.check;
      // 如果全部取消的话,isCheckAll 为fasle;
      let trolleys = state.trolleyList.filter((trolley) => {
        return trolley.check != false;
      });
      if (trolleys.length == 0) {
        state.isCheckAll = false;
      }
    }
    // 清空购物车
    function clearCart() {
      // state.trolleyList = [];
      setTimeout(() => {
        confirm({
          title: "确定要清空吗？",
          message: "清空购物车",
        })
          .then(() => {
            // 确定
            clearTrolleyAll(sessionStorage["uid"]).then((result) => {
              console.log(result);
              if (result.statusCode === "200") {
                toast({
                  text: "清空成功√",
                  type: "success",
                });
                state.trolleyList = [];
              }
            });
          })
          .catch(() => {
            // 取消
          });
      }, 300);
    }
    // 全选
    function selectAll() {
      state.isCheckAll = !state.isCheckAll;
      if (state.isCheckAll) {
        state.trolleyList.forEach((trolley, index) => {
          trolley["check"] = true;
        });
      } else {
        state.trolleyList.forEach((trolley, index) => {
          trolley["check"] = false;
        });
      }
    }
    // 增加数量
    function increNumber(trolley) {
      if (trolley.goodsAmount++ >= 10) {
        trolley.goodsAmount = 10;
        toast({
          text: "数量不能超过十噢!",
          type: "warning",
        });
      }
    }
    // 减去数量
    function subtractNumber(trolley) {
      if (trolley.goodsAmount-- <= 1) {
        trolley.goodsAmount = 1;
        toast({
          text: "数量不能少于一噢!",
          type: "warning",
        });
      }
    }
    return {
      boxElem,
      state,
      totalPrice,
      handleCheck,
      clearCart,
      selectAll,
      increNumber,
      subtractNumber,
      showGoodsDetails,
      orderGoodsList,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
