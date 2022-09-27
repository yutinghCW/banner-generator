<template>
  <div class="preview__section">
    <img
      :src="value.logo.select"
      v-if="!value.logo.disabled"
      alt="天下雜誌" class="logo"
    >
    <div class="title">
      <div class="label">
        <span v-html="value.subtitle.value"></span>
      </div>
      <h1 v-html="value.title.value"></h1>
      <div class="swipe__cta">
        <img
          src="images/headphone.svg"
          v-if="type.select === 'line-podcast-cw' || type.select === 'line-podcast-channel'"
          alt="headphone"
        >
        {{ value.cta.value }}
      </div>
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
  props: ['value', 'type', 'editable'],
};
</script>
