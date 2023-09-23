<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions">
		<el-form ref="formData" :model="formData" size="mini" label-suffix="：" label-width="120px">
			<!-- 商品/服务信息 -->
			<el-form-item label="ID" prop="id">
				{{ formData.id || '--' }}
			</el-form-item>
			<el-form-item label="门店ID" prop="shopId">
				{{ formData.shopId || '--' }}
			</el-form-item>
			<el-form-item :label="`${formData.goodsType === 1 ? '商品' : formData.goodsType === 2 ? '服务' : ''}名称`" prop="goodsName">
				{{ formData.goodsName || '--' }}
			</el-form-item>
			<el-form-item :label="`${formData.goodsType === 1 ? '商品' : formData.goodsType === 2 ? '服务' : ''}分类ID`" prop="goodsTypeId">
				{{ formData.goodsTypeId || '--' }}
			</el-form-item>
			<el-form-item :label="`${formData.goodsType === 1 ? '商品' : formData.goodsType === 2 ? '服务' : ''}logo`" prop="goodsLogo">
				<el-image
					v-if="formData.goodsLogo" :src="formData.goodsLogo" style="width:80px; height:80px" fit="cover"
					:preview-src-list="[ formData.goodsLogo ]"
				/>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item :label="`${formData.goodsType === 1 ? '商品' : formData.goodsType === 2 ? '服务' : ''}轮播图`" prop="goodsRotationChart">
				<div v-if="formData.goodsRotationChart && formData.goodsRotationChart.length">
					<el-image
						v-for="(item, index) in formData.goodsRotationChart.split(',')" :key="index" :src="item"
						style="width:80px; height:80px; margin-right: 10px;" fit="cover" :preview-src-list="formData.goodsRotationChart.split(',')"
					/>
				</div>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="价格" prop="goodsPrice">
				{{ typeof formData.goodsPrice === 'number' ? formData.goodsPrice : '--' }}
			</el-form-item>
			<el-form-item label="优惠价" prop="preferentialPrice">
				{{ typeof formData.preferentialPrice === 'number' ? formData.preferentialPrice : '--' }}
			</el-form-item>
			<el-form-item label="服务量销售量" prop="serviceVolume">
				{{ typeof formData.serviceVolume === 'number' ? formData.serviceVolume : '--' }}
			</el-form-item>
			<el-form-item label="产品标签" prop="goodsUpper">
				<el-tag v-if="formData.goodsUpper === 0" type="danger">下架</el-tag>
				<el-tag v-else-if="formData.goodsUpper === 1" type="success">上架</el-tag>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="排序" prop="goodsSort">
				{{ typeof formData.goodsSort === 'number' ? formData.goodsSort : '--' }}
			</el-form-item>
			<el-form-item label="类型" prop="goodsType">
				<el-tag v-if="formData.goodsType === 1" type="primary">商品</el-tag>
				<el-tag v-else-if="formData.goodsType === 2" type="warning">服务</el-tag>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="创建时间" prop="createTime">
				{{ formData.createTime || '--' }}
			</el-form-item>
			<el-form-item :label="`${formData.goodsType === 1 ? '商品' : formData.goodsType === 2 ? '服务' : ''}详情`" prop="goodsInfo">
				{{ formData.goodsInfo || '--' }}
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
import { getByIdShopGoodsInfo } from '@/api/nearbyMerchants/nearbyMerchants'

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
				goodsName: '',
				goodsTypeId: '',
				goodsLogo: '',
				goodsRotationChart: '',
				goodsPrice: '',
				preferentialPrice: '',
				serviceVolume: '',
				goodsUpper: '',
				goodsSort: '',
				goodsType: '',
				createTime: '',
				goodsInfo: ''
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
				const res = await getByIdShopGoodsInfo({ shopGoodsId: id })
				this.formData = Object.assign(this.$options.data().formData, res.data, {
					id: res.data.id || '',
					shopId: res.data.shopId || '',
					goodsName: res.data.goodsName || '',
					goodsTypeId: res.data.goodsTypeId,
					goodsLogo: res.data.goodsLogo || '',
					goodsRotationChart: res.data.goodsRotationChart,
					goodsPrice: res.data.goodsPrice,
					preferentialPrice: res.data.preferentialPrice || undefined,
					serviceVolume: res.data.serviceVolume,
					goodsUpper: res.data.goodsUpper,
					goodsSort: res.data.goodsSort || 1,
					goodsType: res.data.goodsType,
					createTime: res.data.createTime || '',
					goodsInfo: res.data.goodsInfo || ''
				})
			} finally {
				loading.close()
			}
		}
	}
}
</script>

