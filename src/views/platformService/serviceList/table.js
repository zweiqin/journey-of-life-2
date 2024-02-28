export const columns = [
	// {
	// 	type: 'checkbox'
	// },
	{
		align: 'center',
		fixed: 'left',
		field: 'id',
		title: 'ID',
		width: 100
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'serverInfoName',
		title: '服务详情名称',
		width: 150
	},
	{
		align: 'center',
		field: 'serverTypeName',
		title: '所属分类',
		width: 160
	},
	{
		align: 'center',
		field: 'isArtificial',
		title: '报价模式',
		slots: {
			default: 'isArtificial'
		},
		width: 180
	},
	{
		align: 'center',
		field: 'serverInfoUrl',
		title: '服务详情图片',
		showOverflow: 'tooltip',
		slots: {
			default: 'serverInfoUrl'
		},
		width: 160
	},
	{
		align: 'center',
		field: 'serverIntroduction',
		title: '服务内容介绍',
		width: 200
	},
	{
		align: 'center',
		field: 'serverPrice',
		title: '价格',
		width: 110
	},
	{
		align: 'center',
		field: 'serverUnit',
		title: '单位',
		width: 100
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
