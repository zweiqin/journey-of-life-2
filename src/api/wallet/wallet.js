import request from '@/utils/request'

export const api = {
	getUserBalance: '/api/commonworker/getUserBalance',
	getWithdrawRecordList: '/api/commonworker/getWithdrawRecordList'
}

// 店长余额
export function getUserBalance(data) {
	return request({
		url: api.getUserBalance,
		method: 'POST',
		data
	})
}

// 提现记录列表
export function getWithdrawRecordList(data) {
	return request({
		url: api.getWithdrawRecordList,
		method: 'POST',
		data
	})
}
