export const columns = [
	{
		align: 'center',
		fixed: 'left',
		field: 'id',
		title: '员工ID',
		width: 100
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'userId',
		title: '账号登录用户ID',
		width: 100
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'employeeName',
		title: '员工姓名',
		width: 100
	},
	{
		align: 'center',
		field: 'employeeGender',
		title: '员工性别',
		width: 150
	},
	{
		align: 'center',
		field: 'employeeTel',
		title: '员工电话',
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
		field: 'employeeHead',
		title: '头像',
		showOverflow: false,
		slots: {
			default: 'employeeHead'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'employeePosition',
		title: '员工职位',
		width: 150
	},
	{
		align: 'center',
		field: 'employeeAddress',
		title: '员工地址',
		width: 150
	},
	{
		align: 'center',
		field: 'employeeEmail',
		title: '员工邮箱',
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
		align: 'center',
		field: 'operate',
		fixed: 'right',
		title: '操作',
		showOverflow: false,
		slots: {
			default: 'operate'
		},
		width: 150
	}
]
