<template>
	<div :id="id" :style="styles">
	</div>
</template>

<script>
import * as echarts from 'echarts'

export default {
	name: 'LineChart',
	props: {
		id: {
			type: String,
			default: 'LineChart'
		},
		styles: {
			type: Object,
			default: () => ({ width: '100%', height: '400px' })
		}
	},
	data() {
		return {
			MyChartsDom: {}
		}
	},
	computed: {
		option: () => ({
			backgroundColor: '#fff',
			color: [ '#73A0FA' ],
			tooltip: {
				show: true, // 移动显示数据开关
				trigger: 'axis'
			},
			grid: {
				left: '25',
				right: '25',
				bottom: '24',
				top: '10%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				}
			},
			yAxis: {
				type: 'value',
				// min: 1.51,
				// max: 1.56,
				axisLabel: {
					formatter: (params) => params / 1000 + 'k',	// console.log(params)
					color: '#999',
					textStyle: {
						fontSize: 12
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#ccc',
						type: ''
					}
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				}
			},
			series: [
				{
					name: '收入金额',
					type: 'line',
					smooth: false,
					symbol: 'circle',
					symbolSize: 8,
					label: {
						show: false
					},
					data: [ // 之前的data数据是 [1.544, 1.545, 1.539.....] 数组形式的，现在得修改成[{...}, {...}, {...}] 具体数据如下
						1154, 11134, 12323, 23232, 13212, 23133, 21313
					],
					itemStyle: { // 当前折现下面的渐变色配置项（具体渐变颜色修改一下即可）
						normal: {
							color: (params) => '#258CF4',
							areaStyle: {
								color: new echarts.graphic.LinearGradient(1, 1, 0.5, 0.4, [
									{
										offset: 0.7,
										color: 'rgba(122,165,250,0)'
									},
									{
										offset: 1,
										color: 'rgba(122,165,250,0.26)'
									}
								])
							}
						}
					}
				},
				{
					name: '收入金额',
					type: 'line',
					smooth: false,
					symbol: 'circle',
					symbolSize: 8,
					label: {
						show: false
					},
					data: [ // 之前的data数据是 [1.544, 1.545, 1.539.....] 数组形式的，现在得修改成[{...}, {...}, {...}] 具体数据如下
						20202, 13134, 31231, 56122, 18234, 10871, 29765
					],
					itemStyle: { // 当前折现下面的渐变色配置项（具体渐变颜色修改一下即可）
						normal: {
							color: (params) => '#258CF4',				// console.log(params)
							areaStyle: {
								color: new echarts.graphic.LinearGradient(1, 1, 0.5, 0.4, [
									{
										offset: 0.7,
										color: 'rgba(122,165,250,0)'
									},
									{
										offset: 1,
										color: 'rgba(122,165,250,0.26)'
									}
								])
							}
						}
					}
				}
			]
		})
	},
	created() {

	},
	mounted() {
		const EDom = document.getElementById(this.id)
		const chartDom = echarts.init(EDom)
		this.MyChartsDom = chartDom
		chartDom.setOption(this.option, true)
	}
}
</script>

<style lang="scss" scoped>

</style>
