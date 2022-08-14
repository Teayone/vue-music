<template>
  <div id="discover">
    <swiper :banner="banner"></swiper>
    <!-- 首页歌曲相关信息 -->
    <div class="wrap3 main">
      <!-- 左面歌单模块 -->
      <div class="main-left">
        <!-- 首页导航条公共组件 -->
        <crumbs-main :tabs="listHot" :acIndex="2" pathRouter="playlist">
        </crumbs-main>
        <!-- 首页歌单组件 -->
        <cover-list> </cover-list>
        <div id="recommend" v-if="!$store.state.whetherLogin">
          <!-- 登陆成功显示的个性推荐 -->
          <crumbs-main title="个性化推荐"></crumbs-main>
          <!-- 登录之后的推荐内容 -->
          <reco-mmend></reco-mmend>
        </div>
        <!-- 首页导航条公共组件 -->
        <crumbs-main title="新碟上架" :acIndex="5" pathRouter="album">
        </crumbs-main>
        <!-- 专辑区域  -->
        <disc :albums="albums"> </disc>
        <!-- 首页导航条公共组件 -->
        <crumbs-main title="榜单" :acIndex="1" pathRouter="toplist">
        </crumbs-main>
        <!-- 排行榜组件 -->
        <top-list-item :list="topList" :songs="songs"></top-list-item>
      </div>
      <!-- 右面歌手模块 -->
      <div class="main-right">
        <user-login></user-login>
        <tags-box
          text="热门歌手"
          :showGengduo="true"
          title="查看更多"
          path="/artist"
        ></tags-box>
        <singer-items :hotSinger="hotSinger"></singer-items>
        <tags-box text="热门主播"></tags-box>
        <hot-anchor :hotDj="hotDj"></hot-anchor>
      </div>
    </div>
  </div>
</template>

<script>
// 导入轮播图组件
import Swiper from "../../../components/swiper/Swiper.vue";
// 导入面包屑组件
import CrumbsMain from "./children/left/CrumbsMain.vue";
// 导入歌单items组件
import CoverList from "./children/left/CoverList.vue";
// 导入每日推荐组件
import RecoMmend from "./children/left/RecoMmend.vue";
// 导入碟片 items 组件
import Disc from "./children/left/Disc.vue";
// 导入排行榜 items 组件
import TopListItem from "./children/left/TopListItem.vue";

// 导入右侧的登录框组件
import UserLogin from "./children/right/UserLogin.vue";
import TagsBox from "./children/right/TagsBox.vue";
import SingerItems from "./children/right/SingerItems.vue";
import HotAnchor from "./children/right/HotAnchor.vue";
// 导入请求文件
import {
  getBanner,
  getPlayListHot,
  getAlbumNewest,
  getTopList,
  getHotSinger,
  getHotDj,
  getWholeSongs,
  getPersonalized,
} from "../../../api/api";
export default {
  name: "Discover",
  components: {
    Swiper,
    CrumbsMain,
    CoverList,
    Disc,
    TopListItem,
    UserLogin,
    TagsBox,
    SingerItems,
    HotAnchor,
    RecoMmend,
  },
  data() {
    return {
      // 防止出现缓存报错
      banner: [
        {
          imgUrl: "",
        },
      ],
      // 热门歌单标签
      listHot: [],
      // 最新专辑数据
      albums: [],
      // 排行榜展示数据
      topList: [],
      // 热门歌手数据
      hotSinger: [],
      // 热门主播数据
      hotDj: [],
      // 根据 排行榜id 获取歌曲数据
      songs: [],
    };
  },
  created() {
    // 开局就先请求所有首页数据
    this.getData();
    // 如果有cookie 就重新求一边相关推荐并把 VUEX里的值覆盖掉
    let cookies = localStorage.getItem("userInfo")
      ? localStorage.getItem("userInfo")
      : "";
    if (cookies) {
      this.$bus.$emit("login");
    }
  },

  methods: {
    async getData() {
      // 轮播图数据
      let { data: ban } = await getBanner();
      this.banner = ban.banners;
      //热门歌单标签数据
      let { data: pst } = await getPlayListHot();
      this.listHot = pst.tags.splice(0, 5);
      // 首页歌单展示数据
      // let { data: hpl } = await getHomePlayList();
      // 热门推荐歌单(未登录但是会覆盖到Vuex 里)
      let { data: pon } = await getPersonalized();
      this.$store.commit("PLAYLIST", pon.result.splice(0, 8));
      // 最新专辑展示数据
      let { data: ane } = await getAlbumNewest();
      this.albums = ane.albums.splice(8, 9);
      // 排行榜数据
      let { data: tpl } = await getTopList();
      this.topList = tpl.list.splice(0, 3);
      // 热门歌手数据
      let { data: hotSinger } = await getHotSinger();
      this.hotSinger = hotSinger.artists;
      // 热门主播数据
      let { data: hotDj } = await getHotDj();
      this.hotDj = hotDj.data.list;
      // 根据 id 获取排行榜歌曲信息
      this.topList.forEach((item) => {
        getWholeSongs(item.id).then((v) => {
          let res = v.data;
          this.songs.push(res);
        });
      });
    },
    async getPlayList() {
      let { data: pon } = await getPersonalized();
      this.$store.commit("PLAYLIST", pon.result.splice(0, 8));
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  background: #fff;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.main-left {
  box-sizing: border-box;
  width: 730px;
  padding: 20px 20px 40px 20px;
}
.main-right {
  width: 250px;
  box-sizing: border-box;
  border-left: 1px solid #ccc;
}
</style>
