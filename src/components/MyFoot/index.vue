<template>
  <div class="foot" ref="foot" >
    <!--切换之后的样式-->
    <transition name="lefttop">
      <div class="left-top" v-show="isshow" @click="backdetail">
        <span><i class="iconfont icon-xiangxiajiantou"> </i></span>
        <span><i class="iconfont icon-aixin1"></i></span>
        <span><i class="iconfont icon-shoucang"></i></span>
        <span><i class="iconfont icon-xiazai"></i></span>
        <span><i class="iconfont icon-fenxiang"></i></span>
      </div>
    </transition>
    <!--左部显示歌词部分-->
    <transition name="foot">
      <div class="foot-left" v-if="!isshow">
        <!--展示图片区-->
        <div class="img-mask" @click="godetail">
          <img :src="songurl" />
          <!--面罩-->
          <div class="rel-mask">
            <span class="iconfont icon-xiangshangjiantou"></span>
          </div>
        </div>
        <!--歌曲名与歌手-->
        <div class="songer">
          <span>{{ this.songname }}</span>

          <span>{{ this.songer }}</span>
        </div>
        <!--收藏-->
        <div class="shoucang-caper">
          <span class="iconfont icon-aixin1"></span>
        </div>
      </div>
    </transition>

    <!--中间播放器-->
    <MyAudio></MyAudio>
    <!--右边显示区域-->
    <div class="foot-right">
      <div class="music-quilty">
        <span>标准</span>
      </div>
      <div class="icon-list">
        <span class="iconfont icon-yinxiao"></span>
        <span class="iconfont icon-quxiaojingyin"></span>
        <span class="iconfont icon-peoples"></span>
        <span class="iconfont icon-bofangliebiao"></span>
      </div>
    </div>
  </div>
</template>

<script>
import MyAudio from "./MyAudio";
import { mapState } from "vuex";
export default {
  name: "MyFoot",
  components: { MyAudio },
  data() {
    return {
      localurl: require("@/assets/images/1.jpg"),
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      Songlist(state) {
        return state.music.SongList;
      },
    }),

    songname() {
      if (!(JSON.stringify(this.Songlist) == "{}")) {
        return this.Songlist.name;
      } else {
        return "忘记时间";
      }
    },
    songer() {
      if (!(JSON.stringify(this.Songlist) == "{}")) {
        return this.Songlist.ar[0].name;
      } else {
        return "胡歌";
      }
    },
    songurl() {
      if (!(JSON.stringify(this.Songlist) == "{}")) {
        return this.Songlist.al.picUrl;
      } else {
        return this.localurl;
      }
    },
    isshow() {
      if (this.$route.path == "/detail") {
        return true;
      } else {
        false;
      }
    },
    //当前歌曲的id
    songsId(){
      if(this.Songlist.al){
        return this.Songlist.id || 0
      }
    }
  },
  methods: {
    godetail() {
      this.$router.push({
        path: "/detail",
      })
    
    },
    isactive() {
      if (this.$route.path == "/detail") {
        return true;
      } else {
        false;
      }
    },
    backdetail(){
      this.$store.state.music.isshow = false
      this.$router.go(-1)
    }
  },
};
</script>

<style lang="less" scoped>
.lefttop-enter-active {
  animation: lefttop-in 0.4s;
}
.lefttop-leave-active {
  animation: lefttop-in;
}
@keyframes lefttop-in {
  0% {
    top: -2vh;
  }
  100% {
    top: 0;
  }
}
.foot-enter-active {
  animation: foot 0.4s;
}
.foot-leave-active {
  animation: foot ;
}
@keyframes foot {
  0% {
    top: 3vh;
  }
  100% {
    top: 0;
  }
}

.foot {
  width: 100%;
  height: 10vh;
  position: absolute;
  bottom: 0px;
  display: flex;
  background-color: rgb(243, 243, 243);
  border-top: 1px solid rgba(0, 0, 0, 0.133);
  //切换之后的左边

  .left-top {
    display: flex;
    position: absolute;
    z-index: 10;
    height: 100%;
    align-items: center;
    cursor: pointer;
    span:first-child {
      border: none;
      margin-right: 2vw;
      margin-left: 1vw;
      i {
        font-size: 15px;
      }
    }
    span:hover{
      cursor: pointer;
    }
    span {
      display: inline-block;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.176);
      display: flex;
      align-items: center;
      margin-right: 1vw;
      i {
        font-size: 20px;
        display: flex;
        padding-left: 6px;
      }
    }
  }
  //左边歌曲歌名地区
  .foot-left {
    position: absolute;
    display: flex;
    margin-left: 0.6vw;
    cursor: pointer;
    .img-mask {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
        margin-top: 12.5px;
        border-radius: 7px;
      }
      .rel-mask {
        width: 50px;
        height: 50px;
        border-radius: 7px;
        position: relative;
        top: -50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.918);
        visibility: hidden;
        span {
          color: white;
        }
      }
    }
    .img-mask:hover .rel-mask {
      visibility: visible;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.5;
      color: white;
      font-weight: 800;
    }
    .img-mask:hover img {
      filter: blur(2px);
    }
    .songer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 0.7vw;
      margin-top: 2.5vh;
      span {
        font-size: 15px;
        font-weight: 300;
        height: 20px;
        color: rgba(0, 0, 0, 0.865);
      }
      span:last-child {
        font-size: 12px;
      }
      span:first-child:hover {
        color: black;
        font-weight: 200px;
      }
      span:hover {
        cursor: pointer;
      }
    }
    .shoucang-caper {
      margin-left: 0.6vw;
      margin-top: 2vh;
      span {
        font-size: 20px;
        color: rgba(0, 0, 0, 0.546);
      }
      span:hover {
        color: rgba(0, 0, 0, 0.845);
        cursor: pointer;
      }
    }
  }

  //右边音效等设置区域
  .foot-right {
    width: 15vw;
    display: flex;
    justify-items: center;
    align-items: center;
    position: absolute;
    right: -0.5vw;
    bottom: 22px;
    .music-quilty {
      width: auto;
      height: 17px;
      font-size: 12px;
      display: flex;
      justify-content: center;
      padding: 0 2px 0 2px;
      align-items: center;
      border: 1px solid rgba(0, 0, 0, 0.47);
      border-radius: 3px;
      position: relative;
      left: 0.5vw;
      bottom: 0.2vh;
    }
    .music-quilty:hover {
      cursor: pointer;
    }
    .icon-list {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0.5vw;
      span {
        width: 2.7vw;
        font-size: 23px;
        color: rgba(0, 0, 0, 0.765);
      }
      span:hover {
        cursor: pointer;
      }
    }
  }
}
</style>