<template>
  <div id="bg-and-play">
    <div class="bg">
      <!-- 日期的盒子 -->
      <div class="date-box">
        <span class="day">{{ day }}</span>
        <span class="date">{{ date }}</span>
      </div>
    </div>
    <!-- 播放全部按钮和收藏全部按钮 -->
    <div class="tools">
      <a href="javascript:;" class="play" @click="toPlay">
        <i class="iconfont icon-yunhang"></i> 播放全部</a
      >
      <a href="javascript:;" class="shoucang">
        <i class="iconfont icon-shoucang"></i> 收藏全部</a
      >
    </div>
  </div>
</template>

<script>
import { dt, toPlay } from "../../../../../mixin/mixin";
export default {
  name: "BgAndPlay",
  mixins: [dt, toPlay],
  props: {
    songList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
#bg-and-play {
  width: 640px;
  margin: 0 auto;
  margin-top: 20px;
}
.bg {
  height: 179px;
  padding-top: 1px;
  background: url(https://s2.music.126.net/style/web2/img/recmd_daily.jpg?aeb01129d10c6573313fe972eab2d119)
    no-repeat;
  background-size: 100% 100%;
}
.date-box {
  width: 114px;
  height: 114px;
  border-radius: 5px;
  overflow: hidden;
  background: url(https://s2.music.126.net/style/web2/img/date.png?e0ee19f1c57fa3f3d13bac6a5d4e747e)
    no-repeat;
  background-position: 0 -270px;
  margin: 32px 40px 0;
}
.day {
  display: block;
  height: 26px;
  line-height: 26px;
  text-align: center;
  color: #fed9d9;
  text-shadow: 0 -1px #962626;
  font-size: 12px;
}
.date {
  display: block;
  height: 88px;
  color: #000;
  font-size: 74px;
  line-height: 80px;
  font-weight: bold;
  text-align: center;
  background: url(https://s2.music.126.net/style/web2/img/date.png?e0ee19f1c57fa3f3d13bac6a5d4e747e)
    no-repeat;
  background-position: 0 -396px;
}

/* 播放按钮和收藏按钮 */
.tools {
  margin-top: 30px;
}
.tools > .play {
  display: inline-block;
  font-size: 12px;
  color: #fff;
  background: #2778c6;
  padding: 6px 14px;
  line-height: 16px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #2778c6;
  box-sizing: border-box;
}
.tools > .play:hover {
  background: #589fe0;
}
.tools > .play > i {
  margin-left: -6px;
  font-size: 18px;
  vertical-align: -2px;
}
.tools > .shoucang {
  margin-left: 10px;
  font-size: 12px;
  color: #333;
  background: #f2f2f2;
  padding: 6px 6px;
  line-height: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.tools > .shoucang:hover {
  background: #f9f9f9;
}
</style>