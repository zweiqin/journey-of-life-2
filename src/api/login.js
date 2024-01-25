import request from '@/utils/request'

// 密码登录方法
export function loginByUsername(params) {
	return request({
		url: '/auth/mobileLogin',
		method: 'get',
		params
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

// 获取手机验证码
export const sendeQrCodeApi = phoneNumber => {
	return request({
		url: '/api/commonworker/sendVerificationCode',
		data: { phoneNumber },
		method: 'POST'
	})
}
