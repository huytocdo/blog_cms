import Vue from 'vue'
import store from './store/store';
import { router } from './routes';

import App from './App.vue'
import './plugins/element';
import './plugins/env';

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
