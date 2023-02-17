/*
 * @Author: zsj 2318940149@qq.com
 * @Date: 2023-02-01 01:09:53
 * @LastEditors: zsj 2318940149@qq.com
 * @LastEditTime: 2023-02-05 10:23:26
 * @FilePath: \vue\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/gloable.css'
import request from './utils/request';
import store from '@/store';


Vue.config.productionTip = false

Vue.use(ElementUI,{size:"mini"});

Vue.prototype.request=request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
