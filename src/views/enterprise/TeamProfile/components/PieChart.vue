<template>
	<div :id="id" :style="styles">

	</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
	name: 'PieChart',
	props: {
		id: {
			type: String,
			default: 'PieChart'
		},
		styles: {
			type: Object,
			default: () => ({ width: '100%', height: '287px' })
		},
		datas: {
			type: Array,
			default: () => []
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
					text: 'pieChart',
					show: false,
					// x: 'center',
					// y: 'center',
					textStyle: {
						fontSize: 20
					}
				},
				tooltip: {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					x: '6%',
					top: '20%',
					itemGap: 38
				},
				series: [ {
					type: 'pie',
					center: ['60%', '50%'],
					// radius: '50%',
					radius: ['54%', '85%'],
					clockwise: true,
					avoidLabelOverlap: true,
					// hoverOffset: 15,
					itemStyle: {
						color(params) {
							const colorList = ['#FAC858', '#93BEFF', '#507AFC']
							// console.log(params)
							return colorList[params.dataIndex]
						}
					},
					label: {
						show: true,
						position: 'outside',
						formatter: (params) => {
							// console.log(params)
							return params.name + ':  ' + params.percent + '%'
						},
						fontSize: 16
					// formatter: '{a|{b}：{d}%}\n{hr|}',
					// rich: {
					// 	hr: {
					// 		backgroundColor: 't',
					// 		borderRadius: 8,
					// 		width: 8,
					// 		height: 8,
					//     fontSize: 30,
					// 		// padding: [8, 8, 0, -12]
					// 	},
					// 	a: {
					// 		padding: [-30, 15, -20, 15]
					// 	}
					// }
					},
					labelLine: {
						length: 20,
						length2: 10,
						lineStyle: {
							width: 1
						}
					},
					data: this.datas
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
