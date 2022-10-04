import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible/flexible'
import md5 from 'js-md5';
import { Lazyload } from 'vant';

Vue.use(Lazyload);
Vue.use(Vant);

Vue.config.productionTip = false
Vue.prototype.$md5 = md5;
Vue.prototype.$baseApi='http://10.18.185.16:28019'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
