<template>
   <div class="aside"   v-if="isshow" >
    <!--第一个ul列表-->
    <ul class="aside-ulone" >
      <li @click="gohome">发现音乐</li>
      <li>播客</li>
      <li>视频</li>
      <li>关注</li>
      <li>直播</li>
      <li>私人FM</li>
    </ul>
    <!--我的音乐区-->
    <span class="mymusic" >我的音乐</span>
    <!--我的音乐具体区域-->
    <ul class="aside-two aside-ulone "  >
      <li><span class="iconfont icon-xiazai" ></span>本地与下载</li>
      <li><span class="iconfont icon-zuijinbofang" ></span>最近播放</li>
      <li><span class="iconfont icon-yun-yunpan-yuncunchu" ></span>我的音乐云盘</li>
      <li><span class="iconfont icon-yinle" ></span>我的播客</li>
      <li><span class="iconfont icon-jiaguanzhuren" ></span>我的收藏</li>
    </ul>
    <!--创建歌单区-->
    <div class="music-cart" >
      <span>创建的歌单<i class="iconfont icon-caret-bottom" ></i></span>
      <span class="iconfont icon-jiahao" ></span>
    </div>
    <!--喜欢音乐区-->
    <div class="like-music"  >
      <span class="iconfont icon-aixin1" ></span>
      <span>我喜欢的音乐</span>
      <span class="iconfont icon-aixin" ></span>
    </div>
   </div>
</template>

<script>
export default {
  name:'MyAside',
  computed:{
    isshow(){
      if(this.$route.path == '/detail'){
        return false
      }else return true
    }
  },
  methods: {
    gohome(){
     this.$router.push({
      path:'/home'
     })
    }
  },
}
</script>

<style lang="less" scoped>
 .aside{
  width: 13vw;
  height:auto;
  border-right: 1px solid rgba(0, 0, 0, 0.133);
  position: relative;
  z-index: 99;
  .aside-ulone{
    width:12vw;
    margin-left:1vw;
    margin-top:1vh;
    height:33vh;
    display: flex;
    flex-direction: column;
    li{
      width:12vw;
      height:5.5vh;
      line-height: 5.5vh;
      font-size: 15px;
      color: rgba(0, 0, 0, 0.84);
      border-radius: 2px;
    }
    li:hover{
      background-color: rgb(246,246,247);
      cursor: pointer;
    }
    li:first-child{
      font-weight: 800;
      font-size:17px;
    }
  }
  .aside-two{
    font-size: 14px; 
    margin-left:0.8vw;
    height:27.5vh;
    span{
        margin-right:0.5vw;
      }
     li:first-child{
      font-weight: 500;
      font-size:14px;
     
    }
  }
  .mymusic{
    display: inline-block;
    margin-left:1vw;
    margin-top:1.5vh;
    font-size:13px;
    color:rgba(0, 0, 0, 0.413)
  }
  .music-cart{
    width:14vw;
    margin-top:1.3vh;
    margin-left:1vw;
    span:first-child{
      color:rgba(0, 0, 0, 0.441);
    }
    span:last-child{
      margin-left:5vw;
      font-size:14px;
    }
    span{
      font-size:13px;
      i{
        font-size:13px;
        margin-left:0.2vw;
        color:rgba(0, 0, 0, 0.186);
      }
    }
  }
  .music-cart:hover span i{
    color:rgba(0, 0, 0, 0.505);
    cursor: pointer;
  }
  .like-music{
    width:11.5vw;
    height:5.5vh;
    line-height: 5.5vh;
    margin-left: 1.2vw;
    margin-top:1vh;
    border-radius: 2px;
    span{
      font-size:17px;
    }
    span:nth-child(2){
      font-size:14px;
      margin-left:0.4vw;
      color:rgba(0, 0, 0, 0.78);
    }
    span:last-child{
      position: relative;
      left:1.7vw;
      top:0.2vh;
      width:2vw;
      height:1vh;
      padding: 0 7px 0 7px;
      border-radius: 7px;
      border:1px solid rgba(0, 0, 0, 0.05)
    }
    span:first-child{
      position: relative;
      top:0.3vh;
    }
  }
  .like-music:hover{
     background-color: rgb(246,246,247);
     cursor: pointer;
  }

 }
</style>