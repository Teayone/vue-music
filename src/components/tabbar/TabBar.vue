<template>
  <div id="tab-bar">
    <div class="wrap">
      <ul class="list">
        <li
          class="items"
          v-for="(item, index) in isShow ? list : []"
          :key="index"
        >
          <router-link :to="item.path" active-class="active">
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  props: {
    activeIndex: {
      type: [Number, String],
      default: 0,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      list: [
        { title: "推荐", path: "/home" },
        { title: "排行榜", path: "/toplist" },
        { title: "歌单", path: "/playlist" },
        { title: "主播电台", path: "/djradio" },
        { title: "歌手", path: "/artist" },
        { title: "新碟上架", path: "/album" },
      ],
    };
  },
  methods: {
    tabItems(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
#tab-bar {
  box-sizing: border-box;
  padding: 2.5px 0;
  background-color: #c20c0c;
}
.list {
  box-sizing: border-box;
  overflow: hidden;
  padding-left: 180px;
}
.items {
  float: left;
  height: 34px;
  font-size: 12px;
}
.items > a {
  display: inline-block;
  margin: 6px 17px 0;
  color: #333;
  padding: 4px 13px;
  border-radius: 20px;
  color: #fff;
}
.items > a:hover {
  background-color: #9b0909;
}
.active {
  background-color: #9b0909;
}
</style>
