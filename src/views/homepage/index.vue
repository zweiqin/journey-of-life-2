<template>
	<div class="dashboard-editor-container">
		<el-row :gutter="12" style="margin-bottom:15px;">
			<el-col :span="18">
				<el-card class="box-card" shadow="never" style="padding: 8px;">
					<div slot="header" class="clearfix">
						<div
							style="clip-path: polygon(0px 0px, 60% 0, 100% 50%, 60% 100%, 0px 100%);width: 16px;height: 16px;display: inline-block;background: linear-gradient(270deg, #2E70AF 0%, #071A2C 100%)"
						>
						</div>
						<span>统计信息</span>
					</div>
					<div>
						<el-row :gutter="20" class="panel-group">
							<el-col
								v-for="(item, index) in statisticalInformation" v-if="index < 3" :key="index" :span="8"
								class="card-panel-col"
							>
								<div class="card-panel card-panel-primary">
									<div class="card-panel-icon-wrapper">
										<svg-icon :icon-class="item.icon" class-name="card-panel-icon" />
									</div>
									<div class="card-panel-description">
										<div class="card-panel-text">{{ item.name }}</div>
										<div class="card-panel-count">{{ item.count }}</div>
									</div>
								</div>
							</el-col>
						</el-row>
						<el-row :gutter="20" class="panel-group">
							<el-col
								v-for="(item, index) in statisticalInformation" v-if="index >= 3 && index < 6" :key="index"
								:span="8" class="card-panel-col"
							>
								<div class="card-panel card-panel-primary">
									<div class="card-panel-icon-wrapper">
										<svg-icon :icon-class="item.icon" class-name="card-panel-icon" />
									</div>
									<div class="card-panel-description">
										<div class="card-panel-text">{{ item.name }}</div>
										<div class="card-panel-count">{{ item.count }}</div>
									</div>
								</div>
							</el-col>
						</el-row>
						<el-row :gutter="20" class="panel-group">
							<el-col
								v-for="(item, index) in statisticalInformation" v-if="index >= 6 && index < 9" :key="index"
								:span="8" class=""
							>
								<div v-if="index == 6 || index == 7" class="card-panel card-panel-primary">
									<div class="card-panel-icon-wrapper">
										<svg-icon :icon-class="item.icon" class-name="card-panel-icon" />
									</div>
									<div class="card-panel-description">
										<div class="card-panel-text">{{ item.name }}</div>
										<div class="card-panel-count">{{ item.count }}</div>
									</div>
								</div>
								<div v-else class="card-panel card-panel-danger">
									<div class="card-panel-icon-wrapper">
										<svg-icon :icon-class="item.icon" class-name="card-panel-icon" />
									</div>
									<div class="card-panel-description">
										<div class="card-panel-text">{{ item.name }}</div>
										<div class="card-panel-count">{{ item.count }}</div>
									</div>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6" style="height: 100%;">
				<NoticePanel :notice-list="noticeList"></NoticePanel>
			</el-col>
		</el-row>

		<!-- <el-row style="flex: 3;overflow-y: auto;">
			<el-col :span="24" class="" style="">
			<el-card style="padding: 8px;">
			<div slot="header">
			<span>站长服务区域</span>
			</div>
			<div class="el-table el-table--enable-row-hover el-table--medium" style="">
			<div style="">
			<table cellspacing="0" style="width: 100%;">
			<thead>
			<tr>
			<th class="is-leaf">
			<div class="cell">省</div>
			</th>
			<th class="is-leaf">
			<div class="cell">市</div>
			</th>
			<th class="is-leaf">
			<div class="cell">区</div>
			</th>
			<th class="is-leaf">
			<div class="cell">师傅数量</div>
			</th>
			<th class="is-leaf">
			<div class="cell">订单数量</div>
			</th>
			</tr>
			</thead>
			<tbody v-if="information.serverCityList.length">
			<tr v-for="(item, index) in information.serverCityList" :key="index">
			<td>
			<div class="cell">{{ item.province || '--' }}</div>
			</td>
			<td>
			<div class="cell">{{ item.city || '--' }}</div>
			</td>
			<td>
			<div class="cell">{{ item.area || '--' }}</div>
			</td>
			<td>
			<div class="cell">{{ item.workerCount || '--' }}</div>
			</td>
			<td>
			<div class="cell">{{ item.orderSum || '--' }}</div>
			</td>
			</tr>
			</tbody>
			</table>
			</div>
			</div>
			</el-card>
			</el-col>
			</el-row> -->

		<!-- <el-row style="flex: 3;overflow-y: auto;"> -->
		<el-row style="flex: 1;overflow: hidden;">
			<el-col :span="24" style="height: 100%;">
				<el-card class="box-map-card" style="height: 100%;">
					<div slot="header" class="clearfix">
						<div
							style="clip-path: polygon(0px 0px, 60% 0, 100% 50%, 60% 100%, 0px 100%);width: 16px;height: 16px;display: inline-block;background: linear-gradient(270deg, #2E70AF 0%, #071A2C 100%)"
						>
						</div>
						<span style="font-size:17px;line-height:40px">站长服务区域</span>
						<div class="card-panel-map" style="float:right;margin-top: 18px;">
							<div style="display: flex;cursor: pointer;" @click="changeMapPanel">
								<div style="width: 16px;height: 16px;">
									<svg-icon :icon-class="showType === 'map' ? 'h-list' : 'h-map'" class-name="card-panel-icon" />
								</div>
								&nbsp;{{ showType === 'map' ? '列表模式' : '地图模式' }}
							</div>
						</div>
					</div>
					<div style="height: 100%;">
						<div v-if="showType === 'map'" style="height: 100%;">
							<ChinaMap ref="ChinaMapRef" :server-city-all="serverCityAll" @change="handleMapChange" />
						</div>
						<div v-else class="card-panel-content" style="height: 100%;">
							<div ref="refCollapseDivContainer" style="display: flex;justify-content: space-between;height: 100%;overflow: auto;">
								<div style="width: 48%;height: 100%;">
									<el-collapse v-model="listActiveName" accordion>
										<el-collapse-item
											v-for="(item, index) in serverCityAll" v-if="index <= (serverCityAll.length / 2)"
											:key="index" :title="`${item.label}（${item.children.reduce((total, value, index, arr) => total + value.children.length, 0)}）`" :name="index"
										>
											<div style="display: flex;flex-direction: column;">
												<div>
													<table cellspacing="0" style="display: block;width: 100%;">
														<thead style="display: table;width: 100%;">
															<tr style="width: 100%;">
																<th class="is-leaf" style="width: 35%;">
																	<div class="cell">市区</div>
																</th>
																<th class="is-leaf" style="width: 35%;">
																	<div class="cell">城区</div>
																</th>
																<th class="is-leaf" style="width: 15%;">
																	<div class="cell" style="text-align: center;">师傅数量</div>
																</th>
																<th class="is-leaf" style="width: 15%;">
																	<div class="cell" style="text-align: center;">订单数量</div>
																</th>
															</tr>
														</thead>
														<div :ref="`refTBodyContainer${index}`" style="width: 100%;overflow-y: auto;">
															<tbody v-for="(section, num) in item.children" v-if="section.children.length" :key="num" style="display: table;width: 100%;">
																<tr v-for="(element, count) in section.children" :key="count" style="width: 100%;">
																	<td style="width: 35%;">
																		<div class="cell">
																			<span>
																				{{ (section.label.includes('市辖区') || section.label.includes('省直辖') || section.label.includes('自治区直辖') ||
																					section.label === '县' ? item.label : section.label) || '--' }}
																			</span>
																		</div>
																	</td>
																	<td style="width: 35%;">
																		<div class="cell"><span>{{ element.label || '--' }}</span></div>
																	</td>
																	<td style="width: 15%;">
																		<div class="cell" style="text-align: center;">{{ element.workerCount || '--' }}</div>
																	</td>
																	<td style="width: 15%;">
																		<div class="cell" style="text-align: center;">{{ element.orderSum || '--' }}</div>
																	</td>
																</tr>
															</tbody>
														</div>
													</table>
												</div>
											</div>
										</el-collapse-item>
									</el-collapse>
								</div>
								<div style="width: 48%;">
									<el-collapse v-model="listActiveName" accordion>
										<el-collapse-item
											v-for="(item, index) in serverCityAll" v-if="index > (serverCityAll.length / 2)"
											:key="index" :title="`${item.label}（${item.children.reduce((total, value, index, arr) => total + value.children.length, 0)}）`" :name="index"
										>
											<div style="display: flex;flex-direction: column;">
												<div>
													<table cellspacing="0" style="display: block;width: 100%;">
														<thead style="display: table;width: 100%;">
															<tr style="width: 100%;">
																<th class="is-leaf" style="width: 35%;">
																	<div class="cell">市区</div>
																</th>
																<th class="is-leaf" style="width: 35%;">
																	<div class="cell">城区</div>
																</th>
																<th class="is-leaf" style="width: 15%;">
																	<div class="cell" style="text-align: center;">师傅数量</div>
																</th>
																<th class="is-leaf" style="width: 15%;">
																	<div class="cell" style="text-align: center;">订单数量</div>
																</th>
															</tr>
														</thead>
														<div :ref="`refTBodyContainer${index}`" style="width: 100%;overflow-y: auto;">
															<tbody v-for="(section, num) in item.children" v-if="section.children.length" :key="num" style="display: table;width: 100%;">
																<tr v-for="(element, count) in section.children" :key="count" style="width: 100%;">
																	<td style="width: 35%;">
																		<div class="cell">
																			<span>
																				{{ (section.label.includes('市辖区') || section.label.includes('省直辖') || section.label.includes('自治区直辖') ||
																					section.label === '县' ? item.label : section.label) || '--' }}
																			</span>
																		</div>
																	</td>
																	<td style="width: 35%;">
																		<div class="cell"><span>{{ element.label || '--' }}</span></div>
																	</td>
																	<td style="width: 15%;">
																		<div class="cell" style="text-align: center;">{{ element.workerCount || '--' }}</div>
																	</td>
																	<td style="width: 15%;">
																		<div class="cell" style="text-align: center;">{{ element.orderSum || '--' }}</div>
																	</td>
																</tr>
															</tbody>
														</div>
													</table>
												</div>
											</div>
										</el-collapse-item>
									</el-collapse>
								</div>
							</div>
						</div>
					</div>

				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import NoticePanel from './components/NoticePanel'
