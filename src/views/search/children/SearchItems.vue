<template>
  <div id="search-items">
    <p class="title">
      搜索"{{ $route.query.s }}",找到
      <span class="num">{{
        shuju.result.songCount ||
        shuju.result.artistCount ||
        shuju.result.albumCount ||
        shuju.result.videoCount ||
        shuju.result.playlistCount ||
        shuju.result.djRadiosCount ||
        shuju.result.userprofileCount
      }}</span>
      {{ info }}
    </p>
    <ul class="ul">
      <li
        v-for="item in items"
        :key="item.type"
        :class="{ active: item.type == activeClass }"
        @click="toPath(item.type)"
      >
        {{ item.name }}
      </li>
    </ul>
    <!-- 搜索到的单曲 -->
    <song
      v-if="$route.query.type == 1 || $route.query.type == undefined"
      :songs="shuju.result"
      @CurrentChangeOne="CurrentChangeOne"
    ></song>
    <!-- 搜索到的歌手 -->
    <singer
      v-if="$route.query.type == 100"
      :artist="shuju.result.artists"
    ></singer>
    <!-- 搜索到的专辑 -->
    <album
      :albums="shuju.result"
      @CurrentChangeOne="CurrentChangeOne"
      v-if="$route.query.type == 10"
    ></album>
    <!-- 搜索到的视频 -->
    <video-item
      :videos="shuju.result"
      @CurrentChangeOne="CurrentChangeOne"
      v-if="$route.query.type == 1014"
    ></video-item>
    <!-- 搜索到的歌词 -->
    <lyric
      :songs="shuju.result"
      v-if="$route.query.type == 1006"
      @CurrentChangeOne="CurrentChangeOne"
    ></lyric>
    <!-- 搜索到的歌单 -->
    <play-list
      :playlists="shuju.result"
      v-if="$route.query.type == 1000"
      @CurrentChangeOne="CurrentChangeOne"
    ></play-list>
    <!-- 搜索到的声音主播 -->
    <dj-radio
      :djradios="shuju.result"
      v-if="$route.query.type == 1009"
      @CurrentChangeOne="CurrentChangeOne"
    ></dj-radio>
    <!-- 搜索到的用户 -->
    <user-profiles
      :userprofiles="shuju.result"
      v-if="$route.query.type == 1002"
      @CurrentChangeOne="CurrentChangeOne"
    ></user-profiles>
    <loading v-if="showLoading"></loading>
  </div>
</template>

<script>
import Song from "../common/Song.vue";
import Singer from "../common/Singer.vue";
import Album from "../common/Album.vue";
import VideoItem from "../common/VideoItem.vue";
import Lyric from "../common/Lyric.vue";
import PlayList from "../common/PlayList.vue";
import DjRadio from "../common/DjRadio.vue";
import UserProfiles from "../common/UserProfiles.vue";
import Loading from "../../../components/loading/Loading.vue";
import { searchList } from "../../../api/search";

export default {
  name: "SearchItems",
  components: {
    Song,
    Singer,
    Album,
    VideoItem,
    Lyric,
    PlayList,
    DjRadio,
    UserProfiles,
    Loading,
  },
  data() {
    return {
      items: [
        { name: "单曲", type: 1 },
        { name: "歌手", type: 100 },
        { name: "专辑", type: 10 },
        { name: "视频", type: 1014 },
        { name: "歌词", type: 1006 },
        { name: "歌单", type: 1000 },
        { name: "声音主播", type: 1009 },
        { name: "用户", type: 1002 },
      ],
      info: "",
      shuju: {
        result: {},
      },
      // 加载动画
      showLoading: true,
    };
  },
  created() {
    let k = this.$route.query.s;
    let _this = this;
    let t = this.$route.query.type;
    // 判断有没有 type
    if (t) {
      // 有就用
      this.getSearchData(k, t);
    } else {
      // 没有就用默认
      this.getSearchData(k, 1);
    }

    if (t) {
      let n = Number(t);
      switch (n) {
        case 1:
          _this.info = "首单曲";
          break;
        case 100:
          _this.info = "个歌手";
          break;
        case 10:
          _this.info = "张专辑";
          break;
        case 1014:
          _this.info = "个视频";
          break;
        case 1006:
          _this.info = "个歌词";
          break;
        case 1000:
          _this.info = "个歌单";
          break;
        case 1009:
          _this.info = "个节目";
          break;
        case 1002:
          _this.info = "个用户";
      }
    } else {
      _this.info = "首单曲";
    }
  },
  mounted() {},
  beforeUpdate() {},
  updated() {
    this.showLoading = false;
  },
  methods: {
    toPath(t) {
      this.$router.push({
        path: "/search",
        query: {
          s: this.$route.query.s,
          type: t,
        },
      });
    },
    // 获取搜索数据
    async getSearchData(k, t) {
      let { data: res } = await searchList(k, t);
      this.shuju = res;
    },
    // 翻页
    async CurrentChangeOne(newPage) {
      let k = this.$route.query.s;
      let t = this.$route.query.type;
      let { data: res } = await searchList(k, t, (newPage - 1) * 30);
      this.shuju = res;
    },
  },
  computed: {
    activeClass() {
      let t = this.$route.query.type;
      if (t) {
        return t;
      } else {
        return 1;
      }
    },
  },
};
</script>

<style scoped>
#search-items {
  margin-top: 40px;
}
.title {
  color: #999;
  font-size: 12px;
  margin-bottom: 20px;
}
.title > span {
  color: #c20c0c;
}
.ul {
  display: flex;
  height: 39px;
  border-top: 2px solid #ccc;
  background: #f7f7f7;
  margin-bottom: 30px;
}
.ul > li {
  flex: 1;
  border-bottom: 1px solid #ccc;
  border-top: 2px solid transparent;
  height: 100%;
  margin-top: -2px;
  text-align: center;
  line-height: 39px;
  font-size: 14px;
  cursor: pointer;
}
.ul > li.active {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: none;
  border-top: 2px solid #c20c0c;
}
.ul > li:hover {
  border-top: 2px solid #c20c0c;
}
.ul > li:first-child {
  border-left: 1px solid #ccc;
}
.ul > li:last-child {
  border-right: 1px solid #ccc;
}
</style>