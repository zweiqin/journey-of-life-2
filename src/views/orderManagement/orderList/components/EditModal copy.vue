<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions">
		<el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="150px">
			<el-form-item label="订单类型" prop="orderType">
				<el-select v-model="formData.orderType" placeholder="请选择订单类型" filterable clearable style="width: 220px;">
					<el-option label="常规单" :value="1" />
					<el-option label="加急单" :value="2" />
				</el-select>
			</el-form-item>
			<el-form-item label="定价类型" prop="pricingType">
				<el-select v-model="formData.pricingType" disabled placeholder="请选择定价类型" filterable clearable style="width: 220px;">
					<el-option label="系统计价" :value="1" />
					<el-option label="个人报价" :value="2" />
				</el-select>
			</el-form-item>
			<el-form-item label="付款方式" prop="paymentMethod">
				<el-select v-model="formData.paymentMethod" placeholder="请选择付款方式" filterable clearable style="width: 220px;">
					<el-option label="现付" :value="1" />
					<el-option label="到付" :value="2" />
				</el-select>
			</el-form-item>
			<el-form-item label="派送类型" prop="deliveryType">
				<el-select v-model="formData.deliveryType" disabled placeholder="请选择派送类型" filterable clearable style="width: 220px;">
					<el-option label="送货安装" :value="1" />
					<el-option label="送货到家" :value="2" />
					<el-option label="送货到楼下" :value="3" />
					<el-option label="客户自提" :value="4" />
				</el-select>
			</el-form-item>
			<el-form-item label="订单费用" prop="price">
				<el-input v-model="formData.price" placeholder="请输入订单费用" maxlength="30" />
			</el-form-item>
			<el-form-item label="订单实付费用" prop="actualPrice">
				<el-input v-model="formData.actualPrice" placeholder="请输入订单实付费用" maxlength="30" />
			</el-form-item>
			<el-form-item label="总价" prop="orderPriceVo.sumPrice">
				<el-input v-model="formData.orderPriceVo.sumPrice" placeholder="请输入总价" maxlength="30" />
			</el-form-item>
			<el-form-item label="会员价" prop="orderPriceVo.vipPrice">
				<el-input v-model="formData.orderPriceVo.vipPrice" placeholder="请输入会员价" maxlength="30" />
			</el-form-item>
			<el-form-item label="起步价" prop="orderPriceVo.startPrice">
				<el-input v-model="formData.orderPriceVo.startPrice" placeholder="请输入起步价" maxlength="30" />
			</el-form-item>
			<el-form-item label="超距费" prop="orderPriceVo.exceedDistancePrice">
				<el-input v-model="formData.orderPriceVo.exceedDistancePrice" placeholder="请输入超距费" maxlength="30" />
			</el-form-item>
			<el-form-item label="超方费" prop="orderPriceVo.exceedPartyPrice">
				<el-input v-model="formData.orderPriceVo.exceedPartyPrice" placeholder="请输入超方费" maxlength="30" />
			</el-form-item>
			<el-form-item label="上楼费" prop="orderPriceVo.upstairsPrice">
				<el-input v-model="formData.orderPriceVo.upstairsPrice" placeholder="请输入上楼费" maxlength="30" />
			</el-form-item>
			<el-form-item label="安装费" prop="orderPriceVo.installAmount">
				<el-input v-model="formData.orderPriceVo.installAmount" placeholder="请输入安装费" maxlength="30" />
			</el-form-item>
			<el-form-item label="客户名称" prop="consigneeName">
				<el-input v-model="formData.consigneeName" placeholder="请输入客户名称" maxlength="30" />
			</el-form-item>
			<el-form-item label="客户联系电话" prop="consigneeMobile">
				<el-input v-model="formData.consigneeMobile" placeholder="请输入客户联系电话" maxlength="30" />
			</el-form-item>
			<el-form-item label="客户地址" prop="consigneeAddress">
				<el-input v-model="formData.consigneeAddress" placeholder="请输入客户地址" maxlength="30" />
			</el-form-item>
			<el-form-item label="客户详细地址" prop="consigneeAddressDetail">
				<el-input
					v-model="formData.consigneeAddressDetail" type="textarea" placeholder="请输入客户详细地址" maxlength="520"
					:rows="3"
					show-word-limit
				/>
			</el-form-item>
			<el-form-item label="订单备注" prop="remarks">
				<el-input
					v-model="formData.remarks" type="textarea" placeholder="请输入订单备注" maxlength="520"
					:rows="3"
					show-word-limit
				/>
			</el-form-item>
			<el-form-item label="安装日期" prop="installDate">
				<el-date-picker
					v-model="formData.installDate" type="date" value-format="yyyy-MM-dd HH:mm:ss"
					placeholder="选择安装日期"
				/>
			</el-form-item>
			<el-form-item label="服务需求" prop="dictName">
				<el-input
					v-model="formData.dictName" type="textarea" placeholder="请输入服务需求" maxlength="520"
					:rows="3"
					show-word-limit
				/>
			</el-form-item>
			<el-form-item label="站长所得佣金" prop="zzBrokerage">
				<el-input v-model="formData.zzBrokerage" placeholder="请输入站长所得佣金" maxlength="30" />
			</el-form-item>
			<el-form-item label="师傅到账金额" prop="sfarrivalPrice">
				<el-input v-model="formData.sfarrivalPrice" placeholder="请输入师傅到账金额" maxlength="30" />
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="handleClose">取 消</el-button>
			<el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
// import { mapGetters } from 'vuex'
import { createOrder, getOrderInfo } from '@/api/orderManagement/order'
import XeUtils from 'xe-utils'

