<template>
	<div class="dashboard-editor-container">

		<div style="display: flex;justify-content: space-between;">
			<div style="width: 58%;">
				<div>
					<div style="display: flex;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
						<div
							style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
						>
						</div>
						<div>订单管理</div>
					</div>
					<div>
						<el-card class="" style="border-radius: 8px;border: 1px solid #E2E8F0;">
							<div id="orderData">
								<OrderData :data="statisticalInformation"></OrderData>
							</div>
						</el-card>
					</div>
				</div>
			</div>
			<div style="width: 40%">
				<div>
					<div style="display: flex;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
						<div
							style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
						>
						</div>
						<div>推流中心</div>
					</div>
					<div>
						<el-card class="" :body-style="{ 'padding': '15px 20px 10px 20px' }" style="border-radius: 8px;border: 1px solid #E2E8F0;">
							<div v-if="heightPushFlowCenter !== '0px'" :style="{ height: heightPushFlowCenter }">
								<PushFlowCenter></PushFlowCenter>
							</div>
						</el-card>
					</div>
				</div>
			</div>
		</div>

		<div style="display: flex;justify-content: space-between;margin-top: 24px;">
			<div style="width: 100%">
				<div>
					<div style="display: flex;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
						<div
							style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
						>
						</div>
						<div>财务报表</div>
					</div>
					<div>
						<el-card class="" style="border-radius: 8px;border: 1px solid #E2E8F0;">
							<div :style="{ height: '400px' }">
								<FinancialStatements></FinancialStatements>
							</div>
						</el-card>
					</div>
				</div>
			</div>
		</div>

		<div style="display: flex;justify-content: space-between;margin-top: 24px;">
			<div style="width: 100%">
				<div>
					<div style="display: flex;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
						<div
							style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
						>
						</div>
						<div>服务数据</div>
					</div>
					<div>
						<el-card class="" style="border-radius: 8px;border: 1px solid #E2E8F0;">
							<div :style="{ height: '450px' }">
								<ServiceData></ServiceData>
							</div>
						</el-card>
					</div>
				</div>
			</div>
		</div>

		<div style="display: flex;justify-content: space-between;margin-top: 24px;">
			<div style="width: 54%;">
				<div>
					<div style="display: flex;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
						<div
							style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
						>
						</div>
						<div>区域数据</div>
					</div>
					<div>
						<el-card class="" style="border-radius: 8px;border: 1px solid #E2E8F0;">
							<div :style="{ height: '460px' }">
								<RegionData></RegionData>
							</div>
						</el-card>
					</div>
				</div>
			</div>
			<div style="width: 44%">
				<div>
					<div style="display: flex;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
						<div
							style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
						>
						</div>
						<div>公告栏</div>
					</div>
					<div>
						<el-card class="" style="border-radius: 8px;border: 1px solid #E2E8F0;">
							<div :style="{ height: '460px' }">
								<NoticePanel :notice-list="noticeList"></NoticePanel>
							</div>
						</el-card>
					</div>
				</div>
			</div>
		</div>

		<!-- <ServiceArea :server-city-all="serverCityAll" @map-change="handleMapChange"></ServiceArea> -->
	</div>
</template>

<script>
import OrderData from './components/OrderData'
import PushFlowCenter from './components/PushFlowCenter'
import FinancialStatements from './components/FinancialStatements'
import ServiceData from './components/ServiceData'
import RegionData from './components/RegionData'
import NoticePanel from './components/NoticePanel'
import { zhanzhangStatistics } from '@/api/homepage/homepage'
import pcaCode from '@/../static/echartsMaps/dtsj/ld/ssq/pca-code-change.json'

