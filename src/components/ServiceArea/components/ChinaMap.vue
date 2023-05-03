<template>
	<div style="display: flex;height: 100%;">
		<div ref="myEchart" :style="{ height, width }"></div>
		<div class="card-panel-content" style="width: 50%;height: 100%;overflow: auto;">
			<div ref="refCollapseDivContainer" style="width: 100%;height: 100%;overflow: auto;">
				<el-collapse v-model="listActiveName" accordion>
					<el-collapse-item
						v-for="(item, index) in serverCityAll"
						:key="index" :name="index"
					>
						<template #title>
							<div @click="setMapData(item) && getGeoJson(item.value + '0000', 1)">{{ `${item.label}（${item.children.reduce((total, value, index, arr) => total + value.children.length, 0)}）` }}</div>
						</template>
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
														<span style="cursor: pointer;" @click="section.label.includes('市辖区') || section.label.includes('省直辖') || section.label.includes('自治区直辖') || section.label === '县' ? setMapData(item) && getGeoJson(item.value + '0000', 1) : setMapData(section) && getGeoJson(section.value + '00', 2)">
															{{ (section.label.includes('市辖区') || section.label.includes('省直辖') || section.label.includes('自治区直辖') ||
																section.label === '县' ? item.label : section.label) || '--' }}
														</span>
													</div>
												</td>
												<td style="width: 35%;">
													<div class="cell"><span style="cursor: pointer;" @click="setMapData(element) && getGeoJson(element.value, 3, element)">{{ element.label || '--' }}</span></div>
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
</template>

<script>
// import { getWorldMapData } from '@/api/common/home'
import * as echarts from 'echarts' // 引入组件
// import '@/../static/echartsMaps/js/province/guangdong.js' // 引入组件
// import request2 from '@/utils/request2'
import axios from 'axios'
import { find, map } from 'xe-utils'

