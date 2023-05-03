<template>
	<div style="width: 100%;height: 100%;display: flex;flex-direction: column;overflow: hidden;">
		<div style="width: 100%;height: 36px;">
			<div class="radio-date">
				<div style="padding-left: 10px;font-weight: bold;font-size: 14px;">个人财务报表</div>
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
						<el-radio-button :label="1">近7天</el-radio-button>
						<el-radio-button :label="2">近一年</el-radio-button>
					</el-radio-group>
				</div>
			</div>
		</div>
		<div style="display: flex;align-items: center;padding: 25px;">
			<div style="width: 38px;height: 38px;line-height: 44px;text-align: center;background-color: #ff9416;border-radius: 50%;">
				<svg-icon
					style="width: 20;height: 20;" icon-class="h-copperCoin" class-name="card-panel-icon"
				/>
			</div>
			<div style="margin-left: 15px;font-size: 14px;">
				<div style="font-weight: bold;">收益</div>
				<div style="color: #838c9c;">{{ dateRadio === 0 ? '自定义' : dateRadio === 1 ? '近7天' : dateRadio === 2 ? '近一年' : '--' }}</div>
			</div>
		</div>
		<div style="padding: 2px 30px;">
			<div style="display: flex;align-items: center;">
				<div style="font-size: 28px;font-weight: bold;">￥999</div>
				<div style="padding-left: 10px;font-size: 14px;color: #3BB900;">-99.8%</div>
			</div>
			<div style="display: flex;align-items: center;">
				<div style="padding: 3px;font-size: 14px;font-weight: bold;color: #3BB900;background-color: #ecfbe6;">-￥500</div>
				<div style="padding-left: 8px;font-size: 14px;color: #838c9c;">近7天</div>
			</div>
		</div>
		<div style="width: 100%;height: 250px;">
			<div ref="refPersonalFinanceIncome" style="height: 100%;"></div>
		</div>
		<div style="display: flex;align-items: center;padding: 25px;">
			<div style="width: 38px;height: 38px;line-height: 44px;text-align: center;background-color: #fc4023;border-radius: 50%;">
				<svg-icon
					style="width: 20;height: 20;" icon-class="h-improve" class-name="card-panel-icon"
				/>
			</div>
			<div style="margin-left: 15px;font-size: 14px;">
				<div style="font-weight: bold;">提现</div>
				<div style="color: #838c9c;">{{ dateRadio === 0 ? '自定义' : dateRadio === 1 ? '近7天' : dateRadio === 2 ? '近一年' : '--' }}</div>
			</div>
		</div>
		<div style="padding: 2px 30px;">
			<div style="display: flex;align-items: center;">
				<div style="font-size: 28px;font-weight: bold;">￥6767</div>
				<div style="padding-left: 10px;font-size: 14px;color: #F4002C;">+99.8%</div>
			</div>
		</div>
		<div style="width: 100%;height: 100px;">
			<div ref="refPersonalFinanceWithdrawal" style="height: 100%;"></div>
		</div>
	</div>
</template>

<script>
import * as echarts from 'echarts'

