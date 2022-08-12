<template>
  <div id="my">
    <tab-bar></tab-bar>
    <div class="main wrap3">
      <!-- 未登录时的页面 -->
      <wei-login v-if="isLogin"></wei-login>

      <yi-login v-else></yi-login>
    </div>
  </div>
</template>

<script>
import TabBar from "../../components/tabbar/TabBar.vue";
import WeiLogin from "./children/WeiLogin.vue";
import YiLogin from "./children/YiLogin.vue";
export default {
  name: "My",
  components: { TabBar, WeiLogin, YiLogin },
  data() {
    return {
      // 是否显示登陆页面
      isLogin: true,
      shouCangPlaylist: null,
      myPlaylist: null,
    };
  },
  created() {
    let cookie = localStorage.getItem("userInfo");
    if (cookie !== null) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  },
  mounted() {
    let _this = this;
    this.$bus.$emit("activeRoute", {
      index: 1,
      path: "/my",
    });
    this.$bus.$on("login", () => {
      _this.isLogin = false;
    });
  },
  methods: {},
};
</script>

<style scoped>
.main {
  background: #fff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
</style>