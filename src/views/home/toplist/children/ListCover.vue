<template>
  <div id="list-cover" v-if="playlist !== null">
    <div class="cover-img-box">
      <img :src="playlist.coverImgUrl" alt="" />
      <!-- bg -->
      <span></span>
    </div>
    <!-- 歌单名字 -->
    <div class="cover-info">
      <h2>{{ playlist.name }}</h2>
      <p>最近更新：{{ playlist.updateTime | forMatdate }}</p>
      <h5>{{ playlist.description }}</h5>
      <div class="play-comment">
        <a href="javascript:;" @click="handleToBoFang(playlist.id)" class="play"
          >播放</a
        >
        <a
          href="javascript:;"
          v-if="total !== null"
          class="comment"
          @click="ToComment"
          >评论({{ total.total }})</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from "../../../../mixin/mixin";
export default {
  name: "ListCover",
  props: {
    playlist: {
      type: Object,
      default() {
        return null;
      },
    },
    total: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  filters: {
    forMatdate(value) {
      let date = new Date(value);
      let m = date.getMonth() + 1;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return m + "月" + d + "日";
    },
  },
  mixins: [mixin],
  methods: {
    ToComment() {
      this.$bus.$emit("ToComment");
    },
  },
};
</script>

<style scoped>
#list-cover {
  display: flex;
  margin-bottom: 50px;
}
.cover-img-box {
  position: relative;
  width: 150px;
  height: 150px;
  padding: 3px;
  border: 1px solid #ccc;
}
.cover-img-box > img {
  position: absolute;
  width: 150px;
  height: 150px;
}
.cover-img-box > span {
  position: absolute;
  width: 150px;
  height: 150px;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?af2f3b7d433d2c1545043aae398e9d65)
    no-repeat;
  background-position: -230px -380px;
  top: 3px;
  left: 3px;
}
.cover-info {
  flex: 1;
  margin-left: 20px;
}
.cover-info > h2 {
  margin: 16px 0 4px;
  font-size: 20px;
  line-height: 24px;
}
.cover-info > p {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}
.cover-info > h5 {
  font-size: 12px;
  line-height: 16px;
  margin-top: 10px;
  color: skyblue;
  font-weight: bold;
}
.play-comment {
  margin-top: 20px;
}
.play-comment > a {
  display: inline-block;
  font-size: 12px;
  border: 1px solid #ccc;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 5px;
}
.play {
  background: #2778c2;
  color: #fff;
  border: 1px solid #2778c2;
}
.play:hover {
  background: #3786d0;
}
.comment {
  background: #f7f7f7;
  color: #333;
}
.comment:hover {
  background: #fafafa;
}
</style>