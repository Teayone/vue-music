<template>
  <div id="playlist" ref="playList">
    <!-- 歌单页，就是很多歌单，但不是具体歌单的详情页 -->
    <tab-bar active-index="2"></tab-bar>
    <div class="main wrap3">
      <ctitle :tags="tags" :name="name"></ctitle>
      <cover-list :playlists="playlists" :show="true"></cover-list>
      <!-- 分页 -->
      <div class="fenye" v-if="total !== null">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total.total"
          :page-size="30"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import TabBar from "../../../components/tabbar/TabBar.vue";
import Ctitle from "./children/Ctitle.vue";
import CoverList from "./children/CoverList.vue";
import { getPlaylistCatlist, getPlaylistHighquality } from "../../../api/api";
export default {
  name: "PlayList",
  components: { TabBar, Ctitle, CoverList },
  data() {
    return {
      tags: null,
      // 歌单数据
      playlists: null,
      total: null,
      playListDom: null,
    };
  },
  created() {
    let cat = this.$route.query.cat;
    if (cat) {
      this.getData(cat);
    } else {
      this.getData();
    }
  },
  mounted() {
    this.playListDom = this.$refs.playList;
  },
  methods: {
    async getData(cat) {
      // 歌单标签数据
      let { data: res } = await getPlaylistCatlist();
      this.tags = res;
      // 歌单数据
      let { data: li } = await getPlaylistHighquality({ cat: cat });
      this.total = li;

      this.playlists = li.playlists;
    },
    async handleCurrentChange(newPage) {
      let cat = this.$route.query.cat;
      if (cat) {
        // 歌单数据
        let { data: li } = await getPlaylistHighquality({
          cat: cat,
          offset: (newPage - 1) * 30,
        });

        this.total = li;
        this.playlists = li.playlists;
      } else {
        // 歌单数据
        let { data: li } = await getPlaylistHighquality({
          offset: (newPage - 1) * 30,
        });
        this.total = li;
        this.playlists = li.playlists;
      }
      this.$nextTick(() => {
        this.playListDom.scrollIntoView({ behavior: "smooth" });
      });
    },
  },
  computed: {
    name() {
      let cat = this.$route.query.cat;
      if (cat) {
        return cat;
      } else {
        return "全部";
      }
    },
  },
};
</script>

<style scoped>
.main {
  background: #fff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 40px;
  box-sizing: border-box;
}
.fenye {
  width: 100%;
  text-align: center;
}
</style>
