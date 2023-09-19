export const columns = [
	// {
	// 	align: 'center',
	// 	fixed: 'left',
	// 	field: 'id',
	// 	title: 'ID',
	// 	width: 100
	// },
	// {
	// 	align: 'center',
	// 	fixed: 'left',
	// 	field: 'shopId',
	// 	title: '门店ID',
	// 	width: 100
	// },
	{
		align: 'center',
		field: 'goodsTypeName',
		title: '分类名称',
		minWidth: 100
	},
	{
		align: 'center',
		field: 'goodsTypeUrl',
		title: '分类图片',
		showOverflow: 'tooltip',
		slots: {
			default: 'goodsTypeUrl'
		},
		minWidth: 100
	},
	{
		align: 'center',
		field: 'goodsTypeSort',
		title: '排序',
		width: 100
	},
	{
		align: 'center',
		field: 'typeCategory',
		title: '类型',
		showOverflow: 'tooltip',
		slots: {
			default: 'typeCategory'
		},
		width: 80
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
		className: 'small-padding fixed-width',
		showOverflow: 'tooltip',
		slots: {
			default: 'operate'
		},
		width: 200
	}
]
