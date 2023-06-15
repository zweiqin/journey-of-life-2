export const columns = [
	{
		type: 'checkbox'
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'sumPrice',
		title: '订单总金额',
		width: 150
	},
	{
		align: 'center',
		field: 'sfProportion',
		title: '分佣比例',
		showOverflow: 'tooltip',
		slots: {
			default: 'sfProportion'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'sfPrice',
		title: '分佣金额',
		showOverflow: 'tooltip',
		slots: {
			default: 'sfPrice'
		},
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
		width: 180
	},
	{
		align: 'center',
		field: 'createTime',
		title: '创建时间',
		width: 180
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
