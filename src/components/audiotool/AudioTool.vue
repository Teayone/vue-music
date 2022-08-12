<template>
  <div
    id="audio-tool"
    @mouseenter="block"
    @mouseleave="none"
    @click.stop="stopBubble"
  >
    <!-- 遮罩层-->
    <div class="zhezhao" :class="{ suo: flag }">
      <!-- 音乐播放器组件 -->
      <div class="wrap3 pos">
        <!-- 按钮组件 -->
        <btns></btns>
        <!-- 歌曲封面组件 -->
        <cover></cover>
        <!-- 进度条组件 -->
        <pro-gress></pro-gress>
        <!-- 音量,循环,播放列表按钮组件 -->
        <controls></controls>
      </div>
      <!-- 播放列表组件 -->
      <!-- <play-list v-if="isShow"></play-list> -->
      <song-tips v-show="isShow" @close="close" :show="isShow"></song-tips>
      <!-- 小锁-->
      <div class="btn">
        <i :class="iconfont" @click="doneBtn"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Btns from "./children/Btns.vue";
import Cover from "./children/Cover.vue";
import ProGress from "./children/ProGress.vue";
import Controls from "./children/Controls.vue";
import PlayList from "./children/PlayList.vue";
import songTips from "./children/songTips.vue";
export default {
  name: "AudioTool",
  components: {
    Btns,
    Cover,
    ProGress,
    Controls,
    PlayList,
    songTips,
  },
  data() {
    return {
      flag: false,
      timer: null,
      // 标记小锁的状态,只要点击则锁定播放器窗口
      done: false,
      msg: "锁定",
      // 小锁是否锁定和解锁,默认是解锁状态
      iconfont: "iconfont icon-jiesuo",
      // 播放列表是否显示，默认不显示
      isShow: false,
    };
  },
  mounted() {
    let _this = this;
    // 只要播放就显示遮罩
    this.$bus.$on("block", () => {
      this.block();
      this.none();
    });
    this.$bus.$on("isShow", () => {
      _this.isShow = !_this.isShow;
    });
    document.addEventListener("click", (e) => {
      if (
        e.target.className !== "list p-list-show" &&
        e.target.className !== "iconfont icon-wj-bflb" &&
        e.target.className !== "span"
      ) {
        if (_this.isShow) {
          _this.isShow = false;
          _this.none();
        }
      }
    });
  },
  methods: {
    // 鼠标悬浮,展开播放器
    block() {
      // 如果小锁被标记了,则这事件,也不需要
      if (this.done) {
        return;
      }
      clearTimeout(this.timer);
      this.flag = true;
    },
    // 鼠标离开,隐藏播放器
    none() {
      // 如果小锁被标记了,则窗口不会消失
      if (this.done) {
        return;
      } else if (this.isShow) {
        // 如果播放列表正在显示，则也不会隐藏
        return;
      }
      // 延迟一秒消失
      this.timer = setTimeout(() => {
        this.flag = false;
      }, 1000);
    },
    // 标记小锁的状态
    doneBtn() {
      if (!this.done) {
        this.iconfont = "iconfont icon-suoding";
      } else {
        this.iconfont = "iconfont icon-jiesuo";
      }
      this.done = !this.done;
    },
    // 播放列表的 X
    close() {
      this.isShow = false;
      this.none();
    },
    // 阻止冒泡用
    stopBubble() {},
  },
};
</script>

<style scoped>
#audio-tool {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  z-index: 9999;
}
.zhezhao {
  position: absolute;
  left: 0;
  bottom: -53px;
  width: 100%;
  height: 53px;
  background: #2f2f2f;
  box-sizing: border-box;
  transition: all 0.5s;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  box-shadow: 0 -3px 5px rgba(0, 0, 0, 0.3);
  z-index: 9999;
}
.zhezhao.suo {
  bottom: 0;
}
.pos {
  position: relative;
  display: flex;
}
/* 小锁 */
.btn {
  position: absolute;
  right: 40px;
  top: -18px;
  width: 30px;
  height: 30px;
  background: #2f2f2f;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  color: #808080;
}
.btn::after {
  position: absolute;
  left: -16px;
  top: -19px;
  border: 19px solid;
  border-right: none;
  border-color: transparent transparent #2f2f2f transparent;
  content: "";
}
.btn::before {
  position: absolute;
  right: -16px;
  top: -19px;
  border: 19px solid;
  border-left: none;
  border-color: transparent transparent #2f2f2f transparent;
  content: "";
}
.btn > i {
  cursor: pointer;
  font-size: 12px;
}
.btn > i:hover {
  color: #d1d1d1;
}
</style>