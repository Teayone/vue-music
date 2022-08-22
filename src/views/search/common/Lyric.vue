<template>
  <div id="lyric" v-if="songs !== null">
    <div class="box" v-for="(item, idx) in songs.songs" :key="item.id">
      <!-- 歌曲信息 -->
      <div class="song-detail">
        <!-- 播放按钮 -->
        <div class="play">
          <i
            class="iconfont icon-bofangqi-bofangshu"
            @click="bofang(item.id)"
            :class="{ active: item.id === activeSong }"
          ></i>
        </div>
        <!-- 歌名 -->
        <div class="song">
          <a href="javascript:;" @click="toSongDetail(item.id)">{{
            item.name
          }}</a>
        </div>
        <!-- 歌手 -->
        <div class="singer">
          <a
            href="javascript:;"
            v-for="(sings, index) in item.artists"
            :key="sings.id"
            @click="toSingerDetail(sings.id)"
          >
            {{ sings.name }}
            <span>{{ index === item.artists.length - 1 ? "" : "/" }}</span>
          </a>
        </div>
        <!-- 专辑 -->
        <div class="album">
          <a href="javascript:;" @click="toAlbumDetail(item.album.id)">{{
            item.album.name
          }}</a>
        </div>
        <!-- 歌曲时间 -->
        <div class="time">
          <span>{{ (item.duration / 1000) | formatTimer }}</span>
        </div>
      </div>
      <!-- 歌词 -->
      <div class="lyric-detail active" id="geci">
        <p v-for="(lys, i) in txt[idx]" :key="i">{{ lys }}</p>
      </div>
      <!-- 展开按钮 -->
      <p class="zhankai">
        <a href="javascript:;" id="zhankai">展开</a>
      </p>
    </div>
    <div class="juzhong">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="songs.songCount"
        :page-size="30"
        @current-change="handleCurrentChange"
        v-if="songs.songCount >= 30"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { songPlay, up } from "../../../mixin/mixin";
export default {
  name: "Lyric",
  props: {
    songs: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      // 歌词数组
      txt: [],
      scrollTop: 0,
    };
  },
  created() {
    let _this = this;
    setTimeout(() => {
      _this.songs.songs.forEach((item) => {
        _this.txt.push(item.lyrics.txt.split("\n"));
      });
    }, 500);
  },
  // 初始化时给展开按钮添加点击事件
  mounted() {
    this.toClick();
  },
  mixins: [songPlay, up],
  methods: {
    handleCurrentChange(newPage) {
      let _this = this;
      _this.txt = [];
      this.$emit("CurrentChangeOne", newPage);
      setTimeout(() => {
        _this.songs.songs.forEach((item) => {
          _this.txt.push(item.lyrics.txt.split("\n"));
        });
      }, 500);
      this.toClick();
    },
    toClick() {
      const _this = this;
      setTimeout(() => {
        // 控制歌词的展开与隐藏(原生JS写的)
        let geci = document.querySelectorAll("#geci"),
          zhankai = document.querySelectorAll("#zhankai");
        let flag = true;
        zhankai.forEach((item, index) => {
          item.onclick = function () {
            if (flag === true) {
              this.innerHTML = "收起";
              _this.scrollTop = window.scrollY;
              geci[index].classList.remove("active");
              flag = false;
            } else {
              this.innerHTML = "展开";
              window.scrollTo(0, _this.scrollTop);
              geci[index].classList.add("active");
              flag = true;
            }
          };
        });
      }, 500);
    },
    toSongDetail(id) {
      this.$router.push({
        path: "/song",
        query: {
          id,
        },
      });
    },
    toSingerDetail(id) {
      this.$router.push({
        path: "/singer",
        query: {
          id,
        },
      });
    },
    toAlbumDetail(id) {
      this.$router.push({
        path: "/albumsDetail",
        query: {
          id,
        },
      });
    },
  },
  computed: {
    activeSong() {
      return this.song === null ? 0 : this.song[this.$store.state.index].id;
    },
  },
};
</script>

<style scoped>
.box {
  margin-bottom: 20px;
}
.song-detail {
  padding: 10px 10px 8px 18px;
  display: flex;
  border: 1px solid transparent;
  font-size: 12px;
}
.song-detail a {
  color: #333;
}
.song-detail a:hover {
  text-decoration: underline;
}
.song-detail:hover {
  background: #f2f2f2;
  border-color: #ccc;
}
.box:nth-child(even) .song-detail {
  background: #f7f7f7;
}
.play {
  margin-right: 5px;
}
.play > i {
  display: inline-block;
  margin-top: -7px;
  font-size: 25px;
  color: #999;
  cursor: pointer;
}
.play > i.active {
  color: red;
}
.song {
  flex: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.singer {
  flex: 1.5;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.album {
  flex: 1.5;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.album > a {
  color: #888;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.time {
  flex: 0.7;
  text-align: center;
}

.lyric-detail {
  padding: 10px 0px 18px 52px;
  color: #666;
  line-height: 23px;
  word-wrap: break-word;
  word-break: break-all;
  /* box-sizing: border-box; */
}
.lyric-detail.active {
  height: 92px;
  overflow: hidden;
  margin-bottom: 6px;
}
.lyric-detail > p {
  font-size: 12px;
}
.zhankai {
  padding-left: 52px;
  font-size: 14px;
}
.zhankai > a {
  color: skyblue;
}
.juzhong {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
</style>
