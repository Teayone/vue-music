<template>
  <div id="download">
    <tab-bar></tab-bar>
    <div class="wrap main-download">
      <div class="download-left">
        <h2 class="download-left-title">在电脑上听</h2>
        <img
          src="https://p1.music.126.net/PGNd0EAtUgA7iRCWXPnUuA==/109951164207162781.png?param=800x0"
          alt=""
        />
        <div class="down-load-xinghao-btn">
          <!-- mac -->
          <span class="mac-btn"></span>
          <!-- window -->
          <span class="window-btn"></span>
        </div>
        <!-- 下载按钮 -->
        <div class="main__button___1MzUb">下载电脑端</div>
      </div>
      <div class="download-right">
        <h2 class="download-left-title">在手机上听</h2>
        <img
          src="https://p1.music.126.net/sLtya87wVHWn-HWJ33oN4g==/109951164207180884.png?param=450x0"
          alt=""
        />
        <div class="down-load-xinghao-btn">
          <!-- mac -->
          <span class="ios-btn"></span>
          <!-- window -->
          <span class="android-btn"></span>
        </div>
        <div class="main__button___1MzUb">
          <i class="main__icon-ncode___NRbaQ"> </i>
          下载手机端
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabBar from "../../components/tabbar/TabBar.vue";
export default {
  name: "DownLoad",
  components: { TabBar },
  mounted() {
    this.$bus.$emit("activeRoute", {
      index: 5,
      path: "/download",
    });
  },
};
</script>

<style scoped>
#download {
  width: 100%;
  background: url(https://p1.music.126.net/LwY0PYMc2NVWwbIzvGFKcA==/109951164205104153.png)
    no-repeat;
  background-color: #222;
  background-size: cover;
}
.main-download {
  padding: 112px 0;
  display: flex;
  justify-content: space-between;
}
.download-left {
  width: 556px;
  height: 100%;
  text-align: center;
}
.download-right {
  position: relative;
  width: 300px;
  height: 100%;
  text-align: center;
}
.download-left-title {
  margin-bottom: 33px;
  width: 100%;
  text-align: center;
  font-size: 22px;
  opacity: 0.8;
  color: #fff;
}
.download-left > img {
  width: 557px;
  height: 328px;
  margin: 0 auto 3px;
}
.down-load-xinghao-btn {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 26px auto;
  font-size: 16px;
  color: #eee;
  text-align: center;
}
.down-load-xinghao-btn > .mac-btn {
  width: 154px;
  height: 44px;
  background: url(https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/icon_mac_black_new.bbaa33f484108e702bc365c250b74e79.png)
    no-repeat;
  background-size: contain;
  margin-right: 40px;
}
.down-load-xinghao-btn > .window-btn {
  width: 140px;
  height: 44px;
  background: url(https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/windows.3e335fd6d5078918ef80f7e54d0bd4b8.png)
    no-repeat;
  background-size: contain;
}
.download-right > img {
  width: 299px;
  height: 331px;
  margin: 0 auto;
}
.ios-btn {
  width: 120px;
  height: 44px;
  background: url(https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/icon_iphone_black_new.3c51a3730124d2d8d662aa4393572914.png)
    no-repeat;
  background-size: contain;
  margin-right: 40px;
}
.android-btn {
  width: 120px;
  height: 44px;
  background: url(https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/android.f73995b4ecd8636ecb3819906598ec13.png)
    no-repeat;
  background-size: contain;
}
.main__button___1MzUb {
  width: 300px;
  height: 65px;
  margin: 0 auto;
  border-radius: 65px;
  background-color: #fff;
  color: #d10000;
  font-size: 22px;
  line-height: 65px;
  text-align: center;
  cursor: pointer;
  box-sizing: content-box;
}
.main__icon-ncode___NRbaQ {
  display: inline-block;
  width: 21px;
  height: 21px;
  margin-right: 3px;
  background: url(https://s5.music.126.net/static_public/5d2e7e0f4c302eee822efc3d_5d2e7e0f4c302eee822efc3f/icon_ncode.28be3ef7e9730069682ff0d0ca17e942.png)
    no-repeat center;
  background-size: contain;
  vertical-align: -3px;
}
</style>