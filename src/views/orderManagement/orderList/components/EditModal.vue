<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions" center>
		<div slot="title">
			<div style="display: flex;font-size: 20px;">
				<div
					style="width: 4px;height: 18px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
				>
				</div>
				<div>创建订单</div>
			</div>
		</div>
		<div style="margin-top: 20px;width: 100%;">
			<el-form
				ref="formData" :model="formData" :rules="formRules" label-position="left"
				label-width="90px"
				label-suffix="" size="mini"
			>
				<div
					class="dialog-section-title"
					style="margin-left: 10px;margin-bottom: 15px;font-size: 16px;font-weight: bold;color: #000000;"
				>
					<span>服务信息</span>
				</div>
				<div style="display: flex;justify-content: space-between;">
					<div style="width: 33%;">
						<el-form-item label="联系人" prop="consigneeName">
							<el-input v-model="formData.consigneeName" placeholder="请联系人姓名" maxlength="30" />
						</el-form-item>
						<el-form-item label="联系电话" prop="consigneeMobile">
							<el-input v-model="formData.consigneeMobile" placeholder="请填写联系电话" maxlength="30" />
						</el-form-item>
					</div>
					<div style="width: 63%;">
						<el-form-item label="服务类型" prop="dictName">
							<el-input v-model="formData.dictName" placeholder="请选择服务类型" maxlength="30" />
						</el-form-item>
						<el-form-item label="服务图片" prop="servicePic">
							<MyUpload
								v-model="formData.servicePic" :limit="3" multiple :width="64"
								:height="64"
								:show-tips-message="false" name="pictureFile" res-errno="code" res-msg="msg"
							/>
						</el-form-item>
					</div>
				</div>
				<div>
					<div style="display: flex;">
						<el-form-item label="上门地址" prop="consigneeAddress">
							<el-input v-model="formData.consigneeAddress" placeholder="请选择省市区/县" maxlength="30" />
						</el-form-item>
						<el-form-item label="" prop="consigneeAddressDetail" label-width="0">
							<el-input
								v-model="formData.consigneeAddressDetail" style="width: 400px;"
								placeholder="请填写详细地址（如：街道、小区、乡镇、村等，门牌号信息）" maxlength="50"
							/>
							<!-- <el-input
								v-model="formData.consigneeAddressDetail" type="textarea" placeholder="请填写详细地址（如：街道、小区、乡镇、村等，门牌号信息）" maxlength="520"
								:rows="1" show-word-limit
								/> -->
						</el-form-item>
					</div>
					<div>
						<el-form-item label="上门时间" prop="installDate">
							<el-date-picker
								v-model="formData.installDate" type="date" value-format="yyyy-MM-dd HH:mm:ss"
								placeholder="请选择上门时间"
							/>
						</el-form-item>
					</div>
					<div style="display: flex;justify-content: space-between;">
						<div style="width: 45%;">
							<el-form-item label="报价类型" prop="pricingType">
								<el-select
									v-model="formData.pricingType" disabled placeholder="请选择" filterable
									clearable
									style="width: 220px;"
								>
									<el-option label="系统计价" :value="1" />
									<el-option label="人工报价" :value="2" />
								</el-select>
							</el-form-item>
							<el-form-item label="付款方式" prop="paymentMethod">
								<el-select v-model="formData.paymentMethod" placeholder="请选择" filterable clearable style="width: 220px;">
									<el-option label="现付" :value="1" />
									<el-option label="到付" :value="2" />
								</el-select>
							</el-form-item>
						</div>
						<div style="width: 45%;">
							<el-form-item label="订单类型" prop="orderType">
								<el-select v-model="formData.orderType" placeholder="请选择" filterable clearable style="width: 220px;">
									<el-option label="常规单" :value="1" />
									<el-option label="加急单" :value="2" />
								</el-select>
							</el-form-item>
						</div>
					</div>
					<div>
						<el-form-item label="需求说明" prop="remarks">
							<el-input v-model="formData.remarks" placeholder="请填写您的需求说明" maxlength="520" />
						</el-form-item>
					</div>
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
					<div style="width: 100%;display: flex;justify-content: space-between;">
						<div style="width: fit-content;" class="form-price">
							<el-form-item label="起步费用" prop="orderPriceVo.startPrice">
								<el-input
									v-model="formData.orderPriceVo.startPrice" style="width: 150px;" placeholder="请填写"
									maxlength="30"
								>
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
						<div style="width: fit-content;" class="form-price">
							<el-form-item label="超距费" prop="orderPriceVo.exceedDistancePrice" label-width="60px">
								<el-input
									v-model="formData.orderPriceVo.exceedDistancePrice" style="width: 150px;" placeholder="请填写"
									maxlength="30"
								>
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
						<div style="width: fit-content;" class="form-price">
							<el-form-item label="超方费" prop="orderPriceVo.exceedPartyPrice" label-width="60px">
								<el-input
									v-model="formData.orderPriceVo.exceedPartyPrice" style="width: 150px;" placeholder="请填写"
									maxlength="30"
								>
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
					</div>
					<div style="width: 100%;display: flex;justify-content: space-between;">
						<div style="width: fit-content;" class="form-price">
							<el-form-item label="上楼费" prop="orderPriceVo.upstairsPrice">
								<el-input
									v-model="formData.orderPriceVo.upstairsPrice" style="width: 150px;" placeholder="请填写"
									maxlength="30"
								>
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
						<div style="width: fit-content;" class="form-price">
							<el-form-item label="安装费" prop="orderPriceVo.installAmount" label-width="60px">
								<el-input
									v-model="formData.orderPriceVo.installAmount" style="width: 150px;" placeholder="请填写"
									maxlength="30"
								>
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
						<div style="width: fit-content;" class="form-price">
							<el-form-item label="总价" prop="orderPriceVo.sumPrice" label-width="60px">
								<el-input
									v-model="formData.orderPriceVo.sumPrice" style="width: 150px;" disabled placeholder="请填写"
									maxlength="30"
								>
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
					</div>
					<div style="width: 100%;display: flex;justify-content: space-between;">
						<div style="width: fit-content;" class="form-price">
							<el-form-item label="会员价" prop="orderPriceVo.vipPrice">
								<el-input v-model="formData.orderPriceVo.vipPrice" style="width: 150px;" placeholder="请填写" maxlength="30">
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
						<div style="width: fit-content;" class="form-price">
							<el-form-item label="店长佣金" prop="zzBrokerage" label-width="75px">
								<el-input v-model="formData.zzBrokerage" style="width: 150px;" placeholder="请输入" maxlength="30">
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
						<div style="width: fit-content;" class="form-price">
							<el-form-item label="师傅佣金" prop="sfarrivalPrice" label-width="75px">
								<el-input v-model="formData.sfarrivalPrice" style="width: 150px;" placeholder="请输入" maxlength="30">
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
					</div>
					<div style="width: 100%;display: flex;justify-content: space-between;">
						<div style="width: fit-content;" class="form-price">
							<el-form-item label="订单费用" prop="price">
								<el-input v-model="formData.price" style="width: 150px;" disabled placeholder="订单费用" maxlength="30">
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
						<div style="width: fit-content;" class="form-actualPrice form-price">
							<el-form-item label="实际费用" prop="actualPrice">
								<el-input v-model="formData.actualPrice" style="width: 150px;" placeholder="实际费用" maxlength="30">
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
						<div style="width: 240px;"></div>
					</div>
				</div>
			</el-form>
		</div>
		<div slot="footer" class="dialog-footer">
			<div style="margin-top: 20px;">
				<!-- <el-button type="danger" size="medium">修改</el-button> -->
				<el-button style="padding: 10px 32px;" type="primary" size="medium" @click="handleSubmit">确定</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script>
