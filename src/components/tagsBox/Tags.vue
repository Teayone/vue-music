<template>
  <div id="tag-box">
    <h3>
      {{ text }}
    </h3>
  </div>
</template>

<script>
export default {
  name: "Tags",
  props: {
    text: {
      type: String,
    },
  },
};
</script>

<style scoped>
#tag-box {
  /* margin: 0 20px; */
  margin-top: 50px;
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