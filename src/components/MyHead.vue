<template>
  <div id="head" :style="changeback">
    <div class="head-two">
      <span
        id="up-arow"
        class="iconfont icon-xiangxiajiantou"
        v-show="!isshow"
        @click="backdetail"
      ></span>
      <span class="head-one" v-show="isshow">网易云音乐</span>
      <div class="arow-content">
        <span :style="twochangeback" class="left-arow" @click="goback"
          ><i class="iconfont icon-xiangzuojiantou"></i
        ></span>
        <span :style="twochangeback" class="right-arow" @click="goforword"
          ><i class="iconfont icon-xiangyoujiantou"></i
        ></span>
        <span class="middle-head">
          <span :style="twochangeback" @click="serachlist" class="sousuo"
            ><i class="iconfont icon-sousuo"></i
          ></span>
          <input
            :style="twochangeback"
            v-model=" searchList.keyword"
            type="text"
            placeholder="忘记时间-胡歌"
            @keyup.enter="serachlist"
          />
        </span>
        <span :style="ichangecolor" class="listen"
          ><i class="iconfont icon-tinggeshiqu"></i
        ></span>
      </div>
    </div>
    <div class="head-three">
      <!--头像区-->
      <div class="head-left"  >
        <span class="imglist" v-show="isshow"
          ><img :src=userImg
        /></span>
        <span     class="userinfo" :style="ichangecolor" v-show="isshow"
          >{{username}}</span
        >
        <span class="bottom-arrow" v-show="isshow"  @click=" openpersonal"
          ><i class="iconfont icon-caret-bottom"  @click="openlogin"  ></i
        ></span>
        <span class="vip" v-show="isshow">vip开通> </span>
      </div>

      <div class="head-four" :style="ichangecolor">
        <span v-if="isshow" class="iconfont icon-yifu"></span>
        <div class="share" v-show="!isshow">
          <span class="iconfont icon-fangda"></span>
          <span>全屏共享</span>
        </div>
        <span class="iconfont icon-shezhi"></span>
        <span class="iconfont icon-envelope"></span>
        <span class="sparte">|</span>
        <span class="iconfont icon-minimize"></span>
        <span class="iconfont icon-minimizing"></span>
        <span class="iconfont icon-zuidahua"></span>
        <span class="iconfont icon-guanbi_o"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyHead",
  data() {
    return {
       searchList: {
        keyword: '',
        limit: 60,
        offset:0,
        type: 1, //默认为单曲
      },
     // keyword: "",
      userimg:require('../assets/images/1.jpg'),
      styleObject: {
        backgroundColor: "rgb(71, 145, 235)",
      },
      destyleObject: {
        backgroundColor: "rgba(220,220,220,0.4)",
        // backgroundImage: 'linear-gradient(rgb(220,220,220),rgb(243, 243, 243))'
      },
      beforetwocolor: {
        backgroundColor: "rgb(65, 133, 216)",
        color: "rgba(255, 255, 255, 0.458)",
      },
      aftercolor: {
        backgroundColor: "rgb(230,230,230)",
        color: "black",
        
      },
      beforeicolor: {
        color: "rgba(255, 255, 255, 0.858)",
      },
      aftericolor: {
        color: "rgba(0, 0, 0, 0.302)",
      },
    };
  },

  methods: {
    serachlist() {
      this.$router.push({
        path: "/search",
        query: { keywords: this.keyword },
      });
      const {keyword,limit,offset,type} = this.searchList
      this.$store.dispatch("getsearchmusic",{keyword,limit,offset,type});
    },
    //跳转歌词页面
    backdetail(){
      this.$store.state.music.isshow = false
       this.$router.go(-1)
    },
    //前进后退导航键
    goback(){
      this.$router.go(-1)
    },
    goforword(){
      this.$router.go(1)
    },
    //打开登录组件
    openlogin(){
      if( !this.$store.state.user.token){
         this.$store.state.home.loginshow = true

      }else{
        
      }
    },
    //打开个人中心
    openpersonal(){
      if(this.$store.state.user.token){
        this.$store.state.home.personalshow = !this.$store.state.home.personalshow
      }
    }

  },
  computed: {
    isshow() {
      if (this.$route.path == "/detail") {
        return false;
      } else return true;
    },
    changeback() {
      if (this.$route.path == "/detail") {
        return this.destyleObject;
      } else {
        return this.styleObject;
      }
    },
    twochangeback() {
      if (this.$route.path == "/detail") {
        return this.aftercolor;
      } else {
        return this.beforetwocolor;
      }
    },
    ichangecolor() {
      if (this.$route.path == "/detail") {
        return this.aftericolor;
      } else {
        return this.beforeicolor;
      }
    },
    //用户姓名
    username(){
      if( !this.$store.state.user.token ){
        return '未登录'
      }
      else{
        return this.$store.state.user.profile.nickname
      }
     },
     //用户头像
     userImg(){
       if( !this.$store.state.user.token ){
        return this.userimg
      }else{
        return this.$store.state.user.profile.avatarUrl
      }
     } 
  },
};
</script>

