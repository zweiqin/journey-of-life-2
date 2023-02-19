/**
 * 订单管理
*/

import request from '@/utils/request'

export const api = {
	orderPagelist: '/api/order/orderPagelist',
	getOrderInfo: '/api/order/getOrderInfo'
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

