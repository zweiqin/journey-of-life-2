<template>
	<el-dialog
		:visible.sync="visible"
		v-bind="modalOptions"
		center
	>
		<el-form
			ref="formData"
			:model="formData"
			label-position="left"
			label-width="100px"
			label-suffix=""
			size="mini"
		>
			<div style="margin-top: 35px;">
				<el-form-item label="提现单号" prop="orderNo">
					{{ formData.orderNo || '--' }}
				</el-form-item>
				<el-form-item label="提交时间" prop="createTime">
					{{ formData.createTime || '--' }}
				</el-form-item>
				<el-form-item label="提现金额" prop="amount">
					<span :style="{ color: (formData.orderStatus === 6) || (formData.orderStatus === 7) ? '#FC4023' : formData.orderStatus === 5 ? '#3BB900' : '#cccccc' }">￥ {{ formData.amount || formData.amount === 0 ? formData.amount : '--' }}</span>
				</el-form-item>
				<el-form-item label="实际到账金额" prop="realAmount">
					{{ formData.realAmount || '--' }}
				</el-form-item>
				<el-form-item label="手续费" prop="fee">
					{{ formData.fee || '--' }}
				</el-form-item>
				<el-form-item label="第三方手续费" prop="outFee">
					{{ formData.outFee || '--' }}
				</el-form-item>
				<el-form-item label="第三方错误码" prop="errorCode">
					{{ formData.errorCode || '--' }}
				</el-form-item>
				<el-form-item label="第三方流水号" prop="outTradeNo">
					{{ formData.outTradeNo || '--' }}
				</el-form-item>
				<el-form-item label="银行卡ID" prop="accountBankId">
					{{ formData.accountBankId || '--' }}
				</el-form-item>
				<el-form-item label="开户银行名称" prop="bankName">
					{{ formData.bankName || '--' }}
				</el-form-item>
				<el-form-item label="持卡人" prop="receiverName">
					{{ formData.receiverName || '--' }}
				</el-form-item>
				<el-form-item label="审核时间" prop="auditTime">
					{{ formData.auditTime || '--' }}
				</el-form-item>
				<el-form-item label="到账时间" prop="arrivaTime">
					{{ formData.arrivaTime || '--' }}
				</el-form-item>
				<el-form-item label="账号" prop="receiverAccount">
					{{ formData.receiverAccount || '--' }}
				</el-form-item>
				<el-form-item label="提现类型" prop="bankChannel">
					<span v-if="formData.bankChannel === 1">手动打款</span>
					<span v-else-if="formData.bankChannel === 2">通联</span>
					<span v-else>--</span>
				</el-form-item>
				<el-form-item label="状态" prop="orderStatus">
					<span v-if="formData.orderStatus === 1">待审核</span>
					<span v-else-if="formData.orderStatus === 2">审核中</span>
					<span v-else-if="formData.orderStatus === 3">审核通过</span>
					<span v-else-if="formData.orderStatus === 4">打款中</span>
					<span v-else-if="formData.orderStatus === 5" style="color: #3BB900;">打款成功</span>
					<span v-else-if="formData.orderStatus === 6" style="color: #FC4023;">审核不通过</span>
					<span v-else-if="formData.orderStatus === 7" style="color: #FC4023;">打款失败</span>
					<span v-else style="color: #cccccc;">--</span>
				</el-form-item>
			</div>
		</el-form>
	</el-dialog>
</template>

<script>
// import { getxxxInfo } from '@/api/xxx/xxx'

export default {
	name: 'DetailModal',
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '500px',
				title: '提现详情'
			},
			visible: false,
			formData: {
				orderNo: '',
				createTime: '',
				amount: '',
				realAmount: '',
				fee: '',
				outFee: '',
				errorCode: '',
				outTradeNo: '',
				accountBankId: '',
				bankName: '',
				receiverName: '',
				auditTime: '',
				arrivaTime: '',
				receiverAccount: '',
				bankChannel: '',
				orderStatus: ''
			}
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.formData = Object.assign(this.$options.data().formData, params)
			if (params.userId) {
				// this.getInfo(params.userId)
			}
			this.visible = true
		},
		async getInfo(userId) {
			const loading = this.$elLoading('加载中')
			try {
				const res = await getxxxInfo({ userId })
				this.formData = Object.assign(this.$options.data().formData, res.data, {
					orderNo: res.data.orderNo || '',
					createTime: res.data.createTime || '',
					amount: res.data.amount || '',
					realAmount: res.data.realAmount || '',
					fee: res.data.fee || '',
					outFee: res.data.outFee || '',
					errorCode: res.data.errorCode || '',
					outTradeNo: res.data.outTradeNo || '',
					accountBankId: res.data.accountBankId || '',
					bankName: res.data.bankName || '',
					receiverName: res.data.receiverName || '',
					auditTime: res.data.auditTime || '',
					arrivaTime: res.data.arrivaTime || '',
					receiverAccount: res.data.receiverAccount || '',
					bankChannel: res.data.bankChannel,
					orderStatus: res.data.orderStatus
				})
			} finally {
				loading.close()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.dialog-section-title {
	font-size: 16px;
	color: #333333;
}

.form-item-line {
	/deep/ .el-form-item__content {
		line-height: 16px;
	}
}

/deep/ .el-dialog {

	.el-dialog__header {
		font-size: 18px;
		font-weight: bold;
		color: #333333;
	}

	.el-dialog__body {
		padding: 0 25px 30px;

		.el-form-item {
			margin-bottom: 6px;

			label {
				color: #9E9E9E;
			}

			.el-form-item__content {
				color: #333333;
			}
		}
	}
}
</style>
