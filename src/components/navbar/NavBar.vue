<template>
  <div id="nav-bar">
    <div class="wrap nav-wrap clearfix">
      <div class="nav-logo clearfix">
        <a href="javascript:;" @click="toHome">网易云音乐</a>
      </div>
      <ul class="nav-item clearfix">
        <li
          v-for="(item, index) in nav"
          :key="index"
          class="nav-items"
          @click="handleToPath(index, item.path)"
          :data-index="index"
          :class="{ active: index === curIndex }"
        >
          {{ item.title }}
        </li>
      </ul>
      <div class="nav-tools">
        <!-- 搜索框 -->
        <div class="serch">
          <input
            :class="{ actives: flag }"
            type="text"
            v-model="info"
            @focus="infoKong"
            @blur="infoYou"
            @input="getSearchSugGest"
            @keydown.enter="toSearch"
          />
          <tips
            v-if="searchTips"
            :searchList="searchList"
            :info="info"
            :class="{ tips: !searchTips }"
          ></tips>
        </div>
        <!-- 创作者中心 -->
        <a class="creator" href="javascript:;">创作者中心</a>
        <!-- 登录按钮 ，使用Vuex决定显示登陆后或未登录的盒子-->
        <div class="login" @click="handleToLogin" v-if="headImg === false">
          <a href="javascript:;">登录</a>
        </div>
        <!-- 登陆成功后显示的头像 ，以及鼠标悬浮显示的列表-->
        <div
          class="head-portrait"
          v-else
          @mouseenter="listIsShow = true"
          @mouseleave="listIsShow = false"
        >
          <!-- 头像 -->
          <div class="photo">
            <img :src="headImg" alt="" />
            <!-- <i>1</i> -->
          </div>
          <!-- 显示的列表,默认隐藏 -->
          <ul v-show="listIsShow">
            <li>
              <a
                href="javascript:;"
                @click="handleToUserHome($store.state.profile.userId)"
                >我的主页</a
              >
            </li>
            <li>
              <a
                href="https://gitee.com/xu-qingkuaile/vue_music"
                target="_blank"
                >Git仓库</a
              >
            </li>
            <li>
              <a href="javascript:;" @click="toLevel">我的等级</a>
            </li>
            <li><a href="javascript:;" @click="logOut">退出</a></li>
          </ul>
        </div>
      </div>

      <div id="loginBox" v-if="showLoginBox">
        <!-- 标题 -->
        <h3 @mousedown="mousD">登录<span @click="noneLoginBox">×</span></h3>
        <!-- 二维码登录 -->
        <div id="QR-code" v-if="showQgLogin">
          <!-- 背景图和二维码盒子 -->
          <div class="code-bg" v-if="codeState">
            <!-- 背景图 -->
            <div class="bg"></div>
            <!-- 二维码图 -->
            <div class="code">
              <h3>扫码登陆</h3>
              <div class="code-img">
                <img :src="qrimg" alt="" />
              </div>
              <p>使用<span>网易云音乐APP</span>扫码登陆</p>
            </div>
          </div>
          <!-- 扫码待确认时的登录框 -->
          <div class="confirmed" v-else>
            <!-- 背景+文字 -->
            <div class="bg-title">
              <!-- 背景 -->
              <div class="confirmed-bg"></div>
              <!-- 文字 -->
              <p class="confirmed-title">登陆成功</p>
            </div>
            <p class="queren">请在手机上确认登陆</p>
          </div>
          <!-- 选择其他方式登录 -->
          <button @click="otherLogin">选择其他方式登录</button>
        </div>

        <!-- 其他登陆方式 -->
        <div
          class="phone-login"
          v-else-if="showQgLogin === false && showPhoneLogin"
        >
          <!-- 背景图区域 -->
          <div class="phone-bg"></div>
          <!-- 登录按钮 -->
          <button class="button btn-login" @click="ToLogin">手机号登陆</button>
          <!-- 注册按钮 -->
          <button class="button btn-zhuce">注册</button>
          <br />
          <!-- 同意条款 -->
          <label for="tongyi" class="label">
            <input type="checkbox" id="tongyi" v-model="flagClause" />
            同意
            <a
              v-for="item in clause"
              :key="item.url"
              :href="item.url"
              target="_blank"
              >{{ item.title }}</a
            >
          </label>

          <!-- 右下角返回二维码 -->
          <div class="back-qr-code" @click="backQrBox"></div>
        </div>
        <!-- 手机号登录输入界面 -->
        <div class="phone-login-text" v-else @keyup.enter="denglu">
          <div class="username">
            <input type="tel" placeholder="请输入手机号" v-model="phone" />
          </div>
          <div class="password">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </div>
          <button class="button btn-login" @click="denglu">登录</button>
          <span @click="showPhoneLogin = true">&lt;其他登陆方式</span>
        </div>
      </div>
      <!-- 打开登录框时的遮罩层 -->
      <div class="login-zhezhao" v-if="showLoginBox"></div>
      <!-- 未同意条款协议时显示的文本盒子 -->
      <div id="toast" v-if="showToast">
        请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》
      </div>
      <!-- 密码错误时的弹出框 -->
      <div id="toast2" v-if="showToast2">密码错误</div>
    </div>
  </div>
