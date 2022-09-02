<template>
  <div id="hot">
    <div class="hot-container"  v-for="(hotlist,index) in Hotplaylist" :key="index">
      <!--图片区-->
      <div class="imglist">
        <div class="img">
          <img  :src="hotlist.resources[0].uiElement.image.imageUrl" />
        </div>
        <div class="play">
          <span class="iconfont icon-bofang3"></span>
        </div>
      </div>
      <!--右方文字区-->
      <ul class="textlist">
        <li><span  >{{hotlist.resources[0].resourceExtInfo.song.name}}</span></li>
        <li ><span >{{hotlist.resources[0].resourceExtInfo.songData.album.type}}</span></li>
        <li>
          <span >{{hotlist.resources[0].resourceExtInfo.song.ar[0].name}}</span>
          <span  ><i class="iconfont icon-bofang2"></i>{{parseInt(hotlist.resources[0].resourceExtInfo.song.dt/1000)}}万</span>
          <span  ><i class="iconfont icon-31shijian"></i>{{hotlist.resources[0].resourceExtInfo.songData.duration | durationTimeformat }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "HotPlayer",
  computed:{
    ...mapGetters(['Hotplaylist'])
    
  },
  filters:{
      durationTimeformat: function (value) {
      if (!value) return "00:00";
      let interval = Math.floor(value/1000);
      let minute = Math.floor(interval / 60)
        .toString()
        .padStart(2, "0");
      let second = (interval % 60).toString().padStart(2, "0");
      return `${minute}:${second}`;
    },
  }
};
</script>

<style lang="less" scoped>
#hot {
  width: 100%;
  height: 500px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  .hot-container {
    width: 35vw;
    height: 11vh;
    display: flex;
    align-items: center;
    //background-color: aqua;
    &:nth-child(1),
    &:nth-child(3){
      margin-left:7.6vw;
     }
     &:nth-child(3),
     &:nth-child(4){
      margin-top:-25vh;
     }
    //left:7.6vw;
    &:hover{
        cursor: pointer;
    }
    //图片区
    .imglist {
      width: 80px;
      height: 80px;
      position: relative;
      //background-color: aqua;
      .img {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .play {
        width: 30px;
        height: 30px;
        background-color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 6.5vh;
        left: 3vw;
        span {
          //margin-left: 0.41vw;
          color: rgb(71, 145, 235);
          font-size: 20px;
        }
      }
    }
    //文字区
    .textlist{
        width:25vw;
        height:100%;
        display:flex;
        flex-direction: column;
        justify-content: center;
        margin-top:0.4vh;
        border-radius: 5px;
        transition: all .2s;
        &:hover{
            background-color: rgba(0, 0, 0, 0.129);;
        }
        li{
            height:3.3vh;
            font-size: 12px;
            margin-left:0.4vw;
            &:first-child{
                font-size:13px;
                height:4vh;
                color:rgba(0, 0, 0, 0.886);
            }
            &:nth-child(2){
                span{
                     border:1px solid rgba(0, 0, 0, 0.289);
                     color:rgba(0, 0, 0, 0.442);
                }
            }
            &:nth-child(3){
                display: flex;
                align-items: center;
                //justify-content: center;
                span{
                    margin-right:1vw;
                    color:rgba(0, 0, 0, 0.442);
                }
                &:nth-child(2),
                &:nth-child(3){
                    i{
                        font-size: 10px;
                        margin-right:0.3vw;
                    }
                }
            }
        }
    }
  }
}
</style>