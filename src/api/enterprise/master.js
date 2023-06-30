import request from '@/utils/request'

export const api = {
	getMasterPageList: '/api/zhanzhang/getMasterPageList',
	saveOrDeleteWorker: '/api/zhanzhang/saveOrDeleteWorker',
	getByUserIdAccountFlowingWater: '/api/commonworker/getByUserIdAccountFlowingWater'
}

// 师傅列表
export function getMasterPageList(data) {
	return request({
		url: api.getMasterPageList,
		method: 'POST',
		data
	})
}

// 师傅操作
export function saveOrDeleteWorker(data) {
	return request({
		url: api.saveOrDeleteWorker,
		method: 'POST',
		data
	})
}

// 查询指定师傅流水
export function getByUserIdAccountFlowingWater(params) {
	return request({
		url: api.getByUserIdAccountFlowingWater,
		method: 'GET',
		params
	})
}
