<template>
	<div style="width: 100%;height: 100%;padding: 0 15px;">
		<div style="width: 100%;">
			<div class="radio-tab" style="display: flex;justify-content: space-around;align-items: center;padding-bottom: 30px;">
				<el-radio-group v-model="tabRadio" size="mini" @input="handelTabChange">
					<el-radio-button :label="0">平台公告</el-radio-button>
					<el-radio-button :label="1">商品</el-radio-button>
					<el-radio-button :label="2">营销管理</el-radio-button>
					<el-radio-button :label="3">常用功能</el-radio-button>
				</el-radio-group>
				<el-button
					size="small" type="text" style="padding: 15px 0 0 18px;font-size: 16px;color: #1664FF;"
					@click="handleClickMore"
				>
					查看更多
				</el-button>
			</div>
			<!-- <div style="font-size: 16px;font-weight: bold;">线上热门内容</div>
				<div class="radio-select">
				<div>
				<el-radio-group v-model="selectRadio" size="mini" @input="handelSelectChange">
				<el-radio-button :label="0">文本</el-radio-button>
				<el-radio-button :label="1">图文</el-radio-button>
				</el-radio-group>
				</div>
				</div> -->
		</div>
		<div style="width: 100%;height: calc(100% - 76px);">
			<vxe-grid v-bind="gridOptions">
				<template #headUrl="{ row }">
					<el-image lazy :src="row.headUrl" style="width:40px; height:40px" fit="cover" :preview-src-list="[ row.headUrl ]" />
				</template>
				<template #name="{ row }">
					{{ row.name }}一一一一一一一一一一一一一一一一一一一一一一一一一一一一
				</template>
				<template #mobile="{ row }">
					<div v-if="row.mobile">
						<div>{{ row.mobile }}</div>
					</div>
					<span v-else>--</span>
				</template>
				<!-- <template #workState="{ row }">
					{{ row.id }}%<i v-if="row.id > 0" style="margin-left: 4px;color: #FA4423;" class="el-icon-caret-top"></i><i v-if="row.id < 0" style="margin-left: 4px;color: #10B981;" class="el-icon-caret-bottom"></i>
					</template> -->
			</vxe-grid>
		</div>
	</div>
</template>

<script>
// import * as echarts from 'echarts'
import {
	api,
	getMasterPageList
} from '@/api/enterprise/master'

export default {
	name: 'NoticePanel',
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
			selectRadio: 0,
			listQuery: {
				pageNo: 1,
				pageSize: 20,
				userId: this.$store.state.user.userId,
				isCooperationOrisBlacklist: null,
				search: ''
			},
			gridOptions: {
				border: true,
				loading: true,
				height: '100%',
				columns: [
					{ type: 'seq', align: 'center', title: '序号', width: 50 },
					{ field: 'createTime', title: '内容标题', minWidth: 50, showOverflow: 'tooltip', slots: { default: 'name' } },
					{ field: 'mobile', title: '点击量', minWidth: 40, slots: { default: 'mobile' } },
					{ field: 'name', title: '发布者', minWidth: 50 },
					{ field: 'createTime', align: 'center', minWidth: 70, showOverflow: 'tooltip', title: '时间' }
				],
				data: [],
				rowConfig: { height: 60 },
				columnConfig: {
					resizable: true
				}
			}
		}
	},
	watch: {
	},
	mounted() {
		this.getList()
	},
	methods: {
		handelTabChange(e) {
			console.log(e)
		},
		handleClickMore(e) {
			console.log(e)
		},
		// handelSelectChange(e) {
		// 	console.log(e)
		// 	if (e === 0) {
		// 		this.gridOptions.columns = [
		// 			{ type: 'seq', align: 'center', title: '序号', width: 50 },
		// 			{ field: 'createTime', title: '内容标题', minWidth: 50, showOverflow: 'tooltip', slots: { default: 'name' } },
		// 			{ field: 'mobile', title: '点击量', minWidth: 40, slots: { default: 'mobile' } },
		// 			{ field: 'name', title: '发布者', minWidth: 50 },
		// 			{ field: 'createTime', align: 'center', minWidth: 70, showOverflow: 'tooltip', title: '时间' }
		// 		]
		// 	} else if (e === 1) {
		// 		this.gridOptions.columns = [
		// 			{ type: 'seq', align: 'center', title: '序号', width: 50 },
		// 			{ field: 'headUrl', title: '图片', minWidth: 50, slots: { default: 'headUrl' } },
		// 			{ field: 'createTime', title: '内容标题', minWidth: 50, showOverflow: 'tooltip', slots: { default: 'name' } },
		// 			{ field: 'mobile', title: '点击量', minWidth: 40, slots: { default: 'mobile' } },
		// 			{ field: 'name', title: '发布者', minWidth: 50 },
		// 			{ field: 'createTime', align: 'center', minWidth: 70, showOverflow: 'tooltip', title: '时间' }
		// 		]
		// 	}
		// },
		async getList(meaning) {
			this.gridOptions.loading = true
			try {
				const res = await getMasterPageList(this.listQuery)
				this.gridOptions.loading = false
				this.gridOptions.data = res.data
			} catch (e) {
				this.$elMessage(`获取公告数据失败！`)
			}
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

// .radio-select {
// 	display: flex;
// 	align-items: center;
// 	margin-top: 10px;
// 	margin-bottom: 10px;

// 	/deep/ .el-radio-group {
// 		background-color: #f2f3f8;

// 		label {
// 			.el-radio-button__inner {
// 				margin: 3px 6px;
// 				background: none;
// 				border: 0;
// 			}
// 		}

// 		label.is-active {
// 			.el-radio-button__inner {
// 				color: #4D70FF;
// 				background-color: #ffffff;
// 				box-shadow: none;
// 			}
// 		}
// 	}
// }

/deep/ .vxe-table {
	.vxe-table--render-wrapper {

		// 主框
		.vxe-table--main-wrapper {
			.vxe-table--header-wrapper {
				color: #1D2129;
				background-color: #f2f3f8;

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
