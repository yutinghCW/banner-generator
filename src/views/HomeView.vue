<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h2 class="mt0">請選擇社群及類型</h2>
        <div class="d-flex mb40">
          <div class="select__group select__group--filled select__group--defalt">
            <select id="social" name="social" v-model="social.select">
              <option
                v-for="item in social.items" :value="item.value" :key="item.value"
              >{{ item.display }}</option>
            </select>
          </div>
          <div
            class="select__group select__group--filled select__group--defalt"
            v-if="types.length !== 0"
          >
            <select id="type" name="type" v-model="type.select">
              <option
                v-for="item in types" :value="item.value" :key="item.value"
                :disabled="types.length === 0"
              >{{ item.display }}</option>
            </select>
          </div>
        </div>
        <h2 class="mt0">請填寫欄位</h2>
        <div class="mb20">
          <h3 class="mb-0">上傳檔案</h3>
          <input
          type="file" name="Filedata" ref="Filedata" id="file_upload"
          accept="image/*" @change="onFileSelected"
          />
        </div>
        <div class="form__editable mb20">
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
        <div class="form__group form__group--ckeditor w-100 mb20">
          <h3 class="mb-0">標題</h3>
          <div
            class="label form__group--defalt"
            :class="{
              'form__group--error': removeTags(value.title.value).length > value.title.limit,
            }"
          >
            <div class="h5 mt0">建議字數{{ value.title.limit }}字</div>
            <ckeditor
              :editor="editor"
              v-model="value.title.value"
              :config="editorConfig"
            ></ckeditor>
            <span
              class="form__group__help--strong"
              :class="{
                'form__group__help--highlight':
                removeTags(value.title.value).length > value.title.limit
              }"
            >
              <template v-if="!(removeTags(value.title.value).length > value.title.limit)">
                建議字數{{ value.title.limit }}字
              </template>
              <template v-if="removeTags(value.title.value).length > value.title.limit">
                已超過建議字數，請透過預覽查看是否有跑版
              </template>
            </span>
          </div>
        </div>
        <div class="form__group form__group--ckeditor w-100 mb20">
          <h3 class="mb-0">副標</h3>
          <div
            class="label form__group--defalt"
            :class="{
              'form__group--error': removeTags(value.subtitle.value).length > value.subtitle.limit,
            }"
          >
            <ckeditor
              :editor="editor"
              v-model="value.subtitle.value"
              :config="editorConfig"
            ></ckeditor>
            <span
              class="form__group__help--strong"
              :class="{
                'form__group__help--highlight':
                removeTags(value.subtitle.value).length > value.subtitle.limit
              }"
            >
              <template v-if="!(removeTags(value.subtitle.value).length > value.subtitle.limit)">
                建議字數{{ value.subtitle.limit }}字
              </template>
              <template v-if="removeTags(value.subtitle.value).length > value.subtitle.limit">
                已超過建議字數，請透過預覽查看是否有跑版
              </template>
            </span>
          </div>
        </div>
        <div class="form__group form__group--outlined w-100 mb20">
          <h3 class="mb-1">內文</h3>
          <div
            class="label form__group--defalt"
            :class="{
              'hasValue': value.content.value !== '',
              'form__group--error': countLines(value.content.value) > value.content.limit,
            }"
          >
            <textarea v-model="value.content.value" class="form__group__input d-block"></textarea>
            <span
              class="form__group__help--strong d-block"
              :class="{
                'form__group__help--highlight':
                countLines(value.content.value) > value.content.limit
              }"
            >
              <template v-if="!(countLines(value.content.value) > value.content.limit)">
                建議行數{{ value.cta.limit }}字
              </template>
              <template v-if="countLines(value.content.value) > value.content.limit">
                已超過建議行數，請透過預覽查看是否有跑版
              </template>
            </span>
          </div>
        </div>
        <div class="form__group form__group--outlined w-100 mb20">
          <h3 class="mb-1">CTA 文字</h3>
          <div
            class="label form__group--defalt"
            :class="{
              'hasValue': value.cta.value !== '',
              'form__group--error': value.cta.value.length > value.cta.limit,
            }"
          >
            <textarea
              v-model="value.cta.value"
              class="form__group__input d-block"
              style="min-height: 80px;"
            ></textarea>
            <span
              class="form__group__help--strong d-block"
              :class="{'form__group__help--highlight': value.cta.value.length > value.cta.limit}"
            >
              <template v-if="!(value.cta.value.length > value.cta.limit)">
                建議字數{{ value.cta.limit }}字
              </template>
              <template v-if="value.cta.value.length > value.cta.limit">
                已超過建議字數，請透過預覽查看是否有跑版
              </template>
            </span>
          </div>
        </div>
        <div class="form__logos mb20">
          <h3 class="mb-1">選擇 Logo 樣式</h3>
          <div class="row mt-2">
            <div class="col-md-3">
              <label class="label--radio d-flex align-items-center">
                <input
                  type="radio" id="logo-white-primary"
                  :value="value.logo.white.primary"
                  v-model="value.logo.select"
                  :checked="value.logo.select === value.logo.white.primary"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">
                  <img src="images/cw-logo-white-primary.svg" alt="">
                </span>
              </label>
            </div>
            <div class="col-md-3">
              <label class="label--radio d-flex align-items-center">
                <input
                  type="radio" id="logo-white-primary"
                  :value="value.logo.white.black"
                  v-model="value.logo.select"
                  :checked="value.logo.select === value.logo.white.black"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">
                  <img src="images/cw-logo-white-black.svg" alt="">
                </span>
              </label>
            </div>
            <div class="col-md-3">
              <label class="label--radio d-flex align-items-center">
                <input
                  type="radio" id="logo-white-primary"
                  :value="value.logo.transparent.primary"
                  v-model="value.logo.select"
                  :checked="value.logo.select === value.logo.transparent.primary"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">
                  <img src="images/cw-logo-primary-transparent.svg" alt="">
                </span>
              </label>
            </div>
            <div class="col-md-3">
              <label class="label--radio d-flex align-items-center">
                <input
                  type="radio" id="logo-white-primary"
                  :value="value.logo.transparent.black"
                  v-model="value.logo.select"
                  :checked="value.logo.select === value.logo.transparent.black"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">
                  <img src="images/cw-logo-black-transparent.svg" alt="">
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 d-flex flex-column align-items-center">
        <div class="preview__section" :class="type.select" id="preview">
          <img :src="value.logo.select" alt="天下雜誌" class="logo">
          <div class="label">
            天下圖擊
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
          <p v-html="value.content.value"></p>
          <div class="swipe__cta" v-html="value.cta.value"></div>
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
</template>

