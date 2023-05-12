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
					style="display: flex;align-items: center;margin-left: 10px;margin-bottom: 15px;font-size: 16px;font-weight: bold;color: #000000;"
				>
					<div>请选择订单种类：</div>
					<div style="margin-left: 20px;">
						<el-radio-group v-model="orderMode" size="mini">
							<el-radio-button :label="1">城市配送</el-radio-button>
							<el-radio-button :label="2">维保订单</el-radio-button>
						</el-radio-group>
					</div>
				</div>
				<div style="display: flex;justify-content: space-between;">
					<div style="width: 33%;">
						<el-form-item label="客户" prop="consigneeName">
							<el-input v-model="formData.consigneeName" placeholder="请客户姓名" maxlength="30" />
						</el-form-item>
						<el-form-item label="客户电话" prop="consigneeMobile">
							<el-input v-model="formData.consigneeMobile" placeholder="请填写客户电话" maxlength="30" />
						</el-form-item>
					</div>
					<div v-show="orderMode === 1" style="width: 63%;">
						<el-form-item label="发货人" prop="senderName" label-width="100px" style="margin-bottom: 13px;">
							<el-input v-model="formData.senderName" placeholder="请发货人姓名" maxlength="30" />
						</el-form-item>
						<el-form-item label="发货人电话" prop="senderMobile" label-width="100px" style="margin-bottom: 13px;">
							<el-input v-model="formData.senderMobile" placeholder="请填写发货人电话" maxlength="30" />
						</el-form-item>
						<el-form-item label="发货地址" prop="senderAddress" label-width="100px" style="margin-bottom: 0px;">
							<el-input v-model="formData.senderAddress" placeholder="请选择省市区/县" maxlength="30" style="width: 200px;" />
						</el-form-item>
						<el-form-item label="" prop="senderAddressDetail" label-width="0" style="margin-top: 0px;;margin-left: 100px;">
							<el-input
								v-model="formData.senderAddressDetail" style="width: 380px;"
								placeholder="请填写详细地址（如：街道、小区、乡镇、村等，门牌号信息）" maxlength="50"
							/>
						</el-form-item>
					</div>
					<div v-show="orderMode === 2" style="width: 63%;">
						<el-form-item label="服务类型" prop="dictName">
							<el-cascader
								v-model="formData.dictName"
								placeholder="请选择服务类型"
								:options="dictList"
								style="width: 100%;"
								:props="{ checkStrictly: false, expandTrigger: 'hover', label: 'serverName', value: 'id', children: 'children' }"
								clearable
							/>
							<!-- :props="{ label: 'name', value: 'code', expandTrigger: 'hover', checkStrictly: true }" -->
						</el-form-item>
						<el-form-item label="物品图片" prop="servicePics">
							<MyUpload
								v-model="formData.servicePics" :limit="5" multiple :width="64"
								:height="64"
								:show-tips-message="false" name="pictureFile" res-errno="code" res-msg="msg"
							/>
						</el-form-item>
					</div>
				</div>
				<div>
					<div v-show="orderMode === 1" style="display: flex;justify-content: space-between;">
						<el-form-item label="有无电梯" prop="isHasElevator">
							<el-radio-group v-model="formData.isHasElevator">
								<el-radio :label="0">无</el-radio>
								<el-radio :label="1">有</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="居住楼层" prop="consigneeFloor">
							<el-input-number v-model="formData.consigneeFloor" :min="-1" :max="100" label="所在楼层数"></el-input-number>
						</el-form-item>
						<el-form-item label="派送类型" prop="deliveryType1">
							<el-select
								v-model="formData.deliveryType1" placeholder="请选择" filterable
								clearable
								style="width: 220px;"
							>
								<el-option label="送货安装" :value="1" />
								<el-option label="送货到家" :value="2" />
								<el-option label="送货到楼下" :value="3" />
								<!-- <el-option label="客户自提" :value="4" /> -->
							</el-select>
						</el-form-item>
					</div>
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
					<div v-show="orderMode === 1" style="display: flex;align-items: center;">
						<el-form-item label="上门时间" prop="installDate1">
							<el-date-picker
								v-model="formData.installDate1" type="date" value-format="yyyy-M-d"
								placeholder="请选择上门日期"
							/>
						</el-form-item>
					</div>
					<div v-show="orderMode === 2" style="display: flex;align-items: center;">
						<el-form-item label="上门时间" prop="installDate2A">
							<el-date-picker
								v-model="formData.installDate2A" type="date" value-format="yyyy - M-d" :picker-options="{ disabledDate: (time) => time.getTime() <= Date.now() - 86400000 || time.getTime() > Date.now() + 604800000 }"
								placeholder="请选择上门日期" start-placeholder="请选择开始时间" end-placeholder="请选择结束时间"
							/>
						</el-form-item>
						<el-form-item label="" prop="installDate2B" label-width="0">
							<!-- (Number(new Date().getHours())+1).padStart(2, '0')+':00' -->
							<el-time-select
								v-model="formData.installDate2B" placeholder="请选择时间段" value-format="HH:mm" style="width: 160px;"
								:picker-options="{
									start: '06:00',
									step: '02:00',
									end: '20:00',
									minTime: formData.installDate2A ? Number(formData.installDate2A.substring(0, 4)) > new Date().getFullYear() ? '05:59' : Number(formData.installDate2A.split('-')[1].trimStart()) > (new Date().getMonth() + 1) ? '05:59' : Number(formData.installDate2A.split('-')[2]) > new Date().getDate() ? '05:59' : new Date().toLocaleTimeString('en-GB').substring(0, 5) : '20:01',
									maxTime: '20:01'
								}"
							>
							</el-time-select>
						</el-form-item>
						<div v-show="formData.installDate2B" style="margin-bottom: 18px;font-weight: bold;">
							&nbsp;&nbsp;-&nbsp;&nbsp;{{ (Number(formData.installDate2B.substring(0, 2)) + 2 + ':00').padStart(5, '0') }}
						</div>
					</div>
					<div style="display: flex;justify-content: space-between;">
						<div style="width: 45%;">
							<div v-show="orderMode === 1">
								<el-form-item label="报价类型" prop="pricingType1">
									<el-select
										v-model="formData.pricingType1" placeholder="请选择" filterable
										clearable
										style="width: 220px;"
									>
										<el-option label="系统计价" :value="1" />
										<el-option label="人工报价" :value="2" />
									</el-select>
								</el-form-item>
							</div>
							<div v-show="orderMode === 2">
								<el-form-item label="报价类型" prop="pricingType2">
									<el-select
										v-model="formData.pricingType2" disabled placeholder="请选择" filterable
										clearable
										style="width: 220px;"
									>
										<el-option label="系统计价" :value="1" />
										<el-option label="人工报价" :value="2" />
									</el-select>
								</el-form-item>
							</div>
							<el-form-item label="付款方式" prop="paymentMethod">
								<el-select v-model="formData.paymentMethod" disabled placeholder="请选择" filterable clearable style="width: 220px;">
									<el-option label="现付" :value="1" />
									<!-- <el-option label="到付" :value="2" /> -->
								</el-select>
							</el-form-item>
						</div>
						<div v-show="orderMode === 1" style="width: 45%;">
							<el-form-item label="订单类型" prop="orderType1">
								<el-select v-model="formData.orderType1" placeholder="请选择" filterable clearable style="width: 220px;">
									<el-option label="常规单" :value="1" />
									<el-option label="加急单" :value="2" />
								</el-select>
							</el-form-item>
						</div>
						<div v-show="orderMode === 2" style="width: 45%;">
							<el-form-item label="订单类型" prop="orderType2">
								<el-select v-model="formData.orderType2" disabled placeholder="请选择" filterable clearable style="width: 220px;">
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
					<div v-show="orderMode === 1">
						<el-form-item label="" label-width="0" prop="serviceGoods">
							<div v-for="(item, index) in formData.serviceGoods" :key="index">
								<el-descriptions :title="`商品${index + 1}`" :column="3" size="medium" border>
									<template #extra>
										<el-button v-if="index === 0" type="primary" size="small" @click="formData.serviceGoods.push({ categoryName: '', commodityNumber: 0, goodsHostType: '家具', goodsType: '', goodsUrl: '', quantity: 0, volume: 0, weight: 0 })">新增</el-button>
										<el-button v-else type="danger" size="small" @click="formData.serviceGoods.splice(index, 1)">删除</el-button>
									</template>
									<el-descriptions-item>
										<span slot="label">
											<i class="el-icon-s-goods"></i>
											商品类型
										</span>
										<div>
											<el-cascader
												v-model="formData.serviceGoods[index].goodsType"
												placeholder="请选择商品类型"
												:options="dictList"
												style="width: 200px;"
												:props="{ checkStrictly: false, expandTrigger: 'hover', label: 'serverName', value: 'id', children: 'children' }"
												clearable
											/>
										</div>
									</el-descriptions-item>
									<el-descriptions-item>
										<span slot="label">
											<i class="el-icon-s-claim"></i>
											品名
										</span>
										<div>
											<el-input v-model="formData.serviceGoods[index].categoryName" placeholder="请输入品名" maxlength="30" style="width: 150px;" />
										</div>
									</el-descriptions-item>
									<el-descriptions-item>
										<span slot="label">
											<i class="el-icon-star-on"></i>
											套数
										</span>
										<el-input-number v-model="formData.serviceGoods[index].commodityNumber" :min="0" :max="100000" label="套数"></el-input-number>
									</el-descriptions-item>
									<el-descriptions-item>
										<span slot="label">
											<i class="el-icon-star-off"></i>
											件数
										</span>
										<el-input-number v-model="formData.serviceGoods[index].quantity" :min="0" :max="100000" label="件数"></el-input-number>
									</el-descriptions-item>
									<el-descriptions-item>
										<span slot="label">
											<i class="el-icon-data-board"></i>
											体积
										</span>
										<el-input-number v-model="formData.serviceGoods[index].volume" :min="0" :max="100000" label="件数"></el-input-number>
									</el-descriptions-item>
									<el-descriptions-item>
										<span slot="label">
											<i class="el-icon-box"></i>
											重量
										</span>
										<el-input-number v-model="formData.serviceGoods[index].weight" :min="0" :max="100000" label="件数"></el-input-number>
									</el-descriptions-item>
									<el-descriptions-item>
										<span slot="label">
											<i class="el-icon-picture-outline-round"></i>
											商品图片
										</span>
										<MyUpload
											v-model="formData.serviceGoods[index].goodsUrl" :limit="1" :width="64"
											:height="64"
											:show-tips-message="false" name="pictureFile" res-errno="code" res-msg="msg"
										/>
									</el-descriptions-item>
								</el-descriptions>
							</div>
						</el-form-item>
					</div>
					<div v-show="orderMode === 1 && formData.pricingType1 === 2" style="width: 100%;display: flex;justify-content: space-between;">
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
					<div v-show="orderMode === 1 && formData.pricingType1 === 2" style="width: 100%;display: flex;justify-content: space-between;">
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
					<div v-show="orderMode === 1 && formData.pricingType1 === 2" style="width: 100%;display: flex;justify-content: space-between;">
						<div style="width: fit-content;" class="form-price">
							<el-form-item label="会员价" prop="orderPriceVo.vipPrice">
								<el-input v-model="formData.orderPriceVo.vipPrice" style="width: 150px;" placeholder="请填写" maxlength="30">
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
					</div>
					<div v-show="orderMode === 2" style="width: 100%;display: flex;justify-content: space-between;">
						<div style="width: fit-content;" class="form-price">
							<el-form-item label="店长佣金" prop="zzBrokerage">
								<el-input v-model="formData.zzBrokerage" style="width: 150px;" placeholder="请输入" maxlength="30">
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
						<div style="width: fit-content;" class="form-price">
							<el-form-item label="师傅佣金" prop="sfarrivalPrice">
								<el-input v-model="formData.sfarrivalPrice" style="width: 150px;" placeholder="请输入" maxlength="30">
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
						<div style="width: 220px;"></div>
					</div>
					<div v-show="orderMode === 1" style="width: 100%;display: flex;justify-content: space-between;">
						<div style="width: fit-content;" class="form-price">
							<el-form-item label="订单费用" prop="price1">
								<el-input v-model="formData.price1" style="width: 150px;" :disabled="formData.pricingType1 === 1" placeholder="订单费用" maxlength="30">
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
						<div style="width: fit-content;" class="form-actualPrice form-price">
							<el-form-item label="实际费用" prop="actualPrice1">
								<el-input v-model="formData.actualPrice1" style="width: 150px;" :disabled="formData.pricingType1 === 1" placeholder="实际费用" maxlength="30">
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
						<div style="width: 240px;"></div>
					</div>
					<div v-show="orderMode === 2" style="width: 100%;display: flex;justify-content: space-between;">
						<div style="width: fit-content;" class="form-price">
							<el-form-item label="订单费用" prop="price2">
								<el-input v-model="formData.price2" style="width: 150px;" :disabled="false" placeholder="订单费用" maxlength="30">
									<template #prefix>￥</template>
									<template #suffix>(元)</template>
								</el-input>
							</el-form-item>
						</div>
						<div style="width: fit-content;" class="form-actualPrice form-price">
							<el-form-item label="实际费用" prop="actualPrice2">
								<el-input v-model="formData.actualPrice2" style="width: 150px;" :disabled="false" placeholder="实际费用" maxlength="30">
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
import XeUtils from 'xe-utils'

