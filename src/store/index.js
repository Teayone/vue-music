import Vue from 'vue'
import Vuex from 'vuex'
// 导入请求歌单详情数据
import {getSongsUrl} from '../api/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 判断是否登录，显示不同的内容,默认为true:未登录
    whetherLogin:true,
    // 保存用户账号信息
    profile:null,
    // 用户等级
    userLevel:{
      level:0
    },
    // 用户信息
    userDetail:{
      profile:{
        follows:0,
        followeds:0
      }
    },
    // 热门推荐(未登录和已登录都会在这里被重新赋值)
    playList:null,
    // 保存20首歌曲封面歌手数据
    songDetail:null,
    // 控制播放第几首歌曲,默认第一首
    index:0,
    // 播放按钮的切换
    flag:false,
    // 如果只有一首歌的id则将那首歌push 进这个数组中
    songs:[],
    // 歌曲播放模式,默认列表循环
    songState:'loop',
  },
  mutations: {
    // 是否显示登陆后的模块
    SHOW(state,data){
      state.whetherLogin = data
    },
    // 账号详情
    USERDETAIL(state,data){
      state.profile = data
    },
    // 用户等级
    USERLEVEL(state,data){
      state.userLevel = data
    },
    // 用户信息
    USERINFO(state,data){
      state.userDetail = data
    },
    // 未登录和已登录的推荐歌单
    PLAYLIST(state,data){
      state.playList = data
    },
    // 下一首(包含歌曲结束后的自动切换)
    ADDINDEX(state){
      let song = JSON.parse(localStorage.getItem('song')?localStorage.getItem('song'):"null")
      if(song){
        if(state.songState === 'loop'){ // 循环
          ++state.index
          if(state.index===song.length){state.index=0}
        }else if(state.songState === "random"){ // 随机
          let rdm = Math.floor(Math.random()*song.length)
          state.index = rdm
        }else{ // 单曲循环
          state.index = state.index
        }
        localStorage.setItem('index',state.index)
      }else{
        return
      }

     
    },
    // 上一首
    REDUCEINDEX(state){
      let song = JSON.parse(localStorage.getItem('song')?localStorage.getItem('song'):null)
      if(song){
        if(state.songState==='loop'){
          if(state.index === 0){
            state.index = song.length
          }
          --state.index
        }else if(state.songState ==='random'){
          let rdm = Math.floor(Math.random()*song.length)
          state.index = rdm
        }else{
          state.index = state.index
        }
        localStorage.setItem('index',state.index)   
      }else{
        return 
      }

    },
    // 重置index(防止点击其他歌单时,index还在保存状态)
    RESETINDEX(state){
      state.index=0
      localStorage.setItem('index',state.index)

    },
    // 修改指定的 index 状态
    CACHEINDEX(state,i){
      state.index=i
      localStorage.setItem('index',state.index)
    },
    // 修改播放或暂停状态
    ISFLAG(state){
      state.flag = !state.flag
    },
    // 将歌单的众多歌曲存到songs中
    CUNSONGSI(state,data){
      // 将没版权的歌进行筛选
      data =  data.filter(item=>{
        return item.noCopyrightRcmd===null
      })
      state.songs = data
      localStorage.setItem('song',JSON.stringify(data))
    },
    // 修改index为数组最后
    LASTINDEX(state){
      let song = JSON.parse(localStorage.getItem('song'))
      state.index = song.length-1
      // 然后重置本地的index
      localStorage.setItem('index',state.index)
    },
    // 删除某个 index
    SPLICEINDEX(state,index){
      state.songs.splice(index,1)
      if(state.songs.length === 0){
        localStorage.removeItem('song')
        this._vm.$bus.$emit('update')
      }else{
        // 修改之后重新更新状态
        localStorage.setItem('song',JSON.stringify(state.songs))
        this._vm.$bus.$emit('update')
      }
      

    },
    // 修改列表播放模式
    CHANGESONGSTATE(state,pattern){
      state.songState = pattern
    },
  },
  actions: {
    // 通过详细的歌曲id获取歌曲路径
    songUrl(content){
      // 读取本地数据
      let song = JSON.parse(localStorage.getItem('song'))
      getSongsUrl(song[content.state.index].id).then(url=>{
        // 将得到的数据发送到事件总线
        this._vm.$bus.$emit('playSong',url.data.data[0].url)
      })
    }
  },
  modules: {
  }
})
