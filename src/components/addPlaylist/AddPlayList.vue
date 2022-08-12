<template>
  <div id="add-playlist">
    <!-- 已添加到播放列表 -->
    <p>已添加到播放列表</p>
  </div>
</template>

<script>
export default {
  name: "AddPlayList",
};
</script>

<style scoped>
#add-playlist {
  position: absolute;
  top: -61px;
  left: -65px;
  clear: both;
  width: 152px;
  height: 49px;
  text-align: center;
  line-height: 37px;
  font-size: 14px;
  color: #fff;
  background: url(https://s2.music.126.net/style/web2/img/frame/playbar.png?94e3c27cde3e37ea97bf99942107a57e)
    no-repeat;
  background-position: 0 -287px;
}
</style>