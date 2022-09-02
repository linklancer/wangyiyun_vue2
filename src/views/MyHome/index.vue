<template>
  <div id="home">
    <!--导航区-->
    <ul class="title-container" ref="ulcontainer">
      <li  @click="changetitle(index)" v-for="(title, index) in titles" :key="index">{{ title }}
        <span class="markline"  v-show="index == isshow" ></span>
      </li>

    </ul>
    <!--下方内容区-->
    <div class="text-container">
      <!--轮播图-->
      <banner-list></banner-list>
      <!--推荐歌单区-->
      <div class="playlist-container">
        <!--歌单标题-->
        <div class="playlist-title">
          <span>推荐歌单</span>
          <span class="iconfont icon-xiangyoujiantou"></span>
        </div>
        <!--下方歌单区-->
        <div class="play-container">
          <play-list></play-list>
        </div>
      </div>
      <!--热门播客区-->
      <div class="hot-player">
        <!--上方标题区-->
        <div class="player-title">
          <span>热门播客</span>
          <span class="iconfont icon-xiangyoujiantou"></span>
        </div>
        <!--下方内容区-->
        <div class="hot-texter">
          <hot-player></hot-player>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerList from "@/components/BannerList";
import PlayList from "@/components/PlayList";
import HotPlayer from '@/components/HotPlayer.vue';
export default {
  name: "MyHome",
  data() {
    return {
      titles: ["个性推荐", "专属定制", "歌单", "排行榜", "歌手", "最新音乐"],
      isshow:0 //用于控制下划线
    };
  },
  components: { BannerList, PlayList,HotPlayer },
  mounted() {
    this.$store.dispatch("getbanner");
    this.$store.dispatch("gethomeinfo");
    console.log(this.$refs.ulcontainer.childNodes)
  },
 methods: {
   changetitle(index){
    this.isshow = index
   }
 },
  
};
</script>

<style lang="less" scoped>
#home {
  width: 87vw;
  height: 100%;
  position: relative;
  margin-left: 13vw;
  margin-top: 8vh;
  overflow-x: hidden;
  //background-color: antiquewhite;
  //标题区
  .title-container {
    width: 100%;
    height: 10vh;
    display: flex;
    align-items: center;
    margin-left: 2vw;
    //position: fixed;
    li {
      font-size: 16px;
      margin-right: 1.5vw;
      position: relative;
      .markline{
        display:inline-block;
        position: absolute;
        top:4vh;
        left:2px;
        width:100%;
        height:2px;
        background-color: rgb(65, 133, 216);
        &:first-child{
          font-weight: 700;
          font-size:20px ;
          height:2.5px;
        }
      }
      &:hover {
        cursor: pointer;
      }
      &:first-child {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
  //下方内容区
  .text-container {
    width: 100%;
    height: 800px;
    overflow: auto;
    position: relative;
    //滚动条样式
    &::-webkit-scrollbar {
      width: 4px;
      height: 1px;
    }
    //滑块
    &::-webkit-scrollbar-thumb {
      background-color: rgba(51, 51, 51, 0.856);
    }
    //轨道部分
    &::-webkit-scrollbar-track {
      background-color: #eee;
    }
    //歌单推荐区
    .playlist-container {
      width: 100%;
      height: 600px;
      position: relative;
      //background-color: antiquewhite;
      //歌单标题区
      .playlist-title {
        width: 40vw;
        position: absolute;
        left: 7.5vw;
        span {
          &:first-child {
            font-size: 20px;
            font-weight: 700;
            margin-right: 0.3vw;
          }
          &:last-child {
            font-size: 16px;
            font-weight: 600;
          }
        }
      }
      //具体歌单区
      .play-container {
        width: 100%;
        height: 500px;
        position: relative;
        //background-color: aqua;
        //left:7.5vw;
        top: 4vh;
        display: flex;
      }
    }
    //热门播客区
    .hot-player{
      width:100%;
      height:800px;
      //background-color: antiquewhite;
      margin-top:2vh;
      position: relative;
      //上方标题区
      .player-title{
        width: 40vw;
        position: absolute;
        left: 7.5vw;
        span {
          &:first-child {
            font-size: 20px;
            font-weight: 700;
            margin-right: 0.3vw;
          }
          &:last-child {
            font-size: 16px;
            font-weight: 600;
          }
        }
      }
      //下方内容区
      .hot-texter{
        width:100%;
        height:100%;
        //background-color: antiquewhite;
        position: relative;
        top:4vh;
      }
    }
  }
}
</style>