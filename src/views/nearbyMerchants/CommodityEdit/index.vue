<template>
	<div class="app-container">
		<div class="body-container">
			<el-card class="box-card">
				<h3 slot="header">商品介绍</h3>
				<div class="box-card-container">
					<div class="box-card-form">
						<el-form ref="formData" :rules="formRules" :model="formData" size="mini" label-suffix="：" label-width="150px">
							<el-form-item label="类型" prop="goodsType">
								<el-radio-group v-model="formData.goodsType" disabled>
									<el-radio :label="1">商品</el-radio>
									<el-radio :label="2">服务</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item :label="`${formData.goodsType === 1 ? '商品' : formData.goodsType === 2 ? '服务' : ''}名称`"
								prop="goodsName">
								<el-input v-model="formData.goodsName" placeholder="请输入商品名称" maxlength="30" show-word-limit />
							</el-form-item>
							<el-form-item :label="`${formData.goodsType === 1 ? '商品' : formData.goodsType === 2 ? '服务' : ''}分类`"
								prop="goodsTypeId">
								<el-select v-model="formData.goodsTypeId" placeholder="请选择分类">
									<el-option v-for="item in goodsTypeList" :key="item.id" :label="item.goodsTypeName" :value="item.id" />
								</el-select>
							</el-form-item>

							<el-form-item :label="`${formData.goodsType === 1 ? '商品' : formData.goodsType === 2 ? '服务' : ''}图片`"
								prop="goodsLogo">
								<MyUpload v-model="formData.goodsLogo" name="pictureFile" res-errno="code" res-msg="msg" />
							</el-form-item>

							<el-form-item label="轮播图" prop="goodsRotationChart">
								<MyUpload v-model="formData.goodsRotationChart" :limit="3" multiple name="pictureFile" res-errno="code"
									res-msg="msg" />
							</el-form-item>

							<el-form-item label="价格" prop="goodsPrice">
								<el-input v-model.number="formData.goodsPrice" type="number" clearable placeholder="请输入价格" />
							</el-form-item>
							<el-form-item label="优惠价" prop="preferentialPrice">
								<el-input v-model.number="formData.preferentialPrice" type="number" clearable placeholder="请输入优惠价" />
							</el-form-item>

							<el-form-item label="商品库存" prop="inventory">
								<el-input v-model.number="formData.inventory" type="number" clearable placeholder="请输入商品库存" />
							</el-form-item>

							<el-form-item label="是否上架" prop="goodsUpper">
								<el-switch v-model.number="formData.goodsUpper" :active-value="1" :inactive-value="0" />
							</el-form-item>
							<el-form-item label="排序" prop="goodsSort">
								<el-input v-model.number="formData.goodsSort" type="number" clearable placeholder="请输入排序" />
							</el-form-item>

							<el-form-item :label="`${formData.goodsType === 1 ? '商品' : formData.goodsType === 2 ? '服务' : ''}详情`"
								prop="goodsInfo">
								<div style="display:inline-block;">
									<!-- <Editor v-model="formData.goodsInfo" :init="editorInit" /> -->
									<Tinymce v-model="formData.goodsInfo" has-menubar :width="580" :height="300"></Tinymce>
								</div>
								<el-input v-model="formData.goodsInfo" style="display:none" />
							</el-form-item>
						</el-form>
					</div>
				</div>
			</el-card>

		</div>

		<div class="footer-container">
			<el-button size="medium" @click="handleCancel">取消</el-button>
			<el-button type="primary" size="medium" @click="handleSubmit">保存</el-button>
		</div>

	</div>
</template>

<script>
import MyUpload from '@/components/MyUpload'
import Tinymce from '@/components/Tinymce'
import { getByIdShopGoodsInfo, editShopGoods, queryShopGoodsTypeList } from '@/api/nearbyMerchants/nearbyMerchants'

export default {
	name: 'CommodityEdit',
	components: {
		MyUpload,
		Tinymce
	},
	data() {
		return {
			goodsTypeList: [],
			formData: {
				id: '',
				goodsName: '',
				goodsTypeId: '',
				goodsLogo: '',
				goodsRotationChart: [],
				goodsPrice: '',
				preferentialPrice: '',
				goodsUpper: '',
				goodsSort: '',
				goodsType: '',
				goodsInfo: "",
				shopId: "",
				inventory: ""
			},
			formRules: {
				goodsName: [
					{ required: true, message: '请输入名称' }
				],
				goodsTypeId: [
					{ required: true, message: '请选择分类' }
				],
				goodsLogo: [
					{ required: true, message: '请上传logo' }
				],
				goodsRotationChart: [
					{ type: 'array', required: true, message: '请上传轮播图' }
				],
				goodsPrice: [
					{ type: 'number', required: true, message: '请输入价格' }
				],
				preferentialPrice: [
					{ type: 'number', required: false, message: '请输入优惠价' }
				],
				goodsUpper: [
					{ required: true, message: '请选择是否上架' }
				],
				goodsSort: [
					{ type: 'number', required: true, message: '请输入排序' }
				],
				goodsType: [
					{ required: true, message: '请选择商品类型' }
				],
				inventory: [
					{ required: true, message: "请填写商品库存", type: 'number', trigger: 'blur' }
				]
			}
		}
	},
	created() {
		this.init()
	},

	methods: {
		init() {
			const { id } = this.$route.query
			this.formData.id = id
			this.getInfo()
		},
		async getGoodsTypeList() {
			const res = await queryShopGoodsTypeList({
				pageNo: 1,
				pageSize: 9999,
				goodsType: this.formData.goodsType
			})
			this.goodsTypeList = res.data.items
		},
		async getInfo() {
			if(!this.formData.id) return
			const res = await getByIdShopGoodsInfo({ shopGoodsId: this.formData.id })
			this.formData = Object.assign(this.$options.data().formData, {
				id: res.data.id || '',
				goodsName: res.data.goodsName || '',
				goodsTypeId: res.data.goodsTypeId || '',
				goodsLogo: res.data.goodsLogo || '',
				goodsRotationChart: res.data.goodsRotationChart ? res.data.goodsRotationChart.split(',') : [],
				goodsPrice: res.data.goodsPrice * 1,
				preferentialPrice: res.data.preferentialPrice || undefined,
				goodsUpper: res.data.goodsUpper,
				goodsSort: res.data.goodsSort || 1,
				goodsType: res.data.goodsType,
				shopId: res.data.shopId,
				inventory: res.data.inventory,
				goodsInfo: res.data.goodsInfo
			})

			this.getGoodsTypeList()
		},
		handleCancel() {
			this.$router.back()
		},
		async handleSubmit() {
			await this.$validatorForm('formData')
			const loading = this.$elLoading()
			try {
				await editShopGoods({
					...this.formData,
					goodsRotationChart: Array.isArray(this.formData.goodsRotationChart) ? this.formData.goodsRotationChart.map(item => item.resData).join(',') : ''
				})
				loading.close()
				this.$elMessage('上传成功！')
				this.$router.back()
			} catch (e) {
				loading.close()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.el-input,
.el-textarea,
.el-select,
.el-cascader {
	width: 400px;
}

.app-container {
	height: 100%;
	padding: 0;
}

.body-container {
	flex: 1;
	overflow-y: auto;

	.el-card {
		margin: 20px;
	}
}

.footer-container {
	padding: 10px 20px;
	display: flex;
	justify-content: center;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>
