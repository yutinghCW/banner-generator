<template>
  <div class="preview__section">
    <img
      :src="value.logo.select"
      v-if="!value.logo.disabled"
      alt="天下雜誌" class="logo"
    >
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
