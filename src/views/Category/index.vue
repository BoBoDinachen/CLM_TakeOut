<template>
  <div @click="handleClick">
    <h3>Hello World!</h3>
    <!-- <button @click="test">click</button> -->
    <ul>
      <slide-list
        v-for="(item, index) in goodsList"
        @changeActiveItem="changeActiveItem"
        @deleteItem="deleteItem"
        :key="item.id"
        :index="item.id"
      >
        <!-- 内容 -->
        <template v-slot:content>
          <span
            ><b>{{ item.id }}</b></span
          >
          <span>{{ item.name }}</span>
        </template>
        <!-- 按钮 -->
        <template v-slot:btns> </template>
      </slide-list>
    </ul>
  </div>
</template>

<script>
import SlideList from "@comps/SlideList/SlideList.vue";
export default {
  data() {
    return {
      activeItem: null,
      goodsList: [
        { id: "001", name: "炒肉" },
        { id: "002", name: "土豆丝" },
        { id: "003", name: "猪肝" },
      ],
    };
  },
  components: {
    SlideList,
  },
  methods: {
    // 点击别的地方时关闭滑动
    handleClick() {
      this.activeItem.closeSlide();
    },
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
      this.goodsList = this.goodsList.filter((goods) => {
        return goods.id != index;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  position: relative;
  overflow: hidden;
  li {
    height: 80px;
    background-color: aquamarine;
    margin-bottom: 10px;
  }
}
</style>
