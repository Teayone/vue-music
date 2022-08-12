<template>
  <div id="singer">
    <!-- 歌手的具体详情页 -->
    <tab-bar :items="items"></tab-bar>
    <lay-out>
      <template #left>
        <div class="box" v-if="singerData">
          <!-- 歌手名字 -->
          <h3>
            {{ singerData.name }}
            <span>{{ singerData.transNames[0] }}</span>
          </h3>
          <!-- 歌手封面 -->
          <div class="sing-img">
            <img :src="singerData.cover" alt="" :title="singerData.name" />
            <!-- 个人主页 -->
            <a
              v-if="singerUser"
              href="javascript:;"
              class="user-home"
              @click="handleToUserHome(singerUser.userId)"
            >
              <i class="iconfont icon-gerenzhuye"></i> 个人主页</a
            >
          </div>
        </div>

        <singer-tab :tabs="tabs"></singer-tab>
        <!-- 子路由区域 -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </template>
      <template #right>
        <tags-box text="相似歌手"></tags-box>
        <!-- 相似歌手 -->
        <similar-box :simiArtist="simiArtist"></similar-box>
      </template>
    </lay-out>
  </div>
</template>

<script>
import TabBar from "../../../components/tabbar/TabBar.vue";
import LayOut from "../../../components/layout/LayOut.vue";
import SingerTab from "./children/SingerTab.vue";
import SimilarBox from "./children/SimilarBox.vue";
import TagsBox from "../discover/children/right/TagsBox.vue";
import { getSingerDetail, getSimiArtist } from "../../../api/api";
export default {
  name: "SingerDetail",
  components: { TabBar, LayOut, SingerTab, TagsBox, SimilarBox },
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
      tabs: [
        { name: "热门作品", path: "/singer/artist" },
        { name: "所有专辑", path: "/singer/album" },
        { name: "相关MV", path: "/singer/mv" },
        {
          name: "艺人介绍",
          path: "/singer/desc",
        },
      ],
      // 歌手封面和名字
      singerData: null,
      singerUser: null,
      // 相似歌手
      simiArtist: null,
    };
  },
  created() {
    this.getSingData(this.$route.query.id);
  },
  mounted() {
    this.$bus.$emit("activeChildrenRoute", null);
  },
  methods: {
    async getSingData(id) {
      let { data: res } = await getSingerDetail(id);
      this.singerData = res.data.artist;
      // 歌手主页要用的信息
      this.singerUser = res.data.user;
      // 获取相似歌手
      let { data: simiArtist } = await getSimiArtist(id);
      this.simiArtist = simiArtist.artists.slice(0, 6);
    },
    // 跳转到用户页
    handleToUserHome(id) {
      this.$router.push({
        path: "/user/home",
        query: {
          id,
        },
      });
      console.log(id);
    },
  },
};
</script>

<style scoped>
.box > h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
  margin-top: -20px;
}
.box > h3 > span {
  font-size: 14px;
  color: #999;
  padding-left: 5px;
}
.sing-img {
  position: relative;
  width: 100%;
  height: 300px;
}
.sing-img > img {
  width: 100%;
  height: 100%;
}
.user-home {
  right: 20px;
  bottom: 20px;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  width: 96px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  transition: all 0.3s;
  border: 1px solid #333;
}
.user-home > i {
  font-size: 14px;
  font-weight: bolder;
}
.user-home:hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>