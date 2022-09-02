<template>
  <div id="app"   >
    <my-head></my-head>
    <my-aside></my-aside>
    <my-main></my-main>
    <MyFoot></MyFoot>
    <my-login></my-login>
    <PersonalLogin></PersonalLogin>
  </div>
</template>

<script>
import MyHead from "@/components/MyHead";
import MyAside from "@/components/MyAside";
import MyFoot from "./components/MyFoot";
import MyMain from "./components/MyMain";

export default {
  name: "App",
  components: {
    MyHead,
    MyAside,
    MyFoot,
    MyMain,
  },
  
};
</script>

<style lang="less" scoped>
#app {
  min-width: 1024px;
  min-height: 685px;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  //resize: both;
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
