import { request } from "./request";
// 获取二维码的 key
export function getQrCodeKey(){
  return request({
    url:'/login/qr/key'
  })
}
// 生成二维码
export function getQrCode(key){
  return request({
    url:`/login/qr/create`,
    params:{
      key,
      qrimg:'qrimg'
    }
  })
}

// 二维码状态检测
export function getQrCheck(key,time){
  return request({
    url:`/login/qr/check`,
    params:{
      key,
      timerstamp:time
    }
  })
}