<template>
  <div id="disc">
    <div class="disc-box" v-for="item in albums" :key="item.id">
      <!-- 碟片封面 -->
      <img
        :src="item.picUrl"
        alt=""
        @click="albumsDetail(item.id)"
        :title="item.name"
      />
      <!-- 鼠标悬浮，播放按钮 -->
      <i
        class="iconfont icon-yunhang play"
        @click.stop="handleToBoFang(item.id)"
      ></i>
      <!-- 碟片背景 -->
      <div class="disc-img"></div>
      <!-- 专辑名字+歌手 -->
      <div class="detail">
        <h5>
          <a
            href="javascript:;"
            @click="albumsDetail(item.id)"
            :title="item.name"
            >{{ item.name }}</a
          >
        </h5>
        <p>
          <a
            href="javascript:;"
            @click="singerDtail(item.artists[0].id)"
            :title="item.artists[0].name"
            >{{ item.artists[0].name }}</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { albumPlay } from "../../../../../mixin/mixin";
export default {
  name: "Disc",
  props: {
    albums: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mixins: [albumPlay],
  methods: {
    // 获取专辑内容
    albumsDetail(id) {
      this.$router.push({
        path: "/albumsDetail",
        query: {
          id,
        },
      });
    },
    // 获取歌手详情
    singerDtail(id) {
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
#disc {
  display: flex;
  background: #f5f5f5;
  border: 1px solid #ccc;
  padding: 0 20px;
  box-sizing: border-box;
  justify-content: space-between;
  margin-bottom: 40px;
  border: 1px solid #ccc;
  margin-top: 20px;
}
.disc-box {
  position: relative;
  margin-top: 28px;
  margin-bottom: 5px;
  width: 118px;
  height: 150px;
}
.play {
  position: absolute;
  bottom: 50px;
  right: 20px;
  z-index: 999;
  font-size: 25px;
  color: skyblue;
  cursor: pointer;
  display: none;
}
.disc-box:hover .play {
  display: block;
}
.disc-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 118px;
  height: 100px;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?80b12bc3b32e44dd373ee4b293eb1d26)
    no-repeat;
  background-position: 0 -570px;
  background-color: #f5f5f5;
  cursor: pointer;
}
#disc img {
  position: absolute;
  width: 100px;
  height: 100px;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3);
}
.detail {
  position: absolute;
  bottom: 10px;
  font-size: 12px;
  width: 110px;
  line-height: 18px;
}
.detail > h5 > a {
  display: block;
  color: #000;
}
.detail > p > a {
  display: block;
  color: #666;
}
.detail a {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.detail a:hover {
  text-decoration: underline;
}
</style>