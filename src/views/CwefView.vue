<template>
  <div>
    <HeaderComponent>
      <template #default>CWEF 裁圖工具</template>
    </HeaderComponent>
    <main class="py40">
      <div class="container">
        <div class="row align-items-start">
          <div class="col-md-6">
            <div class="mb20">
              <h3 class="mb-0">上傳檔案</h3>
              <input
                type="file" name="Filedata" ref="Filedata" id="file_upload" accept="image/*"
                @change="onFileSelected('file_upload', null, 'single')"
              />
              <div class="form__editable my20">
                <label class="d-block">
                  <span class="label--check">
                    <input type="checkbox" v-model="editable.switch" name="啟動修改">
                    <span class="label__check__mark"></span>
                    <span class="label__check__txt">修改圖片縮放及位置</span>
                  </span>
                </label>
                <div class="bg-gray-100 mt10 p-4" v-if="editable.switch">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-6 px-4">
                        <h4 class="color-secondary-variant my0">圖片縮放</h4>
                        <div class="row g-4 align-items-center pt-3">
                          <div class="col-auto text-center">
                            <button type="button" class="btn p-0">
                              <i class="icon icon-minus"></i>
                            </button>
                          </div>
                          <div class="col">
                            <input
                              type="range"
                              class="form-range"
                              v-model="editable.scale"
                              min="-100"
                              id="customRange1"
                            >
                          </div>
                          <div class="col-auto text-center">
                            <button type="button" class="btn p-0">
                              <i class="icon icon-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 px-4">
                        <h4 class="color-secondary-variant my0">圖片位移</h4>
                        <div class="row g-4 align-items-center pt-3">
                          <div class="col-auto text-center">
                            <button type="button" class="btn p-0">
                              左
                            </button>
                          </div>
                          <div class="col">
                            <input
                              type="range"
                              class="form-range"
                              v-model="editable.horizontal"
                              min="-100"
                              id="customRange2"
                            >
                          </div>
                          <div class="col-auto text-center">
                            <button type="button" class="btn p-0">
                              右
                            </button>
                          </div>
                        </div>
                        <div class="row g-4 align-items-center pt-3">
                          <div class="col-auto text-center">
                            <button type="button" class="btn p-0">
                              上
                            </button>
                          </div>
                          <div class="col">
                            <input
                              type="range"
                              class="form-range"
                              v-model="editable.vertical"
                              min="-100"
                              id="customRange3"
                            >
                          </div>
                          <div class="col-auto text-center">
                            <button type="button" class="btn p-0">
                              下
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 d-flex flex-column align-items-center">
            <div
              id="preview"
              class="cwef-crop bg-secondary-variant"
              :class="{
                'object-cover': !editable.switch,
                'object-customized': editable.switch
              }"
            >
              <img
                src="images/mask-cwef-guide.png"
                alt="參考線遮罩" class="mask"
              >
              <img
                :src="value.img"
                alt=""
                :style="`
                  transform:
                    scale(${1+(editable.scale/100*2)-.01})
                    translateX(${editable.horizontal*2}px)
                    translateY(${editable.vertical*2}px)
                  ;
                `"
              >
            </div>
            <div class="text-center mt40">
              <button
                type="button"
                class="btn btn--contained"
                @click="screenshot();"
              >下載</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import domtoimage from 'dom-to-image-more-v2';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
  data() {
    return {
      output: {
        width: 500,
        height: 640,
        ratio: 1,
      },
      value: {
        img: 'https://storage.googleapis.com/www-cw-com-tw/ckeditor/202211/ckeditor-636afd0d569bd.jpg',
      },
      editable: {
        switch: false,
        vertical: 0,
        horizontal: 0,
        scale: 1,
      },
    };
  },
  components: {
    HeaderComponent,
  },
  methods: {
    /* eslint-disable */
    screenshot() {
      const el = document.querySelector('#preview');
      document.querySelector('.mask').style.display = 'none';
      domtoimage.toJpeg(el, {
        quality: 1,
        width: this.output.width,
        height: this.output.height,
        style: {
          'transform': `scale(${this.output.ratio})`,
          'transform-origin': 'top left',
        },
      })
      .then((dataUrl) => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        today = `${yyyy}${mm}${dd}`;
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `cwef-${today}.jpg`;
        a.click();
        document.querySelector('.mask').style.display = 'block';
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
    },
    onFileSelected(id = 'file_upload', idx = null, type = 'single') {
      const file = document.querySelector(`#${id}`).files[0];
      const reader = new FileReader();
      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result;
        this.value.img = rawImg;
      }
      reader.readAsDataURL(file);
    },
    /* eslint-disable */
  },
};
</script>

<style lang="scss" scoped>
  .cwef-crop {
    position: relative;
    width: 500px;
    height: 640px;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }

    &.object-cover {
      img {
        height: 100%;
        object-fit: cover;
        transform: none !important;
      }
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1;
    }
  }
</style>
