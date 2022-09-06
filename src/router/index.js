//配置路由
import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes'


//使用路由
Vue.use(VueRouter)

//先把VueRouter原型上的push方法保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写push
//第一个参数，告诉原来push方法往哪里跳转
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else {
        originPush.call(this,location,() =>{},() =>{})
    }
}
//重写replace
//第一个参数，告诉原来push方法往哪里跳转
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else {
        originReplace.call(this,location,() =>{},() =>{})
    }
}
//对外暴露路由信息
let router =  new VueRouter({
    mode:'history',
    routes,
})

export default router