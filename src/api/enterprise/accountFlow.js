import request from '@/utils/request'

export const api = {
	queryAccountFlowingWater: '/api/commonworker/queryAccountFlowingWater'
}

// 查询账户流水信息
export function queryAccountFlowingWater(data) {
	return request({
		url: api.queryAccountFlowingWater,
		method: 'POST',
		data
	})
}
