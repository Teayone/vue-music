<template>
  <div id="song-list">
    <!-- 这个组件是复用的 -->
    <h3 v-if="showInfo">
      {{ songlistTitle }} <span>{{ songList ? songList.length : 0 }}首歌</span>
      <em v-if="playCount !== null"
        >播放： <span>{{ playCount.playCount }}</span
        >次</em
      >
    </h3>

    <!-- 歌曲列表 -->
    <ul :class="{ bordernone: Border }">
      <li class="info" v-if="showLiTitle">
        <div class="kong"></div>
        <div class="title">歌曲标题</div>
        <div class="time">时长</div>
        <div class="singer">歌手</div>
        <div class="alubms" v-if="showAlbum">专辑</div>
      </li>

      <li class="list" v-for="(item, index) in songList" :key="item.id">
        <div class="num-play">
          <span class="num">{{ index + 1 }}</span>
          <i
            class="iconfont icon-bofangqi-bofangshu play"
            :class="{
              active: item.id === activeSong,
              nocopyright: item.noCopyrightRcmd !== null,
            }"
            @click="bofang(item.id, item.noCopyrightRcmd)"
          ></i>
        </div>
        <div class="tt">
          <span
            @click="toSongsDetail(item.id)"
            :class="{ nocopyright: item.noCopyrightRcmd !== null }"
            >{{ item.name }}</span
          >
          <!-- 歌名后面的mv图标 -->
          <i
            class="icon-mv"
            :class="{ nocopyright: item.noCopyrightRcmd !== null }"
            v-if="item.mv !== 0"
            @click="toMv(item.mv, item.noCopyrightRcmd)"
          ></i>
        </div>
        <div>
          <span
            class="ti"
            :class="{ nocopyright: item.noCopyrightRcmd !== null }"
            >{{ (item.dt / 1000) | formatTimer }}</span
          >
          <!-- 添加和收藏按钮 -->
          <div class="add-sc">
            <i
              class="iconfont icon-tianjia add"
              title="添加到播放列表"
              @click="addList(item.id, item)"
            ></i>
            <i
              class="iconfont icon-shoucang sc"
              title="收藏"
              @click="openBox(item.id)"
            ></i>
          </div>
        </div>
        <div class="tt" v-if="showSingerName">
          <span
            @click="toArtistDetail(item.ar[0].id)"
            :class="{
              nocopyright: item.noCopyrightRcmd !== null,
              nosinge: item.ar[0].id === 0,
            }"
            >{{ item.ar[0].name }}</span
          >
        </div>
        <!-- 专辑详情 -->
        <div class="tt" v-if="showAlbum">
          <span
            @click="toAlbumsDetail(item.al.id)"
            :class="{ nocopyright: item.noCopyrightRcmd !== null }"
            >{{ item.al.name }}</span
          >
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
import { up, songPlay, addSong } from "../../mixin/mixin";
export default {
  name: "songList",
  mixins: [songPlay, up, addSong],
  props: {
    songList: {
      type: Array,
      default() {
        return [];
      },
    },
    playCount: {
      type: Object,
      default() {
        return null;
      },
    },
    // 专辑是否显示
    showAlbum: {
      type: Boolean,
      default() {
        return true;
      },
    },
    // 歌曲列表标题
    songlistTitle: {
      type: String,
      default() {
        return "歌曲列表";
      },
    },
    // 是否显示歌曲列表的表头
    showLiTitle: {
      type: Boolean,
      default() {
        return true;
      },
    },
    // 是否显示歌手名字
    showSingerName: {
      type: Boolean,
      default() {
        return true;
      },
    },
    // 是否显示歌曲数量
    showInfo: {
      type: Boolean,
      default() {
        return true;
      },
    },
    // 是否显示边框
    Border: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      // 版权提示框
      nocopyIsShow: false,
      timer: null,
    };
  },
  mounted() {},
  methods: {
    // 跳转至专辑详情页
    toAlbumsDetail(id) {
      this.$router.push({
        path: "/albumsDetail",
        query: {
          id,
        },
      });
    },
    // 跳转至歌手详情也
    toArtistDetail(id) {
      if (id === 0) {
        return;
      } else {
        this.$router.push({
          path: "/singer",
          query: {
            id,
          },
        });
      }
    },
    // 跳转至歌曲详情页
    toSongsDetail(id) {
      this.$router.push({
        path: "/song",
        query: {
          id,
        },
      });
    },
    // 显示无版权提示框
    showNocopyTips() {
      clearTimeout(this.timer);
      this.nocopyIsShow = true;
      this.timer = setTimeout(() => {
        this.nocopyIsShow = false;
      }, 2000);
    },
    toMv(mvid, noCopyrightRcmd) {
      if (noCopyrightRcmd !== null) {
        this.showNocopyTips();
      } else {
        this.$router.push({
          path: "/mv",
          query: {
            mvid,
          },
        });
      }
    },
    // 收藏按钮打开弹框,并把歌曲ID传过去
    openBox(id) {
      // 判断是否登录
      let cookie = localStorage.getItem("userInfo");
      if (cookie) {
        this.$bus.$emit("openBox", id);
      } else {
        // 如果未登录则弹出登录框
        this.$bus.$emit("showLoginBox");
      }
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
#song-list {
  width: 100%;
  margin: 20px 0;
}
#song-list > h3 {
  font-size: 20px;
  border-bottom: 2px solid #c20c0c;
  padding-bottom: 8px;
}
#song-list > h3 > span {
  margin-left: 15px;
  font-size: 12px;
  color: #666666;
}
#song-list > h3 > em {
  float: right;
  font-size: 12px;
  color: #666;
}
#song-list > h3 > em > span {
  color: #c20c0c;
  font-weight: bold;
}
ul {
  border: 1px solid #ccc;
}
ul.bordernone {
  border: none;
}
ul > li {
  display: flex;
}
.info {
  border-bottom: 1px solid #cccccc;
  height: 34px;
  line-height: 34px;
  font-size: 12px;
  background: #f8f8f8;
  cursor: default;
  border-bottom: 1px solid #ccc;
}
li > div {
  padding: 0 10px;
}
li > div:first-child {
  flex: 0.8;
}
li > div:nth-child(2) {
  flex: 3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
li > div:nth-child(3) {
  flex: 1.2;
}
li > div:nth-child(4) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}
li > div:last-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1.5;
}
.kong {
  border-right: 1px solid #ccc;
}
.title {
  border-right: 1px solid #ccc;
}
.time {
  border-right: 1px solid #ccc;
}
.singer {
  border-right: 1px solid #ccc;
}
.list {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}

