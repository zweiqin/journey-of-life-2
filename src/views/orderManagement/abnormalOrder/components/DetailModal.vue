<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions" center>
		<div
			style="position: relative;display: flex;flex-direction: column;justify-content: start;align-items: center;width: 100%;"
		>
			<div style="position: sticky;top: 0;z-index: 1;width: 100%;padding-top: 25px;;background-color: #ffffff;">
				<div style="width: 88%;margin: 0 auto;">
					<el-steps
						v-if="formData.status === 7" :space="200" :active="1" finish-status="error"
						process-status="error"
						align-center
					>
						<el-step title="已取消"></el-step>
					</el-steps>
					<el-steps
						v-else-if="formData.status === 8" :space="200" :active="1" finish-status="error"
						process-status="error" align-center
					>
						<el-step title="异常"></el-step>
					</el-steps>
					<el-steps
						v-else :space="200"
						:active="formData.status == 2 ? 0 : formData.status == 0 ? 1 : formData.status == 1 ? 2 : Number(formData.status)"
						finish-status="success" align-center
					>
						<el-step title="待报价" :class="{ 'is-ok': formData.status == 0 || formData.status == 1 || Number(formData.status) >= 3, 'is-on': formData.status == 0 }">
							<template #description>
								<el-input v-if="formData.status == 2" v-model="orderOffer" placeholder="填报价">
									<el-button
										slot="append" v-permission="[ `POST ${api.orderOfferSuccess}` ]"
										style="width: 26px;padding: 0;" size="mini"
										@click="handleOrderOffer({ orderNo: formData.orderNo })"
									>
										确定
									</el-button>
								</el-input>
							</template>
						</el-step>
						<el-step title="待付款" :class="{ 'is-ok': formData.status == 1 || Number(formData.status) >= 3, 'is-on': formData.status == 1 }"></el-step>
						<el-step title="待接单" :class="{ 'is-ok': Number(formData.status) >= 3, 'is-on': formData.status == 3 }"></el-step>
						<el-step title="待分配" :class="{ 'is-ok': Number(formData.status) >= 4, 'is-on': formData.status == 4 }"></el-step>
						<el-step title="已分配" :class="{ 'is-ok': Number(formData.status) >= 5, 'is-on': formData.status == 5 }"></el-step>
						<el-step title="配送中" :class="{ 'is-ok': Number(formData.status) >= 6, 'is-on': formData.status == 6 }"></el-step>
						<el-step title="已完成"></el-step>
					</el-steps>
				</div>
			</div>
			<div style="margin-top: 25px;width: 100%;">
				<el-form ref="formData" :model="formData" label-position="left" label-width="135px" label-suffix="" size="mini">
					<!-- <el-form-item label="订单状态" prop="status">
						<el-tag v-if="row.status === 0">待付款</el-tag>
						<el-tag v-else-if="row.status === 1">待接单</el-tag>
						<el-tag v-else-if="row.status === 2" type="success">待报价</el-tag>
						<el-tag v-else-if="row.status === 3">待分配</el-tag>
						<el-tag v-else-if="row.status === 4" type="success">已分配</el-tag>
						<el-tag v-else-if="row.status === 5" type="success">配送中</el-tag>
						<el-tag v-else-if="row.status === 6" type="info">已完成</el-tag>
						<el-tag v-else-if="row.status === 7" type="info">已取消</el-tag>
						<el-tag v-else-if="row.status === 8" type="danger">异常</el-tag>
						<span v-else>--</span>
						</el-form-item> -->
					<!-- 订单信息 -->
					<div style="display: flex;justify-content: space-between;">
						<div style="width: 40%;">
							<div class="dialog-section-title" style="display: flex;margin-bottom: 15px;">
								<div
									style="width: 4px;margin-right: 8px;;background-image: linear-gradient(#409EFF, #2E6FAE, #071A2C);border-radius: 1px;"
								>
								</div>
								<span>客户信息</span>
							</div>
							<div style="display: flex;">
								<el-form-item label="" label-width="0" prop="consigneeName">
									{{ formData.consigneeName || '--' }}
								</el-form-item>
								<el-form-item label="" label-width="0" prop="consigneeMobile" style="margin-left: 30px;">
									{{ formData.consigneeMobile || '--' }}
								</el-form-item>
							</div>
							<div style="display: flex;flex-direction: column;">
								<el-form-item
									class="form-item-line" label="" label-width="0" prop="consigneeAddress"
									style="white-space: nowrap;"
								>
									{{ formData.consigneeAddress || '--' }}
								</el-form-item>
								<el-form-item
									class="form-item-line" label="" label-width="0" prop="consigneeAddressDetail"
									style="margin-left: 1px;"
								>
									{{ formData.consigneeAddressDetail || '--' }}
								</el-form-item>
							</div>
							<div style="display: flex;">
								<el-form-item label="电梯" label-width="65px" prop="isHasElevator">
									<span v-if="formData.isHasElevator === 0">无</span>
									<span v-else-if="formData.isHasElevator === 1">有</span>
									<span v-else>--</span>
								</el-form-item>
								<el-form-item label="楼层" label-width="65px" prop="consigneeFloor" style="margin-left: 65px;">
									{{ formData.consigneeFloor ? formData.consigneeFloor + '楼' : '--' }}
								</el-form-item>
							</div>
						</div>
						<div v-if="formData.deliveryType !== 4" style="width: 50%;">
							<div class="dialog-section-title" style="display: flex;margin-bottom: 15px;">
								<div
									style="width: 4px;margin-right: 8px;;background-image: linear-gradient(#409EFF, #2E6FAE, #071A2C);border-radius: 1px;"
								>
								</div>
								<span>发货人信息</span>
							</div>
							<div style="display: flex;">
								<el-form-item label="" label-width="0" prop="senderName">
									{{ formData.senderName || '--' }}
								</el-form-item>
								<el-form-item label="" label-width="0" prop="senderMobile" style="margin-left: 30px;">
									{{ formData.senderMobile || '--' }}
								</el-form-item>
							</div>
							<div style="display: flex;flex-direction: column;">
								<el-form-item
									class="form-item-line" label="" label-width="0" prop="senderAddress"
									style="white-space: nowrap;"
								>
									{{ formData.senderAddress || '--' }}
								</el-form-item>
								<el-form-item
									class="form-item-line" label="" label-width="0" prop="senderAddressDetail"
									style="margin-left: 1px;"
								>
									{{ formData.senderAddressDetail || '--' }}
								</el-form-item>
							</div>
						</div>
					</div>
					<div style="margin-top: 35px;">
						<div class="dialog-section-title" style="display: flex;margin-bottom: 15px;">
							<div
								style="width: 4px;margin-right: 8px;;background-image: linear-gradient(#409EFF, #2E6FAE, #071A2C);border-radius: 1px;"
							>
							</div>
							<span>订单信息</span>
						</div>
						<div style="display: flex;justify-content: space-between;">
							<div style="width: 40%;">
								<el-form-item label="订单号码" prop="orderNo">
									{{ formData.orderNo || '--' }}
								</el-form-item>
								<el-form-item label="创建时间" prop="createTime">
									{{ formData.createTime || '--' }}
								</el-form-item>
								<!-- <el-form-item label="派送类型" prop="deliveryType">
									<span v-if="formData.deliveryType === 1">送货安装</span>
									<span v-else-if="formData.deliveryType === 2">送货到家</span>
									<span v-else-if="formData.deliveryType === 3">送货到楼下</span>
									<span v-else-if="formData.deliveryType === 4">客户自提</span>
									<span v-else>--</span>
									</el-form-item> -->
								<el-form-item label="需求说明" prop="remarks">
									{{ formData.remarks || '--' }}
								</el-form-item>
								<el-form-item label="下单用户类型" prop="createUserType">
									<span v-if="formData.createUserType === 1">货主</span>
									<span v-else-if="formData.createUserType === 2">物流</span>
									<span v-else-if="formData.createUserType === 3">站长</span>
									<span v-else>--</span>
								</el-form-item>
								<el-form-item label="订单所属站长id" prop="belongsToZzUserId">
									{{ formData.belongsToZzUserId || '--' }}
								</el-form-item>
							</div>
							<div style="width: 50%;">
								<el-form-item label="服务码" prop="serverCode">
									{{ formData.serverCode || '--' }}
								</el-form-item>
								<el-form-item label="预约时间" prop="subscribeTime">
									{{ formData.subscribeTime || '--' }}
								</el-form-item>
								<el-form-item label="安装日期" prop="installDate">
									{{ formData.installDate || '--' }}
								</el-form-item>
								<el-form-item label="紧急程度" prop="orderType">
									<span v-if="formData.orderType === 1">常规单</span>
									<span v-else-if="formData.orderType === 2">加急单</span>
									<span v-else-if="formData.orderType === 3">顺路单</span>
									<span v-else>--</span>
								</el-form-item>
								<el-form-item label="服务类型" prop="dictName">
									{{ formData.dictName || '--' }}
								</el-form-item>
								<!-- <el-form-item label="订单Id" prop="id">
									{{ formData.id || '--' }}
									</el-form-item>
									<el-form-item label="下单用户id" prop="createUserId">
									{{ formData.createUserId || '--' }}
									</el-form-item> -->
							</div>
						</div>
					</div>
					<div style="margin-top: 35px;">
						<div class="dialog-section-title" style="display: flex;margin-bottom: 15px;">
							<div
								style="width: 4px;margin-right: 8px;;background-image: linear-gradient(#409EFF, #2E6FAE, #071A2C);border-radius: 1px;"
							>
							</div>
							<span>结算信息</span>
						</div>
						<div>
							<div style="display: flex;justify-content: space-between;">
								<div style="width: 40%;">
									<el-form-item label="定价类型" prop="pricingType">
										<span v-if="formData.pricingType === 1">系统计价</span>
										<span v-else-if="formData.pricingType === 2">个人报价</span>
										<span v-else>--</span>
									</el-form-item>
									<el-form-item label="超距费" prop="orderExpenseDetailsVo">
										{{ formData.orderExpenseDetailsVo.exceedDistancePrice || '--' }}
									</el-form-item>
									<el-form-item label="上楼费" prop="orderExpenseDetailsVo">
										{{ formData.orderExpenseDetailsVo.upstairsPrice || '--' }}
									</el-form-item>
									<el-form-item label="安装费" prop="orderExpenseDetailsVo">
										{{ formData.orderExpenseDetailsVo.installAmount || '--' }}
									</el-form-item>
									<el-form-item label="总金额" prop="orderExpenseDetailsVo">
										{{ formData.orderExpenseDetailsVo.sumPrice || '--' }}
									</el-form-item>
								</div>
								<div style="width: 50%;">
									<el-form-item label="付款方式" prop="paymentMethod">
										<span v-if="formData.paymentMethod === 1">现付</span>
										<span v-else-if="formData.paymentMethod === 2">到付</span>
										<span v-else>--</span>
									</el-form-item>
									<el-form-item label="起步价" prop="orderExpenseDetailsVo">
										{{ formData.orderExpenseDetailsVo.startPrice || '--' }}
									</el-form-item>
									<el-form-item label="超方费" prop="orderExpenseDetailsVo">
										{{ formData.orderExpenseDetailsVo.exceedPartyPrice || '--' }}
									</el-form-item>
									<el-form-item label="优惠金额">
										{{ (formData.orderExpenseDetailsVo.sumPrice - formData.orderExpenseDetailsVo.vipPrice) || '--' }}
									</el-form-item>
									<el-form-item label="会员价" prop="orderExpenseDetailsVo">
										{{ formData.orderExpenseDetailsVo.vipPrice || '--' }}
									</el-form-item>
								</div>
							</div>
							<div>
								<el-form-item label="实付金额" prop="actualPrice">
									<!-- {{ '（订单费用-优惠或折扣）：' + formData.actualPrice || '--' }} -->
									<span style="font-size: 24px;color: #F75A48;">
										{{ formData.actualPrice ? '￥' + formData.actualPrice
											: '--' }}
									</span>
								</el-form-item>
							</div>
							<div style="display: flex;justify-content: space-between;">
								<div style="width: 40%;">
									<el-form-item label="站长所得佣金" prop="brokerage">
										{{ formData.brokerage || '--' }}
									</el-form-item>
								</div>
								<div style="width: 50%;">
									<el-form-item label="师傅实际到账金额" prop="arrivalPrice">
										{{ formData.arrivalPrice || '--' }}
									</el-form-item>
								</div>
							</div>
						</div>
					</div>
					<div style="margin-top: 35px;">
						<div class="dialog-section-title" style="display: flex;margin-bottom: 15px;">
							<div
								style="width: 4px;margin-right: 8px;;background-image: linear-gradient(#409EFF, #2E6FAE, #071A2C);border-radius: 1px;"
							>
							</div>
							<span>订单状况</span>
						</div>
						<div style="display: flex;justify-content: space-between;">
							<div style="width: 40%;">
								<el-form-item label="签收图片" prop="signUrl">
									<div v-if="formData.signUrl && formData.signUrl.split(',').length">
										<el-image
											v-for="(item, index) in formData.signUrl.split(',')" :key="index" :src="item"
											style="width:80px; height:80px; margin-right: 10px;" fit="cover"
											:preview-src-list="[ formData.signUrl.split(',') ]"
										/>
									</div>
									<span v-else>--</span>
								</el-form-item>
								<el-form-item label="客户签名图片" prop="exceptionUrl">
									<div v-if="formData.exceptionUrl && formData.exceptionUrl.split(',').length">
										<el-image
											v-for="(item, index) in formData.exceptionUrl.split(',')" :key="index" :src="item"
											style="width:80px; height:80px; margin-right: 10px;" fit="cover"
											:preview-src-list="[ formData.exceptionUrl.split(',') ]"
										/>
									</div>
									<span v-else>--</span>
								</el-form-item>
								<el-form-item label="订单取消原因" prop="cancelRemark">
									{{ formData.cancelRemark || '--' }}
								</el-form-item>
							</div>
							<div style="width: 50%;">
								<el-form-item label="异常图片" prop="exceptionRemark">
									<div v-if="formData.exceptionRemark && formData.exceptionRemark.split(',').length">
										<el-image
											v-for="(item, index) in formData.exceptionRemark.split(',')" :key="index" :src="item"
											style="width:80px; height:80px; margin-right: 10px;" fit="cover"
											:preview-src-list="[ formData.exceptionRemark.split(',') ]"
										/>
									</div>
									<span v-else>--</span>
								</el-form-item>
								<el-form-item label="异常说明" prop="exceptionRemark">
									{{ formData.exceptionRemark || '--' }}
								</el-form-item>
							</div>
							<!-- <el-form-item label="是否删除" prop="isDelete">
								<span v-if="formData.isDelete === 0">未删除</span>
								<span v-else-if="formData.isDelete === 1">已删除</span>
								<span v-else>--</span>
								</el-form-item> -->
						</div>
					</div>
				</el-form>
			</div>
		</div>
	</el-dialog>
