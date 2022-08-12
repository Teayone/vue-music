
import {request} from './request'

// 获取账号信息
export function getUserAdminDetail(){
  let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
  let encode = encodeURIComponent(cookies)
  return request({
    url:'/user/account',
    params:{
      cookie:encode
    }
  })
}
// 获取用户等级
export function getUserLevel(){
  let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
  let encode = encodeURIComponent(cookies)
  return request({
    url:'/user/level',
    params:{
      cookie:encode
    }
  })
}

// 退出登录
export function outLogin(){
  let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
  let encode = encodeURIComponent(cookies)
  return request({
    url:'/logout',
    params:{
      cookie:encode
    }

  })
}
// 签到,暂时报错，目前不知道啥原因
export function dailySignin(){
  let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
  let encode = encodeURIComponent(cookies)
  return request({
    url:'/daily_signin',
    params:{
      cookie:encode,
    }
  })
}
// 用户详情
export function getUserDetail(uid){
  return request({
    url:'/user/detail',
    params:{
      uid
    }
  })
}
// 用户收藏类的信息
export function getUserSubCount(){
  let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
  let encode = encodeURIComponent(cookies)
  return request({
    url:'/user/subcount',
    params:{
      cookie:encode
    }
  })
}

// 用户播放记录
export function getUserRecord(uid,type=1){
  return request({
    url:'/user/record',
    params:{
      uid,
      type
    }
  })
}

// 用户歌单
export function getUserPlayList(uid,offset){
  let cookies = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):''
  let encode = encodeURIComponent(cookies)
  if(offset){
    return request({
      url:'/user/playlist',
      params:{
        uid,
        cookie:encode,
        offset
      }
    })
  }else{
    return request({
      url:'/user/playlist',
      params:{
        uid,
        cookie:encode,
      }
    })
  }
}