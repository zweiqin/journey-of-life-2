export const columns = [
	{
		align: 'center',
		fixed: 'left',
		field: 'id',
		title: '客户ID',
		width: 100
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'customerName',
		title: '客户姓名',
		width: 100
	},
	{
		align: 'center',
		field: 'customerGender',
		title: '性别',
		showOverflow: false,
		slots: {
			default: 'customerGender'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'customerTel',
		title: '电话',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'customerAddress',
		title: '地址',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'customerLevel',
		title: '客户等级',
		showOverflow: false,
		slots: {
			default: 'customerLevel'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'createTime',
		title: '创建时间',
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
		showOverflow: false,
		slots: {
			default: 'operate'
		},
		width: 250
	}
]
