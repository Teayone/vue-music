<template>
  <div id="cover-box" v-if="coverData">
    <!-- 左侧封面 -->
    <div class="cover-img">
      <!-- 封面图 -->
      <img :src="coverData.coverImgUrl" alt="" />
      <!-- 背景图 -->
      <span></span>
    </div>

    <!-- 右侧歌曲简介 -->
    <div class="right-info">
      <!-- 标题 -->
      <h1>
        <i></i>
        {{ coverData.name ? coverData.name : "" }}
      </h1>
      <!-- 上传歌单的作者 -->
      <div class="author">
        <!-- 左侧头像 -->
        <div class="author-img">
          <img :src="coverData.creator.avatarUrl" alt="" />
        </div>
        <!-- 昵称和创建日期 -->
        <p>
          <a
            href="javascript:;"
            @click="toUserHome(coverData.creator.userId)"
            >{{ coverData.creator.nickname }}</a
          >
          <span>{{ coverData.createTime | forMatDate }}创建</span>
        </p>
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
        <a
          href="javascript:;"
          class="shoucang"
          :class="{ subscribed: coverData.subscribed }"
          @click="shoucangGeDan(coverData.id)"
        >
          <i class="iconfont icon-shoucang"></i>
          收藏({{ coverData.subscribedCount | formatPlayCount }})</a
        >
      </div>
      <!-- 标签和介绍 -->
      <div class="label">
        <h3>
          <span v-if="coverData.tags.length !== 0">标签：</span>
          <a
            href="javascript:;"
            v-for="(item, index) in coverData.tags"
            :key="index"
            @click="toPlayList(item)"
            >{{ item }}</a
          >
        </h3>
        <p style="white-space: pre-wrap; width: 410px">
          <span class="jieshao" v-if="coverData.description">介绍：</span
          >{{ coverData.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { toPlay } from "../../../../mixin/mixin";
export default {
  name: "coverBox",
  props: {
    // 封面和歌单信息简介数据
    coverData: {
      type: Object,
      default() {
        return {
          name: "",
        };
      },
    },
    // 必传，播放全部歌曲必备
    songList: {
      type: Array,
      default() {
        return [];
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
  mixins: [toPlay],
  methods: {
    // 跳转至评论区
    ToComment() {
      this.$bus.$emit("ToComment");
    },
    // 跳转至歌单页
    toPlayList(cat) {
      this.$router.push({
        path: "/playlist",
        query: {
          cat,
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
    // 收藏歌单
    shoucangGeDan(id) {},
  },
};
</script>

<style scoped>
#cover-box {
  display: flex;
  width: 640px;
  margin: auto;
}
.cover-img {
  position: relative;
  width: 200px;
  height: 200px;
}
.cover-img > img {
  position: absolute;
  width: 200px;
  height: 200px;
  z-index: 9;
}
.cover-img > span {
  position: absolute;
  width: 208px;
  height: 208px;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?664eb83a7bf160a11a0a0bc934705778)
    no-repeat;
  background-position: 0 -1285px;
  top: -4px;
  left: -4px;
}

.right-info {
  flex: 1;
  margin-left: 30px;
}
.right-info > h1 {
  font-size: 20px;
  color: #333;
  margin-top: -3px;
  display: flex;
}

.right-info > h1 > i {
  display: block;
  width: 54px;
  height: 24px;
  background: url(https://s2.music.126.net/style/web2/img/icon.png?2e1d7b775ad3094aa74ce13416e474a6)
    no-repeat;
  background-position: 0 -243px;
  margin-right: 6px;
  margin-top: -3px;
}

.author {
  margin-top: 13px;
  display: flex;
}
.author > .author-img {
  width: 35px;
  height: 35px;
  margin-right: 10px;
}
.author > .author-img > img {
  width: 100%;
  height: 100%;
}
.author > p {
  font-size: 12px;
  line-height: 40px;
}
.author > p > a {
  color: #0c73c2;
}
.author > p > a:hover {
  text-decoration: underline;
}
.author > p > span {
  margin-left: 30px;
  color: #999;
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
.tools > .shoucang {
  position: relative;
  margin-left: 15px;
  font-size: 12px;
  line-height: 31px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  color: #333;
  background: #f7f7f7;
  transition: all 0.3s;
}
.tools > .shoucang:hover {
  background: #fff;
}
/* 已收藏的样式*/
.tools > .shoucang.subscribed {
  background: #f4f4f4;
  color: #bebebe;
  cursor: default;
}
.label {
  margin-top: 30px;
  font-size: 12px;
  line-height: 16px;
  color: #666;
}
.label > h3 > a {
  display: inline-block;
  padding: 1px 10px;
  background: #f2f2f2;
  border-radius: 10px;
  border: 1px solid #ccc;
  color: #777777;
  margin-right: 5px;
}
.label > h3 > a:hover {
  background: #fefefe;
}
.label > p {
  margin-top: 10px;
}
.jieshao {
  margin-left: -1px;
}
</style>