//对axios的二次封装
import axios from 'axios'
import { setToekn,getToken } from '@/utils/token'
//利用axios对象的create方法，去创建axios的实例
// start:代表进度条开始，done:代表进度条结束
//引入进度条样式
//引入数据仓库
import store from '@/store/index'
//引入本地存储token函数
//import {setToekn,getToken} from '@/utils/token'
//创建axios实例
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现api
    baseURL:'',
    timeout:5000,
    withCredentials:true , //允许请求携带cooike
})
//请求拦截器
requests.interceptors.request.use((config) =>{
    //存储用户信息
  /*  
        config.headers.token = store.state.user.token
    }*/
    if(store.state.user.token){
        setToekn(store.state.user.token)
        //config.headers.token = store.state.user.token
    }
    return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    //nProgress.done()
    return res.data
},
() =>{
    alert("服务器响应数据失败")
})

export default requests