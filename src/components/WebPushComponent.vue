<template>
  <div class="preview__section">
    <div class="title">
      <img
        :src="value.logo.select"
        v-if="!value.logo.disabled"
        alt="天下雜誌" class="logo"
      >
      <h2 v-if="type.select === 'webpush-covid19'">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 23 16.7"
        >
            <g id="Group_152">
                <path
                    d="M12.9,9.76c-.8,.8-2.2,.8-3,0s-.8-2.2,0-3,2.2-.8,3,0h0c.8,.9,.8,2.2,0,3Z"
                    fill="white"
                />
                <path
                    d="M16.3,13.66c-.3,0-.5-.1-.7-.3-.4-.5-.4-1.2,0-1.6,1.7-2,1.7-4.8,
                    0-6.8-.4-.5-.4-1.2,0-1.6,.3-.4,.9-.4,1.3-.1l.1,.1c2.5,2.9,
                    2.5,7.1,0,10-.1,.1-.4,.3-.7,.3Z"
                    fill="white"
                />
                <path
                    d="M6.5,13.66c-.3,0-.5-.1-.7-.3-2.5-2.9-2.5-7.1,0-10,
                    .3-.4,.9-.4,1.3-.1l.1,.1c.4,.5,.4,1.2,0,1.6-1.7,2-1.7,
                    4.8,0,6.8,.4,.5,.4,1.2,0,1.6-.2,.1-.4,.3-.7,.3Z"
                    fill="white"
                />
                <path
                    d="M19,16.66c-.3,0-.5-.1-.7-.3-.4-.4-.4-1.1,0-1.5,1.6-1.8,
                    2.5-4.1,2.5-6.5s-.9-4.7-2.5-6.5c-.4-.4-.4-1.1,0-1.5,.4-.4,
                    1-.4,1.4-.1,0,0,.1,0,.1,.1,2,2.2,3.1,5,3.1,8s-1.1,
                    5.8-3.1,8c-.3,.1-.6,.3-.8,.3Z"
                    fill="white"
                />
                <path
                    d="M3.9,16.66c-.3,0-.5-.1-.7-.3C1.2,14.16,
                    .1,11.36,.1,8.36S1.2,2.56,3.2,.36c.4-.4,1-.4,1.4-.1,
                    0,0,.1,0,.1,.1,.4,.4,.4,1.1,0,1.5-1.6,1.8-2.5,4.1-2.5,
                    6.5s.9,4.7,2.5,6.5c.4,.4,.4,1.1,0,1.5-.3,.1-.6,.2-.8,.3Z"
                    fill="white"
                />
            </g>
        </svg>
         {{ value.subtitle.value }}
      </h2>
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
  </div>
</template>

<script>
export default {
  props: ['value', 'type', 'editable'],
};
</script>