</template>

<script>
// 发起二维码请求
import { getQrCodeKey, getQrCode, getQrCheck } from "../../api/qr-code";
// 手机号登陆
import { phoneLogin } from "../../api/login";
// 获取用户信息
import { outLogin, getUserAdminDetail } from "../../api/user";
// 搜索相关
import { searchSugGest } from "../../api/search";
// tips组件
import Tips from "./children/Tips.vue";
export default {
  name: "NavBar",
  components: { Tips },
  data() {
    return {
      nav: [
        { title: "发现音乐", path: "/" },
        { title: "我的音乐", path: "/my" },
        { title: "朋友", path: "/friend" },
        { title: "商城", path: "/store" },
        { title: "音乐人", path: "/musician" },
        { title: "下载客户端", path: "/download" },
      ],
      // 根据 path 动态添加类名
      curIndex: 0,
      info: "音乐/视频/电台/用户",
      // 输入框聚焦文字颜色变化
      flag: false,
      // 同意条款
      clause: [
        {
          title: "《服务条款》",
          url: "https://st.music.163.com/official-terms/service",
        },
        {
          title: "《隐私政策》",
          url: "https://st.music.163.com/official-terms/privacy",
        },
        {
          title: "《儿童隐私政策》",
          url: "https://st.music.163.com/official-terms/children",
        },
      ],
      // 判断是否选中同意条款
      flagClause: false,
      // 判断是否打开登录窗口
      showLoginBox: false,
      // 判断是否出现提示信息
      showToast: false,
      // 用户名和密码
      phone: "",
      password: "",
      // 二维码登录窗口默认第一个显示
      showQgLogin: true,
      // 手机登录，其他登陆方式显示
      showPhoneLogin: false,
      // 二维码登录的key
      unikey: "",
      // 二维码 base64的图片
      qrimg: "",
      // 二维码定时器开关
      timer: null,
      // 二维码状态决定显示什么画面
      codeState: true,
      // 密码错误的提示框
      showToast2: false,
      // 用户头像小列表的展开或隐藏
      listIsShow: false,
      // 搜索建议防抖定时器开关
      debounce: null,
      // 搜索建议提示框是否显示
      searchTips: false,
      // 保存搜索建议
      searchList: null,
      // NavBar上的头像
      headImg: JSON.parse(
        localStorage.getItem("headimg")
          ? localStorage.getItem("headimg")
          : "false"
      ),
    };
  },
  created() {
    this.unikey = "";
    this.codeState = true;
    let cookies = localStorage.getItem("userInfo");
    if (cookies) {
      // 如果 cookies 有值，代表已经登陆过了，获取账号信息
      // 这样做是为了如果用户更新了某些内容(头像),能及时刷新到
      this.getUserData();
    }
  },
  mounted() {
    // 解决点击跳转下载模块，下载按钮不会添加类名的 BUG
    let self = this;
    this.$bus.$on("activeRoute", function ({ index, path }) {
      self.handleToPath(index, path);
    });
    // 歌手的主页
    this.$bus.$on("activeRouer", function (index) {
      self.activeRouer(index);
    });

    // 显示登录框
    this.$bus.$on("showLoginBox", function () {
      self.handleToLogin();
    });
    this.$bus.$on("upheadimg", function () {
      self.headImg = JSON.parse(
        localStorage.getItem("headimg")
          ? localStorage.getItem("headimg")
          : "false"
      );
    });
  },
  methods: {
    // 页面刷新时请求，防止出现页面刷新显示登陆
    async getUserData() {
      // 账号信息
      let { data: uad } = await getUserAdminDetail();
      this.$store.commit("USERDETAIL", uad.profile);
      localStorage.setItem("headimg", JSON.stringify(uad.profile.avatarUrl));
    },
    activeRouer(i) {
      this.curIndex = i;
    },
    // 跳转至歌手或其它人的主页
    handleToPath(index, p, id) {
      this.curIndex = index;
      if (this.$route.path === p) {
        return;
      } else {
        if (id) {
          this.$router.push({
            path: p,
            query: {
              id,
            },
          });
        } else {
          this.$router.push(p);
        }
      }
    },
    handleToUserHome(id) {
      this.$router.push({
        path: "/user/home",
        query: {
          id,
        },
      });
    },
    // 输入框聚焦
    infoKong() {
      if (this.info === "音乐/视频/电台/用户") {
        this.info = "";
        this.flag = true;
      } else {
        // else 代表当前输入框有内容，聚焦之后可以获取到输入框里的内容
        // 发起网络请求
        this.getSearchSugGest();
      }
    },
    // 输入框失焦
    infoYou() {
      // 只要失去焦点就关闭tips弹框(加定时器是要等页面跳转了之后在销毁)
      window.setTimeout(() => {
        this.searchTips = false;
      }, 100);
      // 如果 输入框内容为空
      if (!this.info) {
        // 则显示默认数据
        this.info = "音乐/视频/电台/用户";
        // 将标记标记成为聚焦
        this.flag = false;
      } else {
        // 反之就保持之前输入框输入的内容
        this.info = this.info;
      }
    },
    // 键盘按下发起网络请求
    getSearchSugGest() {
      let self = this;
      if (this.debounce) {
        clearTimeout(this.debounce);
      }
      this.debounce = window.setTimeout(() => {
        if (self.info === "") {
          return;
        }
        if (self.info === "音乐/视频/电台/用户") {
          return;
        }
        searchSugGest(self.info).then((v) => {
          if (v.data.code === 200) {
            self.searchList = v.data.result;
            self.searchTips = true;
          }
        });
        this.debounce = null;
      }, 500);
    },
    // 二维码请求
    getQr() {
      let self = this;
      // 发送请求获取二维码
      getQrCodeKey().then((v) => {
        let key = v.data.data.unikey;
        getQrCode(key).then((qrimg) => {
          // 将二维码图片取出
          this.qrimg = qrimg.data.data.qrimg;
          clearInterval(self.timer);
          // 轮询请求二维码状态
          self.timer = window.setInterval(() => {
            let date = new Date();
            getQrCheck(key, date).then((state) => {
              if (state.data.code === 800) {
                self.getQr();
              } else if (state.data.code === 802) {
                self.codeState = false;
              } else if (state.data.code === 803) {
                // 将返回的cookie保存在本地
                localStorage.setItem("userInfo", state.data.cookie);
                // 通过 cookie 请求用户信息
                self.$bus.$emit("login");
                // 当803代表扫码成功关闭登录框，关闭定时器
                clearInterval(self.timer);
                // 关闭登录窗口
                self.noneLoginBox();
                this.$store.commit("SHOW", true);
              }
            });
          }, 1000);
        });
      });
    },
    // 未勾选时的弹出框
    toastShow() {
      let self = this;
      this.showToast = true;
      window.setTimeout(() => {
        self.showToast = false;
      }, 1000);
    },
    // 密码错误时的弹出框
    toastShow2() {
      let self = this;
      this.showToast2 = true;
      window.setTimeout(() => {
        self.showToast2 = false;
      }, 1000);
    },
    // 拖拽登录框
    mousD(e) {
      let OloginBox = document.querySelector("#loginBox");
      let x = e.pageX - OloginBox.offsetLeft; //这是鼠标在盒子内的坐标
      let y = e.pageY - OloginBox.offsetTop; //这是鼠标在盒子内的坐标
      document.onmousemove = function (event) {
        OloginBox.style.left = event.pageX - x + "px";
        OloginBox.style.top = event.pageY - y + "px";
      };
      document.onmouseup = function () {
        document.onmousemove = null;
      };
    },
    // 登录
    handleToLogin() {
      this.getQr();
      this.showLoginBox = true;
    },
    // 隐藏登录框口
    noneLoginBox() {
      this.showLoginBox = false;
      // 隐藏登录窗口之后，重回原样
      clearInterval(this.timer);
      this.showPhoneLogin = false;
      this.showQgLogin = true;
      this.flagClause = false;
      this.unikey = "";
      this.codeState = true;
    },
    // 手机号登陆按钮
    ToLogin() {
      // 判断是否勾选同意
      if (this.flagClause) {
        // 选中就进入输入账号密码界面
        this.showPhoneLogin = false;
      } else {
        // 反之提示用户没有勾选同意
        this.toastShow();
      }
    },
    // 登录
    async denglu() {
      let phone = this.phone;
      let password = this.password;
      // 发起登录请求
      let { data: res } = await phoneLogin(phone, password);
      if (res.code === 200) {
        this.noneLoginBox();
        // 将返回的 token 和 cookie 保存
        localStorage.setItem("userInfo", res.cookie);
        localStorage.setItem("userToken", res.token);
        // 通过事件总线触发登陆后的请求
        this.$bus.$emit("login");
        // 最后通过 Vuex 登陆成功显示登陆成功后的组件
        this.$store.commit("SHOW", false);
      } else {
        this.toastShow2();
      }
    },
    // 从二维码登录跳转到其他登陆方式
    otherLogin() {
      this.showQgLogin = false;
      this.showPhoneLogin = true;
      clearInterval(this.timer);
    },
    // 从其他登录方式返回二维码登陆方式
    backQrBox() {
      if (this.flagClause) {
        this.showPhoneLogin = false;
        this.showQgLogin = true;
        this.getQr();
      } else {
        // 反之提示用户没有勾选同意
        this.toastShow();
      }
    },
    // 退出登录
    logOut() {
      outLogin().then(async (v) => {
        if (v.data.code === 200) {
          localStorage.removeItem("headimg");
          localStorage.removeItem("userInfo");
          this.$store.commit("SHOW", true);
          this.$store.commit("USERDETAIL", null);
          this.$store.commit("USERLEVEL", null);
          this.$store.commit("USERINFO", null);
          if (this.$route.path === "/home") {
            this.$router.replace({
              path: "/home",
              query: {
                t: Date.now(),
              },
            });
          } else {
            this.$router.push("/home");
          }

          this.$bus.$emit("upheadimg");
          this.$bus.$emit("ShiFouDengLu", false);
        }
      });
    },
    // 点击LOGO跳转至首页
    toHome() {
      if (this.$route.path === "/home") {
        return;
      } else {
        this.$router.push("/home");
      }
    },
    // 跳转至搜索页
    toSearch() {
      if (this.info === "") {
        return;
      } else {
        document.querySelector("input").blur();
        clearTimeout(this.debounce);
        this.$router.push({
          path: "/search",
          query: {
            s: this.info,
          },
        });
      }
    },
    // 跳转至等级页面
    toLevel() {
      this.$router.push({
        path: "/level",
      });
    },
  },
};
</script>

