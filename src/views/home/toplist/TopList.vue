<template>
  <div id="toplist">
    <tab-bar :items="items"></tab-bar>
    <clay-out>
      <template #left>
        <top-list-title text="云音乐特色榜"></top-list-title>
        <list :topList="FeatureList" v-if="FeatureList !== null"></list>
        <top-list-title text="全球媒体榜"></top-list-title>
        <list :topList="GlobalList" v-if="GlobalList !== null"></list>
      </template>
      <template #right>
        <!-- 榜单封面-->
        <list-cover :playlist="playlist" :total="total"></list-cover>
        <song-list :songList="tracks" :playCount="playlist"></song-list>
        <div class="mb"></div>
        <com-ment
          :comments="comments"
          :hotComments="hotComments"
          :total="total"
          @CurrentChange="CurrentChange"
        ></com-ment>
      </template>
    </clay-out>
  </div>
</template>

<script>
import TabBar from "../../../components/tabbar/TabBar.vue";
import ClayOut from "./children/ClayOut.vue";
import TopListTitle from "./children/TopListTitle.vue";
import List from "./children/List.vue";
import ListCover from "./children/ListCover.vue";
import SongList from "./children/SongList.vue";
import ComMent from "../../../components/comment/ComMent.vue";
import {
  getTopList,
  getWholeSongs,
  getPlayListComment,
} from "../../../api/api";
export default {
  name: "TopList",
  components: {
    TabBar,
    ClayOut,
    TopListTitle,
    List,
    ListCover,
    SongList,
    ComMent,
  },
  data() {
    return {
      items: [
        { title: "推荐", path: "/home" },
        { title: "排行榜", path: "/toplist" },
        { title: "歌单", path: "/playlist" },
        { title: "主播电台", path: "/djradio" },
        { title: "歌手", path: "/artist" },
        { title: "新碟上架", path: "/album" },
      ],
      // 云音乐特色榜(前四)
      FeatureList: null,
      // 全球媒体榜
      GlobalList: null,
      // 歌曲列表数据
      tracks: null,
      // 接口得到的所有数据
      playlist: null,
      hotComments: null,
      comments: null,
      total: null,
    };
  },
  created() {
    let id = this.$route.query.id;
    if (id) {
      this.getData(id);
    } else {
      this.getData(19723756);
    }
  },
  mounted() {
    // 激活时,触发tabbar
    this.$bus.$emit("activeChildrenRoute", 1);
  },
  methods: {
    async getData(id) {
      let { data: res } = await getTopList();
      this.FeatureList = res.list.slice(0, 4);
      this.GlobalList = res.list.slice(4);

      // 排行榜详情
      let { data: list } = await getWholeSongs(id);
      this.playlist = list.playlist;
      this.tracks = list.playlist.tracks;

      // 获取评论数据
      let { data: pCom } = await getPlayListComment(id);
      this.total = pCom;
      this.comments = pCom.comments;
      this.hotComments = pCom.hotComments;
    },
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
.mb {
  margin-bottom: 30px;
}
</style>