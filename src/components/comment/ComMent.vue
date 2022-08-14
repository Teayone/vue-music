<template>
  <div id="comment" ref="ment">
    <h3>
      评论 <span v-if="total !== null">共{{ total.total }}条评论</span>
    </h3>
    <!-- 发送评论区 -->
    <div class="my-comment">
      <!-- 左侧头像 -->
      <div class="my-img">
        <!-- 未登录时的头像 -->
        <img :src="userImg" alt="" v-if="flag" />
      </div>
      <div class="ping">
        <!-- 评论输入框 -->
        <div class="ipt" @click="ShiFouDengLu">
          <textarea
            class="textarea"
            required
            placeholder="评论"
            maxlength="140"
            v-model="msg"
            style="resize: none"
          ></textarea>
        </div>
        <!-- 评论按钮 -->
        <a href="javascript:;" class="pinglun-btn" @click="faSongMent">评论</a>
      </div>
    </div>

    <div v-if="hotComments && hotComments.length !== 0">
      <!-- 精彩评论区 -->
      <tags text="精彩评论"></tags>
      <!-- 用户评论组件 -->
      <user-comment :comments="hotComments"></user-comment>
    </div>
    <!-- 最新评论区 -->
    <div v-if="comments && comments.length !== 0">
      <tags v-if="total" :text="'最新评论' + '(' + total.total + ')'"></tags>
      <user-comment :comments="comments"></user-comment>
    </div>

    <!-- 分页 -->
    <div class="fenye" v-if="total && total.total !== 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total.total"
        :page-size="20"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Tags from "../tagsBox/Tags.vue";
import UserComment from "./children/UserComment.vue";
import { sendComment } from "../../api/api";
import { nextTick } from "process";
export default {
  name: "ComMent",
  components: { Tags, UserComment },
  props: ["hotComments", "comments", "total", "commentType"],
  data() {
    return {
      flag: true,
      msg: "",
      // 是否登录,默认false
      isLogin: false,
      comment: null,
    };
  },
  created() {
    let userInfo = localStorage.getItem("userInfo");
    // 有值代表以登录
    if (userInfo) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
  mounted() {
    let _this = this;
    this.comment = document.getElementById("comment");
    this.$bus.$on("ToComment", () => {
      this.comment.scrollIntoView({ behavior: "smooth" });
    });
    this.$bus.$on("ShiFowDengLu", function (value) {
      _this.isLogin = value;
    });
  },
  methods: {
    // 如果未登录，点击评论框则会跳出登录框
    ShiFouDengLu() {
      if (this.isLogin) {
        return;
      } else {
        // 代表未登录 显示登录框
        this.$bus.$emit("showLoginBox");
      }
    },
    // 发送评论
    faSongMent() {
      sendComment({
        t: 1,
        type: this.commentType,
        id: this.$route.query.id,
        content: this.msg,
      }).then((v) => {
        // 可以评论出去，但是，刷新了评论接口没有自己的评论，手机上就有
        this.msg = "";
        console.log(v);
      });
    },
    // 当前页改变
    handleCurrentChange(newPage) {
      // 父传子
      this.$emit("CurrentChange", newPage);
      this.$nextTick(() => {
        this.comment.scrollIntoView({ behavior: "smooth" });
      });
    },
  },
  computed: {
    userImg() {
      if (this.isLogin) {
        let headimg = JSON.parse(localStorage.getItem("headimg"));
        return headimg;
      } else {
        return "https://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50";
      }
    },
  },
};
</script>

<style scoped>
#comment > h3 {
  font-size: 20px;
  border-bottom: 2px solid #c20c0c;
  padding-bottom: 8px;
}
#comment > h3 > span {
  margin-left: 15px;
  font-size: 12px;
  color: #666666;
}
.my-comment {
  display: flex;
  margin-top: 20px;
}
.my-img {
  width: 50px;
  height: 50px;
}
.my-img > img {
  width: 100%;
  height: 100%;
}
.ipt {
  box-sizing: border-box;
  width: 585px;
  margin-left: 10px;
}

.textarea {
  width: 100%;
  height: 63px;
  padding: 5px 6px;
  outline: none;
}
.ping {
  position: relative;
}
.pinglun-btn {
  position: absolute;
  right: -12px;
  bottom: -30px;
  background: #3988d3;
  color: #fff;
  border: 1px solid #3988d3;
  font-size: 12px;
  border-radius: 5px;
  width: 46px;
  height: 25px;
  text-align: center;
  line-height: 25px;
}
.pinglun-btn:hover {
  background: #4d98de;
}
.fenye {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
</style>
