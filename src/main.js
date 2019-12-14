import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import 'bootstrap';
import '@/assets/css/ui.css';
import '@/assets/css/bootstrap.css';
import '@/assets/css/responsive.css';

library.add(faUserSecret);

Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
