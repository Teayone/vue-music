<template>
  <div id="video-detail">
    <tab-bar :items="items"></tab-bar>
    <lay-out>
      <template #left>
        <video-box
          :videoDetail="videoDetail"
          :VideoUrl="videoUrl"
          @toggleBrs="toggleBrs"
          ref="videoBox"
        ></video-box>
        <div style="margin-top: 100px"></div>
        <com-ment
          :hotComments="hotComments"
          :comments="comments"
          :total="total"
          :commentType="5"
          @CurrentChange="CurrentChange"
        ></com-ment>
      </template>
      <template #right>
        <tags-box text="视频简介"></tags-box>
        <div class="video-info" v-if="videoDetail">
          <p class="publish-time">
            发布时间：{{ videoDetail.publishTime | forMatDate }}
          </p>
          <p class="play-count">
            播放次数：{{ videoDetail.playTime | formatPlayCount }}次
          </p>
          <p class="info-text">{{ videoDetail.title }}</p>
        </div>
        <tags-box text="相关推荐"></tags-box>
        <video-recommend :Pvideo="Pvideo"></video-recommend>
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
import {
  getVideoUrl,
  getVideoDetail,
  getVideoComMent,
  getRelatedAllvideo,
} from "../../api/api";
export default {
  name: "VideoDetail",
  components: { LayOut, TabBar, VideoBox, ComMent, TagsBox, VideoRecommend },
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
      videoDetail: null,
      videoUrl: null,
      hotComments: null,
      comments: null,
      total: null,
      Pvideo: null,
    };
  },
  created() {
    let id = this.$route.query.id;
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
      let { data: vdetail } = await getVideoDetail(id);
      let { data: vurl } = await getVideoUrl(id);
      this.videoDetail = vdetail.data;
      this.videoUrl = vurl;
      let { data: com } = await getVideoComMent(id);
      this.hotComments = com.hotComments;
      this.comments = com.comments;
      this.total = com;
      let { data: relatedVideo } = await getRelatedAllvideo(id);
      this.Pvideo = relatedVideo.data;
    },
    async CurrentChange(newPage) {
      let id = this.$route.query.id;
      if (newPage === 1) {
        let { data: com } = await getVideoComMent(id);
        this.hotComments = com.hotComments;
        this.comments = com.comments;
      } else if (this.total.total >= 5000) {
        // 重新发送评论请求根据分页数据
        let { data: com } = await getVideoComMent(
          id,
          newPage,
          this.comments[this.comments.length - 1].time
        );
        this.hotComments = [];
        this.comments = com.comments;
      } else {
        // 重新发送评论请求根据分页数据
        let { data: com } = await getVideoComMent(id, newPage);
        this.hotComments = [];
        this.comments = com.comments;
      }
    },
    // 切换清晰度,失效(暂无接口参数)
    toggleBrs(r) {
      let id = this.$route.query.id;
      let videoBox = this.$refs.videoBox;
      getVideoUrl(id, r).then((v) => {
        this.videoUrl = v.data;
        // 成功之后调用子组件的方法
        setTimeout(() => {
          videoBox.resetBrs();
        }, 200);
      });
    },
  },
};
</script>

<style scoped>
.video-info {
  margin: 20px 20px 40px;
}
.video-info > p {
  line-height: 18px;
  color: #999;
  font-size: 12px;
}
.video-info > .info-text {
  color: #333;
  margin-top: 15px;
  white-space: pre-line;
}
</style>