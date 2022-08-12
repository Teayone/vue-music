<template>
  <ul class="ul">
    <li
      @click="toggleRouter(item.c)"
      v-for="item in codes"
      :key="item.c"
      :class="{ active: item.c == activeClass }"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "Code",
  data() {
    return {
      codes: [
        { name: "热门", c: "-1" },
        { name: "A", c: "a" },
        { name: "B", c: "b" },
        { name: "C", c: "c" },
        { name: "D", c: "d" },
        { name: "E", c: "e" },
        { name: "F", c: "f" },
        { name: "G", c: "g" },
        { name: "H", c: "h" },
        { name: "I", c: "i" },
        { name: "J", c: "j" },
        { name: "K", c: "k" },
        { name: "L", c: "l" },
        { name: "M", c: "m" },
        { name: "N", c: "n" },
        { name: "O", c: "o" },
        { name: "P", c: "p" },
        { name: "Q", c: "q" },
        { name: "R", c: "r" },
        { name: "S", c: "s" },
        { name: "T", c: "t" },
        { name: "U", c: "u" },
        { name: "V", c: "v" },
        { name: "W", c: "w" },
        { name: "X", c: "x" },
        { name: "Y", c: "y" },
        { name: "Z", c: "z" },
        { name: "其他", c: "0" },
      ],
    };
  },
  methods: {
    toggleRouter(c) {
      let area = this.$route.query.area;
      let id = this.$route.query.id;
      this.$router.push({
        path: "/artist/cat",
        query: {
          area,
          id,
          initial: c,
        },
      });
    },
  },
  computed: {
    activeClass() {
      let c = this.$route.query.initial;
      if (c) {
        return c;
      } else {
        return "-1";
      }
    },
  },
};
</script>

<style scoped>
.ul {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.ul > li {
  cursor: pointer;
  padding: 5px;
  font-size: 14px;
  line-height: 16px;
}
.ul > li.active {
  background: #c20c0c;
  color: #fff;
}
.ul > li:first-child {
  font-size: 12px;
  padding: 5px 8px;
  line-height: 16px;
}
.ul > li:last-child {
  font-size: 12px;
  padding: 5px 8px;
  line-height: 16px;
}
.ul > li:hover {
  text-decoration: underline;
}
</style>