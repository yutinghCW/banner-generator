import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const app = createApp({
  data() {
    return {
      page: 1,
      canvasT: null,
      ctx: null,
      canvasWidth: 1040,
      canvasHeight: 1040,
      lineWidth: null,
      HWratio: null,
      opac: 0,
      imgNaturalW: null,
    }
  },
  mounted() {
    $('body').find('#file_upload').on('change',function(){
      var file = $('#file_upload').prop('files')[0];
      if ( file ) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function(e) {
          $('.imgUploaded').html('<img id="previewImg" src="'+e.target.result+'"/>');        
          this.imgNaturalW = $('body').find('#previewImg').get(0).naturalWidth;
        }
      }
    });  
  },
  methods: {},
})

app.mount('#app');
