import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
//注册全局组件
import MyLogin from '@/components/MyLogin'
import PersonalLogin from "@/components/PersonalLogin"
Vue.component(MyLogin.name,MyLogin)
Vue.component(PersonalLogin.name,PersonalLogin)
//引入表单验证插件
import '@/plugins/validata'
//按需引入ui组件
import { Pagination } from 'element-ui';
Vue.component(Pagination.name,Pagination)
Vue.config.productionTip = false
//引入表单验证插件

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this //配置全局事件总线
  }
  
}).$mount('#app')
