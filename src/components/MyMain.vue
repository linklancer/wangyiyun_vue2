<template>
  <div class="main" :style="changeover"  >
    <router-view   ></router-view>
  </div>
</template>

<script>
export default {
name:'MyMain',
data() {
  return {
    beforestyleobj:{
      overflow:'hidden'
    },
    afterstyleobj:{
      overflow:'auto'
    }
  }
},
computed:{
  changeover(){
    if(this.$route.path == '/detail'){
      return this.beforestyleobj
    }else {
       return this.afterstyleobj
    }
    
  }
},
methods: {
  remove(){
     this.$store.state.home.personalshow = false
  }
},
}
</script>

<style lang="less" scoped>
 .main{
 position: absolute;
 //left:13vw;
 width:100%;
 height:650px;
 //top:8.3vh;
 overflow: auto;//开启滚动条
 //outline: none;
 //background-color: antiquewhite;

 }
  //滚动条样式
      ::-webkit-scrollbar{
        width:4px;
        height:1px;
        
      }
      //滑块
      ::-webkit-scrollbar-thumb{
        background-color: rgba(51, 51, 51, 0.125);
      }
      //轨道部分
      ::-webkit-scrollbar-track{
        background-color: #eee;
      }
 

</style>