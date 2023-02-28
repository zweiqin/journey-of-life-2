import request from '@/utils/request'

export const api = {
	getMasterInfoByUserId: '/api/zhanzhang/getMasterInfoByUserId'
}

// 基本信息
export function getMasterInfoByUserId(data) {
	return request({
		url: api.getMasterInfoByUserId,
		method: 'POST',
		data
	})
}
