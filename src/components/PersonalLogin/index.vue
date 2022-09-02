<template>
  <div id="personal"   v-show="$store.state.home.personalshow">
    <!--第一块区域-->
    <ul class="first">
      <li>
        <span>0</span>
        <span>动态</span>
      </li>
      <li>
        <span>3</span>
        <span>关注</span>
      </li>
      <li>
        <span>0</span>
        <span>粉丝</span>
      </li>
    </ul>
    <!--第二层区域-->
    <div class="second">
      <div class="box">
        <span><i class="iconfont icon-zuijinbofang"></i></span>
        <span>签到</span>
      </div>
    </div>
    <!--第三层区域-->
    <ul class="three">
      <li>
        
          <span class="iconfont icon-hehuoren-huiyuanzhongxin"></span>
          <span>会员中心</span>
          <span class="iconfont icon-xiangyoujiantou"></span>
        
      </li>
      <li>
        
          <span class="iconfont icon-dengji"></span>
          <span>等级</span>
          <span class="iconfont icon-xiangyoujiantou"></span>
        
      </li>
      <li>
        
          <span class="iconfont icon-shouye"></span>
          <span>商城</span>
          <span class="iconfont icon-xiangyoujiantou"></span>
        
      </li>
      <li>
        
          <span class="iconfont icon-gerenxinxi"></span>
          <span>个人信息设置</span>
          <span class="iconfont icon-xiangyoujiantou"></span>
        
      </li>
      <li>
        
          <span class="iconfont icon-bangding"></span>
          <span>绑定社交账号</span>
          <span class="iconfont icon-xiangyoujiantou"></span>
      </li>
      <li>
          <span class="iconfont icon-kefu"></span>
          <span>我的客服</span>
          <span class="iconfont icon-xiangyoujiantou"></span>
      </li>
      <li  @click="outLogin">
          <span class="iconfont icon-tuichudenglu"></span>
          <span >退出登录</span>
          <span v-show="false" class="iconfont icon-xiangyoujiantou"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PersonalLogin",
  methods: {
    outLogin(){
        //派发action
        this.$store.dispatch('OutLogin')
    }
  },
};
</script>

<style lang="less" scoped>
#personal {
  width: 280px;
  height: 420px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  position: absolute;
  z-index: 999;
  background-color: rgb(252, 252, 252);
  right:17vw;
  top: 8.4vh;
  border-radius: 4px;
  //第一个区域
  .first {
    width: 100%;
    height: 60px;
    //background-color: antiquewhite;
    display: flex;
    align-items: center;
    li {
      width: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      span {
        color: black;
        &:first-child {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 0.7vh;
        }
        &:last-child {
          color: rgba(0, 0, 0, 0.616);
          font-size: 12px;
        }
      }
      &:first-child {
        margin-left: 1.5vw;
      }
    }
  }
  //第二个区域
  .second {
    width: 90%;
    height: 50px;
    //background-color: antiquewhite;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.138);
    .box {
      width: 80px;
      height: 30px;
      border: 1px solid rgba(0, 0, 0, 0.171);
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      span {
        margin-right: 0.3vw;
        font-size: 14px;
      }
    }
  }
  //第三个区域
  .three {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    li {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 13px;
      cursor: pointer;
      border-bottom:1px solid rgba(0, 0, 0, 0.047);
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(4){
        border-bottom: none;
      }
       span {
          &:last-child {
            position: absolute;
            right: 10px;
            margin-top:4px;
            font-size: 12px;
          }
          &:first-child {
            margin-right: 0.6vw;
            margin-left: 1vw;
          }
        
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.073);
      }
    }
  }
}
</style>