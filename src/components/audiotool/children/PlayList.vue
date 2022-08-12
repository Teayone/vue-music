<template>
  <div id="play-list">
    <!-- 第一行播放列表提示 -->
    <div class="title">
      <h1>播放列表({{ len }})</h1>
      <!-- 清除按钮 -->
      <a href="javascript:;" class="iconfont icon-del" @click="clearSong"
        >清除</a
      >
    </div>

    <!-- 下面的歌曲名字和歌曲时长 -->
    <ul class="ul-list" v-if="song">
      <li v-for="(item, index) in song" :key="item.id" @click="toBoFang(index)">
        <a href="javascript:;" class="song-name">{{ item.name }}</a>
        <!-- 垃圾桶图标 -->
        <i class="iconfont icon-del" @click.stop="removeSong(index)"></i>

        <a href="javascript:;" class="singer">{{ item.ar[0].name }}</a>
        <a href="javascript:;" class="timer">{{
          item.dt / 1000 ? item.dt / 1000 : 0 | formatTimer
        }}</a>
      </li>
    </ul>
    <!-- 没有歌时的显示内容 -->
    <div class="wei-show-info" v-else>
      <!-- h2是图标 -->
      <div class="lg">
        <i></i>
        <span href="javascript">你还没有添加任何歌曲</span>
      </div>
      <p>
        去首页 <a href="javascript:;">发现音乐</a> ，或在
        <a href="javascript:;">我的音乐</a> 收听自己收藏的歌单。
      </p>
    </div>
  </div>
</template>

<script>
import { up } from "../../../mixin/mixin";
export default {
  name: "PlayList",
  mixins: [up],
  mounted() {},
  computed: {
    len() {
      return this.song === null ? 0 : this.song.length;
    },
  },
  methods: {
    // 清楚播放列表所有歌曲
    clearSong() {
      localStorage.removeItem("song");
      localStorage.removeItem("timer");
      // 更新 song 的状态
      this.up();
      this.$bus.$emit("songNum");
    },
    // 点击播放歌曲,修改Vuex里的index
    toBoFang(index) {
      this.$store.commit("CACHEINDEX", index);
      if (this.$store.state.flag) {
        this.$store.commit("ISFLAG");
      }
      this.$store.dispatch("songUrl");
    },
    // 移除某首歌曲
    removeSong(index) {
      let song = JSON.parse(localStorage.getItem("song"));
      let i = JSON.parse(localStorage.getItem("index"));
      song.splice(index, 1);
      if (song.length === 0) {
        localStorage.removeItem("song");
        localStorage.removeItem("timer");
        this.$bus.$emit("update");
        this.$bus.$emit("songNum");
      } else {
        localStorage.setItem("song", JSON.stringify(song));
        this.up();
        this.$bus.$emit("songNum");
      }
    },
  },
};
</script>

<style scoped>
#play-list {
  position: fixed;
  bottom: 53px;
  left: 42.5%;
  transform: translateX(-50%);
  width: 500px;
  height: 301px;
  background: #241918;
  color: #a6a3a3;
}
.title {
  height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #000000;
  font-size: 14px;
  background: #191919;
}
.title > h1 {
  display: inline-block;
  line-height: 40px;
  color: #e2e2e2;
}
.title > a {
  font-size: 12px;
  line-height: 40px;
  margin-right: 15px;
  float: right;
  color: #e2e2e2;
}

.ul-list {
  height: 260px;
  box-sizing: border-box;
  font-size: 12px;
  overflow: auto;
  background: url("../../../assets/img/bz7.jpg") no-repeat;
  background-size: 100% 100%;
  position: relative;
  z-index: 9;
}
.ul-list > li {
  padding: 0 20px;
  height: 28px;
  line-height: 28px;
  position: relative;
  display: flex;
  cursor: pointer;
  transition: all 0.2s;
}
.ul-list > li:hover {
  background: #141010;
}
.ul-list > li.active {
  background: #141010;
}
.ul-list > li.active::before {
  position: absolute;
  left: 9px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 7px;
  border-style: solid;
  border-color: transparent transparent transparent red;
  border-right: none;
  content: "";
}
.song-name {
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ul-list > li > a {
  color: #cccccc;
}
.ul-list > li > i {
  position: absolute;
  left: 320px;
  cursor: pointer;
  font-size: 14px;
  display: none;
}
.ul-list > li:hover > i {
  display: block;
}

.singer {
  position: absolute;

  right: 60px;
  color: #9b9b9b;
  width: 60px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.timer {
  position: absolute;
  right: 20px;
  color: #9b9b9b;
}

/* 歌单没有内容时显示的内容 */
.wei-show-info {
  padding-top: 85px;
  text-align: center;
  line-height: 43px;
  font-size: 12px;
}
.wei-show-info > .lg > i {
  position: relative;
  top: 7px;
  left: -3px;
  display: inline-block;
  width: 36px;
  height: 29px;
  margin-right: 3px;
  background: url(https://s2.music.126.net/style/web2/img/frame/playlist.png?4148d87636d1cb0508ae4f9c67341cf9)
    no-repeat;
  background-position: -138px 0;
}
.wei-show-info a {
  text-decoration: underline;
}
</style>