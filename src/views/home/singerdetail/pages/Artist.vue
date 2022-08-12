<template>
  <!-- 默认路由 -->
  <div id="artist">
    <div class="play-box">
      <a href="javascript:;" class="play" @click="toPlay">
        <i class="iconfont icon-bofangqi-bofangshu bofang"></i> 播放</a
      >
    </div>
    <song-list
      :songList="songList"
      :showLiTitle="false"
      :showSingerName="false"
      :showInfo="false"
      :Border="true"
    ></song-list>
  </div>
</template>

<script>
import SongList from "../../../../components/songlist/SongList.vue";
import { getSingerTopSong } from "../../../../api/api";
import { toPlay } from "../../../../mixin/mixin";
export default {
  name: "Artist",
  components: { SongList },
  data() {
    return {
      songList: null,
    };
  },
  created() {
    this.getTopSong(this.$route.query.id);
  },
  mixins: [toPlay],
  methods: {
    async getTopSong(id) {
      let { data: topSong } = await getSingerTopSong(id);
      this.songList = topSong.songs;
    },
  },
};
</script>

<style scoped>
.play {
  font-size: 12px;
  color: #fff;
  background: #2e7ecb;
  border-radius: 5px;
  padding: 10px 20px;
}
.bofang {
  font-size: 26px;
  vertical-align: -5px;
  margin-left: -10px;
}
.play:hover {
  background: #3987d0;
}
</style>