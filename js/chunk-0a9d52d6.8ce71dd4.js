(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0a9d52d6"],{"0c34":function(t,e,n){"use strict";n("ebae")},"214c":function(t,e,n){"use strict";n("e682")},3008:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"tag-box"}},[n("h3",[t._v(" "+t._s(t.text)+" "),t.showGengduo?n("a",{attrs:{href:"javascript:;"},on:{click:t.handleToSinger}},[t._v(t._s(t.title)+" >")]):t._e()])])},a=[],s={name:"TagsBox",props:{text:{type:String},showGengduo:{type:Boolean,defalult:!1},title:{type:String},path:{type:String},id:{}},methods:{handleToSinger:function(){console.log(this.id),0!==this.id?this.$router.push({path:this.path,query:{id:this.id}}):this.$router.push({path:this.path})}}},r=s,o=(n("89a1"),n("2877")),c=Object(o["a"])(r,i,a,!1,null,"39734295",null);e["a"]=c.exports},"370d":function(t,e,n){},3921:function(t,e,n){"use strict";n("d863")},5577:function(t,e,n){},6232:function(t,e,n){"use strict";n("be7e")},7705:function(t,e,n){"use strict";n("e5e2")},7982:function(t,e,n){},"7b5a":function(t,e,n){},"7f2d":function(t,e,n){"use strict";n("5577")},"89a1":function(t,e,n){"use strict";n("9dc4")},"8fd0":function(t,e,n){"use strict";n("370d")},"9dc4":function(t,e,n){},ae5f:function(t,e,n){},bb00:function(t,e,n){"use strict";n("ae5f")},be7e:function(t,e,n){},d863:function(t,e,n){},dd34:function(t,e,n){"use strict";n("7982")},e02c:function(t,e,n){"use strict";n("7b5a")},e2ef:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"discover"}},[n("swiper",{attrs:{banner:t.banner}}),n("div",{staticClass:"wrap3 main"},[n("div",{staticClass:"main-left"},[n("crumbs-main",{attrs:{tabs:t.listHot,acIndex:2,pathRouter:"playlist"}}),n("cover-list"),t.$store.state.whetherLogin?t._e():n("div",{attrs:{id:"recommend"}},[n("crumbs-main",{attrs:{title:"个性化推荐"}}),n("reco-mmend")],1),n("crumbs-main",{attrs:{title:"新碟上架",acIndex:5,pathRouter:"album"}}),n("disc",{attrs:{albums:t.albums}}),n("crumbs-main",{attrs:{title:"榜单",acIndex:1,pathRouter:"toplist"}}),n("top-list-item",{attrs:{list:t.topList,songs:t.songs}})],1),n("div",{staticClass:"main-right"},[n("user-login"),n("tags-box",{attrs:{text:"热门歌手",showGengduo:!0,title:"查看更多",path:"/artist"}}),n("singer-items",{attrs:{hotSinger:t.hotSinger}}),n("tags-box",{attrs:{text:"热门主播"}}),n("hot-anchor",{attrs:{hotDj:t.hotDj}})],1)])],1)},a=[],s=n("1da1"),r=(n("96cf"),n("a434"),n("159b"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"swiper"},on:{mouseover:t.stopTime,mouseleave:t.playTime}},[n("div",{staticClass:"zhezhao",style:{backgroundImage:"url("+t.banner[t.index].imageUrl+")"}}),n("div",{staticClass:"wrap2"},[n("div",{staticClass:"box"},[n("img",{style:{opacity:t.value},attrs:{src:t.banner[t.index].imageUrl,alt:""},on:{click:function(e){return t.toRouter(t.banner[t.index].targetType,t.banner[t.index].targetId)}}}),n("div",{staticClass:"nav-btn"},t._l(t.banner,(function(e,i){return n("span",{key:i,class:{active:i===t.index},on:{click:function(e){return t.jumpBtn(i)}}})})),0)]),n("div",{staticClass:"prev",on:{click:t.prevBtn}},[t._v("<")]),n("div",{staticClass:"next",on:{click:t.nextBtn}},[t._v(">")]),n("div",{staticClass:"download"},[n("a",{attrs:{href:"javascript:;"},on:{click:t.handleToDownload}})])])])}),o=[],c={name:"Swiper",props:{banner:{type:Array,default:function(){return[]}}},data:function(){return{index:0,value:1,timer:null}},mounted:function(){this.moveTime()},methods:{moveTime:function(){var t=this;this.timer=window.setInterval((function(){t.value=.2,setTimeout((function(){t.index===t.banner.length-1&&(t.index=-1),t.value=1,t.index++}),600)}),5e3)},prevBtn:function(){0===this.index&&(this.index=this.banner.length),this.index--},nextBtn:function(){this.index===this.banner.length-1&&(this.index=-1),this.index++},stopTime:function(){window.clearInterval(this.timer)},playTime:function(){this.moveTime()},handleToDownload:function(){this.$router.push("/download")},jumpBtn:function(t){this.index=t},toRouter:function(t,e){if(1==t)this.$router.push({path:"/song",query:{id:e}});else{if(1e3!==t)return;this.$router.push({path:"/playlistDetai",query:{id:e}})}}}},l=c,u=(n("e02c"),n("2877")),d=Object(u["a"])(l,r,o,!1,null,"39d96f4c",null),h=d.exports,f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"crumbs"}},[t._m(0),n("h2",[n("a",{class:{cur:"个性化推荐"===t.title},attrs:{href:"javascript:;"},on:{click:function(e){return t.handleToPath(t.acIndex,t.pathRouter)}}},[t._v(t._s(t.title))])]),t.tabs?n("div",{staticClass:"tab"},t._l(t.tabs,(function(e){return n("a",{key:e.id,attrs:{href:"javascript:;"},on:{click:function(n){return t.handleToPlaylist(e.name)}}},[t._v(t._s(e.name))])})),0):t._e()])},p=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"radio"},[n("div",{staticClass:"yuan"})])}],m=(n("a9e3"),{name:"CrumbsMain",props:{tabs:{type:Array,default:function(){return[]}},title:{type:String,default:"热门推荐"},pathRouter:{type:String},acIndex:{type:Number}},created:function(){},methods:{handleToPlaylist:function(t){this.$router.push({path:"/playlist",query:{cat:t}})},handleToPath:function(t,e){"个性化推荐"!==this.title&&this.$bus.$emit("toList",t,e)}}}),v=m,g=(n("6232"),Object(u["a"])(v,f,p,!1,null,"4c420033",null)),b=g.exports,_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"cover-list"}},t._l(t.$store.state.playList,(function(e,i){return n("div",{key:i,staticClass:"cover-box"},[n("div",{staticClass:"cover"},[n("img",{attrs:{src:e.picUrl,alt:""}}),n("span",{attrs:{title:e.name},on:{click:function(n){return t.handleToPlayListDetail(e.id)}}}),n("div",{staticClass:"zhezhao"},[n("i",{staticClass:"iconfont icon-erji erji"}),n("span",{staticClass:"bofangcishu"},[t._v(t._s(t._f("formatPlayCount")(e.playcount?e.playcount:e.playCount)))]),n("i",{staticClass:"iconfont icon-yunhang bofang",on:{click:function(n){return n.stopPropagation(),t.handleToBoFang(e.id)}}})])]),n("h3",{on:{click:function(n){return t.handleToPlayListDetail(e.id)}}},[n("a",{attrs:{href:"javascript:;",title:e.name}},[t._v(t._s(e.name))])])])})),0)},y=[],x=n("e09c"),C={name:"CoverList",data:function(){return{}},mounted:function(){},mixins:[x["d"]],methods:{handleToPlayListDetail:function(t){this.$router.push({path:"/playlistDetail",query:{id:t}})}}},j=C,k=(n("3921"),Object(u["a"])(j,_,y,!1,null,"64363916",null)),$=k.exports,T=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"recommend"}},[n("ul",[n("li",{staticClass:"meiri"},[n("div",{staticClass:"re-img",attrs:{title:"每日歌曲推荐"},on:{click:t.handleToRecommend}},[n("span",{staticClass:"day"},[t._v(t._s(t.day))]),n("span",{staticClass:"date"},[t._v(t._s(t.date))])]),n("h3",[n("a",{attrs:{href:"javascript:;",title:"每日歌曲推荐"},on:{click:t.handleToRecommend}},[t._v("每日歌曲推荐")])]),n("p",[t._v("根据你的口味生成， 每天6:00更新")])]),t._l(t.playList,(function(e){return n("li",{key:e.id,staticClass:"cover-box"},[n("div",{staticClass:"cover"},[n("img",{attrs:{src:e.picUrl,alt:""}}),n("span",{attrs:{title:e.name},on:{click:function(n){return t.handleToPlayListDetail(e.id)}}}),n("div",{staticClass:"zhezhao"},[n("i",{staticClass:"iconfont icon-erji erji"}),n("span",{staticClass:"bofangcishu"},[t._v(t._s(t._f("formatPlayCount")(e.playcount)))]),n("i",{staticClass:"iconfont icon-yunhang bofang",on:{click:function(n){return n.stopPropagation(),t.handleToBoFang(e.id)}}})])]),n("h3",{on:{click:function(n){return t.handleToPlayListDetail(e.id)}}},[n("a",{attrs:{href:"javascript:;"}},[t._v(t._s(e.name))])]),n("p",[t._v(t._s(e.copywriter))])])}))],2)])},D=[],L={name:"RecoMmend",mixins:[x["d"],x["c"]],methods:{handleToRecommend:function(){this.$router.push("/recommend")},handleToPlayListDetail:function(t){this.$router.push({path:"playlistDetail",query:{id:t}})}},computed:{playList:function(){var t=this,e=JSON.parse(JSON.stringify(t.$store.state.playList));return e.splice(0,3)}}},w=L,S=(n("dd34"),Object(u["a"])(w,T,D,!1,null,"525f6cf6",null)),O=S.exports,P=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"disc"}},t._l(t.albums,(function(e){return n("div",{key:e.id,staticClass:"disc-box"},[n("img",{attrs:{src:e.picUrl,alt:"",title:e.name},on:{click:function(n){return t.albumsDetail(e.id)}}}),n("i",{staticClass:"iconfont icon-yunhang play",on:{click:function(n){return n.stopPropagation(),t.handleToBoFang(e.id)}}}),n("div",{staticClass:"disc-img"}),n("div",{staticClass:"detail"},[n("h5",[n("a",{attrs:{href:"javascript:;",title:e.name},on:{click:function(n){return t.albumsDetail(e.id)}}},[t._v(t._s(e.name))])]),n("p",[n("a",{attrs:{href:"javascript:;",title:e.artists[0].name},on:{click:function(n){return t.singerDtail(e.artists[0].id)}}},[t._v(t._s(e.artists[0].name))])])])])})),0)},I=[],q={name:"Disc",props:{albums:{type:Array,default:function(){return[]}}},mixins:[x["b"]],methods:{albumsDetail:function(t){this.$router.push({path:"/albumsDetail",query:{id:t}})},singerDtail:function(t){this.$router.push({path:"/singer",query:{id:t}})}}},R=q,U=(n("8fd0"),Object(u["a"])(R,P,I,!1,null,"1693ae1a",null)),B=U.exports,A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"top-list"}},t._l(t.songs,(function(e){return n("div",{key:e.playlist.id,staticClass:"top-box"},[n("div",{staticClass:"top-list-box"},[n("div",{staticClass:"top-list-left-img",on:{click:function(n){return t.handleToPlayListDetail(e.playlist.id)}}},[n("img",{attrs:{src:e.playlist.coverImgUrl,alt:""}}),n("span")]),n("div",{staticClass:"top-list-right-contol"},[n("h3",{on:{click:function(n){return t.handleToPlayListDetail(e.playlist.id)}}},[n("a",{attrs:{href:"javascript:;"}},[t._v(t._s(e.playlist.name))])]),n("a",{staticClass:"iconfont icon-yunhang Abtn bofang",attrs:{href:"javascript:;",title:"播放"},on:{click:function(n){return t.handleToBoFang(e.playlist.id)}}}),n("a",{staticClass:"iconfont icon-shoucang Abtn shoucang",attrs:{href:"javascript:;",title:"收藏"}})])]),n("ul",[t._l(10,(function(i,a){return n("li",{key:a},[n("span",{class:{active:a<=2}},[t._v(t._s(a+1))]),n("a",{staticClass:"song",attrs:{href:"javascript:;"},on:{click:function(n){return t.handleToSongsDetail(e.playlist.tracks[a].id)}}},[t._v(t._s(e.playlist.tracks[a].name)),n("a",{staticClass:"iconfont icon-yunhang dis",attrs:{href:"javascript:;"},on:{click:function(n){return n.stopPropagation(),t.bofang(e.privileges[a].id)}}})])])})),n("li",[n("a",{staticClass:"quanbu",attrs:{href:"javascript:;"},on:{click:function(n){return t.handleToPlayListDetail(e.playlist.id)}}},[t._v(" 查看全部> ")])])],2)])})),0)},E=[],H={name:"TopListItem",props:{list:{type:Array,default:function(){return[]}},songs:{type:Array,default:function(){return[]}}},data:function(){return{}},created:function(){},mixins:[x["d"],x["e"]],methods:{handleToPlayListDetail:function(t){this.$router.push({path:"/toplist",query:{id:t}})},handleToSongsDetail:function(t){this.$router.push({path:"/song",query:{id:t}})}}},z=H,F=(n("214c"),Object(u["a"])(z,A,E,!1,null,"10058620",null)),J=F.exports,N=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"user-login"}},[t.$store.state.whetherLogin?n("div",{staticClass:"wei-login"},[n("p",[t._v("登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机")]),n("a",{staticClass:"login",attrs:{href:"javascript:;",title:"用户登录"},on:{click:t.handleToLogin}},[t._v("用户登录")])]):n("div",{staticClass:"cheng-login"},[t.$store.state.profile&&t.$store.state.userLevel&&t.$store.state.userDetail?n("div",[n("div",{staticClass:"cheng-box"},[n("div",{staticClass:"cheng-img-box",on:{click:function(e){return t.handleToUserHome(t.$store.state.userLevel.userId)}}},[n("img",{attrs:{src:t.$store.state.profile.avatarUrl,alt:""}})]),n("div",{staticClass:"cheng-user-info"},[n("h4",[n("a",{attrs:{href:"javascript:;",title:t.$store.state.profile.nickname},on:{click:function(e){return t.handleToUserHome(t.$store.state.userLevel.userId)}}},[t._v(t._s(t.$store.state.profile.nickname))])]),n("p",[t._v("Lv."+t._s(t.$store.state.userLevel.level))]),n("br"),n("button",{class:{deactive:t.isFlag},on:{click:t.qiandao}},[t._v(" 签  到 ")])])]),n("ul",[n("li",[n("a",{attrs:{href:"javascript:;"}},[n("strong",[t._v(t._s(t.$store.state.userDetail.eventCount))]),n("span",[t._v("动态")])])]),n("li",[n("a",{attrs:{href:"javascript:;"}},[n("strong",[t._v(t._s(t.$store.state.userDetail.follows))]),n("span",[t._v("关注")])])]),n("li",[n("a",{attrs:{href:"javascript:;"}},[n("strong",[t._v(t._s(t.$store.state.userDetail.followeds))]),n("span",[t._v("粉丝")])])])])]):t._e()])])},M=[],G={name:"UserLogin",data:function(){return{isFlag:!1}},created:function(){},methods:{handleToLogin:function(){this.$bus.$emit("showLoginBox")},handleToUserHome:function(t){this.$router.push({path:"/user/home",query:{id:t}})},qiandao:function(){}}},Y=G,K=(n("7705"),Object(u["a"])(Y,N,M,!1,null,"26d7b81e",null)),Q=K.exports,V=n("3008"),W=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"singer"},t._l(t.hotSinger,(function(e){return n("div",{key:e.id,staticClass:"singer-box",on:{click:function(n){return t.handleToSinger(e.id)}}},[n("div",{staticClass:"left-img"},[n("img",{attrs:{src:e.img1v1Url,alt:""}})]),n("div",{staticClass:"right-singer"},[n("h3",[t._v(t._s(e.name))]),n("p",[t._v(t._s(e.alias[0]?e.alias[0]:e.name))])])])})),0)},X=[],Z={name:"SingerItems",props:{hotSinger:{type:Array,default:function(){return[]}}},methods:{handleToSinger:function(t){this.$router.push({path:"/singer",query:{id:t}})}}},tt=Z,et=(n("0c34"),Object(u["a"])(tt,W,X,!1,null,"4dab104e",null)),nt=et.exports,it=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"anchor"}},t._l(t.hotDj,(function(e){return n("div",{key:e.id,staticClass:"anchor-box",on:{click:function(n){return t.handleToDjDetail(e.id)}}},[n("div",{staticClass:"left-img"},[n("img",{attrs:{src:e.avatarUrl,alt:""}})]),n("div",{staticClass:"right-anchor"},[n("h4",[n("a",{attrs:{href:"javascript:;"}},[t._v(t._s(e.nickName))])])])])})),0)},at=[],st={name:"HotAnchor",props:{hotDj:{type:Array,default:function(){return[]}}},methods:{handleToDjDetail:function(t){this.$router.push({path:"/user/home",query:{id:t}})}}},rt=st,ot=(n("bb00"),Object(u["a"])(rt,it,at,!1,null,"243b5272",null)),ct=ot.exports,lt=n("4ec3"),ut={name:"Discover",components:{Swiper:h,CrumbsMain:b,CoverList:$,Disc:B,TopListItem:J,UserLogin:Q,TagsBox:V["a"],SingerItems:nt,HotAnchor:ct,RecoMmend:O},data:function(){return{banner:[{imgUrl:""}],listHot:[],albums:[],topList:[],hotSinger:[],hotDj:[],songs:[]}},created:function(){this.getData();var t=localStorage.getItem("userInfo")?localStorage.getItem("userInfo"):"";t&&this.$bus.$emit("login")},methods:{getData:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var n,i,a,s,r,o,c,l,u,d,h,f,p,m;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(lt["f"])();case 2:return n=e.sent,i=n.data,t.banner=i.banners,e.next=7,Object(lt["q"])();case 7:return a=e.sent,s=a.data,t.listHot=s.tags.splice(0,5),e.next=12,Object(lt["o"])();case 12:return r=e.sent,o=r.data,t.$store.commit("PLAYLIST",o.result.splice(0,8)),e.next=17,Object(lt["c"])();case 17:return c=e.sent,l=c.data,t.albums=l.albums.splice(8,9),e.next=22,Object(lt["J"])();case 22:return u=e.sent,d=u.data,t.topList=d.list.splice(0,3),e.next=27,Object(lt["h"])();case 27:return h=e.sent,f=h.data,t.hotSinger=f.artists,e.next=32,Object(lt["g"])();case 32:p=e.sent,m=p.data,t.hotDj=m.data.list,t.topList.forEach((function(e){Object(lt["N"])(e.id).then((function(e){var n=e.data;t.songs.push(n)}))}));case 36:case"end":return e.stop()}}),e)})))()},getPlayList:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(lt["o"])();case 2:n=e.sent,i=n.data,t.$store.commit("PLAYLIST",i.result.splice(0,8));case 5:case"end":return e.stop()}}),e)})))()}}},dt=ut,ht=(n("7f2d"),Object(u["a"])(dt,i,a,!1,null,"5f1771b6",null));e["default"]=ht.exports},e5e2:function(t,e,n){},e682:function(t,e,n){},ebae:function(t,e,n){}}]);
//# sourceMappingURL=chunk-0a9d52d6.8ce71dd4.js.map