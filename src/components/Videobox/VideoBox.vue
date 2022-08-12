<template>
  <div id="video-box">
    <!-- MV -->
    <div v-if="Vdetail">
      <!-- 视频标题和作者或mv作者 -->
      <div style="overflow: hidden; padding-top: 10px; margin-bottom: 8px">
        <!-- 视频标题 -->
        <h2 class="video-title">
          <i class="mv-icon" v-if="$route.path === '/mv'"></i>
          {{ Vdetail.name }}
        </h2>
        <!-- 视频歌手或作者 -->
        <div style="float: left; white-space: nowrap">
          <a
            href="javascript:;"
            class="author"
            v-for="(item, index) in Vdetail.artists"
            :key="item.id"
            @click="toSinger(item.id)"
            >{{ item.name }}
            <span>{{ index === Vdetail.artists.length - 1 ? "" : "/" }}</span>
          </a>
        </div>
      </div>
      <!-- 视频框 -->
      <div
        class="v-box"
        @mousemove="showIsShow"
        @mouseleave="delayedIsShow"
        @click="toggleVideo"
        id="vbox"
      >
        <video
          id="video"
          class="video"
          :src="Vurl.url"
          ref="video"
          :poster="Vdetail.cover"
          @timeupdate="playing"
          @ended="endTime"
          @waiting="showload"
          @playing="videoPlay"
          @progress="hcProgress"
          @canplay="canplay"
        ></video>
        <!-- 视频暂停 -->
        <a
          href="javascript:;"
          class="video-state"
          v-show="!flag && !resetVideo"
          @click.stop="toggleVideo"
        ></a>
        <!-- 加载动画 -->
        <span class="loading" v-show="showLoading"></span>
        <!-- 视频结束显示重播 -->
        <div class="end-video" v-if="resetVideo">
          <!-- 重播按钮 -->
          <a href="javascript:;" class="reset-btn" @click="resetPlay"></a>
          <span class="reset-text">重播</span>
        </div>

        <!-- 控制栏 -->
        <div class="controls" :class="{ show: isShow }" @click.stop="stopboule">
          <!-- 播放按钮 -->
          <div
            class="play"
            @click.stop="toggleVideo"
            :class="{ pause: flag }"
          ></div>
          <!-- 当前视频播放时间 -->
          <span class="cur-tiem">{{ vCurTime | formatTimer }}</span>
          <!-- 进度条(最外层) -->
          <div
            class="progress"
            @click="jumpProgress"
            ref="progress"
            @mousemove="showTime"
            @mouseleave="hideMouseTime"
          >
            <!-- 鼠标悬浮显示对应的视频视长 -->
            <div
              class="mouse-time"
              v-show="showMouseTime"
              :style="{ left: mouseTimeLeft + 'px' }"
            >
              {{ MouseTimeNumber | formatTimer }}
            </div>
            <!-- 缓存进度条 -->
            <div class="hc-progress" id="hc-progress"></div>
            <!-- 播放进度进度条 -->
            <div class="cur-progress">
              <!-- 小圆点 -->
              <span
                ref="yuan"
                class="cur-yuan"
                @mousedown="dropProgress"
                :style="{ left: yuanLeft + 'px' }"
              ></span>
            </div>
          </div>
          <!-- 视频总时长 -->
          <span class="d-time">{{ videoDuration | formatTimer }}</span>
          <!-- 音量 -->
          <div
            class="volum"
            @mouseenter="showVolume = true"
            @mouseleave="showVolume = false"
          >
            <!-- 音量进度 -->
            <div
              class="volum-progress-box"
              @click.stop="stopboule"
              v-show="showVolume"
            >
              <!-- 总进度条 -->
              <div
                class="volum-progress"
                @click="jumpVolum"
                ref="volumProgress"
              >
                <div
                  class="volum-progress-red"
                  :style="{ height: volumeHeight + '%' }"
                >
                  <!-- 小圆点 -->
                  <span
                    class="volum-yuan"
                    ref="volumYuan"
                    @mousedown.stop="volumeMouse"
                    :style="{ top: vTop + 'px' }"
                  ></span>
                </div>
              </div>
            </div>
            <i :class="iconYinLiang"></i>
          </div>
          <em>|</em>
          <!-- 清晰度列表 -->
          <div
            class="definition"
            @mouseenter="qingxidu = true"
            @mouseleave="qingxidu = false"
          >
            <span>{{ Vurl.r | formatBrs }}</span>
            <!-- 弹出清晰度框 -->
            <ul
              v-if="Vurl"
              class="definition-list"
              v-show="qingxidu"
              :style="{ top: posion + 'px' }"
            >
              <li
                v-for="(item, index) in brs"
                :key="index"
                :class="{ active: Vurl.r === item.br }"
                @click="toggleBrs(item.br)"
              >
                {{ item.br | formatBrs }}
              </li>
            </ul>
          </div>
          <em>|</em>
          <!-- 全屏按钮 -->
          <a href="javascript:;" class="quanping" @click.stop="FullScreen"></a>
        </div>
      </div>
    </div>
    <!-- 视频 -->
    <div v-else>
      <!-- 视频标题和作者或mv作者 -->
      <div
        style="overflow: hidden; padding-top: 10px; margin-bottom: 8px"
        v-if="videoDetail"
      >
        <h2 class="video-title">
          {{ videoDetail.title }}
        </h2>
        <span class="span-author">
          by
          <a href="javascript:;" class="author"
            >{{ videoDetail.creator.nickname }}
          </a>
        </span>
      </div>

      <!-- 视频框 -->
      <div
        class="v-box"
        @mousemove="showIsShow"
        @mouseleave="delayedIsShow"
        @click="toggleVideo"
        id="vbox"
      >
        <video
          v-if="VideoUrl"
          id="video"
          class="video"
          :src="VideoUrl.urls[0].url"
          ref="video"
          :poster="videoDetail.coverUrl"
          @timeupdate="playing"
          @ended="endTime"
          @waiting="showload"
          @playing="videoPlay"
          @progress="hcProgress"
          @canplay="canplay"
        ></video>
        <!-- 视频暂停 -->
        <a
          href="javascript:;"
          class="video-state"
          v-show="!flag && !resetVideo"
          @click.stop="toggleVideo"
        ></a>
        <!-- 加载动画 -->
        <span class="loading" v-show="showLoading"></span>
        <!-- 视频结束显示重播 -->
        <div class="end-video" v-if="resetVideo">
          <!-- 重播按钮 -->
          <a href="javascript:;" class="reset-btn" @click="resetPlay"></a>
          <span class="reset-text">重播</span>
        </div>

        <!-- 控制栏 -->
        <div class="controls" :class="{ show: isShow }" @click.stop="stopboule">
          <!-- 播放按钮 -->
          <div
            class="play"
            @click.stop="toggleVideo"
            :class="{ pause: flag }"
          ></div>
          <!-- 当前视频播放时间 -->
          <span class="cur-tiem">{{ vCurTime | formatTimer }}</span>
          <!-- 进度条(最外层) -->
          <div
            class="progress"
            @click="jumpProgress"
            ref="progress"
            @mousemove="showTime"
            @mouseleave="hideMouseTime"
          >
            <!-- 鼠标悬浮显示对应的视频视长 -->
            <div
              class="mouse-time"
              v-show="showMouseTime"
              :style="{ left: mouseTimeLeft + 'px' }"
            >
              {{ MouseTimeNumber | formatTimer }}
            </div>
            <!-- 缓存进度条 -->
            <div class="hc-progress" id="hc-progress"></div>
            <!-- 播放进度进度条 -->
            <div class="cur-progress">
              <!-- 小圆点 -->
              <span
                ref="yuan"
                class="cur-yuan"
                @mousedown="dropProgress"
                :style="{ left: yuanLeft + 'px' }"
              ></span>
            </div>
          </div>
          <!-- 视频总时长 -->
          <span class="d-time">{{ videoDuration | formatTimer }}</span>
          <!-- 音量 -->
          <div
            class="volum"
            @mouseenter="showVolume = true"
            @mouseleave="showVolume = false"
          >
            <!-- 音量进度 -->
            <div
              class="volum-progress-box"
              @click.stop="stopboule"
              v-show="showVolume"
            >
              <!-- 总进度条 -->
              <div
                class="volum-progress"
                @click="jumpVolum"
                ref="volumProgress"
              >
                <div
                  class="volum-progress-red"
                  :style="{ height: volumeHeight + '%' }"
                >
                  <!-- 小圆点 -->
                  <span
                    class="volum-yuan"
                    ref="volumYuan"
                    @mousedown.stop="volumeMouse"
                    :style="{ top: vTop + 'px' }"
                  ></span>
                </div>
              </div>
            </div>
            <i :class="iconYinLiang"></i>
          </div>
          <em>|</em>
          <!-- 清晰度列表 -->
          <div
            class="definition"
            @mouseenter="qingxidu = true"
            @mouseleave="qingxidu = false"
          >
            <span v-if="VideoUrl">{{ VideoUrl.urls[0].r | formatBrs }}</span>
            <!-- 弹出清晰度框 -->
            <ul
              class="definition-list"
              v-show="qingxidu"
              v-if="VideoUrl"
              :style="{ top: posion + 'px' }"
            >
              <li
                v-for="(item, index) in brs"
                :key="index"
                :class="{ active: VideoUrl.urls[0].r === item.resolution }"
                @click="toggleBrs(item.resolution)"
              >
                {{ item.resolution | formatBrs }}
              </li>
            </ul>
          </div>
          <em>|</em>
          <!-- 全屏按钮 -->
          <a href="javascript:;" class="quanping" @click.stop="FullScreen"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoBox",
  props: {
    // mv
    Vdetail: {
      type: Object,
      default() {
        return null;
      },
    },
    // mv
    Vurl: {
      type: Object,
      default() {
        return null;
      },
    },
    // 视频
    videoDetail: {
      type: Object,
      default() {
        return null;
      },
    },
    // 视频
    VideoUrl: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      // 清晰度选择框
      qingxidu: false,
      // 是否显示工具狂
      isShow: false,
      // 定时器开关
      timer: null,
      time: null,
      // 是否播放状态,默认没有播放
      flag: false,
      // 是否显示重播按钮
      resetVideo: false,
      // 视频总时长
      videoDuration: 0,
      // 视频正在播放的时长
      vCurTime: 0,
      // 进度条小圆点的 left
      yuanLeft: -12,
      // 是否显示加载动画
      showLoading: false,
      // 音量进度条
      volumeHeight: 100,
      // 音量条小圆点
      vTop: 58,
      // 音量框是否显示
      showVolume: false,
      // 音量图标
      iconYinLiang: "iconfont icon-yinliang",
      // 清晰度(数组排序后的)
      brs: null,
      // 切换清晰度之前保存之前的播放时间
      brsCurTime: 0,
      // 切换清晰度的定时器
      toggleBreTime: null,
      // 是否全屏
      showQuanPing: false,
      // 视频框DOM元素，用于隐藏鼠标
      vbox: null,
      // 是否动态显示视频时长框
      showMouseTime: false,
      // 时长框随着鼠标的移动而移动
      mouseTimeLeft: 0,
      // DOM元素
      progress: null,
      // 显示的时长
      MouseTimeNumber: 0,
    };
  },
  created() {
    this.$bus.$emit("pause");
    setTimeout(() => {
      if (this.Vdetail !== null) {
        let brs = JSON.parse(JSON.stringify(this.Vdetail.brs));
        this.brs = brs.sort((a, b) => {
          return b.br - a.br;
        });
      } else {
        let brs = JSON.parse(JSON.stringify(this.videoDetail.resolutions));
        this.brs = brs.sort((a, b) => {
          return b.resolution - a.resolution;
        });
      }
    }, 500);
  },
  mounted() {
    // 开局默认显示工具栏，五秒后如果鼠标没有进入视频框则消失
    this.delayedIsShow();
    this.vbox = document.querySelector("#vbox");
    setTimeout(() => {
      this.progress = this.$refs.progress;
    });
  },
  filters: {
    formatBrs(value) {
      switch (value) {
        case 240:
          return "标清";
        case 480:
          return "高清";
        case 720:
          return "超清";
        case 1080:
          return 1080;
      }
    },
  },
  methods: {
    toSinger(id) {
      this.$router.push({
        path: "/singer",
        query: {
          id,
        },
      });
    },
    // 显示工具栏
    showIsShow() {
      this.vbox.style.cursor = "default";
      // 如果为true 代表到结尾了，工具栏不会消失
      if (this.resetVideo) {
        return;
      }
      if (!this.flag) {
        return;
      }
      // 显示工具栏
      this.isShow = false;
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        this.isShow = true;
        this.vbox.style.cursor = "none";
      }, 5000);
    },
    // 工具栏消失
    delayedIsShow(e) {
      if (this.resetVideo) {
        return;
      }
      if (!this.flag) {
        return;
      }
      clearTimeout(this.time);
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isShow = true;
      }, 5000);
    },
    // 视频准备好开始播放时触发
    canplay() {
      let video = this.$refs.video;
      this.videoDuration = video.duration;
    },
    // 播放或暂停视频
    toggleVideo(e) {
      try {
        let video = this.$refs.video;
        if (this.showLoading) {
          video.pause();
          this.flag = false;
          this.showLoading = false;
          return;
        }
        if (e.target.className === "play" && this.resetVideo) {
          video.load();
          video.play();
          this.resetVideo = false;
          this.flag = true;
        } else if (this.resetVideo) {
          return;
        } else {
          if (!this.flag) {
            // 如果没有播放，点击按钮播放
            video.play();
            this.flag = true;
          } else {
            video.pause();
            this.flag = false;
          }
        }
      } catch (error) {}
    },
    // 重播
    resetPlay() {
      let video = this.$refs.video;
      video.load();
      setTimeout(() => {
        this.toggleVideo();
      }, 500);
      this.resetVideo = false;
    },
    // 视频正在播放
    playing() {
      try {
        this.vCurTime = this.$refs.video.currentTime;
        let curProgress = document.querySelector(".cur-progress");
        let progress = this.$refs.progress;
        // 设置当前正在播放的进度条进度
        this.curProgressWidth =
          (this.vCurTime / this.videoDuration) * 100 + "%";
        curProgress.style.width =
          (this.vCurTime / this.videoDuration) * 100 + "%";
        this.yuanLeft =
          (this.vCurTime / this.videoDuration) * progress.offsetWidth - 12;
      } catch (error) {}
    },
    // 视频播放结束时触发
    endTime() {
      let video = this.$refs.video;
      video.currentTime = 0;
      this.curProgress = 0;
      clearTimeout(this.timer);
      clearTimeout(this.time);
      this.flag = false;
      this.isShow = false;
      this.resetVideo = true;
      this.vbox.style.cursor = "default";
    },
    // 跳转进度条
    jumpProgress(e) {
      let curProgress = document.querySelector(".cur-progress");
      if (e.target.className !== "cur-yuan") {
        let video = this.$refs.video;
        let yuan = this.$refs.yuan;
        this.resetVideo = false;
        let progressWidth = this.$refs.progress.offsetWidth;
        let w = e.offsetX / progressWidth;

        // 实现小圆点跳转
        this.yuanLeft = e.offsetX - yuan.offsetWidth / 2;
        // 实现进度条跳转
        curProgress.style.width = w * 100 + "%";
        // 实现视频跳转
        video.currentTime = w * this.videoDuration;
        // 播放视频
        this.flag = true;
        video.play();
      }
    },
    // 拖拽进度条
    dropProgress(e) {
      let _this = this;
      let curProgress = document.querySelector(".cur-progress");
      let video = this.$refs.video;
      let zong = this.$refs.progress;
      let yuan = this.$refs.yuan;
      let le = e.clientX - yuan.offsetLeft;
      // 进度条的宽度
      document.onmousemove = function (event) {
        let left = event.clientX - le;
        if (left < yuan.offsetWidth / -2) {
          left = yuan.offsetWidth / -2;
        } else if (left > zong.offsetWidth - yuan.offsetWidth / 2) {
          left = zong.offsetWidth - yuan.offsetWidth / 2;
        }
        // 设置小圆点
        _this.yuanLeft = left;
        // 设置进度条宽度
        curProgress.style.width =
          ((left + yuan.offsetWidth / 2) / zong.offsetWidth) * 100 + "%";
        // 设置视频播放(以防进度条闪烁)
        try {
          video.currentTime =
            ((left + yuan.offsetWidth / 2) / zong.offsetWidth) *
            _this.videoDuration;
          // 播放视频
          _this.flag = true;
          video.play();
        } catch (error) {}
      };
      // 鼠标抬起，跳转视频
      document.onmouseup = function () {
        document.onmousemove = null;
      };
    },
    // 阻止冒泡
    stopboule() {},
    // 全屏
    FullScreen() {
      let Ovbox = document.querySelector("#vbox");
      // 默认没有全屏
      if (!this.showQuanPing) {
        if (Ovbox.requestFullscreen) {
          Ovbox.requestFullscreen();
        } else if (Ovbox.mozRequestFullScreen) {
          Ovbox.mozRequestFullScreen();
        } else if (Ovbox.webkitRequestFullScreen) {
          Ovbox.webkitRequestFullScreen();
        }
        this.showQuanPing = true;
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        this.showQuanPing = false;
      }
    },
    // 当视频将要播放时执行
    videoPlay() {
      this.showLoading = false;
    },
    // 当视频要加载下一帧而停止播放时执行
    showload() {
      this.showLoading = true;
    },
    // 跳转音量
    jumpVolum(e) {
      let volume = this.$refs.volumProgress;
      let video = this.$refs.video;
      if (e.target.className !== "volum-yuan") {
        this.vTop = e.offsetY - 12;
        this.volumeHeight = (e.offsetY / volume.offsetHeight) * 100;
        video.volume = (e.offsetY / volume.offsetHeight).toFixed(1);
      }
    },
    // 拖拽音量
    volumeMouse(e) {
      let _this = this;
      let volumYuan = this.$refs.volumYuan;
      let volumProgress = this.$refs.volumProgress;
      let video = this.$refs.video;
      let st = e.clientY - -volumYuan.offsetTop;
      document.onmousemove = function (event) {
        let vt = -(event.clientY - st);
        if (vt < -12) {
          vt = -12;
        } else if (vt > 58) {
          vt = 58;
        }
        vt == -12
          ? (_this.iconYinLiang = "iconfont icon-24gl-volumeZero")
          : (_this.iconYinLiang = "iconfont icon-yinliang");
        _this.vTop = vt;
        _this.volumeHeight = ((vt + 12) / volumProgress.offsetHeight) * 100;
        video.volume = (_this.volumeHeight / 100).toFixed(1);
      };
      document.onmouseup = function () {
        document.onmousemove = null;
      };
    },
    // 缓存进度条
    hcProgress() {
      let video = this.$refs.video;
      let progress = document.querySelector("#hc-progress");
      if (video.buffered.length > 0) {
        progress.style.width =
          (video.buffered.end(video.buffered.length - 1) / this.videoDuration) *
            100 +
          "%";
      }
    },
    // 切换清晰度清晰度
    toggleBrs(r) {
      let p = this.$route.path;
      if (p === "/mv") {
        if (r === this.Vurl.r) {
          return;
        } else {
          // 将当前的播放时间保存
          this.brsCurTime = this.vCurTime;
          // 告知父组件切换清晰度
          this.$emit("toggleBrs", r);
        }
      } else {
        return;
        // // 无法切换,接口没有对应参数
        // if (r === this.VideoUrl.urls[0].r) {
        //   return;
        // } else {
        //   // 将当前的播放时间保存
        //   this.brsCurTime = this.vCurTime;
        //   // 告知父组件切换清晰度
        //   this.$emit("toggleBrs", r);
        // }
      }
    },
    // 切换清晰度之后，将视频时间重新赋值
    resetBrs() {
      let video = document.querySelector("#video");
      if (this.flag) {
        video.currentTime = this.brsCurTime;
        let timer = null;
        video.addEventListener("seeking", function () {
          clearTimeout(timer);
          timer = setTimeout(() => {
            video.play();
          }, 200);
        });
      } else {
        video.load();
        video.currentTime = this.brsCurTime;
      }
    },
    // 动态显示视频视长
    showTime(e) {
      this.showMouseTime = true;
      let i = e.clientX - this.vbox.offsetLeft - this.progress.offsetLeft;
      if (i <= 0) {
        i = 0;
      }
      this.mouseTimeLeft = i - 15;
      this.MouseTimeNumber =
        (i / this.progress.offsetWidth) * this.videoDuration;
    },
    // 隐藏
    hideMouseTime() {
      this.showMouseTime = false;
    },
  },
  computed: {
    // 清晰度列表定位
    posion() {
      let _this = this;
      if (this.Vdetail !== null) {
        if (_this.Vdetail.brs.length === 3) {
          return -75;
        } else if (_this.Vdetail.brs.length === 4) {
          return -100;
        }
      } else {
        if (_this.videoDetail.resolutions.length === 3) {
          return -75;
        } else if (_this.videoDetail.resolutions.length === 4) {
          return -100;
        } else if (_this.videoDetail.resolutions.length === 2) {
          return -50;
        } else if (_this.videoDetail.resolutions.length === 1) {
          return -25;
        }
      }
    },
  },
  beforeDestroy() {
    this.hcProgress = null;
    this.toSinger = null;
    this.showIsShow = null;
    this.delayedIsShow = null;
    this.canplay = null;
    this.toggleVideo = null;
    this.resetPlay = null;
    this.playing = null;
    this.endTime = null;
    this.jumpProgress = null;
    this.dropProgress = null;
    this.FullScreen = null;
    this.videoPlay = null;
    this.showload = null;
    this.jumpVolum = null;
    this.volumeMouse = null;
    this.toggleBrs = null;
    this.resetBrs = null;
  },
};
</script>

