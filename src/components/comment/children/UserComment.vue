<template>
  <div>
    <div id="user-comment" v-for="item in comments" :key="item.commentId">
      <!-- 用户评论组件 -->
      <!-- 左侧头像 -->
      <div class="user-img" @click="toUserHome(item.user.userId)">
        <img :src="item.user.avatarUrl" alt="" />
      </div>
      <!-- 右侧评论内容 -->
      <div class="user-info">
        <!-- 用户昵称和评论内容 -->
        <p>
          <a href="javascript:;" @click="toUserHome(item.user.userId)"
            >{{ item.user.nickname }}:</a
          >
          <span>{{ item.content }}</span>
        </p>
        <!-- 评论时间和点赞按钮 -->
        <div class="dz">
          <p class="date">{{ item.time | formatDate }}</p>
          <p class="zan">
            <i class="iconfont icon-dianzan"></i
            ><span v-if="item.likedCount !== 0">({{ item.likedCount }})</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserComment",
  props: ["comments"],
  filters: {
    formatDate(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let mm = date.getMinutes();
      mm = mm < 10 ? "0" + mm : mm;
      return `${y}年${m}月${d}日 ${h}:${mm}`;
    },
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
  },
};
</script>

<style scoped>
#user-comment {
  display: flex;
  font-size: 12px;
  margin: 15px 0;
  border-bottom: 1px dotted #ccc;
}
#user-comment:last-child {
  border-bottom: none;
}
.user-img {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.user-img > img {
  width: 100%;
  height: 100%;
}
.user-info {
  flex: 1;
  margin-left: 15px;
  line-height: 20px;
  margin-top: 2px;
}
.user-info > p > a {
  color: #0c73c2;
  margin-right: 5px;
}
.user-info > p > a:hover {
  text-decoration: underline;
}
.dz {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  color: #999;
}
.dz > .zan > i {
  margin-right: 10px;
  cursor: pointer;
  font-size: 18px;
  color: #2a8ad3;
}
.dz > .zan > i:hover {
  color: #094d7c;
}
</style>