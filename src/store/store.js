import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import authenticate from './modules/authenticate';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    authenticate
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})