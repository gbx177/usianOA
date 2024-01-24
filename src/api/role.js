import service from '@/utils/request'
// 获取角色列表
export function getRoleListApi(params) {
  return service({
    url: 'sys/role',
    method: 'GET',
    params
  })
}
// 新增角色
export function getAddListApi(data) {
  return service({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
