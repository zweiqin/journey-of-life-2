/**
 * 首页
*/

import request from '@/utils/request'

export const api = {
	zhanzhangStatistics: '/api/zhanzhang/statistics'
}

// // 首页管理列表
// export function orderPagelist(params) {
// 	return request({
// 		url: api.orderPagelist,
// 		method: 'POST',
// 		params
// 	})
// }

// 首页详情
export function zhanzhangStatistics(data) {
	return request({
		url: api.zhanzhangStatistics,
		method: 'POST',
		data
	})
}

