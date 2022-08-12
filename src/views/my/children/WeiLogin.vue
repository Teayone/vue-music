<template>
  <div id="wei-login">
    <h2 class="title">登陆网易云音乐</h2>
    <button class="btn" @click="toLogin">立即登录</button>
    <div class="img">
      <img src="../../../assets/img/bz10.jpg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "WeiLogin",
  methods: {
    toLogin() {
      this.$bus.$emit("showLoginBox");
    },
  },
};
</script>

<style scoped>
#wei-login {
  padding-top: 104px;
  text-align: center;
}
.title {
  font-size: 32px;
  color: pink;
  margin-bottom: 20px;
}
.btn {
  width: 167px;
  height: 45px;
  background: pink;
  border: none;
  color: #333;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}
.btn:hover {
  background: hotpink;
}
.img {
  margin-top: 30px;
  width: 100%;
  height: 500px;
}
.img > img {
  width: 100%;
  height: 100%;
}
</style>