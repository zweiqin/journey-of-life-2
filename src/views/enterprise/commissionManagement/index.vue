<template>
	<div class="app-container">

		<div class="filter-container">
			<div style="display: flex;padding-top: 24px;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
				<div
					style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
				>
				</div>
				<div>佣金统计</div>
			</div>
			<MyCommission></MyCommission>
			<div style="display: flex;padding-top: 24px;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
				<div
					style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
				>
				</div>
				<div>佣金详细列表</div>
			</div>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field
			style="padding: 24px 20px 10px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;"
			@update-fields="updateFields" @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '佣金记录')"
		>
		</TableTools>

		<!-- 佣金记录列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
			:api-path="api.getCommissionList" :columns="columns" page-alias="pageNo" size-alias="pageSize"
			:is-pager="false"
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);"
		>
			<template #sfProportion="{ row }">
				<span>{{ row.sfProportion * 100 }}%</span>
			</template>
			<template #sfPrice="{ row }">
				<span>￥{{ row.sfPrice }}</span>
			</template>
			<template #status="{ row }">
				<el-tag v-if="row.status === 1" type="warning">订单未完成</el-tag>
				<el-tag v-else-if="row.status === 2">订单已完成</el-tag>
				<span v-else>--</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-permission="[ `GET ${api.getCommissionList}` ]" size="mini" type="text" style="color: #2E8982;"
					@click="$refs.DetailModal && $refs.DetailModal.handleOpen(row)"
				>
					详情
				</el-button>
			</template>
		</VxeTable>

		<!-- 查看详情 -->
		<DetailModal ref="DetailModal" @success="getList" />
	</div>
</template>

<script>
import { api } from '@/api/enterprise/commissionManagement'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import MyCommission from './components/MyCommission'
import DetailModal from './components/DetailModal'
import { columns } from './table'

export default {
	name: 'CommissionManagement',
	components: {
		VxeTable,
		TableTools,
		MyCommission,
		DetailModal
	},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'commissionManagement',
				columnsOptions: columns
			},
			listQuery: {
				pageNo: 1,
				pageSize: 20,
				search: ''
			}
		}
	},
	created() { },
	mounted() { },
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
