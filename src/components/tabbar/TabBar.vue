<template>
  <div id="tab-bar">
    <div class="wrap">
      <ul class="list">
        <li
          class="items"
          v-for="(item, index) in items"
          :key="index"
          @click="tabItems(index)"
        >
          <a
            href="javascript:;"
            :class="{ active: index === currentIndex }"
            @click="tabItems(index, item.path)"
            >{{ item.title }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  mounted() {
    let self = this;
    // 监视正在激活的路由
    this.$bus.$on("activeChildrenRoute", function (index) {
      self.tabItems(index);
    });
  },
  methods: {
    tabItems(i, path) {
      this.currentIndex = i;
      if (path) {
        this.$router.push(path);
      }
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