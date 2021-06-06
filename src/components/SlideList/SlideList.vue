<template>
  <li
    class="slide-list-item"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    <!-- 列表内容 -->
    <div class="slide-list-item-content">
      <slot name="content"></slot>
    </div>
    <div class="shade-box" :class="[isSlide ? 'show-shade' : '']"></div>
    <svg class="icon-toLeft" aria-hidden="true">
      <use xlink:href="#icon-xiangzuohuadong1"></use>
    </svg>
    <div class="slide-list-item-btns" ref="btns" :class="[isSlide ? 'btns-slide' : '']">
      <slot name="btns">
        <div class="slide-list-item-btns-btn" @click="handleDelete">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shanchu"></use>
          </svg>
          删除
        </div>
      </slot>
    </div>
  </li>
</template>

<script>
export default {
  data() {
    return {
      btnsWidth: 0, // 按钮组件宽度
      moveX: 0, // 移动距离
      startX: 0, // 开始位置
      isSlide: false, // 是否滑动
    };
  },
  props: {
    index: Number,
  },
  inject: ["toast"],
  mounted() {
    // nextTick 获得数据更新后的dom操作
    this.$nextTick(() => {
      // console.log("宽度", btns.value.offsetWidth);
      this.btnsWidth = this.$refs.btns.offsetWidth;
    });
  },
  methods: {
    touchStart(e) {
      this.startX = e.touches[0].pageX;
    },
    // 正在移动的函数
    touchMove(e) {
      // 计算滑动的距离
      let moveX = this.startX - e.touches[0].pageX;
      this.moveX = moveX;
      if (this.moveX > 50) {
        this.isSlide = true;
        this.$emit("changeActiveItem", this);
      } else {
        // 隐藏
        this.closeSlide();
      }
    },
    // 手指离开屏幕，滑动停止的函数
    touchEnd(e) {},
    // 关闭滑动和遮罩层
    closeSlide() {
      this.isSlide = false;
    },
    // 删除item
    handleDelete() {
      this.$refs.btns.style.display = "none";
      this.$emit("deleteItem", this.index);
      // this.toast({
      //   text: "删除成功！",
      //   type: "success",
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
