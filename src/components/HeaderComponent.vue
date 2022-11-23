<template>
  <header>
    <div class="container px20">
      <a href="https://www.cw.com.tw/" target="_blank" class="logo logo--main">
        <img src="https://www.cw.com.tw/images/common/logo.svg" alt="天下雜誌 logo">
      </a>
      <select
        v-model="selected"
        @change="changeType"
        name="type"
      >
        <option
          :value="item.title"
          v-for="(item, index) in pagination"
          :selected="emitType === item.title"
          :key="index"
        >
          {{ item.title }}
        </option>
      </select>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      selected: '',
      pagination: [
        {
          title: '天下社群圖卡產生器',
          link: '/',
        },
        {
          title: '一週大事圖卡產生器',
          link: 'weekly',
        },
        {
          title: 'CWEF 裁圖工具',
          link: 'cwef',
        },
      ],
    };
  },
  props: ['emit-type'],
  methods: {
    changeType() {
      this.pagination.forEach((element) => {
        if (element.title === this.selected) {
          console.log(element.link);
          this.$router.push(element.link);
        }
      });
    },
  },
  watch: {
    emitType() {
      this.selected = this.emitType;
    },
  },
};
</script>

<style lang="scss" scoped>
  select {
    display: inline-block;
    padding: 0.5rem 2rem 0.5rem 0;
    color: #D60C18;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1;
    vertical-align: middle;
    background-image: url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 594.6 337.3' style='enable-background:new 0 0 594.6 337.3;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23D60C18;%7D%0A%3C/style%3E%3Ctitle%3E%3C/title%3E%3Cg id='icomoon-ignore'%3E%3C/g%3E%3Cpath class='st0' d='M40,0h514.6c35.6,0,53.4,43,28.2,68.2L325.6,325.6c-15.6,15.6-41,15.6-56.6,0L11.8,68.2C-13.4,43,4.4,0,40,0 L40,0z'/%3E%3C/svg%3E%0A");
    background-size: 0.78125rem;
    background-position: calc(100% - 0.78125rem) center;
    background-repeat: no-repeat;
    border: 0;
    cursor: pointer;
  }
</style>
