import {request} from './request'
export function phoneLogin(phone,password){
  return request({
    method:"POST",
    url:'/login/cellphone',
    params:{
      phone:phone,
      password:password,
    }
  })
} 
// 刷新登陆状态
export function loginRefresh(){
  return request({
    method:'POST',
    url:'/login/refresh',
    data:{
      cookie:localStorage.getItem('userInfo')
    }
    
  })
}