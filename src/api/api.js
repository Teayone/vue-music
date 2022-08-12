// 导入请求文件
import {request} from './request'
// 获取轮播图
export function getBanner(){
 return request({
    url:'/banner'
 })
}
// 获取热门歌单
export function getPlayListHot(){
   return request({
      url:'/playlist/hot'
   })
}
// 获取歌单分类
export function getPlaylistCatlist(){
   return request({
      url:'/playlist/catlist'
   })
}
// 获取网友精选歌单
export function getPlaylistHighquality({cat,offset,order}){
  if(cat){
   return request({
      url:'/top/playlist',
      params:{
         limit:30,
         cat,
         offset,
         order
      }
   })
  }else{
   return request({
      url:'/top/playlist',
      params:{
         limit:30,
         offset,
         order
      }
   })
  }

}

// 首页歌单数据
export function getHomePlayList(){
   return request({
      url:'/top/playlist/highquality/hot',
      params:{
         limit:8
      }
   })
}
// 获取最新专辑
export function getAlbumNewest(){
   return request({
      url:'/album/newest',
   })
}
// 获取全部专辑
export function getAlbumNew(area='ALL',offset){
   return request({
      url:'/album/new',
      params:{
         area,
         offset
      }
   })
}
// 通过专辑ID获取全部歌曲
export function getAlbumSongs(id){
   return request({
      url:'/album',
      params:{
         id
      }
   })
}
// 排行榜详情
export function getTopList(){
   return request({
      url:'/toplist/detail',
   })
}
// 热门歌手数据
export function getHotSinger(){
   return request({
      url:'/top/artists',
      params:{
         limit:5
      }
   })
}
// 歌手页面的热门歌手数据
export function getTopArtist(offset){
   if(offset){
      return request({
         url:'/top/artists',
         params:{
            limit:30,
            offset:(offset-1)*30
         }
      })
   }else{
      return request({
         url:'/top/artists',
         params:{
            limit:30,
         }
      })
   }
}
// 歌手分类数据(华语，欧美，男歌手，女歌手)
export function getArtistList(type,area=-1,initial,offset){
   if(offset){
      return request({
         url:'/artist/list',
         params:{
            type,
            area,
            initial,
            offset:(offset-1)*30
         }
      })
   }else if(initial){
      return request({
         url:'/artist/list',
         params:{
            type,
            area,
            initial,
         }
      })
   }else{
      return request({
         url:'/artist/list',
         params:{
            type,
            area,
         }

      })
   }
}

// 热门主播数据
export function getHotDj(){
   return request({
      url:'/dj/toplist/popular',
      params:{
         limit:5
      }
   })
}
// 通过榜单(歌单)id获取全部歌曲
export function getWholeSongs(id){
   // 登陆后可以获取全部歌单数据
   let cookie = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
   if(cookie){
      let encode = encodeURIComponent(cookie)
      return request({
         url:'/playlist/detail',
         params:{
            id,
            cookie:encode,
            
         }
      })
   }else{
      return request({
         url:'/playlist/detail',
         params:{
            id
         }
      })
   }
 

}
// 获取具体某首音乐的路径
export function getSongsUrl(id){
   let cookie = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
   // 注:ID可多个,用逗号隔开
   if(cookie){
      let encode = encodeURIComponent(cookie)
      return request({
         url:'/song/url',
         params:{
            cookie:encode,
            id
         }
      })
   }else{
      return request({
         url:'/song/url',
         params:{
            id
         }
      })
   }

}
// 获取音乐是否可用(版权)
export function getCheckMusic(id){
   return request({
      url:'/check/music',
      params:{
         id
      }
   })
}
// 获取推荐歌单(未登录)
export function getPersonalized(){
   return request({
      url:'/personalized',
      limit:8
   })
}
// 获取登陆后的推荐歌单
export function getLoginPlayList(){
   let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
   let encode = encodeURIComponent(cookies)
   return request({
      url:'/recommend/resource',
      params:{
         cookie:encode
      }
   })
}
// 添加歌曲到歌单,暂不能用
export function addPlaylistTracks(op,pid,tracks){
   return request({
      method: 'get',
      url:'/playlist/tracks',
      params:{
         op,
         pid,
         tracks
      }
   })
}


// 获取单独的歌曲详情
export function getSongDetail(ids){
   return request({
      url:'/song/detail',
      params:{
         ids
      }
   })
}
// 获取歌词
export function getLyric(id){
   return request({
      url:'/lyric',
      params:{
         id
      }
   })
}
// 获取每日歌单数据
export function getRecommend(){
   let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
   let encode = encodeURIComponent(cookies)
   return request({
      url:'/recommend/songs',
      params:{
         cookie:encode
      }
   })
}
// 歌曲评论
export function getMusicComment(id,offset,before){
   if(offset){
      return request({
         url:'/comment/music',
         params:{
            id,
            offset
         }
      })
   }else if(before){
      return request({
         url:'/comment/music',
         params:{
            id,
            offset,
            before,
       
         }
      })
   }else{
      return request({
         url:'/comment/music',
         params:{
            id
         }
      })
   }
}

