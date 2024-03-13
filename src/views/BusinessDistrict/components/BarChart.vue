<template>
	<div :id="id" :style="styles">

	</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
	name: 'BarChart',
	props: {
		id: {
			type: String,
			default: ''
		},
		styles: {
			type: Object,
			default: () => ({ width: '788.79px', height: '580px', marginTop: '10px' })
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
				backgroundColor: '#fff',
				grid: {
					left: '2%',
					right: '2%',
					bottom: '-5%',
					top: '2%',
					containLabel: true
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'none'
					},
					formatter: '{b}:{c}'
				},
				xAxis: {
					show: false,
					type: 'value'
				},
				yAxis: [ {
					type: 'category',
					inverse: true,
					axisLabel: {
						show: false,
						textStyle: {
							color: '#000'
						}
					},
					splitLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLine: {
						show: false
					},
					data: ['No.1 商家A', 'No.2 商家A', 'No.3 商家A', 'No.4 商家A', 'No.5 商家A', 'No.6 商家A', 'No.7 商家A', 'No.8 商家A', 'No.9 商家A', 'No.10 商家A']
				} ],
				series: [
					{
						name: 'value',
						type: 'bar',
						zlevel: 1,
						showBackground: true,
						barGap: '120px',
						backgroundStyle: {
							color: '#f5f8ff'
						},
						itemStyle: {
							normal: {
								barBorderRadius: [0, 20, 20, 0], // 圆角（左上、右上、右下、左下）
								color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
									'#2FAEF2', '#1CD8A8'
								].map((color, offset) => ({
									color,
									offset
								}))) // 渐变
							}
						},
						label: {
							normal: {
								color: '#000',
								show: true,
								position: [0, '-20px'],
								textStyle: {
									fontSize: 16
								},
								formatter: '{b}'
							}
						},
						barWidth: 10,
						data: [239, 181, 154, 144, 135, 239, 181, 154, 144, 135]
					},
					{
						name: '21',
						type: 'bar',
						barWidth: 10,
						barGap: '-100%',
						data: [239, 181, 154, 144, 135, 239, 181, 154, 144, 135],
						itemStyle: {
							normal: {
								color: '#f5f8ff'
							},
							emphasis: {
								color: '#f5f8ff'
							}
						},
						label: {
							normal: {
								color: '#000',
								show: true,
								position: ['95%', '-20px'],
								textStyle: {
									fontSize: 16
								}
							}
						}
					}
				]
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
