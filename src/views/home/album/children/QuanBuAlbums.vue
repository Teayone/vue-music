<template>
  <div id="crumbs">
    <h2>
      <a href="javascript:;">全部新碟</a>
    </h2>
    <!-- tab选项卡 -->
    <div class="tab">
      <a
        href="javascript:;"
        v-for="(item, index) in items"
        :key="index"
        @click="toArea(item.area)"
        >{{ item.name }}</a
      >
    </div>
    <!-- 少一个更多选项,未来如果不懒的话记得补 -->
  </div>
</template>

<script>
export default {
  name: "QuanBuAlbums",
  data() {
    return {
      items: [
        {
          name: "全部",
          area: "ALL",
        },
        {
          name: "华语",
          area: "ZH",
        },
        {
          name: "欧美",
          area: "EA",
        },
        {
          name: "韩国",
          area: "KR",
        },
        {
          name: "日本",
          area: "JP",
        },
      ],
    };
  },
  methods: {
    toArea(area) {
      this.$emit("Area", area);
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
  padding: 0 10px 5px 0;
  margin-bottom: 30px;
}
#crumbs > h2 {
  font-size: 24px;
}
#crumbs > h2 > a {
  color: #333;
  cursor: default;
}
.tab {
  margin-left: 20px;
  font-size: 12px;
  margin-top: 6px;
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