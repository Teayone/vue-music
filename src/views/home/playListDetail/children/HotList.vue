<template>
  <div id="hot-list">
    <!-- 歌单页面中推荐的热门歌单 -->
    <div class="hot" v-for="(item, index) in relatedList" :key="index">
      <!-- 头像 -->
      <div class="user-img" @click="handleToPlayList(item.id)">
        <img :src="item.coverImgUrl" alt="" :title="item.name" />
      </div>
      <!-- 歌单名称和歌单作者 -->
      <div class="list-box">
        <div class="list-name" @click="handleToPlayList(item.id)">
          <p :title="item.name">{{ item.name }}</p>
        </div>
        <div class="list-author">
          <span>by</span>&nbsp;
          <a
            href="javascript:;"
            :title="item.creator.nickname"
            @click="handleToUserDetail(item.creator.userId)"
            >{{ item.creator.nickname }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotList",
  props: ["relatedList"],
  methods: {
    handleToPlayList(id) {
      this.$router.push({
        path: "/playlistDetail",
        query: {
          id,
        },
      });
    },
    handleToUserDetail(id) {
      // 跳转至用户页
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
#hot-list {
  margin: 20px 20px;
}
.hot {
  margin-bottom: 15px;
  display: flex;
}
.user-img {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.user-img > img {
  width: 100%;
  height: 100%;
}
.list-box {
  flex: 1;
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  margin-top: 5px;
}
.list-name > p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.list-author {
  margin-top: 12px;
  font-size: 12px;
}
.list-author > span {
  color: #a69999;
}
.list-author > a {
  color: #666666;
}
.list-author > a:hover {
  text-decoration: underline;
}
</style>