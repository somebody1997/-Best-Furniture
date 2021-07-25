import { createApp } from 'vue';
import 'bootstrap';
import axios from 'axios';
import VueAxios from 'vue-axios';
import $ from 'jquery';
import App from './App.vue';
import router from './router';
import toCurrency from './assets/javascript/toCurrency';
import Toast from './components/Toast.vue';

window.$ = $;

const app = createApp(App);

app.config.globalProperties.$toCurrency = toCurrency;

app.use(VueAxios, axios);

app.component('Toast', Toast);

app.use(router);
app.mount('#app');
