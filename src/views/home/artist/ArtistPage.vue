<template>
  <div class="artist-page">
    <tab-bar></tab-bar>
    <div class="main wrap3">
      <div class="left">
        <list-text></list-text>
      </div>
      <div class="right">
        <!-- 右侧路由组件 -->
        <keep-alive include="DefaultSinger">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import TabBar from "../../../components/tabbar/TabBar.vue";
import ListText from "./children/ListText.vue";
export default {
  name: "ArtistPage",
  components: { TabBar, ListText },
};
</script>

<style scoped>
.main {
  background: #fff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;

  display: flex;
}
.left {
  width: 180px;
  background: #f9f9f9;
  border-right: 1px solid #ccc;
  padding-top: 40px;
  border-bottom: 1px solid #ccc;
}
.right {
  width: 800px;
}
</style>
