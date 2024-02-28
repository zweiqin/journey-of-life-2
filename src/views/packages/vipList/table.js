export const columns = [
	{
		type: 'checkbox'
	},
	{
		align: 'center',
		fixed: 'left',
		field: 'id',
		title: 'ID',
		width: 100
	},
	{
		align: "center",
		title: "会员名称",
		field: 'wechatName',
		width: 200
	},
	{
		align: "center",
		title: "会员手机号",
		field: 'phone',
		width: 200
	},
	{
		align: "center",
		title: "会员身份",
		field: 'relationshipLevelId',
		width: 200,
		slots: {
			default: 'relationshipLevelId'
		},
	},
]
