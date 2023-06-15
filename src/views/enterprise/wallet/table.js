export const columns = [
	{
		type: 'checkbox'
	},
	// {
	// 	align: 'center',
	// 	fixed: 'left',
	// 	field: 'id',
	// 	title: '客户ID',
	// 	width: 100
	// },
	{
		align: 'center',
		fixed: 'left',
		field: 'tradeNo',
		title: '流水号',
		width: 150
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'outTradeNo',
		title: '对应订单号',
		width: 120
	},
	{
		align: 'center',
		field: 'amount',
		title: '交易金额',
		width: 100
	},
	{
		align: 'center',
		field: 'changeBalance',
		title: '交易后金额',
		width: 140
	},
	{
		align: 'center',
		field: 'createTime',
		title: '交易时间',
		width: 150
	},
	{
		align: 'center',
		field: 'logType',
		title: '流水类型',
		showOverflow: 'tooltip',
		slots: {
			default: 'logType'
		},
		width: 80
	},
	{
		align: 'center',
		field: 'logRemarks',
		title: '流水信息',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'remarks',
		title: '备注',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'operate',
		fixed: 'right',
		title: '操作',
		className: 'small-padding fixed-width',
		showOverflow: 'tooltip',
		slots: {
			default: 'operate'
		},
		width: 100
	}
]
