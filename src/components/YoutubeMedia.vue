<template>
  <div class="preview__section">
    <div class="logos">
      <img
        :src="value.logo.select"
        v-if="!value.logo.disabled"
        alt="天下雜誌" class="logo"
      >
      <img
        :src="value.group.third.img"
        class="cooperated" alt=""
      >
    </div>
    <img
      :src="`images/mask-${type.select}.png`"
      alt="版型遮罩" class="mask"
    >
    <div class="label" v-if="value.subtitle.value">
      <span v-html="value.subtitle.value"></span>
    </div>
    <div class="title">
      <h1 v-html="value.title.value" class="back"></h1>
      <h1 v-html="value.title.value" class="front"></h1>
    </div>
    <div class="reporter-group">
      <div
        class="reporter bg-gray-500"
        :class="{
          'object-cover': !editable.group.second.switch,
          'object-customized': editable.group.second.switch
        }"
      >
        <img
          :src="value.group.second.img"
          :alt="value.group.second.title"
          :style="`
            transform:
              scale(${1+(editable.group.second.scale/100)})
              translateX(${editable.group.second.horizontal}px)
              translateY(${editable.group.second.vertical}px)
            ;
        `">
      </div>
    </div>
    <div
      class="imgarea bg-gray-200"
      :class="{
        'object-cover': !editable.group.first.switch,
        'object-customized': editable.group.first.switch
      }"
    >
      <img
        :src="value.group.first.img"
        :alt="value.group.first.title"
        :style="`
          transform:
            scale(${1+(editable.group.first.scale/100)})
            translateX(${editable.group.first.horizontal}px)
            translateY(${editable.group.first.vertical}px)
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
