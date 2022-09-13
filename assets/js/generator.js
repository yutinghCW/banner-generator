import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const app = createApp({
  data() {
    return {
      social: {
        select: 'line',
        items: [
          {
            value: 'line',
            display: 'LINE',
          },
          {
            value: 'facebook',
            display: 'Facebook',
          },
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
            value: 'web',
            display: '官網',
          },
          {
            value: 'webpush',
            display: 'Web Push',
          },
        ],
      },
      type: {
        select: null,
        items: [
          {
            value: 'popular articles',
            display: '熱文',
            size: {
              w: 1024,
              h: 1024
            },
          },
          {
            value: 'cw podcast',
            display: '聽天下',
            size: {
              w: 1024,
              h: 1024
            },
          },
          {
            value: 'cw podcast teenager',
            display: '闖天下',
            size: {
              w: 1024,
              h: 1024
            },
          },
          {
            value: 'english',
            display: '英網',
            size: {
              w: 1024,
              h: 1024
            },
          },
          {
            value: 'cw podcast list',
            display: '聽天下選單',
            size: {
              w: 1024,
              h: 1024
            },
          },
          {
            value: 'weekly popular articles',
            display: '本週最熱文章',
            size: {
              w: 1024,
              h: 1024
            },
          },
          {
            value: 'specific recommendation',
            display: '專屬文章推薦',
            size: {
              w: 1024,
              h: 1024
            },
          },
        ],
      },
      value: {
        title: {
          limit: 19,
          value: '',
        },
        subtitle: {
          limit: 19,
          value: '',
        },
        content: {
          limit: null,
          value: '',
        },
        cta: {
          limit: 10,
          value: '',
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
    }
  },
  mounted() {
    $('body').find('#file_upload').on('change',function(){
      const file = $('#file_upload').prop('files')[0];
      if ( file ) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function(e) {
          const result = e.target.result;
          $('.img-uploaded').html(`<img id="preview-img" src="${result}" width="100%" />`);        
        }
      }
    });  
  },
  methods: {},
  watch: {
    "social.select": function() {
      switch (this.social.select) {
        case 'line':
          
          break;
        default:
          break;
      }
    },
  },
})

app.mount('#app')
