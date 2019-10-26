import lang from 'element-ui/lib/locale/lang/vi'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/reset.css'
import {Loading, Message, MessageBox} from 'element-ui';
import Vue from 'vue';
locale.use(lang)
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
