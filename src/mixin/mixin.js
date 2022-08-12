 import { getWholeSongs ,getSongDetail,getAlbumSongs} from "../api/api";
 // 歌单封面上的播放按钮
export let mixin = {
  methods: {
    // 歌单封面的播放按钮
    handleToBoFang(id) {
      this.$store.commit('RESETINDEX')
      // 显示播放器组件
      this.$bus.$emit('block')
      // 如果已经有状态了代表正在播放,点击其他歌单的音乐时,设置按钮的状态,并重新加载歌曲
      if(this.$store.state.flag){
         // 重新加载
        this.$bus.$emit('load')
        this.$store.commit('ISFLAG')
      }
      getWholeSongs(id).then((v) => {
        // 将得到的榜单歌曲放到Vuex
        this.$store.commit('CUNSONGSI',v.data.playlist.tracks)
        // 更新播放器组件
        this.$bus.$emit('update')
        // 播放歌曲
        this.$store.dispatch("songUrl");
      });
    },
    
  }
}
// 本地的song更新，和song有关联的组件全部更新
export let up ={
  data() {
    return {
      // 默认的本地数据
      song: JSON.parse(
        localStorage.getItem("song") ? localStorage.getItem("song") : 'null'
      ),
    };
  },
  mounted() {
    this.$bus.$on("update", this.up);
  },
  methods: {
    // 更新 song 的状态
    up() {
      this.song = JSON.parse(localStorage.getItem("song"));
    },
  }
}
// 每日推荐的日期
export const dt = {
  computed: {
    day() {
      let date = new Date();
      let d = date.getDay();
      switch (d) {
        case 0:
          return "星期日";
        case 1:
          return "星期一";
        case 2:
          return "星期二";
        case 3:
          return "星期三";
        case 4:
          return "星期四";
        case 5:
          return "星期五";
        case 6:
          return "星期六";
      }
    },
    date() {
      let date = new Date();
      let d = date.getDate();
      return d;
    },
  },
}
// 歌单列表中某首歌曲播放
export const songPlay = {
  methods:{
    bofang(id,noCopyrightRcmd) {
    // 如果歌曲没有版权，则弹框提醒
    if(noCopyrightRcmd){
      this.showNocopyTips()
      return 
    }else{
      getSongDetail(id).then((b) => {
        let flag = true;
        let song = JSON.parse(localStorage.getItem("song")?localStorage.getItem("song"):"[]");
        for (let i = 0; i < song.length; i++) {
          if (song[i].id === id) {
            flag = false;
            break;
          }
        }
        // flag 为true 代表歌单中目前没有该歌曲
        if (flag) {
          // 将其添加到本地
          song.push(b.data.songs[0]);
          localStorage.setItem("song", JSON.stringify(song));
          // 修改 index 为最后
          this.$store.commit("LASTINDEX");
          if (this.$store.state.flag) {
            this.$store.commit("ISFLAG");
          }
          this.$bus.$emit("block");
          this.$store.dispatch("songUrl");
          this.$bus.$emit("update");
        } else {
          // 找出重复的歌在歌单中的下标位置
          let i = song.findIndex((item) => {
            return item.id === id;
          });
          // 存下index
          this.$store.commit("CACHEINDEX", i);
          if (this.$store.state.flag) {
            this.$store.commit("ISFLAG");
          }
          this.$bus.$emit("block");
          this.$store.dispatch("songUrl");
          this.$bus.$emit("update");
        }
      });
    }

  },
  }
}
// 全部播放按钮
export const toPlay = {
  methods: {
    // 点击播放全部歌曲
    toPlay() {
     let songList = this.songList.filter((item)=>{
        return item.noCopyrightRcmd===null
      })
      // 将 songList 存到本地
      localStorage.setItem("song", JSON.stringify(songList));
      // 更新播放器
      this.$bus.$emit("update");
      // 为true 代表正在播放
      if (this.$store.state.flag) {
        this.$store.commit("ISFLAG");
      }
      // 显示播放器组件
      this.$bus.$emit("block");
      // 将index重置
      this.$store.commit("RESETINDEX");
      // 发起请求
      this.$store.dispatch("songUrl");
      // 多次点击歌曲从头播放
      this.$bus.$emit("load");
    },
  }
}
// 专辑封面播放按钮
export const albumPlay = {
  methods:{
       handleToBoFang(id) {
        this.$store.commit("RESETINDEX");
        this.$bus.$emit("block");
        if (this.$store.state.flag) {
          this.$bus.$emit("load");
          this.$store.commit("ISFLAG");
        }
        getAlbumSongs(id).then((v) => {
          // 在存到本地之前先把歌曲数据存到Vuex
          this.$store.commit("CUNSONGSI", v.data.songs);
          // 更新播放器组件
          this.$bus.$emit("update");
          // 派发任务
          this.$store.dispatch("songUrl");
        });
      },
  }
}
// 添加到播放列表
export const addSong = {
  methods:{
    addList(id) {
      // 找出播放列表中添加的那一首
      let songList = this.songList.find((item) => {
        return item.id == id;
      });
      // 取出本地的歌曲列表数据
      let songs = JSON.parse(localStorage.getItem("song"));
      // 如果没有则将其赋值为空数组
      songs = songs || [];
      // 判断正在添加的歌曲本地中有没有
      let simiList = songs.find((item) => {
        return songList.id === item.id;
      });
      // 有的话就只显示弹框
      if (simiList !== undefined) {
        this.$bus.$emit("block");
        this.$bus.$emit("showAddTips");
      } else {
        // 反之将其添加
        songs.push(songList);
        localStorage.setItem("song", JSON.stringify(songs));
        this.$bus.$emit("block");
        this.$bus.$emit("update");
        this.$bus.$emit("showAddTips");
      }
    },
  }
}

