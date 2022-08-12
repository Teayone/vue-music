<template>
  <div id="list" v-if="topList !== null">
    <div
      class="box"
      v-for="item in topList"
      :key="item.id"
      :class="{
        active: item.id == activeClass,
      }"
      @click="itemClick(item.id)"
    >
      <div class="box-img">
        <img :src="item.coverImgUrl" alt="" />
      </div>
      <div class="info">
        <h5>{{ item.name }}</h5>
        <p>{{ item.updateFrequency }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    topList: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    itemClick(id) {
      this.$router.push({
        path: "/toplist",
        query: {
          id,
        },
      });
    },
  },
  computed: {
    activeClass() {
      let i = this.$route.query.id;
      if (i) {
        return i;
      } else {
        return 19723756;
      }
    },
  },
};
</script>

<style scoped>
.box {
  display: flex;
  padding: 10px 0 10px 20px;
  cursor: pointer;
}
.box.active {
  background: #e6e6e6;
}
.box:hover {
  background: #f4f2f2;
}
.box.active:hover {
  background: #e6e6e6;
}
.box-img {
  width: 40px;
  height: 40px;
}
.box-img > img {
  width: 100%;
  height: 100%;
}
.info {
  flex: 1;
  margin-left: 10px;
  font-size: 12px;
}
.info > h5 {
  margin-top: 2px;
  margin-bottom: 10px;
  width: 150px;
}
.info > p {
  color: #999;
}
</style>