<template>
	<el-card class="box-map-card" style="height: 100%;">
		<div slot="header" class="clearfix">
			<div
				style="clip-path: polygon(0px 0px, 60% 0, 100% 50%, 60% 100%, 0px 100%);width: 16px;height: 16px;display: inline-block;background: linear-gradient(270deg, #3CA1FF 0%, #2E70AF 40%, #071A2C 100%);"
			>
			</div>
			<span style="font-size:17px;font-weight: bold;line-height:40px">店长服务区域</span>
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
				<div
					ref="refCollapseDivContainer"
					style="display: flex;justify-content: space-between;height: 100%;overflow: auto;"
				>
					<div style="width: 48%;height: 100%;">
						<el-collapse v-model="listActiveName" accordion>
							<el-collapse-item
								v-for="(item, index) in serverCityAll" v-if="index <= (serverCityAll.length / 2)"
								:key="index"
								:title="`${item.label}（${item.children.reduce((total, value, index, arr) => total + value.children.length, 0)}）`"
								:name="index"
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
												<tbody
													v-for="(section, num) in item.children" v-if="section.children.length" :key="num"
													style="display: table;width: 100%;"
												>
													<tr v-for="(element, count) in section.children" :key="count" style="width: 100%;">
														<td style="width: 35%;">
															<div class="cell">
																<span>
																	{{ (section.label.includes('市辖区') || section.label.includes('省直辖') ||
																		section.label.includes('自治区直辖') ||
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
								:key="index"
								:title="`${item.label}（${item.children.reduce((total, value, index, arr) => total + value.children.length, 0)}）`"
								:name="index"
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
												<tbody
													v-for="(section, num) in item.children" v-if="section.children.length" :key="num"
													style="display: table;width: 100%;"
												>
													<tr v-for="(element, count) in section.children" :key="count" style="width: 100%;">
														<td style="width: 35%;">
															<div class="cell">
																<span>
																	{{ (section.label.includes('市辖区') || section.label.includes('省直辖') ||
																		section.label.includes('自治区直辖') ||
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
</template>

<script>
import ChinaMap from './components/ChinaMap'

export default {
	name: 'ServiceArea',
	components: {
		ChinaMap
	},
	props: {
		serverCityAll: {
			type: Array,
			default() {
				return []
			}
		}
	},
	data() {
		return {
			showType: 'list',
			listActiveName: 0
		}
	},
	computed: {
	},
	watch: {
		listActiveName(newV, oldV) {
			if (newV === '') return
			// console.dir(this.$refs[`refTBodyContainer${newV}`][0].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement)
			this.serverCityAll.length && this.serverCityAll.length > 1 ? this.$refs[`refTBodyContainer${newV}`][0].style.height = `${this.$refs.refCollapseDivContainer.clientHeight - 120}px` : ''
		}
	},
	methods: {
		changeMapPanel() {
			this.showType === 'map' ? this.showType = 'list' && this.handleMapChange('') : this.showType = 'map'
		},
		handleMapChange(address) {
			this.$emit('map-change', address)
		}
	}
}
</script>

<style lang="scss" scoped>
// /deep/ .box-map-card {
/deep/ .el-card__body {
	height: calc(100% - 62px);
	overflow-y: auto;

	.el-collapse {
		border-top: 0;
	}

	.el-collapse-item__header {
		border-bottom: 0;

		.el-collapse-item__arrow {
			margin: 0 58px 0 auto;
		}
	}

	.el-collapse-item__wrap {
		border-bottom: 0;

		.el-collapse-item__content {
			padding-bottom: 5px;
		}
	}
}

// 	}

/deep/ .el-card__header {
	border-bottom: 0;
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

.cell {
	text-align: left;
	white-space: nowrap;
}
</style>
