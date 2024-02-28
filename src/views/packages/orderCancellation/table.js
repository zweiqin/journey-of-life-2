export const columns = [
	{
		type: 'checkbox'
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'orderId',
		title: '订单ID',
		width: ''
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'receiveName',
		title: '用户名',
		width: ''
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'receivePhone',
		title: '电话号码',
		width: ''
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'orderPrice',
		title: '订单价格',
		width: ''
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'receiveAdress',
		title: '地址',
		width: ''
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'presenterVoucher',
		title: '赠送代金卷金额',
		width: ''
	},
	{
		align: 'center',
		field: '',
		fixed: 'state',
		title: '状态',
		slots: {
			default: 'state'
		},
		width: ''
	},
	{
		align: 'center',
		field: '',
		fixed: 'right',
		title: '操作',
		className: 'small-padding fixed-width',
		showOverflow: 'tooltip',
		slots: {
			default: 'haldelFunction'
		},
		width: ''
	}
]
