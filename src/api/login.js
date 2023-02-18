import request from '@/utils/request'

// 密码登录方法
export function loginByUsername(mobile, password, graphCode, typ, uuid) {
	const data = {
		mobile,
		password,
		graphCode,
		typ,
		uuid
	}
	return request({
		url: '/auth/accountLogin',
		method: 'post',
		data
	})
}

// 短信登录方法
export function LoginByVerification(phone, code) {
	const data = {
		phone,
		code
	}
	return request({
		url: '/xxx/xxx',
		method: 'post',
		data
	})
}

// 获取用户详细信息
export function getUserInfo() {
	return request({
		url: '/auth/info',
		method: 'get'
	})
}

// 退出方法
export function logout() {
	return request({
		url: '/auth/logout',
		method: 'post'
	})
}

// 获取验证码
export function getCodeImg() {
	return request({
		url: '/api/commonworker/verifyCode',
		method: 'get'
	})
}
