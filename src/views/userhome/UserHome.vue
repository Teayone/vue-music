<template>
  <div id="user-home">
    <!-- 用户主页(歌手或主播) -->
    <tab-bar></tab-bar>
    <div class="main wrap3">
      <user-info :userData="userData"></user-info>
      <song-ranking :songNum="userData" :songKing="songKing"></song-ranking>
      <ctext
        :text="userData.profile.nickname + '创建的歌单'"
        :num="myPlaylist.length"
        v-if="myPlaylist !== null"
      >
      </ctext>
      <cover-list :playlists="myPlaylist"></cover-list>
      <ctext
        :text="userData.profile.nickname + '收藏的歌单'"
        :num="collectionPlaylist.length"
        v-if="collectionPlaylist !== null && collectionPlaylist.length !== 0"
      >
      </ctext>
      <cover-list :playlists="collectionPlaylist"></cover-list>
    </div>
  </div>
</template>

<script>
import TabBar from "../../components/tabbar/TabBar.vue";
import UserInfo from "./children/UserInfo.vue";
import SongRanking from "./children/SongRanking.vue";
import CoverList from "../home/playlist/children/CoverList.vue";
import Ctext from "./children/Ctext.vue";
import { getUserDetail, getUserRecord, getUserPlayList } from "../../api/user";

export default {
  name: "UserHome",
  components: { TabBar, UserInfo, SongRanking, Ctext, CoverList },
  data() {
    return {
      // 用户信息
      userData: null,
      // 听歌排行
      songKing: null,
      // 我创建的歌单
      myPlaylist: null,
      // 我收藏的歌单
      collectionPlaylist: null,
      // 用户昵称
      nickname: "",
    };
  },
  created() {
    this.getUserData(this.$route.query.id);
    this.$bus.$emit("activeRouer", null);
  },
  mounted() {
    let id = this.$route.query.id;
    this.$bus.$on("sRank", (value) => {
      this.getWAData(value, id);
    });
  },
  methods: {
    async getUserData(id) {
      let { data: res } = await getUserDetail(id);
      this.userData = res;
      this.nickname = res.profile.nickname;
      // 我创建的歌单
      let { data: uPlay } = await getUserPlayList(id);
      // 取出用户创建的歌单
      this.myPlaylist = uPlay.playlist.filter((item) => {
        return item.creator.nickname === this.nickname;
      });
      // 取出用户收藏的歌单
      this.collectionPlaylist = uPlay.playlist.filter((item) => {
        return item.creator.nickname !== this.nickname;
      });
      try {
        // 用户播放记录
        let { data: rec } = await getUserRecord(id);
        this.songKing = rec.weekData.slice(0, 10);
      } catch (error) {}
    },
    async getWAData(value, id) {
      if (value === 1) {
        // 用户播放记录
        let { data: rec } = await getUserRecord(id, value);
        this.songKing = rec.weekData.slice(0, 10);
      } else {
        let { data: rec } = await getUserRecord(id, value);
        this.songKing = rec.allData.slice(0, 10);
      }
    },
  },
};
</script>

<style scoped>
.main {
  padding: 40px;
  box-sizing: border-box;
  background: #fff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
</style>