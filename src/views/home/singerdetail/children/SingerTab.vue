<template>
  <div id="singer-tab">
    <a
      @click="tabsClick(item.path)"
      href="javascript:;"
      v-for="(item, index) in tabs"
      :key="index"
      :class="{ active: item.path === activeClass }"
      >{{ item.name }}</a
    >
  </div>
</template>

<script>
export default {
  name: "SingerTab",
  props: {
    tabs: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      curIndex: 0,
    };
  },
  methods: {
    tabsClick(i) {
      this.$router.push({
        path: i,
        query: {
          id: this.$route.query.id,
        },
      });
    },
  },
  computed: {
    activeClass() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
#singer-tab {
  display: flex;
  width: 100%;
  height: 39px;
  border-top: 1px solid #ccc;
  line-height: 38px;
  background: #f7f7f7;
  margin-bottom: 15px;
}
#singer-tab > a {
  text-align: center;
  font-size: 14px;
  color: #333;
  flex: 1;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid transparent;
}
#singer-tab > a:first-child {
  border-left: 1px solid #ccc;
}
#singer-tab > a:last-child {
  border-right: 1px solid #ccc;
}
#singer-tab > a:hover {
  border-top: 2px solid red;
  margin-top: -1px;
}
#singer-tab > a.active {
  border-top: 2px solid red;
  margin-top: -1px;
  background: #fafafa;
  border-bottom: none;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
</style>