import service from '@/utils/request'

// 获取部门列表
export function getDepartmentListApi() {
  return service({
    url: '/company/department',
    method: 'GET'
  })
}
// 获取部门负责人列表
export function getDepartmentUserListApi() {
  return service({
    url: '/sys/user/simple',
    method: 'GET'
  })
}
// 添加部门
export function getListApi(data) {
  return service({
    url: '/company/department',
    method: 'POST',
    data
  })
}
