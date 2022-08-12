<template>
  <div id="mvideo">
    <tab-bar :items="items"></tab-bar>
    <lay-out>
      <template #left>
        <!-- 视频组件 -->
        <video-box
          :Vdetail="Vdetail"
          :Vurl="Vurl"
          @toggleBrs="toggleBrs"
          ref="videoBox"
        ></video-box>
        <!-- 评论组件 -->
        <div style="margin-top: 100px"></div>
        <com-ment
          :hotComments="hotComments"
          :comments="comments"
          :total="total"
          @CurrentChange="CurrentChange"
          :commentType="1"
        ></com-ment>
      </template>
      <template #right>
        <tags-box text="MV简介"></tags-box>
        <!-- mv简介盒子 -->
        <div class="mv-info" v-if="Vdetail">
          <p>发布时间：{{ Vdetail.publishTime }}</p>
          <p>播放次数：{{ Vdetail.playCount | formatPlayCount }}次</p>
        </div>

        <tags-box text="相似MV"></tags-box>
        <video-recommend :Pmv="Pmv"></video-recommend>
      </template>
    </lay-out>
  </div>
</template>

<script>
import TabBar from "../../components/tabbar/TabBar.vue";
import LayOut from "../../components/layout/LayOut.vue";
import VideoBox from "../../components/Videobox/VideoBox.vue";
import ComMent from "../../components/comment/ComMent.vue";
import TagsBox from "../home/discover/children/right/TagsBox.vue";
import VideoRecommend from "../../components/videoRecommend/VideoRecommend.vue";
import { getMvUrl, getMvDetail, getMvComMent, getSimiMV } from "../../api/api";
export default {
  name: "Mvideo",
  components: { TabBar, LayOut, VideoBox, ComMent, TagsBox, VideoRecommend },
  data() {
    return {
      items: [
        { title: "推荐", path: "/home" },
        { title: "排行榜", path: "/toplist" },
        { title: "歌单", path: "/playlist" },
        { title: "主播电台", path: "/djradio" },
        { title: "歌手", path: "/artist" },
        { title: "新碟上架", path: "/album" },
      ],
      Vdetail: null,
      Vurl: null,
      hotComments: null,
      comments: null,
      total: null,
      // 推荐mv
      Pmv: null,
    };
  },
  created() {
    let id = this.$route.query.mvid;
    this.getData(id);
    this.$bus.$emit("activeRouer", 0);
  },
  mounted() {
    // 激活时,触发tabbar
    this.$bus.$emit("activeChildrenRoute", null);
    if (this.$store.state.flag) {
      this.$store.commit("ISFLAG");
      this.$bus.$emit("pause");
    }
  },
  methods: {
    async getData(id) {
      let { data: mvDeatil } = await getMvDetail(id);
      let { data: mvUrl } = await getMvUrl(id);
      this.Vdetail = mvDeatil.data;
      this.Vurl = mvUrl.data;
      // mv评论
      let { data: com } = await getMvComMent(id);
      this.hotComments = com.hotComments;
      this.comments = com.comments;
      this.total = com;
      // 获取相似 mv
      let { data: simiMv } = await getSimiMV(id);
      this.Pmv = simiMv.mvs;
    },
    toggleBrs(r) {
      let id = this.$route.query.mvid;
      let videoBox = this.$refs.videoBox;
      getMvUrl(id, r).then((v) => {
        this.Vurl = v.data.data;
        // 成功之后调用子组件的方法
        setTimeout(() => {
          videoBox.resetBrs();
        }, 200);
      });
    },
    async CurrentChange(newPage) {
      let id = this.$route.query.mvid;
      if (newPage === 1) {
        let { data: com } = await getMvComMent(id);
        this.hotComments = com.hotComments;
        this.comments = com.comments;
      } else if (this.total.total >= 5000) {
        // 重新发送评论请求根据分页数据
        let { data: com } = await getMvComMent(
          id,
          newPage,
          this.comments[this.comments.length - 1].time
        );
        this.hotComments = [];
        this.comments = com.comments;
      } else {
        // 重新发送评论请求根据分页数据
        let { data: com } = await getMvComMent(id, newPage);
        this.hotComments = [];
        this.comments = com.comments;
      }
    },
  },
};
</script>

<style scoped>
.mv-info {
  margin: 15px 20px 30px;

  font-size: 12px;
  color: #999;
}
.mv-info > p {
  line-height: 18px;
}
</style>