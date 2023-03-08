<template>
	<div class="app-container">

		<!-- 查询和其他操作 -->
		<div class="filter-container">
			<el-input v-model="listQuery.search" clearable class="filter-item" style="width: 400px;" placeholder="请输入员工姓名、电话或地址" />
			<el-button
				v-permission="[ `POST ${api.getEmployeeList}` ]" size="mini" class="filter-item" type="primary"
				icon="el-icon-search" style="margin-left:10px;" @click="getList"
			>
				查找
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
			@refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '员工管理')"
		>
			<el-button
				v-permission="[ `POST ${api.employeeSave}` ]" size="mini" type="primary" icon="el-icon-plus"
				@click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
			>
				添加
			</el-button>
		</TableTools>

		<!-- 员工管理列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
			:api-path="api.getEmployeeList" :columns="columns" page-alias="pageNo" size-alias="pageSize"
		>
			<template #employeeGender="{ row }">
				<span v-if="row.employeeGender === 1">男</span>
				<span v-else-if="row.employeeGender === 2">女</span>
				<span v-else>--</span>
			</template>
			<template #employeeHead="{ row }">
				<el-image v-if="row.employeeHead" :src="row.employeeHead" style="width:80px; height:80px" fit="cover" :preview-src-list="[ row.employeeHead ]" />
				<span v-else>--</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-permission="[ `POST ${api.employeeUpdateById}` ]" size="mini"
					@click="handleUpdate(row)"
				>
					编辑
				</el-button>
				<el-button
					v-permission="[ `POST ${api.getEmployeInfo}` ]" type="warning" size="mini"
					@click="$refs.DetailModal && $refs.DetailModal.handleOpen(row)"
				>
					详情
				</el-button>
				<el-button
					v-permission="[ `POST ${api.employeeDeleteById}` ]" type="danger" size="mini"
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
	employeeDeleteById
} from '@/api/enterprise/employee'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import DetailModal from './components/DetailModal'
import { columns } from './table'

export default {
	name: 'Employee',
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
				localKey: 'employee',
				columnsOptions: columns
			},
			listQuery: {
				pageNo: 1,
				pageSize: 20,
				search: ''
			}
		}
	},
	computed: {
	},
	created() {},
	methods: {
		// 自定义列
		updateFields(columns) {
			this.columns = columns
		},
		getList(meaning) {
			meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, page: 1 }
		},
		async handleUpdate(row) {
			this.$refs.EditModal && this.$refs.EditModal.handleOpen(row)
		},
		async handleDelete({ id }) {
			await this.$elConfirm('确认删除?')
			await employeeDeleteById([ id ])
			this.$elMessage('删除成功!')
			this.getList()
		}
	}
}
</script>
