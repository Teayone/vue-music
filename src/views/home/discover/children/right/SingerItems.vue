<template>
  <div class="singer">
    <!-- 每一个歌手模块 -->
    <div
      class="singer-box"
      v-for="item in hotSinger"
      :key="item.id"
      @click="handleToSinger(item.id)"
    >
      <!-- 左侧头像区域 -->
      <div class="left-img">
        <img :src="item.img1v1Url" alt="" />
      </div>
      <!-- 右侧歌手区域 -->
      <div class="right-singer">
        <h3>{{ item.name }}</h3>
        <p>{{ item.alias[0] ? item.alias[0] : item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingerItems",
  props: {
    hotSinger: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 跳转至歌手主页
    handleToSinger(id) {
      this.$router.push({
        path: "/singer",
        query: { id },
      });
    },
  },
};
</script>

<style scoped>
.singer {
  margin: 20px 20px 60px 20px;
}
.singer-box {
  height: 62px;
  display: flex;
  background: #fafafa;
  border: 1px solid #e9e9e9;
  cursor: pointer;
  margin-bottom: 15px;
}
.singer-box:hover {
  background: #f4f4f4;
}
.singer-box > .left-img {
  width: 62px;
  height: 62px;
}
.singer-box > .left-img > img {
  width: 100%;
  height: 100%;
}
.right-singer {
  width: 133px;
  padding-left: 15px;
  line-height: 30px;
}
.right-singer > h3 {
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: bolder;
}
.right-singer > p {
  font-size: 12px;
  color: #666;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>