<template>
	<div>
		<el-dialog
			:visible.sync="visible" v-bind="modalOptions"
			:custom-class="visibleRecord ? 'master-dialog-info' : 'master-dialog-info-only'"
		>
			<div slot="title">
				<div style="display: flex;font-size: 18px;">
					<div>基本信息</div>
				</div>
			</div>
			<div
				style="display: flex;justify-content: space-between;align-items: center;height: 295px;margin-top: 12px;;background-color: #f9f9f9;"
			>
				<div style="width: 200px;">
					<el-image
						lazy :src="formData.headUrl" style="width:100%; height:100%" fit="contain"
						:preview-src-list="[ formData.headUrl ]"
					/>
				</div>
				<div style="flex: 1;width: 0;margin-left: 30px;padding: 20px;background-color: #ffffff;">
					<div style="display: flex;justify-content: space-between;align-items: center;">
						<div style="font-weight: bold;">
							{{ formData.customerName }} | {{ formData.customerGender === 1 ? '男'
								: formData.customerGender === 2 ? '女' : '--' }} | <span
								style="padding: 3px;color: #FC4023;background-color: #FFFBED;"
							>
								{{ formData.customerType === 0 ? '个人'
									: formData.customerType === 1 ? '商户' : formData.customerType === 2 ? '工程' : formData.customerType === 3
										? '平台'
										: '--' }}
							</span>
						</div>
						<div
							style="display: flex;align-items: center;padding: 5px 15px;font-size: 16px;color: #ffffff;background-color: #e95d20;border-radius: 10px;cursor: pointer;"
							@click="handleOpenRecord"
						>
							<span>维保记录</span>
							<div style="padding-left: 8px;"><svg-icon icon-class="h-lineArrow" class-name="card-panel-icon" /></div>
						</div>
					</div>
					<div style="font-size: 16px;margin-top: 24px;">
						<span style="color: #64748B;">
							地址&nbsp;&nbsp;&nbsp;&nbsp;
						</span><span>{{ formData.customerAddress || '--' }}</span>
					</div>
					<div
						style="font-size: 16px;display: flex;justify-content: space-around;margin-top: 36px;background-color: #f8fbfd;"
					>
						<div style="">
							<div style="display: flex;justify-content: flex-start;align-items: center;padding-bottom: 2px;">
								<div
									style="display: flex;align-items: center;justify-content: center;padding: 0.5em;margin-right: 0.5em;;border: 1px solid #64748B;border-radius: 50%;"
								>
									<svg-icon icon-class="h-call" class-name="card-panel-icon" />
								</div>
								<div style="font-weight: bold;">手机号码</div>
							</div>
							<div style="padding-left: 2.5em;">
								<div style="color: #0519D4;">{{ formData.customerTel || '--' }}</div>
							</div>
						</div>
						<div style="width: 2px;background-color: #e4eafd;"></div>
						<div>
							<div style="display: flex;justify-content: flex-start;align-items: center;padding-bottom: 2px;">
								<div
									style="display: flex;align-items: center;justify-content: center;padding: 0.5em;margin-right: 0.5em;;border: 1px solid #64748B;border-radius: 50%;"
								>
									<svg-icon icon-class="h-serviceRecord" class-name="card-panel-icon" />
								</div>
								<div style="font-weight: bold;">服务记录</div>
							</div>
							<div style="padding-left: 2.5em;">
								<div style="color: #0519D4;">{{ formData.serviceRecord ? formData.serviceRecord.length : '--' }}</div>
							</div>
						</div>
						<div style="width: 2px;background-color: #e4eafd;"></div>
						<div>
							<div style="display: flex;justify-content: flex-start;align-items: center;padding-bottom: 2px;">
								<div
									style="display: flex;align-items: center;justify-content: center;padding: 0.5em;margin-right: 0.5em;;border: 1px solid #64748B;border-radius: 50%;"
								>
									<svg-icon icon-class="h-watchLater" class-name="card-panel-icon" />
								</div>
								<div style="font-weight: bold;">最近一次服务时间</div>
							</div>
							<div style="padding-left: 2.5em;">
								<div style="color: #0519D4;">
									{{ formData.serviceRecord && formData.serviceRecord.length ? formData.serviceRecord[0].buyingTime
										: '--' }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</el-dialog>
		<el-dialog
			:visible.sync="visibleRecord"
			v-bind="{ closeOnClickModal: false, width: '1100px', title: '主营区域', modal: visible ? false : true, showClose: false }"
			:class="visible ? 'master-dialog-service' : 'master-dialog-service-only'" custom-class="master-dialog-record"
		>
			<div slot="title" style="padding-bottom: 10px;border-bottom: 1px solid #eaeaea;">
				<div style="display: flex;font-size: 18px;">
					<div>服务记录（{{ formData.serviceRecord.length }}个）</div>
				</div>
			</div>
			<el-form ref="formData" :model="formData" label-position="left" label-width="0px" label-suffix="" size="mini">
				<div style="margin-top: 5px;">
					<el-form-item label="" prop="workCity">
						<vxe-grid v-bind="gridOptions">
							<template #count="{ row }">
								<span>{{ row.count || row.count === 0 ? row.count : '--' }}</span>
							</template>
							<template #state="{ row }">
								<span v-if="row.state === 0">未完成</span>
								<span v-else-if="row.state === 1">完成</span>
								<span v-else>--</span>
							</template>
						</vxe-grid>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" style="text-align: center;">
				<el-button style="padding: 10px 32px;" type="danger" size="medium" @click="visibleRecord = false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { getCustomerInfo } from '@/api/enterprise/customer'

export default {
	name: 'DetailModal',
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '1100px',
				title: '查看客户详情',
				beforeClose: this.handleClose
			},
			visible: false,
			visibleRecord: false,
			formData: {
				id: '',
				userId: '',
				headUrl: '',
				customerName: '',
				customerGender: '',
				customerTel: '',
				customerType: '',
				customerLevel: '',
				customerAddress: '',
				serviceRecord: [],
				createTime: '',
				updateTime: ''
			},
			gridOptions: {
				border: true,
				loading: true,
				// height: '100%',
				columns: [
					{ field: 'buyingTime', align: 'center', title: '购买时间' },
					{ field: 'dictName', align: 'center', title: '服务类型' },
					{ field: 'count', align: 'center', title: '数量', slots: { default: 'count' } },
					{ field: 'state', align: 'center', title: '状态', slots: { default: 'state' } }
				],
				data: [],
				rowConfig: { height: 60 },
				columnConfig: {
					resizable: true
				}
			}
		}
	},
	methods: {
		handleClose() {
			this.visibleRecord = false
			this.visible = false
		},
		handleOpen(params = {}) {
			this.formData = Object.assign(this.$options.data().formData, params)
			if (params.id) {
				this.getInfo(params.id)
			}
			this.visible = true
		},
		async getInfo(id) {
			const loading = this.$elLoading('加载中')
			try {
				const res = await getCustomerInfo({ id })
				this.formData = Object.assign(this.$options.data().formData, res.data, {
					id: res.data.id || '',
					userId: res.data.userId || '',
					headUrl: res.data.headUrl || '',
					customerName: res.data.customerName || '',
					customerGender: res.data.customerGender,
					customerTel: res.data.customerTel || '',
					customerType: res.data.customerType,
					customerLevel: res.data.customerLevel,
					customerAddress: res.data.customerAddress || '',
					serviceRecord: res.data.serviceRecord || [],
					createTime: res.data.createTime || '',
					updateTime: res.data.updateTime || ''
				})
			} finally {
				loading.close()
			}
		},
		handleOpenRecord() {
			if (!this.visibleRecord) {
				this.gridOptions.loading = false
				this.gridOptions.data = this.formData.serviceRecord
			}
			this.visibleRecord = !this.visibleRecord
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/ .master-dialog-service {
	top: calc(10vh + 387px); // （+顶5vh）（+387.xx）（+底5vh）
}

/deep/ .master-dialog-service-only {
	top: 25vh;
}

/deep/ .el-dialog {
	&.master-dialog-info {
		margin-top: 5vh !important;
	}

	&.master-dialog-info-only {
		margin-top: 25vh !important;
	}

	&.master-dialog-record {
		margin-top: 0px !important;
		margin-bottom: 5vh !important;
		max-height: calc(85vh - 387px); // 100-（10vh + 387px）-（底5vh）
	}

	.el-dialog__header {
		font-size: 18px;
		font-weight: bold;
		color: #333333;
	}

	.el-dialog__body {
		padding: 0 25px 30px;
		font-size: 18px;
		color: #000000;

		.el-form-item {
			margin-bottom: 6px;

			label {
				color: #9E9E9E;
			}

			.el-form-item__content {
				color: #333333;
			}
		}
	}
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