export default {
	name: 'Homepage',
	components: {
		OrderData,
		PushFlowCenter,
		FinancialStatements,
		ServiceData,
		RegionData,
		NoticePanel
	},
	data() {
		return {
			heightPushFlowCenter: '0px',
			information: {
				sumPrice: '',
				expend: '',
				profit: '',
				stayOrderNum: '',
				waitDistribution: '',
				stayOfferNum: '',
				fullOrder: '',
				masterNum: '',
				exceptionNum: '',
				serverCityList: []
			},
			serverCityAll: [],
			statisticalInformation: [{
				icon: 'h-homePage8',
				name: '总金额',
				count: 0
			}, {
				icon: 'h-homePage8',
				name: '累计订单',
				count: 0
			}, {
				icon: 'h-homePage7',
				name: '今日订单',
				count: 0
			}, {
				icon: 'h-homePage2',
				name: '待报价',
				count: 0,
				to: 'ReceivingList'
			}, {
				icon: 'h-homePage1',
				name: '待接单',
				count: 0,
				to: 'ReceivingList'
			}, {
				icon: 'h-homePage3',
				name: '待分配',
				count: 0,
				to: 'ReceivingList'
			}, {
				icon: 'h-homePage4',
				name: '服务中',
				count: 0
			}, {
				icon: 'h-homePage5',
				name: '完成订单',
				count: 0
			}, {
				icon: 'h-homePage6',
				name: '异常订单',
				count: 0,
				to: 'AbnormalOrder'
			}],
			noticeList: [ '' ]
		}
	},
	watch: {},
	created() {
		this.getServiceAreaInfo()
	},
	mounted() {
		this.heightPushFlowCenter = document.getElementById('orderData').clientHeight + 10 + 'px'
	},
	methods: {
		async getServiceAreaInfo() {
			const res = await zhanzhangStatistics({})
			this.setStatic(res)
			// const res = { data: {} }
			// this.provinceAll = this.information.serverCityList.filter((item, index) => this.information.serverCityList.findIndex((element) => element.province === item.province) === index).map((item) => item.province) // 一维数组，所有省级
			// this.serverCityAll = this.provinceAll.map((item) => this.information.serverCityList.filter((element) => element.province === item)) // 二维数组：[ [省1[区一],[区二]]，[省2[区三],[区四]] ]
			this.serverCityAll = this.arrConversion(this.information.serverCityList, { province: '', city: '', area: '' }, pcaCode)
			console.log(this.serverCityAll)
			// console.log(this.information)
		},
		async handleMapChange(address) {
			const res = await zhanzhangStatistics({ address })
			this.setStatic(res)
		},
		setStatic(res) {
			this.information = Object.assign(this.$options.data().information, res.data, {
				sumPrice: res.data.sumPrice || 0,
				expend: res.data.expend || 0,
				profit: res.data.profit || 0,
				stayOrderNum: res.data.stayOrderNum || 0,
				waitDistribution: res.data.waitDistribution || 0,
				stayOfferNum: res.data.stayOfferNum || 0,
				fullOrder: res.data.fullOrder || 0,
				masterNum: res.data.masterNum || 0,
				exceptionNum: res.data.exceptionNum || 0,
				serverCityList: res.data.serverCityList || []
			})
			this.statisticalInformation = [{
				icon: 'h-homePage8',
				name: '总金额',
				count: res.data.sumPrice || 0
			}, {
				icon: 'h-homePage8',
				name: '累计订单',
				count: res.data.fullOrder || 0
			}, {
				icon: 'h-homePage7',
				name: '今日订单',
				count: res.data.todayOrderNum || 0
			}, {
				icon: 'h-homePage2',
				name: '待报价',
				count: res.data.stayOfferNum || 0,
				to: 'ReceivingList'
			}, {
				icon: 'h-homePage1',
				name: '待接单',
				count: res.data.stayOrderNum || 0,
				to: 'ReceivingList'
			}, {
				icon: 'h-homePage3',
				name: '待分配',
				count: res.data.waitDistribution || 0,
				to: 'ReceivingList'
			}, {
				icon: 'h-homePage4',
				name: '服务中',
				count: res.data.executionNum || 0
			}, {
				icon: 'h-homePage5',
				name: '完成订单',
				count: res.data.completedOrderNum || 0
			}, {
				icon: 'h-homePage6',
				name: '异常订单',
				count: res.data.exceptionNum || 0,
				to: 'AbnormalOrder'
			}]
		},
		arrConversion(arr, subobject, comparison) {
			const keys = Object.keys(subobject)
			const level1 = keys[0]// 获取一级属性名称
			const level2 = keys[1]// 获取二级属性名称
			const level3 = keys[2]// 获取三级属性名称
			const list = Array.from(new Set(arr.map((item) => item[level1]))) // 省的数组
			const subList = []
			list.forEach((res, index) => { // 省的数组，每一个省（的名称）
				const tempLevel1 = comparison.find((item) => item.name === res) // 某个省对象
				arr.forEach((ele, num) => { // 一条一条的数据的数组，每一条
					if (ele[level1] === res) { // 选出，部分（每一条，根据省，进行分组）
						const nameArr = subList.map((item) => item.label) // 数组，包含已有的省的名称（label），组成的数组
						const tempLevel2 = tempLevel1 && tempLevel1.children.find((item) => item.name === ele[level2]) // 某个市对象
						if (nameArr.indexOf(res) !== -1) { // 判断1，已经有某省（的名称的）数据
							const nameArr2 = subList[nameArr.indexOf(res)].children.map((item) => item.label) // 数组，包含某省下面，已有的市的名称（label），组成的数组
							if (nameArr2.indexOf(ele[level2]) !== -1) { // 判断2，已经有某市（的名称的）数据
								const levelTwoVal = tempLevel1 && tempLevel1.children.find((item) => item.name === ele[level2]).code
								const levelThreeVal = tempLevel2 && tempLevel2.children.find((item) => item.name === ele[level3]).code
								subList[nameArr.indexOf(res)].children[nameArr2.indexOf(ele[level2])].children.push({ // 某市（的名称的）数据，下面的children加一个子数据
									value: levelThreeVal,
									label: ele[level3],
									pv: levelTwoVal,
									level: 3,
									workerCount: ele.workerCount,
									orderSum: ele.orderSum
								})
							} else { // 判断2，还没有某市（的名称的）数据
								const levelOneVal = tempLevel1 && tempLevel1.code
								const levelTwoVal = tempLevel1 && tempLevel1.children.find((item) => item.name === ele[level2]).code
								const levelThreeVal = tempLevel2 && tempLevel2.children.find((item) => item.name === ele[level3]).code
								subList[nameArr.indexOf(res)].children.push({
									value: levelTwoVal,
									label: ele[level2],
									level: 2,
									pv: levelOneVal,
									children: [ {
										value: levelThreeVal,
										label: ele[level3],
										level: 3,
										pv: levelTwoVal,
										workerCount: ele.workerCount,
										orderSum: ele.orderSum
									} ]
								})
							}
						} else { // 判断1，还没有某省（的名称的）数据
							const levelOneVal = tempLevel1 && tempLevel1.code
							const levelTwoVal = tempLevel1 && tempLevel1.children.find((item) => item.name === ele[level2]).code
							const levelThreeVal = tempLevel2 && tempLevel2.children.find((item) => item.name === ele[level3]).code
							subList.push({
								value: levelOneVal,
								label: res,
								level: 1,
								pv: '100000',
								// id: index + 1,
								// pid: 0,
								children: [ {
									value: levelTwoVal,
									label: ele[level2],
									level: 2,
									pv: levelOneVal,
									// id: ,
									pid: index + 1,
									children: [ {
										value: levelThreeVal,
										label: ele[level3],
										level: 3,
										pv: levelTwoVal,
										// id: ,
										// pid: ,
										workerCount: ele.workerCount,
										orderSum: ele.orderSum
									} ]
								} ]
							})
						}
					}
				})
			})
			return subList
		}
	}
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
	padding: 18px;
	background-color: #f5f6f7;
}

</style>
