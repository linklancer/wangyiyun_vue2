<template>
  <div class="audio-box">
    <!--控制音乐播放控件-->
    <div class="player">
      <span class="iconfont icon-zuobofang"></span>
      <span
        :class="'iconfont  icon-' + this.$store.state.music.listen"
        id="twospan"
        @click="playmusic"
      
      ></span>
      <span class="iconfont icon-youbofang"></span>
    </div>
    <audio
      @timeupdate="ontimeupdate"
      @play="onplay"
      @pause="onpause"
      ref="Audio"
      :src="urldata"
      loop="loop"
    ></audio>
    <!---->
    <div class="time-content">
      <span>{{ this.Curentime | currentTimeformat }}</span>
      <div class="range-content">
        <input
          type="range"
          id="cowbell"
          name="cowbell"
          min="0"
          :max="this.Duration"
          :value="this.Curentime"
          :style="{ backgroundSize: this.getsize + '%' }"
          @input="changevalue($event)"
        />
      </div>

      <span>{{ this.Duration | durationTimeformat }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MyAudio",
  data() {
    return {
      Duration: this.$store.state.music.Clickduration,
      Curentime: this.$store.state.music.Currenttime,
    };
  },
  computed: {
    ...mapGetters(["urldata", "newLyric"]),
    //计算进度条背景比例
    getsize() {
      if (this.Curentime && this.Duration) {
        return (this.Curentime / this.Duration) * parseFloat(100);
      } else {
        return 0;
      }
    },
  },

  mounted() {
    this.$store.commit("LOCATIONAUDIO", this.$refs.Audio);
    //console.log(this.newLyric)
  },
  methods: {
    //播放音乐与暂停
    playmusic() {
      if (this.$store.state.music.listen == "bofang1") {
        this.$refs.Audio.play();
        this.$store.state.music.mask.style.animationPlayState = "running";
      } else {
        this.$refs.Audio.pause();
        this.$store.state.music.mask.style.animationPlayState = "paused";
      }
    },

    ontimeupdate() {
      this.Curentime = this.$refs.Audio.currentTime;
    },
    //控制转盘的旋转
    rote() {
      //this.$store.state.music.mask.style.transition=`all 15s`
      // this.$store.state.music.mask.style=
    },
    onplay() {
      this.$store.commit("LOCTIONTINE");
      this.$store.state.music.listen = "bofangzanting";
      
      this.Duration = this.$store.state.music.Clickduration;
      //控制转盘上的指针
      this.$store.state.music.showdeg = 35 +'deg'
      
    },
    onpause() {
      this.$store.state.music.listen = "bofang1";
      clearInterval(this.timer);
        this.$store.state.music.showdeg = 0+'deg'
    },
    //监听value值，以跳转到当前播放的位置，点击哪里播放哪里
    changevalue(event) {
      this.$refs.Audio.currentTime = event.target.value;
      //
      let LrYic = this.$store.state.music.LyRic;
        for (let lyric of this.newLyric) {
          if (parseInt(lyric.time) <= parseInt(event.target.value)) {
            this.$store.state.music.lyricIndex = lyric.index;
               LrYic.scrollTo({top:50 * (lyric.index - 3),behavior:'smooth'})
            }
          }
        },
        

  },
  watch: {
    Curentime() {
      //循环歌词对象
      //歌词滚动
      this.$nextTick(() => {
        let LrYic = this.$store.state.music.LyRic;
        for (let lyric of this.newLyric) {
          if (parseInt(lyric.time) === parseInt(this.Curentime)) {
            this.$store.state.music.lyricIndex = lyric.index;
            if (lyric.index > 3) {
               // 无过渡效果
                // LrYic.scrollTop = 50 * (lyric.index - 3) ;
                //有过渡效果
               LrYic.scrollTo({top:50 * (lyric.index - 3),behavior:'smooth'})
            }
          }
        }
      });
    },
  },

  filters: {
    currentTimeformat: function (value) {
      if (!value) return "00:00";
      let interval = Math.floor(value);
      let minute = Math.floor(interval / 60)
        .toString()
        .padStart(2, "0");
      let second = (interval % 60).toString().padStart(2, "0");
      return `${minute}:${second}`;
    },
    durationTimeformat: function (value) {
      if (!value) return "00:00";
      let interval = Math.floor(value);
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
.audio-box {
  width: 26vw;
  height: 100%;
  margin: 0 auto;
  position: relative;
  // background-color: antiquewhite;
  .player {
    display: flex;
    width: 20vw;
    height: 5vh;
    //justify-content:space-around;
    align-items: center;
    // background-color: antiquewhite;
    margin: 0 auto;
    span:hover {
      cursor: pointer;
    }
    span {
      margin-right: 2.5vw;
      margin-top: 3vh;
      font-size: 14px;
    }
    span:last-child {
      margin-right: 0;
      font-size: 13px;
    }
    span:first-child {
      margin-left: 6vw;
      font-size: 13px;
    }
    #twospan {
      display: inline-block;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.052);
      display: flex;
      justify-content: center;
      align-items: center;
      color: black;
      font-weight: 800;
      font-size: 15px;
    }
    #twospan:hover {
      background-color: rgba(0, 0, 0, 0.111);
    }
  }
  .time-content {
    width: 100%;
    height: 10vh;
    position: absolute;
    display: flex;
    top: 6vh;
    //background-color: antiquewhite;
    span {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.382);
    }
    span:hover {
      cursor: pointer;
    }
    span:last-child {
      margin-left: 0.2vw;
    }
    .range-content {
      margin-top: -0.7vh;

      input {
        width: 24vw;
        height: 4px;
        outline: none;
        -webkit-appearance: none; //清楚默认样式
        background: -webkit-linear-gradient(
              rgb(105, 158, 248),
              rgb(105, 158, 248)
            )
            no-repeat,
          #ddd; /*背景颜色，俩个颜色分别对应上*/
        // background-size: 10% ;
      }
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; /*清除系统默认样式*/
        height: 10px; /*拖动块高度*/
        width: 10px; /*拖动块宽度*/
        background: rgba(0, 119, 255, 0.84); /*拖动块背景*/
        border-radius: 50%; /*外观设置为圆形*/
        border: solid 1px rgb(105, 158, 248); /*设置边框*/
      }
    }
  }
}
</style>