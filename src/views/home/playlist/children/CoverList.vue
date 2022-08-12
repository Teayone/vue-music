<template>
  <div id="cover-list" class="clearfix" v-if="playlists !== null">
    <div class="box" v-for="(item, index) in playlists" :key="index">
      <div class="box-img" @click="toPlayListDetail(item.id)">
        <img
          v-lazy="item.coverImgUrl"
          :key="item.coverImgUrl"
          alt=""
          :title="item.name"
        />
        <!-- bg -->
        <span></span>
        <div class="zhezhao">
          <i class="iconfont icon-erji erji"></i>
          <span class="num">{{ item.playCount | formatPlayCount }}</span>
          <i
            class="iconfont icon-yunhang play"
            @click.stop="handleToBoFang(item.id)"
          ></i>
        </div>
      </div>
      <div class="info">
        <h2 @click="toPlayListDetail(item.id)">
          <a href="javascript:;">{{ item.name }}</a>
        </h2>
        <p v-if="show">
          <span>by</span
          ><a href="javascript:;" @click="toUserHome(item.creator.userId)">{{
            item.creator.nickname
          }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from "../../../../mixin/mixin";
export default {
  name: "CoverList",
  props: {
    playlists: {
      type: Array,
      default() {
        return null;
      },
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [mixin],
  methods: {
    toPlayListDetail(id) {
      this.$router.push({
        path: "/playlistDetail",
        query: {
          id,
        },
      });
    },
    toUserHome(id) {
      this.$router.push({
        path: "/user/home",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped>
#cover-list {
  margin-top: 30px;
}
.box {
  float: left;
  width: 140px;
  height: 188px;
  margin-right: 49.4px;
  margin-bottom: 30px;
}
.box:nth-child(5n) {
  margin-right: 0;
}
.box-img {
  position: relative;
  width: 140px;
  height: 140px;
}
.box-img > img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.box-img > span {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?af2f3b7d433d2c1545043aae398e9d65);
  background-position: 0 0;
  cursor: pointer;
}
.zhezhao {
  position: absolute;
  height: 27px;
  background: rgba(0, 0, 0, 0.4);
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #000;
  color: #fff;
  padding: 0 10px;
  box-sizing: border-box;
  line-height: 24px;
  font-size: 12px;
  z-index: 99;
}
.erji {
  font-size: 14px;
}
.num {
  margin-left: 6px;
}
.play {
  float: right;
  font-size: 20px;
  margin-top: 1px;
  cursor: pointer;
}
.info {
  margin-top: 10px;
}
.info > h2 {
  font-size: 14px;
}
.info > h2 > a {
  display: block;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info > h2 > a:hover {
  text-decoration: underline;
}
.info > p {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
  margin-left: 3px;
}
.info > p > a {
  margin-left: 5px;
  color: #666;
}
.info > p > a:hover {
  text-decoration: underline;
}
</style>