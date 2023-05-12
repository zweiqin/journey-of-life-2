<template>
	<div style="width: 100%;height: 100%;">
		<div style="width: 100%;height: 25%;padding-top: 25px;">
			<div class="" style="display: flex;justify-content: space-between;height: 100%;">
				<div style="display: flex;flex-direction: column;justify-content: space-around;padding: 0 25px;text-align: center;">
					<div style="color: #64748B;">今日收益（元）</div>
					<div>
						<span style="font-size: 24px;font-weight: bold;vertical-align: middle;">￥ 3287</span>
						<span :style="{ 'color': '#FA4423' }"><i class="el-icon-caret-top"></i> +12%</span>
					</div>
				</div>
				<div style="width: 1px;background-color: #C7D2FE;"></div>
				<div style="display: flex;flex-direction: column;justify-content: space-around;padding: 0 25px;text-align: center;">
					<div style="color: #64748B;">余额（元）</div>
					<div>
						<span style="font-size: 24px;font-weight: bold;vertical-align: middle;">￥ 14201</span>
						<!-- <span :style="{ 'color': '#10B981' }"><i class="el-icon-caret-bottom"></i> -88%</span> -->
					</div>
				</div>
				<div style="width: 1px;background-color: #C7D2FE;"></div>
				<div style="display: flex;flex-direction: column;justify-content: space-around;padding: 0 25px;text-align: center;">
					<div style="color: #64748B;">累计收益（元）</div>
					<div>
						<span style="font-size: 24px;font-weight: bold;vertical-align: middle;">￥ 36411</span>
						<!-- <span :style="{ 'color': '#FA4423' }"><i class="el-icon-caret-top"></i> +88%</span> -->
					</div>
				</div>
				<div style="width: 1px;background-color: #C7D2FE;"></div>
				<div style="display: flex;flex-direction: column;justify-content: space-around;padding: 0 25px;text-align: center;">
					<div style="color: #64748B;">今日支出（元）</div>
					<div>
						<span style="font-size: 24px;font-weight: bold;vertical-align: middle;">￥ 2433</span>
						<span :style="{ 'color': '#10B981' }"><i class="el-icon-caret-bottom"></i> -8%</span>
					</div>
				</div>
				<div style="width: 1px;background-color: #C7D2FE;"></div>
				<div style="display: flex;flex-direction: column;justify-content: space-around;padding: 0 25px;text-align: center;">
					<div style="color: #64748B;">累计支出（元）</div>
					<div>
						<span style="font-size: 24px;font-weight: bold;vertical-align: middle;">￥ 6477</span>
						<!-- <span :style="{ 'color': '#FA4423' }"><i class="el-icon-caret-top"></i> +11%</span> -->
					</div>
				</div>
			</div>
		</div>
		<div style="display: flex;justify-content: space-between;width: 100%;height: 75%;">
			<div style="width: 59%;height: 100%;">
				<div class="radio-date">
					<div style="padding-left: 10px;font-weight: bold;font-size: 14px;">收入分析</div>
					<div>
						<el-radio-group v-model="dateRadioAnalysis" size="mini" @input="handelAnalysisDateChange">
							<el-radio-button :label="0">
								<div style="display: inline-block;width: 0;height: 0;overflow: hidden;">
									<el-date-picker
										ref="refCustomDateAnalysis" v-model="customDateAnalysis" type="daterange"
										value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
									>
									</el-date-picker>
								</div>
								<span @click="$refs.refCustomDateAnalysis.focus()">自定义</span>
							</el-radio-button>
							<el-radio-button :label="1">近7天</el-radio-button>
							<el-radio-button :label="2">一个月</el-radio-button>
						</el-radio-group>
					</div>
				</div>
				<div ref="refFinancialStatementsAnalysis" style="height: calc(100% - 36px);"></div>
			</div>
			<div style="width: 39%;height: 100%;">
				<div class="radio-date">
					<div style="padding-left: 10px;font-weight: bold;font-size: 14px;">收入计算</div>
					<div>
						<el-radio-group v-model="dateRadioCount" size="mini" @input="handelCountDateChange">
							<el-radio-button :label="0">
								<div style="display: inline-block;width: 0;height: 0;overflow: hidden;">
									<el-date-picker
										ref="refCustomDateCount" v-model="customDateCount" type="daterange"
										value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
									>
									</el-date-picker>
								</div>
								<span @click="$refs.refCustomDateCount.focus()">自定义</span>
							</el-radio-button>
							<el-radio-button :label="1">近半年</el-radio-button>
							<el-radio-button :label="2">近一年</el-radio-button>
						</el-radio-group>
					</div>
				</div>
				<div ref="refFinancialStatementsCount" style="height: calc(100% - 36px);"></div>
			</div>
		</div>
	</div>
</template>

