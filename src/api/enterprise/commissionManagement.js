import request from '@/utils/request'

export const api = {
	getCommissionStatistics: '/api/partner/getCommissionStatistics',
	getCommissionList: '/api/partner/getCommissionList',
	getByMenmberIdList: '/api/partner/getByMenmberIdList'
}

// 查询账户流水信息
export function getCommissionStatistics(params) {
	return request({
		url: api.getCommissionStatistics,
		method: 'GET',
		params
	})
}

// 佣金详细列表
export function getCommissionList(params) {
	return request({
		url: api.getCommissionList,
		method: 'GET',
		params
	})
}

// 查询绑定会员
export function getByMenmberIdList(params) {
	return request({
		url: api.getByMenmberIdList,
		method: 'GET',
		params
	})
}
