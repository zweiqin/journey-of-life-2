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
		redirect: 'dashboard',
		children: [
			{
				path: 'dashboard',
				component: () => import('@/views/homepage/index'),
				name: 'Dashboard',
				meta: { title: 'dashboard', icon: 'home', noCache: true }
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
	// {
	// 	path: '/receivingManagement',
	// 	component: () => import('@/views/homepage/index'),
	// 	name: 'OrderList',
	// 	meta: {
	// 		// perms: [ 'GET /admin/order/list' ],
	// 		title: '订单列表',
	// 		icon: 'order',
	// 		noCache: true
	// 	}
	// },
	{
		path: '/orderManagement',
		component: Layout,
		alwaysShow: true,
		redirect: 'noredirect',
		meta: {
			title: '工作台',
			icon: 'order',
			noCache: true
		},
		children: [
			{
				path: 'ReceivingList',
				component: () => import('@/views/orderManagement/receivingList'),
				name: 'ReceivingList',
				meta: {
					// perms: [ 'GET /admin/order/list' ],
					title: '接单管理',
					noCache: true
				}
			},
			{
				path: 'orderList',
				component: () => import('@/views/orderManagement/orderList'),
				name: 'OrderList',
				meta: {
					title: '订单管理',
					noCache: true
				}
			}
		]
	},
	{
		path: '/personnelManagement',
		component: Layout,
		alwaysShow: true,
		redirect: 'noredirect',
		meta: {
			title: '人员管理',
			icon: 'user',
			noCache: true
		},
		children: [
			{
				path: 'master',
				component: () => import('@/views/personnelManagement/master'),
				name: 'Master',
				meta: {
					title: '师傅管理',
					noCache: true
				}
			},
			{
				path: 'customer',
				component: () => import('@/views/personnelManagement/customer'),
				name: 'customer',
				meta: {
					title: '客户管理',
					noCache: true
				}
			},
			{
				path: 'employee',
				component: () => import('@/views/personnelManagement/employee'),
				name: 'Employee',
				meta: {
					title: '员工管理',
					noCache: true
				}
			}
		]
	},
	{ path: '*', redirect: '/404', hidden: true }
]