</template>

<script>
import { api, getOrderInfo, orderOfferSuccess } from '@/api/orderManagement/order'

export default {
	name: 'DetailModal',
	data() {
		return {
			api,
			modalOptions: {
				closeOnClickModal: false,
				width: '900px',
				title: '订单详情'
			},
			visible: false,
			formData: {
				id: '',
				serverCode: '',
				dictName: '',
				installDate: '',
				createUserType: '',
				orderExpenseDetailsVo: {},
				brokerage: '',
				orderType: '',
				actualPrice: '',
				arrivalPrice: '',
				belongsToZzUserId: '',
				cancelRemark: '',
				consigneeAddress: '',
				consigneeAddressDetail: '',
				consigneeFloor: '',
				consigneeMobile: '',
				consigneeName: '',
				createTime: '',
				createUserId: '',
				deliveryType: '',
				exceptionRemark: '',
				exceptionUrl: '',
				isDelete: '',
				isHasElevator: '',
				orderChargeDetails: '',
				orderGoodsList: '',
				orderNo: '',
				paymentMethod: '',
				price: '',
				pricingType: '',
				remarks: '',
				senderAddress: '',
				senderAddressDetail: '',
				senderMobile: '',
				senderName: '',
				signUrl: '',
				status: '',
				subscribeTime: ''
			},
			orderOffer: ''
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.formData = Object.assign(this.$options.data().formData, params, {
				orderExpenseDetailsVo: params.orderExpenseDetailsVo || {}
			})
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
					id: res.data.id || '',
					serverCode: res.data.serverCode || '',
					dictName: res.data.dictName || '',
					installDate: res.data.installDate || '',
					createUserType: res.data.createUserType || '',
					orderExpenseDetailsVo: res.data.orderExpenseDetailsVo || {},
					brokerage: res.data.brokerage || '',
					orderType: res.data.orderType || '',
					actualPrice: res.data.actualPrice || '',
					arrivalPrice: res.data.arrivalPrice || '',
					belongsToZzUserId: res.data.belongsToZzUserId || '',
					cancelRemark: res.data.cancelRemark || '',
					consigneeAddress: res.data.consigneeAddress || '',
					consigneeAddressDetail: res.data.consigneeAddressDetail || '',
					consigneeFloor: res.data.consigneeFloor || '',
					consigneeMobile: res.data.consigneeMobile || '',
					consigneeName: res.data.consigneeName || '',
					createTime: res.data.createTime || '',
					createUserId: res.data.createUserId || '',
					deliveryType: res.data.deliveryType || '',
					exceptionRemark: res.data.exceptionRemark || '',
					exceptionUrl: res.data.exceptionUrl || '',
					isDelete: res.data.isDelete || '',
					isHasElevator: res.data.isHasElevator || '',
					orderChargeDetails: res.data.orderChargeDetails || '',
					orderGoodsList: res.data.orderGoodsList || '',
					orderNo: res.data.orderNo || '',
					paymentMethod: res.data.paymentMethod || '',
					price: res.data.price || '',
					pricingType: res.data.pricingType || '',
					remarks: res.data.remarks || '',
					senderAddress: res.data.senderAddress || '',
					senderAddressDetail: res.data.senderAddressDetail || '',
					senderMobile: res.data.senderMobile || '',
					senderName: res.data.senderName || '',
					signUrl: res.data.signUrl || '',
					status: res.data.status || '',
					subscribeTime: res.data.subscribeTime || ''
				})
			} finally {
				loading.close()
			}
		},
		async handleOrderOffer({ orderNo }) {
			if (!this.orderOffer) return this.$elMessage('请输入正确的报价金额', 'warning')
			await this.$elConfirm(`确认报价？`)
			await orderOfferSuccess({
				orderNo,
				payAmount: this.orderOffer
			})
			this.$elMessage()
			this.getInfo(this.formData.orderNo)
		}
	}
}
</script>

