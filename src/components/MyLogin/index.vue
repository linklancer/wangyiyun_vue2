<template>
  <div id="login"  v-if="$store.state.home.loginshow">
    <!--关闭图标处-->
    <div class="close">
      <span class="iconfont icon-guanbi_o"  @click="closelogin"></span>
    </div>
    <!--放置网易图标处-->
    <div class="img">
      <img src="@/assets/images/网易云.png" />
    </div>
    <!--登录框表单  目前只有验证码登录较好-->
    <div class="from-container">
      <form>
        <!--选择国家地区，输入账号区域
        v-validate="{required:true,regex:/^1\d{10}$/ }" :class="{invalid:errors.has('phone')}"
        v-model="code" v-validate="{required:true,regex:/\d{6}$/ }" :class="{invalid:errors.has('code')}"
        -->
        <span class="iconfont icon-mobile"></span>
        <select name="nation" class="nation">
          <option value="china">+86</option>
          <option value="english">+89</option>
          <option value="hongkong">+97</option>
        </select>
        <input   autocomplete="off" type="text" placeholder="请输入手机号" class="phone" name="phone" v-model="phone"   v-validate="{required:true,regex:/^1\d{10}$/ }" :class="{invalid:errors.has('phone')}"  />
        
         <span class="error-msg1">{{errors.first('phone')}}</span>
        <br />
        <span><i class="iconfont icon-yanzhengma"></i></span>
        <input   autocomplete="off" type="text" name="code" placeholder="请输入验证码" class="yanzheng"  v-model="code" v-validate="{required:true,regex:/\d{4}$/ }" :class="{invalid:errors.has('code')}"  />
         <span class="error-msg2">{{errors.first('code')}}</span>
         <span class="text-area">|</span>
        <span class="getcode"  @click="getcode(phone)"  v-if="codeshow">获取验证码</span>
        <span  class="getcode"  v-if="!codeshow">重新发送{{count}}秒</span>
        <div class="check-box">
          <input type="checkbox" />
          <span>自动登录</span>
          <span>密码登录</span>
        </div>
      </form>
    </div>

    <!--登录或者注册字段-->
    <div class="Login">
      <span @click="clickLogin">登录</span>
      <span>注册</span>
    </div>
    <!--下方其他登录选择-->
    <div class="others">
      <span class="iconfont icon-weixin"></span>
      <span class="iconfont icon-QQ"></span>
      <span class="iconfont icon-89"></span>
      <span class="iconfont icon-wangyiyunyinle"></span>
    </div>
    <!--最后一块 v-validate="{required:true,tongyi:true}" :class="{invalid:errors.has('agree')}"-->
    <span class="error-msg3">{{errors.first('agree')}}</span>
    <div class="last-area">
      <input type="checkbox" name="agree" v-model="agree" v-validate="{required:true,tongyi:true}" :class="{invalid:errors.has('agree')}"  />
      <br>
       
      <span class="first">同意</span>
      <span>《服务条款》</span>
      <span>《隐私政策》</span>
      <span>《儿童隐私政策》</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'MyLogin',
  data() {
    return {
         phone:'',
         code:'',
         agree:false,
         count:'60',
         codeshow:true,
         timer:'' //保存定时器
    }
  },
  methods: {
    closelogin(){
        this.$store.state.home.loginshow = false
    },
    //登录按钮,先验证
    async clickLogin(){
       const success = await this.$validator.validateAll()
       if(success){
          const {phone,code} = this;
          this.$store.dispatch('valiCode',{phone,code})
       }
    }, 
    //获取验证码
   getcode(){
         this.codeshow = false
        this.timer =  setInterval(()=>{
          this.count--
         },1000)
         alert('已经成功点击');
         const {phone} = this;
         console.log(phone)
         this.$store.dispatch('GetCode',phone)
         
   }
  },
  watch:{
    count(newvalue){
        //console.log(newvalue)
        if(newvalue == 0){
          this.codeshow = true
          //同时 关闭定时器
          clearInterval(this.timer)
        }
    }
  }
 
};
</script>

