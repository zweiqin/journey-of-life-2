<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions">
		<div style="width: 100%;">
			<div style="display: flex;justify-content: space-between;align-items: center;padding-top: 20px;">
				<div>
					<div>基本信息</div>
					<div style="height: 2px;margin-top: 15px;background: linear-gradient(90deg, #071A2C 0%, #2E70AF 100%);"></div>
				</div>
				<div v-if="formData.id" style="font-size: 14px;">
					<div>
						<span style="color: #666666;">更新时间</span>&nbsp;&nbsp;&nbsp;<span style="color: #333333;">
							{{
								formData.updateTime }}
						</span>
					</div>
				</div>
			</div>
			<div style="padding-top: 20px;">
				<el-form
					ref="formData" :model="formData" :rules="formRules" size="mini"
					label-suffix="" label-width="120px"
					label-position="left"
				>
					<div style="width: 100%;display: flex;justify-content: space-between;">
						<div style="width: 70%;">
							<div style="display: flex;justify-content: space-between;">
								<el-form-item label="姓名" prop="customerName">
									<el-input v-model="formData.customerName" maxlength="20" placeholder="请输入客户姓名" />
								</el-form-item>
								<div v-if="formData.id">
									<el-form-item label="用户ID" prop="id">
										<span>{{ formData.id }}</span>
									</el-form-item>
								</div>
							</div>
							<el-form-item label="性别" prop="customerGender">
								<el-select
									v-model="formData.customerGender" prop="customerGender" clearable class="filter-item"
									style="width: 200px;" placeholder="请选择客户性别"
								>
									<el-option label="男" :value="1" />
									<el-option label="女" :value="2" />
								</el-select>
							</el-form-item>
							<el-form-item label="手机号" prop="customerTel">
								<el-input v-model="formData.customerTel" maxlength="11" placeholder="请输入客户手机号" style="width: 200px;" />
							</el-form-item>
							<el-form-item label="地址" prop="customerAddress">
								<el-input v-model="formData.customerAddress" maxlength="40" show-word-limit placeholder="请输入地址" />
							</el-form-item>
							<el-form-item label="类型" prop="customerType">
								<el-select
									v-model="formData.customerType" prop="customerType" clearable class="filter-item"
									style="width: 200px;" placeholder="请选择客户等级"
								>
									<el-option label="个人" :value="0" />
									<el-option label="商户" :value="1" />
									<el-option label="工程" :value="2" />
									<el-option label="平台" :value="3" />
								</el-select>
							</el-form-item>
							<el-form-item label="客户等级" prop="customerLevel">
								<el-select
									v-model="formData.customerLevel" prop="customerLevel" clearable class="filter-item"
									style="width: 200px;" placeholder="请选择客户等级"
								>
									<el-option label="潜在客户" :value="1" />
									<el-option label="开发中" :value="2" />
									<el-option label="VIP客户" :value="3" />
								</el-select>
							</el-form-item>
							<div v-if="formData.id" style="font-size: 14px;">
								<el-form-item label="注册时间" prop="createTime">
									<span style="color: #333333;">
										{{ formData.createTime }}
									</span>
								</el-form-item>
							</div>
						</div>
						<el-form-item label="" prop="headUrl" label-width="0">
							<MyUpload
								v-model="formData.headUrl" :width="174" :height="210" :show-tips-message="false"
								name="pictureFile" res-errno="code" res-msg="msg"
							/>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</div>
		<div slot="footer" style="text-align: center;">
			<el-button style="padding: 10px 32px;" type="danger" size="mini" @click="handleClose">取消{{ formData.id ? '编辑' : '创建' }}</el-button>
			<el-button style="padding: 10px 32px;" type="primary" size="mini" @click="handleSubmit">确认提交</el-button>
		</div>
	</el-dialog>
</template>

<script>
import MyUpload from '@/components/MyUpload'
import { customerSave, customerUpdateById } from '@/api/enterprise/customer'

export default {
	name: 'EditModal',
	components: {
		MyUpload
	},
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '1100px',
				title: ''
			},
			visible: false,
			formData: {
				id: '',
				headUrl: '',
				customerName: '',
				customerGender: '',
				customerTel: '',
				customerAddress: '',
				customerType: '',
				customerLevel: '',
				createTime: '',
				updateTime: ''
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
			this.modalOptions.title = params.id ? '客户信息编辑' : '添加客户信息'
			this.formData = Object.assign(this.$options.data().formData, params, {
				id: params.id || '',
				headUrl: params.headUrl || '',
				customerName: params.customerName || '',
				customerGender: params.customerGender,
				customerTel: params.customerTel || '',
				customerAddress: params.customerAddress || '',
				customerType: params.customerType,
				customerLevel: params.customerLevel,
				createTime: params.createTime || '',
				updateTime: params.updateTime || ''
			})
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

<style lang="scss" scoped>
/deep/ .el-dialog {

	.el-dialog__header {
		position: relative;
		margin-top: 10px;
		margin-left: 5px;
		font-weight: bold;
		color: #333333;
	}

	.el-dialog__body {
		padding: 0 25px 30px;
		font-size: 18px;
		color: #000000;

		.el-form-item {
			margin-bottom: 9px;

			label {
				color: #666666;
			}

			.el-form-item__content {
				color: #333333;

				// .el-select,
				// .el-date-editor {
				// 	width: 100% !important;
				// }
				.el-input {
					line-height: 20px;

					input {
						height: 20px;
					}
				}

				.my-upload-wrap {
					.my-upload {
						.el-upload {
							background-color: #d8d8d8;
							width: 176px;
							height: 212px;
							line-height: 184px;
						}

						.el-upload-list {
							li {
								background-color: #d8d8d8;
								width: 176px;
								height: 212px;
							}
						}
					}
				}

				.el-form-item__error {
					top: 85%;
				}
			}
		}
	}
}
</style>
