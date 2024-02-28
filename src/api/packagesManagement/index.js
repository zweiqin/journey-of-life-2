import request2 from '@/utils/request2'
export const api = {
	partnerPage: '/communityTJ/partnerPage',
	partnerOrder: 'communityTJ/partnerOrder',
	cancellationWrite: 'communityTJ/write',
	getArea: 'cityManageArea/getTreeOne'
}

/**
 * 获取会员订单列表
 */
// 订单详情
export function partnerPage(data) {
	return request2({
		url: api.partnerPage,
		method: 'POST',
		data
	})
}

// communityTJ/partnerOrder 查询499订单
export function getPartnerOrder(data) {
	return request2({
		url: api.partnerOrder,
		method: 'POST',
		data
	})
}

// communityTJ/partnerOrder 核销499订单
export function cancellationWrite(data) {
	return request2({
		url: api.cancellationWrite,
		method: 'POST',
		data
	})
}

// 查询区域列表
export function getAreaList(params) {
	return request2({
		url: api.getArea,
		method: 'GET',
		params
	})
}
