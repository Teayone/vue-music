<template>
  <div id="album" v-if="hotAlbums">
    <!-- 歌手专辑页面二级路由 -->
    <div class="sing-album-box" v-for="item in hotAlbums" :key="item.id">
      <!-- 专辑封面 -->
      <div
        class="sing-album-cover"
        :title="item.name"
        @click="handleToAlbumDetail(item.id)"
      >
        <img :src="item.blurPicUrl" alt="" />
        <!-- 背景 -->
        <span></span>
      </div>
      <!-- 专辑名字和上线日期 -->
      <div class="album-name-date">
        <p
          class="name"
          :title="item.name"
          @click="handleToAlbumDetail(item.id)"
        >
          <a href="javascript:;">{{ item.name }}</a>
        </p>
        <p class="date">{{ item.publishTime | forMatDate }}</p>
      </div>
    </div>

    <!-- 分页按钮 -->
    <!-- 分页 -->
    <div class="fenye">
      <el-pagination
        :total="albumsSize"
        background
        layout="prev, pager, next"
        :page-size="12"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getSingerAlbum } from "../../../../api/api";
export default {
  name: "CAlbum",
  data() {
    return {
      // 专辑数据
      hotAlbums: null,
      albumsSize: 0,
    };
  },
  created() {
    this.getAlbum(this.$route.query.id);
  },
  methods: {
    async getAlbum(id, offset) {
      if (offset) {
        let { data: res } = await getSingerAlbum(id, offset);
        // 总专辑数据
        this.albumsSize = res.artist.albumSize;
        // 专辑数据
        this.hotAlbums = res.hotAlbums;
      } else {
        let { data: res } = await getSingerAlbum(id);
        // 总专辑数据
        this.albumsSize = res.artist.albumSize;
        // 专辑数据
        this.hotAlbums = res.hotAlbums;
      }
    },
    handleCurrentChange(newPage) {
      if (newPage === 1) {
        this.getAlbum(this.$route.query.id);
      } else {
        this.getAlbum(this.$route.query.id, (newPage - 1) * 12);
      }
    },
    // 跳转至专辑详情
    handleToAlbumDetail(id) {
      this.$router.push({
        path: "/albumsDetail",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped>
#album {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.sing-album-box {
  width: 145px;
  height: 175px;
  margin-bottom: 30px;
}
.sing-album-cover {
  position: relative;
  width: 120px;
  height: 120px;
  cursor: pointer;
}
.sing-album-cover > img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9;
}
.sing-album-cover > span {
  position: absolute;
  width: 145px;
  height: 120px;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?af2f3b7d433d2c1545043aae398e9d65)
    no-repeat;
  background-position: -170px -850px;
}
.album-name-date {
  margin-top: 10px;
}
.name {
  font-size: 14px;
  margin-bottom: 8px;
}
.name > a {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #000;
}
.name > a:hover {
  text-decoration: underline;
}
.date {
  font-size: 12px;
  color: #666;
}
.fenye {
  width: 100%;
  margin-top: 25px;
  text-align: center;
}
</style>