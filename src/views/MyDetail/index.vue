<template>
  <transition name="detail">
    <div class="detail" v-show="$store.state.music.isshow">
      <my-head></my-head>
      <!--歌词标题部分-->
      <div class="song-title">
        <span>{{this.songname}}</span>
        <span>{{this.songer}} - {{this.songname}}</span>
      </div>
      <!--转盘上面的针钟-->
      <div class="swip-container"  ref="swiper"  :style="{transform:`rotate(${$store.state.music.showdeg})`}">
        <!--圆形部分-->
         <div class="time-mask">
          <div class="mask">
            <div class="pointer"></div>
          </div>
         </div>
         <!--较长的主体部分-->
         <div class="chang"></div>
         <!--较短的部分-->
         <div class="duan">
          <div class="mini-poiner"></div>
         </div>
         <!--盖帽前面-->
         <div class="middle-pointer"></div>
         <!--最右边部分-->
         <div class="tap-right">
          <!--两个小点-->
          <div class="one"></div>
          <div class="two"></div>
         </div>
      </div>
      <!--中间主体部分-->
      <div class="detail-container">
        <!--左边转盘-->
           <div class="max-mask"  >
          <div class="middle-mask" ref="maxmask">
            <div class="img-mask">
              <img :src=this.songurl  ref="rotate" />
            </div>
          </div>
        </div>
         <!--中间歌词部分-->
      <div class="songs-container"  ref="lyrics" >
         <ul   class="lyric"  ref="ullist" >
          <li ref="ListContainer" v-for="(lyric,index) in newLyric" :key="index" :style="{color: $store.state.music.lyricIndex == index ? 'black':'grey' , fontWeight:$store.state.music.lyricIndex == index ? 900 : 100}"  >{{lyric.words}}</li>
         </ul>
      </div>
     <!--右步来源区-->
    <div class="source-container"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import MyHead from "@/components/MyHead";
import {mapState,mapGetters} from 'vuex'
export default {
  name: "MyDetail",
  components: { MyHead },
  data() {
    return {
      isshow: false,
      localurl: require("@/assets/images/1.jpg"),
      deg:0,
    };
  },
  mounted() {
    this.$store.state.music.isshow= true;
    this.$store.state.music.mask= this.$refs.rotate
    this.$store.state.music.LyRic = this.$refs.lyrics
   
   //设置转盘转动
    this.$store.state.music.mask.style.animationPlayState = 'running'
   //console.log(this.$refs.offetHeight)
   //存储指针的ref到vuex里面
     this.$store.state.music.Swiper =  this.$refs.swiper
     this.$nextTick(function(){
      this.$store.state.music.ListCon = this.$refs.ListContainer
      //console.log(this.$refs.ListContainer)
     })
  },
  computed:{
    //获取经过数据处理的歌词
    ...mapGetters( ['newLyric']),
    ...mapState({
       Songlist(state) {
        return state.music.SongList;
      },
    }),
    //歌名
     songname() {
      if (!(JSON.stringify(this.Songlist) == "{}")) {
        return this.Songlist.name;
      } else {
        return "忘记时间";
      }
    },
    //歌手名字
    songer() {
      if (!(JSON.stringify(this.Songlist) == "{}")) {
        return this.Songlist.ar[0].name;
      } else {
        return "胡歌";
      }
    },
    //歌曲图片
     songurl() {
      if (!(JSON.stringify(this.Songlist) == "{}")) {
        return this.Songlist.al.picUrl;
      } else {
        return this.localurl;
      }
    },
  },

};
</script>

<style lang="less" scoped>
.detail-enter-to {
  animation: detail-in 0.5s;
}
.detail-leave-active {
  animation: detail-in 0.5s;
}
//进入的动画
@keyframes detail-in {
  0% {
    //top: 53vh;
    top:53vh;
    overflow: hidden;
  }
  100% {
    top: 0;
  }
}


