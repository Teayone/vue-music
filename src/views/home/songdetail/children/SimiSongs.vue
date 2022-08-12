<template>
  <div id="simi-songs">
    <div class="simi-box" v-for="item in simiSongs" :key="item.id">
      <div class="box">
        <h2 @click.stop="toSongsDetail(item.id)">{{ item.name }}</h2>
        <p @click.stop="toSingerDetail(item.artists[0].id)">
          {{ item.artists[0].name }}
        </p>
      </div>
      <div class="play">
        <i @click="bofang(item.id)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { songPlay } from "../../../../mixin/mixin";
export default {
  name: "SimiSongs",
  props: {
    simiSongs: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  mixins: [songPlay],
  methods: {
    toSongsDetail(id) {
      this.$router.push({
        path: "/song",
        query: {
          id,
        },
      });
    },
    toSingerDetail(id) {
      this.$router.push({
        path: "/singer",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped>
#simi-songs {
  margin: 20px;
}
.simi-box {
  display: flex;
  margin-bottom: 15px;
}
.box {
  width: 156px;
  line-height: 16px;
  font-size: 12px;
}
.box > h2 {
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.box > h2:hover {
  text-decoration: underline;
}
.box > p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  color: #999;
}
.box > p:hover {
  text-decoration: underline;
}
.play {
  flex: 1;
}
.play > i {
  display: block;
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent transparent #666;
  margin-top: 9px;
  cursor: pointer;
}
</style>