<style lang="scss" scoped>
.dialog-section-title {
	font-size: 16px;
	color: #333333;
}

.form-item-line {
	/deep/ .el-form-item__content {
		line-height: 16px;
	}
}

/deep/ .el-dialog {
	.el-steps {
		.el-step {
			.el-step__head {
				.el-step__line {
					i {
						display: none;
					}
				}
			}
			.el-step__head.is-process, .el-step__head.is-wait {
				.el-step__line {
					top: 6px;
					height: 12px;
					background: #EBECED;
				}
			}
			.el-step__head.is-process {
				.el-step__icon {
					color: #FFFFFF;
					background: #3CA1FF;
					border-color: #FFFFFF;
				}
			}
			.el-step__main {
				.el-step__title.is-success {
					color: #303133;
				}
			}
			.el-step__description {
				padding: 2px;

				.el-input-group__append {
					padding: 0 13px;
				}
			}
		}
		.el-step.is-ok:not(.is-on) {
		// .el-step.is-ok:nth-of-type(n) {
			.el-step__head.is-success {
				.el-step__line {
					top: 6px;
					height: 12px;
					background: #071A2C;
				}
				.el-step__icon {
					color: #FFFFFF;
					background: #071A2C;
					border-color: #FFFFFF;
				}
			}
		}
		.el-step.is-ok.is-on {
			.el-step__head.is-success {
				.el-step__line {
					top: 6px;
					height: 12px;
					background: linear-gradient(90deg, #071A2C 0%, #2E6FAE 64%, #3CA1FF 100%);
				}
				.el-step__icon {
					color: #FFFFFF;
					background: #071A2C;
					border-color: #FFFFFF;
				}
			}
		}
	}

	.el-dialog__header {
		font-size: 18px;
		font-weight: bold;
		color: #333333;
	}

	.el-dialog__body {
		padding: 0 25px 30px;

		.el-form-item {
			margin-bottom: 6px;

			label {
				color: #9E9E9E;
			}

			.el-form-item__content {
				color: #333333;
			}
		}
	}
}
</style>
