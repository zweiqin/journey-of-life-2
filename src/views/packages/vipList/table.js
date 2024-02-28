export const columns = [
	{
		type: 'checkbox'
	},
	{
		align: "center",
		title: "会员名称",
		field: 'wechatName',
	},
	{
		align: "center",
		title: "会员手机号",
		field: 'phone',
	},
	{
		align: "center",
		title: "会员身份",
		field: 'relationshipLevelId',
		slots: {
			default: 'relationshipLevelId'
		},
	},
	{
		align: "center",
		title: "服务小区",
		field: 'communityName',
		slots: {
			default: 'communityName'
		},
	},
	{
		align: "center",
		title: "操作",
		field: 'operate',
		slots: {
			default: 'operate'
		},
	},
]
