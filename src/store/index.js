import Vue from "vue";
import Vuex from 'vuex'
import music from '@/store/music'
import home from '@/store/home'
import user from "@/store/user"
//使用插件
Vue.use(Vuex)

//对外暴露一个Store的一个实例
export default new Vuex.Store({
    modules:{
      music,
      home,
      user
    }
 })