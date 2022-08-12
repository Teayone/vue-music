<template>
  <div id="btns">
    <!-- 播放,上一首,下一首的盒子 -->
    <div class="prev" @click="prev">
      <a href="javascript:;" class="iconfont icon-icon-1"></a>
    </div>
    <div class="play">
      <a href="javascript:;" :class="iconfont" @click="playClick"></a>
    </div>
    <div class="next" @click="next">
      <a href="javascript:;" class="iconfont icon-icon-"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Btns",
  data() {
    return {
      // 播放按钮的两种字体图标,默认播放图标
      play: "iconfont icon-bofang1",
      pause: "iconfont icon-zanting",
      // 播放按钮是否播放歌曲,页面刷新就为true
      flag: true,
    };
  },
  mounted() {},
  methods: {
    // 上一首
    prev() {
      // 防止本地没有song了
      if (localStorage.getItem("song") === null) {
        return;
      }
      // 防止开局就点上一首，判断只有当播放按钮在播放状态时才会更改状态
      if (this.$store.state.flag) {
        this.$store.commit("ISFLAG");
      }

      // 如果有，正常上一首
      this.$store.commit("REDUCEINDEX");
      // // 判断是否点击了歌单中的全部播放按钮
      // if (this.songFlag) {
      //   // 点了就将 本地的index赋值给Vuex
      //   this.$store.commit(
      //     "ACTIVEINDEX",
      //     JSON.parse(localStorage.getItem("index"))
      //   );
      // } else {
      //   // 判断本地是不是只有一首歌曲
      //   if (JSON.parse(localStorage.getItem("song")).length === 1) {
      //     this.$store.commit(
      //       "ACTIVEINDEX",
      //       JSON.parse(localStorage.getItem("index"))
      //     );
      //   } else {
      //     // 反之代表有其他歌曲，清除正在激活的 index
      //     this.$store.commit("ACTIVEINDEX", null);
      //   }
      // }
      this.$store.dispatch("songUrl");
      // 重置播放状态
      this.$bus.$emit("load");
    },
    // 下一首
    next() {
      // 防止本地没有song了
      if (localStorage.getItem("song") === null) {
        return;
      }
      // 防止开局就点下一首，判断只有当播放按钮在播放状态时才会更改状态
      if (this.$store.state.flag) {
        this.$store.commit("ISFLAG");
      }
      this.$store.commit("ADDINDEX");
      this.$store.dispatch("songUrl");
      // 重置播放状态
      this.$bus.$emit("load");
    },
    // 播放暂停
    playClick() {
      if (localStorage.getItem("song") === null) {
        return;
      }
      // 如果为 true 代表正在播放
      if (this.$store.state.flag) {
        // 切换按钮状态
        this.$store.commit("ISFLAG");
        this.$bus.$emit("pause");
        // 将开局属性关闭
        this.flag = false;
      } else {
        // 如果 flag 为 true，代表页面刷新了，需要点击的时候重新发起请求播放歌曲
        if (this.flag) {
          if (localStorage.getItem("song")) {
            this.$store.dispatch("songUrl");
            // 将状态关闭
            this.flag = false;
          }
        } else {
          // 反之代表暂停
          this.$bus.$emit("play");
          this.$store.commit("ISFLAG");
        }
      }
    },
  },
  computed: {
    iconfont() {
      // 如果为true 代表正在播放,显示暂停图标,反之显示播放图标
      return this.$store.state.flag ? this.pause : this.play;
    },
  },
};
</script>

<style scoped>
#btns {
  display: flex;
  margin-top: 13px;
  width: 137px;
  justify-content: flex-start;
}
#btns > .play {
  position: relative;
  top: -5px;
  width: 36px;
  height: 36px;
  margin: 0 10px;
  border-radius: 50%;
}
#btns > .play > a {
  line-height: 36px;
  font-size: 36px;
  color: #fff;
  border-radius: 50%;
}
#btns > .play > a:hover {
  box-shadow: 0px 0px 6px rgba(255, 255, 255, 0.8);
}
#btns > div > a {
  display: block;
  text-align: center;
}
#btns > .prev,
#btns > .next {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
#btns > .prev > a,
#btns > .next > a {
  line-height: 28px;
  font-size: 28px;
  color: #c1c1c1;
  border-radius: 50%;
}
#btns > .prev > a:hover,
#btns > .next > a:hover {
  color: #fff;
  box-shadow: 0px 0px 6px rgba(255, 255, 255, 0.8);
}
</style>