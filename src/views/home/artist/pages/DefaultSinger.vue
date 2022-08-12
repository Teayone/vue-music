<template>
  <div id="default-singer">
    <ctext text="热门歌手" ff="font-size:24px"></ctext>
    <singer :artist="artist"></singer>

    <div v-if="isShow" class="tost">没有了。。。</div>
  </div>
</template>

<script>
import { getTopArtist } from "../../../../api/api";
import Ctext from "../../../userhome/children/Ctext.vue";
import Singer from "../../../search/common/Singer.vue";
export default {
  name: "DefaultSinger",
  components: { Ctext, Singer },
  data() {
    return {
      artist: null,
      isShow: false,
      offset: 1, // 页数
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.scrollData();
  },
  methods: {
    async getData() {
      let { data: res } = await getTopArtist();
      this.artist = res.artists;
    },
    scrollData() {
      let _this = this;
      let dc = document.documentElement.clientHeight;
      window.addEventListener(
        "scroll",
        _this.throttle(_this.scrollFuc, 80, dc)
      );
    },
    // 节流
    throttle(fn, delay, dc) {
      let time = null;
      return function () {
        if (time !== null) return;
        time = setTimeout(() => {
          fn.call(this, dc);
          time = null;
        }, delay);
      };
    },
    // 请求新的页数新的数据
    scrollFuc(dc) {
      let _this = this;
      let ds = document.documentElement.scrollHeight;
      if (document.documentElement.scrollTop + dc == ds) {
        this.offset++;
        getTopArtist(this.offset).then((v) => {
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
#default-singer {
  padding: 0 40px 40px 40px;
}
.tost {
  text-align: center;
  color: #999;
  font-size: 14px;
}
</style>