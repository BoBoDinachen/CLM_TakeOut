<template>
  <div ref="layountElem">
    <div class="main-container" ref="containerElem">
      <router-view v-slot="{ Component }">
        <transition name="fade-transform">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <LayoutMenuBar />
  </div>
</template>

<script setup>
import LayoutMenuBar from "@layout/components/MenuBar.vue";
import { onMounted, ref } from "vue";
const containerElem = ref(null);
const layountElem = ref(null);
onMounted(() => {
  containerElem.value.style.height = document.body.clientHeight - (67 + 32) + "px";
  layountElem.value.style.height = document.body.clientHeight - 32 + "px";
});
</script>

<style lang="scss" scoped>
.main-container {
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start;
  position: relative;
  background-color: #f2f2f2;
  padding: 0 10px 0;
  overflow: scroll;
}
</style>