export default {
	name: 'EditModal',
	components: {
		MyUpload
	},
	data() {
		return {
			// handleLazyLoad: (node, resolve) => {
			// 	console.log(node)
			// 	resolve(node.data.children && node.data.children.length ? node.data.children.map((item) => ({ value: item.id, label: item.serverNameOne || item.serverNameTwo || item.serverNameThree, leaf: !node.data.children || node.data.children.length === 0 })) : [])
			// },
			modalOptions: {
				closeOnClickModal: false,
				width: '900px',
				title: ''
			},
			visible: false,
			orderMode: '',
			dictList: [],
			formData: {
				actualPrice: '', // -订单实付费用
				actualPrice1: '', //
				actualPrice2: '', //
				consigneeAddress: '', // 客户地址
				consigneeAddressDetail: '', // 客户详细地址
				consigneeFloor: '',
				consigneeMobile: '', // 客户手机号
				consigneeName: '', // 客户姓名
				deliveryType: '', // 派送类型（社区后台传4）
				deliveryType1: '', //
				deliveryType2: 4, //
				installDate: '', // 上门时间
				installDate1: '', //
				installDate2A: '', //
				installDate2B: '', //
				isHasElevator: '',
				orderType: '', // 订单类型（社区后台传1）
				orderType1: '', //
				orderType2: 1, //
				paymentMethod: 1, // 付款方式（社区后台传1）
				price: '', // -订单费用
				price1: '', //
				price2: '', //
				pricingType: '', // 定价类型
				pricingType1: '', //
				pricingType2: 2, //
				remarks: '', // 订单备注
				dictName: '', // 服务需求
				zzBrokerage: '', // 店长所得佣金
				sfarrivalPrice: '', // 师傅到账金额
				orderPriceVo: {
					sumPrice: '',
					vipPrice: '',
					startPrice: '',
					exceedDistancePrice: '',
					exceedPartyPrice: '',
					upstairsPrice: '',
					installAmount: ''
				},
				orderGoodsList: [
					// {
					//   goodsType: "团蜂",
					//   goodsUrl: "xxx"
					// }
					// {
					// 	categoryName: '板式床（普通）',
					// 	commodityNumber: 22,
					// 	goodsHostType: '家具',
					// 	goodsType: '床类,板式床（普通）',
					// 	goodsUrl: 'xxx',
					// 	quantity: 222,
					// 	volume: 2222,
					// 	weight: 22222
					// }
				],
				senderAddress: '',
				senderAddressDetail: '',
				senderMobile: '',
				senderName: '',
				serviceGoods: [ { categoryName: '', commodityNumber: 0, goodsHostType: '家具', goodsType: '', goodsUrl: '', quantity: 0, volume: 0, weight: 0 } ],
				servicePics: []
			},
			formRules: {
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
				'senderName': [
					{ required: false, message: '请输入发货人名称' }
				],
				'senderMobile': [
					{ required: false, message: '请输入发货人联系电话' }
				],
				'senderAddress': [
					{ required: false, message: '请输入发货人地址' }
				],
				'senderAddressDetail': [
					{ required: false, message: '请输入发货人详细地址' }
				],
				'dictName': [
					{ required: false, message: '请输入服务类型' }
				],
				// 'installDate': [
				// 	{ required: false, message: '选择上门日期' }
				// ],
				'installDate1': [
					{ required: false, message: '选择上门日期' }
				],
				'installDate2A': [
					{ required: false, message: '选择上门日期' }
				],
				'installDate2B': [
					{ required: false, message: '选择上门时间段' }
				],
				// 'pricingType': [
				// 	{ required: false, message: '请选择定价类型' }
				// ],
				'pricingType1': [
					{ required: false, message: '请选择定价类型' }
				],
				'pricingType2': [
					{ required: false, message: '请选择定价类型' }
				],
				// 'orderType': [
				// 	{ required: false, message: '请选择订单类型' }
				// ],
				'orderType1': [
					{ required: false, message: '请选择订单类型' }
				],
				'orderType2': [
					{ required: false, message: '请选择订单类型' }
				],
				'paymentMethod': [
					{ required: true, message: '请选择付款方式' }
				],
				// 'deliveryType': [
				// 	{ required: false, message: '请选择派送类型' }
				// ],
				'deliveryType1': [
					{ required: false, message: '请选择派送类型' }
				],
				'deliveryType2': [
					{ required: false, message: '请选择派送类型' }
				],
				// 'orderPriceVo.sumPrice': [
				// 	{ required: false, message: '请输入总价' }
				// ],
				// 'orderPriceVo.vipPrice': [
				// 	{ required: false, message: '请输入会员价' }
				// ],
				// 'orderPriceVo.startPrice': [
				// 	{ required: false, message: '请输入起步价' }
				// ],
				// 'orderPriceVo.exceedDistancePrice': [
				// 	{ required: false, message: '请输入超距费' }
				// ],
				// 'orderPriceVo.exceedPartyPrice': [
				// 	{ required: false, message: '请输入超方费' }
				// ],
				// 'orderPriceVo.upstairsPrice': [
				// 	{ required: false, message: '请输入上楼费' }
				// ],
				// 'orderPriceVo.installAmount': [
				// 	{ required: false, message: '请输入安装费' }
				// ],
				'remarks': [
					{ required: false, message: '请输入需求说明' }
				],
				'zzBrokerage': [
					{ required: false, message: '请输入店长所得佣金' }
				],
				'sfarrivalPrice': [
					{ required: false, message: '请输入师傅到账金额' }
				],
				'price': [
					{ required: false, message: '请输入订单费用' }
				],
				'price1': [
					{ required: false, message: '请输入订单费用' }
				],
				'price2': [
					{ required: false, message: '请输入订单费用' }
				],
				// 'actualPrice': [
				// 	{ required: false, message: '请输入订单实付费用' }
				// ],
				'actualPrice1': [
					{ required: false, message: '请输入订单实付费用' }
				],
				'actualPrice2': [
					{ required: false, message: '请输入订单实付费用' }
				],
				'serviceGoods': [
					{ type: 'array', required: false, message: '请填写商品信息' }
				],
				'servicePics': [
					{ type: 'array', required: false, message: '请上传服务图片' }
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
				// this.formData.price = this.formData.actualPrice = this.formData.orderPriceVo.sumPrice
			},
			deep: true,
			immediate: true
		},
		'orderMode': {
			deep: true,
			// immediate: true,
			handler(val) {
				// console.log(this.categoryList, val)
				if (val === 1) {
					this.formRules.senderName = [
						{ required: true, message: '请输入发货人名称' }
					]
					this.formRules.senderMobile = [
						{ required: true, message: '请输入发货人联系电话' }
					]
					this.formRules.senderAddress = [
						{ required: true, message: '请输入发货人地址' }
					]
					this.formRules.senderAddressDetail = [
						{ required: true, message: '请输入发货人详细地址' }
					]
					this.formRules.dictName = [
						{ required: false, message: '请输入服务类型' }
					]
					this.formRules.installDate1 = [
						{ required: true, message: '选择上门日期' }
					]
					this.formRules.installDate2A = [
						{ required: false, message: '选择上门日期' }
					]
					this.formRules.installDate2B = [
						{ required: false, message: '选择上门时间段' }
					]
					this.formRules.pricingType1 = [
						{ required: true, message: '请选择定价类型' }
					]
					this.formRules.pricingType2 = [
						{ required: false, message: '请选择定价类型' }
					]
					this.formRules.orderType1 = [
						{ required: true, message: '请选择订单类型' }
					]
					this.formRules.orderType2 = [
						{ required: false, message: '请选择订单类型' }
					]
					this.formRules.deliveryType1 = [
						{ required: true, message: '请选择派送类型' }
					]
					this.formRules.deliveryType2 = [
						{ required: false, message: '请选择派送类型' }
					]
					this.formRules.zzBrokerage = [
						{ required: false, message: '请输入店长所得佣金' }
					]
					this.formRules.sfarrivalPrice = [
						{ required: false, message: '请输入师傅到账金额' }
					]
					this.formRules.serviceGoods = [
						{ type: 'array', required: true, message: '请填写商品信息' }
					]
					this.formRules.servicePics = [
						{ type: 'array', required: false, message: '请上传服务图片' }
					]
				} else if (val === 2) {
					this.formRules.senderName = [
						{ required: false, message: '请输入发货人名称' }
					]
					this.formRules.senderMobile = [
						{ required: false, message: '请输入发货人联系电话' }
					]
					this.formRules.senderAddress = [
						{ required: false, message: '请输入发货人地址' }
					]
					this.formRules.senderAddressDetail = [
						{ required: false, message: '请输入发货人详细地址' }
					]
					this.formRules.dictName = [
						{ required: true, message: '请输入服务类型' }
					]
					this.formRules.installDate1 = [
						{ required: false, message: '选择上门日期' }
					]
					this.formRules.installDate2A = [
						{ required: true, message: '选择上门日期' }
					]
					this.formRules.installDate2B = [
						{ required: true, message: '选择上门时间段' }
					]
					this.formRules.pricingType1 = [
						{ required: false, message: '请选择定价类型' }
					]
					this.formRules.pricingType2 = [
						{ required: true, message: '请选择定价类型' }
					]
					this.formRules.orderType1 = [
						{ required: false, message: '请选择订单类型' }
					]
					this.formRules.orderType2 = [
						{ required: true, message: '请选择订单类型' }
					]
					this.formRules.deliveryType1 = [
						{ required: false, message: '请选择派送类型' }
					]
					this.formRules.deliveryType2 = [
						{ required: true, message: '请选择派送类型' }
					]
					this.formRules.zzBrokerage = [
						{ required: true, message: '请输入店长所得佣金' }
					]
					this.formRules.sfarrivalPrice = [
						{ required: true, message: '请输入师傅到账金额' }
					]
					this.formRules.serviceGoods = [
						{ type: 'array', required: false, message: '请填写商品信息' }
					]
					this.formRules.servicePics = [
						{ type: 'array', required: true, message: '请上传服务图片' }
					]
				}
				this.$refs.formData && this.$refs.formData.clearValidate()
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
		handleOpen(params = {}, type) {
			this.orderMode = type || ''
			this.modalOptions.title = params.orderNo ? '编辑订单' : '创建订单'
			this.visible = true
			this.getDictList()
			if (params.orderNo) {
				this.getInfo(params.orderNo)
			} else {
				this.$refs.formData && this.$refs.formData.resetFields()
			}
		},
		async getDictList(orderNo) {
			// const res = await getDictName()
			const res = { data: [
				{
					'id': 1,
					'serverNameOne': '等接口',
					'children': [
					]
				}
			] }
			XeUtils.eachTree(res.data, (item) => {
				item.serverName = item.serverNameOne || item.serverNameTwo || item.serverNameThree
				if (Array.isArray(item.children) && item.children.length === 0) {
					item.children = undefined
				}
			})
			this.dictList = res.data || []
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
					orderPriceVo: res.data.orderPriceVo || {},
					servicePics: res.data.orderGoodsList && res.data.orderGoodsList.map((item) => item.goodsUrl) || []
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
			if (!this.orderMode) return this.$elMessage('请先选择订单种类！', 'warning')
			// console.log(this.formData.installDate2A + ' ' + this.formData.installDate2B + (Number(this.formData.installDate2B.substring(0, 2)) + 2 + ':00').padStart(5, '0'))
			await this.$validatorForm('formData')
			const loading = this.$elLoading()
			try {
				const { region_arr, serviceGoods, servicePics, actualPrice1, actualPrice2, deliveryType1, deliveryType2, installDate1, installDate2A, installDate2B, orderType1, orderType2, price1, price2, pricingType1, pricingType2, ...opts } = this.formData
				let params
				if (this.orderMode === 1) {
					if (serviceGoods.some((item) => !item.categoryName || !item.goodsHostType || !item.goodsType || !item.goodsUrl)) {
						return this.$elMessage('请填写完整的商品信息！', 'warning')
					}
					params = {
						...opts,
						// regionCode: region_arr[region_arr.length - 1],
						actualPrice: actualPrice1,
						deliveryType: deliveryType1,
						installDate: installDate1,
						orderType: orderType1,
						price: price1,
						pricingType: pricingType1,
						orderGoodsList: serviceGoods
					}
				} else if (this.orderMode === 2) {
					params = {
						...opts,
						// regionCode: region_arr[region_arr.length - 1],
						actualPrice: actualPrice2,
						deliveryType: deliveryType2,
						installDate: installDate2A + ' ' + installDate2B + '-' + (Number(installDate2B.substring(0, 2)) + 2 + ':00').padStart(5, '0'),
						orderType: orderType2,
						price: price2,
						pricingType: pricingType2,
						orderGoodsList: servicePics.map((pic) => (typeof pic === 'string' ? { goodsType: '团蜂', goodsUrl: pic } : { goodsType: '团蜂', goodsUrl: pic.resData }))
					}
				}
				this.formData.orderNo ? await updateOrder(params) : await createOrder(params)
				loading.close()
				this.$elMessage(`${this.formData.orderNo ? '编辑' : '添加'}成功!`)
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
				// .el-date-editor {
				// 	width: 100% !important;
				// }

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
				.el-descriptions {
					.el-descriptions__header {
						margin-top: 10px;
						margin-bottom: 2px;
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
