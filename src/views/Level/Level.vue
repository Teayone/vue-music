<template>
  <div id="level">
    <tab-bar></tab-bar>
    <div class="level-main wrap3" v-if="levelData">
      <h1>
        当前等级：<span>Lv.{{ levelData.level }}</span>
      </h1>
      <div class="sub">
        <!-- 等级进度条 -->
        <div class="sub-bg">
          <!-- 当前等级进度盒子 -->
          <!-- 宽度为25+81x等级x70% -->
          <div class="cur-sub" style="width: 705.528px">
            <!-- 背景图(等级进度条) -->
            <span></span>
          </div>
        </div>
        <!-- 等级数字和将进度条划分为对应的一小格 -->
        <div class="sub-num">
          <!-- 等级小格 -->
          <div class="divison">
            <span v-for="(span, i) of 9" :key="i"></span>
          </div>
          <!-- 等级数字 -->
          <div class="divnum">
            <ul>
              <!-- ov 已过等级样式，on到达等级样式 -->
              <li
                v-for="(item, index) of 11"
                :key="index"
                :class="{
                  'z-ov': levelData.level > index,
                  'z-on': levelData.level === index,
                }"
              >
                {{ index }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p style="font-size: 12px; color: #999; margin-top: 10px">
        等级数据每天下午2点更新
      </p>

      <!-- 当前等级特权 -->
      <div class="curlevel-tequan">
        <h2>当前等级特权：</h2>
        <ul>
          <li v-for="(item, index) in info" :key="index">{{ item }}</li>
        </ul>
        <div class="liaojie-tequan">
          <a href="javascript:;">了解等级特权&gt;</a>
        </div>
      </div>
      <!-- 距离下一等级 -->
      <div class="distance-next-level" v-if="levelData">
        <h4>
          {{ levelData.level === 10 ? "已升至最高等级：" : "距离下一等级："
          }}<span
            >Lv.{{ levelData.level === 10 ? 10 : levelData.level + 1 }}</span
          >
          <i></i>
        </h4>
        <ul>
          <li>
            <span>听歌：</span>
            <!-- 进度条 -->
            <div class="progress">
              <!-- 灰色 -->
              <div class="progress-box" v-if="levelData">
                <!-- 红色 -->
                <span
                  :style="{
                    width: levelData.progress * 100 + '%',
                  }"
                ></span>
              </div>
            </div>
            <em>还需听歌{{ songs }}首</em>
          </li>
          <li>
            <span>登录：</span>
            <!-- 进度条 -->
            <div class="progress">
              <!-- 灰色 -->
              <div class="progress-box">
                <!-- 红色 -->
                <span :style="{ width: datBar + '%' }"></span>
              </div>
              <!-- 当前 -->
            </div>

            <em>还需登录{{ day }}天</em>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TabBar from "../../components/tabbar/TabBar.vue";
import { getUserLevel } from "../../api/user";
export default {
  name: "Level",
  components: { TabBar },
  data() {
    return {
      // 等级特权信息
      info: [],
      // 等级数据
      levelData: null,
    };
  },
  created() {
    this.$bus.$emit("activeRouer", null);
    this.getData();
  },
  methods: {
    async getData() {
      let { data: res } = await getUserLevel();
      console.log(res.data);
      this.levelData = res.data;
      this.info = res.data.info.split("$");
    },
  },
  computed: {
    // 还需听歌 XXX 首
    songs() {
      return this.levelData.nextPlayCount - this.levelData.nowPlayCount;
    },
    // 还需登录天数
    day() {
      return this.levelData.nextLoginCount - this.levelData.nowLoginCount;
    },
    // 还需登录天数进度条
    datBar() {
      return (
        (this.levelData.nowLoginCount / this.levelData.nextLoginCount) * 100
      );
    },
  },
};
</script>

