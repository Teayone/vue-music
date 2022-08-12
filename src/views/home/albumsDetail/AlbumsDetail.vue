<template>
  <div id="albums-detail">
    <!-- 单独的专辑详情页 -->
    <tab-bar :items="items"></tab-bar>
    <lay-out>
      <template #left>
        <cover-box
          :coverData="coverData"
          :songList="songs"
          :total="total"
        ></cover-box>
        <!-- 歌曲列表 -->
        <song-list
          :songList="songs"
          :showAlbum="false"
          songlistTitle="包含歌曲列表"
        ></song-list>
        <!-- 评论组件 -->
        <com-ment
          :hotComments="hotComments"
          :comments="comments"
          :total="total"
          :commentType="3"
          @CurrentChange="CurrentChange"
        ></com-ment>
      </template>
      <template #right>
        <tags-box
          text="Ta的其他热门专辑"
          :showGengduo="true"
          title="全部"
          path="/singer/album"
          :id="singid"
        ></tags-box>
        <!-- 专辑组件 -->
        <albums-list :hotAlbums="hotAlbums"></albums-list>
      </template>
    </lay-out>
  </div>
</template>

<script>
import TabBar from "../../../components/tabbar/TabBar.vue";
import CoverBox from "./children/CoverBox.vue";
import LayOut from "../../../components/layout/LayOut.vue";
import SongList from "../../../components/songlist/SongList.vue";
import ComMent from "../../../components/comment/ComMent.vue";
import TagsBox from "../discover/children/right/TagsBox.vue";
import AlbumsList from "./children/AlbumsList.vue";
import { getAlbumSongs, getAlbumComment, getSingAlbum } from "../../../api/api";
export default {
  name: "AlbumsDetail",
  components: {
    TabBar,
    CoverBox,
    LayOut,
    SongList,
    ComMent,
    TagsBox,
    AlbumsList,
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
      coverData: null,
      songs: null,
      // 热门歌单评论
      hotComments: [],
      // 最新歌单评论
      comments: [],
      // 评论总数
      total: null,
      // 歌手id
      singid: 0,
      // 歌手的热门专辑 五个
      hotAlbums: null,
    };
  },
  created() {
    this.getData(this.$route.query.id);
  },
  mounted() {
    // 激活时,触发tabbar
    this.$bus.$emit("activeChildrenRoute", null);
  },
  methods: {
    async getData(id) {
      // 专辑数据
      let { data: so } = await getAlbumSongs(id);
      this.coverData = so.album;
      this.songs = so.songs;
      this.singid = so.album.artist.id;
      // 专辑评论数据
      let { data: alComment } = await getAlbumComment(id);
      this.hotComments = alComment.hotComments;
      this.comments = alComment.comments;
      this.total = alComment;
      // 歌手的热门专辑
      let { data: singAlbum } = await getSingAlbum(so.album.artist.id);
      this.hotAlbums = singAlbum.hotAlbums.slice(0, 5);
    },
    // 分页
    async CurrentChange(newPage) {
      if (newPage === 1) {
        let { data: alComment } = await getAlbumComment(this.$route.query.id);
        this.hotComments = alComment.hotComments;
        this.comments = alComment.comments;
        this.total = alComment;
      } else if (this.total.total >= 5000) {
        let { data: alComment } = await getAlbumComment(
          this.$route.query.id,
          (newPage - 1) * 20,
          this.comments[this.comments.length - 1].time
        );
        this.hotComments = [];
        this.comments = alComment.comments;
      } else {
        let { data: alComment } = await getAlbumComment(
          this.$route.query.id,
          (newPage - 1) * 20
        );
        this.hotComments = [];
        this.comments = alComment.comments;
      }
    },
  },
};
</script>

<style>
</style>