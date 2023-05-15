<template>
	<div style="display: flex;justify-content: space-between;width: 100%;height: 100%;">
		<div style="width: 22%;height: 100%;">
			<div style="padding-top: 12px;font-weight: bold;">师傅数据</div>
			<div style="display: flex;justify-content: space-between;padding-top: 26px;">
				<div style="text-align: center;">
					<div style="display: flex;align-items: center;">
						<div
							style="display: inline-block;width: 9px;height: 9px;margin-right: 4px;background-color: #e95d20;border-radius: 50%;"
						>
						</div>
						<span style="color: #787486;">师傅数据</span>
					</div>
					<div style="margin-top: 5px;font-size: 24px;font-weight: bold;">154</div>
				</div>
				<div style="text-align: center;">
					<div style="display: flex;align-items: center;">
						<div
							style="display: inline-block;width: 9px;height: 9px;margin-right: 4px;background-color: #f8c07f;border-radius: 50%;"
						>
						</div>
						<span style="color: #787486;">合作中</span>
					</div>
					<div style="margin-top: 5px;font-size: 24px;font-weight: bold;">11</div>
				</div>
				<div style="text-align: center;">
					<div style="display: flex;align-items: center;">
						<div
							style="display: inline-block;width: 9px;height: 9px;margin-right: 4px;background-color: #6956e5;border-radius: 50%;"
						>
						</div>
						<span style="color: #787486;">拉黑</span>
					</div>
					<div style="margin-top: 5px;font-size: 24px;font-weight: bold;">4</div>
				</div>
			</div>
			<div ref="refServiceData" style="height: calc(100% - 108px);"></div>
		</div>
		<div style="width: 76%;height: 100%;border: 1px solid #CCCEDD;">
			<div style="display: flex;justify-content: space-between;align-items: center;padding: 10px 12px 12px 28px;">
				<div style="font-weight: bold;">师傅列表</div>
				<div>
					<el-input
						v-model="listQuery.search" clearable class=""
						:style="{ width: listQuery.search ? '250px' : '150px' }" placeholder="快速查找" size="medium"
						style="border: 1px solid #CCCEDD;border-radius: 4px;" @keyup.enter.native="getList"
					>
						<template #prefix>
							<div style="display: flex;align-items: center;height: 100%;margin-left: 4px;">
								<i
									style="font-size: 16px;font-weight: bold;color: #64748B;" class="el-icon-search"
								></i>
							</div>
						</template>
						<template #append><span v-if="listQuery.search" style="cursor: pointer;" @click="getList">确定</span></template>
					</el-input>
				</div>
			</div>
			<div style="height: calc(100% - 60px);padding: 0 16px;">
				<vxe-grid v-bind="gridOptions">
					<template #name="{ row }">
						<div style="display: flex;align-items: center;">
							<div><el-avatar size="medium" :src="row.headUrl" fit="cover"></el-avatar></div>
							<div style="padding-left: 12px;">
								<div>{{ row.name }}</div>
								<div>
									<span v-if="row.birth">{{ (row.birth.substring(5, 7) - new Date().toLocaleString().substring(5, 7) < 0) && (row.birth.substring(8, 10) - new Date().toLocaleString().substring(8, 10) < 0) ? Math.abs(row.birth.substring(0, 4) - new Date().toLocaleString().substring(0, 4)) : Math.abs(row.birth.substring(0, 4) - new Date().toLocaleString().substring(0, 4)) - 1 }}岁</span>
									<span v-else>--</span>
									<span>{{ row.gender === 0 ? '男' : row.gender === 1 ? '女' : '--' }}</span>
								</div>
							</div>
						</div>
					</template>
					<template #mobile="{ row }">
						<div v-if="row.mobile">
							<div>{{ row.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') }}</div>
							<!-- <div style="display: flex;align-items: center;">
								<div
								style="display: inline-block;width: 12px;height: 12px;margin-right: 4px;background-color: #cccccc;border-radius: 50%;"
								>
								</div>
								<span style="color: #787486;">未知在线状态</span>
								</div> -->
						</div>
						<span v-else>--</span>
					</template>
					<template #createTime="{ row }">
						<div v-if="row.createTime">
							<div>{{ row.createTime }}</div>
							<div style="color: #9099a9;">{{ row.certification !== 1 ? '未认证' : '平台官方已认证' }}</div>
						</div>
						<span v-else>--</span>
					</template>
					<template #workCity="{ row }">
						<span v-if="row.workCity" style="position: relative;display: inline-block;height: 39px;overflow: hidden;text-overflow: ellipsis;word-break: break-all;white-space: normal !important;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
							<span v-if="row.workCity.split(',').length > 1">
								<!-- <span>{{ row.workCity.match(/^[^,]*(?=,)/)[0] }}</span> -->
								<span>......</span>
							</span>
							<!-- <span v-else>{{ row.workCity }}</span> -->
							<span v-else>......</span>
							<div style="position: absolute;top: 52%;left: 30px;width: fit-content;color: #6956E5;background-color: #ffffff;cursor: pointer;" @click="$refs.DetailModal && $refs.DetailModal.handleOpen(row, 'area')">+</div>
						</span>
						<span v-else>--</span>
						<!-- <span>{{ row.workCity.replaceAll(',', '，\n') }}</span> -->
					</template>
					<template #workState="{ row }">
						<el-tag v-if="row.workState === 0" type="success">在职</el-tag>
						<el-tag v-else-if="row.workState === 1" type="danger">离职</el-tag>
						<span v-else>--</span>
					</template>
				</vxe-grid>
			</div>
		</div>
		<!-- 查看详情 -->
		<DetailModal ref="DetailModal" @success="getList" />
	</div>
</template>

<script>
import * as echarts from 'echarts'
import {
	api,
	getMasterPageList
} from '@/api/enterprise/master'
import DetailModal from '../../masterManagement/masterList/components/DetailModal'

export default {
	name: 'ServiceData',
	components: {
		DetailModal
	},
	props: {
		data: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			chart: null,
			listQuery: {
				pageNo: 1,
				pageSize: 20,
				userId: this.$store.state.user.userId,
				isCooperationOrisBlacklist: null,
				search: ''
			},
			masterList: [],
			gridOptions: {
				border: true,
				loading: true,
				height: '100%',
				columns: [
					{ field: 'name', title: '师傅名称', slots: { default: 'name' } },
					{ field: 'mobile', title: '手机号', slots: { default: 'mobile' } },
					{ field: 'createTime', title: '加盟时间', slots: { default: 'createTime' } },
					{ field: 'workCity', title: '地区', showOverflow: 'tooltip', slots: { default: 'workCity' } },
					{ field: 'workState', title: '状态', width: 80, slots: { default: 'workState' } }
				],
				data: [],
				rowConfig: { height: 68 },
				columnConfig: {
					resizable: true
				}
			}
		}
	},
	watch: {
	},
	mounted() {
		this.chart = echarts.init(this.$refs.refServiceData)
		this.chart.on('click', this.echartsMapClick)
		window.onresize = echarts.init(this.$refs.refServiceData).resize
		this.initChart(154, 11, 4)
		this.getList()
	},
	methods: {
		initChart(data1, data2, data3) {
			if (data1 && data2 && data3) {
				const total = data1 + data2 + data3
				this.chart.clear()
				this.chart.setOption({
					series: [
						{
							type: 'gauge',
							radius: '100%',
							startAngle: 90,
							endAngle: -270,
							pointer: {
								show: false
							},
							axisLine: {
								show: false,
								lineStyle: {
									width: 90
								}
							},
							progress: {
								show: true,
								overlap: false,
								roundCap: true,
								clip: false,
								itemStyle: {
									borderColor: '#ffffff',
									borderWidth: 20,
									borderType: 'solid'
								}
							},
							splitLine: {
								show: false,
								distance: 0,
								length: 10
							},
							axisTick: {
								show: false
							},
							axisLabel: {
								show: false,
								distance: 50
							},
							data: [
								{
									value: (data1 * 100 / total).toFixed(3),
									name: '其余',
									title: {
										offsetCenter: ['0%', '-25%']
									},
									detail: {
										color: '#e95d20',
										valueAnimation: true,
										offsetCenter: ['0%', '-15%']
									},
									itemStyle: {
										// color: '#e95d20'
										color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
											{
												offset: 0,
												color: '#fffefe'
											},
											{
												offset: 0.5,
												color: '#e95d20'
											},
											{
												offset: 1,
												color: '#fffefe'
											}
										])
									}
								},
								{
									value: (data2 * 100 / total).toFixed(3),
									name: '合作中占比',
									title: {
										offsetCenter: ['0%', '-5%']
									},
									detail: {
										color: '#f8c07f',
										valueAnimation: true,
										offsetCenter: ['0%', '5%']
									},
									itemStyle: {
										// color: '#f8c07f'
										color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
											{
												offset: 0,
												color: '#fefdfd'
											},
											{
												offset: 0.5,
												color: '#f8c07f'
											},
											{
												offset: 1,
												color: '#fefdfd'
											}
										])
									}
								},
								{
									value: (data3 * 100 / total).toFixed(3),
									name: '拉黑占比',
									title: {
										offsetCenter: ['0%', '15%']
									},
									detail: {
										color: '#6956e5',
										valueAnimation: true,
										offsetCenter: ['0%', '25%']
									},
									itemStyle: {
										// color: '#6956e5'
										color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
											{
												offset: 0,
												color: '#fefeff'
											},
											{
												offset: 0.5,
												color: '#6956e5'
											},
											{
												offset: 1,
												color: '#fefeff'
											}
										])
									}
								}
							],
							title: {
								fontSize: 12
							},
							detail: {
								width: 50,
								height: 14,
								fontSize: 14,
								color: 'inherit',
								formatter: '{value}%'
							}
						}
					]
				})
			}
		},
		echartsMapClick(params) {
			console.log(params)
		},
		async getList(meaning) {
			this.gridOptions.loading = true
			try {
				const res = await getMasterPageList(this.listQuery)
				console.log(res)
				this.gridOptions.loading = false
				this.gridOptions.data = res.data
			} catch (e) {
				this.$elMessage(`获取师傅列表失败！`, 'error')
			}
		}
	}
}
</script>

