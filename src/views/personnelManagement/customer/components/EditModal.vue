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
			<el-form-item label="客户姓名" prop="customerName">
				<el-input
					v-model="formData.customerName"
					maxlength="20"
					show-word-limit
					placeholder="请输入客户姓名"
				/>
			</el-form-item>
			<el-form-item label="客户性别" prop="customerGender">
				<el-select v-model="formData.customerGender" prop="customerGender" clearable class="filter-item" style="width: 200px;" placeholder="请选择客户性别">
					<el-option label="男" :value="1" />
					<el-option label="女" :value="2" />
				</el-select>
			</el-form-item>
			<el-form-item label="客户电话" prop="customerTel">
				<el-input
					v-model="formData.customerTel"
					maxlength="11"
					show-word-limit
					placeholder="请输入客户电话"
				/>
			</el-form-item>
			<el-form-item label="地址" prop="customerAddress">
				<el-input
					v-model="formData.customerAddress"
					maxlength="40"
					show-word-limit
					placeholder="请输入地址"
				/>
			</el-form-item>
			<el-form-item label="客户等级" prop="customerLevel">
				<el-input
					v-model="formData.customerLevel"
					placeholder="请选择客户等级"
				/>
				<el-select v-model="formData.customerLevel" prop="customerLevel" clearable class="filter-item" style="width: 200px;" placeholder="请选择客户等级">
					<el-option label="潜在客户" :value="1" />
					<el-option label="开发中" :value="2" />
					<el-option label="VIP客户" :value="3" />
				</el-select>
			</el-form-item>

		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="handleClose">取 消</el-button>
			<el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { customerSave, customerUpdateById } from '@/api/personnelManagement/customer'

export default {
	name: 'EditModal',
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
				customerName: '',
				customerGender: '',
				customerTel: '',
				customerAddress: '',
				customerLevel: ''
			},
			formRules: {
				customerName: [
					{ required: true, message: '请输入客户姓名' },
					{ max: 20, message: '20字以内' }
				],
				customerGender: [
					{ required: true, message: '请选择客户性别' }
				],
				customerTel: [
					{ required: true, message: '请输入客户电话' },
					{ max: 11, message: '11字以内' }
				],
				customerAddress: [
					{ required: true, message: '请输入地址' },
					{ max: 40, message: '40字以内' }
				],
				customerLevel: [
					{ required: true, message: '请选择客户等级' }
				]
			}
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.modalOptions.title = params.id ? '编辑客户' : '添加客户'
			this.formData = Object.assign(this.$options.data().formData, params)
			this.visible = true
			this.$refs.formData && this.$refs.formData.resetFields()
		},
		async handleSubmit() {
			await this.$validatorForm('formData')
			const loading = this.$elLoading()
			try {
				const res = this.formData.id ? await customerUpdateById(this.formData) : await customerSave(this.formData)
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