export default {
	name: 'PersonalFinance',
	props: {
		data: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			chartIncome: null,
			chartWithdrawal: null,
			dateRadio: 1,
			customDate: ''
		}
	},
	watch: {
	},
	mounted() {
		let base = +new Date() - 691200000
		const oneDay = 24 * 3600 * 1000
		const date = []
		const data = [ Math.round(Math.random() * 300) ]
		const dataWithdrawal = [ Math.round(Math.random() * 300) ]
		for (let i = 1; i < 9; i++) {
			const now = new Date(base += oneDay)
			date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
			data.push(Math.round((Math.random() - 0.5) * 200 + data[i - 1]))
		}
		for (let i = 1; i < 9; i++) {
			dataWithdrawal.push(Math.abs(Math.round((Math.random() - 0.5) * 200 + dataWithdrawal[i - 1])))
		}

		this.chartIncome = echarts.init(this.$refs.refPersonalFinanceIncome)
		this.chartIncome.on('click', this.echartsMapClickIncome)
		window.onresize = echarts.init(this.$refs.refPersonalFinanceIncome).resize
		this.initChartIncome(date, data)

		this.chartWithdrawal = echarts.init(this.$refs.refPersonalFinanceWithdrawal)
		this.chartWithdrawal.on('click', this.echartsMapClickWithdrawal)
		window.onresize = echarts.init(this.$refs.refPersonalFinanceWithdrawal).resize
		this.initChartWithdrawal(date, dataWithdrawal)
	},
	methods: {
		initChartIncome(date, data) {
			if (data) {
				this.chartIncome.clear()
				this.chartIncome.setOption({
					tooltip: {
						trigger: 'axis'
						// position(pt) {
						// 	return [pt[0], '10%']
						// }
					},
					// title: {
					// 	text: '收益',
					// 	textStyle: {
					// 		color: '#000000',
					// 		fontSize: 15
					// 	},
					// 	top: 15,
					// 	left: 'left'
					// },
					// toolbox: {},
					// legend: {
					// 	type: 'scroll',
					// 	show: true,
					// 	top: 0,
					// 	left: 20,
					// 	textStyle: {
					// 		color: '#64748B'
					// 	},
					// 	icon: 'none',
					// 	data: [ { name: '收益' } ],
					// 	formatter: (name) => data.reduce((total, value, index, arr) => total + value, 0)
					// },
					grid: {
						top: 10,
						bottom: 0,
						left: 0,
						right: 20,
						containLabel: true
					},
					xAxis: {
						show: false,
						// type: 'category',
						boundaryGap: false,
						data: date
					},
					yAxis: {
						show: false,
						// type: 'value',
						// boundaryGap: ['5%', '0%'],
						max: (value) => Math.ceil(value.max * 1.05)
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
							name: '收益',
							type: 'line',
							symbol: 'none',
							// sampling: 'lttb',
							itemStyle: {
								color: '#44d600'
							},
							areaStyle: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: 'rgba(68,214,0,0.51)'
									},
									{
										offset: 1,
										color: 'rgba(68,214,0,0.00)'
									}
								])
							},
							smooth: true,
							data
						}
					]
				})
			}
		},
		initChartWithdrawal(date, data) {
			if (data) {
				this.chartWithdrawal.clear()
				this.chartWithdrawal.setOption({
					tooltip: {
						trigger: 'axis'
						// position(pt) {
						// 	return [pt[0], '10%']
						// }
					},
					// title: {
					// 	text: '提现',
					// 	textStyle: {
					// 		color: '#000000',
					// 		fontSize: 15
					// 	},
					// 	top: 15,
					// 	left: 'left'
					// },
					// toolbox: {},
					// legend: {
					// 	type: 'scroll',
					// 	show: true,
					// 	top: 0,
					// 	left: 20,
					// 	textStyle: {
					// 		color: '#64748B'
					// 	},
					// 	icon: 'none',
					// 	data: [ { name: '提现' } ],
					// 	formatter: (name) => data.reduce((total, value, index, arr) => total + value, 0)
					// },
					grid: {
						top: 10,
						bottom: 0,
						left: 0,
						right: 20,
						containLabel: true
					},
					xAxis: {
						show: false,
						// type: 'category',
						boundaryGap: false,
						data: date
					},
					yAxis: {
						show: false,
						// type: 'value',
						// boundaryGap: ['5%', '0%'],
						max: (value) => Math.ceil(value.max * 1.05)
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
							name: '提现',
							type: 'line',
							symbol: 'none',
							// sampling: 'lttb',
							itemStyle: {
								color: '#0519d4'
							},
							// areaStyle: {
							// 	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							// 		{
							// 			offset: 0,
							// 			color: 'rgba(68,214,0,0.51)'
							// 		},
							// 		{
							// 			offset: 1,
							// 			color: 'rgba(68,214,0,0.00)'
							// 		}
							// 	])
							// },
							smooth: true,
							data
						}
					]
				})
			}
		},
		echartsMapClickIncome(params) {
			console.log(params)
		},
		echartsMapClickWithdrawal(params) {
			console.log(params)
		},
		handelDateChange(e) {
			console.log(e)
		}
	}
}
</script>

<style lang="scss" scoped>
.radio-date {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 15px;

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
