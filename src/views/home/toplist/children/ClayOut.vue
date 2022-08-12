<template>
  <div id="clay-out" class="wrap3">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#clay-out {
  display: flex;
  border: 1px solid #ccc;
}
.left {
  width: 240px;
  background: #f9f9f9;
  padding: 30px 0;
}
.right {
  width: 740px;
  padding: 40px;
  border-left: 1px solid #ccc;
  background: #fff;
}
</style>