import ChinaMap from './components/ChinaMap'
import { zhanzhangStatistics } from '@/api/homepage/homepage'
import pcaCode from '@/../static/echartsMaps/dtsj/ld/ssq/pca-code-change.json'

export default {
	name: 'Homepage',
	components: {
		ChinaMap,
		NoticePanel
	},
	data() {
		return {
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
			statisticalInformation: [],
			noticeList: [],
			showType: 'list',
			listActiveName: 0
		}
	},
	watch: {
		listActiveName(newV, oldV) {
			if (newV === '') return
			// console.dir(this.$refs[`refTBodyContainer${newV}`][0].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement)
			this.serverCityAll.length && this.serverCityAll.length > 1 ? this.$refs[`refTBodyContainer${newV}`][0].style.height = `${this.$refs.refCollapseDivContainer.clientHeight - 120}px` : ''
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		async getInfo() {
			const res = await zhanzhangStatistics({})
			this.setStatic(res)
			// const res = { data: {} }
			// this.provinceAll = this.information.serverCityList.filter((item, index) => this.information.serverCityList.findIndex((element) => element.province === item.province) === index).map((item) => item.province) // 一维数组，所有省级
			// this.serverCityAll = this.provinceAll.map((item) => this.information.serverCityList.filter((element) => element.province === item)) // 二维数组：[ [省1[区一],[区二]]，[省2[区三],[区四]] ]
			this.serverCityAll = this.arrConversion(this.information.serverCityList, { province: '', city: '', area: '' }, pcaCode)
			console.log(this.serverCityAll)
			// console.log(this.information)
		},
		changeMapPanel() {
			this.showType === 'map' ? this.showType = 'list' && this.handleMapChange('') : this.showType = 'map'
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
				icon: 'h-sumPrice',
				name: '总余额',
				count: res.data.sumPrice || 0
			}, {
				icon: 'h-expend',
				name: '支出',
				count: res.data.expend || 0
			}, {
				icon: 'h-profit',
				name: '佣金',
				count: res.data.profit || 0
			}, {
				icon: 'h-stayOrderNum',
				name: '待接单',
				count: res.data.stayOrderNum || 0
			}, {
				icon: 'h-waitDistribution',
				name: '待分配',
				count: res.data.waitDistribution || 0
			}, {
				icon: 'h-stayOfferNum',
				name: '待评价',
				count: res.data.stayOfferNum || 0
			}, {
				icon: 'h-fullOrder',
				name: '全部订单',
				count: res.data.fullOrder || 0
			}, {
				icon: 'h-masterNum',
				name: '师傅数量',
				count: res.data.masterNum || 0
			}, {
				icon: 'h-exceptionNum',
				name: '异常订单',
				count: res.data.exceptionNum || 0
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
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 18px;
	background-color: rgb(240, 242, 245);
	position: relative;

	.github-corner {
		position: absolute;
		top: 0px;
		border: 0;
		right: 0;
	}

	.chart-wrapper {
		background: #fff;
	}

	// .card-panel-content{
	// 		.el-collapse{
	// 			display: flex;
	// 		}
	// }
	/deep/ .box-map-card .el-card__body {
		height: calc(100% - 62px);
		overflow-y: auto;

		.el-collapse {
			border-top: 0;
		}

		.el-collapse-item__header {
			border-bottom: 0;
			.el-collapse-item__arrow{
				margin: 0 58px 0 auto;
			}
		}

		.el-collapse-item__wrap {
			border-bottom: 0;
			.el-collapse-item__content{
				padding-bottom: 5px;
			}
		}
	}
}

.panel-group {
	.card-panel-col {
		margin-bottom: 12px;
	}

	.card-panel {
		display: flex;
		height: 90px;
		// cursor: pointer;
		font-size: 12px;
		position: relative;
		color: #666;
		// background: #fff;
		// box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
		// border-color: rgba(0, 0, 0, 0.05);

		overflow: hidden;
		background-size: cover;

		.card-panel-icon-wrapper {
			width: 48px;
			height: 48px;
			margin-top: 24px;
			margin-left: 16px;

			.card-panel-icon {
				width: 100%;
				height: 100%;
			}
		}

		.card-panel-description {
			.card-panel-text {
				width: 56px;
				height: 22px;
				margin-top: 22px;
				margin-left: 12px;
				font-family: Source Han Sans CN;
				font-size: 14px;
				font-weight: normal;
				line-height: 22px;
				letter-spacing: 0em;
				color: #666666;
			}

			.card-panel-count {
				width: 106px;
				height: 36px;
				margin-top: 2px;
				margin-left: 8px;
				font-family: Source Han Sans CN;
				font-size: 24px;
				font-weight: bold;
				line-height: 36px;
				letter-spacing: 0em;
				color: #333333;
			}
		}
	}

	.card-panel-primary {
		background-image: url('~@/assets/image/count-bg.png');
	}

	.card-panel-danger {
		background-image: url('~@/assets/image/abnormal-order-bg.png');
	}

	.card-panel-map {
		font-family: Source Han Sans CN;
		font-size: 14px;
		font-weight: normal;
		line-height: 22px;
		color: #666666;
	}

	.clearfix span {
		font-family: Source Han Sans CN;
		font-size: 16px;
		font-weight: 500;
		// line-height: 24px;
		color: #333333;
	}
}

.cell {
	text-align: left;
	white-space: nowrap;
}
</style>
