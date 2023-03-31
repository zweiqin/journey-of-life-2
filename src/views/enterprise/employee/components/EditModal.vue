<template>
	<el-dialog
		:visible.sync="visible"
		v-bind="modalOptions"
	>
		<el-form
			ref="formData"
			:model="formData"
			:rules="formRules"
			size="mini"
			label-suffix=":"
			label-width="100px"
		>
			<el-form-item label="员工姓名" prop="employeeName">
				<el-input
					v-model="formData.employeeName"
					maxlength="20"
					show-word-limit
					placeholder="请输入员工姓名"
				/>
			</el-form-item>
			<el-form-item label="员工性别" prop="employeeGender">
				<el-select v-model="formData.employeeGender" prop="employeeGender" clearable class="filter-item" style="width: 200px;" placeholder="请选择员工性别">
					<el-option label="男" :value="1" />
					<el-option label="女" :value="2" />
				</el-select>
			</el-form-item>
			<el-form-item label="员工电话" prop="employeeTel">
				<el-input
					v-model="formData.employeeTel"
					maxlength="11"
					show-word-limit
					placeholder="请输入员工电话"
				/>
			</el-form-item>
			<el-form-item label="员工密码" prop="employeePassword">
				<el-input
					v-model="formData.employeePassword"
					placeholder="请输入员工密码"
				/>
			</el-form-item>
			<el-form-item label="员工头像" prop="employeeHead">
				<MyUpload v-model="formData.employeeHead" />
			</el-form-item>
			<el-form-item label="员工职位" prop="employeePosition">
				<el-input
					v-model="formData.employeePosition"
					placeholder="请输入员工职位"
				/>
			</el-form-item>
			<el-form-item label="员工地址" prop="employeeAddress">
				<el-input
					v-model="formData.employeeAddress"
					:autosize="{ minRows: 3, maxRows: 5 }"
					maxlength="100"
					show-word-limit
					placeholder="请输入员工地址"
				/>
			</el-form-item>
			<el-form-item label="员工邮箱" prop="employeeEmail">
				<el-input
					v-model="formData.employeeEmail"
					placeholder="请输入员工邮箱"
				/>
			</el-form-item>
			<el-form-item label="出生日期" prop="employeeBirth">
				<el-input
					v-model="formData.employeeBirth"
					placeholder="请输入出生日期"
				/>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="handleClose">取 消</el-button>
			<el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
import MyUpload from '@/components/MyUpload'
import { employeeSave, employeeUpdateById, getEmployeInfo } from '@/api/enterprise/employee'

export default {
	name: 'EditModal',
	components: {
		MyUpload
	},
	props: {
		list: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '520px',
				title: ''
			},
			visible: false,
			formData: {
				id: '',
				employeeName: '',
				employeeGender: '',
				employeeTel: '',
				employeePassword: '',
				employeeHead: '',
				employeePosition: '',
				employeeAddress: '',
				employeeEmail: '',
				employeeBirth: ''
			},
			formRules: {
				employeeName: [
					{ required: true, message: '请输入员工姓名' },
					{ max: 20, message: '20字以内' }
				],
				employeeGender: [
					{ required: true, message: '请选择员工性别' }
				],
				customerTel: [
					{ required: true, message: '请输入员工电话' },
					{ max: 11, message: '11字以内' }
				],
				employeePassword: [
					{ required: false, message: '请输入员工密码' }
				],
				employeeHead: [
					{ required: false, message: '请输入员工头像' }
				],
				employeePosition: [
					{ required: false, message: '请输入员工职位' }
				],
				employeeAddress: [
					{ required: false, message: '请输入员工地址' }
				],
				employeeEmail: [
					{ required: false, message: '请输入员工邮箱' }
				],
				employeeBirth: [
					{ required: false, message: '请输入出生日期' }
				]
			},
			roleList: [] // 角色列表
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.modalOptions.title = params.id ? '编辑员工' : '添加员工'
			this.visible = true
			if (params.id) {
				this.getInfo(params.id)
			} else {
				this.$refs.formData && this.$refs.formData.resetFields()
			}
		},
		async getInfo(id) {
			const res = await getEmployeInfo({ id })
			this.formData = Object.assign(this.$options.data().formData, res.data, {
				id: res.data.id || '',
				employeeName: res.data.employeeName || '',
				employeeGender: res.data.employeeGender || '',
				employeeTel: res.data.employeeTel || '',
				employeePassword: res.data.employeePassword || '',
				employeeHead: res.data.employeeHead || '',
				employeePosition: res.data.employeePosition || '',
				employeeAddress: res.data.employeeAddress	 || '',
				employeeEmail: res.data.employeeEmail	 || '',
				employeeBirth: res.data.employeeBirth	 || ''
			})
			this.$refs.formData && this.$refs.formData.resetFields()
		},
		async handleSubmit() {
			await this.$validatorForm('formData')
			const loading = this.$elLoading()
			try {
				const res = this.formData.id ? await employeeUpdateById(this.formData) : await employeeSave(this.formData)
				loading.close()
				this.$elMessage(`${this.formData.id ? '编辑' : '添加'}成功!`)
				this.$emit('success')
				this.visible = false
			} catch (e) {
				loading.close()
			}
		}
	}
}
</script>