<style lang="less" scoped>
#head {
  //background-color: rgb(71, 145, 235);
  width: 100%;
  height: 8.3vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow-x: hidden;
  z-index: 19;
  .head-two {
    width: 35vw;
    align-content: center;
    position: relative;
    display: flex;
    align-items: center;
    left: 3%;
    #up-arow {
      //margin-left:-1vw;
      position: absolute;
      left: -1vw;
      cursor: pointer;
    }
    .head-one {
      color: rgb(255, 255, 255);
      font-size: 18px;
      margin-right: 5.7vw;
      width: 10vw;
      display: inline-block;
      text-align: center;
      position: absolute;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
    }
    .arow-content {
      width: 40vw;
      height: 100%;
      position: absolute;
      left: 13vw;
      bottom: 2.4vh;
      // margin-bottom:1.5vh;
      .left-arow {
        display: inline-block;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        cursor: pointer;
        //background-color: rgb(65, 133, 216);
        text-align: center;
        i {
          font-size: 12px;
          //color: rgba(255, 255, 255, 0.458);
          //color:rgba(0, 0, 0, 0.302);
        }
      }
      .right-arow {
        display: inline-block;
        width: 22px;
        margin-left: 9px;
        height: 22px;
        border-radius: 50%;
        background-color: rgb(65, 133, 216);
        text-align: center;
        cursor: pointer;
        i {
          font-size: 12px;
          //color: rgba(255, 255, 255, 0.458);
        }
      }
    }

    .middle-head {
      margin-left: 10px;
      position: relative;
      .sousuo {
        position: absolute;
        top: 25%;
        left: 10px;
        //color: rgba(255, 255, 255, 0.726);
      }
      //input框的预览内容调节样式
      ::-webkit-input-placeholder {
        color: #babbc1aa;
        font-size: 12px;
        padding-left: 5px;
      }
      input {
        border-radius: 16px;
        border: none;
        width: 125px;
        height: 27px;
        outline: none;
        padding-left: 30px;
        // color:white;
        // background-color: rgb(68, 139, 226);
      }
    }
    .listen {
      display: inline-block;
      position: relative;
      left: 10px;
      top: 4px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      //background-color: rgb(65, 133, 216);
      text-align: center;
      i {
        font-size: 25px;
        display: inline-block;
        // color: rgba(255, 255, 255, 0.726);
      }
    }
  }
  .head-three {
    width: 440px;
    position: absolute;
    display: flex;
    text-align: center;
    align-items: center;
    //background-color: antiquewhite;
    right:1vw;
    .head-left {
      width: 20vw;
      display: flex;
      align-items: center;
      .imglist {
        display: inline-block;
        width: 30px;
        img {
          border-radius: 50%;
          width: 100%;
          height: auto;
        }
      }
      .userinfo {
        width:4.5vw;
        margin-left:0.1vw;
        margin-right:0.1vw;
        font-size: 12px;
        //color:rgba(255, 255, 255, 0.858);
      }
      .userinfo:hover {
        cursor: pointer;
      }
      .bottom-arrow {
        // color:rgba(255, 255, 255, 0.858);
        font-size: 12px;
        i{
          cursor: pointer;
        }
      }
    }
    .head-four {
      // position: absolute;
      //right:0.1vw;
      width: 39vw;
      display: flex;
      .share {
        //position: absolute;
        right: 13vw;
        top: 0.7vh;
        display: flex;
        align-items: center;
        span {
          font-size: 12px;
        }
        span:last-child {
          width: 4vw;
        }
        span:first-child {
          width: 1vw;
          padding-left: 1vw;
        }
      }
      .sparte {
        //position: absolute;
        margin-top:0.5vh;
        font-size: 6px;
      }
      .icon-yifu {
        margin-left: 1vw;
      }
      span {
        margin-right: 1vw;
        font-size: 20px;
        // color:rgba(255, 255, 255, 0.612);
      }
      span:last-child {
        margin-right: 0;
      }
      span:hover {
        // color:white;
        cursor: pointer;
      }
    }

    .vip {
      display: block;
      width: 60px;
      height: 15px;
      line-height: 15px;
      font-size: 12px;
      background-color: rgb(204, 204, 204);
      color: rgb(246, 246, 246);
    }
  }
  .head-three:hover .userinfo,
  .bottom-arrow {
    color: white;
  }
}
</style>