export const columns = [
	{
		type: 'checkbox'
	},
	// {
	// 	align: 'center',
	// 	fixed: 'left',
	// 	field: 'id',
	// 	title: '员工ID',
	// 	width: 100
	// },
	// {
	// 	align: 'center',
	// 	fixed: 'left',
	// 	field: 'userId',
	// 	title: '账号登录用户ID',
	// 	width: 100
	// },
	{
		align: 'center',
		field: 'employeeHead',
		title: '头像',
		showOverflow: 'tooltip',
		slots: {
			default: 'employeeHead'
		},
		width: 80
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'employeeName',
		title: '姓名',
		width: 80
	},
	{
		align: 'center',
		field: 'employeeGender',
		title: '性别',
		showOverflow: 'tooltip',
		slots: {
			default: 'employeeGender'
		},
		width: 60
	},
	{
		align: 'center',
		field: 'employeePosition',
		title: '员工职位',
		width: 80
	},
	{
		align: 'center',
		field: 'employeeTel',
		title: '手机号',
		width: 150
	},
	{
		align: 'center',
		field: 'employeeEmail',
		title: '邮箱',
		showOverflow: 'tooltip',
		slots: {
			default: 'employeeEmail'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'employeeAddress',
		title: '地址',
		width: 150
	},
	{
		align: 'center',
		field: 'employeeBirth',
		title: '出生日期',
		width: 150
	},
	{
		align: 'center',
		field: 'createTime',
		title: '注册时间',
		width: 150
	},
	{
		align: 'center',
		field: 'updateTime',
		title: '更新时间',
		width: 150
	},
	{
		align: 'center',
		field: 'employeePassword',
		title: '密码',
		width: 150
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
		width: 220
	}
]
