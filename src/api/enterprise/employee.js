import request from '@/utils/request'

export const api = {
	getEmployeeList: '/api/employee/getEmployeeList',
	// employeeSave: '/api/employee/save',
	// employeeUpdateById: '/api/employee/updateById',
	// getEmployeInfo: '/api/employee/getEmployeInfo',
	// employeeDeleteById: '/api/employee/deleteById',
	correlationSave: '/api/correlation/save',
	correlationDelete: '/api/correlation/delete',
	getCorrelationList: '/api/correlation/getCorrelationList',
	correlationInfo: '/api/correlation/info',
	authorityList: '/api/authority/list',
	authorityInfo: '/api/authority/info',
	saveOrUpdateAuthority: '/api/authority/saveOrUpdateAuthority'
}

// // 员工列表
// export function getEmployeeList(params) {
// 	return request({
// 		url: api.getEmployeeList,
// 		method: 'GET',
// 		params
// 	})
// }

// // 新增员工
// export function employeeSave(data) {
// 	return request({
// 		url: api.employeeSave,
// 		method: 'POST',
// 		data
// 	})
// }

// // 修改员工
// export function employeeUpdateById(data) {
// 	return request({
// 		url: api.employeeUpdateById,
// 		method: 'POST',
// 		data
// 	})
// }

// // 员工详情
// export function getEmployeInfo(params) {
// 	return request({
// 		url: `${api.getEmployeInfo}/${params.id}`,
// 		method: 'GET',
// 		params
// 	})
// }

// // 删除员工
// export function employeeDeleteById(data) {
// 	return request({
// 		url: api.employeeDeleteById,
// 		method: 'POST',
// 		data
// 	})
// }

// 关联员工
export function correlationSave(data) {
	return request({
		url: api.correlationSave,
		method: 'POST',
		data
	})
}

// 解除关联
export function correlationDelete(params) {
	return request({
		url: api.correlationDelete,
		method: 'GET',
		params
	})
}

// 关联列表
export function getCorrelationList(data) {
	return request({
		url: api.getCorrelationList,
		method: 'POST',
		data
	})
}

// 员工详情
export function correlationInfo(params) {
	return request({
		url: `${api.correlationInfo}/${params.id}`,
		method: 'GET',
		params
	})
}

// 权限列表
export function authorityList(params) {
	return request({
		url: api.authorityList,
		method: 'GET',
		params
	})
}

// 查询用户拥有的权限
export function authorityInfo(params) {
	return request({
		url: api.authorityInfo,
		method: 'GET',
		params
	})
}

// 授权和取消授权
export function saveOrUpdateAuthority(data) {
	return request({
		url: api.saveOrUpdateAuthority,
		method: 'POST',
		data
	})
}
