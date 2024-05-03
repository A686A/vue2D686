// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'
import router from './router'
import axios from 'axios'
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import store from './store'

Vue.config.productionTip = false
//将包挂载到vue的原型对象上
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:8080'

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  /* 如果是store：store则直接写为store即可*/
  store,
  components: { App },
  template: '<App/>'
})