<style lang="less" scoped>
#login {
  width: 350px;
  height: 530px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  position: absolute;
  z-index: 9999;
  background-color: rgb(255, 255, 255);
  left: 40%;
  top: 10%;
  input {
    outline: none;
  }
  .error-msg1,
  .error-msg2,
  .error-msg3
  {
    //color:rgb(0, 123, 255);
    color:orange;
    font-size: 12px;
  }
  .error-msg1{
    position: absolute;
    top:22vh;
    left:3vw;
  }
  .error-msg2{
    position: relative;
    top:4vh;
    left:-12.5vw;
  }
  .error-msg3{
    position: absolute;
    bottom:4.5vh;
    left:3vw;
   // color:orange;
  }
  //close图标处
  .close {
    position: relative;
    left: 92%;
    top: 1vh;
    cursor: pointer;
    span {
      font-size: 20px;
    }
  }
  //网易云图标位置
  .img {
    width: 208px;
    height: 155px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  //表单登录
  .from-container {
    width: 100%;
    height: 140px;
    margin-top: 1vh;
    margin-left: 30px;
    .icon-mobile {
      position: relative;
      left: 16px;
      font-size: 14px;
    }
    .nation {
      width: 75px;
      height: 40px;
      padding-left: 16px;
      border: 1px solid rgba(0, 0, 0, 0.167);
      outline: none;
    }
    .phone {
      width: 170px;
      height: 36.7px;
      border: 1px solid rgba(0, 0, 0, 0.167);
      border-left: none;
      border-bottom: 0.5px solid rgba(0, 0, 0, 0.167);
      padding-left: 9px;
      &::-webkit-input-placeholder {
        color: rgba(0, 0, 0, 0.6);
        font-size: 12px;
        padding-left: 3px;
      }
    }
    .icon-yanzhengma {
      position: relative;
      left: 15px;
    }
    .yanzheng {
      padding-left: 12px;
      width: 138px;
      height: 36.7px;
      border: 1px solid rgba(0, 0, 0, 0.167);
      margin-left: -2.6px;
      border-top: none;
      border-right: none;
      padding-left: 20px;
      &::-webkit-input-placeholder {
        color: rgba(0, 0, 0, 0.6);
        font-size: 12px;
        padding-left: 3px;
      }
    }
    //竖线
    .text-area{
      position: relative;
      left:0.4vw;
      color: rgba(0, 0, 0, 0.227);
}
    //验证码部分
    .getcode {
      display: inline-block;
      width: 6.2vw;
      height: 38px;
      font-size: 12px;
      position: relative;
      top: -39px;
      left: 11.4vw;
      border: 1px solid rgba(0, 0, 0, 0.167);
      border-left: none;
      border-top: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.708);
    }
    //勾选框
    .check-box {
      position: absolute;
      top: 38vh;
      margin-left: 0.6vw;
      input {
        position: relative;
        top: 0.3vh;
        cursor: pointer;
      }
      span {
        display: inline-block;
        font-size: 13px;
        cursor: pointer;
        &:last-child {
          margin-left: 8.5vw;
          color: rgb(0, 89, 255);
        }
      }
    }
  }
  //登录注册字段
  .Login {
    width: 100%;
    height: 80px;
    display: flex;
    //background-color: aqua;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      display: inline-block;
      width: 300px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(255, 255, 255, 0.845);
      cursor: pointer;
      &:first-child {
        background-color: rgb(255, 58, 58);
        border-radius: 6px;
      }
      &:last-child {
        color: rgba(0, 0, 0, 0.737);
      }
    }
  }
  //其他登录选择
  .others {
    width: 100%;
    height: 50px;
    // background-color: aqua;
    display: flex;
    // justify-content: space-around;
    align-items: center;
    span {
      font-size: 25px;
      margin-right: 50px;
      cursor: pointer;
      &:first-child {
        margin-left: 40px;
      }
    }
  }
  //最后的条款
  .last-area {
    width: 100%;
    padding-left: 15px;
    input {
      position: relative;
      top: 1.7vh;
      cursor: pointer;
    }
    span {
      font-size: 13px;
      color: rgb(0, 153, 255);
      position: relative;
      left:1.5vw;
      top:-1vh;
      &:first-child{
         margin-left:2vw;
      }
     
    }
    .first {
      color: rgba(0, 0, 0, 0.692);
    }
  }
}
</style>