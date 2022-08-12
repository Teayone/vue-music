<template>
  <!-- 提示框组件 -->
  <div id="tips">
    <!-- 最上方提示搜索相关用户 -->
    <p class="title">
      <a href="#" @click="toSearch">搜“{{ info }}”相关用户&nbsp;&gt;</a>
    </p>
    <!-- 下面的搜索到的盒子 -->
    <div class="huizong">
      <div class="item" v-show="searchList.songs">
        <!-- 左侧单曲 -->
        <h3>
          <em>单曲</em>
        </h3>
        <!-- 右侧列表 -->
        <ul>
          <li
            v-for="(item, index) in searchList.songs ? searchList.songs : []"
            :key="index"
            @click="toSongsDetail(item.id)"
          >
            {{ item.name
            }}{{ item.artists[0].name ? "-" + item.artists[0].name : null }}
          </li>
        </ul>
      </div>
      <div class="item" v-show="searchList.artists">
        <h3>
          <em>歌手</em>
        </h3>
        <ul>
          <li
            v-for="(item, index) in searchList.artists
              ? searchList.artists
              : []"
            :key="index"
            @click="toSingerDetail(item.id)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="item" v-show="searchList.albums">
        <h3>
          <em>专辑</em>
        </h3>
        <ul>
          <li
            v-for="(item, index) in searchList.albums ? searchList.albums : []"
            :key="index"
            @click="toAlbumsDetail(item.id)"
          >
            {{ item.name
            }}{{ item.artist.name ? "-" + item.artist.name : null }}
          </li>
        </ul>
      </div>
      <div class="item" v-show="searchList.playList">
        <h3>
          <em>歌单</em>
        </h3>
        <ul>
          <li
            v-for="(item, index) in searchList.playList
              ? searchList.playList
              : []"
            :key="index"
            @click="toPlayListDetail(item.id)"
          >
            {{ item.name
            }}{{ item.description ? "-" + item.description : null }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tips",
  props: ["searchList", "info", "searchTips"],
  data() {
    return {};
  },
  methods: {
    // 跳转至单独的单曲详情页
    toSongsDetail(id) {
      this.$router.push({
        path: "/song",
        query: {
          id,
        },
      });
    },
    // 跳转至单独的歌手详情页
    toSingerDetail(id) {
      this.$router.push({
        path: "/singer",
        query: {
          id,
        },
      });
    },
    // 跳转至单独的专辑详情页
    toAlbumsDetail(id) {
      this.$router.push({
        path: "/albumsDetail",
        query: {
          id,
        },
      });
    },
    // 跳转至单独的歌单详情页
    toPlayListDetail(id) {
      this.$router.push({
        path: "playlistDetail",
        query: {
          id,
        },
      });
    },
    // 跳转至搜索页面
    toSearch() {
      this.$router.push({
        path: "/search",
        query: {
          s: this.info,
          // 1002代表用户
          type: 1002,
        },
      });
    },
  },
};
</script>

<style scoped>
#tips {
  position: absolute;
  top: 46px;
  left: -3px;
  z-index: 9999;
  width: 400px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.title {
  position: relative;
  height: 17px;
  padding: 11px 10px;
  border-bottom: 1px solid #e2e2e2;
  font-size: 12px;
}
.title > a {
  position: absolute;
  top: 15px;
  left: 10px;
}
.title > a:hover {
  color: #0099ff;
}
.item {
  display: flex;
}
.item > h3 {
  width: 52px;
  padding: 10px 0 0 10px;
  border-right: 1px solid #e2e2e2;
  line-height: 17px;
  font-weight: normal;
  font-size: 12px;
}
.item > ul {
  width: 100%;
  padding-left: 10px;
  padding-bottom: 10px;
}
.item > ul > li {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 17px;
  font-size: 12px;
  padding: 10px 0 0 10px;
  cursor: pointer;
}
.item > ul > li:hover {
  color: #0099ff;
}
.item:nth-child(2n) > ul {
  background-color: #f9f8f8;
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
}
.item:last-child > ul {
  border-bottom: none;
}
</style>
