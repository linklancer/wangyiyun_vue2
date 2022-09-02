import { getCode,ValiCode,Login,outLogin } from "@/api"
import { getToken,setToekn,setaccount,setbinging,setprofile,getaccount,getbinding,getprofiles} from "@/utils/token";
import store from '@/store/index'
const state ={
    token:getToken(),
    account: JSON.parse(getaccount()),
    bindings:JSON.parse(getbinding()),
    profile:JSON.parse(getprofiles()),
    userinfo:''
}
const actions = {
    //发送验证码
    async GetCode (context,phone){
        let result = await getCode(phone)
               if(result.code == 200){
                 //console.log(result)
                alert('发送成功')
                  return 'ok'
               }
    },
    //验证验证码
    async valiCode(context,data){
        const {phone,code} = data
        //console.log(data)
        let result = await ValiCode(phone,code)
        if(result.code == 200){
            //console.log(result)
            alert('验证成功')
            context.dispatch('Logining',{phone,code})
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //登录接口
    async Logining(context,data){
        const {phone,code} = data
        let result = await Login(phone,code)
        if(result.code == 200){
           // console.log(result)
            store.state.home.loginshow = false
            context.commit('LOGINING',result)
           alert('登录成功')
           
           
        }
        //
    },
    //退出登录
    async OutLogin(context){
        let result = await outLogin()
        if(result.code == 200){
            //清除本地存储
             localStorage.clear()
            context.commit('OUTLOGIN')
            store.state.home. personalshow = false
            alert('退出登录成功')
            //清楚token
           
        }
    }
}
const mutations ={
    //登录
   LOGINING(state,result){
     state.token = result.token
     state.userinfo = result
     state.account = result.account
     state.bindings = result.bindings
     state.profile = result.profile
     //存储token到本地
     setToekn(result.token)
     //存储用户所有信息到本地
     setaccount( JSON.stringify(result.account))
     setbinging( JSON.stringify(result.bindings))
     setprofile(JSON.stringify(result.profile))
    },
    //清除Vuex里面的数据
    OUTLOGIN(state){
        state.profile = ''
    }
} 
const getters={}
export default  {
    state,
    mutations,
    actions,
    getters
}