//转盘特效
@keyframes animations1{
  0%{
    transform:  rotate(0deg);
  }
  50%{
     transform:  rotate(180deg);
  }
  100%{
     transform:  rotate(360deg);
  }
}
.detail {
  width: 100%;
  height: 90vh;
  position: absolute;
  //background-color: rgb(243, 243, 243);
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  background-image: linear-gradient(rgb(220,220,220),rgb(243, 243, 243));
  .song-title{
      //background-color: antiquewhite;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span{
        height:3vh;
      }
     span:first-child{
      font-size:28px;
      margin-bottom:2.8vh;
      color:rgb(49,49,49)
     }
     span:last-child{
      font-size:14px;
      color:rgba(0, 0, 0, 0.358);
     }
    }
    //跳转指针,转盘上方
    .swip-container{
      //width:150px;
      //height:100px;
      position: absolute;
      left:16vw;
      transition: all .5s;
      z-index: 111;
     // background-color: antiquewhite;
     //上方圆形部分
      .time-mask{
        width:20px;
        height:20px;
        border-radius: 50%;
        background-color: rgba(128, 128, 128, 0.128);
        display: flex;
        align-items: center;
        justify-content: center;
        //position: fixed;
        .mask{
          width:13px;
          height:13px;
          border-radius: 50%;
          //margin:0 auto;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          .pointer{
            width:4px;
            height:4px;
            border-radius: 50%;
            background-color:rgba(128, 128, 128, 0.19) ;
          }
        }
      }
      //长的部分
      .chang{
        width:5px;
        height:75px;
        background-color: white;
        position: absolute;
        left:40px;
        top:1px;
        //z-index:10;
        border-bottom: none;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 5px;
        transform: rotate(-50deg);
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.096);
      }
      //短的部分
      .duan{
        width:5px;
        height:45px;
        background-color: white;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.096);
        transform: rotate(96deg);
        position: absolute;
        left:89.6px;
        top:42.6px;
        //border-top-style: none;
        border-radius: 6px;
        .mini-poiner{
          width:1px;
          height:5px;
          position: absolute;
          left:2px;
          top:4px;
          background-color: rgba(0, 0, 0, 0.335);
          //transform: rotate(96deg);
         
        }
      }
      //盖帽
      .middle-pointer{
        width:16px;
        height:7px;
        border-radius: 30px;
        position: absolute;
        left:113px;
        top:64px;
        background-color: rgba(255, 255, 255, 0.692);
         transform: rotate(5deg);
      }
      //最后的东西
      .tap-right{
        width:10px;
        height:10px;
        background-color: white;
        border-top-right-radius: 6px;
        position: relative;
        left:128px;
        top:43px;
        transform: rotate(5deg);
        .one{
          width:6px;
          height:1px;
         background-color: rgba(0, 0, 0, 0.453);
          position: absolute;
          top:2px;
          left:1px;
        }
        .two{
           width:6px;
          height:1px;
          background-color: rgba(0, 0, 0, 0.453);
          position: absolute;
          top:8px;
          left:1px;
        }

      }
    }
  .detail-container {
    display: flex;
    justify-content: space-around;
    //转盘地区
    .max-mask {
      width: 18vw;
      height: 18vw;
      border-radius: 50%;
      background-color: rgb(218, 218, 218);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top:5%;
      //margin-left:6%;
      .middle-mask {
        width: 16vw;
        height: 16vw;
        border-radius: 50%;
        background-color: rgb(27, 28, 30);
        display: flex;
        align-items: center;
        justify-content: center;
        .img-mask {
          width: 12vw;
          height: 12vw;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            transform-origin: center center;
            transform: rotate(0deg);
            animation: animations1 20s linear infinite forwards;
            animation-play-state: paused;
          }
        }
      }
    }
     //滚动条样式
      ::-webkit-scrollbar{
        width:3px;
        height:1px;
        transition: all .7s;
      }
      //滑块
      ::-webkit-scrollbar-thumb{
        background-color: rgba(51, 51, 51, 0.3);
      }
      //轨道部分
      ::-webkit-scrollbar-track{
        background-color: #eee;
      }
    //歌词部分
    .songs-container{
      width:22vw;
      height:47vh;
      overflow:auto ;
      //transition: all 1s linear;
     .lyric{
      width:100%;
      margin-top:3vh;
      display:flex ;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      scroll-behavior:smooth;
      //transition: scroll .3s;
      li{
       height:50px;
       display: flex;
       flex-wrap: wrap;
       transition: color .7s;
       cursor: pointer;
      }
     }

    }
    //来源区
    .source-container{
      width:17vw;
      height:50vh;
      //background-color: aqua;
    }

  }
}
</style>