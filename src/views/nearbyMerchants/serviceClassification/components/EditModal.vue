<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions">
		<el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix="：" label-width="140px">
			<el-form-item label="分类类别" prop="typeCategory">
				<el-radio-group v-model="formData.typeCategory" disabled size="mini">
					<el-radio :label="1">商品</el-radio>
					<el-radio :label="2">服务</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="分类名称" prop="goodsTypeName">
				<el-input v-model="formData.goodsTypeName" maxlength="30" show-word-limit placeholder="请输入分类名称" />
			</el-form-item>
			<el-form-item label="分类logo" prop="goodsTypeUrl">
				<MyUpload v-model="formData.goodsTypeUrl" />
			</el-form-item>
			<el-form-item label="排序（值大优先）" prop="goodsTypeSort">
				<el-input-number v-model="formData.goodsTypeSort" step-strictly :min="0" label="请输入排序"></el-input-number>
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
import { saveShopGoodsType, editShopGoodsType } from '@/api/nearbyMerchants/nearbyMerchants'

export default {
	name: 'EditModal',
	components: {
		MyUpload
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
				goodsTypeName: '',
				goodsTypeUrl: '',
				goodsTypeSort: '',
				typeCategory: ''
			},
			formRules: {
				goodsTypeName: [
					{ required: true, message: '请输入分类名称' },
					{ max: 30, message: '30字以内' }
				],
				goodsTypeUrl: [
					{ required: false, message: '请上传分类图片' }
				],
				typeCategory: [
					{ required: true, message: '请选择分类类别' }
				]
			}
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}, type = '') {
			this.modalOptions.title = params.id ? '编辑分类' : '添加分类'
			this.formData = Object.assign(this.$options.data().formData, params, {
				id: params.id || '',
				goodsTypeName: params.goodsTypeName || '',
				goodsTypeUrl: params.goodsTypeUrl || '',
				goodsTypeSort: params.goodsTypeSort,
				typeCategory: typeof params.typeCategory === 'number' ? params.typeCategory : type
			})
			this.visible = true
			this.$refs.formData && this.$refs.formData.resetFields()
		},
		async handleSubmit() {
			await this.$validatorForm('formData')
			const loading = this.$elLoading()
			try {
				const { ...opts } = this.formData
				const params = {
					...opts
				}
				const res = this.formData.id ? await editShopGoodsType(params) : await saveShopGoodsType(params)
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

