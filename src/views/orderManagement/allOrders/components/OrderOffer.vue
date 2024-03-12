<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions">
		<el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix="：" label-width="100px">
			<el-form-item label="服务项目">
				<div>{{ formData.dictName }}</div>
			</el-form-item>
			<el-form-item label="报价参考">
				<div>999元/时起</div>
			</el-form-item>
			<div class="form-price">
				<el-form-item label="报价金额" prop="payAmount">
					<div>
						<el-input v-model.number="formData.payAmount" maxlength="9" placeholder="请输入报价金额">
							<template #suffix>（元）</template>
						</el-input>
						<!-- <div style="position: absolute;right: 0;font-size: 12px;color: #64748B;line-height: 22px;">（了解报价可查看报价明细）</div> -->
					</div>
				</el-form-item>
			</div>
		</el-form>
		<div slot="footer" style="text-align: center;">
			<el-button style="padding: 10px 20px;" type="danger" size="mini" @click="handleClose">报价明细</el-button>
			<el-button style="padding: 10px 32px;" type="primary" size="mini" @click="handleSubmit">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
// import MyUpload from '@/components/MyUpload'
import { orderOfferSuccess } from '@/api/orderManagement/order'

export default {
	name: 'OrderOffer',
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
				width: '450px',
				title: ''
			},
			visible: false,
			formData: {
				orderNo: '',
				dictName: '',
				payAmount: ''
			},
			formRules: {
				payAmount: [
					{ required: true, message: '请输入报价金额' }
				]
			}
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.modalOptions.title = '订单报价'
			this.visible = true
			this.formData.dictName = params.dictName || ''
			this.formData.orderNo = params.orderNo || ''
			this.$refs.formData && this.$refs.formData.resetFields()
		},
		async handleSubmit() {
			if (!this.formData.orderNo) return this.$elMessage('获取订单信息失败', 'warning')
			await this.$validatorForm('formData')
			const loading = this.$elLoading()
			try {
				const res = await orderOfferSuccess(this.formData)
				loading.close()
				this.$elMessage(`订单报价成功!`)
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

