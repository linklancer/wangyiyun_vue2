<template>
  <div id="playlist">
    <div class="playlists"  v-for="crea in Creatives" :key="crea.creativeId">
      <!--图片区-->
      <div class="imglist" >
        <img  :src="crea.uiElement.image.imageUrl"  />
      </div>
      <!--文字描述区-->
      <div class="textlist" >
        <span> {{crea.uiElement.mainTitle['title'] }}</span>
      </div>
      <!--播放量区域-->
      <div class="amount-listen">
        <span class="iconfont icon-bofang2"></span>
        <span>{{ parseInt(crea.resources[0].resourceExtInfo.playCount/10000)  || 100}}万</span>
      </div>
      <!--点击播放区域-->
      <div class="play-amount">
        <span class="iconfont icon-bofang3"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PlayList",
  computed: {
    ...mapGetters(["Creatives"]),
     
  },
  mounted() {
    //console.log("1111")
  },
};
</script>

<style lang="less" scoped>
#playlist {
  width: 100%;
  height:500px;
  display: flex;
  align-items: center;
  //justify-content:space-between;
  flex-wrap: wrap;
  position: relative;
  //background-color: antiquewhite;
  .playlists {
    width: 13.7vw;
    height: 32vh; //图片高度29vh
    position: relative;
    margin-right:5vw;
    margin-bottom:9vh;
    &:first-child{
        margin-left:7vw;
    }
    &:nth-child(5)  {
        margin-left:7vw;
    }
  
    &:hover .play-amount {
      opacity: 1;
    }
    &:hover {
      cursor: pointer;
    }
    .imglist {
      width: 100%;
      height: 29vh;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    //下方文字区
    .textlist {
      width: 100%;
      margin-top: 1vh;
      span {
        font-size: 14px;
      }
    }
    //播放量区域
    .amount-listen {
      position: absolute;
      top: 0.5vh;
      left: 9vw;
      width:5vw;
      display: flex;
      align-items: center;
      justify-content: center;
      //background-color: antiquewhite;
      span {
        font-size: 12px;
        color:white;
        &:first-child {
          font-size: 14px;
          margin-right: 0.3vw;
        }
      }
    }
    //点击播放区
    .play-amount {
      width: 30px;
      height: 30px;
      background-color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      text-align: center;
      position: absolute;
      top: 22.5vh;
      left: 11vw;
      transition: all 0.5s;
      opacity: 0;
      span {
        margin-left: 0.41vw;
        color: rgb(71, 145, 235);
        font-size: 20px;
      }
    }
  }
}
</style>