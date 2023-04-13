<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions" center>
		<div style="margin-top: 25px;width: 100%;">
			<el-form ref="formData" :model="formData" :rules="formRules" label-position="left" label-width="135px" label-suffix="" size="mini">
				<div class="dialog-section-title" style="display: flex;margin-bottom: 15px;">
					<div
						style="width: 5px;margin-right: 8px;;background-image: linear-gradient(#409EFF, #2E6FAE, #071A2C);border-radius: 1px;"
					>
					</div>
					<span>{{ step === 1 ? '用户' : '订单' }}信息</span>
				</div>
				<div v-show="step === 1" style="display: flex;justify-content: space-between;">
					<div style="width: 48%;">
						<el-form-item label="名称" prop="consigneeName">
							<el-input v-model="formData.consigneeName" placeholder="请用户姓名" maxlength="30" />
						</el-form-item>
						<el-form-item label="地址" prop="consigneeAddress">
							<el-input v-model="formData.consigneeAddress" placeholder="请选择省市区/县" maxlength="30" />
						</el-form-item>
						<el-form-item label="安装日期" prop="installDate">
							<el-date-picker
								v-model="formData.installDate" type="date" value-format="yyyy-MM-dd HH:mm:ss"
								placeholder="请选择安装日期"
							/>
						</el-form-item>
						<el-form-item label="需求说明" prop="remarks">
							<el-input
								v-model="formData.remarks" type="textarea" placeholder="请填写您的需求说明" maxlength="520"
								:rows="3"
								show-word-limit
							/>
						</el-form-item>
					</div>
					<div style="width: 48%;">
						<el-form-item label="联系电话" prop="consigneeMobile">
							<el-input v-model="formData.consigneeMobile" placeholder="请填写联系电话" maxlength="30" />
						</el-form-item>
						<el-form-item label="详细地址" prop="consigneeAddressDetail">
							<el-input v-model="formData.consigneeAddressDetail" placeholder="请填写详细地址（如：街道、小区、乡镇、村等，门牌号信息）" maxlength="50" />
							<!-- <el-input
								v-model="formData.consigneeAddressDetail" type="textarea" placeholder="请填写详细地址（如：街道、小区、乡镇、村等，门牌号信息）" maxlength="520"
								:rows="1" show-word-limit
								/> -->
						</el-form-item>
						<el-form-item label="服务类型" prop="dictName">
							<el-input v-model="formData.dictName" placeholder="请选择服务类型" maxlength="30" />
						</el-form-item>
						<!-- <el-form-item label="服务图片" prop="service">
							<MyUpload v-model="formData.service" />
							</el-form-item> -->
					</div>
				</div>
				<div v-show="step === 2">
					<div style="width: 100%;"></div>
					<div style="display: flex;justify-content: space-between;">
						<div style="width: 48%;">
							<el-form-item label="订单类型" prop="orderType">
								<el-select v-model="formData.orderType" placeholder="请选择" filterable clearable style="width: 220px;">
									<el-option label="常规单" :value="1" />
									<el-option label="加急单" :value="2" />
								</el-select>
							</el-form-item>
							<el-form-item label="付款方式" prop="paymentMethod">
								<el-select v-model="formData.paymentMethod" placeholder="请选择" filterable clearable style="width: 220px;">
									<el-option label="现付" :value="1" />
									<el-option label="到付" :value="2" />
								</el-select>
							</el-form-item>
						</div>
						<div style="width: 48%;">
							<el-form-item label="定价类型" prop="pricingType">
								<el-select
									v-model="formData.pricingType" disabled placeholder="请选择" filterable
									clearable
									style="width: 220px;"
								>
									<el-option label="系统计价" :value="1" />
									<el-option label="个人报价" :value="2" />
								</el-select>
							</el-form-item>
							<!-- <el-form-item label="派送类型" prop="deliveryType">
								<el-select
								v-model="formData.deliveryType" disabled placeholder="请选择" filterable
								clearable
								style="width: 220px;"
								>
								<el-option label="送货安装" :value="1" />
								<el-option label="送货到家" :value="2" />
								<el-option label="送货到楼下" :value="3" />
								<el-option label="客户自提" :value="4" />
								</el-select>
								</el-form-item> -->
						</div>
					</div>
					<div style="width: 100%;display: flex;justify-content: space-between;">
						<el-form-item label="起步价" prop="orderPriceVo.startPrice">
							<el-input v-model="formData.orderPriceVo.startPrice" placeholder="请填写起步价" maxlength="30" />
						</el-form-item>
						<el-form-item label="超距费" prop="orderPriceVo.exceedDistancePrice">
							<el-input v-model="formData.orderPriceVo.exceedDistancePrice" placeholder="请填写超距费" maxlength="30" />
						</el-form-item>
						<el-form-item label="超方费" prop="orderPriceVo.exceedPartyPrice">
							<el-input v-model="formData.orderPriceVo.exceedPartyPrice" placeholder="请填写超方费" maxlength="30" />
						</el-form-item>
						<el-form-item label="上楼费" prop="orderPriceVo.upstairsPrice">
							<el-input v-model="formData.orderPriceVo.upstairsPrice" placeholder="请填写上楼费" maxlength="30" />
						</el-form-item>
						<el-form-item label="安装费" prop="orderPriceVo.installAmount">
							<el-input v-model="formData.orderPriceVo.installAmount" placeholder="请填写安装费" maxlength="30" />
						</el-form-item>
					</div>
					<div style="width: 100%;display: flex;justify-content: space-between;">
						<div style="width: 25%;">
							<el-form-item label="总价" prop="orderPriceVo.sumPrice">
								<el-input v-model="formData.orderPriceVo.sumPrice" disabled placeholder="请输入总价" maxlength="30" />
							</el-form-item>
						</div>
						<div style="width: 25%;">
							<el-form-item label="会员价" prop="orderPriceVo.vipPrice">
								<el-input v-model="formData.orderPriceVo.vipPrice" placeholder="请填写会员价" maxlength="30" />
							</el-form-item>
						</div>
						<div style="width: 25%;">
							<el-form-item label="订单费用" prop="price">
								<el-input v-model="formData.price" disabled placeholder="请输入订单费用" maxlength="30" />
							</el-form-item>
						</div>
						<div style="width: 25%;">
							<el-form-item label="订单实付费用" prop="actualPrice">
								<el-input v-model="formData.actualPrice" placeholder="请输入订单实付费用" maxlength="30" />
							</el-form-item>
						</div>
					</div>
					<div style="width: 100%;display: flex;justify-content: space-between;">
						<div style="width: 48%;">
							<el-form-item label="店长所得佣金" prop="zzBrokerage">
								<el-input v-model="formData.zzBrokerage" placeholder="请输入店长所得佣金" maxlength="30" />
							</el-form-item>
						</div>
						<div style="width: 48%;">
							<el-form-item label="师傅到账金额" prop="sfarrivalPrice">
								<el-input v-model="formData.sfarrivalPrice" placeholder="请输入师傅到账金额" maxlength="30" />
							</el-form-item>
						</div>
					</div>
				</div>
			</el-form>
		</div>
		<!-- <span slot="footer" class="dialog-footer"> -->
		<div style="margin-top: 20px;">
			<el-button v-show="step === 1" type="primary" size="medium" @click="step = 2">下一步</el-button>
			<el-button v-show="step === 2" type="primary" size="medium" @click="handleSubmit">确认发布</el-button>
			<el-button v-show="step === 2" type="info" plain size="medium" @click="step = 1">上一步</el-button>
		</div>
		<!-- </span> -->
	</el-dialog>
