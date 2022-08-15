<template>
  <div id="app">
    <music></music>
    <nav-bar></nav-bar>
    <collect-songs></collect-songs>
    <keep-alive include="Home"
      ><router-view :key="key"></router-view
    ></keep-alive>
    <audio-tool
      v-show="$route.path !== '/mv' && $route.path !== '/video'"
    ></audio-tool>
    <below v-if="$route.path !== '/my'"></below>
    <back-top></back-top>
  </div>
</template>
<script>
import NavBar from "./components/navbar/NavBar.vue";
import Below from "./components/below/Below.vue";
import AudioTool from "./components/audiotool/AudioTool.vue";
import BackTop from "./components/backtop/BackTop.vue";
import Music from "./components/music/Music.vue";
import CollectSongs from "./components/CollectSongs/CollectSongs.vue";
import { show } from "./plugins/loading";
export default {
  name: "App",
  components: {
    NavBar,
    Below,
    AudioTool,
    BackTop,
    Music,
    CollectSongs,
    CollectSongs,
  },
  computed: {
    // 解决路由跳转参数不同时页面不刷新问题
    key() {
      return this.$route.name
        ? this.$route.name + +new Date()
        : this.$route + +new Date();
    },
  },
};
</script>
<style>
@import url("./assets/css/reset.css");
@import url("./assets/css/wrap.css");
@import url("./assets/css/iconfont.css");
</style>
