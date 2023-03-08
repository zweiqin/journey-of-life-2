<template>
	<div class="app-container">

		<!-- 查询和其他操作 -->
		<div class="filter-container">
			<el-input v-model="listQuery.search" clearable class="filter-item" style="width: 400px;" placeholder="请输入客户姓名、电话或地址" />
			<el-button
				v-permission="[ `POST ${api.getCustomerList}` ]" size="mini" class="filter-item" type="primary"
				icon="el-icon-search" style="margin-left:10px;" @click="getList"
			>
				查找
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
			@refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '客户管理')"
		>
			<el-button
				v-permission="[ `POST ${api.customerSave}` ]" size="mini" type="primary" icon="el-icon-plus"
				@click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
			>
				添加
			</el-button>
		</TableTools>

		<!-- 客户管理列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
			:api-path="api.getCustomerList" :columns="columns" page-alias="pageNo" size-alias="pageSize"
		>
			<template #customerGender="{ row }">
				<span v-if="row.customerGender === 1">男</span>
				<span v-else-if="row.customerGender === 2">女</span>
				<span v-else>--</span>
			</template>
			<template #customerLevel="{ row }">
				<span v-if="row.customerLevel === 1">潜在客户</span>
				<span v-else-if="row.customerLevel === 2">开发中</span>
				<span v-else-if="row.customerLevel === 3">VIP客户</span>
				<span v-else>--</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-permission="[ `POST ${api.getCustomerInfo}` ]" size="mini"
					@click="$refs.DetailModal && $refs.DetailModal.handleOpen(row)"
				>
					详情
				</el-button>
				<el-button
					v-permission="[ `POST ${api.customerUpdateById}` ]" type="primary" size="mini"
					@click="handleEdit(row)"
				>
					编辑
				</el-button>
				<el-button
					v-permission="[ `POST ${api.customerDeleteById}` ]" type="danger" size="mini"
					@click="handleDelete(row)"
				>
					删除
				</el-button>
			</template>
		</VxeTable>

		<!-- 新增编辑 -->
		<EditModal ref="EditModal" @success="getList" />
		<!-- 查看详情 -->
		<DetailModal ref="DetailModal" @success="getList" />
	</div>
</template>

<script>
import {
	api,
	customerDeleteById
} from '@/api/enterprise/customer'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import DetailModal from './components/DetailModal'
import { columns } from './table'

export default {
	name: 'Customer',
	components: {
		VxeTable,
		TableTools,
		EditModal,
		DetailModal
	},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'customer',
				columnsOptions: columns
			},
			listQuery: {
				pageNo: 1,
				pageSize: 20,
				search: ''
			}
		}
	},
	computed: {},
	created() {},
	methods: {
		// 自定义列
		updateFields(columns) {
			this.columns = columns
		},
		getList(meaning) {
			meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, page: 1 }
		},
		handleEdit(row) {
			this.$refs.EditModal && this.$refs.EditModal.handleOpen(row)
		},
		async handleDelete({ id }) {
			await this.$elConfirm('确认删除?')
			await customerDeleteById({ ids: [ id ] })
			this.$elMessage('删除成功!')
			this.getList()
		}
	}
}
</script>
