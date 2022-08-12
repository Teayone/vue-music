<template>
  <div id="singer" v-if="artist !== null">
    <div class="box" v-for="item in artist" :key="item.id">
      <div class="img">
        <img v-lazy="item.img1v1Url" :key="item.img1v1Url" alt="" />
        <!-- bg -->
        <span :title="item.name" @click="toSingerDetail(item.id)"></span>
      </div>
      <p>
        <a href="javascript:;" @click="toSingerDetail(item.id)">{{
          item.name
        }}</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Singer",
  props: {
    artist: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  methods: {
    toSingerDetail(id) {
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
#singer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.box {
  margin-bottom: 40px;
  width: 130px;
}
.img {
  position: relative;
  width: 130px;
  height: 130px;
  margin-bottom: 10px;
}
.img > img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.img > span {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?af2f3b7d433d2c1545043aae398e9d65)
    no-repeat;
  background-position: 0 -680px;
  cursor: pointer;
}
.box > p {
  width: 100%;
}
.box > p > a {
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333;
  font-size: 14px;
}
.box > p > a:hover {
  text-decoration: underline;
}
</style>