<style lang="scss" scoped>

.el-tag {
	height: auto;
	padding: 4px 10px;
	line-height: normal;
	border: 0;
}
/deep/ .vxe-table {
	.vxe-table--render-wrapper {

		// 主框
		.vxe-table--main-wrapper {
			.vxe-table--header-wrapper {
				color: #64748B;
				background-color: #f8fbfd;

				.vxe-body--x-space {
					height: 0;
				}

				table {
					thead {
						.vxe-header--row {
							.vxe-header--column {
								background-image: none;
							}
						}
					}
				}

				.vxe-table--header-border-line {
					border: 0;
				}
			}

			.vxe-table--body-wrapper {
				.vxe-body--x-space {
					height: 0;
				}

				table {
					tbody {
						.vxe-body--row {
							.vxe-body--column {
								// background-image: none;
								background-size: 0px 100%, 100% 1px;
							}
						}
					}
				}
			}
		}

		.vxe-table--fixed-wrapper {

			// 左框
			.vxe-table--fixed-left-wrapper {
				.vxe-table--header-wrapper {
					background-color: #f8fbfd;

					table {
						tbody {
							.vxe-body--row {
								.vxe-body--column {
									background-image: none;
								}
							}
						}
					}

					.vxe-table--header-border-line {
						border: 0;
					}
				}

				.vxe-table--body-wrapper {
					table {
						tbody {
							.vxe-body--row {
								.vxe-body--column {
									background-image: none;
								}
							}
						}
					}
				}
			}

			// 右框
			.vxe-table--fixed-right-wrapper {
				.vxe-table--header-wrapper {
					background-color: #f8fbfd;

					table {
						tbody {
							.vxe-body--row {
								.vxe-body--column {
									background-image: none;
								}
							}
						}
					}

					.vxe-table--header-border-line {
						border: 0;
					}
				}

				.vxe-table--body-wrapper {
					table {
						tbody {
							.vxe-body--row {
								.vxe-body--column {
									background-image: none;
								}
							}
						}
					}
				}
			}
		}
	}

	.vxe-table--border-line {
		border: 0;
	}
}
</style>
