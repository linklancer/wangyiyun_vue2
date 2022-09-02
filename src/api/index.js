import requests from "./request";
//搜索音乐接口
export const getMusicList = (keyword,limit,offset,type)=>requests({
    url:'/cloudsearch',
    method:'post',
    params:{keywords:keyword,limit:limit,offset:offset,type:type}
})
//获取音乐url
export const getMusicUrl = (id)=> requests({
    url:'/song/url',
    method:'get',
    params:{id:id}
})
//获取歌词
export const getMusicLyric = (id)=> requests({
    url:'/lyric',
    method:'get',
    params:{id:id}
})
//获取轮播图数据
export const getBannerList = ()=>requests({
    url:'/banner',
    method:'get'
})
//获取首页信息
export const getHomeList = ()=>requests({
    url:'/homepage/block/page',
    method:'get'
})
//获取验证码
export const getCode = (phone)=> requests({
    url:'/captcha/sent',
    method:'post',
    params:{phone:phone,timestamp:new Date().getTime()}
})
//验证验证码
export const ValiCode = (phone,code)=> requests({
    url:'/captcha/verify',
    method:'post',
    params:{phone:phone,captcha:code}
})
//退出登录
export const outLogin = ()=> requests({
    url:'/logout',
    method:'post',
    params:{timestamp:new Date().getTime()}
})
//登录状态
export const LoginState = ()=> requests({
    url:'/login/status',
    method:'get'
})
//获取用户信息
export const getUseInfo = (uid)=>requests({
    url:'/user/detail',
    method:'get',
    params:{uid:uid}
})
//登录接口
export const Login = (phone,code)=>requests({
    url:'/login/cellphone',
    method:'post',
    params:{phone:phone,captcha:code,timestamp:new Date().getTime()}
})