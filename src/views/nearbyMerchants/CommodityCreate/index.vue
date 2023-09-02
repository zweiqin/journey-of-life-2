<template>
	<div class="app-container">
		<div class="body-container">
			<el-card class="box-card">
				<h3 slot="header">{{ `${formData.goodsType === 1 ? '商品' : formData.goodsType === 2 ? '服务' : ''}介绍` }}</h3>
				<div class="box-card-container">
					<div class="box-card-form">
						<el-form ref="formData" :rules="formRules" :model="formData" size="mini" label-suffix="：" label-width="150px">
							<el-form-item label="类型" prop="goodsType">
								<el-radio-group v-model="formData.goodsType" disabled>
									<el-radio :label="1">商品</el-radio>
									<el-radio :label="2">服务</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item
								:label="`${formData.goodsType === 1 ? '商品' : formData.goodsType === 2 ? '服务' : ''}名称`"
								prop="goodsName"
							>
								<el-input v-model="formData.goodsName" placeholder="请输入商品名称" maxlength="30" show-word-limit />
							</el-form-item>
							<el-form-item
								:label="`${formData.goodsType === 1 ? '商品' : formData.goodsType === 2 ? '服务' : ''}分类`"
								prop="goodsTypeId"
							>
								<el-select v-model="formData.goodsTypeId" placeholder="请选择分类">
									<el-option v-for="item in goodsTypeList" :key="item.id" :label="item.goodsTypeName" :value="item.id" />
								</el-select>
							</el-form-item>

							<el-form-item
								:label="`${formData.goodsType === 1 ? '商品' : formData.goodsType === 2 ? '服务' : ''}图片`"
								prop="goodsLogo"
							>
								<MyUpload v-model="formData.goodsLogo" />
							</el-form-item>

							<el-form-item label="轮播图" prop="goodsRotationChart">
								<MyUpload v-model="formData.goodsRotationChart" :limit="3" multiple />
							</el-form-item>

							<el-form-item label="价格" prop="goodsPrice">
								<el-input v-model="formData.goodsPrice" type="number" clearable placeholder="请输入价格" />
							</el-form-item>
							<el-form-item label="优惠价" prop="preferentialPrice">
								<el-input v-model="formData.preferentialPrice" type="number" clearable placeholder="请输入优惠价" />
							</el-form-item>

							<el-form-item label="是否上架" prop="goodsUpper">
								<el-switch v-model="formData.goodsUpper" :active-value="1" :inactive-value="0" />
							</el-form-item>
							<el-form-item label="排序" prop="sortOrder">
								<el-input v-model="formData.sortOrder" type="number" clearable placeholder="请输入排序" />
							</el-form-item>

							<el-form-item
								:label="`${formData.goodsType === 1 ? '商品' : formData.goodsType === 2 ? '服务' : ''}详情`"
								prop="detail"
							>
								<div style="display:inline-block;">
									<!-- <Editor v-model="formData.detail" :init="editorInit" /> -->
									<Tinymce v-model="formData.detail" has-menubar :width="580" :height="300"></Tinymce>
								</div>
								<el-input v-model="formData.detail" style="display:none" />
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
// import Editor from '@tinymce/tinymce-vue'
import Tinymce from '@/components/Tinymce'
import { saveShopGoods, queryShopGoodsTypeList } from '@/api/nearbyMerchants/nearbyMerchants'

export default {
	name: 'CommodityCreate',
	components: {
		MyUpload,
		// Editor,
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
				goodsType: ''
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
				]
			}
			// editorInit: {
			//   width: 580,
			//   language: 'zh_CN',
			//   convert_urls: false,
			//   plugins: [ 'advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount' ],
			//   toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
			//   images_upload_handler(blobInfo, success, failure) {
			//     const formData = new FormData()
			//     formData.append('file', blobInfo.blob())
			//     createStorage(formData).then((res) => {
			//       success(res.data.url)
			//     })
			//       .catch(() => {
			//         failure('上传失败，请重新上传')
			//       })
			//   }
			// }
		}
	},
	created() {
		this.init()
	},

	methods: {
		init() {
			this.getGoodsTypeList()
			const { type } = this.$route.query
			this.formData.goodsType = type
		},
		async getGoodsTypeList() {
			const res = await queryShopGoodsTypeList({
				pageNo: 1,
				pageSize: 9999,
				goodsType: this.formData.goodsType
			})
			this.goodsTypeList = res.data.items
		},
		handleCancel() {
			this.$router.back()
		},
		async handleSubmit() {
			await this.$validatorForm('formData')
			const loading = this.$elLoading()
			try {
				await saveShopGoods({
					...this.formData,
					goodsRotationChart: Array.isArray(this.formData.goodsRotationChart) ? this.formData.goodsRotationChart.join(',') : ''
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
