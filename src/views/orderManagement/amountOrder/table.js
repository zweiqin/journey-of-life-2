export const columns = [
	{
		type: 'checkbox'
	},
	// {
	// 	align: 'center',
	// 	fixed: 'left',
	// 	field: 'id',
	// 	title: '订单ID',
	// 	width: 100
	// },
	{
		align: 'center',
		fixed: 'left',
		field: 'extraNo',
		title: '追加订单号',
		width: 150
	},
	{
		align: 'center',
		field: 'orderNo',
		title: '订单号码',
		width: 150
	},
	{
		align: 'center',
		field: 'createId',
		title: '创建追加单的用户id',
		width: 150
	},
	{
		align: 'center',
		field: 'extraPrice',
		title: '追加金额',
		width: 150
	},
	{
		align: 'center',
		field: 'extraRemark',
		title: '追加原因',
		width: 200
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
		field: 'remarks',
		title: '需求说明',
		width: 200
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
		className: 'small-padding fixed-width',
		showOverflow: 'tooltip',
		slots: {
			default: 'operate'
		},
		width: 150
	}
]
