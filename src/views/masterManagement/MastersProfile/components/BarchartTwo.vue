<template>
	<div :id="id" :style="styles">

	</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'BarChartTwo',
	props: {
		id: {
			type: String,
			default: ''
		},
		styles: {
			type: Object,
			default: () => ({ width: '100%', height: '548px', marginTop: '10px' })
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
				title: {
					text: '师傅接单服务类型统计'
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				// legend: {
				// 	data: ['包租费', '装修费', '保洁费', '物业费'],
				// 	align: 'right',
				// 	right: 10
				// },
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [ {
					type: 'category',
					data: ['家具补修', '家电清洗', '水电灯具', '管道疏通', '除四害', '窗帘衣架']
				} ],
				yAxis: [ {
					type: 'value',
					name: '总价(万元)',
					axisLabel: {
						formatter: '{value}'
					}
				} ],
				series: [{
					name: '前年',
					type: 'bar',
					barWidth: '50px',
					data: [20, 12, 31, 34, 31, 20]
				}, {
					name: '去年',
					type: 'bar',
					barWidth: '50px',
					data: [10, 20, 5, 9, 3, 10]
				}, {
					name: '今年',
					type: 'bar',
					barWidth: '50px',
					data: [1, 1, 2, 3, 0, 6]
				}]
			}
		}
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
