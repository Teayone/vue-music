<template>
  <div id="playlist" v-if="playlists !== null">
    <ul>
      <li class="li" v-for="item in playlists.playlists" :key="item.id">
        <!-- 播放按钮 -->
        <div class="play">
          <i
            class="iconfont icon-bofangqi-bofangshu"
            @click="handleToBoFang(item.id)"
          ></i>
        </div>
        <!-- 歌单封面 -->
        <div class="cover" @click="toPlayListDetail(item.id)">
          <img :src="item.coverImgUrl" alt="" />
          <span></span>
        </div>
        <!-- 歌单名称 -->
        <div class="play-list-name">
          <a href="javascript:;">{{ item.name }}</a>
        </div>
        <!-- 歌单歌曲数量 -->
        <div class="playlist-songs-num">
          <span>{{ item.trackCount }}首</span>
        </div>
        <!-- 歌单作者 -->
        <div class="author">
          <span>by</span>&nbsp;&nbsp;<a
            href="javascript:;"
            @click="toUserHome(item.creator.userId)"
            >{{ item.creator.nickname }}</a
          >
        </div>
        <!-- 歌单收藏数 -->
        <div class="playlist-shoucang">
          <span>收藏：{{ item.bookCount | formatPlayCount }}</span>
        </div>
        <!-- 歌单播放次数 -->
        <div class="playlist-bofang-cishu">
          <span>收听：{{ item.playCount | formatPlayCount }}</span>
        </div>
      </li>
    </ul>

    <div class="juzhong">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="playlists.playlistCount"
        :page-size="30"
        @current-change="handleCurrentChange"
        v-if="playlists.playlistCount >= 30"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mixin } from "../../../mixin/mixin";
export default {
  name: "PlayList",
  props: {
    playlists: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  mixins: [mixin],
  methods: {
    toPlayListDetail(id) {
      this.$router.push({
        path: "/playlistDetail",
        query: {
          id,
        },
      });
    },
    toUserHome(id) {
      this.$router.push({
        path: "/user/home",
        query: {
          id,
        },
      });
    },
    handleCurrentChange(newPage) {
      this.$emit("CurrentChangeOne", newPage);
    },
  },
};
</script>

<style scoped>
.li {
  display: flex;
  height: 62px;
  line-height: 62px;
  font-size: 12px;
  color: #999;
  border: 1px solid transparent;
  padding: 0 15px;
}
.li:nth-child(even) {
  background: #f7f7f7;
}
.li:hover {
  background: #f2f2f2;
  border-color: #ccc;
}
.li a {
  color: #333;
}
.li a:hover {
  text-decoration: underline;
}
.play > i {
  font-size: 24px;
  color: #888;
  cursor: pointer;
}
.cover {
  position: relative;
  height: 50px;
  width: 50px;
  margin-top: 6px;
  margin-left: 15px;
  cursor: pointer;
}
.cover > img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.cover > span {
  position: absolute;
  width: 50px;
  height: 50px;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?af2f3b7d433d2c1545043aae398e9d65)
    no-repeat;
  background-position: -160px 0;
}
.play-list-name {
  flex: 2.5;
  margin-left: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.playlist-songs-num {
  flex: 0.3;
}
.author {
  flex: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.author > span {
  color: #666;
}
.author > a {
  color: #666;
}
.playlist-shoucang {
  flex: 0.6;
}
.playlist-bofang-cishu {
  flex: 0.6;
}
.juzhong {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
</style>