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
			default: () => ({ width: '100%', height: '568px', marginTop: '10px' })
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
				// title: {
				// 	text: '师傅接单服务类型统计'
				// },
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					show: true,
					data: ['订单金额', '实际营收', '结算佣金'],
					bottom: '10px',
					itemGap: 60,
					align: 'auto'
					// right: 10
				},
				grid: {
					top: '6%',
					left: '3%',
					right: '4%',
					bottom: '8%',
					containLabel: true
				},
				xAxis: [ {
					type: 'category',
					data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
				} ],
				yAxis: [ {
					type: 'value',
					name: '总价(万元)',
					axisLabel: {
						formatter: '{value}'
					}
				} ],
				series: [{
					name: '订单金额',
					type: 'bar',
					color: '#FAC858',
					barWidth: '28px',
					barGap: '0',
					data: [20, 12, 31, 34, 31, 20, 20, 12, 31, 34, 31, 20]
				}, {
					name: '实际营收',
					type: 'bar',
					color: '#93BEFF',
					barWidth: '28px',
					data: [10, 20, 5, 9, 3, 10, 20, 5, 9, 3, 10, 12]
				}, {
					name: '结算佣金',
					type: 'bar',
					color: '#507AFC',
					barWidth: '28px',
					data: [1, 1, 2, 3, 3, 6, 20, 5, 9, 3, 10, 5]
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
