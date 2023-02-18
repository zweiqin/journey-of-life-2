import { loginByUsername, LoginByVerification, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Vue from 'vue'

const user = {
	state: {
		user: '',
		status: '',
		code: '',
		token: getToken(),
		name: '',
		avatar: '',
		userId: '',
		introduction: '',
		roles: [],
		typ: '',
		perms: [],
		setting: {
			articlePlatform: []
		}
	},

	mutations: {
		SET_CODE: (state, code) => {
			state.code = code
		},
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_INTRODUCTION: (state, introduction) => {
			state.introduction = introduction
		},
		SET_SETTING: (state, setting) => {
			state.setting = setting
		},
		SET_STATUS: (state, status) => {
			state.status = status
		},
		SET_NAME: (state, name) => {
			state.name = name
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		SET_USERID: (state, userId) => {
			state.userId = userId
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		},
		SET_ROLES_TYPE: (state, typ) => {
			state.typ = typ
		},
		SET_PERMS: (state, perms) => {
			state.perms = perms
		}
	},

	actions: {
		// 密码登录
		LoginByUsername({ commit }, userInfo) {
			const username = userInfo.username.trim()
			const password = userInfo.password
			const code = userInfo.code
			const uuid = userInfo.uuid
			const typ = userInfo.typ
			return new Promise((resolve, reject) => {
				loginByUsername(username, password, code, typ, uuid).then((response) => {
					const token = response.data.password
					commit('SET_TOKEN', token)

					commit('SET_ROLES', response.data.typ === 0 ? '站长' : '师傅')
					commit('SET_ROLES_TYPE', response.data.typ)
					// commit('SET_PERMS', response.data.typ === 0 ? [ '*' ] : [])
					commit('SET_NAME', response.data.account)
					commit('SET_AVATAR', response.data.headUrl)
					commit('SET_USERID', response.data.id)
					commit('SET_INTRODUCTION', response.data.status === 1 ? '启用' : '禁用')
					Vue.ls.set('user_information', {
						roles: response.data.typ === 0 ? '站长' : '师傅',
						perms: response.data.typ === 0 ? [ '*' ] : null,
						name: response.data.account,
						typ: response.data.typ,
						avatar: response.data.headUrl,
						userId: response.data.id,
						introduction: response.data.status === 1 ? '启用' : '禁用'
					})

					setToken(token)
					resolve()
				})
					.catch((error) => {
						reject(error)
					})
			})
		},

		// 短信登录
		LoginByVerification({ commit }, userInfo) {
			const phone = userInfo.phone.trim()
			const code = userInfo.code
			return new Promise((resolve, reject) => {
				LoginByVerification(phone, code).then((response) => {
					const token = response.data
					commit('SET_TOKEN', token)
					setToken(token)
					resolve()
				})
					.catch((error) => {
						reject(error)
					})
			})
		},

		// 获取用户信息
		GetUserInfo({ commit, state }) {
			return new Promise((resolve, reject) => {
				// getUserInfo(state.token).then((response) => {
				// const data = response.data
				try {
					const data = Vue.ls.get('user_information')

					if (data.perms && data.perms.length > 0) { // 验证返回的perms是否是一个非空数组
						commit('SET_PERMS', data.perms)
					} else {
						reject('getInfo: perms must be a non-null array !')
					}

					commit('SET_ROLES', data.roles)
					commit('SET_NAME', data.name)
					commit('SET_AVATAR', data.avatar)
					commit('SET_USERID', data.userId)
					commit('SET_INTRODUCTION', data.introduction)
					commit('SET_ROLES_TYPE', data.typ)

					resolve({ data })
					// resolve(response)
				} catch (error) {
					console.log('errorerrorerrorerror', error)
					reject(error)
				}
				// })
				// 	.catch((error) => {
				// 		console.log('errorerrorerrorerror', error)
				// 		reject(error)
				// 	})
			})
		},

		// 第三方验证登录
		// LoginByThirdparty({ commit, state }, code) {
		//   return new Promise((resolve, reject) => {
		//     commit('SET_CODE', code)
		//     loginByThirdparty(state.status, state.email, state.code).then(response => {
		//       commit('SET_TOKEN', response.data.token)
		//       setToken(response.data.token)
		//       resolve()
		//     }).catch(error => {
		//       reject(error)
		//     })
		//   })
		// },

		// 登出
		LogOut({ commit, state }) {
			return new Promise((resolve, reject) => {
				// logout(state.token).then(() => {
				commit('SET_TOKEN', '')
				commit('SET_ROLES', [])
				commit('SET_ROLES_TYPE', '')
				commit('SET_PERMS', [])
				removeToken()
				Vue.ls.remove('user_information')
				resolve()
				// })
				// 	.catch((error) => {
				// 		reject(error)
				// 	})
			})
		},

		// 前端 登出
		FedLogOut({ commit }) {
			return new Promise((resolve) => {
				commit('SET_TOKEN', '')
				removeToken()
				resolve()
			})
		},

		// 动态修改权限
		ChangeRoles({ commit, dispatch }, role) {
			return new Promise((resolve) => {
				commit('SET_TOKEN', role)
				setToken(role)
				getUserInfo(role).then((response) => {
					const data = response.data
					commit('SET_ROLES', data.roles)
					commit('SET_PERMS', data.perms)
					commit('SET_NAME', data.name)
					commit('SET_AVATAR', data.avatar)
					commit('SET_USERID', data.userId)
					commit('SET_INTRODUCTION', data.introduction)
					dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
					resolve()
				})
			})
		}
	}
}

export default user
