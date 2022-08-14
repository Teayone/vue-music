<template>
  <div id="yi-login">
    <div class="left">
      <div class="ul">
        <div class="tabs">
          <a href="javascript:;">我的歌手(3)</a>
        </div>

        <div class="tabs" @click="myList = !myList">
          <i :class="{ active: myList }"></i
          ><a href="javascript:;" v-if="myPlaylist"
            >创建的歌单({{ myPlaylist.length }})</a
          >
        </div>
        <div class="info" v-show="myList">
          <div
            class="info-box"
            v-for="item in myPlaylist"
            :key="item.id"
            @click="toMyPlaylist(item.id)"
          >
            <!-- 头像 -->
            <div class="info-img">
              <img :src="item.coverImgUrl" alt="" />
            </div>
            <!-- 歌单名字 -->
            <div class="list-name">
              <h5>{{ item.name }}</h5>
              <p>{{ item.trackCount }}首</p>
            </div>
          </div>
        </div>
        <div class="tabs" @click="shouCangList = !shouCangList">
          <i :class="{ active: shouCangList }"></i
          ><a href="javascript:;" v-if="shouCangPlaylist"
            >收藏的歌单({{ shouCangPlaylist.length }})</a
          >
        </div>
        <div class="info" v-show="shouCangList">
          <div
            class="info-box"
            v-for="item in shouCangPlaylist"
            :key="item.id"
            @click="toMyPlaylist(item.id)"
          >
            <!-- 头像 -->
            <div class="info-img">
              <img :src="item.coverImgUrl" alt="" />
            </div>
            <!-- 歌单名字 -->
            <div class="list-name">
              <h5>{{ item.name }}</h5>
              <p>{{ item.trackCount }}首</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <cover-box
        :songList="songList"
        :coverData="coverData"
        :total="total"
      ></cover-box>

      <!-- 歌单封面标题组件 -->
      <div style="padding: 0 20px; margin-top: 40px">
        <song-list :songList="songList" :playCount="coverData"></song-list>
      </div>
      <div style="margin-top: 40px; padding: 0 20px">
        <com-ment
          :hotComments="hotComments"
          :comments="comments"
          :total="total"
          @CurrentChange="CurrentChange"
          :commentType="2"
        ></com-ment>
      </div>
      <!-- 加载动画 -->
      <loading v-if="showLoading"></loading>
    </div>
  </div>
</template>

<script>
import coverBox from "../../home/playListDetail/children/coverBox.vue";
import SongList from "../../../components/songlist/SongList.vue";
import ComMent from "../../../components/comment/ComMent.vue";
import Loading from "../../../components/loading/Loading.vue";
import { getUserPlayList } from "../../../api/user";
import { getWholeSongs, getPlayListComment } from "../../../api/api";

export default {
  components: { coverBox, SongList, ComMent, Loading },
  name: "YiLogin",
  data() {
    return {
      // 我创建的歌单是否展开，默认展开
      myList: true,
      // 我收藏的歌单，默认展开
      shouCangList: true,
      // 创建的歌单数据
      myPlaylist: null,
      // 收藏的歌单数据
      shouCangPlaylist: null,
      // 歌曲列表数据
      songList: null,
      // 歌单封面数据
      coverData: null,
      // 评论数据
      hotComments: null,
      comments: null,
      total: null,
      // 切换歌单时的ID
      playlistId: 0,
      showLoading: true,
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.getData(this.$store.state.profile.userId);
    }, 200);
  },
  updated() {
    this.showLoading = false;
  },
  methods: {
    async getData(id) {
      let { data: res } = await getUserPlayList(id);
      this.myPlaylist = res.playlist.filter((item) => {
        return item.creator.nickname == this.$store.state.profile.nickname;
      });
      this.shouCangPlaylist = res.playlist.filter((item) => {
        return item.creator.nickname != this.$store.state.profile.nickname;
      });
      // 保存ID为的是加载评论
      this.playlistId = res.playlist[0].id;
      // 默认显示我喜欢的音乐 res.playlist[0].id 就是我喜欢的音乐的ID
      this.getPlaylist(this.playlistId);
    },
    async getPlaylist(q) {
      // 获取歌单数据
      if (q) {
        // 根据歌单id获取数据,默认是我喜欢的音乐
        let { data: sList } = await getWholeSongs(q);
        this.songList = sList.playlist.tracks;
        this.coverData = sList.playlist;
        let { data: com } = await getPlayListComment(q);
        this.hotComments = com.hotComments;
        this.comments = com.comments;
        this.total = com;
      }
    },
    async CurrentChange(newPage) {
      let id = this.playlistId;
      if (newPage === 1) {
        let { data: com } = await getPlayListComment(id);
        this.hotComments = com.hotComments;
        this.comments = com.comments;
      } else if (this.total.total >= 5000) {
        // 重新发送评论请求根据分页数据
        let { data: com } = await getPlayListComment(
          id,
          (newPage - 1) * 20,
          this.comments[this.comments.length - 1].time
        );
        this.hotComments = [];
        this.comments = com.comments;
      } else {
        // 重新发送评论请求根据分页数据
        let { data: com } = await getPlayListComment(id, (newPage - 1) * 20);
        this.hotComments = [];
        this.comments = com.comments;
      }
    },
    toMyPlaylist(id) {
      this.playlistId = id;
      // 切换歌单，并重新发起请求获取歌单数据
      this.getPlaylist(id);
    },
  },
};
</script>

<style scoped>
#yi-login {
  display: flex;
  height: calc(100vh - 76px);
  overflow: hidden;
}

.left {
  width: 240px;
  height: 850px;
  padding-top: 40px;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 1px solid #ccc;
  background: #f9f9f9;
  padding-bottom: 40px;
  box-sizing: border-box;
}
.ul > .tabs {
  position: relative;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  padding-left: 35px;
  cursor: pointer;
}
.ul > .tabs > a {
  color: #333;
  font-weight: bold;
  font-family: "宋体";
}
.ul .tabs:hover {
  background: #eeeeee;
}
.tabs > i {
  position: absolute;
  border-width: 8px;
  border-right-width: 0;
  border-style: solid;
  border-color: transparent transparent transparent #cccccc;
  left: 18px;
  top: 12px;
}
.tabs > i.active {
  transform: rotate(90deg);
}
.right {
  width: 740px;
  height: 850px;
  padding-top: 40px;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 70px;
  box-sizing: border-box;
}
.info-box {
  display: flex;
  padding: 6px 0 6px 20px;
}
.info-box:hover {
  background: #eeeeee;
  cursor: pointer;
}
.info-img {
  position: relative;
  width: 40px;
  height: 40px;
}
.info-img > img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.list-name {
  flex: 1;
  margin-left: 10px;
  font-size: 12px;
  line-height: 22px;
}
.list-name > h5 {
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list-name > p {
  color: #777;
}
</style>
