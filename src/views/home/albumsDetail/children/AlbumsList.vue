<template>
  <div id="albums-list" v-if="hotAlbums !== null">
    <div class="alist" v-for="item in hotAlbums" :key="item.id">
      <!-- 头像 -->
      <div class="aimg" @click="toAlbumsDetail(item.id)">
        <img :src="item.blurPicUrl" alt="" :title="item.name" />
      </div>
      <!-- 专辑名字和日期 -->
      <div class="aname">
        <p class="name" @click="toAlbumsDetail(item.id)">
          <a href="javascript:;" :title="item.name">{{ item.name }}</a>
        </p>
        <p class="date">{{ item.publishTime | forMatDate }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumsList",
  props: {
    hotAlbums: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  methods: {
    toAlbumsDetail(id) {
      this.$router.push({
        path: "/albumsDetail",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped>
#albums-list {
  margin: 0 20px;
}
.alist {
  margin: 15px 0;
  display: flex;
}
.aimg {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.aimg > img {
  width: 100%;
  height: 100%;
}
.aname {
  flex: 1;
  font-size: 14px;
  line-height: 26px;
  margin-left: 10px;
}
.aname > .name > a {
  display: block;
  width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
}
.aname > .name:hover {
  text-decoration: underline;
}
.aname > .date {
  font-size: 12px;
  color: #999;
}
</style>