<style scoped>
.video-title {
  float: left;
  font-size: 24px;
  color: #333;
  margin-top: -10px;
  max-width: 100%;
  line-height: 32px;
  margin-right: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
}
.span-author {
  float: left;
  font-size: 12px;
  color: #999;
}
a.author {
  font-size: 12px;
  color: #0c73c2;
  margin: 4px 0 0 0;
  line-height: 17px;
}
a.author:hover {
  text-decoration: underline;
}
.mv-icon {
  display: inline-block;
  width: 29px;
  height: 18px;
  background: url(https://s2.music.126.net/style/web2/img/icon2.png?1dc595844449748be0ff0974f1a7dd52)
    no-repeat;
  background-position: -230px -480px;
}

/* 视频框 */
.v-box {
  width: 640px;
  height: 360px;
  background-color: #2e2e2e;
  position: relative;
  overflow: hidden;
}
.video {
  width: 100%;
  height: 100%;
}
.video-state {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 74px;
  height: 74px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAwFBMVEUAAAATExMlJSUHBweRkZH///////9HcEz09PT///////////////8cHBz///+0tLT////////////b29vy8vLv7+////////98fHz///9AQEA3Nzf////Pz8////9lZWXDw8P////////////e3t6bm5vY2Njw8PCxsbH///+5ublgYGBdXV3////////////k5ORdXV0wMDDt7e2mpqb////h4eF4eHhCQkKNjY3JyclPT0/U1NTQ0NDc3Nzg4ODNvLiUAAAAQHRSTlNmaGlnc2F+APCABx95aWR3DVMKe+1+WitxSmtrA3pxb3g+Imh8oNDrr1d4b244OiXbg3Pnp3fYjnmZwn7Lx9R8wCePZgAAAi9JREFUSMell9da3DAQhcdVc9zLFrb3Ql3CsoEEkrz/W+WCJWAsW3J8Lm39n+yZ0dEMCam8wyKNpgEQTKN0cfDkq0jyLLmLXBTkRneJFuz3XABzezY0DSLDHM7sOQC35yth3wEQ31hUkHUTA3D8WjhJgdw2SCLDzoE0qYb7Abo2VcruIuhXwOMBEJtUIzMGBmMZ7DnABSl0AThZGc5W+DMipUY5VtlX2FthYpKGwglWXhEeO5iERJq0My7AA6xN0pS5xuAz3AdGpK0R0P+Ak0Ad52LMg+QffImYGinG5Tu8RDdsBoddLM+wA5sayobzBvvIqbFy+EKQED3Zxpvd9ql+654QJDIXkjN4z8w/H6phA24mSNziSvJyx8x8/FFNX+FWkHBwLXnHb3p9roKv4QjyXFjVMO82lhy24Hp0wJxqYObti5ye40ALeZI/YN49WvJ4LyjFTAEzf/8mWTFDShGGSpg7+3I2h4hoClMNM9+XNjcxpQCGDsy7TalMAgJIC2bef1kCNICPpURrf3Zp5xAn3YBx51ESMK1UyVI9RKRVJNzZW9IiUZcn8++XivJUHoyq2p7joDqSzNvn6iNZbwZ83NSZQYUNndlfD/U2JDfAdw+z6g1Qbr0q9zxbr9z0N8fXJx3Tb3XdtLvoWl2x7S73Vm2FEAOstX87zIsNTbtWSmRNmrhM0j6u/7d9bNe4tmuZ2zXrLccE1YCybDQaWVaj0ajlUPZpHDy57qluHPwLCJFHIPLGbYAAAAAASUVORK5CYII=);
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
}
.video-state:hover {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABKCAMAAAArDjJDAAABKVBMVEU7Ozv///////9JSUn///////8+Pj5HcEz09PT///88PDz///9DQ0P///////////////////9BQUH///////////////////////9OTk7///////9VVVX///9dXV3///////////////////91dXVgYGBSUlJubm7///////////9TU1NmZmZpaWmnp6f///9ZWVn////////////////////Dw8P////i4uJycnL///////9GRkb////y8vL////////Ozs5qamry8vKWlpb///9jY2OFhYXGxsbo6Ojv7+/////////Z2dn///+ZmZl6enrh4eGJiYnc3Nx/f3+BgYH////////AwMCysrK5ubn///////+kpKTW1taSkpKnp6eHh4fV1dWbfFtZAAAAY3RSTlOFAgOJAQSFAPOZhQaICBkjDgyGHgkxFRsrixATjjKQEhcuJSibko2XCgsgh5SWkIGPOBFjTZSSU5aZdnqIhPE8cpSJmI1viYzK5u6OPpWHrZ3fpNuLjD1/xLzBjD+Plam0jNY27mMaAAAFIUlEQVRYw62Y+1faWBDHL1BoRgQSIBCAQAKCvJWXIIIc8dWqdbfbh1vbutv9//+InZsA5HFjomV+8nj0c74zczMv8tbF3qzN7S/JsxCfz+/3BzXDH3y+Z4HEkeOjkHA4EklqFomEw2EE+hxpxIHjQ0wkWRcEns9qxvO8UE8iL+hzoBG2IOTUBD5bTKUUJaqboqSKWV6oRVAbE2ZH6aA630sp0XSiEVtbI5GOKqkeX9dhriiUpIGKqWiiUSpLqiqKMpooqqpULiEuVdRgdmGEIamGoDRyVLk76E9mt0OA4e1s0h90ZRVpFFYLh23CiE1SUuhRkCTe9Q/AYgf9H6JEYT0haRNGTCRNUi6aKEny4AQA4Kzza9GcEjJtLn51zuhvTgayVEpEcygs6DexiNm5iJBNpWOSOKCCjj6HiMlCn4+otIEoxdKprBAxR59YSEUlUVK/TgDGnQBhWKAzBph8VUsJpWhhEaN3SSGXbpTF0RDOOzvEwXY65zAcieVGOickjT5uUFRTDp2TL9G1JnG2nSa6edlFJ3NUlw2FudNJ3QeAC+JiFxixFWvtIlmTwkIRSfMZjK+Iq12N4X6OrKIQXrNWKH+4llUaUncGH5rEgzU/wKwrNZRsLew3oVBUkk8lyvKDR5LGepDLiRSfXMkia/dy6ZJ4CWMTaYeaE2sMl2IJw7Vykazc60Vj6gjgysgJLY2NuwIYqbFob+UiWWYP3ZPuhsbcISge30WLxx1gFzC8k9DFZRaJLqpeRPdO4MhM2t0NUEMaG3YEJ+hisa7LoihNVEMawHnTiIojKFNFywSmCGOwmucwkBqaLB31xqeJkg+gY/x0kZTJHxbQDhHGFvYTDmRNFvWQolaixsQkCkmFSqvdblUQFtBhVtZ4JUtH+YKYPhqpjgm1G6gWWo+nH/893m9XCvmMFjKrsA6NFiaRekho0AV8nXMAY1XZiU8z+Ur7Pcdx//21t9/aeGmuOQBzfKcCDTxFRXilofaN6aOoQPWwdXyKKO7m295xu8UWdgR9taHwER0VTGajNOhfTAUTUYX2HqfbJxTWrrCEfaGBj2aTQYryBTF/5S6AqfrSUFXWKO7m0UFYCKBbxhxisBBFQyWN4IxYUPnC/hrFcR//MQgzsM5gJNFgURSNOg1Vx4aqGFHc6d9/roTFDT52aLBo3N8SLeoxdQLXLiiOe/8HprJiYV3DRI1pcV+ixBksXFHc6TsUpunaoBYwE1coLYHiLTTdUVTYcatQpbLW3yHcinoKlyh5CFMvKO70cb9ymJluUAEYymYUAPGE4rh3LfwiDcECeDXqRvNwjYrbUF4dtKnKwNAcK69hx9dliZUx7C94DKwMGh+D9yfKfFeGJ+r5w8HPkPXaDR/OM5+zp2/Q+Dk7FhlPlcFUZBxKn8d6ZSp97IJsr6Ls8m4uyA5twlLb2U3H3CYcmld810vHMTcvp5aq9cFvN582fZDRoC0tddPof5q683TTnfNV9thgbfTs8UObGap0ZjjMO80MGev44TQUrSaZjOMkYx+KmKOabb7yNKqxB0g6Pmpjn9PUxxogHcZal1mUPdZuhu0DeLKNyA4D8hNmzz5sb1aA+b3XFeCJrhOMFcCwmNz/7mKyxXXJsMR13ZY44rLE2VZLZ5LrarnFhXeba7jDceB60QyEQoHm4voFxwHryeLHb5wsHA4p3+kh5fsLDymm8056fd4R6XXnxeedbR6dtnoKsx3o+OV97hUHuq2eDbd7zHzFifV/0Ogo7eAW+MoAAAAASUVORK5CYII=");
}
/* 加载动画 */
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12.5px;
  margin-left: -12.5px;
  width: 25px;
  height: 25px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTJGMTY4N0Q4OUNEMTFFNTg3NjdCRkQ0MUY1NDc0MjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTJGMTY4N0U4OUNEMTFFNTg3NjdCRkQ0MUY1NDc0MjMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMkYxNjg3Qjg5Q0QxMUU1ODc2N0JGRDQxRjU0NzQyMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMkYxNjg3Qzg5Q0QxMUU1ODc2N0JGRDQxRjU0NzQyMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrcE36MAAAI5SURBVHjarJZNaxRBEIZneia7WY35UC+zOZhD8ORpFf+AIbkHRMGr+KcUbx6861EhEAi4IoIecshBidkQFE2McdyvGd9a3oq1LZtMZlPwBHY3009XdXf1hHmeBwVjFtwFCeiAA7ANNsEn0Bv1YHgGyTK4CZwh5G9HYB28AX3/QRcUjzZnK4NkRGd4EayAR+DqqZm8rddD+/lWq6X/UAVL4AoHlfJFJiuNFDwDX/6TcPCIs7Pm3Ihs1MAiuA3qnkiyfgK++eWqUBKZGQYjBDrjD+ApeMnPXZYzBqs6hmMWFUomDBkEWYG1kkm8A8/Bb2YhsjmZ40DCMl1izVXWKyiw8Rm8YkZ/uM0bkpVjbWuUCBEEnaBcfAQ7FKWs1IL8mQaThjQoH1q6I5ZOSGSBZlgi3ffjSCRalMTMZEolISVpibXwQxb9O8+S7NKBbdqc4l5wPnHIiUsmUcxSOYryc5J0uR4ybu448AWmdxlbemJMgWNVdOEP5ItflKioPqakZs5KqpJdT9Lwm+QZY5IC5afjhZOZQzkPbpQU6FFok8GhdNiyPR6gCmchojvI5lqJtYjZTjqUHOrCD3ok+MHGWGXp7kFUtHR6p3QNKhu6T+RGe0iJRsYTvAG2RvS00FzD9vPxkRi6GSGSnfWAG8CKMj60z5bxFbyGtG0G9nvYP2szSfyZSZu5z7cS+5CV9fnSsFZ0sfyQV53H4AUXLjAtwrEfxV5ZT4x4xPcZN8N7cJ0kpmPvgWZRyV8BBgA25MVVFgGwPAAAAABJRU5ErkJggg==)
    no-repeat;
  animation: video-loading 2s linear forwards infinite;
  z-index: 9;
}
@keyframes video-loading {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(-360deg);
  }
}
.end-video {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
}
.reset-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 74px;
  height: 74px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAA9lBMVEUAAAD///////8ODg7///8eHh7///9HcEz///+EhITU1NQJCQn///////////////+rq6t3d3cXFxf///////////9ubm43NzdRUVEuLi7///9aWlr///+4uLj////k5OT4+PiBgYH+/v60tLT///++vr7w8PDz8/Onp6e4uLj39/eqqqr///9OTk6IiIjw8PDr6+vExMT////////ExMRra2v7+/s2NjYUFBT////Hx8f///////////+goKApKSnt7e3m5ubo6OjJyckiIiKOjo7////IyMjS0tLm5ube3t7AwMC9vb1ycnLg4OCSkpL///////9m8kqvAAAAUXRSTlNmBhlmTmYJAGZmZmhlQmBHZo1mUSL+ZmZmZi1mW2Yc3PWT/LBMZmbvZrTzqjB9lurkvgJTZoj6dWsPvzw7YaRx593gwm+ZA2bKZtW5uIzYmzKo0XWdAAAC7UlEQVRIx62X53baQBCFRyCJi0QvoYMpxxgBBmyMfVxwL3GL5/1fJsgmwK4ko0S5PwDt0cfuzs7MzlDEVUp9EM9WE0Cimo0P6or7W+QyppfVGATF1LLuCw4lbbIWrRS0MFFYK1SiNZtPhrbCIRXAXpEkFfcAqKFvYT0OGNEwuSgcNYC47g3nEtiNkqeiu0jkPOCDcyCl0TfSUsD5gxusdIAftEU/gI7ihPUsjBJtVcnAoS7DShaPGvlQZoqsIsIHHTxmyJcyj+gcCPA5DI18SjNwtgnngBL5VgnIrWE9sd3Oos0T+gqOI0V/pT0k/8Ah7K433Gh8fZvNyXW31bJuJk3TabSfqC9hFRs+yWx/3rW7vJLVu3N4KtQvOASDJPh+gV71msemeZxujxf4L5k2EPqEk5sT27A5Yb5Or4eO3plvTXnqpA3rMYQF2Hzi2Vx8dT7jJ5EOI6Yv4LJoauYJ77zJqzyy+FQcSaG8gFUURTjfSjsP52jG4r6LUCOkxEAizH23o52zdSkMIKZQHTUJvjFdHeOde8JzDXUaICrPvFRDWjjvnIj2HlAcFeGdhhdMY97ffKwgTioKPh26LRq8gCxV4TeQ38S1aKhSAmGf8DFboptcEOA3Dk1uiWeFYHCgZUsGG54OveC002DSUfX51gvu8UQ+KslJhmyZHvCYm7KTyO4p+dHmqsW/td1TDow5j92nvua2IzDkkDwZSdGzMkb3zhGScjKgdD7vsvB0Sxr9TAZyGrIDYNZ0sDv84paGpAS40Cm32uK++y1+IrcEKKXez7nzPL5f480bzr+Sa+qVkv7XKkfM3dv74eXlcP/F/t30SvridbO0eX+0zkfd/onndSNedOuc1Xu+sqzR86tLIt646AJdscEu90BlRSRyBiPjl81IBY1dSk39llJTuZSK6IeY+i3iViXgunw8/Pfy0X/hqipuJfODr5L57OH/F+sB24RgDUrA1ihgU7ZsBz8W7eAFcLFoBz+82sHfML5y5iCTg2MAAAAASUVORK5CYII=);
  background-repeat: no-repeat;
  background-position: center center;
}
.reset-btn:hover {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABKCAMAAAArDjJDAAAAolBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////89O+wrAAAANXRSTlMAF5YdCBsOAgEEBQsTERQGJSEZCSMfDCcHECQrLzKVKXF9NkFij1tOgnZpRu+Izaj649mfuExOrv8AAAeESURBVFjDrVjXdqNKEFwNAlsIECBEDiIoJ4fL///are5BwVby7vG82EeCUnd1dZo/f56c19P58+8Hb7/QGfDhf/8JkGEG+ijs98d8+v1wpA8Y7m9xANMfD31f07QIB398fzjuM9yP0RgIOL4WmYZl9bpjWYYRaT7Qfgx2BIoMq+eqqnI+qtuzjOgI9hOTADTUTKunKhPH8eLY5hPHnudMFLVnmdqQwJ4ZBpP0cOwT0MSJ7XQzn5a7WZ7PduV0vknt2JkQmD8O9ceGsUngiIA8O5uXuaCT48h/ynllewQGzh4aRkjhWDMZqF7R66tmUVdpEKRVvWhWhLaqGczUxuF9LHIOLFmu4tibEq9NF0kQ2B44AmeebQfJYoqPy43tKK4Fxu45yUg+THLiDG8smwwwzmSidgdB8Owga5b4jSx2YJh/BwvedUj2YiZmTREQxSrpCYKySF8qhSIoGny9sI9YN3zskBQvWeNnKwBx4CNSOR2IngUCsApGrxNP6bCukQaMFKdgaR4wG6ZGqRKGI5wwpDSC3IjJYA7G0pixBt+xKHZDQsqWYlcHMkY+p9zpILfHpF1V8YJ6KZYZYQ3D71ivL6Ox1lO9FI9UgQeTohOQzqdDo0QAn0FVimXqqT1tPPoKBaLGmqU6SXlEMv1hX3qGAjMcUpUZEZ4OCUd40q6Wokwc1dLGX+gi93zTdey12HVIke9TlQI9mslHO/qrh0ONsXZibTug64uL0j0lXghRE1LPMEyKHVeZnov6cC4KOrDYg6AWYgG6vrjI0cOX2QyxQ+h61qlKQZmkdBI8aSOiPCYnGWsuZpmjGpdRhFGI3sSeiilsYiAuMJQvsR0UCZ0g8KBKgwqMLrG8AC/YSi+6MAtG0TcbMavwjWUaCNF+XzBEuj7st+3b9uOwToMuXYAVjiNSzizfgHky68wUGVWKJsAXZmT0FLttM5xabNvT2YoK7jMW+OIwNaK0Jz3zZNYrM+XVYlnEigW2DaiCoVYAev9cb7KqXucfAFsVUuLgix0JlnktzZJQ0FQEo1ZklGsi2yzVzgBVHdp2v87SNEnI2bTZt+0hsVni+kDS24gVs6W/dP75sCPLBTIBihv7lhIAqvqvfdtVWZYUVLJQX5J0+db+l8j4d2alIucgSg9fX/ChEs/FCkyZwz5BFYA6tNsGTqYFUpvKlWMX6XzbHgqOP5vlOgjiPIbk+xJqwP6VYgEGEdiwg2rf1hmMSvEDPapYqD9BMn9r8Yv02EAnVdsLJj4aM1kvOsGnuUg8EBjqo6GhkoPtDDZVGTlkUs2izAvSZbutYiYauQYPE5GnYHjIZEmqNp1/I7Qck2n/qEgOgFKpjIecLV6R7lvBZrGHAF+JjSSLoBh9LhpWyIDjSWI4nj0ehD/kkKXYSdNuM4/eHcjAN2LO3rycWJ+CKoQGuiWVKfb+DOXKfoDfMHtw8aNFtoDoAXKEyZpS4Il3gkIOlKIGuBbiFSqnDkJP4UsoKWWpfCXzYVbeHuChNgZZGiu7JHkw1IAjsROVtJMLDhiOg6CAohzuniOaXSg+4Llp9wWIBlnMTCV25A6FkLWg2DMEAlCQGhyhHkal4ThthFwo6UnXKep2i1gT1IgqU5rPWO9nqDwPOtUyFMqMyk2Qm4XsnK9EjgPJvRHUkKAQ+iDP70ONGMp1qQvKQU+OZkyFU1TPoC4cRO1GxUIJNjS/fzF/dg5uHjn4hXbZWqvPmiYMOfm8HrsS076+T/t3MQwogMv2wFUuvOwAUgzivhiuJEpQ8KLwurL9epxOxsjVAhJdk0TDa4l+SxydC70SQ9PAsjpJ0dDM/c2Gf9v0TuJ8T2fZyOJl+5EVHmfyiFr86JzO+f10/lpkqHjgkfS9/UyBBa0PZZuGbIG0e1RkLkofRUKXhgdN205TdAXXMsyIurSrAGn91k7vlz7mXUVBnlKXQMHCz8HjIm/fpmlC1djFkQV5vW0/HxXkU5tIiRt6iGiJEzQcQU0ipjYd20WSzZ60Cdm8FGpeFEM2a0i9F+Wk/VhlCfUual5rdMJPal7RvebVtVSnzpdBZ5acSuOieUdLPawWdb2YftL/6yct9aLR29RTww4Lkc527+fK/D7LnjX6P91MtMlnVXw0v08dZhKjXYn9+3b7vv9sEho/MBcx0u3xg80itngoopGQ5rE+1wea+nmiKS6GotOAdT0U8ahmHEe1I1ZIQ2e3yf14VJNT7XGAZCy8IPdLLoJ0uBDSVvlwgOzGWjBPY61NWMSXHNRp7TVpMkVBDb+MtctbY+3lsF1mdkeuLsf+40Yfdh/05bCdlTeH7S8rQFkF3LGGx1Xi71aAq8WEN5zOI7quuFxM3MeLyfd1iQbY2+sS7YsP16WrJY62Wvd6iXNpF36yxF2tliRJRfm2Wiok2aer5XnhnWDhzbHwprcW3hQLb/5k4T2v4T1UuZruBW6v4XlZox72Hq3hl5cDBHb/coBy6PHlwPnKwqC7D7u6fWVB9x/GsyuL80VKJBfuWxcpp6x+esNDhun9biy6vt5R5Y0MyuhP7p1+7dLpV6/CfvOC7levDX/3MvMfrlj/B/zdHAlIsLpXAAAAAElFTkSuQmCC);
}
.reset-text {
  position: absolute;
  top: 62%;
  left: 50%;
  transform: translateX(-50%);
  color: #a5a7a8;
  font-size: 14px;
}
/*工具栏*/
.controls {
  display: flex;
  width: 100%;
  height: 42px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in;
  z-index: 99;
}
.controls.show {
  bottom: -42px;
}
.controls > .play {
  width: 34px;
  height: 32px;
  margin: 5px 6px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAP1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////9KjZoYAAAAFHRSTlMAAgUNLURLTToJEiUpSBcE1fVgn9plgu0AAADESURBVCjPfZLJcsQgDESbRWqx2EwS/v9bc7AhjCuDbqpXam0N3JGKiapYSXiPbJxheQEukkc8k2vhjAcZ3SDeqKWNrBWl+bvGKGFVD0K76iLl0ToJIwBkasZzKmUGYKxX/rPUVhoQeNw9+6tO5A8GlEsWQO9f35NFFhjPiXqfoicNwrSg/ro1EgVKt6Ih6qhQtv9Qo34SDJTdGJvh15Xj+8qbQ+3Ou3kK2udXwhu1+jlB/TMA0IZtXHrYZmc2AAjDorPtL+4MCs9tL4/kAAAAAElFTkSuQmCC);
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
}
.controls > .play:hover {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAZlBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9ulurIAAAAIXRSTlMACQgYESEcA2gGDg0lFCkeYRUuV2YyS0hNOlk2RXj2263YUJsCAAABVElEQVQ4y5WU6XKDMAyEY3zJFz4wV0gP3v8lK5dA0zSdOPrFwDfelbzidHqppFTXkvIxoIjR7Lu0IUo+ArSjwnMsL6jTfyDZGCd4unQh59BdEhfONL8YRRjlSwdHdQunjNwwkjDRTgBhmFPbpnkIAFMrbhjZIHGGfGktGvGe2/aS4YzMoaUMRSL0Fn3G0lEUtg/IUKN2GccnCGgxRsc0aZriLAWYuLtKKS0WyD36Y5Riu42SykTeZ1iEVvshHYyWau38ZyqdFIbaEbrrMdLQHkLxj6/Xj8EKVxjsIEBPjdx0RphsJPhg1/X9zfJolCLRDjBuSor5DmbO1IasaxEzOEw+Q+fZhvAAyf8gKIYeCPMJAt+RDC2eeCAoRk0ZOORXkOdCz+0+b7pidBUXUHGNNWGoiNQRzBGD6bdgjnfBrIj3v0uiXlu1moWtWfuqn8fOne4/fwHyLiZPlvQt6gAAAABJRU5ErkJggg==);
}