<style scoped>
#nav-bar {
  display: flex;
  height: 70px;
  background: #242424;
  border-bottom: 1px solid #000;
}

.nav-logo {
  float: left;
  width: 176px;
  height: 69px;
  background: url(https://s2.music.126.net/style/web2/img/frame/topbar.png?17c0b7ea557621a0aa8fa9c09f903450)
    no-repeat;
}
.nav-logo > a {
  float: left;
  width: 157px;
  height: 100%;
  padding-right: 20px;
  text-indent: -9999px;
}
.nav-item {
  float: left;
}

.nav-item > .nav-items {
  position: relative;
  float: left;
  line-height: 70px;
  cursor: pointer;
  padding: 0 19px;
  color: #ccc;
  text-align: center;
  font-size: 14px;
}
.nav-item > .nav-items.active {
  background-color: #000;
}
.nav-item > .nav-items.active::after {
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  content: "";
  border-width: 7px;
  border-color: transparent transparent #c00014 transparent;
  border-style: solid;
}

.nav-tools {
  position: relative;
  float: left;
  margin-left: 60px;
}

.nav-tools > .serch {
  float: left;
  width: 158px;
  height: 32px;
  margin-top: 19px;
}
.nav-tools > .serch > input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 32px;
  border: 1px solid #ccc;
  outline: none;
  background: url(https://s2.music.126.net/style/web2/img/frame/topbar.png?17c0b7ea557621a0aa8fa9c09f903450)
    no-repeat;
  background-color: #fff;
  background-position: 0 -99px;
  padding-left: 28px;
  font-size: 12px;
  padding-top: 3px;
  color: #9b9b9b;
}
.nav-tools > .serch > input.actives {
  color: #333;
}
.creator {
  display: block;
  float: left;
  margin: 19px 0 0 12px;
  color: #ccc;
  width: 90px;
  height: 32px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #4f4f4f;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.5s;
}
.creator:hover {
  border-color: #ccc;
  color: #fff;
}
.login {
  float: left;
  margin: 19px 0 0 20px;
  font-size: 12px;
  height: 45px;
  line-height: 32px;
  padding: 0 22px 0 0;
}
.login > a {
  color: #787878;
}
.login > a:hover {
  text-decoration: underline;
  color: #666;
}
/* 登陆成功后的头像信息 */
.head-portrait {
  position: relative;
  float: left;
  margin: 19px 0 0 20px;
  padding-right: 18px;
  padding-bottom: 18px;
}
.head-portrait > .photo {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.head-portrait > .photo > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.head-portrait > .photo > i {
  position: absolute;
  right: -6px;
  top: -5px;
  width: 17px;
  height: 17px;
  background: #c20c0c;
  border-radius: 18px;
  text-align: center;
  line-height: 16px;
  font-size: 12px;
  white-space: nowrap;
  color: #fff;
  border: 1px solid #242424;
  box-sizing: border-box;
  cursor: default;
}
.head-portrait > ul {
  position: absolute;
  width: 158px;
  top: 38px;
  background: #2b2b2b;
  border: 1px solid #202020;
  text-align: center;
  right: -46px;
  font-size: 12px;
  border-radius: 6px;
  z-index: 9999;
}
.head-portrait > ul::after {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 7px;
  border-style: solid;
  border-color: transparent transparent #2d2d2d transparent;
  content: "";
}
.head-portrait > ul > li {
  width: 100%;
}
.head-portrait > ul > li > a {
  display: block;
  height: 34px;
  line-height: 34px;
  color: #ccc;
}
.head-portrait > ul > li > a.active {
  background: #353535;
  color: #fff;
}
.head-portrait > ul > li > a:hover {
  background: #353535;
  color: #fff;
}
/* 登录框 */
#loginBox {
  box-sizing: border-box;
  position: fixed;
  width: 530px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  z-index: 9999;
  background: #fff;
}
#loginBox > h3 {
  box-sizing: border-box;
  position: relative;
  height: 38px;
  line-height: 38px;
  padding: 0 45px 0 18px;
  background-color: #2d2d2d;
  color: #fff;
  font-size: 14px;
  cursor: move;
}
#loginBox > h3 > span {
  position: absolute;
  right: 15px;
  top: 0;
  font-size: 25px;
  cursor: pointer;
}
/* 遮罩层 */
.login-zhezhao {
  position: fixed;
  opacity: 0;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
}
.phone-login {
  padding: 35px 45px;
}
.phone-login > .phone-bg {
  height: 120px;
  background-image: url(https://s2.music.126.net/style/web2/img/platform.png?45171ec2c3ac8c3ac1a91ef43720b8ea);
  background-repeat: no-repeat;
}
.button {
  width: 224px;
  height: 31px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 10px;
  cursor: pointer;
}
.button.btn-login {
  background-color: #2475c3;
  color: #fff;
}
.phone-login > .button.btn-zhuce {
  background-color: #f6f6f6;
  color: #333;
  margin-bottom: 30px;
}
.label {
  font-size: 12px;
  color: #999999;
}
.label > input {
  margin-right: -2px;
}
.label > a {
  color: #507daf;
}
/* 消息提示 */
#toast {
  /* display: inline-block; */
  position: fixed;
  width: 245px;
  line-height: 16px;
  text-align: center;
  font-size: 14px;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(9, 9, 9, 0.6);
  padding: 10px 5px;
  color: #fff;
  z-index: 9999;
}
#toast2 {
  /* display: inline-block; */
  position: fixed;
  width: 100px;
  line-height: 16px;
  text-align: center;
  font-size: 14px;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(9, 9, 9, 0.8);
  padding: 10px 5px;
  color: #fff;
  z-index: 9999;
}

