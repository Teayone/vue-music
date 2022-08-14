<template>
  <div id="song">
    <!-- 歌曲详情页 -->
    <tab-bar></tab-bar>
    <lay-out>
      <template #left>
        <!-- 歌曲封面和歌曲信息组件 -->
        <song-box :songs="songs" :str="str" :total="total"></song-box>
        <com-ment
          :hotComments="hotComments"
          :comments="comments"
          @CurrentChange="CurrentChange"
          :total="total"
          :commentType="0"
        ></com-ment>
      </template>
      <template #right>
        <tags-box text="相似歌单" v-if="relatedList != false"></tags-box>
        <hot-list :relatedList="relatedList"></hot-list>
        <tags-box text="相似音乐"></tags-box>
        <!-- 相似音乐组件 -->
        <simi-songs :simiSongs="simiSongs"></simi-songs>
      </template>
    </lay-out>
  </div>
</template>

<script>
import TabBar from "../../../components/tabbar/TabBar.vue";
import LayOut from "../../../components/layout/LayOut.vue";
import songBox from "./children/songBox.vue";
import ComMent from "../../../components/comment/ComMent.vue";
import TagsBox from "../discover/children/right/TagsBox.vue";
import HotList from "../playListDetail/children/HotList.vue";
import SimiSongs from "./children/SimiSongs.vue";
import {
  getSongDetail,
  getLyric,
  getMusicComment,
  getSimiSongPlayList,
  getSimiSong,
} from "../../../api/api";
export default {
  name: "SongDetail",
  components: { TabBar, LayOut, songBox, ComMent, TagsBox, HotList, SimiSongs },
  data() {
    return {
      songs: null,
      str: [],
      hotComments: null,
      comments: null,
      total: null,
      relatedList: null,
      // 相似音乐
      simiSongs: null,
    };
  },
  created() {
    this.getSong(this.$route.query.id);
  },
  methods: {
    async getSong(id) {
      // 正则
      let reg = /\[[0-9]*:[0-9]*\.[0-9]*\]/g;
      let { data: res } = await getSongDetail(id);
      this.songs = res.songs;
      // 歌词
      let { data: ly } = await getLyric(id);
      if (ly.lrc) {
        this.str = ly.lrc.lyric.replace(reg, "").split("\n");
      } else {
        this.str = ["纯音乐，请欣赏"];
      }
      let { data: mCom } = await getMusicComment(id);
      this.hotComments = mCom.hotComments;
      this.comments = mCom.comments;
      this.total = mCom;
      // 相似歌单
      let { data: simi } = await getSimiSongPlayList(id);
      this.relatedList = simi.playlists;
      // 相似音乐
      let { data: simiSong } = await getSimiSong(id);
      this.simiSongs = simiSong.songs;
    },
    async CurrentChange(newPage) {
      if (newPage === 1) {
        let { data: mCom } = await getMusicComment(this.$route.query.id);
        this.hotComments = mCom.hotComments;
        this.comments = mCom.comments;
      } else if (this.total.total >= 5000) {
        // 重新发送评论请求根据分页数据
        let { data: mCom } = await getMusicComment(
          this.$route.query.id,
          (newPage - 1) * 20,
          this.comments[this.comments.length - 1].time
        );
        this.hotComments = [];
        this.comments = mCom.comments;
      } else {
        // 重新发送评论请求根据分页数据
        let { data: mCom } = await getMusicComment(
          this.$route.query.id,
          (newPage - 1) * 20
        );
        this.hotComments = [];
        this.comments = mCom.comments;
      }
    },
  },
};
</script>

<style scoped></style>
