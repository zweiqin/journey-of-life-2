export const columns = [
	{
		type: 'checkbox'
	},
	// {
	// 	align: 'center',
	// 	fixed: 'left',
	// 	field: 'id',
	// 	title: 'ID',
	// 	width: 100
	// },
	{
		align: 'center',
		fixed: 'left',
		field: 'createTime',
		title: '创建时间',
		width: 150
	},
	// {
	// 	align: 'center',
	// 	field: 'createUserId',
	// 	title: '下单用户Id',
	// 	width: 150
	// },
	{
		align: 'center',
		field: 'orderNo',
		title: '订单号码',
		width: 100
	},
	{
		align: 'center',
		field: 'serverCode',
		title: '服务码',
		width: 150
	},
	{
		align: 'center',
		field: 'dictName',
		title: '服务需求',
		width: 150
	},
	{
		align: 'center',
		field: 'subscribeTime',
		title: '预约时间',
		width: 150
	},
	{
		align: 'center',
		field: 'installDate',
		title: '安装日期',
		width: 150
	},
	{
		align: 'center',
		field: 'createUserType',
		title: '下单用户类型',
		showOverflow: 'tooltip',
		slots: {
			default: 'createUserType'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'paymentMethod',
		title: '付款方式',
		showOverflow: 'tooltip',
		slots: {
			default: 'paymentMethod'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'deliveryType',
		title: '派送类型',
		showOverflow: 'tooltip',
		slots: {
			default: 'deliveryType'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'price',
		title: '订单费用',
		width: 150
	},
	{
		align: 'center',
		field: 'sumPrice',
		title: '总价',
		formatter: ({ row }) => row.orderExpenseDetailsVo ? row.orderExpenseDetailsVo.sumPrice : '--',
		width: 150
	},
	{
		align: 'center',
		field: 'vipPrice',
		title: '会员价',
		formatter: ({ row }) => row.orderExpenseDetailsVo ? row.orderExpenseDetailsVo.vipPrice : '--',
		width: 150
	},
	{
		align: 'center',
		field: 'startPrice',
		title: '起步价',
		formatter: ({ row }) => row.orderExpenseDetailsVo ? row.orderExpenseDetailsVo.startPrice : '--',
		width: 150
	},
	{
		align: 'center',
		field: 'exceedDistancePrice',
		title: '超距费',
		formatter: ({ row }) => row.orderExpenseDetailsVo ? row.orderExpenseDetailsVo.exceedDistancePrice : '--',
		width: 150
	},
	{
		align: 'center',
		field: 'exceedPartyPrice',
		title: '超方费',
		formatter: ({ row }) => row.orderExpenseDetailsVo ? row.orderExpenseDetailsVo.exceedPartyPrice : '--',
		width: 150
	},
	{
		align: 'center',
		field: 'upstairsPrice',
		title: '上楼费',
		formatter: ({ row }) => row.orderExpenseDetailsVo ? row.orderExpenseDetailsVo.upstairsPrice : '--',
		width: 150
	},
	{
		align: 'center',
		field: 'installAmount',
		title: '安装费用',
		formatter: ({ row }) => row.orderExpenseDetailsVo ? row.orderExpenseDetailsVo.installAmount : '--',
		width: 150
	},
	{
		align: 'center',
		field: 'brokerage',
		title: '站长所得佣金',
		width: 150
	},
	{
		align: 'center',
		field: 'arrivalPrice',
		title: '师傅实际到账金额',
		width: 150
	},
	{
		align: 'center',
		field: 'status',
		title: '订单状态',
		showOverflow: 'tooltip',
		slots: {
			default: 'status'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'consigneeName',
		title: '收货人姓名',
		width: 150
	},
	{
		align: 'center',
		field: 'consigneeMobile',
		title: '收货人手机',
		width: 150
	},
	{
		align: 'center',
		field: 'consigneeAddress',
		title: '收货地',
		width: 150
	},
	{
		align: 'center',
		field: 'consigneeAddressDetail',
		title: '收货地详细地址',
		width: 150
	},
	{
		align: 'center',
		field: 'isHasElevator',
		title: '收货人电梯',
		showOverflow: 'tooltip',
		slots: {
			default: 'isHasElevator'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'consigneeFloor',
		title: '收货人楼层',
		width: 150
	},
	{
		align: 'center',
		field: 'remarks',
		title: '订单备注',
		width: 150
	},
	{
		align: 'center',
		field: 'exceptionRemark',
		title: '异常说明',
		width: 200
	},
	{
		align: 'center',
		field: 'cancelRemark',
		title: '订单取消原因',
		width: 150
	},
	{
		align: 'center',
		field: 'isDelete',
		title: '是否删除',
		showOverflow: 'tooltip',
		slots: {
			default: 'isDelete'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'signUrl',
		title: '签收图片',
		showOverflow: 'tooltip',
		slots: {
			default: 'signUrl'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'signatureUrl',
		title: '客户签名图片',
		showOverflow: 'tooltip',
		slots: {
			default: 'signatureUrl'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'exceptionUrl',
		title: '异常图片',
		showOverflow: 'tooltip',
		slots: {
			default: 'exceptionUrl'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'orderType',
		title: '紧急程度',
		showOverflow: 'tooltip',
		slots: {
			default: 'orderType'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'updateTime',
		title: '更新时间',
		width: 150
	},
	// {
	// 	align: 'center',
	// 	field: 'orderChargeDetails',
	// 	title: '订单收费明细',
	// 	showOverflow: 'tooltip',
	// 	slots: {
	// 		default: 'orderChargeDetails'
	// 	},
	// 	width: 150
	// },
	// {
	// 	align: 'center',
	// 	field: 'senderName',
	// 	title: '发货人姓名',
	// 	width: 150
	// },
	// {
	// 	align: 'center',
	// 	field: 'senderMobile',
	// 	title: '发货人手机',
	// 	width: 150
	// },
	// {
	// 	align: 'center',
	// 	field: 'senderAddress',
	// 	title: '发货地',
	// 	width: 150
	// },
	// {
	// 	align: 'center',
	// 	field: 'senderAddressDetail',
	// 	title: '发货地详细地址',
	// 	width: 150
	// },
	{
		align: 'left',
		field: 'operate',
		fixed: 'right',
		title: '操作',
		className: 'small-padding fixed-width',
		showOverflow: 'tooltip',
		slots: {
			default: 'operate'
		},
		width: 250
	}
]
