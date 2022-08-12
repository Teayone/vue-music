<template>
  <div id="search">
    <tab-bar></tab-bar>
    <div class="main wrap3">
      <!-- 搜索框 -->
      <div class="sch">
        <input
          type="text"
          v-model="info"
          @input="handleSearch"
          @blur="infoYou"
          @focus="infoKong"
          @keydown.enter="search"
        />
        <!-- 搜索按钮 -->
        <a href="javascript:;" class="iconfont icon-sousuo" @click="search"></a>
        <tips
          v-if="searchTips"
          :searchList="searchList"
          :info="info"
          :class="{ tips: !searchTips }"
        ></tips>
      </div>

      <search-items></search-items>
    </div>
  </div>
</template>

<script>
import TabBar from "../../components/tabbar/TabBar.vue";
import SearchItems from "./children/SearchItems.vue";
import Tips from "./children/Tips.vue";
import { searchSugGest } from "../../api/search";
export default {
  name: "Search",
  components: { TabBar, SearchItems, Tips },
  data() {
    return {
      info: this.$route.query.s,
      debounce: null,
      // 搜索建议提示框是否显示
      searchTips: false,
      // 保存搜索建议
      searchList: null,
    };
  },
  created() {
    this.$bus.$emit("activeRouer", null);
  },
  methods: {
    handleSearch() {
      let self = this;
      if (this.debounce) {
        clearTimeout(this.debounce);
      }
      this.debounce = window.setTimeout(() => {
        if (self.info === "") {
          return;
        }
        searchSugGest(self.info).then((v) => {
          if (v.data.code === 200) {
            console.log(v.data.result);
            self.searchList = v.data.result;
            self.searchTips = true;
          }
        });
        this.debounce = null;
      }, 500);
    },
    // 输入框聚焦事件
    infoKong() {
      this.handleSearch();
    },
    // 输入框失焦事件
    infoYou() {
      setTimeout(() => {
        this.searchTips = false;
      }, 300);
    },
    // 搜索
    search() {
      console.log(1);
      this.$router.push({
        path: "/search",
        query: {
          s: this.info,
        },
      });
    },
  },
};
</script>

<style scoped>
.main {
  background: #fff;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 40px;
  box-sizing: border-box;
}
.sch {
  position: relative;
  z-index: 99;
  width: 400px;
  height: 40px;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  /* background: pink; */
}
.sch > input {
  width: 320px;
  height: 17px;
  outline: none;
  border: none;
  margin: 12px 0 0 20px;
  box-sizing: border-box;
}
.sch > a {
  position: absolute;
  width: 50px;
  height: 100%;
  right: 0;
  top: 0;
  background: skyblue;
  text-align: center;
  line-height: 40px;
  color: #fff;
  transition: all 0.3s;
  font-weight: bold;
}
.sch > a:hover {
  background: #58b0d3;
}
</style>