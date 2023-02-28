/**
 * 订单管理
*/

import request from '@/utils/request'

export const api = {
	getOrderInfo: '/api/order/getOrderInfo',
	orderPagelist: '/api/order/orderPagelist',
	updateByOrderNoStatus: '/api/order/updateByOrderNoStatus',
	createOrderExtra: '/api/order/createOrderExtra'
}

// // 订单管理列表
// export function orderPagelist(params) {
// 	return request({
// 		url: api.orderPagelist,
// 		method: 'POST',
// 		params
// 	})
// }

// 订单详情
export function getOrderInfo(data) {
	return request({
		url: api.getOrderInfo,
		method: 'POST',
		data
	})
}

// 订单分配
export function updateByOrderNoStatus(data) {
	return request({
		url: api.updateByOrderNoStatus,
		method: 'POST',
		data
	})
}

// 订单追加金额
export function createOrderExtra(data) {
	return request({
		url: api.createOrderExtra,
		method: 'POST',
		data
	})
}

