<template>
  <div id="mv-box" v-if="mvs">
    <!-- 歌手mv -->
    <div class="sing-mv" v-for="item in mvs" :key="item.id">
      <!-- 封面和播放按钮 -->
      <div class="sing-mv-cover" @click="toMv(item.id)">
        <img :src="item.imgurl" alt="" />
        <!-- 播放按钮 -->
        <i class="iconfont icon-bofang1"></i>
      </div>
      <!-- mv标题 -->
      <p class="title" @click="toMv(item.id)">
        <a href="javascript:;">{{ item.name }}</a>
      </p>
    </div>
  </div>
</template>

<script>
import { getSingerMV } from "../../../../api/api";
export default {
  name: "MvBox",
  data() {
    return {
      mvs: null,
    };
  },
  created() {
    this.getMV(this.$route.query.id);
  },
  methods: {
    async getMV(id) {
      let { data: res } = await getSingerMV(id);
      this.mvs = res.mvs;
    },
    toMv(id) {
      this.$router.push({
        path: "/mv",
        query: {
          mvid: id,
        },
      });
    },
  },
};
</script>

<style scoped>
#mv-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.sing-mv {
  width: 137px;
  margin-bottom: 20px;
}
.sing-mv-cover {
  position: relative;
  width: 137px;
  height: 103px;
  cursor: pointer;
}
.sing-mv-cover > img {
  width: 100%;
  height: 100%;
}
.sing-mv-cover > i {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  font-weight: bolder;
  color: #d7cdb5;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
}
.sing-mv-cover > i:hover {
  color: #fcf4ed;
  background: rgba(0, 0, 0, 0.6);
}
.title {
  margin-top: 10px;
  width: 100%;
  font-size: 14px;
}
.title > a {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333;
}
.title > a:hover {
  text-decoration: underline;
}
</style>