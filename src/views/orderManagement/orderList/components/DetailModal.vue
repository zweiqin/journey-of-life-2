<template>
	<el-dialog
		:visible.sync="visible"
		v-bind="modalOptions"
	>
		<el-form
			ref="formData"
			:model="formData"
			size="mini"
			label-suffix=":"
			label-width="120px"
		>
			<!-- 订单信息 -->
			<el-form-item label="订单号码" prop="orderNo">
				{{ formData.orderNo || '--' }}
			</el-form-item>
			<el-form-item label="创建订单用户id" prop="createUserId">
				{{ formData.createUserId || '--' }}
			</el-form-item>
			<el-form-item label="订单所属站长id" prop="belongsToZzUserId">
				{{ formData.belongsToZzUserId || '--' }}
			</el-form-item>
			<el-form-item label="定价类型" prop="pricingType">
				<span v-if="formData.pricingType === 1">系统计价</span>
				<span v-else-if="formData.pricingType === 2">个人报价</span>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="定价类型" prop="paymentMethod">
				<span v-if="formData.paymentMethod === 1">现付</span>
				<span v-else-if="formData.paymentMethod === 2">到付</span>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="派送类型" prop="deliveryType">
				<span v-if="formData.deliveryType === 1">送货安装</span>
				<span v-else-if="formData.deliveryType === 2">送货到家</span>
				<span v-else-if="formData.deliveryType === 3">送货到楼下</span>
				<span v-else-if="formData.deliveryType === 4">客户自提</span>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="订单费用" prop="price">
				{{ formData.price || '--' }}
			</el-form-item>
			<el-form-item label="实付金额" prop="actualPrice">
				{{ '（订单费用-优惠或折扣）：' + formData.actualPrice || '--' }}
			</el-form-item>
			<el-form-item label="站长所得佣金" prop="arrivalPrice">
				{{ formData.arrivalPrice || '--' }}
			</el-form-item>
			<el-form-item label="师傅实际到账金额" prop="orderChargeDetails">
				{{ formData.orderChargeDetails || '--' }}
			</el-form-item>
			<el-form-item label="订单状态" prop="status">
				<span v-if="formData.status === 0">待支付</span>
				<span v-else-if="formData.status === 1">待接单</span>
				<span v-else-if="formData.status === 2">待报价</span>
				<span v-else-if="formData.status === 3">待分配</span>
				<span v-else-if="formData.status === 4">已分配</span>
				<span v-else-if="formData.status === 5">配送中</span>
				<span v-else-if="formData.status === 6">已完成</span>
				<span v-else-if="formData.status === 7">已取消</span>
				<span v-else-if="formData.status === 8">异常</span>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="发货人姓名" prop="senderName">
				{{ formData.senderName || '--' }}
			</el-form-item>
			<el-form-item label="发货人手机" prop="senderMobile">
				{{ formData.senderMobile || '--' }}
			</el-form-item>
			<el-form-item label="发货地" prop="senderAddress">
				{{ formData.senderAddress || '--' }}
			</el-form-item>
			<el-form-item label="发货地详细地址" prop="senderAddressDetail">
				{{ formData.senderAddressDetail || '--' }}
			</el-form-item>
			<el-form-item label="收货人姓名" prop="consigneeName">
				{{ formData.consigneeName || '--' }}
			</el-form-item>
			<el-form-item label="收货人手机" prop="consigneeMobile">
				{{ formData.consigneeMobile || '--' }}
			</el-form-item>
			<el-form-item label="收货地" prop="consigneeAddress">
				{{ formData.consigneeAddress || '--' }}
			</el-form-item>
			<el-form-item label="收货地详细地址" prop="consigneeAddressDetail">
				{{ formData.consigneeAddressDetail || '--' }}
			</el-form-item>
			<el-form-item label="收货人电梯" prop="isHasElevator">
				<span v-if="formData.isHasElevator === 0">无</span>
				<span v-else-if="formData.isHasElevator === 1">有</span>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="收货人楼层" prop="consigneeFloor">
				{{ formData.consigneeFloor || '--' }}
			</el-form-item>
			<el-form-item label="订单备注" prop="remarks">
				{{ formData.remarks || '--' }}
			</el-form-item>
			<el-form-item label="订单取消原因" prop="cancelRemark">
				{{ formData.cancelRemark || '--' }}
			</el-form-item>
			<el-form-item label="预约时间" prop="subscribeTime">
				{{ formData.subscribeTime || '--' }}
			</el-form-item>
			<el-form-item label="签收图片" prop="signUrl">
				<div v-if="formData.signUrl && formData.signUrl.split(',').length">
					<el-image v-for="(item, index) in formData.signUrl.split(',')" :key="index" :src="item" style="width:80px; height:80px; margin-right: 10px;" fit="cover" :preview-src-list="[ formData.signUrl.split(',') ]" />
				</div>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="客户签名图片" prop="exceptionUrl">
				<div v-if="formData.exceptionUrl && formData.exceptionUrl.split(',').length">
					<el-image v-for="(item, index) in formData.exceptionUrl.split(',')" :key="index" :src="item" style="width:80px; height:80px; margin-right: 10px;" fit="cover" :preview-src-list="[ formData.exceptionUrl.split(',') ]" />
				</div>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="异常图片" prop="exceptionRemark">
				<div v-if="formData.exceptionRemark && formData.exceptionRemark.split(',').length">
					<el-image v-for="(item, index) in formData.exceptionRemark.split(',')" :key="index" :src="item" style="width:80px; height:80px; margin-right: 10px;" fit="cover" :preview-src-list="[ formData.exceptionRemark.split(',') ]" />
				</div>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="异常说明" prop="orderGoodsList">
				{{ formData.orderGoodsList || '--' }}
			</el-form-item>
			<el-form-item label="异常说明" prop="createTime">
				{{ formData.createTime || '--' }}
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
import { getOrderInfo } from '@/api/orderManagement/order'

