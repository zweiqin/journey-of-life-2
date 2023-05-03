<template>
	<div style="width: 100%;height: 100%;">
		<div style="width: 100%;height: 68px;">
			<div class="radio-tab">
				<el-radio-group v-model="tabRadio" size="mini" @input="handelTabChange">
					<el-radio-button :label="0">人口</el-radio-button>
					<el-radio-button :label="1">简介</el-radio-button>
					<el-radio-button :label="2">产业</el-radio-button>
					<el-radio-button :label="3">小区</el-radio-button>
					<el-radio-button :label="4">医院</el-radio-button>
					<el-radio-button :label="5">写字楼</el-radio-button>
				</el-radio-group>
			</div>
		</div>
		<div style="width: 100%;height: calc(100% - 70px);">
			<div ref="refRegionData" style="height: 100%;"></div>
		</div>
	</div>
</template>

<script>
import * as echarts from 'echarts'

export default {
	name: 'RegionData',
	props: {
		data: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			chart: null,
			tabRadio: 0
		}
	},
	watch: {
	},
	mounted() {
		const data1 = ['90\n岁', '85\n岁', '80\n岁', '75\n岁', '70\n岁', '65\n岁', '60\n岁', '65\n岁', '60\n岁', '65\n岁', '60\n岁', '65\n岁', '60\n岁', '65\n岁', '60\n岁', '65\n岁', '60\n岁', '65\n岁', '60\n岁']
		const data2 = [ Math.round(Math.random() * 300) ]
		for (let i = 1; i < data1.length; i++) {
			data2.push(Math.abs(Math.round((Math.random() - 0.5) * 20 + data2[i - 1])))
		}

		this.chart = echarts.init(this.$refs.refRegionData)
		this.chart.on('click', this.echartsMapClick)
		window.onresize = echarts.init(this.$refs.refRegionData).resize
		this.initChart(data1, data2)
	},
	methods: {
		initChart(data1, data2) {
			if (data1 && data2) {
				this.chart.clear()
				this.chart.setOption({
					legend: {
						top: 0,
						right: 30,
						padding: 0,
						itemWidth: 14,
						itemheight: 14,
						itemStyle: {
							color: '#0519d4'
						},
						formatter: '人口年龄统计',
						textStyle: {
							color: '#64748B',
							lineHeight: 20
						},
						icon: 'circle'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '1%',
						containLabel: true
					},
					xAxis: [
						{
							type: 'category',
							data: data1,
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							}
						}
					],
					yAxis: [
						{
							type: 'value',
							splitLine: {
								show: false
							}
						}
					],
					series: [
						{
							name: '人口数量',
							type: 'bar',
							itemStyle: {
								color: '#28d7a6'
							},
							barWidth: '32%',
							data: data2
						}
					]
				})
			}
		},
		echartsMapClick(params) {
			console.log(params)
		},
		handelTabChange(e) {
			console.log(e)
		}
	}
}
</script>

<style lang="scss" scoped>
.radio-tab {
	/deep/ .el-radio-group {
		display: flex;
		justify-content: space-around;
		padding-top: 15px;
		overflow-x: auto;

		label {
			.el-radio-button__inner {
				font-size: 16px;
				background-color: #f8fbfd;
				border: 0;
			}
		}

		label.is-active {
			.el-radio-button__inner {
				font-weight: bold;
				color: #0519D4;
				box-shadow: none;
			}
		}

		&::-webkit-scrollbar {
			height: 6px !important;
		}
	}
}

</style>
