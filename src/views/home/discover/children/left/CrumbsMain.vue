<template>
  <div id="crumbs">
    <div class="radio">
      <div class="yuan"></div>
    </div>
    <h2>
      <a
        href="javascript:;"
        :class="{ cur: title === '个性化推荐' }"
        @click="handleToPath(acIndex, pathRouter)"
        >{{ title }}</a
      >
    </h2>
    <!-- tab选项卡 -->
    <div class="tab" v-if="tabs">
      <a
        href="javascript:;"
        v-for="item in tabs"
        :key="item.id"
        @click="handleToPlaylist(item.name)"
        >{{ item.name }}</a
      >
    </div>
    <!-- 少一个更多选项,未来如果不懒的话记得补 -->
  </div>
</template>

<script>
export default {
  name: "CrumbsMain",
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: "热门推荐",
    },
    // 跳转后的 path 地址
    pathRouter: {
      type: String,
    },
    acIndex: {
      type: Number,
    },
  },
  created() {},
  methods: {
    handleToPlaylist(cat) {
      this.$router.push({
        path: "/playlist",
        query: {
          cat,
        },
      });
    },
    // 点击首页大标签跳转对应路由
    handleToPath(index, path) {
      if (this.title === "个性化推荐") {
        return;
      }
      this.$bus.$emit("toList", index, path);
    },
  },
};
</script>

<style scoped>
#crumbs {
  display: flex;
  position: relative;
  height: 33px;
  line-height: 33px;
  border: 2px solid #c10d0c;
  border-top: none;
  border-left: none;
  border-right: none;
  padding: 0 10px 0 34px;
}
.radio {
  position: absolute;
  left: 10px;
  top: 46%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  background: #c10d0c;
  border-radius: 50%;
}
.yuan {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
}
#crumbs > h2 {
  font-size: 20px;
}
#crumbs > h2 > a {
  color: #333;
}
.tab {
  margin-left: 20px;
  font-size: 12px;
}
.tab > a {
  color: #666;
}
.tab > a:hover {
  text-decoration: underline;
}
.tab > a:not(:last-child)::after {
  content: "|";
  margin: 0 10px;
  color: #ccc;
}
.cur {
  cursor: default;
}
</style>