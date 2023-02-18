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
			<!-- 员工信息 -->
			<el-form-item label="客户ID" prop="id">
				{{ formData.id || '--' }}
			</el-form-item>
			<el-form-item label="账号登录Id" prop="userId">
				{{ formData.userId || '--' }}
			</el-form-item>
			<el-form-item label="员工名称" prop="employeeName">
				{{ formData.employeeName || '--' }}
			</el-form-item>
			<el-form-item label="性别" prop="employeeGender">
				<span v-if="formData.employeeGender === 1">男</span>
				<span v-else-if="formData.employeeGender === 2">女</span>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="员工电话" prop="employeeTel">
				{{ formData.employeeTel || '--' }}
			</el-form-item>
			<el-form-item label="员工密码" prop="employeePassword">
				{{ formData.employeePassword || '--' }}
			</el-form-item>
			<el-form-item label="员工头像" prop="employeeHead">
				{{ formData.employeeHead || '--' }}
			</el-form-item>
			<el-form-item label="员工职位" prop="employeePosition">
				{{ formData.employeePosition || '--' }}
			</el-form-item>
			<el-form-item label="员工地址" prop="employeeAddress">
				{{ formData.employeeAddress || '--' }}
			</el-form-item>
			<el-form-item label="员工邮箱" prop="employeeEmail">
				{{ formData.employeeEmail || '--' }}
			</el-form-item>
			<el-form-item label="出生日期" prop="employeeBirth">
				{{ formData.employeeBirth || '--' }}
			</el-form-item>
			<el-form-item label="客户等级" prop="employeeLevel">
				<span v-if="formData.employeeLevel === 1">潜在客户</span>
				<span v-else-if="formData.employeeLevel === 2">开发中</span>
				<span v-else-if="formData.employeeLevel === 3">VIP客户</span>
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
import { getEmployeInfo } from '@/api/personnelManagement/employee'

export default {
	name: 'DetailModal',
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '800px',
				title: '查看员工详情'
			},
			visible: false,
			formData: {
				id: '',
				userId: '',
				employeeName: '',
				employeeGender: '',
				employeeTel: '',
				employeePassword: '',
				employeeHead: '',
				employeePosition: '',
				employeeAddress: '',
				employeeEmail: '',
				employeeBirth: '',
				is_delete: '',
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
				const res = await getEmployeInfo({ id })
				this.formData = Object.assign(this.$options.data().formData, res.data, {
					id: res.data.id || '',
					userId: res.data.userId || '',
					employeeName: res.data.employeeName || '',
					employeeGender: res.data.employeeGender || '',
					employeeTel: res.data.employeeTel || '',
					employeePassword: res.data.employeePassword || '',
					employeeHead: res.data.employeeHead || '',
					employeePosition: res.data.employeePosition || '',
					employeeAddress: res.data.employeeAddress	 || '',
					employeeEmail: res.data.employeeEmail	 || '',
					employeeBirth: res.data.employeeBirth	 || '',
					is_delete: res.data.is_delete	 || '',
					createTime: res.data.createTime	 || '',
					updateTime: res.data.updateTime	 || ''
				})
			} finally {
				loading.close()
			}
		}
	}
}
</script>

