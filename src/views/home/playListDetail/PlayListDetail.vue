<template>
  <div id="paly-list-detail">
    <!-- 歌单具体的详情页，需要接收到id -->
    <tab-bar :items="items"></tab-bar>
    <lay-out>
      <!-- 左侧布局 -->
      <template #left>
        <cover-box
          :songList="songList"
          :coverData="coverData"
          :total="total"
        ></cover-box>
        <!-- 歌单封面标题组件 -->
        <song-list :songList="songList" :playCount="coverData"></song-list>
        <!-- 查看更多内容，下载客户端 -->
        <down-load></down-load>
        <!-- 评论组件 -->
        <com-ment
          :hotComments="hotComments"
          :comments="comments"
          :total="total"
          :commentType="2"
          @CurrentChange="CurrentChange"
        ></com-ment>
      </template>
      <!-- 右侧布局 -->
      <template #right>
        <tags-box text="喜欢这个歌单的人"></tags-box>
        <!-- 八个用户 -->
        <like-user
          :subscribers="coverData.subscribers"
          v-if="coverData"
        ></like-user>
        <tags-box text="热门歌单"></tags-box>
        <hot-list
          :relatedList="relatedList"
          v-if="relatedList !== null"
        ></hot-list>
      </template>
    </lay-out>
  </div>
</template>

<script>
import TabBar from "../../../components/tabbar/TabBar.vue";
import LayOut from "../../../components/layout/LayOut.vue";
import SongList from "../../../components/songlist/SongList.vue";
import coverBox from "./children/coverBox.vue";
import DownLoad from "./children/DownLoad.vue";
import ComMent from "../../../components/comment/ComMent.vue";
import TagsBox from "../discover/children/right/TagsBox.vue";
import LikeUser from "../../../components/likeUser/LikeUser.vue";
import HotList from "./children/HotList.vue";
import {
  getWholeSongs,
  getPlayListComment,
  getRelatedPlayList,
} from "../../../api/api";

export default {
  name: "PlayListDetail",
  components: {
    TabBar,
    LayOut,
    coverBox,
    SongList,
    DownLoad,
    ComMent,
    ComMent,
    TagsBox,
    LikeUser,
    HotList,
  },
  data() {
    return {
      items: [
        { title: "推荐", path: "/home" },
        { title: "排行榜", path: "toplist" },
        { title: "歌单", path: "playlist" },
        { title: "主播电台", path: "djradio" },
        { title: "歌手", path: "artist" },
        { title: "新碟上架", path: "album" },
      ],
      // 歌曲数据
      songList: [],
      // 封面标题数据
      coverData: null,
      // 热门歌单评论
      hotComments: [],
      // 最新歌单评论
      comments: [],
      // 评论总数
      total: null,
      // 相关推荐歌单
      relatedList: null,
    };
  },
  created() {
    this.getListDetail(this.$route.query.id);
  },
  mounted() {
    // 激活时,触发tabbar
    this.$bus.$emit("activeChildrenRoute", null);
  },
  methods: {
    async getListDetail(id) {
      // 歌单
      let { data: res } = await getWholeSongs(id);
      this.songList = res.playlist.tracks;
      this.coverData = res.playlist;
      // 歌单评论
      let { data: com } = await getPlayListComment(id);
      this.hotComments = com.hotComments;
      this.comments = com.comments;
      this.total = com;
      // 相关推荐歌单
      let { data: related } = await getRelatedPlayList(id);
      this.relatedList = related.playlists;
    },
    // 分页
    async CurrentChange(newPage) {
      if (newPage === 1) {
        let { data: com } = await getPlayListComment(this.$route.query.id);
        this.hotComments = com.hotComments;
        this.comments = com.comments;
      } else if (this.total.total >= 5000) {
        // 重新发送评论请求根据分页数据
        let { data: com } = await getPlayListComment(
          this.$route.query.id,
          (newPage - 1) * 20,
          this.comments[this.comments.length - 1].time
        );
        this.hotComments = [];
        this.comments = com.comments;
      } else {
        // 重新发送评论请求根据分页数据
        let { data: com } = await getPlayListComment(
          this.$route.query.id,
          (newPage - 1) * 20
        );
        this.hotComments = [];
        this.comments = com.comments;
      }
    },
  },
};
</script>

<style scoped>
</style>