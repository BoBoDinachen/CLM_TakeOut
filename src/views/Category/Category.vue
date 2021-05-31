<template>
  <div class="category-box">
    <!-- 返回按钮 -->
    <div class="back-box">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <span @click="goBack">返回店铺列表</span>
    </div>
    <!-- 店铺信息 -->
    <div class="shop-info-box">
      <label>好吃不火饭店</label>
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
        <li v-for="goods in state.goodsList">
          <!-- 商品图片 -->
          <img src="@image/炒牛肉.jpeg" alt="" />
          <!-- 商品信息 -->
          <div class="goods-info">
            <!-- 名字 -->
            <h3>{{ goods.name }}</h3>
            <!-- 标签 -->
            <div>
              <span>评分:{{ goods.score }}</span>
              <span>每月:{{ goods.sales }}单</span>
            </div>
            <!-- 描述 -->
            <p>{{ goods.describe }}</p>
            <div>
              <span
                ><label>￥{{ goods.price }}</label> 起</span
              >
              <span>＋</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    goBack() {
      this.$router.push("/app/shopList");
    },
  },
  setup(props) {
    const state = reactive({
      goodsList: [
        {
          id: "1",
          name: "炒牛肉",
          sales: "300",
          price: "14",
          score: "4",
          describe:
            "下饭又美味房间大军阀撒娇的放假撒法克斯的开发建设附件是丰大厦附近撒赖咖啡碱吉萨福克斯大家雷锋精神的开发手机的辐射大",
        },
        {
          id: "2",
          name: "泡椒猪肝",
          sales: "255",
          price: "14",
          score: "4",
          describe: "下饭又美味",
        },
      ],
      goodsType: [
        { icon: "#icon-tuijian", tag: "招牌推荐", isActive: true },
        { icon: "#icon-gaifan-", tag: "盖饭", isActive: false },
        { icon: "#icon-rice", tag: "炒饭", isActive: false },
        { icon: "#icon-xiaochao", tag: "小炒", isActive: false },
        { icon: "#icon-zhishifufeiqiapianicon-", tag: "汤类", isActive: false },
        { icon: "#icon-xiaochiMBE", tag: "小吃", isActive: false },
        { icon: "#icon-shucai", tag: "蔬菜", isActive: false },
      ],
    });
    // 计算当前选中状态的标签名称
    const activeTagName = computed(() => {
      let type = state.goodsType.filter((type) => {
        return type.isActive != false;
      });
      return type[0].tag;
    });
    // 点击选中商品类型时
    function handelClickType(type) {
      // 改变选中样式
      state.goodsType.forEach((type) => {
        type.isActive = false;
      });
      type.isActive = true;
      //根据当前选中的商品类别，发送请求，改变当前商品列表
      // request
    }
    return {
      state,
      handelClickType,
      activeTagName,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
