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
			<!-- 佣金详情信息 -->
			<el-form-item label="订单总金额" prop="sumPrice">
				{{ formData.sumPrice || '--' }}
			</el-form-item>
			<el-form-item label="分佣比例" prop="amount">
				{{ formData.sfProportion * 100 }}%
			</el-form-item>
			<el-form-item label="分佣金额" prop="sfPrice">
				{{ formData.sfPrice || '--' }}
			</el-form-item>
			<el-form-item label="订单状态" prop="status">
				<el-tag v-if="formData.status === 1" type="warning">订单未完成</el-tag>
				<el-tag v-else-if="formData.status === 2">订单已完成</el-tag>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="创建时间" prop="createTime">
				{{ formData.createTime || '--' }}
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
// import { xxx } from '@/api/xxx/xxx'

export default {
	name: 'DetailModal',
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '600px',
				title: '查看佣金详情'
			},
			visible: false,
			formData: {
				sumPrice: '',
				sfProportion: '',
				sfPrice: '',
				status: '',
				createTime: ''
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
		// 		const res = await xxx({ id })
		// 		this.formData = Object.assign(this.$options.data().formData, res.data, {
		// 			xxx: res.data.xxx || ''
		// 		})
		// 	} finally {
		// 		loading.close()
		// 	}
		// }
	}
}
</script>

