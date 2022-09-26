<template>
  <div class="preview__section">
    <img :src="value.logo.select" alt="天下雜誌" class="logo">
    <div class="title">
      <div class="label">
        <span>{{ value.label.value }}</span>
      </div>
      <h1 v-html="value.title.value"></h1>
      <div class="swipe__cta" v-html="value.cta.value"></div>
    </div>
    <div
      class="imgarea bg-gray-200"
      :class="{
        'object-cover': !editable.switch,
        'object-customized': editable.switch
      }"
    >
      <img
      :src="value.img"
      :alt="value.title.value"
      :style="`
        transform:
          scale(${1+(editable.scale/100)})
          translateX(${editable.horizontal}px)
          translateY(${editable.vertical}px)
        ;
      `">
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'editable'],
};
</script>
