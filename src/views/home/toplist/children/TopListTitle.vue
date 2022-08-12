<template>
  <div id="top-list-title">
    <h2>{{ text }}</h2>
  </div>
</template>

<script>
export default {
  name: "TopListTitle",
  props: ["text"],
};
</script>

<style scoped>
#top-list-title {
  padding: 0 10px 12px 15px;
  margin-left: -3px;
  margin-top: 15px;
}
#top-list-title > h2 {
  font-size: 14px;
  font-weight: bold;
}
</style>