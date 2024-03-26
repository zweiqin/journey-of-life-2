import request from '@/utils/request'
import request3 from '@/utils/request3'

// 判断该服务是否允许修改佣金分配比例
export function queryListByServerInfoIds(data) {
	return request({
		url: '/api/laoa_moduan_combination_server_content/queryListByServerInfoIds',
		method: 'POST',
		data
	})
}

// 判断该服务是否允许修改佣金分配比例
export function editBizConf(data) {
	return request({
		url: '/api/laoa_moduan_combination_server_content/editBizConf',
		method: 'POST',
		data
	})
}

// /third/community/queryLeftList
export function getServiceType(data) {
	return request3({
		url: '/third/community/queryLeftList',
		data
	})
}
