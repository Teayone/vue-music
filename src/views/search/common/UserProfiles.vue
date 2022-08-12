<template>
  <div id="user-profile" v-if="userprofiles !== null">
    <ul>
      <li
        class="li"
        v-for="(item, index) in userprofiles.userprofiles"
        :key="index"
      >
        <div class="img" @click="toUserHome(item.userId)">
          <img :src="item.avatarUrl" alt="" />
          <span></span>
        </div>
        <div class="title">
          <h5>
            <a href="javascript:;" @click="toUserHome(item.userId)"
              >{{ item.nickname }}
            </a>
            <i :class="item.gender == 2 ? nv : nan"></i>
          </h5>
          <p>
            <span>{{ item.signature }}</span>
          </p>
        </div>
      </li>
    </ul>

    <div class="juzhong">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="userprofiles.userprofileCount"
        :page-size="30"
        @current-change="handleCurrentChange"
        v-if="userprofiles.userprofileCount >= 30"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfiles",
  props: {
    userprofiles: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      nan: "iconfont icon-nan nan",
      nv: "iconfont icon-nv nv",
    };
  },
  methods: {
    toUserHome(id) {
      this.$router.push({
        path: "/user/home",
        query: {
          id,
        },
      });
    },
    handleCurrentChange(newPage) {
      this.$emit("CurrentChangeOne", newPage);
    },
  },
};
</script>

<style scoped>
.li {
  display: flex;
  height: 62px;
  padding: 0 15px;
  border: 1px solid transparent;
}
.li:hover {
  border-color: #ccc;
  background-color: #f2f2f2;
}
.li:nth-child(even) {
  background-color: #f7f7f7;
}
.img {
  position: relative;
  width: 50px;
  height: 50px;
  margin-top: 6px;
  cursor: pointer;
}
.img > img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.img > span {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(https://s2.music.126.net/style/web2/img/coverall.png?af2f3b7d433d2c1545043aae398e9d65)
    no-repeat;
  background-position: -160px 0;
}
.title {
  flex: 2;
  margin-left: 15px;
  line-height: 24px;
  margin-top: 5px;
}
.title a:hover {
  text-decoration: underline;
}
.title > h5 > a {
  font-size: 14px;
  color: #333;
}
.title > p > span {
  color: #888;
  font-size: 12px;
}
.nan {
  color: skyblue;
}
.nv {
  color: pink;
}
.juzhong {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
</style>