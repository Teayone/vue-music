  <template>
  <div id="progress">
    <!-- 上方是歌名和歌手 -->
    <div class="singer-song">
      <!-- 歌名 -->
      <a href="javascript:;" class="song" @click="toSongsDetail">{{
        Name.songName
      }}</a>
      <!-- 歌手 -->
      <div class="max-width">
        <h5 v-for="(item, index) in Name.singerName" :key="index" class="h5">
          <a href="javascript:;" class="singer" @click="toSingerDetail(index)"
            >{{ item }} </a
          ><span>{{ index === Name.singerName.length - 1 ? "" : "/" }}</span>
        </h5>
      </div>
    </div>
    <!-- 下方是进度条 -->
    <div class="pro-bar">
      <!-- 整个进度条 -->
      <div class="pro-bar-sone" @click="jumpPro" ref="progress">
        <!-- 根据网络加载的进度条 -->
        <div class="pro-bar-inter" :style="huiWidth"></div>
        <!-- 根据播放的当前进度加载的进度条 -->
        <div class="pro-bar-currtime" :style="width" ref="proBarCurrtime">
          <!-- 拖拽点 -->
          <span
            class="span"
            ref="pro"
            @mousedown.stop="mouseD"
            :style="right"
          ></span>
        </div>
      </div>
      <!-- 歌曲时间 -->
      <div class="current-time">
        <span>{{ currentTime | formatTimer }}</span>
        /
        <span>{{ duraTion | formatTimer }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { up } from "../../../mixin/mixin";
export default {
  name: "ProGress",

  data() {
    return {
      sName: [],
      // 记录歌曲总时长(计算属性所依赖的)
      duraTion: 0,
      currentTime: 0,
      width: 0,
      // 进度条DOM元素
      drop: null,
      // 播放进度(百分比)
      pro: 0,
      right: `right:${-13}px`,
      huiWidth: 0,
    };
  },
  created() {
    this.timer();
  },
  mounted() {
    let self = this;
    this.$bus.$on("duraTion", function () {
      self.timer();
    });
    // 监听歌曲当前播放时间
    this.$bus.$on("currentTime", function (time) {
      self.currentTime = time;
      let cet = (self.currentTime / self.duraTion) * 100;
      self.width = "width:" + cet + "%";
    });
    // 浏览器读取音频缓存
    this.$bus.$on("huancun", (buffered) => {
      if (buffered.length > 0) {
        try {
          let len = buffered.length - 1;
          let huiw = (buffered.end(len) / self.duraTion) * 100;
          self.huiWidth = "width:" + huiw + "%";
        } catch (error) {}
      }
    });
  },
  methods: {
    // 给总时长重新赋值
    timer() {
      this.duraTion = localStorage.getItem("timer");
    },
    // 鼠标点击进度条，跳转到对应位置
    jumpPro(e) {
      if (e.target.className !== "span" && e.target.className !== "i") {
        // 得到总进度条的的宽度
        let width = this.$refs.progress.offsetWidth;
        this.pro = (e.offsetX / width) * 100;
        // 得到具体跳转的百分比
        this.width = "width:" + this.pro + "%";
        // 将得到的百分比值发送出去
        this.$bus.$emit("progress", this.pro);
        // 重新跳歌词
        this.$bus.$emit("playLyric");
      }
    },
    mouseD(e) {
      let _this = this;
      // 点击拖拽点获取当前的 offsetLeft
      let yuan = this.$refs.pro.offsetLeft;
      let zong = this.$refs.progress.offsetWidth;
      // 鼠标点击时的坐标减去园的offsetLeft，再通过鼠标移动时的坐标减去得到后的结果
      // 就可以得到圆的 left 移动距离
      let le = e.clientX - yuan;
      document.onmousemove = function (event) {
        //得到小圆点的移动距离
        let left = event.clientX - le;
        if (left <= 7) {
          left = 0;
        } else if (left >= zong + 7) {
          left = zong;
        }
        let w = (left / zong) * 100;
        _this.width = `width:${left}px`;
        _this.$bus.$emit("progress", w);
      };
      document.onmouseup = function () {
        document.onmousemove = null;
      };
    },
    // 跳转至歌曲详情页
    toSongsDetail() {
      let index = this.$store.state.index;
      let id = this.song[index].id;
      this.$router.push({
        path: "/song",
        query: {
          id,
        },
      });
    },
    // 跳转至歌手详情页
    toSingerDetail(i) {
      let index = this.$store.state.index;
      let id = this.song[index].ar[i].id;
      this.$router.push({
        path: "/singer",
        query: {
          id,
        },
      });
    },
  },
  mixins: [up],
  computed: {
    Name() {
      if (this.song) {
        let index = this.$store.state.index;
        // 每次切换重置数组
        this.sName = [];
        this.song[index].ar.forEach((item) => {
          this.sName.push(item.name);
        });
        // 有值就显示对应的值
        return {
          songName: this.song[index].name,
          singerName: this.sName,
        };
      } else {
        // 如果没值，则什么都不显示
        return { songName: "", singerName: [] };
      }
    },
  },
};
</script>

<style scoped>
#progress {
  width: 581px;
  font-size: 12px;
}
/* 歌手和歌曲 */
.singer-song {
  display: flex;
  width: 100%;
}
.singer-song > a {
  display: block;
  height: 28px;
  line-height: 28px;
}
.singer-song > a:hover {
  text-decoration: underline;
}
.song {
  max-width: 300px;
  margin-right: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #e8e8e8;
}
.max-width {
  max-width: 220px;
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 8px;
}
.max-width a:hover {
  text-decoration: underline;
}
.h5 {
  display: flex;
}
.max-width > .h5 > span {
  color: #9b9b9b;
}
.singer {
  color: #9b9b9b;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 进度条 */
.pro-bar {
  width: 466px;
  position: relative;
}
/* 总体进度条 */
.pro-bar-sone {
  position: relative;
  width: 100%;
  height: 9px;
  border-radius: 20px;
  background: #171717;
  box-sizing: border-box;
  border-bottom: 1px solid #474747;
  border-top: 1px solid #0b0b0b;
}
/* 网络加载好的进度条 */
.pro-bar-sone > .pro-bar-inter {
  height: 100%;
  position: absolute;
  width: 0;
  background: #535353;
  border-radius: 20px;
}
/* 当前播放进度的进度条 */
.pro-bar-sone > .pro-bar-currtime {
  position: absolute;
  background: #c70c0c;
  height: 100%;
  border-radius: 20px;
  z-index: 6;
  box-sizing: border-box;
  /* border-top: 1px solid #f41616; */
}
/* 只要拖拽这个小圆点,红色的进度条的宽度就会增加 */
.pro-bar-currtime > span {
  position: absolute;
  /* right: -12px; */
  top: -7px;
  width: 22px;
  height: 24px;
  margin-left: -11px;
  /* border-radius: 50%; */
  background-image: url(https://s2.music.126.net/style/web2/img/iconall.png?878bc4ddd445a94be4e7a3b48ad1ede5);
  background-repeat: no-repeat;
  background-position: 0 -250px;
}
.pro-bar-currtime > span:hover {
  background-position: 0 -280px;
}

/* 歌曲时间 */
.current-time {
  position: absolute;
  right: -84px;
  top: -2px;
  color: #797979;
}
.current-time > span:first-child {
  color: #979797;
}
</style>