<template>
  <div id="similar-box" v-if="simiArtist !== null">
    <div class="similar" v-for="item in simiArtist" :key="item.id">
      <!-- 头像 -->
      <div class="similar-img" @click="handleToSinger(item.id)">
        <img :src="item.picUrl" alt="" :title="item.name" />
      </div>
      <!-- 名字 -->
      <p @click="handleToSinger(item.id)">
        <a href="javascript:;" :title="item.name">{{ item.name }}</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimilarBox",
  props: {
    simiArtist: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  methods: {
    handleToSinger(id) {
      this.$router.push({
        path: "/singer",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped>
#similar-box {
  margin: 20px;
  overflow: hidden;
}

.similar {
  float: left;
  padding-right: 28px;
  width: 50px;
  height: 92px;
}
.similar:nth-child(3n) {
  padding-right: 0;
}

/* 歌手名字 */
.similar > p {
  width: 100%;
  margin-top: 10px;
  font-size: 12px;
}
.similar > p > a {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333;
  text-align: center;
}
.similar > p > a:hover {
  text-decoration: underline;
}
.similar-img {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.similar-img > img {
  width: 100%;
  height: 100%;
}
</style>