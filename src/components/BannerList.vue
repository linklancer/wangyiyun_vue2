<template>
  <div id="banner">
    <!--图片轮播容器-->
    <div class="img-list" ref="imglist">
      <div class="img"
        v-for="(banner, index) in Banners"
        :key="index"
        :id="idArr[index]"
       
      >
        <img :src="banner.imageUrl"   @mousemove="changearrow" @mouseleave="leavearrow" />
        <div class="title" :style="{ backgroundColor: 'rgb(204,74,74)' }">
          <span>{{ banner.typeTitle }}</span>
        </div>
      </div>
     
    </div>
     <!--左右箭头-->
      <div class="arrow-contain"  v-show="isshow">
        <div class="left-arrow" @mousemove="changearrow"  @click="prev">
          <span class="iconfont icon-xiangzuojiantou"></span>
        </div>
        <div class="right-arrow" @mousemove="changearrow" @click="next">
          <span class="iconfont icon-xiangyoujiantou"></span>
        </div>
      </div>
      <!-- 下方导航点-->
      <div class="button" ref="buttons">
        <p
          @mousemove="onmove(index)"
          @mouseout="onout"
          v-for="(banner, index) in Banners"
          :key="index"
        ></p>
      </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "BannerList",
  data() {
    return {
      idArr: [
        "first",
        "second",
        "right",
        "left",
        "left",
        "left",
        "right",
        "last",
      ],
      index: 0, //初始化一个索引值
      timer: 0,
      isshow: false,
    };
  },
  mounted() {
    this.initialize();
    //console.log(this.$refs.buttons.children.length)
    this.automove();
    // this.onevent()
  },
  beforeDestroy() {
    clearInterval(this.timer); //关闭轮播图
  },
  computed: {
    ...mapState({
      Banners(state) {
        if (state.home.banners) {
          return state.home.banners;
        } else {
          return [];
        }
      },
    }),
  },
  methods: {
    //创建一个函数初始化图片
    initialize() {
      for (let i = 0; i < this.$refs.imglist.children.length; i++) {
        this.$refs.imglist.children[i].id = this.idArr[i];
      }
    },
    //创建一个方法让小圆点跟随图片运动
    clearColor() {
      for (let i = 0; i < this.$refs.buttons.children.length; i++) {
        this.$refs.buttons.children[i].style.backgroundColor = "silver";
      }
      //让当前的索引变色
      this.$refs.buttons.children[this.index].style.backgroundColor =
        "rgb(20,134,187)";
    },
    //创建切换图片的函数
    prev() {
      //切换上一张，就是让数组的最后一个元素变为第一个元素
      this.idArr.push(this.idArr.shift());//此步只是改变id的顺序，还需要初始化一次图片所获得的id
      this.initialize();
      //控制索引
      if (this.index == 0) {
        this.index = this.$refs.buttons.children.length - 1;
      } else {
        this.index--;
      }
      this.clearColor();
    },
    //根上面反过来
    next() {
      this.idArr.unshift(this.idArr.pop());
      this.initialize();
      if (this.index == this.$refs.buttons.children.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
      this.clearColor();
    },
    //当鼠标移入小点上时
    onmove(index) {
      //判断当前索引
      clearInterval(this.timer);
      this.timer = null;
      if (this.index > index) {
        let x = this.index - index;
        while (x--) {
          this.prev();
        }
      } else if (this.index < index) {
        let x = index - this.index;
        while (x--) {
          this.next();
        }
      }
    },
    //当鼠标移除小点上时
    onout() {
      this.automove();
    },
    //设置轮播函数
    automove() {
      this.timer = setInterval(this.next, 3000);
    },
    //设置切换箭头
    changearrow(){
      this.isshow = true
      //同时关闭定时器
      clearInterval(this.timer)
    },
    leavearrow(){
      this.isshow = false
      //离开的时候开启定时器
      this.automove()
    }
  },
};
</script>

<style lang="less" scoped>
#banner {
  width: 100%;
  height: 33vh;
  position: relative;
  top: -1vh;
  .img-list {
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    left: 8.6%;
    top:-2vh;
    //background-color: red;
    .img {
      width: 32vw;
      height: 24vh;
      position: absolute;
      transition: 0.5s;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
      .title {
        width: 4.9vw;
        display: flex;
        align-items: center;
        height: 17px;
        position: absolute;
        border-top-left-radius: 6px;
        border-bottom-right-radius: 6px;
        left: 84.7%;
        top: 21.6vh;
        span {
          font-size: 0.1rem;
          margin: 0 auto;
          color: rgba(255, 255, 255, 0.901);
        }
      }
    }
    .img:hover{
      cursor: pointer;
    }
  }
  //左右箭头
   .arrow-contain{
      width:70vw;
      height:22vh;
      position: relative;
     // background-color: red;
      left:8.5vw;
      top:-28.5vh;
      //z-index: 99;
      display: flex;
      align-items: center;
     .left-arrow {
      position: absolute;
      width: 25px;
      height: 25px;
      background-color: rgba(0, 0, 0, 0.31);
      border-radius: 50%;
      left: 0.5vw;
      z-index: 99;
      display: flex;
      align-items: center;
      text-align: center;
      //opacity: 0;
      span {
        margin: 0 auto;
        color: rgba(255, 255, 255, 0.862);
        font-size: 12px;
      }
      span:hover {
        cursor: pointer;
        font-weight: 800;
      }
    }
    .right-arrow {
      position: absolute;
      right: 0.5vw;
      z-index: 99;
      width: 25px;
      height: 25px;
      //opacity: 0;
      background-color: rgba(0, 0, 0, 0.31);
      border-radius: 50%;
      display: flex;
      align-items: center;
      text-align: center;
      span {
        color: rgba(255, 255, 255, 0.862);
        font-size: 12px;
        margin: 0 auto;
      }
      span:hover {
        cursor: pointer;
        font-weight: 800;
      }
    }
    }
  .button {
    width: 175px;
    height: 15px;
    position: absolute;
    z-index: 9999;
    left: 51%;
    top: 97%;
    transform: translateX(-50%);
    p {
      width: 6px;
      height: 6px;
      float: left;
      margin: 0 5px;
      cursor: pointer;
      border-radius: 50%;
      background-color: silver;
      &:first-child {
        background-color: rgba(0, 0, 255, 0.578);
      }
    }
  }
  //设置id样式
  #last {
    transform: translateX(0);
    z-index: 9;
    opacity: 1;
  }
  #first {
    transform: translateX(60%) scale(1.2);
    z-index: 99;
    opacity: 1;
  }
  #second {
    transform: translateX(125%);
    z-index: 9;
    opacity: 1;
  }
  #left {
    transform: translateX(-20vw);
    z-index: 1;
    opacity: 0;
  }
  #right {
    transform: translateX(400px);
    z-index: 1;
    opacity: 0;
  }
}
</style>