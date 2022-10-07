import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {postKeyValueRequest} from "@/utils/api";
import {putRequest} from "@/utils/api";
import {getRequest} from "@/utils/api";
import {deleteRequest} from "@/utils/api";
import {postRequest} from "@/utils/api";
import {initMenu} from "@/utils/menus";
// 引入图表库
import 'font-awesome/css/font-awesome.min.css'

Vue.prototype.postKeyValueRequest=postKeyValueRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.deleteRequest=deleteRequest;
Vue.prototype.postRequest=postRequest;


Vue.config.productionTip = false
Vue.use(ElementUI);

// 前置导航守卫
router.beforeEach((to, from, next)=>{
  console.log(from);
  console.log(to);
  // 去登陆页面
  if (to.path == "/") {
    next();
  } else {
    initMenu(router, store);
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
