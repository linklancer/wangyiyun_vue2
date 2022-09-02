<template>
  <div class="search-name">
    <div class="total">
      <span v-if="this.songCount">找到{{ this.songCount }}首歌曲</span>
    </div>
    <h1>
      搜索 <span v-if="Songs[0]">{{ Songs[0].al.name }} </span>
    </h1>
    <div class="intrest-text"><span>你可能感兴趣</span></div>
    <!--歌单区-->
    <div class="music-list">
      <div class="imglist">
        <img v-if="this.Songs[0]" :src="this.Songs[0].al.picUrl" />
      </div>
      <div class="detail-songer">
        <span v-if="Songs[0]">歌单: {{ Songs[0].al.name }}</span>
        <span>歌曲 {{ this.songCount }}, 播放:{{ music.listensum }}万</span>
      </div>
    </div>
    <!--列表展区-->
    <div class="menu-list">
      <ul>
        <li
          @click="changetitle(index)"
          v-for="(list, index) in ListTitle"
          :key="index"
        >
          {{ list }}
          <span class="markline" v-show="index == showline"></span>
        </li>
      </ul>
    </div>
    <!--播放全部-->
    <div class="play-total" ref="MYaui">
      <div class="play-left">
        <span class="iconfont icon-bofang1"></span>
        <span>播放全部</span>
        <span class="iconfont icon-jiahao"></span>
      </div>
      <div class="play-right">
        <span class="iconfont icon-xiazai"></span>
        <span>下载全部</span>
      </div>
    </div>
    <!--歌曲标题列表-->
    <ul class="song-title">
      <li class="li-one">音乐标题</li>
      <li class="li-two">歌手</li>
      <li class="li-three">专辑</li>
      <li class="li-four">时长</li>
      <li class="li-five">热度</li>
    </ul>
    <!--展示歌曲-->
    <div class="music-container">
      <ul
        v-show="isshow"
        @click="playmusic(song)"
        class="song-detail"
        v-for="(song, index) in this.Songs"
        :key="song.id"
      >
        <li class="li-only">
          <span><span v-if="index < 9"> 0</span>{{ index + 1 }}</span>
          <span class="iconfont icon-aixin1"></span>
          <span class="iconfont icon-xiazai"></span>
        </li>
        <li v-if="song" class="li-one">{{ song.alia[0] || song.name }}</li>

        <li v-if="song.ar[0]" class="li-two">
          {{ song.ar[0].name || song.ar[1].name }}
        </li>
        <li v-if="song" class="li-three">{{ song.al.name }}P</li>
        <li class="li-four">{{ song.dt | durationTimeformat }}</li>
        <li class="li-five"></li>
      </ul>
    </div>
    <!--分页器-->
    <div class="pagination">
       <el-pagination
    
      v-if="this.Songs"
      :small="true"
      background
      layout="prev, pager, next"
      :page-size="30"
      :total="this.songCount"
    >
    </el-pagination>
    </div>
   
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MySearch",

  data() {
    return {
      ListTitle: [
        "单曲",
        "歌手",
        "专辑",
        "视频",
        "歌单",
        "歌词",
        "博客",
        "声音",
        "用户",
      ],
      showline: 0, //控制下划线
      // musicname: "忘记时间",
      keyword: " ",
      music: {
        // bigName: "仙剑奇侠传三主题曲",
        // sum: 10,
        listensum: 135,
      },
      imgurl: "",
      isshow: false,
     /* searchList: {
        keyword: "",
        limit: 300,
        offset: 3,
        type: "1", //默认为单曲
      }, */
    };
  },

  created() {
    // this.getdata();
  },
  methods: {
    /*
    getdata() {
      this.$store.dispatch("getsearchmusic", this.keyword);
    }, */
    playmusic(song) {
      const { id } = song;
      this.$store.dispatch("GetMusicurl", id);
      this.$store.dispatch("GetMusicLyric", id);
      this.$store.state.music.MyAudio.autoplay = true;
      this.$store.state.music.MyAudio.play();
      this.$store.state.music.SongList = song; //传递此时点击的歌曲
    },
    //切换标题
    changetitle(index) {
      this.showline = index;
    },
  },
  computed: {
    ...mapState({
      songCount(state) {
        /*  if( !( JSON.stringify(state.music.songList) == '{}')){
            console.log('11111') */
        return state.music.songList.songCount || 10;
        // }   else return 100
      },
      Songs(state) {
        // if(  !(  JSON.stringify(state.music.songList) == '{}')){
        this.isshow = true;
        return state.music.songList.songs || {};
      },
    }),
  },
  filters: {
    durationTimeformat: function (value) {
      if (!value) return "00:00";
      let interval = Math.floor(value / 1000);
      let minute = Math.floor(interval / 60)
        .toString()
        .padStart(2, "0");
      let second = (interval % 60).toString().padStart(2, "0");
      return `${minute}:${second}`;
    },
  },
};
</script>

