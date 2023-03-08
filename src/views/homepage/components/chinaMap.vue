<template>
	<div style="display: flex;height: 100%;">
		<div ref="myEchart" :style="{ height, width }"></div>
		<div class="card-panel-content" style="width: 50%;overflow: auto;">
			<div>
				<div>
					<el-collapse v-model="listActiveName" accordion>
						<el-collapse-item
							v-for="(item, index) in serverCityAll"
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
</template>

<script>
// import { getWorldMapData } from '@/api/common/home'
import * as echarts from 'echarts' // 引入组件
// import '@/../static/echartsMaps/js/province/guangdong.js' // 引入组件
import request2 from '@/utils/request2'

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
			listActiveName: 0,
			chart: null,
			width: '50%',
			height: '100%',
			data: [],
			color5: ['#f6efa6', '#bf444c', '#da8575']
		}
	},
	mounted() {
		// getWorldMapData().then((response) => {
		// 	this.data = response.data.dataArr
		// 	this.nameMap = response.data.namemap
		this.initChart()
		// })
	},
	methods: {
		async initChart() {
			const geoJson = await request2({
				url: '/static/echartsMaps/100000.geoJson',
				method: 'GET'
			})
			echarts.registerMap('china', { geoJSON: geoJson })
			this.chart = echarts.init(this.$refs.myEchart)
			window.onresize = echarts.init(this.$refs.myEchart).resize
			// 把配置和数据放这里
			this.chart.setOption({
				backgroundColor: '#fff',
				title: {
					// 地图显示标题
					text: '地图',
					sublink: '',
					top: '0px',
					left: 'center',
					textStyle: { color: '#000' }
				},
				tooltip: {
					// 提示框组件
					trigger: 'item',
					formatter: '{b}<br/>{c} 万平方公里'
				},
				series: [
					{
						type: 'map',
						map: 'china',
						roam: false,
						data: this.data, // 绑定数据
						nameMap: {},
						label: {
							// normal: { show: true },
							emphasis: { show: true }
						},
						itemStyle: {
							emphasis: {
								borderColor: '#fff',
								borderWidth: 1
							}
						}
					}
				]
			})
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