</template>

<script>
// import { mapGetters } from 'vuex'
import { createOrder, getOrderInfo } from '@/api/orderManagement/order'
// import XeUtils from 'xe-utils'

export default {
	name: 'EditModal',
	// components: {
	// 	MyUpload
	// },
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '900px',
				title: ''
			},
			visible: false,
			step: 1,
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
					{ required: false, message: '请选择订单类型' }
				],
				'pricingType': [
					{ required: false, message: '请选择定价类型' }
				],
				'paymentMethod': [
					{ required: false, message: '请选择付款方式' }
				],
				// 'deliveryType': [
				// 	{ required: false, message: '请选择派送类型' }
				// ],
				'price': [
					{ required: false, message: '请输入订单费用' }
				],
				'actualPrice': [
					{ required: false, message: '请输入订单实付费用' }
				],
				'orderPriceVo.sumPrice': [
					{ required: false, message: '请输入总价' }
				],
				'orderPriceVo.vipPrice': [
					{ required: false, message: '请输入会员价' }
				],
				'orderPriceVo.startPrice': [
					{ required: false, message: '请输入起步价' }
				],
				'orderPriceVo.exceedDistancePrice': [
					{ required: false, message: '请输入超距费' }
				],
				'orderPriceVo.exceedPartyPrice': [
					{ required: false, message: '请输入超方费' }
				],
				'orderPriceVo.upstairsPrice': [
					{ required: false, message: '请输入上楼费' }
				],
				'orderPriceVo.installAmount': [
					{ required: false, message: '请输入安装费' }
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
					{ required: false, message: '请输入需求说明' }
				],
				'installDate': [
					{ required: true, message: '选择安装日期' }
				],
				'dictName': [
					{ required: false, message: '请输入服务需求' }
				],
				'zzBrokerage': [
					{ required: false, message: '请输入店长所得佣金' }
				],
				'sfarrivalPrice': [
					{ required: false, message: '请输入师傅到账金额' }
				]
			}
		}
	},
	watch: {
		'formData.orderPriceVo': {
			handler(newV, oldV) {
				if (!Number(newV.startPrice) || !Number(newV.exceedDistancePrice) || !Number(newV.exceedPartyPrice) || !Number(newV.upstairsPrice) || !Number(newV.installAmount)) return
				if (Number(newV.sumPrice) === Number(newV.startPrice) + Number(newV.exceedDistancePrice) + Number(newV.exceedPartyPrice) + Number(newV.upstairsPrice) + Number(newV.installAmount)) return
				this.formData.orderPriceVo.sumPrice = Number(newV.vipPrice) + Number(newV.startPrice) + Number(newV.exceedDistancePrice) + Number(newV.exceedPartyPrice) + Number(newV.upstairsPrice) + Number(newV.installAmount)
				this.formData.price = this.formData.orderPriceVo.sumPrice
			},
			deep: true,
			immediate: true
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
			this.modalOptions.title = params.id ? '编辑订单' : '创建订单'
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

<style lang="scss" scoped>
.dialog-section-title {
	font-weight: bold;
	font-size: 16px;
	color: #333333;
}

.form-item-line {
	/deep/ .el-form-item__content {
		line-height: 16px;
	}
}

/deep/ .el-dialog {
	.el-step__description {
		padding: 2px;

		.el-input-group__append {
			padding: 0 13px;
		}
	}

	.el-dialog__header {
		font-size: 18px;
		font-weight: bold;
		color: #333333;
	}

	.el-dialog__body {
		// padding: 0 25px 30px;

		.el-form-item {
			margin-top: 20px;
			margin-bottom: 6px;

			label {
				color: #333333;
			}

			.el-form-item__content {
				margin-left: 0!important;
				color: #333333;
				.el-select, .el-date-editor {
					width: 100%!important;
				}
			}
		}
	}
}
</style>
