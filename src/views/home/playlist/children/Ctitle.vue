<template>
  <div id="c-title" v-if="tags !== null">
    <span>{{ name }}</span>
    <div class="xuanze-box">
      <a href="javascript:;" class="xuanze" @click="isShow = !isShow"
        >选择分类</a
      >
      <div class="list" v-show="isShow">
        <h3><a href="javascript:;" @click="toQuanbu">全部风格</a></h3>
        <ul class="ul" v-if="subsData !== null">
          <li class="li">
            <div class="left">
              <span>语种</span>
            </div>
            <div class="right">
              <span
                v-for="item in subsData['0']"
                :key="item.name"
                @click="ToList(item.name)"
                >{{ item.name }}</span
              >
            </div>
          </li>
          <li class="li">
            <div class="left">
              <span>风格</span>
            </div>
            <div class="right">
              <span
                v-for="item in subsData['1']"
                :key="item.name"
                @click="ToList(item.name)"
              >
                {{ item.name }}</span
              >
            </div>
          </li>
          <li class="li">
            <div class="left">
              <span>场景</span>
            </div>
            <div class="right">
              <span
                v-for="item in subsData['2']"
                :key="item.name"
                @click="ToList(item.name)"
                >{{ item.name }}
              </span>
            </div>
          </li>
          <li class="li">
            <div class="left">
              <span>情感</span>
            </div>
            <div class="right">
              <span
                v-for="item in subsData['3']"
                :key="item.name"
                @click="ToList(item.name)"
              >
                {{ item.name }}</span
              >
            </div>
          </li>
          <li class="li">
            <div class="left">
              <span>主题</span>
            </div>
            <div class="right">
              <span
                v-for="item in subsData['4']"
                :key="item.name"
                @click="ToList(item.name)"
                >{{ item.name }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ctitle",
  props: {
    tags: {
      type: Object,
      default() {
        return null;
      },
    },
    name: {
      type: String,
      default: "全部",
    },
  },
  data() {
    return {
      isShow: false,
      subsData: null, // 标签数据
    };
  },
  created() {
    setTimeout(() => {
      let sub = {};
      this.tags.sub.forEach((item) => {
        if (!sub[item.category]) {
          sub[item.category] = [item];
        } else {
          sub[item.category].push(item);
        }
      });
      this.subsData = sub;
    }, 200);
  },
  mounted() {
    document.addEventListener("click", (e) => {
      if (
        e.target.className !== "xuanze-box" &&
        e.target.className !== "xuanze"
      ) {
        this.isShow = false;
      }
    });
  },
  methods: {
    // 根据标签刷新页面的歌单
    ToList(name) {
      this.$router.push({
        path: "/playlist",
        query: {
          cat: name,
        },
      });
    },
    // 热门歌单
    toHot() {},
    toQuanbu() {
      this.$router.push({
        path: "/playlist",
      });
    },
  },
};
</script>

<style scoped>
#c-title {
  border-bottom: 2px solid #c20c0c;
  height: 40px;
}
#c-title > span {
  float: left;
  font-size: 24px;
  color: #333;
  margin-top: 4px;
}
.xuanze-box {
  position: relative;
  float: left;
  margin-top: -2px;
}
.xuanze {
  display: inline-block;
  height: 31px;
  line-height: 31px;
  border-radius: 3px;
  padding: 0 10px;
  margin: 2px 0 0 12px;
  background: #fbfbfb;
  font-size: 12px;
  color: #0c73c2;
  border: 1px solid #ccc;
}
.xuanze:hover {
  background: #fafafa;
}
.hot {
  float: right;
  font-size: 12px;
  color: #fff;
  background: #a80909;
  width: 46px;
  height: 29px;
  line-height: 29px;
  text-align: center;
  border-radius: 3px;
}
.list {
  position: absolute;
  z-index: 9999;
  width: 700px;
  background: #fff;
  top: 50px;
  left: -80px;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.5);
}
.list > h3 {
  position: relative;
  height: 40px;
  /* line-height: 40px; */
  border-bottom: 1px solid #ccc;
  padding: 5px 20px;
  font-size: 12px;
  transition: all 0.3s;
}
.list > h3 > a:hover {
  background: skyblue;
  color: #fff;
}
.list > h3 > a {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: 1px solid #ccc;
  background: #f7f7f7;
  padding: 5px 10px;
  border-radius: 5px;
  color: #333;
  transition: all 0.3s;
}
.ul {
  padding: 0 20px;
}
.li {
  display: flex;
  line-height: 24px;
}
.ul > .li > .left {
  width: 70px;
  padding-top: 15px;
  border-right: 1px solid #e6e6e6;
  text-align: center;
  padding-bottom: 20px;
}
.left > span {
  font-weight: bold;
  font-size: 12px;
}
.right {
  flex: 1;
  flex-wrap: wrap;
  padding: 16px 15px 0 15px;
  font-size: 12px;
  padding-bottom: 20px;
}
.right {
  display: flex;
}
.right span {
  cursor: pointer;
}
.right span:not(:last-child)::after {
  content: "|";
  margin: 0 8px 0 10px;
  font-size: 12px;
  color: #d8d8d8;
}
</style>