export const columns = [
	{
		align: 'center',
		fixed: 'left',
		field: 'id',
		title: 'ID',
		width: 100
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'orderNo',
		title: '订单号码',
		width: 100
	},
	{
		align: 'center',
		field: 'createUserType',
		title: '创建订单用户类型',
		showOverflow: false,
		slots: {
			default: 'createUserType'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'paymentMethod',
		title: '付款方式',
		showOverflow: false,
		slots: {
			default: 'paymentMethod'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'deliveryType',
		title: '派送类型',
		showOverflow: false,
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
		field: 'actualPrice',
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
		field: 'orderChargeDetails',
		title: '订单收费明细',
		width: 150
	},
	{
		align: 'center',
		field: 'status',
		title: '订单状态',
		showOverflow: false,
		slots: {
			default: 'status'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'senderName',
		title: '发货人姓名',
		width: 150
	},
	{
		align: 'center',
		field: 'senderMobile',
		title: '发货人手机',
		width: 150
	},
	{
		align: 'center',
		field: 'senderAddress',
		title: '发货地',
		width: 150
	},
	{
		align: 'center',
		field: 'senderAddressDetail',
		title: '发货地详细地址',
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
		showOverflow: false,
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
		field: 'cancelRemark',
		title: '订单取消原因',
		width: 150
	},
	{
		align: 'center',
		field: 'isDelete',
		title: '是否删除',
		showOverflow: false,
		slots: {
			default: 'isDelete'
		},
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
		field: 'signUrl',
		title: '签收图片',
		showOverflow: false,
		slots: {
			default: 'signUrl'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'signatureUrl',
		title: '客户签名图片',
		showOverflow: false,
		slots: {
			default: 'signatureUrl'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'exceptionUrl',
		title: '异常图片',
		showOverflow: false,
		slots: {
			default: 'exceptionUrl'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'exceptionRemark',
		title: '异常说明',
		width: 150
	},
	{
		align: 'center',
		field: 'orderType',
		title: '订单类型',
		showOverflow: false,
		slots: {
			default: 'orderType'
		},
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
		field: 'createTime',
		title: '创建时间',
		width: 150
	},
	{
		align: 'center',
		field: 'updateTime',
		title: '更新时间',
		width: 150
	},
	{
		align: 'left',
		field: 'operate',
		fixed: 'right',
		title: '操作',
		showOverflow: false,
		slots: {
			default: 'operate'
		},
		width: 150
	}
]
