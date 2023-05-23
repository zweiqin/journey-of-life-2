<template>
	<el-dialog
		:visible.sync="visible"
		v-bind="modalOptions"
	>
		<el-form
			ref="formData"
			:model="formData"
			size="mini"
			label-suffix=":"
			label-width="120px"
		>
			<!-- 账户流水信息 -->
			<el-form-item label="流水号" prop="tradeNo">
				{{ formData.tradeNo || '--' }}
			</el-form-item>
			<el-form-item label="交易金额" prop="amount">
				{{ formData.amount || '--' }}
			</el-form-item>
			<el-form-item label="交易后金额" prop="changeBalance">
				{{ formData.changeBalance || '--' }}
			</el-form-item>
			<el-form-item label="交易时间" prop="createTime">
				{{ formData.createTime || '--' }}
			</el-form-item>
			<el-form-item label="流水类型" prop="logType">
				<el-tag v-if="formData.logType === 0" type="warning">支出</el-tag>
				<el-tag v-else-if="formData.logType === 1">收入</el-tag>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="流水信息" prop="logRemarks">
				{{ formData.logRemarks || '--' }}
			</el-form-item>
			<el-form-item label="备注" prop="remarks">
				{{ formData.remarks || '--' }}
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
// import { accountFlow } from '@/api/enterprise/accountFlow'

export default {
	name: 'DetailModal',
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '800px',
				title: '查看账户流水详情'
			},
			visible: false,
			formData: {
				tradeNo: '',
				amount: '',
				changeBalance: '',
				createTime: '',
				logType: '',
				logRemarks: '',
				remarks: ''
			}
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.formData = Object.assign(this.$options.data().formData, params)
			if (params.id) {
				// this.getInfo(params.id)
			}
			this.visible = true
		}
		// async getInfo(id) {
		// 	const loading = this.$elLoading('加载中')
		// 	try {
		// 		const res = await accountFlow({ id })
		// 		this.formData = Object.assign(this.$options.data().formData, res.data, {
		// 			tradeNo: res.data.tradeNo || '',
		// 			amount: res.data.amount || '',
		// 			changeBalance: res.data.changeBalance || '',
		// 			logType: res.data.logType,
		// 			logRemarks: res.data.logRemarks || '',
		// 			remarks: res.data.remarks || ''
		// 		})
		// 	} finally {
		// 		loading.close()
		// 	}
		// }
	}
}
</script>

