<template>
  <div id="c-title">
    <h2 :style="ff">
      {{ text }} <span v-if="num">({{ num }})</span>
    </h2>
  </div>
</template>

<script>
export default {
  name: "Ctext",
  props: ["text", "num", "ff"],
};
</script>

<style scoped>
#c-title {
  margin: 30px 0;
  height: 33px;
  border-bottom: 2px solid #c02c0c;
}
h2 {
  font-size: 20px;
  color: #333;
}
</style>