.list:nth-child(even) {
  background: #f7f7f7;
}
.list:hover .ti {
  display: none;
}
.list:hover .add-sc {
  display: block;
}

.num-play {
  position: relative;
}
.num-play > .num {
  vertical-align: 4px;
  color: #999;
}
.num-play > .play {
  position: absolute;
  right: 8px;
  font-size: 24px;
  cursor: pointer;
  color: #b2b2b2;
}
.num-play > .play.active {
  color: red;
}
.num-play > .play.nocopyright {
  color: #bbb;
  cursor: default;
}
.tt > span {
  cursor: pointer;
}
.tt > span.nocopyright {
  color: #999;
}
.tt > span.nocopyright.nosinge {
  cursor: default;
}
.tt > span.nocopyright.nosinge:hover {
  text-decoration: none;
}
.ti.nocopyright {
  color: #999;
}
.icon-mv {
  display: inline-block;
  width: 23px;
  height: 17px;
  margin: 1px 0 0 5px;
  background: url(https://s2.music.126.net/style/web2/img/table.png?0e7ac0b18a7155ac1858e8073d14f4cb)
    no-repeat;
  background-position: 0 -151px;
  cursor: pointer;
  vertical-align: -4px;
}
.icon-mv.nocopyright {
  background: url(https://s2.music.126.net/style/web2/img/table.png?2a6a110f46bc9ddee14574585893fcd9)
    no-repeat;
  background-position: -60px -151px;
  cursor: default;
}
.tt > span:hover {
  text-decoration: underline;
}
.ti {
  color: #666;
}
.add-sc {
  color: #999999;
  display: none;
}
.add-sc > .add {
  font-size: 20px;
  font-weight: 900;
  vertical-align: -2px;
}
.add-sc > .sc {
  font-size: 16px;
}
.add-sc > i:hover {
  color: #666666;
  cursor: pointer;
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
