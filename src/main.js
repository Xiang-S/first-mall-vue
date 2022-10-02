import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible/flexible'
import md5 from 'js-md5';

Vue.use(Vant);

Vue.config.productionTip = false
Vue.prototype.$md5 = md5;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
