/**
 * 订单管理
*/

import request from '@/utils/request'

export const api = {
	getOrderInfo: '/api/order/getOrderInfo',
	orderPagelist: '/api/order/orderPagelist',
	updateByOrderNoStatus: '/api/order/updateByOrderNoStatus',
	createOrderExtra: '/api/order/createOrderExtra',
	queryExtraList: '/api/extra/queryExtraList',
	getOrderExtraInfo: '/api/extra/getOrderExtraInfo',
	createOrder: '/api/zhanzhang/createOrder'
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

// 追加金额订单列表
export function queryExtraList(data) {
	return request({
		url: api.queryExtraList,
		method: 'POST',
		data
	})
}

// 追加金额订单详情
export function getOrderExtraInfo(data) {
	return request({
		url: api.getOrderExtraInfo,
		method: 'POST',
		data
	})
}

// 自建单（站长创建订单）
export function createOrder(data) {
	return request({
		url: api.createOrder,
		method: 'POST',
		data
	})
}

