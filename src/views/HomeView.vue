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
        <div class="form__group form__group--ckeditor w-100 mb20">
          <h3 class="mb-0">標題</h3>
          <ckeditor
            :editor="editor"
            v-model="value.title.value"
            :config="editorConfig"
          ></ckeditor>
        </div>
        <div class="form__group form__group--ckeditor w-100 mb20">
          <h3 class="mb-0">副標</h3>
          <ckeditor
            :editor="editor"
            v-model="value.subtitle.value"
            :config="editorConfig"
          ></ckeditor>
        </div>
        <div class="form__group form__group--outlined w-100 mb20">
          <h3 class="mb-1">內文</h3>
          <div class="label form__group--defalt" :class="{'hasValue': value.content.value !== ''}">
            <textarea v-model="value.content.value" class="form__group__input"></textarea>
          </div>
        </div>
        <div class="form__group form__group--outlined w-100 mb20">
          <h3 class="mb-1">CTA 文字</h3>
          <div class="label form__group--defalt" :class="{'hasValue': value.cta.value !== ''}">
            <textarea
              v-model="value.cta.value"
              class="form__group__input"
              style="min-height: 80px;"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="col-md-6 d-flex flex-column align-items-center">
        <div class="preview__section" :class="type.select" id="preview">
          <div class="label">
            天下圖擊
          </div>
          <div class="title">
            <h2 v-html="value.subtitle.value"></h2>
            <h1 v-html="value.title.value"></h1>
          </div>
          <div class="imgarea">
            <img :src="value.img" :alt="value.title.value">
          </div>
          <p v-html="value.content.value"></p>
          <div class="swipe__cta" v-html="value.cta.value"></div>
        </div>
        <div class="text-center mt20">
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
        select: 'cw-picture-story',
      },
      types: [
        {
          value: 'cw-picture-post',
          display: '天下圖擊圖卡',
          size: {
            w: 1080,
            h: 1080,
          },
        },
        {
          value: 'cw-picture-story',
          display: '天下圖擊限動',
          size: {
            w: 1080,
            h: 1920,
          },
        },
        {
          value: 'summary-post',
          display: '書摘圖卡（金句類）',
          size: {
            w: 1080,
            h: 1080,
          },
        },
        {
          value: 'summary-story',
          display: '書摘限時動態',
          size: {
            w: 1080,
            h: 1920,
          },
        },
        {
          value: 'quote-post',
          display: '金句圖卡',
          size: {
            w: 1080,
            h: 1080,
          },
        },
        {
          value: 'quote-story',
          display: '金句限動',
          size: {
            w: 1080,
            h: 1920,
          },
        },
        {
          value: 'faq-1-story',
          display: '問答限動（文字版）',
          size: {
            w: 1080,
            h: 1920,
          },
        },
        {
          value: 'faq-2-story',
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
          limit: null,
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
          limit: 19,
          value: 'assets/images/cw-logo-white-primary.svg',
        },
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
          const a = document.createElement('a');
          a.href = dataUrl;
          a.download = 'image.jpg';
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
              value: 'cw-picture-post',
              display: '天下圖擊圖卡',
              size: {
                w: 1080,
                h: 1080,
              },
            },
            {
              value: 'cw-picture-story',
              display: '天下圖擊限動',
              size: {
                w: 1080,
                h: 1920,
              },
            },
            {
              value: 'summary-post',
              display: '書摘圖卡（金句類）',
              size: {
                w: 1080,
                h: 1080,
              },
            },
            {
              value: 'summary-story',
              display: '書摘限時動態',
              size: {
                w: 1080,
                h: 1920,
              },
            },
            {
              value: 'quote-post',
              display: '金句圖卡',
              size: {
                w: 1080,
                h: 1080,
              },
            },
            {
              value: 'quote-story',
              display: '金句限動',
              size: {
                w: 1080,
                h: 1920,
              },
            },
            {
              value: 'faq-1-story',
              display: '問答限動（文字版）',
              size: {
                w: 1080,
                h: 1920,
              },
            },
            {
              value: 'faq-2-story',
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
