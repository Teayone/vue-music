<template>
  <div id="song-list">
    <!-- 这个组件是复用的 -->
    <h3>
      歌曲列表 <span>{{ songList ? songList.length : 0 }}首歌</span>
      <em v-if="playCount !== null"
        >播放： <span>{{ playCount.playCount }}</span
        >次</em
      >
    </h3>

    <!-- 歌曲列表 -->
    <ul>
      <li class="info">
        <div class="kong"></div>
        <div class="title">歌曲标题</div>
        <div class="time">时长</div>
        <div class="singer">歌手</div>
      </li>
      <li
        class="top-song-list top"
        v-for="(item, index) in songList"
        :key="item.id"
      >
        <!-- 歌曲排名 -->
        <div class="number">{{ index + 1 }}</div>
        <!-- 前三名的歌曲封面+播放按钮+歌名 -->
        <div class="song-play-cover">
          <img
            :src="item.al.picUrl"
            alt=""
            v-if="index <= 2"
            :title="item.name"
            @click="toSongsDetail(item.id)"
          />
          <!-- 播放按钮 -->
          <i
            class="iconfont icon-bofangqi-bofangshu"
            :class="{ active: item.id == activeSong }"
            @click="bofang(item.id)"
          ></i>
          <!-- 歌名 -->
          <span @click="toSongsDetail(item.id)">{{ item.name }}</span>
          <em class="icon-mv" v-if="item.mv !== 0" @click="toMv(item.mv)"></em>
        </div>
        <!-- 歌曲时长 -->
        <div class="song-time">
          <span class="ti">{{ (item.dt / 1000) | formatTimer }}</span>
          <div class="add-sc">
            <i
              class="iconfont icon-tianjia add"
              title="添加到播放列表"
              @click="addList(item.id)"
            ></i>
            <i class="iconfont icon-shoucang sc" title="收藏"></i>
          </div>
        </div>
        <!-- 歌手 -->
        <div class="song-singer">
          <a
            v-for="(artist, idx) in item.ar"
            :key="artist.id"
            @click="toArtistDetail(artist.id)"
            :title="artist.name"
          >
            {{ artist.name }}
            {{ idx === item.ar.length - 1 ? "" : "/" }}
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { up, songPlay, addSong } from "../../../../mixin/mixin";
export default {
  name: "SongList",
  mixins: [songPlay, up, addSong],
  props: {
    // 歌曲列表
    songList: {
      type: Array,
      default() {
        return [];
      },
    },
    // 歌单播放次数
    playCount: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  methods: {
    // 跳转至歌手详情也
    toArtistDetail(id) {
      this.$router.push({
        path: "/singer",
        query: {
          id,
        },
      });
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
    // 跳转至 mv详情页
    toMv(mvid) {
      this.$router.push({
        path: "/mv",
        query: {
          mvid,
        },
      });
    },
  },
  computed: {
    // 播放按钮样式
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
ul > li {
  display: flex;
  align-items: center;
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
li > div:last-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1.5;
}
/* 歌曲列表第一行的样式 */
.info {
  border-bottom: 1px solid #cccccc;
  height: 34px;
  line-height: 34px;
  font-size: 12px;
  background: #f8f8f8;
  cursor: default;
  border-bottom: 1px solid #ccc;
  text-align: center;
}
.kong {
  border-right: 1px solid #ccc;
  height: 100%;
}
.title {
  border-right: 1px solid #ccc;
}
.time {
  border-right: 1px solid #ccc;
}
/* 歌曲列表样式 */
.top-song-list {
  padding: 6px 10px;
}
.top-song-list.top:hover .add-sc {
  display: block;
}
.top-song-list.top:hover .ti {
  display: none;
}
.top-song-list:nth-child(even) {
  background: #f7f7f7;
}
.number {
  margin-right: 10px;
  text-align: center;
  color: #999;
  font-size: 12px;
}
.song-play-cover {
  display: flex;
  align-items: center;
}
.song-play-cover > img {
  width: 50px;
  height: 50px;
  margin-right: 14px;
  cursor: pointer;
}
.song-play-cover > i {
  font-size: 24px;
  cursor: pointer;
  margin-right: 5px;
  color: #b2b2b2;
}
.song-play-cover > i.active {
  color: red;
}
.song-play-cover > span {
  display: block;
  max-width: 55%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  cursor: pointer;
}
.song-play-cover > span:hover {
  text-decoration: underline;
}

.song-time > span {
  font-size: 12px;
  margin-left: 10px;
  color: #777;
}
.song-singer {
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.song-singer > a {
  cursor: pointer;
  color: #333;
}
.song-singer > a:hover {
  text-decoration: underline;
}
.song-singer > a:first-child {
  margin-left: 10px;
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
</style>