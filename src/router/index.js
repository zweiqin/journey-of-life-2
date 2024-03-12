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
		path: '/franchiseeManagement',
		component: Layout,
		alwaysShow: true,
		redirect: 'noredirect',
		meta: {
			title: '加盟商管理',
			icon: 'order',
			noCache: true
		},
		children: [
			{
				path: 'FranchiseeList',
				component: () => import('@/views/franchiseeManagement/franchiseeList'),
				name: 'FranchiseeList',
				// noShowingChildren: true,
				meta: {
					// perms: [ 'GET /admin/order/list' ],
					title: '加盟商列表',
					noCache: true
				}
			}
		]
	},
	// { // ! ***
	// 	path: '/receivingManagement',
	// 	component: Layout,
	// 	// alwaysShow: true,
	// 	redirect: 'noredirect',
	// 	meta: {
	// 		title: '接单管理',
	// 		icon: 'order',
	// 		noCache: true
	// 	},
	// 	children: [
	// 		{
	// 			path: 'ReceivingList',
	// 			component: () => import('@/views/receivingManagement/receivingList'),
	// 			name: 'ReceivingList',
	// 			// noShowingChildren: true,
	// 			meta: {
	// 				// perms: [ 'GET /admin/order/list' ],
	// 				title: '接单管理',
	// 				noCache: true
	// 			}
	// 		}
	// 	]
	// },
	{
		path: '/orderManagement',
		component: Layout,
		alwaysShow: true,
		redirect: 'noredirect',
		meta: {
			title: '订单管理',
			icon: 'order',
			noCache: true
		},
		children: [
			{
				path: 'OrderProfile',
				component: () => import('@/views/orderManagement/OrderProfile'),
				name: 'OrderProfile',
				meta: {
					perms: [],
					title: '订单概况',
					noCache: true
				}
			},
			// {
			// 	path: 'ReceivingList',
			// 	component: () => import('@/views/receivingManagement/receivingList'),
			// 	name: 'ReceivingList',
			// 	meta: {
			// 		// perms: [ 'GET /admin/order/list' ],
			// 		title: '接单管理',
			// 		noCache: true
			// 	}
			// },
			{
				path: 'packageOrder',
				component: () => import('@/views/orderManagement/packageOrder'),
				name: 'PackageOrder',
				meta: {
					perms: [],
					title: '套餐列表',
					noCache: true
				}
			},
			{
				path: '/allOrders',
				component: () => import('@/views/orderManagement/allOrders'),
				name: 'AllOrders',
				meta: {
					perms: [],
					title: '全部订单',
					noCache: true
				}
			},
			// {
			// 	path: '/orderMengments',
			// 	component: () => import('@/components/childRouterBlankPage'),
			// 	alwaysShow: true,
			// 	redirect: 'orderMengments',
			// 	meta: {
			// 		title: '服务订单管理',
			// 		// icon: 'order',
			// 		noCache: true
			// 	},
			// 	children: [
			// 		{
			// 			path: 'urbanDistribution',
			// 			component: () => import('@/views/orderManagement/urbanDistribution'),
			// 			name: 'UrbanDistribution',
			// 			meta: {
			// 				title: '城市配送',
			// 				noCache: true
			// 			}
			// 		},
			// 		{
			// 			path: 'orderList',
			// 			component: () => import('@/views/orderManagement/orderList'),
			// 			name: 'OrderList',
			// 			meta: {
			// 				title: '维保订单',
			// 				noCache: true
			// 			}
			// 		},
			// 		{
			// 			path: 'abnormalOrder',
			// 			component: () => import('@/views/orderManagement/abnormalOrder'),
			// 			name: 'AbnormalOrder',
			// 			meta: {
			// 				perms: [],
			// 				title: '异常订单',
			// 				noCache: true
			// 			}
			// 		},
			// 		{
			// 			path: 'amountOrder',
			// 			component: () => import('@/views/orderManagement/amountOrder'),
			// 			name: 'AmountOrder',
			// 			meta: {
			// 				perms: [],
			// 				title: '追加金额订单',
			// 				noCache: true
			// 			}
			// 		}
			// 	]
			// },
			{
				path: '/ActivityOrder',
				component: () => import('@/views/packages/fullOrder'),
				meta: {
					title: '活动订单管理',
					// icon: 'order',
					noCache: true
				},
				name: 'ActivityOrder'
				// children: [
				// 	{
				// 		path: 'fullOrder',
				// 		component: () => import('@/views/packages/fullOrder'),
				// 		name: 'fullOrder',
				// 		meta: {
				// 			title: '活动订单管理',
				// 			noCache: true
				// 		}
				// 	},
				// 	{
				// 		path: 'orderCancellation',
				// 		component: () => import('@/views/packages/orderCancellation'),
				// 		name: 'orderCancellation',
				// 		meta: {
				// 			title: '订单核销',
				// 			noCache: true
				// 		}
				// 	}
				// ]
			}
		]
	},

	{
		path: '/partnershipManagement',
		alwaysShow: true,
		component: Layout,
		redirect: 'noredirect',
		meta: {
			title: '团队管理',
			icon: 'partnership',
			noCache: true
		},
		children: [
			{
				path: 'TeamProfile',
				component: () => import('@/views/enterprise/TeamProfile'),
				name: 'TeamProfile',
				meta: {
					perms: [],
					title: '团队概况',
					noCache: true
				}
			},
			{
				path: '/MembershipManagement',
				component: () => import('@/views/packages/vipList'),
				name: 'MembershipManagement',
				// alwaysShow: true,
				// redirect: 'noredirect',
				meta: {
					title: '会员管理',
					// icon: 'order',
					noCache: true
				}
				// children: [
				// 	{
				// 		path: 'vipList',
				// 		component: () => import('@/views/packages/vipList'),
				// 		name: 'vipList',
				// 		meta: {
				// 			title: '会员指定',
				// 			noCache: true
				// 		}
				// 	},
				// 	{
				// 		path: 'customer',
				// 		component: () => import('@/views/enterprise/customer'),
				// 		name: 'Customer',
				// 		meta: {
				// 			title: '私域客户',
				// 			noCache: true
				// 		}
				// 	},
				// 	{
				// 		path: 'publicSphere',
				// 		component: () => import('@/views/enterprise/publicSphere'),
				// 		name: 'PublicSphere',
				// 		meta: {
				// 			title: '公域客户',
				// 			noCache: true
				// 		}
				// 	}
				// ]
			},
			{
				path: '/PartnershipManagement',
				component: () => import('@/views/enterprise/shopPartnerList'),
				name: 'PartnershipManagement',
				// alwaysShow: true,
				// redirect: 'noredirect',
				meta: {
					title: '合伙人管理',
					// icon: 'order',
					noCache: true
				}
				// children: [
				// 	{
				// 		path: 'partnerList',
				// 		component: () => import('@/views/enterprise/partnerList'),
				// 		name: 'PartnerList',
				// 		meta: {
				// 			title: '师傅合伙人',
				// 			noCache: true
				// 		}
				// 	},
				// 	{
				// 		path: 'shopPartnerList',
				// 		component: () => import('@/views/enterprise/shopPartnerList'),
				// 		name: 'ShopPartnerList',
				// 		meta: {
				// 			title: '门店合伙人',
				// 			noCache: true
				// 		}
				// 	}
				// ]
			},
			{
				path: 'commanderList',
				component: () => import('@/views/enterprise/commanderList'),
				name: 'CommanderList',
				meta: {
					title: '团长管理',
					noCache: true
				}
			},
			{
				path: 'shareholder',
				component: () => import('@/views/partnershipManagement/shareholderPartnerList'),
				name: 'Shareholder',
				meta: {
					title: '股东管理',
					noCache: true
				}
			},
			{
				path: 'communityStoreManagement',
				component: () => import('@/views/partnershipManagement/communityStoreManagement'),
				name: 'communityStoreManagement',
				meta: {
					title: '小区店管理',
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
			title: '师傅管理',
			icon: 'user',
			noCache: true
		},
		children: [
			{
				path: 'MastersProfile',
				component: () => import('@/views/masterManagement/MastersProfile'),
				name: 'MastersProfile',
				meta: {
					title: '师傅概况',
					noCache: true
				}
			},
			{
				path: 'intermediaryManagement',
				component: () => import('@/views/masterManagement/intermediaryManagement'),
				name: 'intermediaryManagement',
				meta: {
					title: '工头管理',
					noCache: true
				}
			},
			{
				path: 'masterList',
				component: () => import('@/views/masterManagement/masterList'),
				name: 'MasterList',
				meta: {
					title: '师傅列表',
					noCache: true
				}
			},
			{
				path: 'cooperativeMaster',
				component: () => import('@/views/masterManagement/cooperativeMaster'),
				name: 'CooperativeMaster',
				meta: {
					title: '已合作师傅',
					noCache: true
				}
			},
			{
				path: 'blockMaster',
				component: () => import('@/views/masterManagement/blockMaster'),
				name: 'BlockMaster',
				meta: {
					title: '已拉黑师傅',
					noCache: true
				}
			}
		]
	},
	{
		path: '/walletManagement',
		alwaysShow: true,
		component: Layout,
		redirect: 'noredirect',
		meta: {
			title: '财务管理',
			icon: 'wallet',
			noCache: true
		},
		children: [
			{
				path: 'FinancialProfile',
				component: () => import('@/views/enterprise/FinancialProfile'),
				name: 'FinancialProfile',
				meta: {
					title: '财务概况',
					noCache: true
				}
			},
			{
				path: 'wallet',
				component: () => import('@/views/enterprise/wallet'),
				name: 'Wallet',
				meta: {
					title: '余额',
					noCache: true
				}
			},
			{
				path: 'withdrawRecord',
				component: () => import('@/views/enterprise/withdrawRecord'),
				name: 'WithdrawRecord',
				meta: {
					title: '提现记录',
					noCache: true
				}
			},
			{
				path: 'commissionManagement',
				component: () => import('@/views/enterprise/commissionManagement'),
				name: 'CommissionManagement',
				meta: {
					title: '佣金记录',
					noCache: true
				}
			}
		]
	},
	{
		path: '/storeServices',
		alwaysShow: true,
		component: Layout,
		redirect: 'noredirect',
		meta: {
			title: '服务管理',
			icon: 'brand-serve',
			noCache: true
		},
		children: [
			{
				path: 'serviceList',
				component: () => import('@/views/nearbyMerchants/serviceList'),
				name: 'ServiceList',
				meta: {
					title: '门店服务列表', // 用于区分商品列表
					noCache: true
				}
			},

			{
				path: 'serviceClassification',
				component: () => import('@/views/nearbyMerchants/serviceClassification'),
				name: 'ServiceClassification',
				meta: {
					title: '服务分类', // 用于区分商品分类
					noCache: true
				}
			},
			{
				path: '/serviceList',
				name: 'serviceList',
				component: () => import('@/views/platformService/serviceList'),
				meta: {
					title: '平台服务列表', // !用于设置平台订单分佣
					// icon: 'wallet',
					noCache: true
				}
			},
			{
				path: 'voucherGoods',
				component: () => import('@/views/nearbyMerchants/voucherGoods'),
				name: 'VoucherGoods',
				meta: {
					title: '代金券服务',
					noCache: true
				}
			}
		]
	},
	// {
	// 	path: '/storeGoods',
	// 	alwaysShow: true,
	// 	component: Layout,
	// 	redirect: 'noredirect',
	// 	meta: {
	// 		title: '门店商品',
	// 		icon: 'brand-goods',
	// 		noCache: true
	// 	},
	// 	children: [
	// 		{
	// 			path: 'goodsList',
	// 			component: () => import('@/views/nearbyMerchants/serviceList'),
	// 			name: 'GoodsList',
	// 			meta: {
	// 				title: '商品列表', // 用于区分服务列表
	// 				noCache: true
	// 			}
	// 		},
	// 		{
	// 			path: 'goodsClassification',
	// 			component: () => import('@/views/nearbyMerchants/serviceClassification'),
	// 			name: 'GoodsClassification',
	// 			meta: {
	// 				title: '商品分类', // 用于区分服务分类
	// 				noCache: true
	// 			}
	// 		},
	// 		{
	// 			path: 'voucherGoods',
	// 			component: () => import('@/views/nearbyMerchants/voucherGoods'),
	// 			name: 'VoucherGoods',
	// 			meta: {
	// 				title: '代金券商品',
	// 				noCache: true
	// 			}
	// 		},
	// 		{
	// 			path: 'voucherGoodSave',
	// 			component: () => import('@/views/nearbyMerchants/VoucherGoodSave'),
	// 			name: 'VoucherGoodSave',
	// 			meta: {
	// 				title: '代金券商品/服务',
	// 				noCache: true
	// 			},
	// 			hidden: true
	// 		}
	// 	]
	// },

	// {
	// 	path: '/platformService',
	// 	component: Layout,
	// 	alwaysShow: true,
	// 	redirect: 'noredirect',
	// 	meta: {
	// 		title: '平台服务',
	// 		icon: 'wallet',
	// 		noCache: true
	// 	},
	// 	children: [
	// 		{
	// 			path: '/serviceList',
	// 			name: 'serviceList',
	// 			component: () => import('@/views/platformService/serviceList'),
	// 			meta: {
	// 				title: '平台服务列表',
	// 				icon: 'wallet',
	// 				noCache: true
	// 			}
	// 		}
	// 	]
	// },
	{ // ! ***
		path: '/BusinessDistrict',
		component: Layout,
		// alwaysShow: true,
		redirect: 'noredirect',
		meta: {
			title: '同城商圈',
			icon: 'order',
			noCache: true
		},
		children: [
			{
				path: 'BusinessDistrict',
				component: () => import('@/views/BusinessDistrict'),
				name: 'BusinessDistrict',
				// noShowingChildren: true,
				meta: {
					// perms: [ 'GET /admin/order/list' ],
					title: '同城商圈',
					noCache: true
				}
			}
		]
	},
	{ // ! ***
		path: '/CityMall',
		component: Layout,
		// alwaysShow: true,
		redirect: 'noredirect',
		meta: {
			title: '社区商城',
			icon: 'order',
			noCache: true
		},
		children: [
			{
				path: 'CityMall',
				component: () => import('@/views/CityMall'),
				name: 'CityMall',
				// noShowingChildren: true,
				meta: {
					// perms: [ 'GET /admin/order/list' ],
					title: '社区商城',
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
			title: '设置',
			icon: 'enterprise',
			noCache: true
		},
		children: [
			{
				path: 'OperationLog',
				component: () => import('@/views/enterprise/OperationLog'),
				name: 'OperationLog',
				meta: {
					title: '操作日志',
					noCache: true
				}
			},
			{
				path: 'baseInfo',
				component: () => import('@/views/enterprise/baseInfo'),
				name: 'BaseInfo',
				meta: {
					title: '店长信息',
					noCache: true
				}
			},
			// {
			//   path: 'wallet',
			//   component: () => import('@/views/enterprise/wallet'),
			//   name: 'Wallet',
			//   meta: {
			//     title: '钱包管理',
			//     noCache: true,
			//   },
			// },

			{
				path: 'employee',
				component: () => import('@/views/enterprise/employee'),
				name: 'Employee',
				meta: {
					title: '子账号管理',
					noCache: true
				}
			},
			{
				path: 'nearbyMerchants',
				component: () => import('@/views/children'),
				alwaysShow: false,
				hidden: true,
				children: [
					{
						path: 'commodityCreate',
						component: () => import('@/views/nearbyMerchants/commodityCreate'),
						name: 'CommodityCreate',
						meta: {
							title: '商品/服务上架',
							noCache: true
						},
						hidden: true
					},
					{
						path: 'commodityEdit',
						component: () => import('@/views/nearbyMerchants/commodityEdit'),
						name: 'CommodityEdit',
						meta: {
							title: '商品/服务编辑',
							noCache: true
						},
						hidden: true
					}
				]
			}
		]
	},

	// {
	//   path: 'https://www.tuanfengkeji.cn/tfdata',
	//   alwaysShow: false,
	//   component: Layout,
	//   noShowingChildren: true,
	//   meta: {
	//     title: '智慧看板',
	//     icon: 'bulletin-board',
	//     noCache: true,
	//   },
	//   children: [],
	// },
	{ path: '*', redirect: '/404', hidden: true }
]