import MyUpload from '@/components/MyUpload'
// import { mapGetters } from 'vuex'
import { createOrder, getOrderInfo } from '@/api/orderManagement/order'
// import XeUtils from 'xe-utils'

export default {
	name: 'EditModal',
	components: {
		MyUpload
	},
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '900px',
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
				},
				servicePic: []
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
					{ required: true, message: '请输入订单实付费用' }
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
					{ required: true, message: '请输入服务需求' }
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
				const { region_arr, servicePic, ...opts } = this.formData
				const params = {
					...opts,
					// regionCode: region_arr[region_arr.length - 1],
					servicePic: servicePic.map((pic) => (typeof pic === 'string' ? pic : pic.resData))
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
/deep/ .el-dialog {

	.el-dialog__header {
		position: relative;
		margin-top: 20px;
		margin-left: 20px;
		font-weight: bold;
		color: #333333;
	}

	.el-dialog__body {
		padding: 0 40px 30px;

		.el-form-item {
			margin-top: 2px;
			margin-bottom: 18px;

			label {
				color: #64748B;
			}

			.el-form-item__content {
				// margin-left: 0!important;
				color: #333333;

				.el-select,
				.el-date-editor {
					width: 100% !important;
				}

				.my-upload-wrap {
					.my-upload {
						.el-upload {
							background-color: #f1f1f1;
							width: 66px;
							height: 66px;
							line-height: 74px;
						}

						.el-upload-list {
							li {
								background-color: #f1f1f1;
								width: 66px;
								height: 66px;
							}
						}
					}
				}
			}
		}

		.form-price {
			.el-form-item {
				.el-form-item__content {
					.el-input {
						.el-input__prefix {
							top: 2px;
							left: 15px;
							color: #000000;
						}

						.el-input__suffix {
							right: 15px;
							color: #000000;
						}

						.el-input-group__append {
							// padding: 0;
						}
					}
				}
			}
		}

		.form-actualPrice {
			.el-form-item {
				label {
					color: #0519d4;
				}

				.el-form-item__content {
					.el-input {
						input {
							color: #FC4023;
						}

						.el-input__prefix {
							color: #FC4023;
						}
					}
				}
			}
		}
	}
}
</style>
