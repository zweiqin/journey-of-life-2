<template>
	<div
		:id="id" style="{
    color: #ecf2fc60;
    width: 100%;
    height: 390px;
  }"
	></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'RankingServiceOrders',
	props: {
		id: {
			type: String,
			default: ''
		},
		chartsData: {
			type: [Object, Array],
			default: () => ({
				nameArray: ['加盟商A', '加盟商B', '加盟商C', '加盟商D', '加盟商E', '加盟商F', '加盟商G'],
				dataArray: ['23400', '15000', '30000', '22000', '10000', '23400', '5000']
			})
		}
	},
	data() {
		return {
			MyChartsDom: {}
		}
	},
	computed: {
		option() {
			return {
				tooltip: {
					trigger: 'axis',
					show: false,
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					show: false,
					selectedMode: false
				},
				grid: {
					top: '10%',
					left: '3%',
					// right: '4%',
					bottom: '-5%',
					containLabel: true
				},
				xAxis: [ {
					splitLine: {
						show: false
					},
					type: 'value',
					show: false
				} ],
				yAxis: [ {
					splitLine: {
						show: false
					},
					axisLine: { // y轴
						show: false
					},
					type: 'category',
					axisTick: {
						show: false
					},
					data: this.chartsData.nameArray,
					axisLabel: {
						textStyle: {
							fontSize: 18,
							color: '#030229'
						}
					}
				} ],
				series: [ {
					name: '标准化',
					type: 'bar',
					barWidth: 15, // 柱子宽度
					barGap: '40%', // 柱子之间间距
					label: {
						show: true,
						position: 'right', // 位置
						color: '#1CD8A8',
						fontSize: 14,
						fontWeight: 'bold', // 加粗
						distance: 3 // 距离
					}, // 柱子上方的数值
					itemStyle: {
						borderRadius: [0, 20, 20, 0], // 圆角（左上、右上、右下、左下）
						color: (value, index) => {
							const colorList = ['#5B93FF', '#FF8F6B']
							return colorList[Number(value.data > 22000)]
							// console.log(value.data >= 350)
						}
						// color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
						//     '#2FAEF2', '#1CD8A8'
						// ].map((color, offset) => ({
						//     color,
						//     offset
						// }))), // 渐变
					},
					data: Array.reverse(this.chartsData.dataArray)
				} ]
			}
		}
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
