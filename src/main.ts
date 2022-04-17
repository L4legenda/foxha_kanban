import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ru from 'element-plus/es/locale/lang/ru';


let app = createApp(App);
app.use(ElementPlus, {
    locale: ru,
});
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(VueAxios, axios);
app.mount('#app');
