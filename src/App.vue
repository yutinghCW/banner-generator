<template>
  <HeaderComponent />
  <main class="py40">
    <router-view/>
  </main>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
  components: {
    HeaderComponent,
  },
  watch: {
    $route() {
      document.title = '天下雜誌圖卡產生器';
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/style";
</style>
