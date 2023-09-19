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
	// {
	// 	align: 'center',
	// 	fixed: 'left',
	// 	field: 'shopId',
	// 	title: '门店ID',
	// 	width: 100
	// },
	{
		align: 'center',
		field: 'goodsName',
		title: '商品名称',
		width: 100
	},
	{
		align: 'center',
		field: 'goodsTypeId',
		title: '商品分类ID',
		width: 100
	},
	{
		align: 'center',
		field: 'goodsLogo',
		title: '商品logo',
		showOverflow: 'tooltip',
		slots: {
			default: 'goodsLogo'
		},
		width: 80
	},
	{
		align: 'center',
		field: 'goodsRotationChart',
		title: '商品轮播图',
		showOverflow: 'tooltip',
		slots: {
			default: 'goodsRotationChart'
		},
		width: 100
	},
	{
		align: 'center',
		field: 'goodsInfo',
		title: '商品详情',
		width: 80
	},
	{
		align: 'center',
		field: 'goodsPrice',
		title: '价格',
		width: 100
	},
	{
		align: 'center',
		field: 'preferentialPrice',
		title: '优惠价',
		width: 100
	},
	{
		align: 'center',
		field: 'serviceVolume',
		title: '服务量销售量',
		width: 100
	},
	{
		align: 'center',
		field: 'goodsUpper',
		title: '是否上架',
		showOverflow: 'tooltip',
		slots: {
			default: 'goodsUpper'
		},
		width: 100
	},
	{
		align: 'center',
		field: 'goodsSort',
		title: '排序',
		width: 100
	},
	{
		align: 'center',
		field: 'goodsType',
		title: '类型',
		showOverflow: 'tooltip',
		slots: {
			default: 'goodsType'
		},
		width: 80
	},
	{
		align: 'center',
		field: 'createTime',
		title: '创建时间',
		width: 150
	},
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
		width: 320
	}
]
