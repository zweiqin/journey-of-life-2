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
		field: 'headUrl',
		title: '头像',
		showOverflow: 'tooltip',
		slots: {
			default: 'headUrl'
		},
		width: 80
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'customerName',
		title: '姓名',
		width: 60
	},
	{
		align: 'center',
		field: 'customerGender',
		title: '性别',
		showOverflow: 'tooltip',
		slots: {
			default: 'customerGender'
		},
		width: 80
	},
	{
		align: 'center',
		field: 'customerType',
		title: '客户类型',
		showOverflow: 'tooltip',
		slots: {
			default: 'customerType'
		},
		width: 100
	},
	{
		align: 'center',
		field: 'customerLevel',
		title: '客户等级',
		showOverflow: 'tooltip',
		slots: {
			default: 'customerLevel'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'customerTel',
		title: '手机号',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'customerAddress',
		title: '地址',
		className: 'vxe-cell-two-row',
		showOverflow: 'tooltip',
		minWidth: 180
	},
	{
		align: 'center',
		field: 'serviceNum',
		title: '服务记录',
		minWidth: 100
	},
	{
		align: 'center',
		field: 'createTime',
		title: '注册时间',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'updateTime',
		title: '更新时间',
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
		width: 250
	}
]
