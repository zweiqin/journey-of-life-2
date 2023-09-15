export const columns = [
	{
		type: 'checkbox'
	},
	// {
	// 	align: 'center',
	// 	fixed: 'left',
	// 	field: 'id',
	// 	title: 'ID',
	// 	width: 100
	// },
	{
		align: 'center',
		fixed: 'left',
		field: 'orderNo',
		title: '提现单号',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'createTime',
		title: '提交时间',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'amount',
		title: '提现金额',
		slots: {
			default: 'amount'
		},
		width: 100
	},
	{
		align: 'center',
		field: 'realAmount',
		title: '实际到账金额',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'fee',
		title: '手续费',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'outFee',
		title: '第三方手续费',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'errorCode',
		title: '第三方错误码',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'outTradeNo',
		title: '第三方流水号',
		minWidth: 150
	},
	// {
	// 	align: 'center',
	// 	field: 'xxx',
	// 	title: '余额',
	// 	width: 100
	// },
	{
		align: 'center',
		field: 'bankChannel',
		title: '提现类型',
		slots: {
			default: 'bankChannel'
		},
		width: 120
	},
	{
		align: 'center',
		field: 'accountBankId',
		title: '银行卡ID',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'bankName',
		title: '开户银行名称',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'receiverAccount',
		title: '银行卡号',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'receiverName',
		title: '持卡人',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'auditTime',
		title: '审核时间',
		minWidth: 150
	},
	{
		align: 'center',
		field: 'arrivaTime',
		title: '到账时间',
		minWidth: 150
	},
	{
		align: 'center',
		fixed: 'right',
		field: 'orderStatus',
		title: '状态',
		slots: {
			default: 'orderStatus'
		},
		width: 100
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
		width: 130
	}
]
