<template>
  <div id="home">
    <tab-bar :items="items"></tab-bar>

    <discover></discover>
  </div>
</template>

<script>
import TabBar from "../../components/tabbar/TabBar.vue";
import Discover from "./discover/Discover.vue";
import {
  getUserAdminDetail,
  getUserDetail,
  getUserLevel,
} from "../../api/user";
import { getLoginPlayList } from "../../api/api";

export default {
  components: { TabBar, Discover },
  name: "Home",
  data() {
    return {
      items: [
        { title: "推荐", path: "/home" },
        { title: "排行榜", path: "toplist" },
        { title: "歌单", path: "playlist" },
        { title: "主播电台", path: "djradio" },
        { title: "歌手", path: "artist" },
        { title: "新碟上架", path: "album" },
      ],
    };
  },
  created() {
    let cookies = localStorage.getItem("userInfo");
    if (cookies) {
      // 如果 cookies 有值，代表已经登陆过了，获取账号信息
      // 这样做是为了如果用户更新了某些内容(头像),能及时刷新到
      this.getUserData();
    }
  },
  mounted() {
    let self = this;
    // 路由激活控制 navbar 的动态类名
    this.$bus.$emit("activeRoute", {
      index: 0,
      path: "/",
    });
    this.$bus.$on("login", function () {
      self.getUserData();
    });
    document.title = "网易云音乐";
  },
  methods: {
    async getUserData() {
      // 账号信息
      let { data: uad } = await getUserAdminDetail();
      this.$store.commit("USERDETAIL", uad.profile);
      localStorage.setItem("headimg", JSON.stringify(uad.profile.avatarUrl));
      // 等级信息
      let { data: ulel } = await getUserLevel();
      this.$store.commit("USERLEVEL", ulel.data);
      // 用户信息
      let { data: udl } = await getUserDetail(ulel.data.userId);
      this.$store.commit("USERINFO", udl.profile);
      // 获取登陆后的推荐歌单
      let { data: lpl } = await getLoginPlayList();
      this.$store.commit("PLAYLIST", lpl.recommend.splice(0, 8));

      this.$bus.$emit("upheadimg");
      // 更新评论框自己头像的状态
      this.$bus.$emit("ShiFowDengLu", true);
      // 显示登陆后的模板
      this.$store.commit("SHOW", false);
    },
  },
};
</script>

<style>
</style>