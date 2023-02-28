import request from '@/utils/request'

export const api = {
	getEmployeeList: '/api/employee/getEmployeeList',
	employeeSave: '/api/employee/save',
	employeeUpdateById: '/api/employee/updateById',
	getEmployeInfo: '/api/employee/getEmployeInfo',
	employeeDeleteById: '/api/employee/deleteById'
}

// // 员工列表
// export function getEmployeeList(params) {
// 	return request({
// 		url: api.getEmployeeList,
// 		method: 'POST',
// 		params
// 	})
// }

// 新增员工
export function employeeSave(data) {
	return request({
		url: api.employeeSave,
		method: 'POST',
		data
	})
}

// 修改员工
export function employeeUpdateById(data) {
	return request({
		url: api.employeeUpdateById,
		method: 'POST',
		data
	})
}

// 员工详情
export function getEmployeInfo(params) {
	return request({
		url: `${api.getEmployeInfo}/${params.id}`,
		method: 'GET',
		params
	})
}

// 删除员工
export function employeeDeleteById(data) {
	return request({
		url: api.employeeDeleteById,
		method: 'POST',
		data
	})
}
