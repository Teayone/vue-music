<template>
  <div id="controls">
    <!-- 控制音量,循环,播放列表 -->
    <div class="volume" refs="volume">
      <a href="javascript:;" :class="icon" @click="flag = !flag"></a>
      <!-- 音量调节盒子 -->
      <div class="volume-change" v-show="flag">
        <!-- 音量条 -->
        <div class="bar" ref="volumeBar" @click="jumpVolume">
          <!-- 红色的音量调 -->
          <div class="bar-red" :style="height" ref="barRed">
            <!-- 小圆点 -->
            <span ref="yuan" @mousedown.stop="mousD" class="span"> </span>
          </div>
        </div>
      </div>
    </div>
    <div class="loop">
      <!-- 弹框 -->
      <!-- 播放模式弹框 -->
      <div class="pattern-tips" v-show="showPatternTips">{{ msg }}</div>
      <a
        href="javascript:;"
        v-for="item in loop"
        :key="item.id"
        :class="item.icon"
        v-show="item.icon === iconfont"
        :title="item.title"
        @click="changeIcon(item.icon)"
      ></a>
    </div>
    <!-- 播放列表 -->
    <div class="list p-list-show" @click="showList">
      <a href="javascript:;" class="iconfont icon-wj-bflb"></a>
      <span class="span">{{ songNum }}</span>
      <!-- 已添加到播放列表 -->
      <add-play-list v-show="addShow"></add-play-list>
    </div>
  </div>
</template>

<script>
import { up } from "../../../mixin/mixin";
import AddPlayList from "../../../components/addPlaylist/AddPlayList.vue";
export default {
  name: "Controls",
  components: { AddPlayList },
  data() {
    return {
      // 音量条是否显示
      flag: false,
      // DOM 元素
      volume: null,
      // 音量进度条相关
      BarHeight: 0,
      height: 0,
      icon: "iconfont icon-yinliang",
      // 已添加到播放列表
      addShow: false,
      timer: null,
      loop: [
        {
          id: 10,
          icon: "iconfont icon-suiji",
          title: "随机",
        },
        {
          id: 20,
          icon: "iconfont icon-danquxunhuan",
          title: "单曲循环",
        },
        {
          id: 30,
          icon: "iconfont icon-xunhuan",
          title: "循环",
        },
      ],
      msg: "循环",
      // 默认显示循环图标
      iconfont: "iconfont icon-xunhuan",
      // 显示播放模式的提示框
      showPatternTips: false,
    };
  },
  mixins: [up],

  mounted() {
    let _this = this;
    // 加载本地的音量并应用
    window.setTimeout(() => {
      let p = JSON.parse(localStorage.getItem("volume")) || "100%";
      let vp = parseFloat(p);
      this.height = "height:" + p;
      this.$bus.$emit("volume", vp);
    }, 500);
    // 关闭音量框
    document.body.addEventListener("click", this.closeVloume);
    // 更新播放列表的歌曲数量
    this.$bus.$on("songNum", () => {
      _this.up();
    });
    // 是否显示添加歌曲成功提示框
    this.$bus.$on("showAddTips", () => {
      _this.showAddShow();
    });
  },
  methods: {
    // 点击跳转音量
    jumpVolume(e) {
      if (e.target.className != "span") {
        // 获取父元素的高度
        let height = this.$refs.volumeBar.offsetHeight;
        // 当前点击的 offsetY / 总高度 得到百分比
        let redHeight = (e.offsetY / height) * 100;
        this.height = "height:" + redHeight + "%";
        // 然后将 百分比存到本地
        localStorage.setItem("volume", JSON.stringify(redHeight + "%"));
        // 将音量触发到 audio 标签 调整音量
        this.$bus.$emit("volume", redHeight);
      }
    },
    // 显示播放列表
    showList() {
      this.$bus.$emit("isShow");
    },
    // 拖拽音量进度条
    mousD(e) {
      let _this = this;
      let oT = this.$refs.yuan.offsetTop;
      let sT = e.clientY - -oT;
      let zong = this.$refs.volumeBar.offsetHeight;
      document.onmousemove = function (event) {
        let h = -(event.clientY - sT);
        if (h <= 0) {
          h = 0;
        } else if (h > zong) {
          h = zong;
        }
        let bo = (h / zong) * 100;
        _this.height = `height:${bo}%`;
        // 然后将 百分比存到本地
        localStorage.setItem("volume", JSON.stringify(bo + "%"));
        // 将音量触发到 audio 标签 调整音量
        _this.$bus.$emit("volume", bo);

        if (bo == 0) {
          _this.icon = "iconfont icon-24gl-volumeZero";
        } else {
          _this.icon = "iconfont icon-yinliang";
        }
      };

      document.onmouseup = function () {
        document.onmousemove = null;
      };
    },
    // 是否显示已添加到播放列表提示框
    showAddShow() {
      this.addShow = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.addShow = false;
      }, 3000);
    },
    // 修改播放模式
    changeIcon(icon) {
      // 显示播放模式提示框
      clearTimeout(this.timer);
      this.showPatternTips = true;

      if (icon === "iconfont icon-xunhuan") {
        this.iconfont = "iconfont icon-suiji";
        this.msg = "随机";
        // 将播放模式改为随机
        this.$store.commit("CHANGESONGSTATE", "random");
      } else if (icon === "iconfont icon-suiji") {
        this.iconfont = "iconfont icon-danquxunhuan";
        this.msg = "单曲循环";
        // 将播放模式改为单曲循环
        this.$store.commit("CHANGESONGSTATE", "SingleCirculation");
      } else {
        this.iconfont = "iconfont icon-xunhuan";
        this.msg = "循环";
        // 将播放模式改为列表循环
        this.$store.commit("CHANGESONGSTATE", "loop");
      }
      // 关闭提示框
      this.timer = setTimeout(() => {
        this.showPatternTips = false;
      }, 2000);
    },
    // 关闭音量条
    closeVloume(e) {
      if (!e.target.contains(this.$refs.volume)) {
        if (this.flag) {
          this.flag = false;
        }
      }
    },
  },
  computed: {
    songNum() {
      if (this.song) {
        return this.song.length;
      } else {
        return 0;
      }
    },
  },
  beforDestory() {
    document.body.removeEventListener("click", this.closeVloume);
  },
};
</script>

