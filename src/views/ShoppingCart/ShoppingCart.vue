<template>
  <div class="cart-box" ref="boxElem" @click="handleCloseSlide">
    <router-view />
    <!-- 标题栏 -->
    <div class="cart-title">
      <span
        >共有<b>&nbsp;{{ state.goodsList.length }}&nbsp;</b>件商品</span
      >
      <span @click="clearCart">清空购物车</span>
    </div>
    <!-- 商品列表 -->
    <ul class="goods-list">
      <slide-list
        v-for="goods in state.goodsList"
        :key="goods.id"
        @changeActiveItem="changeActiveItem"
        @deleteItem="deleteItem"
        :index="goods.id"
      >
        <!-- 内容 -->
        <template v-slot:content>
          <!-- 勾选框 -->
          <span class="check" @click="handleCheck(goods)">
            <svg
              class="icon"
              :class="[goods.isCheck ? 'check-incon' : '']"
              aria-hidden="true"
            >
              <use xlink:href="#icon-gouxuanzhong"></use>
            </svg>
          </span>
          <!-- 图片 -->
          <img src="@image/炒牛肉.jpeg" alt="" />
          <div class="goods-info">
            <!-- 名称 -->
            <h4>{{ goods.name + "(" + goods.shop_name + ")" }}</h4>
            <!-- 种类 -->
            <span class="tag">{{ goods.type }}</span>
            <!-- 价钱和数量 -->
            <div class="price-number">
              <label>￥{{ goods.price * goods.amount }}</label>
              <div>
                <span @click="subtractNumber(goods)">－</span>
                <span>{{ goods.amount }}</span>
                <span @click="increNumber(goods)">＋</span>
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
import { onMounted, ref, reactive, computed, inject } from "vue";
export default {
  data() {
    return {
      activeItem: null,
    };
  },
  components: {
    SlideList,
  },
  methods: {
    changeActiveItem(item) {
      console.log(item.btnsWidth);
      if (this.activeItem === item) {
        return;
      }
      if (this.activeItem && this.activeItem.closeSlide) {
        this.activeItem.closeSlide(); // 关闭组件滑动
      }
      this.activeItem = item;
    },
    // 删除子项
    deleteItem(index) {
      console.log("当前子组件的index", index);
      // 遍历绑定的列表数据
      this.state.goodsList = this.state.goodsList.filter((goods) => {
        return goods.id != index;
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
      setTimeout(() => {
        this.$router.push("/app/shoppingCart/settlement");
      }, 300);
    },
  },
  // 组合api入口函数
  setup(props) {
    const toast = inject(["toast"]);
    const boxElem = ref(null);
    // 响应式数据
    const state = reactive({
      isCheckAll: false, // 是否全选
      goodsList: [
        {
          id: "1",
          img_url: "",
          name: "炒牛肉",
          type: "盖饭",
          shop_name: "南昌小吃店",
          price: "14",
          amount: 5,
          isCheck: false,
        },
        {
          id: "2",
          img_url: "",
          name: "炒牛肉",
          type: "盖饭",
          shop_name: "南昌小吃店",
          price: "14",
          amount: 1,
          isCheck: false,
        },
      ],
    });
    // 计算总价
    const totalPrice = computed(() => {
      let result = 0;
      state.goodsList.forEach((goods, index) => {
        // 是否是勾选上的
        if (goods.isCheck) {
          result += goods.amount * goods.price;
        }
      });
      return result;
    });
    // 页面挂载后，改变高度适应屏幕
    onMounted(() => {
      boxElem.value.style.height = document.body.clientHeight - (67 + 32) + "px";
    });

    // 勾选商品
    function handleCheck(goods) {
      goods.isCheck = !goods.isCheck;
    }
    // 清空购物车
    function clearCart() {
      state.goodsList = [];
    }
    // 全选
    function selectAll() {
      state.isCheckAll = !state.isCheckAll;
      if (state.isCheckAll) {
        state.goodsList.forEach((goods, index) => {
          goods["isCheck"] = true;
        });
      } else {
        state.goodsList.forEach((goods, index) => {
          goods["isCheck"] = false;
        });
      }
    }
    // 增加数量
    function increNumber(goods) {
      if (goods.amount++ >= 10) {
        goods.amount = 10;
        toast({
          text: "数量不能超过十噢!",
          type: "warning",
        });
      }
    }
    // 减去数量
    function subtractNumber(goods) {
      if (goods.amount-- <= 1) {
        goods.amount = 1;
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
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
