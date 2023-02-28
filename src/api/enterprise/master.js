import request from '@/utils/request'

export const api = {
	getMasterPageList: '/api/zhanzhang/getMasterPageList',
	saveOrDeleteWorker: '/api/zhanzhang/saveOrDeleteWorker'
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