export default {
	name: 'EditModal',
	// components: {
	// 	MyUpload
	// },
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '600px',
				title: ''
			},
			visible: false,
			formData: {
				orderType: '',
				pricingType: 2,
				paymentMethod: '',
				deliveryType: 4,
				price: '',
				actualPrice: '',
				consigneeName: '',
				consigneeMobile: '',
				consigneeAddress: '',
				consigneeAddressDetail: '',
				remarks: '',
				installDate: '',
				dictName: '',
				zzBrokerage: '',
				sfarrivalPrice: '',
				orderPriceVo: {
					sumPrice: '',
					vipPrice: '',
					startPrice: '',
					exceedDistancePrice: '',
					exceedPartyPrice: '',
					upstairsPrice: '',
					installAmount: ''
				}
			},
			formRules: {
				'orderType': [
					{ required: true, message: '请选择订单类型' }
				],
				'pricingType': [
					{ required: true, message: '请选择定价类型' }
				],
				'paymentMethod': [
					{ required: true, message: '请选择付款方式' }
				],
				'deliveryType': [
					{ required: true, message: '请选择派送类型' }
				],
				'price': [
					{ required: true, message: '请输入订单费用' }
				],
				'actualPrice': [
					{ required: true, message: '请输入订单实付费用' }
				],
				'orderPriceVo.sumPrice': [
					{ required: true, message: '请输入总价' }
				],
				'orderPriceVo.vipPrice': [
					{ required: true, message: '请输入会员价' }
				],
				'orderPriceVo.startPrice': [
					{ required: true, message: '请输入起步价' }
				],
				'orderPriceVo.exceedDistancePrice': [
					{ required: true, message: '请输入超距费' }
				],
				'orderPriceVo.exceedPartyPrice': [
					{ required: true, message: '请输入超方费' }
				],
				'orderPriceVo.upstairsPrice': [
					{ required: true, message: '请输入上楼费' }
				],
				'orderPriceVo.installAmount': [
					{ required: true, message: '请输入安装费' }
				],
				'consigneeName': [
					{ required: true, message: '请输入客户名称' }
				],
				'consigneeMobile': [
					{ required: true, message: '请输入客户联系电话' }
				],
				'consigneeAddress': [
					{ required: true, message: '请输入客户地址' }
				],
				'consigneeAddressDetail': [
					{ required: true, message: '请输入客户详细地址' }
				],
				'remarks': [
					{ required: true, message: '请输入订单备注' }
				],
				'installDate': [
					{ required: true, message: '选择安装日期' }
				],
				'dictName': [
					{ required: true, message: '请输入服务需求' }
				],
				'zzBrokerage': [
					{ required: true, message: '请输入站长所得佣金' }
				],
				'sfarrivalPrice': [
					{ required: true, message: '请输入师傅到账金额' }
				]
			}
		}
	},
	// computed: {
	// 	...mapGetters([
	// 		'common_regionList'
	// 	])
	// },
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.modalOptions.title = params.id ? '编辑订单' : '添加订单'
			this.visible = true
			if (params.orderNo) {
				this.getInfo(params.orderNo)
			} else {
				this.$refs.formData && this.$refs.formData.resetFields()
			}
		},
		async getInfo(orderNo) {
			const loading = this.$elLoading('加载中')
			try {
				const res = await getOrderInfo({ orderNo })
				this.formData = Object.assign(this.$options.data().formData, res.data, {
					orderType: res.data.orderType || '',
					pricingType: res.data.pricingType || '',
					paymentMethod: res.data.paymentMethod || '',
					deliveryType: res.data.deliveryType || '',
					price: res.data.price || '',
					actualPrice: res.data.actualPrice || '',
					consigneeName: res.data.consigneeName || '',
					consigneeMobile: res.data.consigneeMobile || '',
					consigneeAddress: res.data.consigneeAddress || '',
					consigneeAddressDetail: res.data.consigneeAddressDetail || '',
					remarks: res.data.remarks || '',
					installDate: res.data.installDate || '',
					dictName: res.data.dictName || '',
					zzBrokerage: res.data.zzBrokerage || '',
					sfarrivalPrice: res.data.sfarrivalPrice || '',
					orderPriceVo: res.data.orderPriceVo || {}
				})
				// res.data.regionCode && this.setRegion_arr(res.data.regionCode)
				this.$nextTick(() => { // 之所以用nextTick，是因为要validate且region_arr是个数组（对象），element内部有处理
					this.$refs.formData && this.$refs.formData.validate()
				})
			} finally {
				loading.close()
			}
		},
		// setRegion_arr(regionCode) {
		// 	const regionItem = XeUtils.findTree(this.common_regionList, (item) => item.code === regionCode)
		// 	if (regionItem && Array.isArray(regionItem.nodes)) {
		// 		this.formData.region_arr = regionItem.nodes.map((v) => v.code)
		// 	}
		// },
		async handleSubmit() {
			await this.$validatorForm('formData')
			const loading = this.$elLoading()
			try {
				const { region_arr, picUrls, ...opts } = this.formData
				const params = {
					...opts
				// regionCode: region_arr[region_arr.length - 1],
				// picUrls: picUrls.map((pic) => (typeof pic === 'string' ? pic : pic.resData))
				}
				this.formData.id ? await updateOrder(params) : await createOrder(params)
				loading.close()
				this.$elMessage(`${this.formData.id ? '编辑' : '添加'}成功!`)
				this.$emit('success')
				this.visible = false
			} catch (e) {
				loading.close()
			} finally {
				loading.close()
			}
		}
	}
}
</script>