<script>
import * as echarts from 'echarts'

export default {
	name: 'FinancialStatements',
	props: {
		data: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			chartAnalysis: null,
			chartCount: null,
			dateRadioAnalysis: 1,
			customDateAnalysis: '',
			dateRadioCount: 1,
			customDateCount: ''
		}
	},
	watch: {
	},
	mounted() {
		let base = +new Date() - 604800000
		const oneDay = 24 * 3600 * 1000
		const date = []
		const dataIncome = [ Math.random() * 9000 ]
		for (let i = 1; i < 8; i++) {
			const now = new Date(base += oneDay)
			date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
			dataIncome.push(Math.abs(Math.round((Math.random() - 0.5) * 6000 + dataIncome[i - 1])))
		}
		const dataExpenditure = [ Math.random() * 9000 ]
		for (let i = 1; i < dataIncome.length - 1; i++) {
			dataExpenditure.push(Math.abs(Math.round((Math.random() - 0.5) * 6000 + dataExpenditure[i - 1])))
		}

		this.chartAnalysis = echarts.init(this.$refs.refFinancialStatementsAnalysis)
		this.chartAnalysis.on('click', this.echartsMapClickAnalysis)
		window.onresize = echarts.init(this.$refs.refFinancialStatementsAnalysis).resize
		this.initChartAnalysis(date, dataIncome, dataExpenditure)

		this.chartCount = echarts.init(this.$refs.refFinancialStatementsCount)
		this.chartCount.on('click', this.echartsMapClickCount)
		window.onresize = echarts.init(this.$refs.refFinancialStatementsCount).resize
		this.initChartCount(1111, 6666)
	},
	methods: {
		initChartAnalysis(date, data1, data2) {
			if (data1 && data2) {
				this.chartAnalysis.clear()
				this.chartAnalysis.setOption({
					// legend: { data: ['收入', '支出', '净收入'] },
					grid: {
						top: 30,
						bottom: 30,
						left: '10%',
						right: '8%'
					},
					xAxis: [
						{
							type: 'category',
							data: date,
							axisPointer: {
								type: 'shadow'
							}
						}
					],
					yAxis: [
						{
							type: 'value',
							// name: '收入',
							interval: 2000,
							axisLabel: { formatter: '{value}' }
						},
						{
							type: 'value',
							// name: '净收入',
							interval: 2000,
							axisLabel: { formatter: '{value}' }
						}
					],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						}
					},
					series: [
						{
							name: '收入',
							type: 'bar',
							itemStyle: {
								color: '#6366f1'
							},
							tooltip: {
								valueFormatter(value) {
									return value + ' 元'
								}
							},
							data: data1
						},
						{
							name: '支出',
							type: 'bar',
							itemStyle: {
								color: '#fa4423'
							},
							tooltip: {
								valueFormatter(value) {
									return value + ' 元'
								}
							},
							data: data2
						},
						{
							name: '净收入',
							type: 'line',
							itemStyle: {
								color: '#09D6A3'
							},
							yAxisIndex: 1,
							tooltip: {
								valueFormatter(value) {
									return value + ' 元'
								}
							},
							data: data1.map((item, index) => item - data2[index])
						}
					]
				})
			}
		},
		initChartCount(dataA, dataB) {
			if (dataA && dataB) {
				this.chartCount.clear()
				this.chartCount.setOption({
					tooltip: {
						trigger: 'item'
					},
					legend: {
						bottom: '5%',
						left: 'right'
					},
					series: [
						{
							name: '数值',
							type: 'pie',
							top: 0,
							bottom: '8%',
							radius: ['60%', '80%'],
							avoidLabelOverlap: false,
							label: {
								// show: false,
								// position: 'center'
								formatter: [
									'{title|￥ {c}}',
									'{value|{b}}'
								].join('\n'),
								rich: {
									title: {
										// width: 20,
										height: 25,
										color: '#fa4423',
										align: 'center'
									},
									value: {
										// width: 20,
										color: '#64748B',
										padding: [0, 0, 0, 5],
										align: 'center'
									}
								}
							},
							// emphasis: {
							// 	label: {
							// 		show: true,
							// 		fontSize: 30,
							// 		fontWeight: 'bold'
							// 	}
							// },
							labelLine: {
								show: false
							},
							data: [{
								name: '累计支出',
								value: dataA,
								itemStyle: { color: '#fa4423' }
							}, {
								name: '累计收入',
								value: dataB,
								itemStyle: { color: '#6366f1' }
							}]
						}
					]
				})
			}
		},
		echartsMapClickAnalysis(params) {
			console.log(params)
		},
		echartsMapClickCount(params) {
			console.log(params)
		},
		handelAnalysisDateChange(e) {
			console.log(e)
		},
		handelCountDateChange(e) {
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