<style scoped>
.level-main {
  background: #fff;
  border: 1px solid #ccc;
  border-top: none;
  padding: 70px 68px;
  box-sizing: border-box;
}
.level-main > h1 {
  font-size: 22px;
  color: #333;
}
.level-main > h1 > span {
  color: #e03a24;
  font-weight: 700;
  font-style: italic;
}
.level-list {
  margin-top: 20px;
  display: flex;
}
.sub {
  width: 100%;
  position: relative;
  z-index: 1;
  padding-top: 31px;
  height: 34px;
  overflow: hidden;
}
/* 等级进度条 */
.sub-bg {
  width: 835px;
  height: 10px;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 2;
  border-radius: 10px;
  background: #dcdfe6;
}
.sub-bg > .cur-sub > span {
  width: 100%;
  display: block;
  height: 10px;
  background: url(https://s2.music.126.net/style/web2/img/mylevelbar.png?612d825ce69bb4ce6336877e303a7da1)
    0 0 repeat-y;
  border-radius: 10px;
  animation: subbar 2s;
}
@keyframes subbar {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
.sub-num {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  z-index: 2;
}
.divison {
  position: absolute;
  left: 13px;
  bottom: 0;
  width: 100%;
  height: 10px;
}
.divison > span {
  float: left;
  display: inline;
  width: 1px;
  background: #fff;
  height: 10px;
  margin-left: 80px;
}
/* 等技数字 */
.divnum {
  position: absolute;
  left: 0;
  top: 0;
  font-family: "Microsoft YaHei";
  font-size: 18px;
  color: #c4c6cc;
  width: 980px;
}
/*  */
.divnum > ul > li {
  float: left;
  width: 25px;
  height: 28px;
  line-height: 24px;
  display: inline;
  margin-right: 56px;
  text-align: center;
}
.divnum > ul > li.z-ov {
  color: #ed5757;
  animation: show 3s;
}
@keyframes show {
  0% {
    color: #c4c6cc;
  }
  100% {
    color: #ed5757;
  }
}
.divnum > ul > li.z-on {
  color: #fff;
  background: url(https://s2.music.126.net/style/web2/img/mylevel.png?dd209ba6564670cb383d917fced7690d)
    no-repeat;
  background-position: 0 -50px;
  animation: show1 2s;
}
@keyframes show1 {
  0% {
    color: #c4c6cc;
    background-position: 9999px 9999px;
  }
  50% {
    color: #c4c6cc;
    background-position: 0 -50px;
  }
  100% {
    color: #fff;
  }
}
.curlevel-tequan {
  margin-top: 40px;
  padding: 15px 0 30px;
}
.curlevel-tequan > h2 {
  font-size: 22px;
  color: #333;
  margin-bottom: 10px;
}
.curlevel-tequan > ul > li {
  font-size: 14px;
  color: #666;
  height: 30px;
  line-height: 30px;
  padding: 0 0 0 13px;
  background: url(https://s2.music.126.net/style/web2/img/mylevel.png?dd209ba6564670cb383d917fced7690d)
    no-repeat;
  background-position: -17px -82px;
}
.liaojie-tequan {
  margin-top: 40px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 30px;
}
.curlevel-tequan a {
  display: inline-block;
  font-size: 12px;
  color: #0e73ba;
}
.curlevel-tequan a:hover {
  text-decoration: underline;
}
.distance-next-level > h4 {
  font-size: 14px;
  color: #333;
}
.distance-next-level > h4 > span {
  position: relative;
  zoom: 1;
  font-family: Arial;
  font-size: 18px;
  font-weight: 700;
  color: #e03a24;
  font-style: italic;
}
.distance-next-level > h4 > i {
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url(https://s2.music.126.net/style/web2/img/icon2.png?56b9f5388f2a3efdf3e44cb9a0d2a018)
    no-repeat 0 9999px;
  background-position: 0 -50px;
  vertical-align: -2.5px;
  cursor: pointer;
  margin-left: 3px;
}
.distance-next-level > h4 > i:hover {
  background-position: -20px -50px;
}
.distance-next-level > ul {
  margin-top: 30px;
}
.distance-next-level > ul > li {
  display: flex;
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  color: #999;
}
.distance-next-level > ul > li > span {
  color: #666;
}
.progress {
  position: relative;
  top: 8px;
  width: 160px;
  height: 12px;
  margin-right: 6px;
  /* background: pink; */
}
.progress-box {
  position: absolute;
  top: 7px;
  left: 0;
  z-index: 1;
  width: 160px;
  height: 4px;
  line-height: 0;
  background: #dcdfe6;
  border-radius: 5px;
}
.progress-box > span {
  position: absolute;
  left: 0;
  top: 0;
  height: 4px;
  z-index: 2;
  border-radius: 5px;
  background: red;
}
</style>