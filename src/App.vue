<template>
  <router-view/>
</template>

<script>
export default {
  watch: {
    $route(to) {
      const currentTitle = to.meta.title || '';
      document.title = `${currentTitle}｜天下雜誌圖卡產生器`;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/style";
</style>
