import request from '@/utils/request'

export const api = {
	getWithdrawRecordList: '/api/commonworker/getWithdrawRecordList'
}

// 提现记录列表
export function getWithdrawRecordList(data) {
	return request({
		url: api.getWithdrawRecordList,
		method: 'POST',
		data
	})
}
