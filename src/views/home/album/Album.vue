<template>
  <div id="album">
    <tab-bar></tab-bar>
    <!-- 热门新碟 -->
    <div class="main wrap3">
      <ctext text="热门新碟" ff="font-size:24px;"></ctext>
      <hot-album :hotAlbums="hotAlbums"></hot-album>
      <quan-bu-albums @Area="ToArea"></quan-bu-albums>
      <hot-album
        :hotAlbums="allAlbums"
        :total="total"
        @currentChange="currentChange"
        :key="theKey"
      ></hot-album>
    </div>
  </div>
</template>

<script>
import TabBar from "../../../components/tabbar/TabBar.vue";
import Ctext from "../../userhome/children/Ctext.vue";
import hotAlbum from "./children/hotAlbum.vue";
import QuanBuAlbums from "./children/QuanBuAlbums.vue";
import { getAlbumNewest, getAlbumNew } from "../../../api/api";
export default {
  name: "Album",
  components: { TabBar, Ctext, hotAlbum, QuanBuAlbums },
  data() {
    return {
      hotAlbums: null,
      allAlbums: null,
      total: null,
      area: "ALL",
      // 刷新组件用
      theKey: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let { data: res } = await getAlbumNewest();
      this.hotAlbums = res.albums.slice(0, 10);
      let { data: allAlbums } = await getAlbumNew();
      this.allAlbums = allAlbums.albums;
      this.total = allAlbums;
    },
    async ToArea(area) {
      this.area = area;
      let { data: allAlbums } = await getAlbumNew(area);
      this.allAlbums = allAlbums.albums;
      this.total = allAlbums;
      this.theKey++;
    },
    async currentChange(newPage) {
      let { data: allAlbums } = await getAlbumNew(
        this.area,
        (newPage - 1) * 30
      );
      this.allAlbums = allAlbums.albums;
      this.total = allAlbums;
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
