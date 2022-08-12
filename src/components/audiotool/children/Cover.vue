<template>
  <div id="cover" @click="hanleToSongDetail()">
    <img :src="souce" alt="" />
    <!-- bg -->
    <span></span>
  </div>
</template>

<script>
import { up } from "../../../mixin/mixin";
export default {
  name: "Cover",
  mixins: [up],
  methods: {
    hanleToSongDetail() {
      // 如果都已经到这了肯定本地已经有歌曲了
      let songId = JSON.parse(
        localStorage.getItem("song") ? localStorage.getItem("song") : ""
      );
      // 没有歌曲不让跳转
      if (songId) {
        // 跳转至歌曲详情页
        this.$router.push({
          path: "/song",
          query: {
            id: songId[this.$store.state.index].id,
          },
        });
      } else {
        return;
      }
    },
  },
  computed: {
    // 歌曲封面
    souce() {
      // 读取存在本地的歌曲数据
      // 如果本地有数据，则更新歌曲封面
      if (this.song) {
        return this.song[this.$store.state.index].al.picUrl;
      } else {
        // 如果没数据，则使用默认的数据
        return "https://s4.music.126.net/style/web2/img/default/default_album.jpg";
      }
    },
  },
};
</script>

<style scoped>
#cover {
  position: relative;
  width: 34px;
  height: 34px;
  margin-top: 8px;
  cursor: pointer;
  margin-right: 15px;
}
#cover > img {
  position: absolute;
  width: 100%;
  height: 100%;
}
span {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?c9e78ba73e0772a7f4f7f531a0aa94d5)
    no-repeat;
  background-position: 0 -80px;
}
</style>