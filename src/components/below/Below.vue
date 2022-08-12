<template>
  <div id="footer">
    <div class="wrap3 flex">
      <div class="copy">
        <p class="text1">
          <a href="javascript:;" v-for="(item, index) in info" :key="index">{{
            item
          }}</a>
        </p>
        <p>
          网易公司版权所有©1997-2021&nbsp;&nbsp;&nbsp;&nbsp;杭州乐读科技有限公司运营：浙网文[2021]1186-054号
        </p>
        <p>
          违法和不良信息举报电话：0571-89853516
          &nbsp;&nbsp;&nbsp;&nbsp;举报邮箱：<a href="javascript"
            >ncm5990@163.com</a
          >
        </p>
        <p>
          <a href="javascript:;"
            >粤B2-20090191-18
            &nbsp;工业和信息化部备案管理系统网站&nbsp;&nbsp;</a
          >
          <a href="javascript:;">浙公网安备 33010902002564号</a>
        </p>
      </div>
      <ul class="ul">
        <li class="li">
          <a href="javascript:;"></a>
        </li>
        <li class="li">
          <a href="javascript:;"></a>
        </li>
        <li class="li">
          <a href="javascript:;"></a>
        </li>
        <li class="li">
          <a href="javascript:;"></a>
        </li>
        <li class="li">
          <a href="javascript:;"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Below",
  data() {
    return {
      info: [
        "服务条款",
        "隐私政策",
        "儿童隐私政策",
        "版权投诉指引",
        "意见反馈",
        "广告合作",
      ],
    };
  },
};
</script>

<style scoped>
#footer {
  width: 100%;
  border-top: 1px solid #ccc;
  margin-top: -1px;
  height: 172px;
  background: #f2f2f2;
}
.flex {
  display: flex;
}
.copy {
  padding-top: 15px;
  line-height: 24px;
  width: 520px;
  font-size: 12px;
  color: #333;
}
.copy a {
  color: #333;
}
.text1 > a {
  color: #c2c2c2;
}
.text1 > a:not(:last-child)::after {
  content: "|";
  margin: 0 8px 0 10px;
}
.flex a:hover {
  text-decoration: underline;
}
.ul {
  display: flex;
  justify-content: space-between;
  margin-top: 33px;
  width: 420px;
}
.li {
  width: 60px;
  height: 70px;
  text-align: center;
}
.li > a {
  display: block;
  width: 50px;
  height: 45px;
  margin: 0 5px;
  background: url(https://s2.music.126.net/style/web2/img/foot_enter_new.png?5f339cd783096f5d6b4502dd169ed786)
    no-repeat;
  background-position: -63px -456.5px;
  background-size: 110px 552px;
}
</style>