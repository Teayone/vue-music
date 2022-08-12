<template>
  <div id="collect-songs-child">
    <!-- 弹出框 -->
    <div class="collect-box">
      <!-- 头部 -->
      <div class="collect-header" @mousedown="mousD">
        <div class="zttl f-thide">添加到歌单</div>
        <!-- 关闭窗体 -->
        <span class="close-box" title="关闭窗体" @click="closeBox">X</span>
      </div>
      <!-- 中间 -->
      <div class="collect-main">
        <!-- 创建新歌单 -->
        <div class="newly-build-playlist">
          <i class="newly-build-icon"></i>
          新歌单
        </div>

        <ul class="list" v-if="playList !== null">
          <li
            v-for="item in playList"
            :key="item.id"
            @click="addSongToPlayList(item.id)"
          >
            <div class="list-left-img">
              <img :src="item.coverImgUrl" alt="" />
            </div>
            <div class="list-right-info">
              <p>{{ item.name }}</p>
              <p>{{ item.trackCount }}首</p>
            </div>
          </li>
        </ul>
        <!-- 加载动画 -->
        <loading v-if="showLoading"></loading>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../../../components/loading/Loading.vue";
import { getUserPlayList } from "../../../api/user";
import { addPlaylistTracks } from "../../../api/api";
export default {
  name: "CollectSongsChild",
  components: { Loading },
  props: ["track"],
  data() {
    return {
      // 我的歌单
      playList: null,
      // 是否显示加载动画
      showLoading: true,
    };
  },
  created() {
    let cookie = localStorage.getItem("userInfo");
    // 未登录会弹出登录框
    if (cookie) {
      setTimeout(() => {
        this.getData(this.$store.state.profile.userId);
      }, 300);
    }
  },
  updated() {
    this.showLoading = false;
  },
  methods: {
    async getData(id) {
      let { data: res } = await getUserPlayList(id);
      this.playList = res.playlist.filter((item) => {
        return item.creator.nickname === this.$store.state.profile.nickname;
      });
    },
    // 关闭弹框
    closeBox() {
      this.$emit("closeBox");
    },
    // 拖拽弹框
    mousD(e) {
      let Oc = document.querySelector(".collect-box");
      let x = e.pageX - Oc.offsetLeft; //这是鼠标在盒子内的坐标
      let y = e.pageY - Oc.offsetTop; //这是鼠标在盒子内的坐标
      document.onmousemove = function (event) {
        //实现原理，鼠标在页面的坐标 - 鼠标在盒子内的坐标 就是表单的移动距离
        Oc.style.left = event.pageX - x + "px";
        Oc.style.top = event.pageY - y + "px";
      };
      document.onmouseup = function () {
        document.onmousemove = null;
      };
    },
    // 添加歌曲到歌单 ..接口不对
    addSongToPlayList(id) {},
  },
};
</script>

<style scoped>
#collect-songs-child {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
}
.collect-box {
  width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.8);
  z-index: 100;
}
.collect-header {
  position: relative;
  z-index: 10;
  border-bottom: 1px solid #191919;
  border-radius: 4px 4px 0 0;
  background: #2d2d2d;
  cursor: move;
}
.collect-header > .zttl {
  padding-right: 45px;
  margin: 0;
  height: 38px;
  line-height: 38px;
  padding-left: 18px;
  border-radius: 3px 3px 0 0;
  font-weight: bold;
  font-size: 14px;
  color: #fff;
}
.close-box {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  right: 15px;
  font-size: 14px;
  color: #ccc;
  cursor: pointer;
}
.collect-main {
  width: 100%;
  padding: 0;
  border: 1px solid #878787;
  border-width: 0 1px 1px;
  border-radius: 0 0 4px 4px;
  background: #fff;
  overflow-y: auto;
  height: 374px;
}
.collect-main > .newly-build-playlist {
  padding: 10px 0 10px 35px;
  background: #e6e6e6;
  cursor: pointer;
  font-size: 12px;
}
.newly-build-playlist > .newly-build-icon {
  display: inline-block;
  width: 35px;
  height: 36px;
  margin-right: 10px;
  background: url(https://s2.music.126.net/style/web2/img/icon.png?2bad6fc42db6f058bc4ec53b7d6c4c5c)
    no-repeat;
  background-position: 0 -495px;
  vertical-align: middle;
}
.list {
  overflow: hidden;
}
.list > li {
  padding: 6px 0 6px 35px;
  border-top: 1px solid #e0e0e0;
  display: flex;
}
.list > li:hover {
  background: #f2f2f2;
  cursor: pointer;
}
.list-left-img {
  display: inline;
  width: 40px;
}
.list-left-img > img {
  width: 40px;
  height: 40px;
}
.list-right-info {
  flex: 1;
  margin-left: 10px;
}
.list-right-info > p {
  font-size: 12px;
  line-height: 20px;
}
.list-right-info > p:last-child {
  color: #666;
}
</style>