<template>
  <div
    class="preview__section"
    :class="{
      'text-left': value.align === '靠左對齊',
      'text-center': value.align === '置中',
      'text-right': value.align === '靠右對齊'
    }"
  >
    <div class="title">
      <h1 v-html="value.title.value"></h1>
      <img
        :src="value.logo.select"
        alt="天下雜誌"
      >
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
        `"
      >
    </div>
    <img
      :src="`images/mask-${type.select}.png`"
      alt="版型遮罩" class="mask"
    >
  </div>
</template>

<script>
export default {
  props: ['value', 'type', 'editable'],
};
</script>
