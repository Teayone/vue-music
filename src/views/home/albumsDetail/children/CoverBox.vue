<template>
  <div id="cover-box" v-if="coverData !== null">
    <!-- 左侧封面 -->
    <div class="cover-img">
      <!-- 封面图 -->
      <img :src="coverData.blurPicUrl" alt="" />
      <!-- 背景图 -->
      <span></span>
    </div>

    <!-- 右侧歌曲简介 -->
    <div class="right-info">
      <!-- 标题 -->
      <h1>
        <i></i>
        {{ coverData.name }}
      </h1>
      <!-- 歌手和公司-->
      <div class="sing-box">
        <p>
          歌手：<a href="javascript:;">{{ coverData.artist.name }}</a>
        </p>
        <p>发行时间：{{ coverData.publishTime | forMatDate }}</p>
        <p>发行公司： {{ coverData.company }}</p>
      </div>
      <!-- 播放按钮和看评论 -->
      <div class="tools">
        <a href="javascript:;" class="play" @click="toPlay">
          <i class="iconfont icon-bofangqi-bofangshu"></i> <span>播放</span></a
        >
        <a href="javascript:;" class="pinglun" @click="ToComment">
          <i class="iconfont icon-pinglun"></i>
          <span v-if="total !== null">评论({{ total.total }})</span></a
        >
      </div>
    </div>
    <!-- 专辑介绍 -->
    <div class="album-jie-shao" style="white-space: pre-wrap">
      <h3>专辑介绍：</h3>
      <p ref="duanluo" :class="{ p: isShow }">
        {{ coverData.description }}
      </p>
      <!-- 展开按钮 -->
      <h5 v-if="isZhankai" @click="zhankai">{{ msg }}</h5>
    </div>
  </div>
</template>

<script>
import { toPlay } from "../../../../mixin/mixin";
export default {
  name: "coverBox",
  props: {
    coverData: {
      type: Object,
      default() {
        return null;
      },
    },
    songList: {
      type: Array,
      default() {
        return null;
      },
    },
    // 必传 歌单评论总数
    total: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      // 文本超出显示范围时隐藏
      isShow: false,
      isZhankai: false,
      msg: "展开",
    };
  },
  created() {
    window.setTimeout(() => {
      if (this.$refs.duanluo.offsetHeight >= 360) {
        // 当文本大于360时添加类,并显示展开按钮
        this.isShow = true;
        // 显示展开按钮
        this.isZhankai = true;
      }
    }, 500);
  },
  mixins: [toPlay],
  methods: {
    // 跳转至评论区
    ToComment() {
      this.$bus.$emit("ToComment");
    },
    // 专辑介绍的展开与隐藏
    zhankai() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.msg = "展开";
      } else {
        this.msg = "收起";
      }
    },
  },
};
</script>

<style scoped>
#cover-box {
  /* display: flex; */
  width: 640px;
  margin: auto;
  overflow: hidden;
  padding-bottom: 20px;
}
.cover-img {
  position: relative;
  width: 177px;
  height: 177px;
  float: left;
}
.cover-img > img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9;
}
.cover-img > span {
  position: absolute;
  width: 209px;
  height: 177px;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?664eb83a7bf160a11a0a0bc934705778)
    no-repeat;
  background-position: 0 -986px;
}

.right-info {
  float: left;
  margin-top: 6px;
  margin-left: 50px;
  flex: 1;
}
.right-info > h1 {
  font-size: 20px;
  color: #333;
  margin-top: -3px;
}

.right-info > h1 > i {
  display: inline-block;
  width: 54px;
  height: 24px;
  background: url(https://s2.music.126.net/style/web2/img/icon.png?2e1d7b775ad3094aa74ce13416e474a6)
    no-repeat;
  background-position: 0 -186px;
  vertical-align: -4px;
  margin-right: 10px;
}

.sing-box {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
  line-height: 22px;
}
.sing-box > p:first-child > a {
  color: #0c73c2;
}
.tools {
  display: flex;
  margin-top: 20px;
}
.tools > .play {
  position: relative;
  background: #2273c2;
  color: #fff;
  padding: 15px 40px;
  border-radius: 5px;
  font-size: 12px;
}
.tools > .play:hover {
  background: #3987d0;
}
.tools > .play > i {
  position: absolute;
  font-size: 20px;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.tools > .play > span {
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
}
.tools > .pinglun {
  position: relative;
  margin-left: 15px;
  font-size: 12px;
  line-height: 31px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  color: #333;
  background: #f7f7f7;
}
.tools > .pinglun:hover {
  background: #fafafa;
}

.tools > .pinglun > i {
  font-size: 18px;
  vertical-align: -2px;
}

.album-jie-shao {
  width: 100%;
  float: left;
  margin-top: 20px;
}
.album-jie-shao > h3 {
  font-size: 12px;
  font-weight: bolder;
  color: #333;
}
.album-jie-shao > p {
  padding-left: 20px;
  font-size: 12px;
  line-height: 25px;
  margin-top: 5px;
  color: #666;
}
.album-jie-shao > p.p {
  height: 360px;
  overflow: hidden;
}
.album-jie-shao > h5 {
  float: right;
  font-size: 14px;
  cursor: pointer;
  color: skyblue;
  text-decoration: underline;
  margin-top: 10px;
}
</style>