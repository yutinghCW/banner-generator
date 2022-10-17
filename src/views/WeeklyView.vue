<template>
  <div class="container">
    <div class="row align-items-start">
      <div class="col-md mb20">
        <div class="form__group form__group--outlined w-100">
          <div
            class="form__group--defalt"
            :class="{'hasValue': sheet.url}"
          >
            <label class="label form__group--defalt">
              <input
                v-model="sheet.url"
                type="email"
                class="form__group__input"
              >
              <div class="form__group__placeholder">請輸入 Google Spreadsheet Link</div>
            </label>
          </div>
        </div>
      </div>
      <div class="col-lg-2 col-md-3 mb20">
        <div class="form__group form__group--outlined w-100">
          <div
            class="form__group--defalt"
            :class="{'hasValue': sheet.tab}"
          >
            <label class="label form__group--defalt">
              <input
                v-model="sheet.tab"
                type="email"
                class="form__group__input"
              >
              <div class="form__group__placeholder">請輸入分頁名稱</div>
            </label>
          </div>
        </div>
      </div>
      <div class="col-md-auto mb20">
        <button
          @click="generator()"
          type="button"
          class="btn btn--contained"
        >產生圖卡</button>
      </div>
      <div class="col-md-12 my20">
        <div class="row justify-content-around">
          <div
            v-for="(item, index) in sheet.data"
            :key="item.副標"
            class="col-md-auto mb30"
          >
            <div
              :id="`preview${index}`"
              class="preview__section"
            >
              <div class="content">
                <img src="/images/cw-logo-white-primary.svg" alt="天下雜誌" class="logo">
                <h1>
                  {{ item['主標（單行最多7字，可拆2行）'] }}
                </h1>
                <h2>
                  {{ item['副標'] }}
                </h2>
                <p>
                  {{ item['前言（單行字數勿超出欄寬，最多5行）'] }}
                </p>
              </div>
            </div>
            <div class="text-center">
              <button
                @click="screenshot(`#preview${index}`)"
                type="button"
                class="btn btn--outlined"
              >下載單張</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="loader" v-if="loading.status">
        <div class="loader__animate">
          <div class="loader__icon"></div>
          <div class="loader__text text-center">
            {{ loading.wording }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import domtoimage from 'dom-to-image-more-v2';

export default {
  data() {
    return {
      sheet: {
        url: 'https://docs.google.com/spreadsheets/d/1Ulso-HgPvYk6Y70seeQ3FqjAzt9n-Rg6xg4kuXa9Fwc/edit#gid=1538708581',
        tab: '1008-1014',
        data: [],
      },
      loading: {
        status: false,
        wording: '載入資料中',
      },
      output: {
        width: 1040,
        height: 1040,
        ratio: 2,
      },
    };
  },
  methods: {
    generator() {
      this.loading.status = true;
      this.sheet.data = [];
      const id = this.sheet.url.split('/d/')[1].split('/edit')[0];
      const data = `https://opensheet.elk.sh/${id}/${this.sheet.tab}`;
      this.$http.get(data).then((response) => {
        response.data.forEach((item) => {
          if (item[''] !== '' && item[''] !== undefined && item[''] !== ' ') {
            this.sheet.data.push(item);
          }
          this.loading.status = false;
        });
      });
    },
    /* eslint-disable */
    screenshot(id) {
      const el = document.querySelector(id);
      const index = Number(id.split('preview')[1]);
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
        a.download = `weekly-${this.sheet.tab}-${index+1}-${today}.jpg`;
        a.click();
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
    },
    /* eslint-disable */
  },
};
</script>

<style lang="scss" scoped>
  .preview__section {
    position: relative;
    width: 520px;
    height: 520px;
    padding: 24.5px;
    background-color: white;

    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 100%;
      height: 100%;
      padding: 80px 25px 27px 25px;
      white-space: break-spaces;
      border: 1.4px solid #d60c18;
      &::before {
        content: '';
        display: block;
        position: absolute;
        bottom: -.5px;
        left: -.5px;
        width: 81px;
        height: 9px;
        background-color: #d60c18;
      }
    }
    img.logo {
      position: absolute;
      top: -.5px;
      right: -.5px;
      height: 30px;
    }
    h1 {
      margin: 0;
      color: #000000;
      font-size: 51.3px;
      font-weight: 300;
      line-height: 1.2;
    }
    h2 {
      margin-top: 33px;
      margin-left: 5px;
      margin-bottom: 0;
      color: #d60c18;
      font-size: 22px;
      font-weight: 600;
    }
    p {
      height: 6em * 1.475;
      margin-top: 13px;
      margin-left: 5px;
      margin-right: 5px;
      color: #595757;
      font-size: 18px;
      letter-spacing: 0.0475rem;
      line-height: 1.475;
    }
  }

  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }
</style>
