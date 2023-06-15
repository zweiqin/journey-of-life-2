<template>
	<div class="app-container">

		<div class="other-container">
			<div
				style="display: flex;justify-content: space-between;align-items: center;padding: 6px 20px 6px 12px;font-size: 14px;background-color: #ffffff;border-radius: 8px;box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);"
			>
				<div style="display: flex;align-items: center;">
					<svg-icon style="width: 22;height: 22;" icon-class="h-audio" class-name="card-panel-icon" /><span
						style="font-size: 16px;font-weight: bold;color: #0519D4;margin-left: 10px;;"
					>
						平台财务公告
					</span><span style="font-weight: bold;margin-left: 5px;">
						【重要】
					</span>
					<span style="width: 450px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;color: #3d3d3d;">
						这是非常重要的二条公告公告公告公告公告公告公告公告公告公告告公告告公告告公告告公告告公告告公告告公告告公告告公告告公告
					</span>
					<span style="vertical-align: middle;color: #3d3d3d;">&nbsp;&nbsp;2023-04-15 16:00</span>
				</div>
				<span style="color: #FA2201;cursor: pointer;">立即了解</span>
			</div>
		</div>

		<div id="wallteData1" class="filter-container" style="width: 100%;">
			<div style="display: flex;padding-top: 24px;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
				<div
					style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
				>
				</div>
				<div>我的钱包</div>
			</div>
			<MyWallet></MyWallet>
			<div style="display: flex;padding-top: 24px;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
				<div
					style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
				>
				</div>
				<div>账户流水</div>
			</div>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field
			style="width: 100%;padding: 24px 20px 10px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;"
			@update-fields="updateFields" @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '账户流水')"
		>
			<div>
				<el-input
					v-model="listQuery.search" clearable style="width: 300px;border: 1px solid #64748B;border-radius: 4px;"
					placeholder="请输入流水号/流水信息" @keyup.enter.native="getList"
				/>
				<el-button
					v-permission="[ `POST ${api.queryAccountFlowingWater}` ]" size="mini" type="primary"
					style="margin-left:10px;padding: 7px 22px;" @click="getList"
				>
					查询
				</el-button>
				<el-button
					v-permission="[ `POST ${api.queryAccountFlowingWater}` ]" size="mini" type="info" plain
					style="margin-left:10px;padding: 7px 22px;border: 0;" @click="(listQuery.search = '') || getList()"
				>
					重置
				</el-button>
			</div>
		</TableTools>

		<!-- 账户流水列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
			:api-path="api.queryAccountFlowingWater" :columns="columns" page-alias="pageNo" size-alias="pageSize"
			:is-pager="false"
			style="width: 100%;padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);"
		>
			<template #logType="{ row }">
				<el-tag v-if="row.logType === 0" type="warning">支出</el-tag>
				<el-tag v-else-if="row.logType === 1">收入</el-tag>
				<span v-else>--</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-permission="[ `POST ${api.queryAccountFlowingWater}` ]" size="mini" type="text"
					style="color: #2E8982;" @click="$refs.DetailModal && $refs.DetailModal.handleOpen(row)"
				>
					详情
				</el-button>
			</template>
		</VxeTable>

		<!-- <div v-if="heightPersonalFinanceCenter !== '0px'" :style="{ height: heightPersonalFinanceCenter }" style="width: 25%;position: absolute;bottom: 20px;right: 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-radius: 8px;box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);">
			<PersonalFinance></PersonalFinance>
			</div> -->

		<!-- 新增编辑 -->
		<!-- <EditModal ref="EditModal" @success="getList" /> -->
		<!-- 查看详情 -->
		<DetailModal ref="DetailModal" @success="getList" />
	</div>
</template>

<script>
import { api } from '@/api/wallet/wallet'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import MyWallet from './components/MyWallet'
import DetailModal from './components/DetailModal'
import PersonalFinance from './components/PersonalFinance'
import { columns } from './table'

export default {
	name: 'Wallet',
	components: {
		VxeTable,
		TableTools,
		MyWallet,
		DetailModal,
		PersonalFinance
	},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'wallet',
				columnsOptions: columns
			},
			listQuery: {
				pageNo: 1,
				pageSize: 20,
				search: ''
			},
			heightPersonalFinanceCenter: '0px'
		}
	},
	created() { },
	mounted() {
		this.$nextTick(() => {
			this.heightPersonalFinanceCenter = document.getElementById('wallteData1').clientHeight - 56 + document.querySelector('.app-container>.table-tools').offsetHeight + document.getElementsByClassName('vxe-table__wrapper')[0].offsetHeight + 'px'
		})
		// console.log(document.getElementById('wallteData1').clientHeight, document.querySelector('.app-container>.table-tools').offsetHeight, document.getElementsByClassName('vxe-table__wrapper')[0].offsetHeight, this.heightPersonalFinanceCenter)
	},
	methods: {
		// 自定义列
		updateFields(columns) {
			this.columns = columns
		},
		getList(meaning) {
			meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, pageNo: 1 }
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	position: relative;
	height: 100%;
	background-color: #f5f6f7;
	padding: 20px 20px;
}

.el-tag {
	height: auto;
	padding: 8px 10px;
	line-height: normal;
	border: 0;
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
</style>
