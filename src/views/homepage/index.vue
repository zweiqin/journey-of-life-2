<template>
	<div class="dashboard-editor-container">
		<el-row :gutter="12" style="margin-bottom:15px;">
			<el-col :span="18">
				<el-card class="box-card" style="padding: 8px;">
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
							<ChinaMap ref="ChinaMapRef" :server-city-all="serverCityAll" />
						</div>
						<div v-else class="card-panel-content">
							<div style="display: flex;">
								<div style="width: 50%;">
									<el-collapse v-model="listActiveName" accordion>
										<el-collapse-item
											v-for="(item, index) in serverCityAll" v-if="index <= (serverCityAll.length / 2)"
											:key="index" :title="`${item[0].province}（${item.length}）`" :name="index"
										>
											<div style="display: flex;flex-direction: column;">
												<div>
													<table cellspacing="0" style="width: 100%;">
														<thead>
															<tr>
																<th class="is-leaf">
																	<div class="cell">市区</div>
																</th>
																<th class="is-leaf">
																	<div class="cell">城区</div>
																</th>
																<th class="is-leaf">
																	<div class="cell">师傅数量</div>
																</th>
																<th class="is-leaf">
																	<div class="cell">订单数量</div>
																</th>
															</tr>
														</thead>
														<tbody v-if="item.length">
															<tr v-for="(element, count) in item" :key="count">
																<td>
																	<div class="cell">
																		{{ (element.city.includes('市辖区') || element.city.includes('省直辖') ||
																			element.city === '县' ? element.province : element.city) || '--' }}
																	</div>
																</td>
																<td>
																	<div class="cell">{{ element.area || '--' }}</div>
																</td>
																<td>
																	<div class="cell">{{ element.workerCount || '--' }}</div>
																</td>
																<td>
																	<div class="cell">{{ element.orderSum || '--' }}</div>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</el-collapse-item>
									</el-collapse>
								</div>
								<div style="width: 50%;">
									<el-collapse v-model="listActiveName" accordion>
										<el-collapse-item
											v-for="(item, index) in serverCityAll" v-if="index > (serverCityAll.length / 2)"
											:key="index" :title="`${item[0].province}（${item.length}）`" :name="index"
										>
											<div style="display: flex;flex-direction: column;">
												<div>
													<table cellspacing="0" style="width: 100%;">
														<thead>
															<tr>
																<th class="is-leaf">
																	<div class="cell">市区</div>
																</th>
																<th class="is-leaf">
																	<div class="cell">城区</div>
																</th>
																<th class="is-leaf">
																	<div class="cell">师傅数量</div>
																</th>
																<th class="is-leaf">
																	<div class="cell">订单数量</div>
																</th>
															</tr>
														</thead>
														<tbody v-if="item.length">
															<tr v-for="(element, count) in item" :key="count">
																<td>
																	<div class="cell">
																		{{ (element.city.includes('市辖区') || element.city.includes('省直辖') ||
																			element.city === '县' ? element.province : element.city) || '--' }}
																	</div>
																</td>
																<td>
																	<div class="cell">{{ element.area || '--' }}</div>
																</td>
																<td>
																	<div class="cell">{{ element.workerCount || '--' }}</div>
																</td>
																<td>
																	<div class="cell">{{ element.orderSum || '--' }}</div>
																</td>
															</tr>
														</tbody>
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
			provinceAll: [],
			serverCityAll: [],
			statisticalInformation: [],
			noticeList: [],
			showType: 'list',
			listActiveName: 0
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		async getInfo() {
			const res = await zhanzhangStatistics({})
			// const res = { data: {} }
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
			this.provinceAll = this.information.serverCityList.filter((item, index) => this.information.serverCityList.findIndex((element) => element.province === item.province) === index).map((item) => item.province)
			this.serverCityAll = this.provinceAll.map((item) => this.information.serverCityList.filter((element) => element.province === item))
			// console.log(this.provinceAll, this.serverCityAll)
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
			// console.log(this.information)
		},
		changeMapPanel() {
			this.showType === 'map' ? this.showType = 'list' : this.showType = 'map'
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
