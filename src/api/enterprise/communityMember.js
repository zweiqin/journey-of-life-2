import request from '@/utils/request'

export const api = {
	savePartner: '/api/partner/savePartner',
	getPartnerList: '/api/partner/getPartnerList',
	deleteByPartner: '/api/partner/deleteByPartner',
	getPartnerInfo: '/api/partner/getPartnerInfo'
}

// 指定合伙人
export function savePartner(data) {
	return request({
		url: api.savePartner,
		method: 'POST',
		data
	})
}

// 合伙人信息列表
export function getPartnerList(data) {
	return request({
		url: api.getPartnerList,
		method: 'POST',
		data
	})
}

// 取消指定
export function deleteByPartner(params) {
	return request({
		url: api.deleteByPartner,
		method: 'DELETE',
		params
	})
}

// 合伙人详情接口
export function getPartnerInfo(params) {
	return request({
		url: api.getPartnerInfo,
		method: 'GET',
		params
	})
}

