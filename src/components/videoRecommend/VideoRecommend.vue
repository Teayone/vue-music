<template>
  <div id="videoRecommend">
    <div v-if="Pmv !== null">
      <div class="video-r-box" v-for="item in Pmv" :key="item.id">
        <div class="video-cover" @click="toMV(item.id)">
          <!-- 封面 -->
          <img :src="item.cover" alt="" :title="item.name" />
          <!-- 播放次数 -->
          <p>
            <i class="iconfont icon-shipin"></i
            >{{ item.playCount | formatPlayCount }}
          </p>
        </div>
        <!-- 右侧视频简介 -->
        <div class="video-jianjie">
          <!-- 视频标题 -->
          <div class="video-title" :title="item.name" @click="toMV(item.id)">
            <a href="javascript:;">{{ item.name }}</a>
          </div>
          <!-- 视频时长 -->
          <p class="video-dt">{{ (item.duration / 1000) | formatTimer }}</p>
          <!-- 视频作者 -->
          <div class="video-author">
            <span>by</span>
            <a href="javascript:;" @click="toSinger(item.artistId)">{{
              item.artistName
            }}</a>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="video-r-box" v-for="item in Pvideo" :key="item.vid">
        <div class="video-cover" @click="toVideo(item.vid)">
          <!-- 封面 -->
          <img :src="item.coverUrl" alt="" :title="item.title" />
          <!-- 播放次数 -->
          <p>
            <i class="iconfont icon-shipin"></i
            >{{ item.playTime | formatPlayCount }}
          </p>
        </div>
        <!-- 右侧视频简介 -->
        <div class="video-jianjie">
          <!-- 视频标题 -->
          <div
            class="video-title"
            :title="item.title"
            @click="toVideo(item.vid)"
          >
            <a href="javascript:;">{{ item.title }}</a>
          </div>
          <!-- 视频时长 -->
          <p class="video-dt">{{ (item.durationms / 1000) | formatTimer }}</p>
          <!-- 视频作者 -->
          <div class="video-author" v-if="Pvideo">
            <span>by</span>
            <a href="javascript:;" @click="toSinger(item.creator[0].userId)">{{
              item.creator[0].userName
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoRecommend",
  props: {
    Pmv: {
      type: Array,
      default() {
        return null;
      },
    },
    Pvideo: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  methods: {
    toMV(id) {
      this.$router.push({
        path: "/mv",
        query: {
          mvid: id,
        },
      });
    },
    toVideo(id) {
      this.$router.push({
        path: "/video",
        query: {
          id,
        },
      });
    },
    toSinger(id) {
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
#videoRecommend {
  margin: 20px;
}
.video-r-box {
  margin-bottom: 15px;
}
/* 左侧视频封面 */
.video-r-box {
  display: flex;
}
.video-cover {
  position: relative;
  width: 96px;
  height: 54px;
  cursor: pointer;
}
.video-cover > img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.video-cover > p {
  position: absolute;
  top: 0;
  right: 0;
  height: 20px;
  line-height: 20px;
  padding-right: 5px;
  font-size: 12px;
  color: #fff;
  box-sizing: border-box;
  text-align: right;
  text-shadow: -2px 1px rgba(0, 0, 0, 0.4);
}
.video-cover > p > i {
  font-size: 16px;
  position: relative;
  top: 1px;
}
/* 右侧视频简介 */
.video-jianjie {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  margin-left: 8px;
  line-height: 18px;
  color: #999;
}

.video-jianjie a:hover {
  text-decoration: underline;
}
.video-jianjie > .video-title > a {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
}
.video-author {
  width: 100%;
  display: flex;
}
.video-author > span {
  margin-right: 5px;
}
.video-author > a {
  display: block;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>