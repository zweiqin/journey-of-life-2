<template>
	<div class="app-container">

		<!-- 查询和其他操作 -->
		<div class="filter-container">
			<el-radio-group v-model="listQuery.isCooperationOrisBlacklist" class="filter-item" size="mini" @input="handleStatusChange">
				<el-radio-button label="">全部</el-radio-button>
				<el-radio-button :label="1">合作中</el-radio-button>
				<el-radio-button :label="2">已拉黑</el-radio-button>
			</el-radio-group>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
			@refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '师傅管理')"
		>
		</TableTools>

		<!-- 师傅管理列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
			:api-path="api.getMasterPageList" :columns="columns" page-alias="pageNo" size-alias="pageSize"
		>
			<template #gender="{ row }">
				<span>{{ row.gender }}</span>
			</template>
			<template #headUrl="{ row }">
				<span>{{ row.headUrl }}</span>
			</template>
			<template #certImg1="{ row }">
				<span>{{ row.certImg1 }}</span>
			</template>
			<template #certImg2="{ row }">
				<span>{{ row.certImg2 }}</span>
			</template>
			<template #skillList="{ row }">
				<span>{{ row.skillList }}</span>
			</template>
			<template #workState="{ row }">
				<span>{{ row.workState }}</span>
			</template>
			<template #state="{ row }">
				<span>{{ row.state }}</span>
			</template>
			<template #typ="{ row }">
				<span>{{ row.typ }}</span>
			</template>
			<template #carImg="{ row }">
				<span>{{ row.carImg }}</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-permission="[ `POST ${api.staffDelete}` ]" type="danger" size="mini"
					@click="handleDelete(row)"
				>
					拉黑
				</el-button>
			</template>
		</VxeTable>

		<!-- 新增编辑 -->
		<!-- <EditModal ref="EditModal" :list="statusList" @success="getList" /> -->
	</div>
</template>

<script>
import {
	api
} from '@/api/personnelManagement/master'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
// import EditModal from './components/EditModal'
import { columns } from './table'

export default {
	name: 'Master',
	components: {
		VxeTable,
		TableTools
		// EditModal
	},
	filters: {},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'master',
				columnsOptions: columns
			},
			listQuery: {
				pageNo: 1,
				pageSize: 10,
				userId: this.$store.state.user.userId,
				isCooperationOrisBlacklist: 0
			}
		}
	},
	computed: {},
	created() {
	},
	mounted() {},
	methods: {
		// 自定义列
		updateFields(columns) {
			this.columns = columns
		},
		getList(meaning) {
			meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, pageNo: 1 }
		},
		handleStatusChange(status) {
			this.listQuery = { ...this.listQuery, status }
		},
		async handleUpdate({ id, value, sortOrder }) {
			this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, value, sortOrder })
		},
		async handleDelete({ id }) {
			await this.$elConfirm('确认删除?')
			await staffDelete({ id })
			this.$elMessage('删除成功!')
			this.getList()
		}
	}
}
</script>
