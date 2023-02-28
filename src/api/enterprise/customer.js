import request from '@/utils/request'

export const api = {
	getCustomerList: '/api/customer/getCustomerList',
	customerSave: '/api/customer/save',
	customerUpdateById: '/api/customer/updateById',
	getCustomerInfo: '/api/customer/getCustomerInfo',
	customerDeleteById: '/api/customer/deleteById'
}

// // 客户列表
// export function getCustomerList(params) {
// 	return request({
// 		url: api.getCustomerList,
// 		method: 'POST',
// 		params
// 	})
// }

// 新增
export function customerSave(data) {
	return request({
		url: api.customerSave,
		method: 'POST',
		data
	})
}

// 修改
export function customerUpdateById(data) {
	return request({
		url: api.customerUpdateById,
		method: 'POST',
		data
	})
}

// 删除
export function customerDeleteById(data) {
	return request({
		url: api.customerDeleteById,
		method: 'POST',
		data
	})
}

// 详情
export function getCustomerInfo(params) {
	return request({
		url: `${api.getCustomerInfo}/${params.id}`,
		method: 'GET',
		params
	})
}
