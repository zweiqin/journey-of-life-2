import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */

import Layout from '@/views/layout/Layout'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    perms: ['GET /aaa','POST /bbb']     will control the page perms (you can set multiple perms)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/

export const constantRouterMap = [
	{
		path: '/redirect',
		component: Layout,
		hidden: true,
		children: [
			{
				path: '/redirect/:path*',
				component: () => import('@/views/redirect/index')
			}
		]
	},
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/auth-redirect',
		component: () => import('@/views/login/authredirect'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/errorPage/404'),
		hidden: true
	},
	{
		path: '/401',
		component: () => import('@/views/errorPage/401'),
		hidden: true
	},
	{
		path: '',
		component: Layout,
		redirect: 'homepage',
		children: [
			{
				path: 'homepage',
				component: () => import('@/views/homepage/index'),
				name: 'Homepage',
				meta: { title: 'homepage', icon: 'home', noCache: true }
			}
		]
	}
]

export default new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRouterMap
})

export const asyncRouterMap = [
	{
		path: '/receivingManagement',
		component: Layout,
		// alwaysShow: true,
		redirect: 'noredirect',
		meta: {
			title: '????????????',
			icon: 'order',
			noCache: true
		},
		children: [
			{
				path: 'ReceivingList',
				component: () => import('@/views/receivingManagement/receivingList'),
				name: 'ReceivingList',
				// noShowingChildren: true,
				meta: {
					// perms: [ 'GET /admin/order/list' ],
					title: '????????????',
					noCache: true
				}
			}
		]
	},
	{
		path: '/orderManagement',
		component: Layout,
		alwaysShow: true,
		redirect: 'noredirect',
		meta: {
			title: '????????????',
			icon: 'order',
			noCache: true
		},
		children: [
			{
				path: 'orderList',
				component: () => import('@/views/orderManagement/orderList'),
				name: 'OrderList',
				meta: {
					title: '????????????',
					noCache: true
				}
			},
			{
				path: 'abnormalOrder',
				component: () => import('@/views/orderManagement/abnormalOrder'),
				name: 'AbnormalOrder',
				meta: {
					perms: [],
					title: '????????????',
					noCache: true
				}
			},
			{
				path: 'amountOrder',
				component: () => import('@/views/orderManagement/amountOrder'),
				name: 'AmountOrder',
				meta: {
					perms: [],
					title: '??????????????????',
					noCache: true
				}
			}
		]
	},
	{
		path: '/enterprise',
		component: Layout,
		alwaysShow: true,
		redirect: 'noredirect',
		meta: {
			title: '????????????',
			icon: 'enterprise',
			noCache: true
		},
		children: [
			{
				path: 'baseInfo',
				component: () => import('@/views/enterprise/baseInfo'),
				name: 'BaseInfo',
				meta: {
					title: '????????????',
					noCache: true
				}
			},
			{
				path: 'wallet',
				component: () => import('@/views/enterprise/wallet'),
				name: 'Wallet',
				meta: {
					title: '????????????',
					noCache: true
				}
			},
			// {
			// 	path: 'masterManagement',
			// 	alwaysShow: true,
			// 	component: () => import('@/views/children'),
			// 	redirect: 'noredirect',
			// 	name: 'Children',
			// 	meta: {
			// 		title: '????????????',
			// 		noCache: true
			// 	},
			// 	children: []}
			{
				path: 'customer',
				component: () => import('@/views/enterprise/customer'),
				name: 'Customer',
				meta: {
					title: '????????????',
					noCache: true
				}
			},
			{
				path: 'employee',
				component: () => import('@/views/enterprise/employee'),
				name: 'Employee',
				meta: {
					title: '????????????',
					noCache: true
				}
			}
		]
	},
	{
		path: '/masterManagement',
		alwaysShow: true,
		component: Layout,
		redirect: 'noredirect',
		meta: {
			title: '????????????',
			icon: 'user',
			noCache: true
		},
		children: [
			{
				path: 'masterList',
				component: () => import('@/views/masterManagement/masterList'),
				name: 'MasterList',
				meta: {
					title: '????????????',
					noCache: true
				}
			},
			{
				path: 'cooperativeMaster',
				component: () => import('@/views/masterManagement/cooperativeMaster'),
				name: 'CooperativeMaster',
				meta: {
					title: '???????????????',
					noCache: true
				}
			},
			{
				path: 'blockMaster',
				component: () => import('@/views/masterManagement/blockMaster'),
				name: 'BlockMaster',
				meta: {
					title: '???????????????',
					noCache: true
				}
			}
		]
	},
	{ path: '*', redirect: '/404', hidden: true }
]
