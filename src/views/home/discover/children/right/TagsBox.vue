<template>
  <div id="tag-box">
    <h3>
      {{ text }}
      <a v-if="showGengduo" href="javascript:;" @click="handleToSinger"
        >{{ title }}&nbsp;></a
      >
    </h3>
  </div>
</template>

<script>
export default {
  name: "TagsBox",
  props: {
    text: {
      type: String,
    },
    showGengduo: {
      type: Boolean,
      defalult: false,
    },
    title: {
      type: String,
    },
    path: {
      type: String,
    },
    id: {},
  },
  methods: {
    handleToSinger() {
      console.log(this.id);
      if (this.id !== 0) {
        this.$router.push({
          path: this.path,
          query: {
            id: this.id,
          },
        });
      } else {
        this.$router.push({
          path: this.path,
        });
      }
    },
  },
};
</script>

<style scoped>
#tag-box {
  margin: 0 20px;
  margin-top: 15px;
  border-bottom: 1px solid #ccc;
}
#tag-box > h3 {
  font-size: 12px;
  font-weight: bolder;
  margin-bottom: 8px;
}
#tag-box > h3 > a {
  float: right;
  color: #666;
}
#tag-box > h3 > a:hover {
  text-decoration: underline;
}
</style>