<script>
// @ is an alias to /src
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Font from '@ckeditor/ckeditor5-font/src/font';

import domtoimage from 'dom-to-image-more-v2';

export default {
  data() {
    return {
      social: {
        select: 'instagram',
        items: [
          {
            value: 'line',
            display: 'LINE',
          },
          // {
          //   value: 'facebook',
          //   display: 'Facebook',
          // },
          {
            value: 'instagram',
            display: 'Instagram',
          },
          {
            value: 'edm',
            display: '電子報',
          },
          {
            value: 'youtube',
            display: 'YouTube',
          },
          {
            value: 'webpush',
            display: 'Web Push',
          },
          {
            value: 'cwvido',
            display: '天下影音',
          },
        ],
      },
      type: {
        select: 'ig-cw-picture-story',
      },
      types: [
        {
          value: 'ig-cw-picture-post',
          display: '天下圖擊圖卡',
          size: {
            w: 1080,
            h: 1080,
          },
        },
        {
          value: 'ig-cw-picture-story',
          display: '天下圖擊限動',
          size: {
            w: 1080,
            h: 1920,
          },
        },
        {
          value: 'ig-summary-post',
          display: '書摘圖卡（金句類）',
          size: {
            w: 1080,
            h: 1080,
          },
        },
        {
          value: 'ig-summary-story',
          display: '書摘限時動態',
          size: {
            w: 1080,
            h: 1920,
          },
        },
        {
          value: 'ig-quote-post',
          display: '金句圖卡',
          size: {
            w: 1080,
            h: 1080,
          },
        },
        {
          value: 'ig-quote-story',
          display: '金句限動',
          size: {
            w: 1080,
            h: 1920,
          },
        },
        {
          value: 'ig-faq-word-story',
          display: '問答限動（文字版）',
          size: {
            w: 1080,
            h: 1920,
          },
        },
        {
          value: 'ig-faq-picture-story',
          display: '問答限動（有圖版）',
          size: {
            w: 1080,
            h: 1920,
          },
        },
      ],
      value: {
        img: 'https://storage.googleapis.com/www-cw-com-tw/article/202206/article-62ba6d9c751c6.jpg',
        title: {
          limit: 19,
          value: '<p>房租隨房價飆、政府統計卻躺平</p>',
        },
        subtitle: {
          limit: 19,
          value: '<p>溫和通膨陷阱1》<span style="color:#d60c18;">30到45歲</span>最慘</p>',
        },
        content: {
          limit: 10,
          value: '疫情與戰爭，讓全球通膨怪獸已經失控，\n台灣雖號稱處於溫和通膨，\n但這其實是個假象，\n將造成台灣貧富差距擴大、\n窮人更難翻身。\n\n房租漲幅失真、政府不再撒幣，\n通膨實況到底如何',
        },
        cta: {
          limit: 10,
          value: '上滑\n看完整文章',
        },
        label: {
          limit: 10,
          value: '',
        },
        logo: {
          select: 'images/cw-logo-white-primary.svg',
          white: {
            primary: 'images/cw-logo-white-primary.svg',
            black: 'images/cw-logo-white-black.svg',
          },
          transparent: {
            primary: 'images/cw-logo-primary-transparent.svg',
            black: 'images/cw-logo-black-transparent.svg',
          },
        },
      },
      editable: {
        switch: false,
        vertical: 0,
        horizontal: 0,
        scale: 1,
      },
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        plugins: [
          Essentials,
          Bold,
          Paragraph,
          Font,
        ],
        toolbar: {
          items: [
            'bold',
            'fontColor',
            '|',
            'undo',
            'redo',
          ],
        },
        fontColor: {
          colors: [
            {
              color: '#d60c18',
              label: '天下紅',
            },
            {
              color: '#a41117',
              label: '聽天下紅',
            },
            {
              color: '#26aae3',
              label: '闖天下藍',
            },
            {
              color: '#fff',
              label: 'White',
              hasBorder: true,
            },
          ],
        },
      },
    };
  },
  methods: {
    /* eslint-disable */
    screenshot() {
      const el = document.querySelector('#preview');
      domtoimage.toPng(el, {
        quality: 1,
        width: 1080,
        height: 1920,
        style: {
          'transform': 'scale(2)',
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
          a.download = `${this.type.select}-${today}.png`;
          a.click();
        })
        .catch((error) => {
          console.error('oops, something went wrong!', error);
        });
    },
    onFileSelected() {
      const file = document.querySelector('#file_upload').files[0]
      const reader = new FileReader();
      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result;
        this.value.img = rawImg;
      }
      reader.readAsDataURL(file);
    },
    /* eslint-disable */
    countLines(el) {
      const line = el.split('\n').length;
      return line;
    },
    removeTags(str) {
      if ((str===null) || (str==='')) {
        return false;
      } else {
        str = str.toString();
      }
      return str.replace(/(<([^>]+)>)/ig, '');
    },
  },
  watch: {
    'social.select': function select() {
      switch (this.social.select) {
        case 'line':
          this.types = [
            {
              value: 'popular-articles',
              display: '熱文',
              size: {
                w: 1024,
                h: 1024,
              },
            },
            {
              value: 'podcast-cw',
              display: '聽天下',
              size: {
                w: 1024,
                h: 1024,
              },
            },
            {
              value: 'podcast-channel',
              display: '闖天下',
              size: {
                w: 1024,
                h: 1024,
              },
            },
            {
              value: 'english',
              display: '英網',
              size: {
                w: 1024,
                h: 1024,
              },
            },
            {
              value: 'podcast-list',
              display: '聽天下選單',
              size: {
                w: 1024,
                h: 1024,
              },
            },
            {
              value: 'weekly-popular',
              display: '本週最熱文章',
              size: {
                w: 1024,
                h: 1024,
              },
            },
            {
              value: 'specific-recommendation',
              display: '專屬文章推薦',
              size: {
                w: 1024,
                h: 1024,
              },
            },
          ];
          break;
        case 'instagram':
          this.types = [
            {
              value: 'ig-cw-picture-post',
              display: '天下圖擊圖卡',
              size: {
                w: 1080,
                h: 1080,
              },
            },
            {
              value: 'ig-cw-picture-story',
              display: '天下圖擊限動',
              size: {
                w: 1080,
                h: 1920,
              },
            },
            {
              value: 'ig-summary-post',
              display: '書摘圖卡（金句類）',
              size: {
                w: 1080,
                h: 1080,
              },
            },
            {
              value: 'ig-summary-story',
              display: '書摘限時動態',
              size: {
                w: 1080,
                h: 1920,
              },
            },
            {
              value: 'ig-quote-post',
              display: '金句圖卡',
              size: {
                w: 1080,
                h: 1080,
              },
            },
            {
              value: 'ig-quote-story',
              display: '金句限動',
              size: {
                w: 1080,
                h: 1920,
              },
            },
            {
              value: 'ig-faq-word-story',
              display: '問答限動（文字版）',
              size: {
                w: 1080,
                h: 1920,
              },
            },
            {
              value: 'ig-faq-picture-story',
              display: '問答限動（有圖版）',
              size: {
                w: 1080,
                h: 1920,
              },
            },
          ];
          break;
        case 'edm':
          this.types = [
            {
              value: 'economist-podcast',
              display: '經濟學人聽天下首圖',
              size: {
                w: 1600,
                h: 1072,
              },
            },
          ];
          break;
        case 'youtube':
          this.types = [
            {
              value: 'enterprise',
              display: '企業類型',
              size: {
                w: 1920,
                h: 1080,
              },
            },
            {
              value: 'investigation',
              display: '調查報導',
              size: {
                w: 1920,
                h: 1080,
              },
            },
            {
              value: 'interview',
              display: '人物專訪',
              size: {
                w: 1920,
                h: 1080,
              },
            },
            {
              value: 'podcast',
              display: 'Podcast',
              size: {
                w: 1920,
                h: 1080,
              },
            },
            {
              value: 'sustainable',
              display: '永續報導',
              size: {
                w: 1920,
                h: 1080,
              },
            },
            {
              value: 'forum',
              display: '論壇精華',
              size: {
                w: 1920,
                h: 1080,
              },
            },
          ];
          break;
        case 'webpush':
          this.types = [
            {
              value: 'webaccess',
              display: '訂戶專屬',
              size: {
                w: 1024,
                h: 512,
              },
            },
            {
              value: 'covid19',
              display: '疫情更新',
              size: {
                w: 1024,
                h: 512,
              },
            },
          ];
          break;
        default:
          this.types = [];
          break;
      }
    },
  },
};
</script>

<style lang="scss">
body main p {
  font-size: inherit;
  margin-top: 0;
  margin-bottom: 0;
}
.ck.ck-content {
  height: 60px;
}
</style>
<style lang="scss" scoped>
.form__group--ckeditor {
  .form__group__placeholder {
    top: 3rem;
    z-index: 1;
  }
}
</style>
