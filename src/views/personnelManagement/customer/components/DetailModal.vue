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
			<!-- 门店信息 -->
			<el-form-item label="客户ID" prop="id">
				{{ formData.id || '--' }}
			</el-form-item>
			<el-form-item label="账号登录Id" prop="userId">
				{{ formData.userId || '--' }}
			</el-form-item>
			<el-form-item label="名称" prop="customerName">
				{{ formData.customerName || '--' }}
			</el-form-item>
			<el-form-item label="性别" prop="customerGender">
				<span v-if="formData.customerGender === 1">男</span>
				<span v-else-if="formData.customerGender === 2">女</span>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="电话" prop="customerTel">
				{{ formData.customerTel || '--' }}
			</el-form-item>
			<el-form-item label="地址" prop="customerAddress">
				{{ formData.customerAddress || '--' }}
			</el-form-item>
			<el-form-item label="客户等级" prop="customerLevel">
				<span v-if="formData.customerLevel === 1">潜在客户</span>
				<span v-else-if="formData.customerLevel === 2">开发中</span>
				<span v-else-if="formData.customerLevel === 3">VIP客户</span>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="创建时间" prop="createTime">
				{{ formData.createTime || '--' }}
			</el-form-item>
			<el-form-item label="更新时间" prop="updateTime">
				{{ formData.updateTime || '--' }}
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
import { getCustomerInfo } from '@/api/personnelManagement/customer'

export default {
	name: 'DetailModal',
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '800px',
				title: '查看客户详情'
			},
			visible: false,
			formData: {
				id: '',
				userId: '',
				customerName: '',
				customerGender: '',
				customerTel: '',
				customerAddress: '',
				customerLevel: '',
				createTime: '',
				updateTime: ''
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
				this.getInfo(params.id)
			}
			this.visible = true
		},
		async getInfo(id) {
			const loading = this.$elLoading('加载中')
			try {
				const res = await getCustomerInfo({ id })
				this.formData = Object.assign(this.$options.data().formData, res.data, {
					id: res.data.id || '',
					userId: res.data.userId || '',
					customerName: res.data.customerName || '',
					customerGender: res.data.customerGender || '',
					customerTel: res.data.customerTel || '',
					customerAddress: res.data.customerAddress || '',
					customerLevel: res.data.customerLevel || '',
					createTime: res.data.createTime || '',
					updateTime: res.data.updateTime	 || ''
				})
			} finally {
				loading.close()
			}
		}
	}
}
</script>

