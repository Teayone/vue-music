<template>
  <div id="video" v-if="videos !== null">
    <div class="box" v-for="item in videos.videos" :key="item.vid">
      <div
        class="img"
        :title="item.title"
        @click="toVideo(item.vid, item.type)"
      >
        <!-- 播放次数 -->
        <div class="vNum">
          <i class="iconfont icon-shipin"></i>
          <span>{{ item.playTime | formatPlayCount }}</span>
        </div>
        <img :src="item.coverUrl" alt="" />
        <!-- 视频时长 -->
        <em>{{ (item.durationms / 1000) | formatTimer }}</em>
      </div>
      <!-- 视频标题 -->
      <div class="info" @click="toVideo(item.vid, item.type)">
        <h5 :title="item.title">
          <i v-show="item.type === 0"></i>{{ item.title }}
        </h5>
        <!-- 视频作者 -->
        <p
          :title="item.creator[0].userName"
          @click="toUserHome(item.creator[0].userId)"
        >
          {{ item.creator[0].userName }}
        </p>
      </div>
    </div>

    <div class="juzhong" v-if="videos.videoCount >= 30">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="videos.videoCount"
        :page-size="30"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Video",
  props: {
    videos: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  methods: {
    handleCurrentChange(newPage) {
      this.$emit("CurrentChangeOne", newPage);
    },
    toVideo(id, type) {
      if (type === 0) {
        this.$router.push({
          path: "/mv",
          query: {
            mvid: id,
          },
        });
      } else {
        this.$router.push({
          path: "/video",
          query: {
            id,
          },
        });
      }
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
#video {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.box {
  width: 159px;
  margin-bottom: 30px;
}
.img {
  position: relative;
  width: 159px;
  height: 90px;
  cursor: pointer;
}
.img > img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.img > .vNum {
  position: absolute;
  top: 0;
  right: 3px;
  z-index: 9;
  color: #fff;
}
.img > .vNum > i {
  display: inline-block;
  vertical-align: -1px;
}
.img > .vNum > span {
  display: inline-block;
  font-size: 12px;
  /* margin-left: -3px; */
}
.img > em {
  position: absolute;
  left: 5px;
  bottom: 5px;
  font-size: 12px;
  color: #fff;
}
.info {
  margin-top: 10px;
}
.info > h5 {
  font-size: 14px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333;
}
.info > h5:hover {
  text-decoration: underline;
}
.info > h5 > i {
  display: inline-block;
  width: 26px;
  height: 16px;
  background: url(https://s2.music.126.net/style/web2/img/icon2.png?1dc595844449748be0ff0974f1a7dd52)
    no-repeat;
  background-position: -270px -480px;
  position: relative;
  vertical-align: -3px;
  margin-right: 5px;
}
.info > p {
  margin-top: 6px;
  font-size: 12px;
  color: #777;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.info > p:hover {
  text-decoration: underline;
}
.juzhong {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
</style>