export default {
	name: 'DetailModal',
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '800px',
				title: '查看客户详情'
			},
			visible: false,
			formData: {
				orderNo: '',
				createUserId: '',
				belongsToZzUserId: '',
				pricingType: '',
				paymentMethod: '',
				deliveryType: '',
				price: '',
				actualPrice: '',
				arrivalPrice: '',
				orderChargeDetails: '',
				status: '',
				senderName: '',
				senderMobile: '',
				senderAddress: '',
				senderAddressDetail: '',
				consigneeName: '',
				consigneeMobile: '',
				consigneeAddress: '',
				consigneeAddressDetail: '',
				isHasElevator: '',
				consigneeFloor: '',
				remarks: '',
				cancelRemark: '',
				isDelete: '',
				subscribeTime: '',
				signUrl: '',
				exceptionUrl: '',
				exceptionRemark: '',
				orderGoodsList: '',
				createTime: ''
			}
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.formData = Object.assign(this.$options.data().formData, params)
			if (params.orderNo) {
				this.getInfo(params.orderNo)
			}
			this.visible = true
		},
		async getInfo(orderNo) {
			const loading = this.$elLoading('加载中')
			try {
				const res = await getOrderInfo({ orderNo })
				this.formData = Object.assign(this.$options.data().formData, res.data, {
					orderNo: res.data.orderNo || '',
					createUserId: res.data.createUserId || '',
					belongsToZzUserId: res.data.belongsToZzUserId || '',
					pricingType: res.data.pricingType || '',
					paymentMethod: res.data.paymentMethod || '',
					deliveryType: res.data.deliveryType || '',
					price: res.data.price || '',
					actualPrice: res.data.actualPrice || '',
					arrivalPrice: res.data.arrivalPrice || '',
					orderChargeDetails: res.data.orderChargeDetails || '',
					status: res.data.status || '',
					senderName: res.data.senderName || '',
					senderMobile: res.data.senderMobile || '',
					senderAddress: res.data.senderAddress || '',
					senderAddressDetail: res.data.senderAddressDetail || '',
					consigneeName: res.data.consigneeName || '',
					consigneeMobile: res.data.consigneeMobile || '',
					consigneeAddress: res.data.consigneeAddress || '',
					consigneeAddressDetail: res.data.consigneeAddressDetail || '',
					isHasElevator: res.data.isHasElevator || '',
					consigneeFloor: res.data.consigneeFloor || '',
					remarks: res.data.remarks || '',
					cancelRemark: res.data.cancelRemark || '',
					isDelete: res.data.isDelete || '',
					subscribeTime: res.data.subscribeTime || '',
					signUrl: res.data.signUrl || '',
					exceptionUrl: res.data.exceptionUrl || '',
					exceptionRemark: res.data.exceptionRemark || '',
					orderGoodsList: res.data.orderGoodsList || '',
					createTime: res.data.createTime || ''
				})
			} finally {
				loading.close()
			}
		}
	}
}
</script>

