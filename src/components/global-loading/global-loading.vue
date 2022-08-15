<template>
  <div>
    <div class="loading">
      <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  name: "global-loading",
};
</script>

<style>
@import url("../../assets/css/spinkit.css");
.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10000;
}
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100001;
  font-size: 26px;
  color: #333;
}
</style>
