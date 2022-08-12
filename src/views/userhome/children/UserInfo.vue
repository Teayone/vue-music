<template>
  <div id="user-info" v-if="userData !== null">
    <div class="user-img" v-if="userData.profile">
      <img :src="userData.profile.avatarUrl" alt="" />
    </div>
    <div class="info" v-if="userData.profile">
      <h2>
        {{ userData.profile.nickname }} <span>Lv.{{ userData.level }}</span>
        <i :class="sex"></i>
      </h2>
      <ul class="ul" v-if="userData.profile">
        <li>
          <a href="javascript:;">
            {{ userData.profile.eventCount }}
            <span>动态</span>
          </a>
        </li>
        <li>
          <a href="javascript:;" v-if="userData.profile">
            {{ userData.profile.followeds }}
            <span>粉丝</span>
          </a>
        </li>
        <li>
          <a href="javascript:;" v-if="userData.profile">
            {{ userData.profile.follows }}
            <span>关注</span>
          </a>
        </li>
      </ul>
      <div class="text">
        <!-- <p>所在地区：河北省-廊坊市</p> -->
        <p>社交网络：<i class="iconfont icon-weibo weibo"></i></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: {
    userData: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      sex: "",
    };
  },
  created() {
    setTimeout(() => {
      if (this.userData.profile.gender === 2) {
        this.sex = "iconfont icon-nv nv";
      } else {
        this.sex = "iconfont icon-nan nan";
      }
    }, 200);
  },
};
</script>

<style scoped>
#user-info {
  display: flex;
}
.user-img {
  position: relative;
  width: 188px;
  height: 188px;
  border: 1px solid #ccc;
}
.user-img > img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 180px;
  height: 180px;
}
.info {
  flex: 1;
  margin-left: 30px;
}
.info > h2 {
  font-size: 22px;
  color: #000;
  margin-top: 5px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
}
.info > h2 > span {
  display: inline-block;
  cursor: pointer;
  height: 19px;
  line-height: 21px;
  color: #e03a24;
  border: 1px solid #e03a24;
  border-radius: 10px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: bold;
  font-style: italic;
}
.nan {
  color: skyblue;
  font-size: 24px;
  vertical-align: -4px;
  font-weight: bold;
  margin-left: 5px;
}
.nv {
  color: pink;
  font-size: 24px;
  vertical-align: -4px;
  font-weight: bold;
  margin-left: 5px;
}
.ul {
  margin-top: 10px;
  display: flex;
}
.ul > li {
  padding: 0 40px 0 20px;
  border-right: 1px solid #ddd;
}
.ul > li:last-child {
  border-right: none;
}
.ul > li > a {
  font-size: 24px;
  display: block;
  font-weight: normal;
  cursor: pointer;
  color: #333;
}
.ul > li > a:hover {
  color: skyblue;
}
.ul > li > a:hover > span {
  color: skyblue;
}
.ul > li > a > span {
  display: block;
  font-size: 12px;
  margin-top: 5px;
  color: #333;
}
.text {
  margin-top: 20px;
  font-size: 12px;
  color: #999;
  line-height: 24px;
}
.text .weibo {
  color: red;
  cursor: pointer;
  vertical-align: -1px;
}
</style>