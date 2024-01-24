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
// 获取部门详情
export function getDetailsApi(id) {
  return service({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}
// 修改部门详情
export function getDetailsListApi(id, data) {
  return service({
    url: `/company/department/${id}`,
    method: 'PUT',
    data
  })
}
// 删除部门
export function getDeleteListApi(id) {
  return service({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
