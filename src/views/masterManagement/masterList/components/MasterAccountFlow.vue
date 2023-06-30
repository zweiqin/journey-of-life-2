<template>
	<div class="dailog-container">
		<el-dialog :visible.sync="visible" :modal-append-to-body="false" v-bind="modalOptions">
			<div>

				<TableTools
					:custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
					@refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '累计会员')"
				>
				</TableTools>

				<!-- 佣金记录列表 -->
				<VxeTable
					ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
					:api-path="api.getByUserIdAccountFlowingWater" :columns="columns" page-alias="pageNo" size-alias="pageSize"
					:is-pager="false" :grid-options="{ rowConfig: { height: 60 }, height: '600px' }"
				>
					<template #logType="{ row }">
						<el-tag v-if="row.logType === 0" type="warning">支出</el-tag>
						<el-tag v-else-if="row.logType === 1">收入</el-tag>
						<span v-else>--</span>
					</template>
				</VxeTable>

			</div>
		</el-dialog>

	</div>
</template>

<script>
import { api } from '@/api/enterprise/master'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { columns } from '../../../enterprise/wallet/table'

export default {
	name: 'MasterAccountFlow',
	components: {
		VxeTable,
		TableTools
	},
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '1000px',
				title: '师傅账户流水'
			},
			visible: false,
			formData: {
			},
			data: [],
			api,
			columns: columns.filter((i) => i.field !== 'operate'),
			customColumnsConfig: {
				localKey: 'masterAccountFlow',
				columnsOptions: columns.filter((i) => i.field !== 'operate')
			},
			listQuery: {}
		}
	},
	methods: {
		// 自定义列
		updateFields(columns) {
			this.columns = columns
		},
		getList(meaning) {
			meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, pageNo: 1 }
		},
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.listQuery.sfUserId = params.userId
			this.getList()
			// const loading = this.$elLoading('加载中')
			this.visible = true
		}
	}
}
</script>

<style lang="scss" scoped>
.dailog-container {
	position: relative;
	z-index: 1002;
	// /deep/ .el-dialog__wrapper {
	// 	z-index: 888!important;
	// }
	// /deep/ .v-modal {
	// 	z-index: 666!important;
	// }
}
</style>

