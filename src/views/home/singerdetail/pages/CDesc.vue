<template>
  <div id="desc" v-if="introduction">
    <div class="singer-desc" v-if="name && info">
      <h2>{{ name }}简介</h2>
      <p>{{ info }}</p>
    </div>
    <div class="singer-desc" v-for="(item, index) in introduction" :key="index">
      <h2>{{ item.ti }}</h2>
      <p style="white-space: pre-wrap">{{ item.txt }}</p>
    </div>
  </div>
</template>

<script>
import { getSingerDesc, getSingerDetail } from "../../../../api/api";
export default {
  name: "CDesc",
  data() {
    return {
      name: "",
      info: "null",
      // 歌手信息
      introduction: null,
    };
  },
  created() {
    this.getDesc(this.$route.query.id);
  },
  methods: {
    async getDesc(id) {
      let { data: singD } = await getSingerDetail(id);
      this.name = singD.data.artist.name;
      this.info = singD.data.artist.briefDesc;
      let { data: res } = await getSingerDesc(id);
      this.introduction = res.introduction;
    },
  },
};
</script>

<style scoped>
.singer-desc {
  margin-bottom: 30px;
}
.singer-desc > h2 {
  position: relative;
  font-size: 14px;
  font-weight: bold;
  margin: 28px 0 8px 0;
}
.singer-desc:first-child > h2::before {
  position: absolute;
  left: -5px;
  top: -1px;
  background: red;
  width: 3px;
  height: 15px;
  content: "";
}
.singer-desc > p {
  font-size: 12px;
  color: #666;
  line-height: 24px;
}
.singer-desc:first-child > p {
  text-indent: 20px;
}
</style>