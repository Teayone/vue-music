<template>
  <div id="recommend">
    <!-- 每日推荐(跳转地址不一样，故每日推荐不使用v-for) -->
    <ul>
      <li class="meiri">
        <!-- 最上方图片区域 -->
        <div class="re-img" @click="handleToRecommend" title="每日歌曲推荐">
          <!-- 星期 -->
          <span class="day">{{ day }}</span>
          <!-- 日期 -->
          <span class="date">{{ date }}</span>
        </div>
        <!-- 歌单标题 -->
        <h3>
          <a href="javascript:;" @click="handleToRecommend" title="每日歌曲推荐"
            >每日歌曲推荐</a
          >
        </h3>
        <!-- 为什么推荐 -->
        <p>根据你的口味生成， 每天6:00更新</p>
      </li>
      <li class="cover-box" v-for="item in playList" :key="item.id">
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
              item.playcount | formatPlayCount
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
          <a href="javascript:;">{{ item.name }}</a>
        </h3>
        <!-- 根据...推荐 -->
        <p>{{ item.copywriter }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mixin, dt } from "../../../../../mixin/mixin";
export default {
  name: "RecoMmend",
  mixins: [mixin, dt],
  methods: {
    // 跳转至每日推荐路由
    handleToRecommend() {
      this.$router.push("/recommend");
    },
    // 跳转至歌单详情
    handleToPlayListDetail(id) {
      this.$router.push({
        path: "playlistDetail",
        query: {
          id,
        },
      });
    },
  },
  computed: {
    playList() {
      let self = this;
      let list = JSON.parse(JSON.stringify(self.$store.state.playList));
      return list.splice(0, 3);
    },
  },
};
</script>

<style scoped>
#recommend {
  margin-top: 20px;
  margin-bottom: 40px;
}
ul {
  display: flex;
  justify-content: space-between;
}
ul > li.meiri {
  width: 140px;
}
ul > li.meiri > .re-img {
  width: 140px;
  height: 140px;
  border-radius: 9px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid #ccc;
  background: url(https://s2.music.126.net/style/web2/img/date.png?a1a1bbe24bfa688223ef8103caf0bdff)
    no-repeat;
  background-position: 0 0;
  cursor: pointer;
}
ul > li.meiri > .re-img > .day {
  display: block;
  font-size: 14px;
  height: 33px;
  line-height: 33px;
  text-shadow: 0 -1px #962626;
  text-align: center;
  color: #fed9d9;
}
ul > li.meiri > .re-img > .date {
  display: block;
  height: 107px;
  font-size: 94px;
  text-align: center;
  line-height: 107px;
  color: #202020;
  font-weight: bold;
  background: url(https://s2.music.126.net/style/web2/img/date.png?a1a1bbe24bfa688223ef8103caf0bdff)
    no-repeat;
  background-position: 0 -150px;
}
ul > .meiri > h3 {
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 6px;
}
ul > .meiri > h3 > a {
  color: #000;
}
ul > .meiri > h3 > a:hover {
  text-decoration: underline;
}
ul > .meiri > p {
  font-size: 12px;
  color: #999;
  line-height: 16px;
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
.cover-box h3 {
  margin: 8px 0 3px;
  font-size: 14px;
  line-height: 18px;
}
.cover-box h3 > a {
  color: #000;
}
.cover-box h3 > a:hover {
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
.cover-box > p {
  font-size: 12px;
  color: #999;
  line-height: 16px;
}
</style>