.controls > .play.pause {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAANlBMVEVHcEz///////////////////////////////////////////////////////////////////+GUsxbAAAAEXRSTlMALQ4SREsnTToECMRICxcvGG65Pc0AAACrSURBVCjPjZJJjgQhDASDwiZtuujl/5+dQ01XL0LM5MESCinxkvCr0cLcLdrgUzV0Kuo7KdJerp0c17JL5QQZ8pbnq7kiT2Lbu8dmT3aT9c+fu+kGUOWV765cFQg1AC6XV6UpYNN++D4er0ru2miH7ReiqBG6z9BdganPUJfhYoaQ48oZSjmmMUNDtmpj0fxi5MWiVuulzI5S/jrlIgCQz9jQj9jkv8I2jegP2ZgJU4kz3cYAAAAASUVORK5CYII=);
}
.controls > .play.pause:hover {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAXVBMVEX///////////////////////////9HcEz////////////////////////////////////////////////////////////////////////////////////////////0ao/XAAAAHnRSTlNoGQgOBRwUACYBIRsQHxEpAyNhCzQKLkdNzVc6WFniYId1AAABW0lEQVQ4y5WU0ZKDIAxFExCKKCBohWrb///MTWqntc7ulL0PMMLxxkgCnPZqn/pYhN320DSNINE07LAXQoAYpX9IjoKgA8KA1KicJTmFWr6hDWkZUHbOSwJIS56tYqh9I21z9minK7x0myz688bAk1Ch0PtlnUOY10JeJagnw8ggiLgB5GCidc5GEzIZESOGDWkbiUSkyUSHmoQumikRg5JtgJIR2hZIs6FMUHuvkTIzc4JitaC0gE3UBDBFhc6yzWNSkdcU28CJTa6QTacxXi7ROR5RdybDlW0IaUacIAWlPZr73cTII3qtQoIJx+YEHCdDMVr2ijdJNKpealMgcyRCvFtgtX6Ue0SO3q6wOM+I8DbB7Poj0rsZkvViQwCCkudPhB4DwH+Qb4EqPvd70hW/ruYAKo5xXwzdVgzdoRgqSqqmMGvK+5cmuR6apKbVahq2pu2rLo+/r6AfJestQtEz7SEAAAAASUVORK5CYII=);
}
.controls > span {
  color: #797979;
  font-size: 12px;
  line-height: 42px;
  font-weight: 700;
}
.progress {
  position: relative;
  flex: 1;
  height: 4px;
  border-radius: 5px;
  background: #343334;
  margin: 19px 10px 0;
  cursor: pointer;
}
.progress > .hc-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #717171;
  border-radius: 5px;
}
.progress > .cur-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #b2072a;
  border-radius: 5px;
}
.cur-progress > .cur-yuan {
  position: absolute;
  top: -10px;
  width: 24px;
  height: 24px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAATlBMVEUAAABWVlYAAAAAAAAAAAAAAACsrKxHcEwAAAAAAAAAAAD+/v7Ozs4AAAD7+/vw8PDw8PD8/Pz7+/vLy8v////AMjy4JSW/MTvsusLsucFa/UGuAAAAFHRSTlMBPQ4jFwl7AAIGJ/unHPbe4Pb0o5pnj40AAACeSURBVBjTbZGLDsMgCEVRwRbta13t4/9/dKDtXDJvouSeYHgIXRb0WXC7gpiZSK6CoTCLLgSHtlA5wIRmWGKcB4PESiSPRr9uWasfSXKh6xn99pVH7jsAtmaqcDKWQYrgsP3oLakC3aLmTOnUODuFFKKatO9JYwyU4euGR4XsZjXXka76vFWo2VKz+TLmnTs9Y9aFLHUh7dW1l/z3HR9NnRFrL1EwZQAAAABJRU5ErkJggg==)
    no-repeat;
  background-position: center center;
  z-index: 3;
}
.cur-progress > .cur-yuan:hover {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAV1BMVEX///////////////////////////////9HcEz////////////////////////////////////////////////////////////////AMjy4JSXsucHsusKXbNtFAAAAGHRSTlMCOhAmCgcrAQAEExsXQB71fk8x3vuk5qEGpvUVAAAAyUlEQVQoz3WS2Q4CIQxFW2CK7LPGQf3/77RUoz7Y+wDJOSlLAS4S7wEgBB68fxF44zA5yRTeagjBJuaUcjaiXoK5M7la4tjKSgwIj8muWDi42hTFsGBeCZdj2/ftWJAqGxYeJpMI53ZK2oyUzMSYC7LF+fxkRpu5BLigrkv7iraslUsAXLR4nD+5oo1uiExlG+DR+2PMW6HMIrhEZR+g3259zHuhxCcW0f6I71L33u8/S+mba8dVL6i2RG2i3nb1ofSn1T/D3+/zBOwsGYb1+26WAAAAAElFTkSuQmCC);
}
/* 鼠标悬浮进度条显示对应时间 */
.mouse-time {
  position: absolute;
  left: 0;
  top: -43px;
  z-index: 995;
  padding: 6px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 12px;
}
/* 音量和音量进度条 */
.volum {
  position: relative;
}
.volum > i {
  color: rgba(255, 255, 255, 0.5);
  line-height: 42px;
  margin-left: 15px;
  cursor: pointer;
}
.volum-progress-box {
  position: absolute;
  left: 13px;
  top: -88px;
  width: 22px;
  height: 86px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.volum-progress-box::after {
  position: absolute;
  bottom: -16px;
  left: 3px;
  border-width: 8px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.5) transparent transparent transparent;
  content: "";
}
/* 总进度条 */
.volum-progress {
  position: absolute;
  left: 9px;
  top: 6px;
  width: 4px;
  height: 70px;
  border-radius: 2px;
  background: #5a4f42;
  transform: rotate(180deg);
  z-index: 2;
}
/* 音量进度条 */
.volum-progress > .volum-progress-red {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: red;
  border-radius: 2px;
}
.volum-progress > .volum-progress-red > span {
  position: absolute;
  width: 20px;
  height: 20px;
  left: -8px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB/HNKOAAAAIVBMVEX19ff19fdHcEz19ff19ff19ff19ffiSE719fffOzvwu8INAVqZAAAAB3RSTlPzvgBNhE5MvuDklQAAADFJREFUCNdjUDJkEFNiUOno6HBisACSzQwSXeUrGhk42mdWNEBJiAhEFqJSKZBBWAkAJkwSmrflNpkAAAAASUVORK5CYII=)
    no-repeat;
  background-position: center center;
  cursor: pointer;
}
.volum-progress > .volum-progress-red > span:hover {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAS1BMVEX///////////////////////////////////9HcEz////////////////////29vj19ff4+Pr39/j4+Pn4+Pr19ffiSE7fOzvwu8KwxayqAAAAFXRSTlMBCBIvBA0CBiAAFxQaKTPL9nGdcXA3wtMFAAAAmElEQVQY032R2xLDIAhEMcRI4z0tJv//pQVNn+J0HR88s8KK8FIBbF0A4zjQ6ozIrQPL7sguItuxQmHG+kCi4K1RKkvYThFTwki7UNB6ThjWXEr+oFAndcXoCQ/uOpC8WNUYYuVbNQa1bmYhzMxXaxdzRlrMgKkwt/NszCX9h8/rs0bTSHf4t4avv/DTZ84HMh3dfMjP7/gCUYcNyq0NX0oAAAAASUVORK5CYII=)
    no-repeat;
}
/* 清晰度 */
.definition {
  position: relative;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  line-height: 42px;
}
.definition > span {
  cursor: default;
}
.definition > .definition-list {
  position: absolute;
  top: 100px;
  left: -15px;
  background: rgba(0, 0, 0, 0.3);
}
.definition > .definition-list > li {
  width: 65px;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.definition > .definition-list > li.active {
  background: rgba(255, 255, 255, 0.2);
}

.definition > .definition-list > li:hover {
  background: rgba(255, 255, 255, 0.2);
}
.controls > em {
  margin: 0 6px;
  color: rgba(255, 255, 255, 0.3);
  line-height: 42px;
}
.quanping {
  width: 34px;
  height: 34px;
  margin-top: 4px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABlBMVEX///////9VfPVsAAAAAnRSTlMAgJsrThgAAAArSURBVAgdBcAxDQAgDACw8iMJaYhDwCQggYOTY1mIorg8NsFCJzhMhpZafvJPCsNDJhdLAAAAAElFTkSuQmCC);
  background-repeat: no-repeat;
  background-position: center center;
}
.volum > i:hover,
.definition > span:hover {
  color: rgba(255, 255, 255, 0.8);
}

.quanping:hover {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABlBMVEX///9HcExwQjx2AAAAAnRSTlPMABHcVXoAAAAtSURBVAgdBYCxDQAQEADvrxYxgCGMZkUj6RTihbiCFQ92bFiI3OQgm8zIxUP4r0gJqtt6EUUAAAAASUVORK5CYII=);
}
</style>