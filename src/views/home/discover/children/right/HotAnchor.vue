<template>
  <div id="anchor">
    <!-- 热门主播 item 模块 -->
    <div
      class="anchor-box"
      v-for="item in hotDj"
      :key="item.id"
      @click="handleToDjDetail(item.id)"
    >
      <!-- 左侧头像模块 -->
      <div class="left-img">
        <img :src="item.avatarUrl" alt="" />
      </div>
      <!-- 右侧主播信息 -->
      <div class="right-anchor">
        <h4>
          <a href="javascript:;">{{ item.nickName }}</a>
        </h4>
        <!-- <p>{{ item.nickName }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotAnchor",
  props: {
    hotDj: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    handleToDjDetail(id) {
      this.$router.push({
        path: "/user/home",
        query: { id },
      });
    },
  },
};
</script>

<style scoped>
#anchor {
  margin: 20px 20px 0 20px;
}
.anchor-box {
  display: flex;
  width: 210px;
  height: 50px;
  font-size: 12px;
  line-height: 20px;
  cursor: pointer;
}
.anchor-box > .left-img {
  width: 40px;
  height: 40px;
}
.anchor-box > .left-img > img {
  width: 100%;
  height: 100%;
}
.anchor-box > .right-anchor {
  width: 160px;
  padding-left: 10px;
}
.anchor-box > .right-anchor > h4 > a {
  color: #333;
}
.anchor-box > .right-anchor > h4 > a:hover {
  text-decoration: underline;
}
.anchor-box > .right-anchor > p {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>