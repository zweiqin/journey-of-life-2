import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'


// create an axios instance
const service = axios.create({
	baseURL: process.env.BASE_SHOWAPI, // api 的 base_url
	timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
	(config) => {
		console.log("草了", config);
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

	// if (res.code === '501') {
	// 	MessageBox.alert('系统未登录，请重新登录', '错误', {
	// 		confirmButtonText: '确定',
	// 		type: 'error'
	// 	}).then(() => {
	// 		store.dispatch('FedLogOut').then(() => {
	// 			location.reload()
	// 		})
	// 	})
	// 	return Promise.reject('error')
	// } else if (res.code === '502') {
	// 	MessageBox.alert('系统内部错误，请联系管理员维护', '错误', {
	// 		confirmButtonText: '确定',
	// 		type: 'error'
	// 	})
	// 	return Promise.reject('error')
	// } else if (res.code === '503') {
	// 	MessageBox.alert('请求业务目前未支持', '警告', {
	// 		confirmButtonText: '确定',
	// 		type: 'error'
	// 	})
	// 	return Promise.reject('error')
	// } else if (res.code === '504') {
	// 	MessageBox.alert('更新数据已经失效，请刷新页面重新操作', '警告', {
	// 		confirmButtonText: '确定',
	// 		type: 'error'
	// 	})
	// 	return Promise.reject('error')
	// } else if (res.code === '505') {
	// 	MessageBox.alert('更新失败，请再尝试一次', '警告', {
	// 		confirmButtonText: '确定',
	// 		type: 'error'
	// 	})
	// 	return Promise.reject('error')
	// } else if (res.code === '506') {
	// 	MessageBox.alert('没有操作权限，请联系管理员授权', '错误', {
	// 		confirmButtonText: '确定',
	// 		type: 'error'
	// 	})
	// 	return Promise.reject('error')
	// } else if (res.code !== '0') {
	// 	// 非5xx的错误属于业务错误，留给具体页面处理
	// 	return Promise.reject(response)
	// }
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
