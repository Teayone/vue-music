<template>
  <div id="fenlei">
    <codelist></codelist>
    <singer :artist="artist"></singer>
    <!-- 没有的时候显示的内容 -->
    <div v-if="isShow">
      <h2 class="tost">没有喽</h2>
    </div>
  </div>
</template>

<script>
import { getArtistList } from "../../../../api/api";
import Codelist from "../children/Codelist.vue";
import Singer from "../../../search/common/Singer.vue";

export default {
  name: "Classification",
  components: { Codelist, Singer },
  data() {
    return {
      artist: null,
      isShow: false,
      offset: 1,
    };
  },
  created() {
    let area = this.$route.query.area;
    let type = this.$route.query.id.slice(3);
    let initial = this.$route.query.initial;
    if (initial) {
      this.getData(type, area, initial);
    } else {
      this.getData(type, area);
    }
  },
  mounted() {
    this.scrollData();
  },
  methods: {
    async getData(type, area, initial) {
      let { data: res } = await getArtistList(type, area, initial);
      if (res.artists.length === 0) {
        this.isShow = true;
      } else {
        this.artist = res.artists;
      }
    },
    // 滚动事件
    scrollData() {
      let _this = this;
      let area = this.$route.query.area;
      let type = this.$route.query.id.slice(3);
      let initial = this.$route.query.initial;
      let dc = document.documentElement.clientHeight;
      window.addEventListener(
        "scroll",
        _this.throttle(_this.scrollFuc, 80, dc, type, area, initial)
      );
    },
    // 节流
    throttle(fn, delay, dc, type, area, initial) {
      let time = null;
      return function () {
        if (time !== null) return;
        time = setTimeout(() => {
          fn.call(this, dc, type, area, initial);
          time = null;
        }, delay);
      };
    },
    // 请求新的页数新的数据
    scrollFuc(dc, type, area, initial) {
      let _this = this;
      let ds = document.documentElement.scrollHeight;
      if (document.documentElement.scrollTop + dc == ds) {
        _this.offset++;
        getArtistList(type, area, initial, _this.offset).then((v) => {
          if (v.data.artists.length === 0) {
            _this.isShow = true;
          } else {
            _this.artist = _this.artist.concat(v.data.artists);
          }
        });
      }
    },
  },
};
</script>

<style scoped>
#fenlei {
  padding: 40px;
}
.tost {
  font-size: 24px;

  text-align: center;
  margin-top: 50px;
  color: #999;
}
</style>