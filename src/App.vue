<template>
  <header>
    <div class="container px20">
      <a href="https://www.cw.com.tw/" target="_blank" class="logo logo--main">
        <img src="https://www.cw.com.tw/images/common/logo.svg" alt="天下雜誌 logo">
      </a>
      <a class="logo logo--sub">
        Banner 產生器
      </a>
    </div>
  </header>
  <main class="py40">
    <router-view/>
  </main>
</template>

<style lang="scss">
@import "@/assets/sass/style";
</style>
