import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router';
import store from './store';
import axios from 'axios'
import VueAxios from 'vue-axios'

let app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(VueAxios, axios);
app.mount('#app');
