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
		field: 'createTime',
		title: '提交时间',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'amount',
		title: '提现金额',
		slots: {
			default: 'amount'
		},
		width: 100
	},
	{
		align: 'center',
		field: 'outTradeNo',
		title: '余额',
		width: 100
	},
	{
		align: 'center',
		field: 'receiverAccount',
		title: '账号',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'bankChannel',
		title: '提现类型',
		slots: {
			default: 'bankChannel'
		},
		width: 120
	},
	{
		align: 'center',
		fixed: 'right',
		field: 'orderStatus',
		title: '状态',
		slots: {
			default: 'orderStatus'
		},
		width: 80
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
		width: 130
	}
]
