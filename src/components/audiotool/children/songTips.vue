<template>
  <div id="song-tips" class="song-tips" @click.stop="stopBubble">
    <!-- 顶部工具栏 -->
    <div class="listhd">
      <div class="listtd">
        <h4 class="bofangliebiao">
          播放列表 <span class="num">({{ len }})</span>
        </h4>
        <a href="javascript:;" class="shoucang"
          ><span class="iconfont icon-shoucang iconsc"></span>收藏全部</a
        >
        <a href="javascript:;" class="qingchu" @click="clearSong">
          <span class="iconfont icon-del iconqc"></span> 清除</a
        >
        <p class="geming" v-if="song">
          {{ song[$store.state.index].name }}
        </p>
        <span class="close" @click="close"></span>
      </div>
    </div>
    <!-- 底部歌曲列表和歌词 -->
    <div class="listbd">
      <img
        class="bg"
        :src="song[$store.state.index].al.picUrl"
        alt=""
        v-if="song !== null"
      />
      <!-- 左侧列表背景 -->
      <div class="msk"></div>
      <!-- 左侧列表 -->
      <div class="listbdc">
        <ul class="f-cb" id="list-wrap" v-if="song">
          <li
            v-for="(item, index) in song"
            :key="item.id"
            :class="{ tiaozhuan: item.id == activeSong }"
            @click="toBoFang(index)"
          >
            <!-- 歌曲激活时的图标 -->
            <div class="col col1">
              <div class="play-icon"></div>
            </div>
            <!-- 歌名 -->
            <div class="col col2">{{ item.name }}</div>
            <!-- 鼠标悬浮显示的图标 -->
            <div class="col col3">
              <span
                class="iconfont icon-shoucang sc"
                style="font-size: 12px"
              ></span>
              <span
                class="iconfont icon-del qc"
                style="font-size: 14px; margin-left: 5px"
                @click.stop="removeSong(index)"
              ></span>
            </div>
            <!-- 歌手 -->
            <div class="col col4">
              <a
                href="javascript:;"
                v-for="(singer, idx) in item.ar"
                :key="idx"
                @click.stop="toSingerDetail(singer.id)"
              >
                {{ singer.name }}
                <span>{{ idx == item.ar.length - 1 ? "" : "/" }}</span>
              </a>
            </div>
            <!-- 歌曲时长 -->
            <div class="col col5">
              <span>{{
                item.dt / 1000 ? item.dt / 1000 : 0 | formatTimer
              }}</span>
            </div>
            <!-- 来自歌单 -->
            <div class="col col6">
              <a href="javascript:;" title="来自歌单"></a>
            </div>
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
      <!-- 右侧歌词背景 -->
      <div class="msk2"></div>
      <!-- 歌词盒子 -->

      <div class="lyric">
        <div :style="{ transform: `translateY(${-(lyIndex - 1) * 32}px)` }">
          <p
            class="j-flag"
            v-for="(lyric, i) in songLyric"
            :key="i"
            :class="{ 'z-sel': lyIndex == i }"
          >
            {{ lyric.lyric }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { up } from "../../../mixin/mixin";
import { getLyric } from "../../../api/api";
export default {
  name: "songTips",
  props: ["show"],
  data() {
    return {
      // 歌词和对应时间
      songLyric: [],
      curTime: 0,
      lyIndex: 0,
      oListbd: null,
      oActive: null,
      timer: null,
    };
  },
  mixins: [up],
  mounted() {
    let _this = this;
    this.$bus.$on("playLyric", () => {
      _this.playLyric();
    });
    this.$bus.$on("stopLyric", () => {
      clearInterval(_this.timer);
    });
    this.$bus.$on("currentTime", (timer) => {
      this.curTime = timer;
    });
    if (this.song) {
      this.getSongLyric();
    }
  },
  methods: {
    // 关闭播放列表框
    close() {
      this.$emit("close");
    },
    //将时间转换成秒数
    formatTimeTosec(value) {
      //把时间分割出来 从冒号开始
      let arr = value.split(":");
      //分割出来分钟和秒数都转换成数字
      //将分钟*60得到秒数         将秒数只包含一位小数
      return (Number(arr[0] * 60) + Number(arr[1])).toFixed(1);
    },
    // 获取歌词
    getSongLyric() {
      let id = this.song[this.$store.state.index].id;
      getLyric(id).then((v) => {
        let lyric = v.data.lrc.lyric;
        let re = /\[([^\]]+)\]([^\[]+)/g;
        //保存正则匹配结果的数组
        var result = [];
        lyric.replace(re, ($0, $1, $2) => {
          //将匹配后的结果添加到数组中
          result.push({ time: this.formatTimeTosec($1), lyric: $2 });
        });
        this.songLyric = result;
      });
    },
    // 清除播放列表所有歌曲
    clearSong() {
      localStorage.removeItem("song");
      localStorage.removeItem("timer");
      localStorage.removeItem("index");
      // 更新 song 的状态
      this.$bus.$emit("update");
      this.$bus.$emit("songNum");
      // 将音乐的 src 设置成null
      this.$bus.$emit("audioNull");
      // 将歌词数组清空
      this.songLyric = [];
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
      // 当前正在播放的歌曲下标
      let i = this.$store.state.index;
      let song = JSON.parse(localStorage.getItem("song"));
      // 删除歌曲列表中的某一个歌曲
      song.splice(index, 1);
      // 将Vuex里的index修改回
      if (song.length === 0) {
        localStorage.removeItem("song");
        localStorage.removeItem("timer");
        this.$bus.$emit("update");
        this.$bus.$emit("songNum");
      } else {
        localStorage.setItem("song", JSON.stringify(song));
        this.$bus.$emit("update");
        this.$bus.$emit("songNum");
      }
      // 如果被删除的歌曲下标小于正在播放的歌曲，则让正在播放的歌曲下标-1，
      // 防止删除之后，因为数组长度的变化而影响当前正在播放的歌曲的样式及渲染的内容
      if (index < i) {
        this.$store.commit("CACHEINDEX", i - 1);
      }

      // 如果删除的是正在播放的歌曲，则切换至下一首
      if (index === i) {
        // 如果歌曲没有播放，则什么也不做
        if (this.$store.state.flag === false) {
          return;
        } else {
          // 切换下一首
          this.$store.commit("ISFLAG");
          this.$store.dispatch("songUrl");
        }
      }
    },
    // 跳转至歌手详情页
    toSingerDetail(id) {
      this.$router.push({
        path: "/singer",
        query: {
          id,
        },
      });
    },
    // 滚动歌词
    playLyric() {
      let _this = this;
      clearInterval(_this.timer);
      _this.getSongLyric();
      let len = _this.songLyric.length;
      _this.timer = setInterval(() => {
        for (let i = 0; i < len; i++) {
          //如果歌词没有了，还有音乐，则让歌词一直是最后一个
          if (_this.lyIndex >= _this.songLyric.length - 1) {
            _this.lyIndex = _this.songLyric.length - 1;
          }
          try {
            if (
              _this.curTime > _this.songLyric[i].time &&
              _this.curTime < _this.songLyric[i + 1].time
            ) {
              _this.lyIndex = i;
            }
          } catch (error) {}
        }
      }, 500);
    },
    // 阻止冒泡，用于点击页面空白处关闭播放列表
    stopBubble() {},
  },
  computed: {
    // 播放列表的歌曲数量
    len() {
      return this.song === null ? 0 : this.song.length;
    },
    // 当前正在播放的歌曲的样式
    activeSong() {
      return this.song === null ? 0 : this.song[this.$store.state.index].id;
    },
  },
  watch: {
    // 播放列表显示时，正在演唱的歌曲在列表正中央
    show() {
      if (this.show === true && this.song) {
        this.oListbd = document.querySelector(".listbdc");
        this.oActive = document.querySelector("li.tiaozhuan");
        this.oListbd.scrollTop =
          this.oActive.offsetTop - this.oListbd.offsetHeight / 2;
        if (this.oListbd.scrollTop < 0) {
          this.oListbd.scrollTop = 0;
        }
        if (this.$store.state.flag) {
          this.playLyric();
        }
      }
    },
    "$store.state.index"() {
      setTimeout(() => {
        this.oListbd = document.querySelector(".listbdc");
        this.oActive = document.querySelector("li.tiaozhuan");
        // 如果正在播放的歌曲位于播放列表看不见的位置(下方)，则滚动到当前正在播放的歌曲，将其显示在播放列表的最下方
        // 并且，如果歌曲正好处于当前播放列表显示区，则不会进行滚动
        if (
          this.oActive.offsetTop >=
          this.oListbd.scrollTop + this.oListbd.offsetHeight
        ) {
          this.oListbd.scrollTop =
            this.oActive.offsetTop -
            this.oListbd.offsetHeight +
            this.oActive.offsetHeight;
        }
        // 如果正在播放的歌曲位于播放列表看不见的位置(上方)，则滚动到当前正在播放的歌曲，将其显示在播放列表的最上方
        // 并且，如果歌曲正好处于当前播放列表显示区，则不会进行滚动
        else if (
          this.oActive.offsetTop <=
          this.oListbd.scrollTop - this.oActive.offsetHeight
        ) {
          this.oListbd.scrollTop = this.oActive.offsetTop;
        }
      }, 200);
    },
  },
};
</script>

<style scoped>
#song-tips {
  position: fixed;
  left: 50%;
  bottom: 53px;
  transform: translateX(-50%);
  width: 986px;
  height: 301px;
}
.listhd {
  position: relative;
  padding: 0 5px;
  box-sizing: border-box;
  background: url(https://s2.music.126.net/style/web2/img/frame/playlist_bg.png?57b15f98b73afab6ab05eeb69163adeb)
    no-repeat;
  background-position: 0 0;
  height: 41px;
}
.listtd {
  display: flex;
  position: relative;
  height: 40px;
  color: #fff;
  line-height: 40px;
}
.listtd > h4 {
  position: absolute;
  left: 25px;
  top: 0;
  height: 39px;
  line-height: 39px;
  font-size: 14px;
  color: #e2e2e2;
}
.shoucang {
  position: absolute;
  left: 398px;
  top: 12px;
  height: 15px;
  line-height: 15px;
  font-size: 12px;
  cursor: pointer;
  color: #ccc;
}
.shoucang > .iconsc {
  position: relative;
  font-size: 12px;
  right: 2px;
}
.shoucang:hover,
.qingchu:hover {
  color: #fff;
}
.qingchu {
  position: absolute;
  left: 490px;
  top: 12px;
  height: 15px;
  line-height: 15px;
  font-size: 12px;
  cursor: pointer;
  color: #ccc;
}
.qingchu > .iconqc {
  position: relative;
  font-size: 14px;
  right: -2px;
  top: 1px;
}
.geming {
  position: absolute;
  left: 595px;
  top: 0;
  width: 346px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 39px;
  text-align: center;
  line-height: 39px;
  font-size: 14px;
}
.close {
  position: absolute;
  top: 6px;
  right: 8px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: url(https://s2.music.126.net/style/web2/img/frame/playlist.png?d46c6aa31bd93d5aa1e305ece8c36d19)
    no-repeat;
  background-position: -195px 9px;
}
.close:hover {
  background-position: -195px -21px;
}

/* 歌曲列表和歌词 */
.listbd {
  position: absolute;
  top: 41px;
  left: 0;
  width: 976px;
  height: 260px;
  overflow: hidden;
  background: url(https://s2.music.126.net/style/web2/img/frame/playlist_bg.png?57b15f98b73afab6ab05eeb69163adeb);
  background-position: -1014px 0;
  background-repeat: repeat-y;
  padding: 0 5px;
}
.listbd > .bg {
  position: absolute;
  left: 2px;
  top: -360px;
  z-index: 1;
  width: 980px;
  height: auto;
  opacity: 0.2;
}
.listbd > .msk {
  position: absolute;
  left: 2px;
  top: 0;
  z-index: 2;
  width: 558px;
  height: 260px;
  background: #121212;
  opacity: 0.5;
}
.listbd > .listbdc {
  position: absolute;
  left: 2px;
  top: 0;
  z-index: 4;
  height: 260px;
  width: 558px;
  overflow: auto;
}

.f-cb {
  color: #ccc;
  overflow: hidden;
  font-size: 12px;
}
.f-cb > li {
  float: left;
  width: 100%;
}
.f-cb > li:hover {
  background: rgba(0, 0, 0, 0.4);
}
.f-cb > li.tiaozhuan {
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
}
.f-cb > li.tiaozhuan > .col1 {
  visibility: visible;
}
.f-cb > li.tiaozhuan > .col6 > a {
  background-position: -80px -20px;
}
.f-cb > li.tiaozhuan > .col4 > a {
  color: #fff;
}
.f-cb > li.tiaozhuan > .col5 > span {
  color: #fff;
}
.f-cb > li > .col {
  float: left;
  padding-left: 10px;
  height: 28px;
  line-height: 28px;
  overflow: hidden;
  cursor: pointer;
}
.f-cb > li > .col1 {
  width: 10px;
  visibility: hidden;
}
.f-cb > li > .col1 > .play-icon {
  width: 10px;
  height: 13px;
  margin-top: 8px;
  background: url(https://s2.music.126.net/style/web2/img/frame/playlist.png?d46c6aa31bd93d5aa1e305ece8c36d19)
    no-repeat;
  background-position: -182px 0;
}
.f-cb > li > .col2 {
  width: 256px;
}
.f-cb > li > .col3 {
  position: relative;
  width: 78px;
  visibility: hidden;
}
.f-cb > li:hover > .col3 {
  visibility: visible;
}
.f-cb > li > .col3 > span:hover {
  color: #fff;
}
.f-cb > li > .col4 {
  width: 70px;
}
.f-cb > li > .col4 > a {
  color: #919191;
}
.f-cb > li > .col4 > a:hover {
  text-decoration: underline;
}
.f-cb > li > .col2,
.f-cb > li > .col4 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.f-cb > li > .col5 {
  width: 35px;
  color: #666;
}
.f-cb > li > .col6 {
  position: relative;
  width: 37px;
  padding-left: 6px;
}
.f-cb > li > .col6 > a {
  display: inline-block;
  position: absolute;
  width: 14px;
  top: 6px;
  right: 0;
  height: 14px;
  background: url(https://s2.music.126.net/style/web2/img/frame/playlist.png?d46c6aa31bd93d5aa1e305ece8c36d19)
    no-repeat;
  background-position: -80px 0;
}
.f-cb > li > .col6 > a:hover {
  background-position: -80px -20px;
}

/* 歌单没有内容时显示的内容 */
.wei-show-info {
  padding-top: 85px;
  text-align: center;
  line-height: 43px;
  font-size: 12px;
  color: #ccc;
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

/* 歌词区域 */
.msk2 {
  position: absolute;
  left: 560px;
  top: 0;
  z-index: 3;
  width: 420px;
  height: 250px;
  background-position: #121212;
  opacity: 0.01;
}

.lyric {
  position: absolute;
  right: 40px;
  top: 0;
  z-index: 4;
  margin: 21px 0 20px 0;
  height: 219px;
  width: 354px;
  overflow: hidden;
  color: rgba(117, 117, 117, 0.9);
}
.lyric .j-flag {
  word-wrap: break-word;
  text-align: center;
  line-height: 32px;
  height: auto !important;
  min-height: 32px;
  font-size: 12px;
  transition: all 0.3s;
}
.lyric .j-flag.z-sel {
  color: #fff;
  font-size: 14px;
}
</style>