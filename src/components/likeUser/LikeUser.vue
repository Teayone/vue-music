<template>
  <div id="like-user">
    <!-- 喜欢这首XX的八个用户 -->
    <ul class="user" v-if="subscribers !== null">
      <li
        v-for="item in subscribers"
        :key="item.userId"
        @click="handleToUserHome(item.userId)"
      >
        <img :src="item.avatarUrl" alt="" :title="item.nickname" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LikeUser",
  props: {
    subscribers: {
      type: Array,
      default() {
        return null;
      },
    },
  },
  methods: {
    handleToUserHome(id) {
      this.$router.push({
        path: "/user/home",
        query: { id },
      });
    },
  },
};
</script>

<style scoped>
#like-user {
  margin: 20px 20px;
}
.user {
  display: flex;
  flex-wrap: wrap;
}
.user > li {
  width: 40px;
  height: 40px;
  margin-right: 15px;
  margin-bottom: 15px;
}
.user > li:nth-child(4n) {
  margin-right: 0;
}
.user > li > img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>