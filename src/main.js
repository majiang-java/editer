// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import $ from 'webpack-zepto';
import $ from 'webpack-zepto';
import Vue from 'vue'
import moment from 'moment'
//import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import routes from './router-config'  // 引入router-config.js文件
import 'element-ui/lib/theme-default/index.css'

//Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ElementUI)
//import Grid from './Grid'
/* eslint-disable no-new */
//Vue.http.options.xhr = { withCredentials: true }
$.ajaxSettings.crossDomain = true;
Vue.filter('moment', function (value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
    return moment(value).format(formatString);
});

const router = new VueRouter({
      routes
})
new Vue({
  router
}).$mount('#app');
