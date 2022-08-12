<template>
  <div id="song-ranking" v-if="songKing && songNum">
    <div class="title">
      <span>听歌排行</span>
      <i>累计听歌{{ songNum.listenSongs }}首</i>
      <div class="btn">
        <span :class="{ active: flag }" @click="week">最近一周</span>
        <i>|</i>
        <span :class="{ active: !flag }" @click="all">所有时间</span>
      </div>
    </div>
    <ul class="ul">
      <li v-for="(item, index) in songKing" :key="item.song.id">
        <span class="idx">{{ index + 1 }}.</span>
        <i
          class="iconfont icon-yunhang"
          :class="{ active: item.song.id == activeSong }"
          @click="bofang(item.song.id, item.song.noCopyrightRcmd)"
        ></i>
        <div class="song-singer">
          <a href="javascript:;" class="song">{{ item.song.name }}</a>
          <span>-</span>
          <a href="javascript:;" class="singer">{{ item.song.ar[0].name }}</a>
        </div>
        <!-- 最右侧播放次数(接口没有返回数据，只返回了宽度) -->
        <div class="play-count">
          <span :style="{ width: item.score + '%' }"></span>
        </div>
      </li>
    </ul>
    <!-- 暂无版权提示框 -->
    <div class="nocopy-tips" v-if="nocopyIsShow">
      <p>由于版权保护，您所在的地区无法使用</p>
    </div>
  </div>
</template>

<script>
import { songPlay, up } from "../../../mixin/mixin";
export default {
  name: "SongRanking",
  props: {
    songNum: {
      type: Object,
      default() {
        return null;
      },
    },
    songKing: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      // 最近一周 || 所有时间的样式
      flag: true,
      nocopyIsShow: false,
    };
  },

  mixins: [songPlay, up],
  methods: {
    week() {
      this.$bus.$emit("sRank", 1);
      this.flag = true;
    },
    all() {
      this.$bus.$emit("sRank", 0);
      this.flag = false;
    },
    showNocopyTips() {
      this.nocopyIsShow = true;
      setTimeout(() => {
        this.nocopyIsShow = false;
      }, 2000);
    },
  },
  computed: {
    activeSong() {
      return this.song === null ? 0 : this.song[this.$store.state.index].id;
    },
  },
};
</script>

<style scoped>
#song-ranking {
  margin-top: 50px;
}
.title {
  border-bottom: 2px solid #c20c0c;
  height: 33px;
}
.title > span {
  font-size: 20px;
  color: #666;
}
.title > i {
  font-size: 12px;
  margin-left: 10px;
  color: #666;
}
.title > .btn {
  float: right;
  font-size: 12px;
}
.title > .btn > i {
  margin: 0 8px;
  color: #999;
  vertical-align: 0.5px;
}
.title > .btn > span {
  cursor: pointer;
  color: #666;
}
.title > .btn > span.active {
  color: #333;
  font-weight: bold;
}
.ul {
  border: 1px solid #ccc;
  border-top: none;
}
.ul > li {
  position: relative;
  display: flex;
  height: 38px;
  line-height: 38px;
  padding: 0 20px;
}
.ul > li:nth-child(even) {
  background: #f7f7f7;
}
.ul > li:hover {
  background: #eeeeee;
}
.ul > li > .idx {
  color: #666;
}
.ul > li > i {
  position: absolute;
  left: 45px;
  font-size: 20px;
  color: #b2b2b2;
  cursor: pointer;
}
.ul > li > i.active {
  color: red;
}
.ul > li a {
  font-size: 12px;
}
.ul > li a:hover {
  text-decoration: underline;
}
.song-singer {
  position: absolute;
  left: 80px;
  flex: 1;
  margin-top: -1px;
}
.song-singer > span {
  margin: 0 8px;
}
.song-singer > .song {
  color: #333;
  font-weight: bold;
}
.song-singer > .singer {
  color: #999;
}
.num {
  flex: 0.7;
  font-size: 12px;
  color: #666;
}
.play-count {
  position: absolute;
  right: 0;
  width: 319px;
  height: 38px;
  z-index: 2;
}
.play-count > span {
  display: block;
  height: 100%;
  background: #4eb4f5;
  opacity: 0.1;
}
/* 无版权提示框 */
.nocopy-tips {
  position: fixed;
  top: 50%;
  left: 50%;
  color: #fff;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  padding: 13px;
  font-size: 12px;
  border-radius: 10px;
}
</style>