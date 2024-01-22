import service from '@/utils/request'

// 登录
export function loginApi(data) {
  return service({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
// 获取用户信息
export function getUserApi() {
  return service({
    url: '/sys/profile',
    method: 'GET'
  })
}
// 修改用户密码
export function getAddUpdateApi(data) {
  return service({
    url: '/sys/user/updatePass',
    method: 'PUT',
    data
  })
}