// 歌单评论数据
export function getPlayListComment(id,offset,before){
   if(offset){
      return request({
         url:'/comment/playlist',
         params:{
            id,
            offset,
         }
      })
   }else if(before){
      return request({
         url:'/comment/playlist',
         params:{
            id,
            offset,
            before,
       
         }
      })
   }else{
      return request({
         url:'/comment/playlist',
         params:{
            id,
         }
      })
   }

}
// 专辑评论
export function getAlbumComment(id,offset,before){
   if(offset){
      return request({
         url:'/comment/album',
         params:{
            id,
            offset
         }
      })
   }else if(before){
      return request({
         url:'/comment/album',
         params:{
            id,
            offset,
            before
         }
      })
   }else{
      return request({
         url:'/comment/album',
         params:{
            id
         }
      })
   }
  
}
// 歌手的所有专辑，默认50
export function getSingAlbum(id){
   return request({
      url:'/artist/album',
      params:{
         id
      }
   })
}
// 相关歌单推荐
export function getRelatedPlayList(id){
   return request({
      url:'/related/playlist',
      params:{
         id
      }
   })
}
// 相似歌单推荐(根据歌曲id推荐相似歌单)
export function getSimiPlayList(id){
   return request({
      url:'/simi/playlist',
      params:{
         id
      }
   })
}

// 发送评论
export function sendComment({t,type,id,content}){
   let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
   let encode = encodeURIComponent(cookies)
   return request({
      url:'/comment',
      params:{
         t,
         type,
         id,
         content,
         cookie:encode
      }
   })
} 

// 歌手热门50首
export function getSingerTopSong(id){
   return request({
      url:'/artist/top/song',
      params:{
         id
      }
   })
}

// 获取歌手详情
export function getSingerDetail(id){
   return request({
      url:'/artist/detail',
      params:{
         id
      }
   })
}

// 获取歌手专辑
export function getSingerAlbum(id,offset){
   if(offset){
      return request({
         url:'/artist/album',
         params:{
            limit:12,
            offset,
            id
         }
      })
   }else{
      return request({
         url:'/artist/album',
         params:{
            limit:12,
            id
         }
      })
   }
  
}

// 获取歌手 MV
export function getSingerMV(id){
   return request({
      url:'/artist/mv',
      params:{
         id
      }
   })
}

// 获取歌手描述
export function getSingerDesc(id){
   return request({
      url:'/artist/desc',
      params:{
         id
      }
   })
}
// 获取相似歌手
export function getSimiArtist(id){
   return request({
      url:'/simi/artist',
      params:{
         id
      }
   })
}
// 根据歌曲id获得相似歌单
export function getSimiSongPlayList(id){
   return request({
      url:'/simi/playlist',
      params:{
         id
      }
   })
}
// 获取相似音乐
export function getSimiSong(id){
   return request({
      url:'/simi/song',
      params:{
         id
      }
   })
}

// 获取mv地址
export function getMvUrl(id,r=1080){
   return request({
      url:'/mv/url',
      params:{
         id,
         r
      }
   })
}
// 获取 mv分辨率列表(和mv信息详情)
export function getMvDetail(mvid){
   return request({
      url:'/mv/detail',
      params:{
         mvid
      }
   })
}
// 获取 mv评论
export function getMvComMent(id,offset,before){
   if(before){
      return request({
         url:'/comment/mv',
         params:{
            id,
            offset:(offset-1)*20,
            before
         }
      })
   }else if(offset){
      return request({
         url:'/comment/mv',
         params:{
            id,
            offset:(offset-1)*20,
     
         }
      })
   }else {
      return request({
         url:'/comment/mv',
         params:{
            id,
         }
      })
   }

}
// 获取相似 mv
export function getSimiMV(mvid){
   return request({
      url:'/simi/mv',
      params:{
         mvid
      }
   })
}


// 获取video地址
export function getVideoUrl(id,r){
   return request({
      url:'/video/url',
      params:{
         id,
         r
      }
   })
}
// 获取 video详情
export function getVideoDetail(id){
   return request({
      url:'/video/detail',
      params:{
         id
      }
   })
}
// 获取视频评论
export function getVideoComMent(id,offset,before){
   if(before){
      return request({
         url:'/comment/video',
         params:{
            id,
            offset:(offset-1)*20,
            before
         }
      })
   }else if(offset){
      return request({
         url:'/comment/video',
         params:{
            id,
            offset:(offset-1)*20,
      
         }
      })
   }else{
      return request({
         url:'/comment/video',
         params:{
            id,
         }
      })
   }
}
// 获取相关视频
export function getRelatedAllvideo(id){
   return request({
      url:'/related/allvideo',
      params:{
         id
      }
   })
}