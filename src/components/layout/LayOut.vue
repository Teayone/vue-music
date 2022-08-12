<template>
  <div class="wrap3 main">
    <div class="main-left"><slot name="left"></slot></div>
    <div class="main-right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "LayOut",
};
</script>

<style scoped>
.main {
  display: flex;
  background: #fff;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.main-left {
  box-sizing: border-box;
  width: 730px;
  padding: 47px 30px 40px 39px;
}
.main-right {
  width: 250px;
  box-sizing: border-box;
  border-left: 1px solid #ccc;
}
</style>