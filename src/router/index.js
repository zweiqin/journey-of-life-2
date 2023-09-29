import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */

import Layout from '@/views/layout/Layout';

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
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true,
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
        meta: { title: 'homepage', icon: 'home', noCache: true },
      },
    ],
  },
];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});

export const asyncRouterMap = [
  {
    path: '/receivingManagement',
    component: Layout,
    // alwaysShow: true,
    redirect: 'noredirect',
    meta: {
      title: '接单管理',
      icon: 'order',
      noCache: true,
    },
    children: [
      {
        path: 'ReceivingList',
        component: () => import('@/views/receivingManagement/receivingList'),
        name: 'ReceivingList',
        // noShowingChildren: true,
        meta: {
          // perms: [ 'GET /admin/order/list' ],
          title: '接单管理',
          noCache: true,
        },
      },
    ],
  },
  {
    path: '/orderManagement',
    component: Layout,
    alwaysShow: true,
    redirect: 'noredirect',
    meta: {
      title: '订单管理',
      icon: 'order',
      noCache: true,
    },
    children: [
      {
        path: 'urbanDistribution',
        component: () => import('@/views/orderManagement/urbanDistribution'),
        name: 'UrbanDistribution',
        meta: {
          title: '城市配送',
          noCache: true,
        },
      },
      {
        path: 'orderList',
        component: () => import('@/views/orderManagement/orderList'),
        name: 'OrderList',
        meta: {
          title: '维保订单',
          noCache: true,
        },
      },
      {
        path: 'abnormalOrder',
        component: () => import('@/views/orderManagement/abnormalOrder'),
        name: 'AbnormalOrder',
        meta: {
          perms: [],
          title: '异常订单',
          noCache: true,
        },
      },
      {
        path: 'amountOrder',
        component: () => import('@/views/orderManagement/amountOrder'),
        name: 'AmountOrder',
        meta: {
          perms: [],
          title: '追加金额订单',
          noCache: true,
        },
      },
    ],
  },

  {
    path: '/masterManagement',
    alwaysShow: true,
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '师傅管理',
      icon: 'user',
      noCache: true,
    },
    children: [
      {
        path: 'masterList',
        component: () => import('@/views/masterManagement/masterList'),
        name: 'MasterList',
        meta: {
          title: '师傅列表',
          noCache: true,
        },
      },
      {
        path: 'cooperativeMaster',
        component: () => import('@/views/masterManagement/cooperativeMaster'),
        name: 'CooperativeMaster',
        meta: {
          title: '已合作师傅',
          noCache: true,
        },
      },
      {
        path: 'blockMaster',
        component: () => import('@/views/masterManagement/blockMaster'),
        name: 'BlockMaster',
        meta: {
          title: '已拉黑师傅',
          noCache: true,
        },
      },
    ],
  },
  {
    path: '/walletManagement',
    alwaysShow: true,
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '钱包',
      icon: 'wallet',
      noCache: true,
    },
    children: [
      {
        path: 'wallet',
        component: () => import('@/views/enterprise/wallet'),
        name: 'Wallet',
        meta: {
          title: '余额',
          noCache: true,
        },
      },
      {
        path: 'withdrawRecord',
        component: () => import('@/views/enterprise/withdrawRecord'),
        name: 'WithdrawRecord',
        meta: {
          title: '提现记录',
          noCache: true,
        },
      },
      {
        path: 'commissionManagement',
        component: () => import('@/views/enterprise/commissionManagement'),
        name: 'CommissionManagement',
        meta: {
          title: '佣金记录',
          noCache: true,
        },
      },
    ],
  },
  {
    path: '/memberManagement',
    alwaysShow: true,
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '会员管理',
      icon: 'member',
      noCache: true,
    },
    children: [
      {
        path: 'customer',
        component: () => import('@/views/enterprise/customer'),
        name: 'Customer',
        meta: {
          title: '私域客户',
          noCache: true,
        },
      },
      {
        path: 'publicSphere',
        component: () => import('@/views/enterprise/publicSphere'),
        name: 'PublicSphere',
        meta: {
          title: '公域客户',
          noCache: true,
        },
      },
    ],
  },
  {
    path: '/partnershipManagement',
    alwaysShow: true,
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '合伙管理',
      icon: 'partnership',
      noCache: true,
    },
    children: [
      {
        path: 'partnerList',
        component: () => import('@/views/enterprise/partnerList'),
        name: 'PartnerList',
        meta: {
          title: '师傅合伙人',
          noCache: true,
        },
      },
      {
        path: 'shopPartnerList',
        component: () => import('@/views/enterprise/shopPartnerList'),
        name: 'ShopPartnerList',
        meta: {
          title: '门店合伙人',
          noCache: true,
        },
      },
      {
        path: 'commanderList',
        component: () => import('@/views/enterprise/commanderList'),
        name: 'CommanderList',
        meta: {
          title: '团长列表',
          noCache: true,
        },
      },
      {
        path: 'shareholder',
        component: () => import('@/views/partnershipManagement/shareholder'),
        name: 'Shareholder',
        meta: {
          title: '股东列表',
          noCache: true,
        },
      },
    ],
  },
  {
    path: '/storeServices',
    alwaysShow: true,
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '门店服务',
      icon: 'brand-serve',
      noCache: true,
    },
    children: [
      {
        path: 'serviceList',
        component: () => import('@/views/nearbyMerchants/serviceList'),
        name: 'ServiceList',
        meta: {
          title: '服务列表', // 用于区分商品列表
          noCache: true,
        },
      },

      {
        path: 'serviceClassification',
        component: () =>
          import('@/views/nearbyMerchants/serviceClassification'),
        name: 'ServiceClassification',
        meta: {
          title: '服务分类', // 用于区分商品分类
          noCache: true,
        },
      },

      {
        path: 'voucherGoods',
        component: () => import('@/views/nearbyMerchants/voucherGoods'),
        name: 'VoucherGoods',
        meta: {
          title: '代金券服务',
          noCache: true,
        },
      },
    ],
  },
  {
    path: '/storeGoods',
    alwaysShow: true,
    component: Layout,
    redirect: 'noredirect',
    meta: {
      title: '门店商品',
      icon: 'brand-goods',
      noCache: true,
    },
    children: [
      {
        path: 'goodsList',
        component: () => import('@/views/nearbyMerchants/serviceList'),
        name: 'GoodsList',
        meta: {
          title: '商品列表', // 用于区分服务列表
          noCache: true,
        },
      },
      {
        path: 'goodsClassification',
        component: () =>
          import('@/views/nearbyMerchants/serviceClassification'),
        name: 'GoodsClassification',
        meta: {
          title: '商品分类', // 用于区分服务分类
          noCache: true,
        },
      },
      {
        path: 'voucherGoods',
        component: () => import('@/views/nearbyMerchants/voucherGoods'),
        name: 'VoucherGoods',
        meta: {
          title: '代金券商品',
          noCache: true,
        },
      },
      {
        path: 'voucherGoodSave',
        component: () => import('@/views/nearbyMerchants/VoucherGoodSave'),
        name: 'VoucherGoodSave',
        meta: {
          title: '代金券商品/服务',
          noCache: true,
        },
        hidden: true,
      },
    ],
  },

  {
    path: '/enterprise',
    component: Layout,
    alwaysShow: true,
    redirect: 'noredirect',
    meta: {
      title: '设置',
      icon: 'enterprise',
      noCache: true,
    },
    children: [
      {
        path: 'baseInfo',
        component: () => import('@/views/enterprise/baseInfo'),
        name: 'BaseInfo',
        meta: {
          title: '店长信息',
          noCache: true,
        },
      },
      {
        path: 'wallet',
        component: () => import('@/views/enterprise/wallet'),
        name: 'Wallet',
        meta: {
          title: '钱包管理',
          noCache: true,
        },
      },

      {
        path: 'employee',
        component: () => import('@/views/enterprise/employee'),
        name: 'Employee',
        meta: {
          title: '员工管理',
          noCache: true,
        },
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
              noCache: true,
            },
            hidden: true,
          },
          {
            path: 'commodityEdit',
            component: () => import('@/views/nearbyMerchants/commodityEdit'),
            name: 'CommodityEdit',
            meta: {
              title: '商品/服务编辑',
              noCache: true,
            },
            hidden: true,
          },
        ],
      },
    ],
  },
  {
    path: 'https://www.tuanfengkeji.cn/tfdata',
    alwaysShow: false,
    component: Layout,
    noShowingChildren: true,
    meta: {
      title: '智慧看板',
      icon: 'bulletin-board',
      noCache: true,
    },
    children: [],
  },
  { path: '*', redirect: '/404', hidden: true },
];
