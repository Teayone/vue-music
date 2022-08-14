<template>
  <div id="song-box" v-if="songs !== null">
    <!-- 歌取封面 -->
    <div class="song-cover">
      <img :src="songs[0].al.picUrl" alt="" />
      <!-- 背景 -->
      <span class="song-bg"></span>
    </div>
    <!-- 右侧 -->
    <div class="song-right">
      <h3 class="song-name"><i></i> {{ songs[0].name }}</h3>
      <p class="singer">
        歌手:
        <a href="javascript:;" @click="toSingerDetail(songs[0].ar[0].id)">{{
          songs[0].ar[0].name
        }}</a>
      </p>
      <p class="album">
        所属专辑:
        <a href="javascript:;" @click="toAlbumsDetail(songs[0].al.id)">{{
          songs[0].al.name
        }}</a>
      </p>
      <span class="play" @click="bofang(songs[0].id)"> <i></i> 播放</span>
      <span class="comment" v-if="total !== null" @click="ToComment">
        <i></i> 评论({{ total.total }})</span
      >

      <!--歌词区域 -->
      <div class="geci" ref="geci" :class="{ active: show }">
        <p v-for="(lyric, idx) in str" :key="idx">
          {{ lyric }}
        </p>
      </div>
      <a class="zhankai" href="javascript:;" v-if="flag" @click="isShow">{{
        msg
      }}</a>
    </div>
  </div>
</template>

<script>
import { songPlay } from "../../../../mixin/mixin";
export default {
  name: "songBox",
  props: {
    songs: {
      type: Array,
      default() {
        return null;
      },
    },
    str: {
      type: Array,
    },
    total: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      msg: "展开",
      show: false,
      flag: false,
    };
  },
  mixins: [songPlay],
  methods: {
    isShow(e) {
      this.show = !this.show;
      if (this.show) {
        this.msg = "展开";
        document.documentElement.scrollTop = 0;
      } else {
        this.msg = "收起";
      }
    },
    ToComment() {
      this.$bus.$emit("ToComment");
    },
    // 跳转至歌手页
    toSingerDetail(id) {
      this.$router.push({
        path: "/singer",
        query: {
          id,
        },
      });
    },
    // 跳转至专辑页
    toAlbumsDetail(id) {
      this.$router.push({
        path: "/albumsDetail",
        query: {
          id,
        },
      });
    },
  },
  watch: {
    str(newVal) {
      if (newVal.length > 15) {
        this.show = true;
        this.flag = true;
      }
    },
  },
};
</script>

<style scoped>
#song-box {
  display: flex;
  margin-bottom: 80px;
}
.song-cover {
  position: relative;
  width: 198px;
  height: 198px;
  border-radius: 50%;
  overflow: hidden;
}
.song-cover > img {
  position: absolute;
  width: 134px;
  height: 134px;
  border-radius: 50%;
  margin: 33px;
}
.song-bg {
  position: absolute;
  width: 206px;
  height: 205px;
  top: -4px;
  left: -4px;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?af2f3b7d433d2c1545043aae398e9d65);
  background-repeat: no-repeat;
  background-position: -140px -580px;
}
.song-right {
  margin-left: 30px;
  flex: 1;
}
.song-name {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}
.song-name > i {
  display: inline-block;
  width: 54px;
  height: 24px;
  background: url(https://s2.music.126.net/style/web2/img/icon.png?08b1788c048f206f0aa95c7c98a690f6);
  background-repeat: no-repeat;
  background-position: 0 -463px;
  vertical-align: -3px;
}
.song-right > p {
  font-size: 12px;
  color: #999;
  line-height: 24px;
}
.song-right > p > a {
  color: #0c73c2;
}
.song-right > p > a:hover {
  text-decoration: underline;
}
.song-right > span {
  display: inline-block;
  cursor: pointer;
  font-size: 12px;
  padding: 8px 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: #2778c6;
  margin-right: 10px;
  margin-top: 15px;
  color: #fff;
}
.song-right > .play:hover {
  background: #3c89d2;
}
.song-right > .comment {
  background: #f7f7f7;
  color: #333;
}
.song-right > .comment:hover {
  background: #fbfbfb;
}
.geci {
  margin-top: 40px;
}
.geci.active {
  height: 299px;
  overflow: hidden;
}
.geci > p {
  font-size: 12px;
  line-height: 24px;
  text-align: left;
}

.zhankai {
  display: inline-block;
  margin-top: 10px;
  color: skyblue;
  font-size: 12px;
}
</style>
