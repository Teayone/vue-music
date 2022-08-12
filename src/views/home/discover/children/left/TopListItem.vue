<template>
  <div id="top-list">
    <div class="top-box" v-for="item in songs" :key="item.playlist.id">
      <!-- 头部排行榜图片 -->
      <div class="top-list-box">
        <!-- 左侧图片 -->
        <div
          class="top-list-left-img"
          @click="handleToPlayListDetail(item.playlist.id)"
        >
          <img :src="item.playlist.coverImgUrl" alt="" />
          <!-- bg -->
          <span></span>
        </div>
        <!-- 右侧榜名和按钮 -->
        <div class="top-list-right-contol">
          <h3 @click="handleToPlayListDetail(item.playlist.id)">
            <a href="javascript:;">{{ item.playlist.name }}</a>
          </h3>
          <a
            href="javascript:;"
            title="播放"
            class="iconfont icon-yunhang Abtn bofang"
            @click="handleToBoFang(item.playlist.id)"
          ></a>
          <a
            href="javascript:;"
            title="收藏"
            class="iconfont icon-shoucang Abtn shoucang"
          ></a>
        </div>
      </div>

      <!-- 排行榜 -->
      <ul>
        <li v-for="(items, index) of 10" :key="index">
          <span :class="{ active: index <= 2 }">{{ index + 1 }}</span
          ><a
            href="javascript:;"
            class="song"
            @click="handleToSongsDetail(item.playlist.tracks[index].id)"
            >{{ item.playlist.tracks[index].name
            }}<a
              href="javascript:;"
              class="iconfont icon-yunhang dis"
              @click.stop="bofang(item.privileges[index].id)"
            ></a
          ></a>
        </li>
        <li>
          <a
            href="javascript:;"
            class="quanbu"
            @click="handleToPlayListDetail(item.playlist.id)"
          >
            查看全部>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mixin, songPlay } from "../../../../../mixin/mixin";
// 通过排行榜id获取对应排行榜歌曲
export default {
  name: "TopListItem",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  created() {},

  mixins: [mixin, songPlay],
  methods: {
    handleToPlayListDetail(id) {
      this.$router.push({
        path: "/toplist",
        query: {
          id,
        },
      });
    },
    handleToSongsDetail(id) {
      this.$router.push({
        path: "/song",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped>
#top-list {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  background: #f5f5f5;
  border: 1px solid #ccc;
  margin-top: 20px;
}
.top-box {
  box-sizing: border-box;
  padding-top: 20px;
  width: 229px;
  border-right: 1px solid #ccc;
}
.top-box:last-child {
  border-right: none;
}
.top-list-box {
  box-sizing: border-box;
  display: flex;
  margin-bottom: 20px;
  padding: 0 20px;
}
.top-list-left-img {
  position: relative;
  width: 80px;
  height: 80px;
  margin-right: 10px;
  cursor: pointer;
}
.top-list-left-img > img {
  position: relative;
  width: 100%;
  height: 100%;
}
.top-list-left-img > span {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?18ba099d8d27a00c16809c928747ea0f)
    no-repeat;
  background-position: -145px -57px;
}
.top-list-right-contol > h3 {
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.top-list-right-contol > h3 > a {
  color: #333;
  font-weight: bolder;
}
.Abtn {
  float: left;
  width: 22px;
  height: 22px;
  margin-right: 10px;
  color: #ccc;
}
.Abtn:hover {
  color: #8e8e8e;
}
.bofang {
  font-size: 30px;
  margin-top: -1px;
  margin-left: -5px;
}
.shoucang {
  font-size: 25px;
}
ul > li {
  position: relative;
  display: flex;
  box-sizing: border-box;
  height: 32px;
  padding: 0 20px;
}
ul > li:nth-child(odd) {
  background-color: #e8e8e8;
}
ul > li > span {
  display: inline-block;
  width: 35px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  color: #666;
}
ul > li > span.active {
  color: #c10d0c;
}
ul > li > .song {
  display: inline-block;
  width: 170px;
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  color: #000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
ul > li > .song > .dis {
  float: right;
  font-size: 20px;
  display: none;
}
ul > li > .song > .dis:hover {
  color: #333;
}
ul > li a:hover {
  text-decoration: underline;
}
ul > li:hover > .song > .dis {
  display: block;
  text-decoration: none;
}
ul > li > .quanbu {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #000;
  z-index: 999;
}
</style>