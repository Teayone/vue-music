(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-79ba5820"],{"81f8":function(t,e,n){},d1b9:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"video-detail"}},[n("tab-bar",{attrs:{items:t.items}}),n("lay-out",{scopedSlots:t._u([{key:"left",fn:function(){return[n("video-box",{ref:"videoBox",attrs:{videoDetail:t.videoDetail,VideoUrl:t.videoUrl},on:{toggleBrs:t.toggleBrs}}),n("div",{staticStyle:{"margin-top":"100px"}}),n("com-ment",{attrs:{hotComments:t.hotComments,comments:t.comments,total:t.total,commentType:5},on:{CurrentChange:t.CurrentChange}})]},proxy:!0},{key:"right",fn:function(){return[n("tags-box",{attrs:{text:"视频简介"}}),t.videoDetail?n("div",{staticClass:"video-info"},[n("p",{staticClass:"publish-time"},[t._v(" 发布时间："+t._s(t._f("forMatDate")(t.videoDetail.publishTime))+" ")]),n("p",{staticClass:"play-count"},[t._v(" 播放次数："+t._s(t._f("formatPlayCount")(t.videoDetail.playTime))+"次 ")]),n("p",{staticClass:"info-text"},[t._v(t._s(t.videoDetail.title))])]):t._e(),n("tags-box",{attrs:{text:"相关推荐"}}),n("video-recommend",{attrs:{Pvideo:t.Pvideo}})]},proxy:!0}])})],1)},o=[],i=n("1da1"),s=(n("96cf"),n("dcc6")),r=n("2dbe"),c=n("d073"),m=n("5662"),u=n("3008"),l=n("99c6"),d=n("4ec3"),h={name:"VideoDetail",components:{LayOut:r["a"],TabBar:s["a"],VideoBox:c["a"],ComMent:m["a"],TagsBox:u["a"],VideoRecommend:l["a"]},data:function(){return{items:[{title:"推荐",path:"/home"},{title:"排行榜",path:"/toplist"},{title:"歌单",path:"/playlist"},{title:"主播电台",path:"/djradio"},{title:"歌手",path:"/artist"},{title:"新碟上架",path:"/album"}],videoDetail:null,videoUrl:null,hotComments:null,comments:null,total:null,Pvideo:null}},created:function(){var t=this.$route.query.id;this.getData(t),this.$bus.$emit("activeRouer",0)},mounted:function(){this.$bus.$emit("activeChildrenRoute",null),this.$store.state.flag&&(this.$store.commit("ISFLAG"),this.$bus.$emit("pause"))},methods:{getData:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var a,o,i,s,r,c,m,u;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(d["L"])(t);case 2:return a=n.sent,o=a.data,n.next=6,Object(d["M"])(t);case 6:return i=n.sent,s=i.data,e.videoDetail=o.data,e.videoUrl=s,n.next=12,Object(d["K"])(t);case 12:return r=n.sent,c=r.data,e.hotComments=c.hotComments,e.comments=c.comments,e.total=c,n.next=19,Object(d["u"])(t);case 19:m=n.sent,u=m.data,e.Pvideo=u.data;case 22:case"end":return n.stop()}}),n)})))()},CurrentChange:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var a,o,i,s,r,c,m;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a=e.$route.query.id,1!==t){n.next=10;break}return n.next=4,Object(d["K"])(a);case 4:o=n.sent,i=o.data,e.hotComments=i.hotComments,e.comments=i.comments,n.next=25;break;case 10:if(!(e.total.total>=5e3)){n.next=19;break}return n.next=13,Object(d["K"])(a,t,e.comments[e.comments.length-1].time);case 13:s=n.sent,r=s.data,e.hotComments=[],e.comments=r.comments,n.next=25;break;case 19:return n.next=21,Object(d["K"])(a,t);case 21:c=n.sent,m=c.data,e.hotComments=[],e.comments=m.comments;case 25:case"end":return n.stop()}}),n)})))()},toggleBrs:function(t){var e=this,n=this.$route.query.id,a=this.$refs.videoBox;Object(d["M"])(n,t).then((function(t){e.videoUrl=t.data,setTimeout((function(){a.resetBrs()}),200)}))}}},f=h,v=(n("ff88"),n("2877")),p=Object(v["a"])(f,a,o,!1,null,"47a9ac2d",null);e["default"]=p.exports},ff88:function(t,e,n){"use strict";n("81f8")}}]);
//# sourceMappingURL=chunk-79ba5820.48d6c235.js.map