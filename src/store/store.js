import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import authenticate from './modules/authenticate';
import post from './modules/post';
import category from './modules/category';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    authenticate,
    post,
    category
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})