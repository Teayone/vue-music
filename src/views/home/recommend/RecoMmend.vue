<template>
  <div id="recommend">
    <tab-bar></tab-bar>
    <!-- 每日推荐歌曲详情页 -->
    <div class="wrap3 main">
      <div class="main-left">
        <!-- bg + 播放按钮 -->
        <bg-and-play :songList="recommend"></bg-and-play>
        <song-list :songList="recommend"></song-list>
      </div>
      <div class="main-right">
        <h3 class="hd"><span class="hd-red">?</span> 个性化推荐如何工作</h3>
        <div class="info">
          <p class="one">
            它聪明、熟悉每个用户的喜好，从海量音乐中挑选出你可能喜欢的音乐。
          </p>
          <p class="two">它通过你每一次操作来记录你的口味</p>
        </div>
        <div class="userInfo">
          <p class="play">你播放了<span>5722</span>首音乐</p>
          <p class="like">你喜欢了<span>81</span>首音乐</p>
          <p class="shoucang">你收藏了<span>2</span>位歌手</p>
        </div>

        <p class="end">你提供给云音乐的信息越多，它就越了解你的音乐喜好。</p>
      </div>
    </div>
  </div>
</template>

<script>
import TabBar from "../../../components/tabbar/TabBar.vue";
import BgAndPlay from "./children/left/BgAndPlay.vue";
import SongList from "../../../components/songlist/SongList.vue";
import { getRecommend } from "../../../api/api";
export default {
  components: { BgAndPlay, SongList, TabBar },
  name: "RecoMmend",
  data() {
    return {
      // 保存每日的歌单数据
      recommend: null,
    };
  },
  created() {
    this.getRe();
  },
  methods: {
    async getRe() {
      let { data: res } = await getRecommend();
      this.recommend = res.data.dailySongs;
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
  padding: 47px 30px 40px 39px;
}
.main-right {
  width: 250px;
  box-sizing: border-box;
  border-left: 1px solid #ccc;
}

.hd {
  height: 22px;
  padding: 5px 0 8px;
  border-bottom: 1px solid #ccc;
  font-size: 18px;
  line-height: 22px;
  margin: 20px 20px;
}
.hd-red {
  position: relative;
  top: -1px;
  display: inline-block;
  width: 22px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  font-size: 16px;
  box-sizing: border-box;
  border-radius: 50%;
  background: #d01a1a;
  color: #fff;
}
.info {
  margin: 10px 20px;
  font-size: 12px;
  color: #666;
}
.one {
  line-height: 20px;
}
.two {
  margin-top: 20px;
}
.userInfo {
  margin: 15px 20px;
  background: #f7f7f7;
  padding: 17px 0 17px 12px;
  font-size: 12px;
  color: #999999;
  box-sizing: border-box;
}
.userInfo > p {
  width: 188px;
}
.userInfo > p > span {
  color: #c20c0c;
  font-weight: bold;
}
.play,
.like {
  height: 40px;
  line-height: 20px;
}
.end {
  margin: 15px 20px;

  font-size: 12px;
  line-height: 18px;
  color: #666;
}
</style>
