<template>
  <div id="song" v-if="songs !== null">
    <ul v-if="songs.songs && songs.songs.length !== 0">
      <li v-for="item in songs.songs" :key="item.id">
        <div class="play">
          <i
            class="iconfont icon-bofangqi-bofangshu"
            @click="bofang(item.id)"
            :class="{ active: item.id === activeSong }"
          ></i>
        </div>
        <div class="song">
          <a href="javascript:;" @click="toSongDetail(item.id)">{{
            item.name
          }}</a>
          <i
            class="icon-mv"
            v-if="item.mvid !== 0"
            @click="toMv(item.mvid)"
          ></i>
        </div>
        <div class="singer">
          <a href="javascript:;" @click="toSingerDetail(item.artists[0].id)">{{
            item.artists[0].name
          }}</a>
        </div>
        <div class="album">
          <a href="javascript:;" @click="toAlbumDetail(item.album.id)">{{
            item.album.name
          }}</a>
        </div>
        <div class="time">
          <span>{{ (item.duration / 1000) | formatTimer }}</span>
        </div>
      </li>
    </ul>

    <div class="juzhong">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="songs.songCount"
        :page-size="30"
        @current-change="handleCurrentChange"
        v-if="songs.songCount >= 30"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { songPlay, up } from "../../../mixin/mixin";
export default {
  name: "Song",
  props: {
    songs: {
      type: Object,
      default() {
        return null;
      },
    },
  },

  mixins: [songPlay, up],
  methods: {
    toSongDetail(id) {
      this.$router.push({
        path: "/song",
        query: {
          id,
        },
      });
    },
    toSingerDetail(id) {
      this.$router.push({
        path: "/singer",
        query: {
          id,
        },
      });
    },
    toAlbumDetail(id) {
      this.$router.push({
        path: "/albumsDetail",
        query: {
          id,
        },
      });
    },
    handleCurrentChange(newPage) {
      this.$emit("CurrentChangeOne", newPage);
    },
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
    activeSong() {
      return this.song === null ? 0 : this.song[this.$store.state.index].id;
    },
  },
};
</script>

<style scoped>
ul > li {
  padding: 10px 10px 8px 18px;
  display: flex;
  border: 1px solid transparent;
  font-size: 12px;
}
ul > li:hover {
  background: #f2f2f2;
  border-color: #ccc;
}
ul > li:nth-child(even) {
  background: #f7f7f7;
}
ul > li > div > a {
  color: #333333;
}
ul > li > div > a:hover {
  text-decoration: underline;
}
.play {
  margin-right: 5px;
}
.play > i {
  display: inline-block;
  margin-top: -7px;
  font-size: 25px;
  color: #999;
  cursor: pointer;
}
.play > i.active {
  color: red;
}
.song {
  flex: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.singer {
  flex: 1.5;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.album {
  flex: 1.5;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.album > a {
  color: #888;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.time {
  flex: 0.7;
  text-align: center;
}
.juzhong {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
</style>