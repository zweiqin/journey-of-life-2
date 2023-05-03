<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions">
		<el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="100px">
			<div class="form-price">
				<el-form-item label="追加金额" prop="extraAmount">
					<el-input v-model.number="formData.extraAmount" maxlength="9" placeholder="请输入追加金额">
						<template #suffix>（元）</template>
					</el-input>
				</el-form-item>
			</div>
			<el-form-item label="追加原因" prop="extraRemark">
				<el-input
					v-model="formData.extraRemark" type="textarea" placeholder="请输入追加原因" maxlength="150"
					:rows="8"
					show-word-limit
				/>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<!-- <el-button size="mini" @click="handleClose">取 消</el-button> -->
			<el-button style="padding: 10px 32px;" type="primary" size="mini" @click="handleSubmit">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
// import MyUpload from '@/components/MyUpload'
import { createOrderExtra } from '@/api/orderManagement/order'

export default {
	name: 'AdditionalAmount',
	// components: {
	// 	MyUpload
	// },
	// props: {
	// 	list: {
	// 		type: Array,
	// 		default: () => []
	// 	}
	// },
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '520px',
				title: ''
			},
			visible: false,
			formData: {
				orderNo: '',
				extraAmount: '',
				extraRemark: ''
			},
			formRules: {
				extraAmount: [
					{ required: true, message: '请输入追加金额' }
				],
				extraRemark: [
					{ required: true, message: '请输入追加原因' }
				]
			}
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.modalOptions.title = '订单追加金额'
			this.visible = true
			this.formData.orderNo = params.orderNo || ''
			this.$refs.formData && this.$refs.formData.resetFields()
		},
		async handleSubmit() {
			if (!this.formData.orderNo) return this.$elMessage('获取订单信息失败', 'warning')
			await this.$validatorForm('formData')
			const loading = this.$elLoading()
			try {
				const res = await createOrderExtra(this.formData)
				loading.close()
				this.$elMessage(`追加金额成功!`)
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
		margin-left: 20px;
		font-weight: bold;
		color: #333333;
	}

	.el-dialog__body {
		padding: 15px 50px 5px 30px;

		.form-price {
			.el-form-item {
				.el-form-item__content {
					.el-input {
						// .el-input__prefix {
						// 	top: 2px;
						// 	left: 15px;
						// 	color: #000000;
						// }

						.el-input__suffix {
							right: 10px;
							color: #FF5917;
						}

						.el-input-group__append {
							// padding: 0;
						}
					}
				}
			}
		}

		.el-form-item {
			margin-top: 2px;
			margin-bottom: 18px;

			label {
				color: #000000;
			}

			.el-form-item__content {
				// margin-left: 0!important;
				color: #333333;
			}
		}
	}
}
</style>

