import { createApp } from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import CKEditor from '@ckeditor/ckeditor5-vue';

import App from './App.vue';
import router from './router';

import 'bootstrap';

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.use(CKEditor);
app.mount('#app');
