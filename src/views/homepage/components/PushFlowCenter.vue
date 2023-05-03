<template>
	<div style="width: 100%;height: 100%;">
		<div style="width: 100%;height: 68px;">
			<div class="radio-tab">
				<el-radio-group v-model="tabRadio" size="mini" @input="handelTabChange">
					<el-radio-button :label="0">家具修补</el-radio-button>
					<el-radio-button :label="1">家具维保</el-radio-button>
					<el-radio-button :label="2">家具安装</el-radio-button>
					<el-radio-button :label="3">家电清洗</el-radio-button>
					<el-radio-button :label="4">家电维修</el-radio-button>
					<el-radio-button :label="5">家电安装</el-radio-button>
					<el-radio-button :label="6">水电灯具</el-radio-button>
					<el-radio-button :label="7">门窗维保</el-radio-button>
					<el-radio-button :label="8">防水补漏</el-radio-button>
					<el-radio-button :label="9">管道疏通</el-radio-button>
					<el-radio-button :label="10">修锁换锁</el-radio-button>
					<el-radio-button :label="11">墙面地面</el-radio-button>
				</el-radio-group>
			</div>
			<div class="radio-date">
				<div style="padding-left: 10px;font-weight: bold;font-size: 14px;">用户点击量</div>
				<div>
					<el-radio-group v-model="dateRadio" size="mini" @input="handelDateChange">
						<el-radio-button :label="0">
							<span @click="$refs.refCustomDate.focus()">自定义</span>
							<div style="display: inline-block;width: 0;height: 0;overflow: hidden;">
								<el-date-picker
									ref="refCustomDate" v-model="customDate" type="daterange"
									value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
								>
								</el-date-picker>
							</div>
						</el-radio-button>
						<el-radio-button :label="1">近半年</el-radio-button>
						<el-radio-button :label="2">近一年</el-radio-button>
					</el-radio-group>
				</div>
			</div>
		</div>
		<div style="width: 100%;height: calc(100% - 70px);">
			<div ref="refPushFlowCenter" style="height: 100%;"></div>
		</div>
	</div>
</template>

<script>
import * as echarts from 'echarts'

export default {
	name: 'PushFlowCenter',
	props: {
		data: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			chart: null,
			tabRadio: 0,
			dateRadio: 1,
			customDate: ''
		}
	},
	watch: {
	},
	mounted() {
		let base = +new Date() - 15552000000
		const oneDay = 24 * 3600 * 1000
		const date = []
		const data = [ Math.random() * 300 ]
		for (let i = 1; i < 180; i++) {
			const now = new Date(base += oneDay)
			date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
			data.push(Math.abs(Math.round((Math.random() - 0.5) * 20 + data[i - 1])))
		}

		this.chart = echarts.init(this.$refs.refPushFlowCenter)
		this.chart.on('click', this.echartsMapClick)
		window.onresize = echarts.init(this.$refs.refPushFlowCenter).resize
		this.initChart(date, data)
	},
	methods: {
		initChart(date, data) {
			if (data) {
				this.chart.clear()
				this.chart.setOption({
					tooltip: {
						trigger: 'axis'
						// position(pt) {
						// 	return [pt[0], '10%']
						// }
					},
					// title: {
					// 	text: '用户点击量',
					// 	textStyle: {
					// 		color: '#000000',
					// 		fontSize: 15
					// 	},
					// 	top: 15,
					// 	left: 'left'
					// },
					// toolbox: {},
					legend: {
						type: 'scroll',
						show: true,
						bottom: 0,
						left: 'center',
						textStyle: {
							color: '#64748B'
						},
						data: [ { name: '活跃用户' } ]
					},
					grid: {
						top: 35,
						bottom: 45,
						left: '12%',
						right: '4%'
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: date
					},
					yAxis: {
						type: 'value',
						// boundaryGap: ['5%', '0%'],
						max: (value) => Math.ceil(value.max * 1.05),
						min: 0
					},
					dataZoom: [
						{
							type: 'inside',
							start: 0,
							end: 100
						}
					],
					series: [
						{
							name: '活跃用户',
							type: 'line',
							symbol: 'none',
							// sampling: 'lttb',
							itemStyle: {
								color: '#09D6A3'
							},
							areaStyle: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: 'rgba(9,214,163,0.60)'
									},
									{
										offset: 1,
										color: 'rgba(9,214,163,0.00)'
									}
								])
							},
							data
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
		},
		handelDateChange(e) {
			console.log(e)
		}
	}
}
</script>

<style lang="scss" scoped>
.radio-tab {
	/deep/ .el-radio-group {
		display: flex;
		overflow-x: auto;

		label {
			.el-radio-button__inner {
				border: 0;
			}
		}

		label.is-active {
			.el-radio-button__inner {
				font-weight: bold;
				color: #0519D4;
				background-color: #ffffff;
				box-shadow: none;
			}
		}

		&::-webkit-scrollbar {
			height: 6px !important;
		}
	}
}

.radio-date {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;

	/deep/ .el-radio-group {
		label {
			.el-radio-button__inner {
				border: 0;
			}
		}

		label.is-active {
			.el-radio-button__inner {
				color: #4D70FF;
				background-color: #f1f4ff;
				box-shadow: none;
			}
		}
	}
}
</style>
