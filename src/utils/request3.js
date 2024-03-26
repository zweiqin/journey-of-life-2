import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { elMessage } from '@/config/tipTools'

// create an axios instance
const service = axios.create({
	baseURL: process.env.BASE_COMMUNITY_API, // api 的 process.env.BASE_COMMUNITY_API
	timeout: 60 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
	(config) => {
		// Do something before request is sent
		if (store.getters.token) {
			// 让每个请求携带token-- ['TK-token']为自定义key 请根据实际情况自行修改
			config.headers['TK-token'] = getToken()
		}
		return config
	},
	(error) => {
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use((response) => {
	const res = response.data
	// console.log(res)
	if (res.erron && res.erron === 780) {
		Message({
			message: '服务器内部错误' || 'Error',
			type: 'error',
			duration: 5 * 1000
		})
	} else {
		// if the custom code is not 20000, it is judged as an error.
		if (res.statusCode !== 20000) {
			Message({
				message: res.statusMsg || 'Error',
				type: 'error',
				duration: 5 * 1000
			})

			// 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
			if (
				res.statusCode === 50008 ||
        res.statusCode === 50012 ||
        res.statusCode === 50014
			) {
				// to re-login
				MessageBox.confirm(
					'You have been logged out, you can cancel to stay on this page, or log in again',
					'Confirm logout',
					{
						confirmButtonText: 'Re-Login',
						cancelButtonText: 'Cancel',
						type: 'warning'
					}
				).then(() => {
					store.dispatch('user/resetToken').then(() => {
						location.reload()
					})
				})
			}
			return Promise.reject(new Error(res.statusMsg || res.errmsg || 'Error'))
			// return res;
		}
		return res
	}
	return res
}, (error) => {
	console.log('err' + error)// for debug
	Message({
		message: '登录连接超时（后台不能连接，请联系系统管理员）',
		type: 'error',
		duration: 5 * 1000
	})
	return Promise.reject(error)
})

export default service
