<template>
	<div class="app-container">

		<div class="other-container">
			<div style="display: flex;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
				<div
					style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
				>
				</div>
				<div>提现记录</div>
			</div>
		</div>
		<!-- 查询和其他操作 -->
		<div
			class="filter-container"
			style="padding: 20px 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-bottom: 0;border-radius: 6px 6px 0 0;"
		>
			<div class="radio-date filter-item">
				<el-radio-group v-model="dateRadioWallet" size="mini" @input="handelWalletDateChange">
					<el-radio-button :label="0">
						<div style="display: inline-block;width: 0;height: 0;overflow: hidden;">
							<el-date-picker
								ref="refCustomDateWallet" v-model="customDateWallet" type="daterange"
								value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
							>
							</el-date-picker>
						</div>
						<span @click="$refs.refCustomDateWallet.focus()">自定义</span>
					</el-radio-button>
					<el-radio-button :label="1">近7天</el-radio-button>
					<el-radio-button :label="2">一个月</el-radio-button>
				</el-radio-group>
			</div>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;"
			@update-fields="updateFields" @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '提现记录')"
		>
		</TableTools>

		<!-- 提现记录列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
			:api-path="api.getWithdrawRecordList" :columns="columns" page-alias="pageNo" size-alias="pageSize"
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);"
		>
			<template #amount="{ row }">
				<span :style="{ color: row.orderStatus === 4 ? '#FC4023' : row.orderStatus === 3 ? '#3BB900' : '#000000' }">￥ {{ row.amount || row.amount === 0 ? row.amount : '--' }}</span>
			</template>
			<template #bankChannel="{ row }">
				<span v-if="row.bankChannel === 1">手动打款</span>
				<span v-else-if="row.bankChannel === 2">通联</span>
				<span v-else>--</span>
			</template>
			<template #orderStatus="{ row }">
				<span v-if="row.orderStatus === 0">未审核</span>
				<span v-else-if="row.orderStatus === 1">通过</span>
				<span v-else-if="row.orderStatus === 2">不通过</span>
				<span v-else-if="row.orderStatus === 3" style="color: #3BB900;">已提现</span>
				<span v-else-if="row.orderStatus === 4" style="color: #FC4023;">提现失败</span>
				<span v-else style="color: #cccccc;">--</span>
			</template>
			<template #operate="{ row, $rowIndex }">
				<el-button
					v-permission="[ `POST ${api.getWithdrawRecordList}` ]" size="mini" type="text" style="color: #64748B;"
					@click="$refs.DetailModal && $refs.DetailModal.handleOpen(row)"
				>
					详情
				</el-button>
				<el-popover :ref="`deluser-popover-${$rowIndex}`" placement="top" width="310" popper-class="pt20 pr20 pb20 pl20">
					<div style="padding-bottom: 16px;color: #000000;">删除会导致部分数据丢失，谨慎处理！！！</div>
					<div style="text-align: center;">
						<el-button style="padding: 10px 32px;" size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
						<el-button style="padding: 10px 32px;" type="primary" size="mini" @click="$refs[`deluser-popover-${$rowIndex}`].doClose()">取消</el-button>
					</div>
					<el-button
						slot="reference" v-permission="[ `POST ${api.getWithdrawRecordList}` ]" size="mini" type="text"
						style="color: #64748B;"
					>
						删除
					</el-button>
				</el-popover>
				<!-- <el-popconfirm
					cancel-button-text="删除"
					cancel-button-type="danger"
					confirm-button-text="取消"
					confirm-button-type="primary"
					icon=""
					icon-color=""
					title="删除会导致部分数据丢失，谨慎处理！！！"
					@cancel="handleDelete"
					@confirm="popoverVisible = false"
					>
					<el-button
					slot="reference" v-permission="[ `POST ${api.getWithdrawRecordList}` ]" size="mini" type="text"
					style="color: #64748B;"
					>
					删除
					</el-button>
					</el-popconfirm> -->
			</template>
		</VxeTable>

		<!-- 查看详情 -->
		<DetailModal ref="DetailModal" @success="getList" />
	</div>
</template>

<script>
import { api } from '@/api/enterprise/withdrawRecord'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import DetailModal from './components/DetailModal'
import { columns } from './table'

export default {
	name: 'WithdrawRecord',
	components: {
		VxeTable,
		TableTools,
		DetailModal
	},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'withdrawRecord',
				columnsOptions: columns
			},
			listQuery: {
				pageNo: 1,
				pageSize: 20,
				userId: this.$store.state.user.userId
			},
			dateRadioWallet: 1,
			customDateWallet: ''
			// popoverVisible: false
			// tableData: []
		}
	},
	computed: {},
	created() { },
	methods: {
		// 自定义列
		updateFields(columns) {
			this.columns = columns
		},
		getList(meaning) {
			meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, pageNo: 1 }
		},
		handelWalletDateChange(e) {
			console.log(e)
		}
		// handleEdit(row) {
		// 	this.$refs.EditModal && this.$refs.EditModal.handleOpen(row)
		// },
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	height: 100%;
	background-color: #f5f6f7;
	padding: 20px 20px;
}

/deep/ .el-button--primary {
	background-color: #0519d4;
	border-color: #0519d4;
}

/deep/ .el-button--primary:active {
	background: #1682e6;
	border-color: #1682e6;
	color: #FFFFFF;
	outline: none;
}

/deep/ .el-button--primary:hover {
	background: #46a6ff;
	border-color: #46a6ff;
	color: #FFFFFF;
}

.radio-date {
	display: flex;
	justify-content: space-between;
	align-items: center;
	// margin-top: 10px;

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
