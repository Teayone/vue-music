<template>
  <div id="music">
    <!-- 隐藏的audio标签 -->
    <audio
      style="display: none"
      :src="url"
      ref="audio"
      @play="zongTime"
      @ended="switchSongs"
      @timeupdate="playing"
      @pause="stopLyric"
      @progress="hcProgress"
    ></audio>
  </div>
</template>

<script>
export default {
  name: "Music",
  data() {
    return {
      url: "",
    };
  },
  created() {
    let index = JSON.parse(
      localStorage.getItem("index") ? localStorage.getItem("index") : 0
    );
    if (index) {
      // 组件初始化完毕将 INDEX 重新赋值给VUEX
      this.$store.commit("CACHEINDEX", index);
    } else {
      this.$store.commit("RESETINDEX");
    }
  },
  // 负责监听事件总线播放歌曲
  mounted() {
    let _this = this;
    // 歌单的播放
    this.$bus.$on("playSong", function (url) {
      // 将url放到本地
      _this.url = url;
      _this.$store.commit("ISFLAG");
      setTimeout(() => {
        _this.$refs.audio.play();
      }, 500);
    });
    // 播放
    this.$bus.$on("play", function () {
      _this.$refs.audio.play();
    });
    // 暂停
    this.$bus.$on("pause", function () {
      _this.$refs.audio.pause();
    });
    // 点击重复的歌单,重复加载音频
    this.$bus.$on("load", function () {
      _this.$refs.audio.load();
    });
    // 跳转播放进度
    this.$bus.$on("progress", function (percentage) {
      // percentage 百分比的意思
      let p = percentage / 100;
      _this.fastSeek(p);
    });
    // 跳转音量
    this.$bus.$on("volume", function (percentage) {
      _this.volume(percentage);
    });
    this.$bus.$on("songListFlag", function (bn) {
      _this.songFlag = bn;
    });
    // 设置audio路径
    this.$bus.$on("audioNull", function () {
      _this.$refs.audio.src = null;
    });
    window.setTimeout(() => {
      this.getVolume();
    }, 200);
  },
  methods: {
    // 歌曲播放结束触发
    switchSongs() {
      if (localStorage.getItem("song") === null) {
        this.$store.commit("ISFLAG");
        return;
      } else {
        // 先将播放按钮切换状态
        this.$store.commit("ISFLAG");
        // 更新 Vuex 里面的 index
        this.$store.commit("ADDINDEX");
        // 获取新的歌曲路径,那边请求完又会进入事件总线,状态会被再次切换
        this.$store.dispatch("songUrl");
      }
    },
    // 当歌曲开始播放前，获取音频的时长
    zongTime() {
      // 将音频长度存到本地
      localStorage.setItem("timer", this.$refs.audio.duration);
      // 更新播放器里的时间
      this.$bus.$emit("duraTion");
      this.$bus.$emit("playLyric");
    },
    playing() {
      this.$bus.$emit("currentTime", this.$refs.audio.currentTime);
    },
    // 音频指定播放时间的函数
    fastSeek(p) {
      let audio = this.$refs.audio;
      // 得到歌曲的总时长
      let dTime = JSON.parse(localStorage.getItem("timer"));
      // 跳转音乐的指定位置
      audio.currentTime = dTime * p;
    },
    volume(p) {
      let audio = this.$refs.audio;
      p = p / 100;
      audio.volume = parseFloat(p).toFixed(1);
    },
    getVolume() {
      // 如果本地已经有音量了，则不会保存到本地
      if (localStorage.getItem("volume") !== null) {
        return;
      }
      // 将音量存到本地
      let p = this.$refs.audio.volume * 100 + "%";
      localStorage.setItem("volume", JSON.stringify(p));
    },
    stopLyric() {
      this.$bus.$emit("stopLyric");
    },
    // 当浏览器缓存内容时触发
    hcProgress() {
      try {
        let buffered = this.$refs.audio.buffered;
        this.$bus.$emit("huancun", buffered);
      } catch (error) {}
    },
  },
};
</script>

<style scoped>
</style>