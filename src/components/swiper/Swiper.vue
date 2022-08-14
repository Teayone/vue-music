<template>
  <div id="swiper" @mouseover="stopTime" @mouseleave="playTime">
    <!-- 遮罩层 -->
    <div
      class="zhezhao"
      :style="{ backgroundImage: `url(${banner[index].imageUrl})` }"
    ></div>
    <!-- 轮播图组件 -->
    <div class="wrap2">
      <div class="box">
        <img
          :src="banner[index].imageUrl"
          alt=""
          :style="{ opacity: value }"
          @click="toRouter(banner[index].targetType, banner[index].targetId)"
        />
        <!-- 小圆点 -->
        <div class="nav-btn">
          <span
            v-for="(item, currernIndex) in banner"
            :key="currernIndex"
            :class="{ active: currernIndex === index }"
            @click="jumpBtn(currernIndex)"
          ></span>
        </div>
      </div>
      <!-- 翻页按钮 -->
      <div class="prev" @click="prevBtn">&lt;</div>
      <div class="next" @click="nextBtn">&gt;</div>

      <div class="download">
        <a href="javascript:;" @click="handleToDownload"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // 切换轮播图
      index: 0,
      // 切换轮播图时的动画效果
      value: 1,
      // 停止定时器
      timer: null,
    };
  },
  mounted() {
    this.moveTime();
  },
  methods: {
    moveTime() {
      this.timer = window.setInterval(() => {
        this.value = 0.2;
        setTimeout(() => {
          if (this.index === this.banner.length - 1) {
            this.index = -1;
          }
          this.value = 1;
          this.index++;
        }, 600);
      }, 5000);
    },
    prevBtn() {
      if (this.index === 0) {
        this.index = this.banner.length;
      }
      this.index--;
    },
    nextBtn() {
      if (this.index === this.banner.length - 1) {
        this.index = -1;
      }
      this.index++;
    },
    stopTime() {
      window.clearInterval(this.timer);
    },
    playTime() {
      this.moveTime();
    },
    handleToDownload() {
      this.$router.push("/download");
    },
    jumpBtn(i) {
      this.index = i;
    },
    toRouter(type, id) {
      if (type == 1) {
        this.$router.push({
          path: "/song",
          query: {
            id,
          },
        });
      } else if (type === 1000) {
        this.$router.push({
          path: "/playlistDetai",
          query: {
            id,
          },
        });
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped>
#swiper {
  position: relative;
  height: 285px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.zhezhao {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-size: 100% 100%;

  filter: blur(15px);
  z-index: -1;
}
.wrap2 {
  position: relative;
  display: flex;
  width: 982px;
  height: 285px;
  margin: 0 auto;
}

.box {
  position: relative;
  width: 730px;
  margin-right: -2px;
  height: 285px;
  box-sizing: border-box;
}
img {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transition: all 1.5s ease;
  cursor: pointer;
}
.prev,
.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 37px;
  height: 60px;
  font-size: 60px;
  text-align: center;
  line-height: 60px;
  font-weight: 100;
  color: #fff;
  cursor: pointer;
  transition: all 0.5s;
}
.prev:hover,
.next:hover {
  background-color: rgba(9, 9, 9, 0.5);
}
.prev {
  left: -60px;
}
.next {
  right: -60px;
}
.nav-btn {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.nav-btn > span {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #fff;
  margin-left: 20px;
  cursor: pointer;
  transition: all 0.5s;
}
.nav-btn > span.active {
  background-color: darkred;
}
.nav-btn > span:hover {
  background-color: darkred;
}

.download {
  width: 254px;
  height: 100%;
  background-image: url(https://s2.music.126.net/style/web2/img/index/download.png?8469c89caffc8903515a16fbe886a64e);
  background-position: 0 0;
  background-repeat: no-repeat;
}
.download > a {
  display: block;
  width: 215px;
  height: 56px;
  margin: 186px 0 0 19px;
  background: url(https://s2.music.126.net/style/web2/img/index/download.png?8469c89caffc8903515a16fbe886a64e)
    no-repeat;
  background-position: 0 9999px;
}
.download > a:hover {
  background-position: 0 -290px;
}
</style>