export default {
	name: 'ChinaMap',
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
			listActiveName: '',
			chart: null,
			width: '50%',
			height: '100%',
			mapData: [
				// {
				// 	name: '中国',
				// 	value: Math.random() * 100,
				// 	cityCode: '100000'
				// }
			],
			level: 0
		}
	},
	watch: {
		serverCityAll: {
			handler(newV, oldV) {
				if (newV.length) {
					this.setMapData(newV[0].children[0].children[0])
					this.getGeoJson(newV[0].children[0].children[0].value, 3)
				} else {
					this.setMapData({ label: '中华人民共和国', value: '100000', level: 0, children: newV })
					this.getGeoJson('100000', 0)
				}
			},
			deep: false,
			immediate: true
		},
		listActiveName(newV, oldV) {
			if (newV === '') return
			// console.dir(this.$refs[`refTBodyContainer${newV}`][0].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement)
			this.serverCityAll.length && this.serverCityAll.length > 1 ? this.$refs[`refTBodyContainer${newV}`][0].style.height = `${this.$refs.refCollapseDivContainer.clientHeight - 120}px` : ''
		}
	},
	created() {},
	mounted() {
		// getWorldMapData().then((response) => {
		// 	this.data = response.data.dataArr
		// 	this.nameMap = response.data.namemap
		// this.initChart()
		// })
		this.chart = echarts.init(this.$refs.myEchart)
		this.chart.on('click', this.echartsMapClick)
		window.onresize = echarts.init(this.$refs.myEchart).resize
		this.listActiveName = 0
	},
	methods: {
		initChart(mapName, data) {
			// const data = await request2({
			// 	url: '/static/echartsMaps/100000.geoJson',
			// 	method: 'GET'
			// })
			if (data) {
				this.chart.clear()
				echarts.registerMap(mapName, { geoJSON: data })
				// 把配置和数据放这里
				this.chart.setOption({
					backgroundColor: '#fff',
					// title: {
					// 	// 地图显示标题
					// 	text: '地图',
					// 	sublink: '',
					// 	top: '0px',
					// 	left: 'center',
					// 	textStyle: { color: '#000' }
					// },
					tooltip: {
						// 提示框组件
						trigger: 'item',
						// formatter: '{b}<br/>师傅数量：{c}<br/>订单数量：{c}',
						formatter: (params, ticket, callback) => `${params.data.name}<br/>师傅数量：${params.data.workerCount}<br/>订单数量：${params.data.orderSum}`
					},
					series: [
						{
							type: 'map',
							map: mapName,
							roam: true,
							nameMap: {},
							scaleLimit: {
								min: 0.5,
								max: 3
							},
							data: this.mapData, // 绑定数据
							name: '数据名称',
							selectedMode: 'single',
							// left: 'left',
							// layoutCenter: ['50%', '50%'],
							showLegendSymbol: false
							// label: {
							// 	show: true,
							// 	color: 'rgb(249, 249, 249)'
							// },
							// itemStyle: {
							// 	color: '#ccc',
							// 	areaColor: '#fff',
							// 	borderColor: '#fff',
							// 	borderWidth: 0.5
							// }
						}
					]
				})
			}
		},
		getGeoJson(code, level, element) {
			// console.log(code, level)
			let combination
			if (level === 0) {
				combination = code + '_full'
			} else if (level === 1) {
				combination = code + '_full'
			} else if (level === 2) {
				if (code === '441900' || code === '442000' || code === '460400') { // 东莞、中山、儋州
					combination = code
				} else {
					combination = code + '_full'
				}
			} else if (level === 3) {
				if (element && (element.label.endsWith('开发区') || element.label.endsWith('化工园区') || element.label.endsWith('管理区') || element.label.endsWith('新区') || element.label.endsWith('示范区') || element.label.endsWith('产业园区') || element.label.endsWith('名胜区') ||
					element.label.endsWith('管委会') || element.label.endsWith('食品区') || element.label.endsWith('松岭区') || element.label.endsWith('新林区') || element.label.endsWith('呼中区') || element.label.endsWith('综合实验区') ||
					element.label.endsWith('产业聚集区') || element.label.endsWith('保税区') || element.label.endsWith('工业园区') || element.label.endsWith('创意园区') || element.label.endsWith('行政委员会'))) {
					return this.$message.warning(`不支持查询该区域`)
				} else if (String(code).startsWith('4419') || String(code).startsWith('4420') || String(code).startsWith('4603') || String(code).startsWith('4604')) { // 东莞、中山、三沙、儋州。
					return this.$message.warning(`不支持查询该市`)
				}
				combination = code
			}
			axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/${combination}.json`, {
				// headers: {
				// 	referer: ''
				// }
			})
				.then((response) => {
					// console.log(response)
					this.level = level
					this.initChart(code, response.data)
				})
				.catch((error) => {
					console.log(error)
				})
		},
		setMapData(item) {
			// console.log(item)
			this.mapData = []
			if (item.level === 0) {
				if (item.children && item.children.length) {
					item.children.forEach((i) => {
						if (i.children && i.children.length) {
							this.mapData.push({
								name: i.label,
								label: i.label,
								value: i.value,
								level: i.level,
								pv: i.pv,
								children: i.children,
								workerCount: i.children.reduce((total, value, index, arr) => total + Number(value.workerCount) || 0, 0),
								orderSum: i.children.reduce((total, value, index, arr) => total + Number(value.orderSum) || 0, 0)
							})
						}
					})
				} else {
				}
				this.$emit('change', '')
			} else if (item.level === 1) {
				if (item.children && item.children.length) {
					item.children.forEach((section) => {
						if (section.label.includes('市辖区') || section.label.includes('省直辖') || section.label.includes('自治区直辖') || section.label === '县') {
							if (section.children && section.children.length) {
								section.children.forEach((element) => {
									this.mapData.push({
										name: element.label,
										label: element.label,
										value: element.value,
										level: element.level,
										pv: element.pv,
										workerCount: element.workerCount,
										orderSum: element.orderSum
									})
								})
							}
						} else if (section.children && section.children.length) {
							this.mapData.push({
								name: section.label,
								label: section.label,
								value: section.value,
								level: section.level,
								pv: section.pv,
								children: section.children,
								workerCount: section.children.reduce((total, value, index, arr) => total + Number(value.workerCount) || 0, 0),
								orderSum: section.children.reduce((total, value, index, arr) => total + Number(value.orderSum) || 0, 0)
							})
						}
					})
				} else {
				}
				this.$emit('change', item.label)
			} else if (item.level === 2) {
				if (item.value === '4419' || item.value === '4420' || item.value === '4604') { // 东莞、中山、儋州
					this.mapData = [ {
						name: item.label,
						label: item.label,
						value: item.value,
						level: item.level,
						pv: item.pv,
						children: item.children,
						workerCount: item.children.reduce((total, value, index, arr) => total + Number(value.workerCount) || 0, 0),
						orderSum: item.children.reduce((total, value, index, arr) => total + Number(value.orderSum) || 0, 0)
					} ]
				} else if (item.value === '4603') { // 三沙
					item.children.forEach((element) => {
						this.mapData.push({
							name: element.label.replace('群岛', '区'),
							label: element.label.replace('群岛', '区'),
							value: element.value,
							level: element.level,
							pv: element.pv,
							workerCount: element.workerCount,
							orderSum: element.orderSum
						})
					})
				} else if (item.children && item.children.length) {
					item.children.forEach((element) => {
						this.mapData.push({
							name: element.label,
							label: element.label,
							value: element.value,
							level: element.level,
							pv: element.pv,
							workerCount: element.workerCount,
							orderSum: element.orderSum
						})
					})
				} else {
				}
				this.$emit('change', this.serverCityAll.find((i) => i.value === item.pv).label + item.label)
			} else if (item.level === 3) {
				this.mapData = [ {
					name: item.label,
					label: item.label,
					value: item.value,
					level: item.level,
					pv: item.pv,
					workerCount: item.workerCount,
					orderSum: item.orderSum
				} ]
				let LevelTwo
				const LevelOne = this.serverCityAll.find((i) => {
					LevelTwo = i.children.find((section) => section.value === item.pv)
					return LevelTwo ? i.value === LevelTwo.pv : false
				})
				if (LevelOne)	this.$emit('change', LevelOne.label + LevelTwo.label + item.label)
			}
			return true
		},
		echartsMapClick(params) {
			console.log(params, this.level)
			// 地图点击事件
			if (this.level === 0) { // 中国
				// this.setMapData({ label: '中华人民共和国', value: '100000', level: 0, children: this.serverCityAll })
				this.setMapData(params.data)
				this.getGeoJson(params.data.value, this.level + 1)
				const LevelOneIndex = this.serverCityAll.findIndex((item) => item.value === params.data.value)
				if (LevelOneIndex !== -1) {
					this.listActiveName = LevelOneIndex
					this.$nextTick(() => {
						setTimeout(() => {
							this.$refs.refCollapseDivContainer.scrollTop = 48 * LevelOneIndex
						}, 600)
					})
				}
			} else if (this.level === 1) { // 省
				this.setMapData(params.data)
				if (params.data.level === 2) {
					this.getGeoJson(params.data.value + '00', this.level + 1)
					let LevelTwoIndex
					const LevelOneIndex = this.serverCityAll.findIndex((item) => {
						LevelTwoIndex = item.children.findIndex((section) => section.value === params.data.value)
						return LevelTwoIndex !== -1 ? item.value === params.data.pv : false
					})
					if (LevelOneIndex !== -1) {
						this.listActiveName = LevelOneIndex
						this.$nextTick(() => {
							setTimeout(() => {
								const tBodyContainerScroll = 25 * this.serverCityAll[LevelOneIndex].children.reduce((total, value, index, arr) => index < LevelTwoIndex ? total + value.children.length : total, 0)
								this.$refs[`refTBodyContainer${this.listActiveName}`][0].scrollTop = tBodyContainerScroll
								this.$refs.refCollapseDivContainer.scrollTop = 48 * (LevelOneIndex + 1) + 25 + (this.$refs[`refTBodyContainer${this.listActiveName}`][0].scrollTop < tBodyContainerScroll ? tBodyContainerScroll - this.$refs[`refTBodyContainer${this.listActiveName}`][0].scrollTop : 0)
							}, 600)
						})
					}
				} else if (params.data.level === 3) {
					this.getGeoJson(params.data.value, this.level + 2)
					let LevelTwoIndex
					const LevelOneIndex = this.serverCityAll.findIndex((item) => {
						LevelTwoIndex = item.children.findIndex((section) => section.value === params.data.pv)
						return LevelTwoIndex !== -1 ? item.value === item.children[LevelTwoIndex].pv : false
					})
					if (LevelOneIndex !== -1) {
						this.listActiveName = LevelOneIndex
						this.$nextTick(() => {
							setTimeout(() => {
								const LevelThreeIndex = this.serverCityAll[LevelOneIndex].children[LevelTwoIndex].children.findIndex((element) => element.value === params.data.value)
								const tBodyContainerScroll = 25 * this.serverCityAll[LevelOneIndex].children.reduce((total, value, index, arr) => index < LevelTwoIndex ? total + value.children.length : total, 0) + 25 * LevelThreeIndex
								this.$refs[`refTBodyContainer${this.listActiveName}`][0].scrollTop = tBodyContainerScroll
								this.$refs.refCollapseDivContainer.scrollTop = 48 * (LevelOneIndex + 1) + 25 + (this.$refs[`refTBodyContainer${this.listActiveName}`][0].scrollTop < tBodyContainerScroll ? tBodyContainerScroll - this.$refs[`refTBodyContainer${this.listActiveName}`][0].scrollTop : 0)
							}, 600)
						})
					}
				}
			} else if (this.level === 2) { // 市
				this.setMapData(params.data)
				if (params.data.value === '4419' || params.data.value === '4420' || params.data.value === '4603') { // 东莞、中山、三沙
					this.getGeoJson(params.data.value + '00', this.level) // 市下面点击的还是该市
					let LevelTwoIndex
					const LevelOneIndex = this.serverCityAll.findIndex((item) => {
						LevelTwoIndex = item.children.findIndex((section) => section.value === params.data.value)
						return LevelTwoIndex !== -1 ? item.value === params.data.pv : false
					})
					if (LevelOneIndex !== -1) {
						this.listActiveName = LevelOneIndex
						this.$nextTick(() => {
							setTimeout(() => {
								const tBodyContainerScroll = 25 * this.serverCityAll[LevelOneIndex].children.reduce((total, value, index, arr) => index < LevelTwoIndex ? total + value.children.length : total, 0)
								this.$refs[`refTBodyContainer${this.listActiveName}`][0].scrollTop = tBodyContainerScroll
								this.$refs.refCollapseDivContainer.scrollTop = 48 * (LevelOneIndex + 1) + 25 + (this.$refs[`refTBodyContainer${this.listActiveName}`][0].scrollTop < tBodyContainerScroll ? tBodyContainerScroll - this.$refs[`refTBodyContainer${this.listActiveName}`][0].scrollTop : 0)
							}, 600)
						})
					}
				} else {
					this.getGeoJson(params.data.value, this.level + 1) // 市下面点击的是区
					let LevelTwoIndex
					const LevelOneIndex = this.serverCityAll.findIndex((item) => {
						LevelTwoIndex = item.children.findIndex((section) => section.value === params.data.pv)
						return LevelTwoIndex !== -1 ? item.value === item.children[LevelTwoIndex].pv : false
					})
					if (LevelOneIndex !== -1) {
						this.listActiveName = LevelOneIndex
						this.$nextTick(() => {
							setTimeout(() => {
								const LevelThreeIndex = this.serverCityAll[LevelOneIndex].children[LevelTwoIndex].children.findIndex((element) => element.value === params.data.value)
								const tBodyContainerScroll = 25 * this.serverCityAll[LevelOneIndex].children.reduce((total, value, index, arr) => index < LevelTwoIndex ? total + value.children.length : total, 0) + 25 * LevelThreeIndex
								this.$refs[`refTBodyContainer${this.listActiveName}`][0].scrollTop = tBodyContainerScroll
								this.$refs.refCollapseDivContainer.scrollTop = 48 * (LevelOneIndex + 1) + 25 + (this.$refs[`refTBodyContainer${this.listActiveName}`][0].scrollTop < tBodyContainerScroll ? tBodyContainerScroll - this.$refs[`refTBodyContainer${this.listActiveName}`][0].scrollTop : 0)
							}, 600)
						})
					}
				}
			} else if (this.level === 3) { // 区
				console.log('三级的区')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.cell {
	text-align: left;
	white-space: nowrap;
}
</style>
