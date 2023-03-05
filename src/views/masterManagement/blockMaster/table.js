export const columns = [
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
		field: 'userId',
		title: '用户id',
		width: 100
	},
	{
		align: 'center',
		field: 'name',
		title: '用户姓名',
		width: 150
	},
	{
		align: 'center',
		field: 'ident',
		title: '身份证号',
		width: 150
	},
	{
		align: 'center',
		field: 'gender',
		title: '性别',
		showOverflow: 'tooltip',
		slots: {
			default: 'gender'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'headUrl',
		title: '身份证图片',
		showOverflow: 'tooltip',
		slots: {
			default: 'headUrl'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'certImg1',
		title: '身份证图片正面',
		showOverflow: 'tooltip',
		slots: {
			default: 'certImg1'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'certImg2',
		title: '身份证图片反面',
		showOverflow: 'tooltip',
		slots: {
			default: 'certImg2'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'birth',
		title: '生日',
		width: 150
	},
	{
		align: 'center',
		field: 'email',
		title: '邮箱',
		width: 150
	},
	{
		align: 'center',
		field: 'driverNoPath',
		title: '驾驶证',
		showOverflow: 'tooltip',
		slots: {
			default: 'driverNoPath'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'driverLicensePath',
		title: '行驶证',
		showOverflow: 'tooltip',
		slots: {
			default: 'driverLicensePath'
		},
		width: 150
	},
	// {
	// 	align: 'center',
	// 	field: 'skillType',
	// 	title: '技能专长',
	// 	width: 150
	// },
	{
		align: 'center',
		field: 'skillList',
		title: '技能专长',
		showOverflow: 'tooltip',
		slots: {
			default: 'skillList'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'workCity',
		title: '主营区域',
		width: 150
	},
	{
		align: 'center',
		field: 'workYear',
		title: '工作年限',
		width: 150
	},
	{
		align: 'center',
		field: 'workState',
		title: '在职状态',
		showOverflow: 'tooltip',
		slots: {
			default: 'workState'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'serverCity',
		title: '服务区域',
		width: 150
	},
	{
		align: 'center',
		field: 'shopCity',
		title: '门店地址',
		width: 150
	},
	{
		align: 'center',
		field: 'state',
		title: '状态',
		showOverflow: 'tooltip',
		slots: {
			default: 'state'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'createUser',
		title: '添加人',
		width: 150
	},
	{
		align: 'center',
		field: 'updateUser',
		title: '更新人',
		width: 150
	},
	{
		align: 'center',
		field: 'createTime',
		title: '插入时间',
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
		field: 'mobile',
		title: '手机号',
		width: 150
	},
	{
		align: 'center',
		field: 'specification',
		title: '车辆规格',
		width: 150
	},
	{
		align: 'center',
		field: 'typ',
		title: '车辆类型',
		showOverflow: 'tooltip',
		slots: {
			default: 'typ'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'brand',
		title: '品牌型号',
		width: 150
	},
	{
		align: 'center',
		field: 'carNo',
		title: '车辆号码',
		width: 150
	},
	{
		align: 'center',
		field: 'carImg',
		title: '车辆图片',
		showOverflow: 'tooltip',
		slots: {
			default: 'carImg'
		},
		width: 150
	},
	{
		align: 'left',
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
