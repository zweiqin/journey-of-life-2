export default [
	// { type: 'checkbox', fixed: 'left' },
	{
		align: 'center',
		field: 'account',
		title: '账号'
	},
	{
		align: 'center',
		field: 'name',
		title: '姓名'
	},
	{
		align: 'center',
		field: 'phone',
		title: '电话号码'
	},
	{
		align: 'center',
		field: 'role',
		title: '角色'
	},
	{
		align: 'center',
		field: 'createTime',
		title: '创建时间'
	},
	{
		align: 'center',
		field: 'createTime',
		className: 'small-padding fixed-width',
		showOverflow: 'tooltip',
		slots: {
			default: 'Controls'
		},
		title: '操作'
	}
]
