<template>
  <div class="preview__section">
    <img
      :src="value.logo.select"
      v-if="!value.logo.disabled"
      alt="天下雜誌" class="logo"
    >
    <div class="imgarea-group">
      <div
        class="imgarea imgarea-1 bg-gray-200"
        :class="{
          'object-cover': !editable.group.first.switch,
          'object-customized': editable.group.first.switch
        }"
      >
        <img
        :src="value.group.first"
        :alt="value.title.value"
        :style="`
          transform:
            scale(${1+(editable.group.first.scale/100)})
            translateX(${editable.group.first.horizontal}px)
            translateY(${editable.group.first.vertical}px)
          ;
        `">
      </div>
      <div
        class="imgarea imgarea-2 bg-gray-200"
        :class="{
          'object-cover': !editable.group.second.switch,
          'object-customized': editable.group.second.switch
        }"
      >
        <img
        :src="value.group.second"
        :alt="value.title.value"
        :style="`
          transform:
            scale(${1+(editable.group.second.scale/100)})
            translateX(${editable.group.second.horizontal}px)
            translateY(${editable.group.second.vertical}px)
          ;
        `">
      </div>
      <div
        class="imgarea imgarea-3 bg-gray-200"
        :class="{
          'object-cover': !editable.group.third.switch,
          'object-customized': editable.group.third.switch
        }"
      >
        <img
        :src="value.group.third"
        :alt="value.title.value"
        :style="`
          transform:
            scale(${1+(editable.group.third.scale/100)})
            translateX(${editable.group.third.horizontal}px)
            translateY(${editable.group.third.vertical}px)
          ;
        `">
      </div>
      <div
        class="imgarea imgarea-4 bg-gray-200"
        :class="{
          'object-cover': !editable.group.forth.switch,
          'object-customized': editable.group.forth.switch
        }"
      >
        <img
        :src="value.group.forth"
        :alt="value.title.value"
        :style="`
          transform:
            scale(${1+(editable.group.forth.scale/100)})
            translateX(${editable.group.forth.horizontal}px)
            translateY(${editable.group.forth.vertical}px)
          ;
        `">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'type', 'editable'],
};
</script>