<style scoped>
#controls {
  margin-top: 10px;
  display: flex;
}
#controls > .volume {
  position: relative;
}
/* 调节音量 */
.volume-change {
  position: absolute;
  top: -123px;
  left: 0;
  width: 32px;
  height: 113px;
  background: rgba(0, 0, 0, 0.8);
  transform: rotate(180deg);
  z-index: 99;
}
/* 音量条 */
.bar {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 93px;
  border-radius: 10px;
  background: #151515;
}
/* 红色的音量条 */
.bar-red {
  position: absolute;
  top: 0;
  width: 100%;
  background: red;
}
/* 小圆点 */
.bar-red > span {
  position: absolute;
  bottom: -10px;
  left: -7px;
  width: 18px;
  height: 20px;
  background: url(https://s2.music.126.net/style/web2/img/iconall.png?878bc4ddd445a94be4e7a3b48ad1ede5)
    no-repeat;
  background-position: -40px -250px;

  cursor: pointer;
}
.bar-red > span:hover {
  background-position: -40px -280px;
}
.bar-red > span > i {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: red;
}
#controls > .volume,
#controls > .loop {
  position: relative;
  width: 25px;
  height: 25px;
  /* background: red; */
  margin-right: 6px;
  text-align: center;
  line-height: 25px;
}
#controls > .volume > a,
#controls > .loop > a {
  color: #939393;
  font-size: 20px;
  font-weight: 600;
}

#controls > .volume > a:hover,
#controls > .loop > a:hover {
  color: #fff;
}

.pattern-tips {
  position: absolute;
  top: -45px;
  left: -28px;
  width: 81px;
  height: 39px;
  line-height: 34px;
  background: url("https://s2.music.126.net/style/web2/img/frame/playbar.png?63b2af2f5892172bc9e41ec724c3f6a0")
    no-repeat;
  background-position: 0 -457px;
  color: #fff;
  font-size: 12px;
  z-index: 999;
}
.list {
  position: relative;
  left: 2px;
  cursor: pointer;
  margin-top: 2px;
  width: 38px;
  height: 20px;
  border-radius: 25px;
  padding-right: 20px;
  background: #212121;
}
.list:hover a {
  color: #fff;
}
.list > a {
  position: absolute;
  left: 0px;
  top: 55%;
  transform: translateY(-50%);
  font-size: 21px;
  font-weight: 600;
  color: #939393;
}

.list > span {
  position: absolute;
  right: 15px;
  top: 55%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #666666;
}
</style>
