import Vue from 'vue'
import store from './store/store';
import { router } from './routes';

import App from './App.vue'
import './plugins/element.js'
import MediumEditor from './components/MediumEditor/MediumEditor.vue';

Vue.config.productionTip = false
Vue.component('medium-editor', MediumEditor)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
