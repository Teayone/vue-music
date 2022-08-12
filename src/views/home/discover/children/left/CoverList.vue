<template>
  <div id="cover-list">
    <!-- 首页歌单组件 -->
    <div
      class="cover-box"
      v-for="(item, index) in $store.state.playList"
      :key="index"
    >
      <!-- 歌单封面歌单名称 -->
      <!-- 封面 -->
      <div class="cover">
        <!-- 图片 -->
        <img :src="item.picUrl" alt="" />
        <!-- bg -->
        <span
          @click="handleToPlayListDetail(item.id)"
          :title="item.name"
        ></span>
        <!-- 小遮罩 -->
        <div class="zhezhao">
          <!-- 字体图标 -->
          <i class="iconfont icon-erji erji"></i>
          <!-- 播放歌单次数 -->
          <span class="bofangcishu">{{
            item.playcount ? item.playcount : item.playCount | formatPlayCount
          }}</span>
          <!-- 播放按钮 -->
          <i
            class="iconfont icon-yunhang bofang"
            @click.stop="handleToBoFang(item.id)"
          ></i>
        </div>
      </div>
      <!-- 歌单标题 -->
      <h3 @click="handleToPlayListDetail(item.id)">
        <a href="javascript:;" :title="item.name">{{ item.name }}</a>
      </h3>
    </div>
  </div>
</template>

<script>
// 导入混入
import { mixin } from "../../../../../mixin/mixin";
export default {
  name: "CoverList",
  data() {
    return {};
  },
  mounted() {},
  mixins: [mixin],
  methods: {
    // 跳转至歌单详情
    handleToPlayListDetail(id) {
      this.$router.push({
        path: "/playlistDetail",
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
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}
.cover-box {
  width: 140px;
  height: 204px;
  margin-bottom: 30px;
}

.cover {
  position: relative;
  width: 140px;
  height: 140px;
}
.cover > img {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.cover > span {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?18ba099d8d27a00c16809c928747ea0f)
    no-repeat;
  background-position: 0 0;
  cursor: pointer;
}
.cover > .zhezhao {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 27px;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.6);
  color: #ccc;
}
#cover-list h3 {
  margin: 8px 0 3px;
  font-size: 14px;
  line-height: 18px;
}
#cover-list h3 > a {
  color: #000;
}
#cover-list h3 > a:hover {
  text-decoration: underline;
}
.erji {
  margin-left: 6px;
  line-height: 27px;
}
.bofangcishu {
  font-size: 12px;
  margin-left: 2px;
  line-height: 27px;
  vertical-align: 1px;
}
.bofang {
  float: right;
  line-height: 27px;
  margin-right: 6px;
  font-size: 20px;
  cursor: pointer;
}
.bofang:hover {
  color: #fff;
}
</style>