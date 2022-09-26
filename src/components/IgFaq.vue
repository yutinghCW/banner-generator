<template>
  <div class="preview__section">
    <img :src="value.logo.select" alt="天下雜誌" class="logo">
    <div class="label">
      {{ value.label.value }}
    </div>
    <div class="title">
      <h2 v-html="value.subtitle.value"></h2>
      <h1 v-html="value.title.value"></h1>
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
    <div class="content__block">
      <p v-html="value.content.value"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'editable'],
};
</script>
