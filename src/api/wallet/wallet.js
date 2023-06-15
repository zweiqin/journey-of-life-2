import request from '@/utils/request'

export const api = {
	getUserBalance: '/api/commonworker/getUserBalance',
	queryAccountFlowingWater: '/api/commonworker/queryAccountFlowingWater'
}

// 店长余额
export function getUserBalance(data) {
	return request({
		url: api.getUserBalance,
		method: 'POST',
		data
	})
}

// 查询账户流水信息
export function queryAccountFlowingWater(data) {
	return request({
		url: api.queryAccountFlowingWater,
		method: 'POST',
		data
	})
}
