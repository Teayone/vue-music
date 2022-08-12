<template>
  <div id="collect-songs">
    <collect-songs-child
      v-if="isShow"
      @closeBox="closeBox"
      :track="track"
    ></collect-songs-child>
  </div>
</template>

<script>
import CollectSongsChild from "./children/CollectSongsChild.vue";
export default {
  name: "CollectSongs",
  components: { CollectSongsChild },
  data() {
    return {
      // 弹出框是否显示
      isShow: false,
      track: 0,
    };
  },
  mounted() {
    this.$bus.$on("openBox", (id) => {
      this.isShow = true;
      this.track = id;
    });
  },
  methods: {
    closeBox() {
      this.isShow = false;
    },
  },
};
</script>

<style scoped>
</style>