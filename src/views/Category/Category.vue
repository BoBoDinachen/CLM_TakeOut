<template>
  <div class="category-box">
    <h3>这是分类页面</h3>
    <button @click="goBack">返回店铺列表</button>
  </div>
</template>

<script>
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
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
