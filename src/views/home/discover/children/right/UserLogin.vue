<template>
  <div id="user-login">
    <!-- 未登录时的盒子 -->
    <div class="wei-login" v-if="$store.state.whetherLogin">
      <!-- 用户登录和登陆成功后的显示内容组件 -->
      <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      <a
        href="javascript:;"
        class="login"
        title="用户登录"
        @click="handleToLogin"
        >用户登录</a
      >
    </div>
    <!-- 登陆成功后的盒子 -->
    <div class="cheng-login" v-else>
      <div
        v-if="
          $store.state.profile &&
          $store.state.userLevel &&
          $store.state.userDetail
        "
      >
        <div class="cheng-box">
          <!-- 左侧头像盒子 -->
          <div
            class="cheng-img-box"
            @click="handleToUserHome($store.state.userLevel.userId)"
          >
            <img :src="$store.state.profile.avatarUrl" alt="" />
          </div>
          <!-- 右侧昵称，等级，签到盒子 -->
          <div class="cheng-user-info">
            <!-- 昵称 -->
            <h4>
              <a
                href="javascript:;"
                :title="$store.state.profile.nickname"
                @click="handleToUserHome($store.state.userLevel.userId)"
                >{{ $store.state.profile.nickname }}</a
              >
            </h4>
            <!-- 等级 -->
            <p>Lv.{{ $store.state.userLevel.level }}</p>
            <br />
            <!-- 签到按钮 -->
            <button @click="qiandao" :class="{ deactive: isFlag }">
              签&nbsp;&nbsp;到
            </button>
          </div>
        </div>
        <!-- 动态关注粉丝 -->
        <ul>
          <li>
            <a href="javascript:;"
              ><strong>{{ $store.state.userDetail.eventCount }}</strong
              ><span>动态</span></a
            >
          </li>
          <li>
            <a href="javascript:;"
              ><strong>{{ $store.state.userDetail.follows }}</strong
              ><span>关注</span></a
            >
          </li>
          <li>
            <a href="javascript:;"
              ><strong>{{ $store.state.userDetail.followeds }}</strong
              ><span>粉丝</span></a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserLogin",
  data() {
    return {
      // 是否签到
      isFlag: false,
    };
  },
  created() {},
  methods: {
    // 点击打开登陆框
    handleToLogin() {
      this.$bus.$emit("showLoginBox");
    },
    // 跳转到用户主页
    handleToUserHome(id) {
      this.$router.push({
        path: "/user/home",
        query: {
          id,
        },
      });
    },
    // 签到
    qiandao() {
      return;
    },
  },
};
</script>

<style scoped>
#user-login {
  box-sizing: border-box;
  width: 100%;
  background: #fefefe;
  border: 1px solid #ccc;
  border-left: none;
  border-top: none;
  border-bottom-color: #b2b2b2;
  /* box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.2); */
}
.wei-login {
  height: 126px;
}
.wei-login > p {
  width: 205px;
  margin: 0 auto;
  padding: 16px;
  font-size: 12px;
  line-height: 22px;
  color: #666;
}

.login {
  display: block;
  width: 100px;
  height: 31px;
  line-height: 31px;
  text-align: center;
  background: #d8131a;
  color: #fff;
  font-size: 12px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.cheng-login {
  position: relative;
  height: 165px;
  padding: 0 20px;
  padding-top: 20px;
}
.cheng-box {
  display: flex;
}
.cheng-box > .cheng-img-box {
  width: 86px;
  height: 86px;
  padding: 2px;
  box-sizing: border-box;
  border: 1px solid #dadada;
  background: #fff;
  cursor: pointer;
}
.cheng-box > .cheng-img-box > img {
  width: 100%;
  height: 100%;
}
.cheng-box > .cheng-user-info {
  margin-left: 18px;
  width: 115px;
}

.cheng-box > .cheng-user-info > h4 > a {
  display: block;
  color: #333;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  max-width: 60px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
  margin-top: 5px;
}
.cheng-box > .cheng-user-info > p {
  display: inline-block;
  padding: 3px 9px;
  border: 1px solid #999999;
  color: #999;
  border-radius: 10px;
  font-size: 12px;
  font-style: italic;
  margin-bottom: 12px;
  font-weight: 700;
  cursor: pointer;
}
.cheng-box > .cheng-user-info > p:hover {
  border-color: #888888;
  color: #777777;
}
.cheng-box > .cheng-user-info > button {
  border-radius: 6px;
  background: #4c95da;
  color: #fff;
  text-align: center;
  height: 31px;
  padding: 0 36px;
  font-size: 12px;
  box-sizing: border-box;
  border: 1px solid #428dd6;
  cursor: pointer;
  transition: all 0.5s;
}
/* 签到成功后的样式 */
.deactive {
  background: #ececec;
  color: #bebebe;
  cursor: default;
}

.cheng-box > .cheng-user-info > button:hover {
  background: #3987d0;
}
.cheng-box > .cheng-user-info > h4 > a:hover {
  text-decoration: underline;
}
.cheng-login ul {
  position: absolute;
  bottom: 20px;
}
.cheng-login ul > li {
  float: left;
  height: 40px;
  padding: 0 18px;
  border-right: 1px solid #e4e4e4;
}
.cheng-login ul > li:first-child {
  padding-left: 0;
}
.cheng-login ul > li:last-child {
  border-right: none;
}
.cheng-login ul > li > a {
  display: block;
  width: 100%;
  height: 100%;
  color: #666;
}
.cheng-login ul > li > a:hover {
  color: #0c73c2;
}
.cheng-login ul > li > a > strong {
  display: block;
  font-size: 20px;
  margin-bottom: 3px;
  /* color: #666; */
}

.cheng-login ul > li > a > span {
  font-size: 12px;
  margin-left: 2px;
  /* color: #666; */
}
</style>