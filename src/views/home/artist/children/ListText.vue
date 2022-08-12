<template>
  <div>
    <ul class="list-text" v-for="(item, index) in shuju" :key="index">
      <li>{{ item.title }}</li>
      <li
        class="bg"
        :class="{ active: lists.id == activeClass }"
        v-for="(lists, i) in item.list"
        :key="i"
        @click="toggleSinger(lists.id, lists.path, lists.area)"
      >
        <span class="span" :class="{ active: lists.id == activeClass }"></span
        ><i :class="{ active: lists.id == activeClass }">{{ lists.name }}</i>
      </li>
      <div
        style="border-bottom: 1px solid #ccc; margin-top: 20px"
        v-if="index != 5"
      ></div>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ListText",
  data() {
    return {
      shuju: [
        {
          title: "推荐",
          list: [
            {
              name: "推荐歌手",
              id: "",
              path: "/artist/default",
            },
            {
              name: "入驻歌手",
              id: "signed",
              path: "/artist/signed",
            },
          ],
        },
        {
          title: "华语",
          list: [
            {
              name: "华语男歌手",
              id: "1001",
              path: "/artist/cat",
              area: "7",
            },
            {
              name: "华语女歌手",
              id: "1002",
              path: "/artist/cat",
              area: "7",
            },
            {
              name: "华语组合/乐队",
              id: "1003",
              path: "/artist/cat",
              area: "7",
            },
          ],
        },
        {
          title: "欧美",
          list: [
            {
              name: "欧美男歌手",
              id: "2001",
              path: "/artist/cat",
              area: "96",
            },
            {
              name: "欧美女歌手",
              id: "2002",
              path: "/artist/cat",
            },
            {
              name: "欧美组合/乐队",
              id: "2003",
              path: "/artist/cat",
            },
          ],
        },
        {
          title: "日本",
          list: [
            {
              name: "日本男歌手",
              id: "3001",
              path: "/artist/cat",
              area: "8",
            },
            {
              name: "日本女歌手",
              id: "3002",
              path: "/artist/cat",
              area: "8",
            },
            {
              name: "日本组合/乐队",
              id: "3003",
              path: "/artist/cat",
              area: "8",
            },
          ],
        },
        {
          title: "韩国",
          list: [
            {
              name: "韩国男歌手",
              id: "4001",
              path: "/artist/cat",
              area: "16",
            },
            {
              name: "韩国女歌手",
              id: "4002",
              path: "/artist/cat",
              area: "16",
            },
            {
              name: "韩国组合/乐队",
              id: "4003",
              path: "/artist/cat",
              area: "16",
            },
          ],
        },
        {
          title: "其他",
          list: [
            {
              name: "其他男歌手",
              id: "5001",
              path: "/artist/cat",
              area: "0",
            },
            {
              name: "其他女歌手",
              id: "5002",
              path: "/artist/cat",
              area: "0",
            },
            {
              name: "其他组和/乐队",
              id: "5003",
              path: "/artist/cat",
              area: "0",
            },
          ],
        },
      ],
    };
  },
  mounted() {},
  methods: {
    toggleSinger(id, path, area) {
      if (path === "/artist/cat") {
        this.$router.push({
          path,
          query: {
            area,
            id,
          },
        });
      } else {
        this.$router.push({
          path,
        });
      }
    },
  },
  computed: {
    activeClass() {
      let p = this.$route.path,
        id = this.$route.query.id;
      if (p === "/artist/default") {
        return "";
      } else if (p === "/artist/signed") {
        return "signed";
      } else if (p === "/artist/cat") {
        return id;
      }
    },
  },
};
</script>

<style scoped>
.list-text {
  padding-left: 20px;
  padding-right: 15px;
  font-size: 12px;
  line-height: 24px;
  padding-bottom: 20px;
}
.list-text > li {
  position: relative;
  cursor: pointer;
  border: 1px solid transparent;
}
.list-text > li:first-child {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}
.bg.active {
  background: #fcfcfc;
  border: 1px solid #e2e2e2;
  border-radius: 3px;
}
.span.active {
  background: #c20c0c;
}
.span {
  position: absolute;
  width: 4px;
  height: 4px;
  top: 47%;
  left: 10px;
  background: #afafaf;
}
.list-text > li > i {
  position: relative;
  left: 25px;
  color: #333333;
}
.list-text > li > i.active {
  color: #c20c0c;
}
.list-text > li > i:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>