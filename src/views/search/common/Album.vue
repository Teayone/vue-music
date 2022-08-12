<template>
  <div id="album" v-if="albums !== null">
    <div class="box" v-for="item in albums.albums" :key="item.id">
      <div class="img">
        <img :src="item.blurPicUrl" alt="" />
        <!-- bg -->
        <span :title="item.name" @click="toAlbumDetail(item.id)"></span>
        <i
          class="iconfont icon-bofangqi-bofangshu play"
          @click.stop="handleToBoFang(item.id)"
        ></i>
      </div>
      <div class="info">
        <h5>
          <a
            href="javascript:;"
            :title="item.name"
            @click="toAlbumDetail(item.id)"
            >{{ item.name }}</a
          >
        </h5>
        <p>
          <a href="javascript:;" @click="toSingerDetail(item.artist.id)">{{
            item.artist.name
          }}</a>
        </p>
      </div>
    </div>

    <div class="juzhong">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="albums.albumCount"
        :page-size="30"
        @current-change="handleCurrentChange"
        v-if="albums.albumCount >= 30"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { albumPlay } from "../../../mixin/mixin";
export default {
  name: "Album",
  props: {
    albums: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  mixins: [albumPlay],
  methods: {
    handleCurrentChange(newPage) {
      this.$emit("CurrentChangeOne", newPage);
    },
    // 跳转至专辑详情
    toAlbumDetail(id) {
      this.$router.push({
        path: "/albumsDetail",
        query: {
          id,
        },
      });
    },
    // 跳转至歌手详情
    toSingerDetail(id) {
      this.$router.push({
        path: "/singer",
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
.box {
  width: 153px;
  height: 178px;
  margin-bottom: 30px;
}
.img {
  position: relative;
  width: 130px;
  height: 130px;
}
.img > img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.img > span {
  position: absolute;
  width: 153px;
  height: 100%;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?af2f3b7d433d2c1545043aae398e9d65)
    no-repeat;
  background-position: 0 -845px;
  cursor: pointer;
}
.img > i {
  position: absolute;
  right: 10px;
  bottom: 5px;
  z-index: 9;
  font-size: 30px;
  color: #eee;
  cursor: pointer;
  display: none;
}
.img > i:hover {
  color: #999;
}
.box:hover i {
  display: block;
}
.info {
  margin-top: 10px;
}
.info a:hover {
  text-decoration: underline;
}
.info > h5 {
  font-size: 14px;
}
.info > h5 > a {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
}
.info > p > a {
  display: block;
  font-size: 12px;
  color: #777;
  margin-top: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.juzhong {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
</style>