/* 真正的的登录，需要输入手机号和密码 */
.phone-login-text {
  padding: 30px 0 43px;
  width: 220px;
  margin: 0 auto;
}
.phone-login-text > div {
  box-sizing: border-box;
  margin: 10px 0;
  width: 220px;
  height: 32px;
}
.phone-login-text > div > input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  outline: none;
}
.phone-login-text > span {
  position: absolute;
  left: 3px;
  bottom: 3px;
  color: #507daf;
  font-size: 12px;
  cursor: pointer;
}
.back-qr-code {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 52px;
  height: 52px;
  background: url(https://s2.music.126.net/style/web2/img/qr_login_icon.png?1cd544353ec1c960bdb1e039cc1d2429);
  background-size: contain;
  cursor: pointer;
}
/*二维码登录 */
#QR-code {
  padding: 38px 0 20px;
  box-sizing: border-box;
}
.code-bg {
  display: flex;
  margin-bottom: 60px;
}
.code-bg > .bg {
  margin-left: 101px;
  width: 125px;
  height: 220px;
  background: url(https://s2.music.126.net/style/web2/img/qr_guide.png?62766215142f45655bf99158b8620a34);
  background-size: contain;
}
.code-bg > .code {
  margin-left: 50px;
  text-align: center;
}
.code-bg > .code > h3 {
  font-size: 18px;
  color: #333;
}
.code-bg > .code > .code-img {
  width: 130px;
  height: 130px;
  padding: 4px;
  margin: 13px auto;
}
.code-bg > .code > .code-img > img {
  width: 100%;
  height: 100%;
}
.code-bg > .code > p {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
}
.code-bg > .code > p > span {
  color: #0c73c2;
  cursor: pointer;
  margin: 0 5px;
}
.code-bg > .code > p > span:hover {
  text-decoration: underline;
}
#QR-code > button {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
  border-radius: 20px;
  border: 1px solid #979797;
  box-sizing: border-box;
  padding: 6px 10px;
  font-size: 12px;
  text-align: center;
  background: #fff;
  cursor: pointer;
}
/* 待确认的登录框 */
.confirmed {
  width: 100%;
}
.confirmed > .bg-title {
  width: 100%;
}
.confirmed > .bg-title > .confirmed-bg {
  width: 140px;
  height: 140px;
  background: url(https://s2.music.126.net/style/web2/img/scan_success@2x.png?c65127652f2e23d1acf9ca892bc4fbfe);
  background-size: contain;
  margin: 0 auto;
}
.confirmed > .bg-title > .confirmed-title {
  width: 140px;
  margin: 0 auto;
  text-align: center;
  font-size: 18px;
  margin-top: 12px;
  color: rgba(0, 0, 0, 0.8);
  line-height: 24px;
  font-weight: 450;
  margin-bottom: 10px;
}
.confirmed > .queren {
  width: 140px;
  margin: 0 auto;
  margin-bottom: 60px;
  font-size: 14px;
  text-align: center;
}
/* 弹出框禁止显示 */
.tips {
  display: none;
}
</style>