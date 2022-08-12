<template>
  <div class="down-load">
    <p>查看更多内容，请下载客户端</p>
    <button @click="handleToDownLoad">立即下载</button>
  </div>
</template>

<script>
export default {
  name: "DownLoad",
  methods: {
    handleToDownLoad() {
      this.$router.push("/download");
    },
  },
};
</script>

<style scoped>
.down-load {
  width: 100%;
  height: 66px;
  text-align: center;
  margin: 30px 0;
  font-size: 13px;
  color: #666;
}
.down-load > button {
  margin-top: 20px;
  width: 120px;
  border-radius: 18px;
  border: 1px solid #ff1d12;
  background: #ff1d12;
  color: #fff;
  font-size: 12px;
  line-height: 30px;
  cursor: pointer;
}
</style>