<style lang="less" scoped>
.search-name {
  width: 100%;
  height: 1000px;
  margin-left: 13vw;
  overflow: auto;
  position: relative;
  //top: 8.3vh;
  .total {
    position: absolute;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.395);
    // background-color: antiquewhite;
    right: 15vw;
    top: 21vh;
    // z-index: 999;
  }
  h1 {
    margin-top: 4vh;
    margin-left: 2.3vw;
    font-size: 20px;
    font-weight: 550;
  }
  .intrest-text {
    font-size: 12px;
    margin-top: 3.5vh;
    margin-left: 2.3vw;
    color: rgba(0, 0, 0, 0.707);
  }
  .music-list {
    width: 290px;
    height: 67px;
    border-radius: 5px;
    background-color: rgb(245, 245, 245);
    display: flex;
    font-size: 13px;
    margin-top: 2vh;
    align-items: center;
    margin-left: 2vw;
    .imglist {
      width: 40px;
      height: 40px;
      margin-left: 0.8vw;
      img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
      }
    }
    .detail-songer {
      display: flex;
      flex-direction: column;
      margin-left: 0.6vw;
      color: rgba(0, 0, 0, 0.859);
      span:last-child {
        font-size: 12px;
        margin-top: 7px;
        color: rgba(0, 0, 0, 0.33);
      }
    }
  }
  .menu-list {
    width: 100%;
    height: 6vh;
    // position: relative;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      margin-left: 2vw;
      li {
        width: 60px;
        position: relative;
        &:hover {
          cursor: pointer;
        }
        //下划线
        .markline {
          display: inline-block;
          position: absolute;
          top: 3.3vh;
          left: 4px;
          width: 40%;
          height: 2px;
          background-color: rgb(65, 133, 216);
          &:first-child {
            font-weight: 700;
            font-size: 20px;
            height: 2px;
          }
        }
      }
    }
  }
  .play-total {
    width: 20vw;
    height: 7vh;
    //background-color: red;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: 1vw;
    div {
      width: 8vw;
      height: 4.5vh;
      //background-color: antiquewhite;
      border-radius: 20px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(255, 255, 255, 0.867);
    }
    .play-left {
      width: 9vw;
      background-color: rgba(47, 126, 211, 0.848);
      span {
        margin-right: 0.5vw;
      }
      span:last-child {
        margin-left: 0.6vw;
      }
    }
    .play-left:hover {
      cursor: pointer;
      background-color: rgba(47, 126, 211, 0.945);
    }
    .play-right {
      width: 7vw;
      color: rgba(0, 0, 0, 0.77);
      border: 1px solid rgba(0, 0, 0, 0.189);
    }
    .play-right:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.067);
    }
  }

  .song-title {
    width: 100%;
    display: flex;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.642);
    margin-top: 2vh;
    .li-one {
      width: 17%;
      margin-left: 147px;
    }
    .li-two {
      width: 10%;
      margin-left: 8%;
    }
    .li-three {
      width: 12%;
      margin-left: 2%;
    }
    .li-four {
      width: 6.5%;
      margin-left: 2%;
    }
  }
  .song-detail:hover {
    background-color: rgb(241, 242, 243);
  }
  .music-container {
    width: 100%;
    height:1500px;
    margin-top: 2vh;
    .song-detail {
      width: 100%;
      height: 5vh;
      display: flex;
      //justify-content:space-between;
      align-items: center;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.642);
      li:hover {
        cursor: pointer;
      }
      .li-only {
        width: 100px;
        margin-left: 3vw;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(0, 0, 0, 0.627);
        span {
          width: 2vw;
        }
      }
      .li-two:hover {
        color: rgba(0, 0, 0, 0.872);
      }
      .li-one {
        width: 17%;
        height: 14px;
        overflow: hidden;
        color: rgb(80, 144, 200);
      }
      .li-two {
        //width:10%;
        width: 10%;
        height: 13px;
        overflow: hidden;
        margin-left: 8%;
      }
      .li-three {
        width: 12%;
        height: 14px;
        margin-left: 2%;
        overflow: hidden;
        color: rgb(80, 144, 200);
      }
      .li-four {
        height: 15px;
        width: 6.5%;
        margin-left: 2%;
      }
    }
  }
  //分页器
  .pagination{
    //margin:0 auto;
    position: absolute;
    top:3230px;
    left:30vw;
    bottom:2vh;
  }
}
</style>