<template>
  <div id="di-radio" v-if="djradios !== null">
    <tags text="声音主播"></tags>
    <div class="flex">
      <div class="box" v-for="item in djradios.djRadios" :key="item.id">
        <div class="pic" :title="item.name">
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="info">
          <h5>
            <a href="javascript:;">{{ item.name }}</a>
          </h5>
          <p>
            <span>by</span> <a href="javascript:;">{{ item.dj.nickname }}</a>
            <i :class="item.dj.gender == 2 ? nv : nan"></i>
          </p>
        </div>
      </div>
    </div>
    <div class="juzhong">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="djradios.djRadiosCount"
        :page-size="30"
        @current-change="handleCurrentChange"
        v-if="djradios.djRadiosCount >= 30"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Tags from "../../../components/tagsBox/Tags.vue";
export default {
  name: "DjRadio",
  components: { Tags },
  props: {
    djradios: {
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
    handleCurrentChange(newPage) {
      this.$emit("CurrentChangeOne", newPage);
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.box {
  width: 150px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.pic {
  width: 150px;
  height: 150px;
  cursor: pointer;
}
.pic > img {
  width: 100%;
  height: 100%;
}
.info {
  margin-top: 12px;
  line-height: 20px;
}
.info a:hover {
  text-decoration: underline;
}
.info > h5 {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.info > h5 > a {
  font-size: 14px;
  color: #333;
}
.info > p > span {
  font-size: 12px;
  color: #888;
}
.info > p > a {
  font-size: 12px;
  color: #333;
}
.nan {
  color: skyblue;
  font-size: 18px;
  vertical-align: -2px;
  margin-left: 3px;
}
.nv {
  color: pink;
  font-size: 18px;
  vertical-align: -2px;
  margin-left: 3px;
}
.juzhong {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
</style>