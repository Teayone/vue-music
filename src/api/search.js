// 搜索相关的接口
import {request} from './request'
// 搜索建议
export function searchSugGest(keywords){
  return request({
    url:'/search/suggest',
    params:{
      keywords
    }
  })
}

// 搜索
export function searchList(keywords,type,offset){
  if(offset){
    return request({
      url:'/search',
      params:{
        keywords,
        type,
        limit:30,
        offset
      }
    })
  }else{
    return request({
      url:'/search',
      params:{
        keywords,
        type,
        limit:30,
      }
    })
  }

}