<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions">
		<el-form ref="formData" :model="formData" size="mini" label-suffix=":" label-width="120px">
			<!-- 分类信息 -->
			<el-form-item label="ID" prop="id">
				{{ formData.id || '--' }}
			</el-form-item>
			<el-form-item label="门店ID" prop="shopId">
				{{ formData.shopId || '--' }}
			</el-form-item>
			<el-form-item label="分类名称" prop="goodsTypeName">
				{{ formData.goodsTypeName || '--' }}
			</el-form-item>
			<el-form-item label="分类图片" prop="goodsTypeUrl">
				<el-image
					v-if="formData.goodsTypeUrl" :src="formData.goodsTypeUrl" style="width:80px; height:80px"
					fit="cover" :preview-src-list="[ formData.goodsTypeUrl ]"
				/>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="排序" prop="goodsTypeSort">
				{{ typeof formData.goodsTypeSort === 'number' ? formData.goodsTypeSort : '--' }}
			</el-form-item>
			<el-form-item label="类型" prop="typeCategory">
				<el-tag v-if="formData.typeCategory === 1" type="primary">商品</el-tag>
				<el-tag v-else-if="formData.typeCategory === 2" type="warning">服务</el-tag>
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
import { getByIdShopGoodsTypeInfo } from '@/api/nearbyMerchants/nearbyMerchants'

export default {
	name: 'DetailModal',
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '600px',
				title: '查看详情'
			},
			visible: false,
			formData: {
				id: '',
				shopId: '',
				goodsTypeName: '',
				goodsTypeUrl: '',
				goodsTypeSort: '',
				typeCategory: '',
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
				const res = await getByIdShopGoodsTypeInfo({ id })
				this.formData = Object.assign(this.$options.data().formData, res.data, {
					id: res.data.id || '',
					shopId: res.data.shopId || '',
					goodsTypeName: res.data.goodsTypeName || '',
					goodsTypeUrl: res.data.goodsTypeUrl || '',
					goodsTypeSort: res.data.goodsTypeSort,
					typeCategory: res.data.typeCategory,
					createTime: res.data.createTime || '',
					updateTime: res.data.updateTime || ''
				})
			} finally {
				loading.close()
			}
		}
	}
}
</script>

