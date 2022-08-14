import Vue from "vue";
import VueRouter from "vue-router";
const My = () => import("../views/my/My.vue"); // "我的"
const Home = () => import("../views/home/Home.vue"); // 首页
const UserHome = () => import("../views/userhome/UserHome.vue"); // 用户主页
/* home路由的子路由 */
const Discover = () => import("../views/home/discover/Discover.vue"); // 首页
const TopList = () => import("../views/home/toplist/TopList.vue"); // 排行榜页
const PlayList = () => import("../views/home/playlist/PlayList.vue"); // 歌单页
const Album = () => import("../views/home/album/Album.vue"); // 专辑页
const ArtistPage = () => import("../views/home/artist/ArtistPage.vue"); // 歌手页
const Djradio = () => import("../views/home/Djradio/Djradio.vue");
// 歌手页的子路由
const DefaultSinger = () =>
  import("../views/home/artist/pages/DefaultSinger.vue");
const Classification = () =>
  import("../views/home/artist/pages/Classification.vue");
const Settled = () => import("../views/home/artist/pages/Settled.vue");

// 每日推荐页
const RecoMmend = () => import("../views/home/recommend/RecoMmend.vue");
// 单独的歌手详情页
const SingerDetail = () =>
  import("../views/home/singerdetail/SingerDeatil.vue");
// 歌手详情页的子路由
const Artist = () => import("../views/home/singerdetail/pages/Artist.vue");
const CAlbum = () => import("../views/home/singerdetail/pages/CAlbum.vue");
const MvBox = () => import("../views/home/singerdetail/pages/MvBox.vue");
const CDesc = () => import("../views/home/singerdetail/pages/CDesc.vue");
// 单独的歌曲详情页
const SongDeatil = () => import("../views/home/songdetail/SongDetail.vue");
// 单独的歌单详情页
const PlayListDetail = () =>
  import("../views/home/playListDetail/PlayListDetail.vue");
// 单独的专辑详情页
const AlbumsDetail = () =>
  import("../views/home/albumsDetail/AlbumsDetail.vue");
// 搜索页面
const Search = () => import("../views/search/Search.vue");
Vue.use(VueRouter);
// 解决重复路由引起的报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  // 排行榜
  {
    path: "/toplist",
    component: TopList,
  },
  // 歌单
  {
    path: "/playlist",
    component: PlayList,
  },
  // 专辑
  {
    path: "/album",
    component: Album,
  },
  {
    path: "/djradio",
    component: Djradio,
  },
  // 歌手
  {
    path: "/artist",
    component: ArtistPage,
    redirect: "/artist/default",
    children: [
      {
        path: "/artist/default",
        component: DefaultSinger,
      },
      {
        path: "/artist/signed",
        component: Settled,
      },
      {
        path: "/artist/cat",
        component: Classification,
      },
    ],
  },
  // 歌手详情
  {
    path: "/singer",
    component: SingerDetail,
    redirect: "/singer/artist",
    children: [
      { path: "artist", component: Artist },
      { path: "album", component: CAlbum },
      { path: "mv", component: MvBox },
      { path: "desc", component: CDesc },
    ],
  },
  // 歌单详情
  {
    path: "/playlistDetail",
    component: PlayListDetail,
  },
  // 专辑详情
  {
    path: "/albumsDetail",
    component: AlbumsDetail,
  },
  // 每日推荐
  {
    path: "/recommend",
    component: RecoMmend,
  },
  // 歌曲详情
  {
    path: "/song",
    component: SongDeatil,
  },
  // “我的”
  {
    path: "/my",
    component: My,
  },
  // 用户主页
  {
    path: "/user/home",
    component: UserHome,
  },
  // 搜索页面
  {
    path: "/search",
    component: Search,
  },
  // MV 页面
  {
    path: "/mv",
    component: () => import("../views/mvideo/Mvideo.vue"),
  },
  // 视频页面
  {
    path: "/video",
    component: () => import("../views/videoDetail/VideoDetail.vue"),
  },
  // 下载页面
  {
    path: "/download",
    component: () => import("../views/download/DownLoad.vue"),
  },
  {
    path: "/msg",
    component: () => import("../views/msg/Msg.vue"),
  },
  {
    path: "/level",
    component: () => import("../views/Level/Level.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});
export default router;
