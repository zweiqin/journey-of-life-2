<template>
	<div class="app-container">

		<div class="other-container">
			<div style="display: flex;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
				<div
					style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
				>
				</div>
				<div>客户列表</div>
			</div>
		</div>
		<!-- 查询和其他操作 -->
		<div
			class="filter-container"
			style="padding: 20px 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-bottom: 0;border-radius: 6px 6px 0 0;"
		>
			<el-input
				v-model="listQuery.search" clearable class="filter-item"
				style="width: 300px;border: 1px solid #64748B;border-radius: 4px;" placeholder="请输入客户姓名/号码"
				@keyup.enter.native="getList"
			/>
			<el-button
				v-permission="[ `POST ${api.getCustomerList}` ]" size="mini" class="filter-item" type="primary"
				style="margin-left:10px;padding: 7px 22px;" @click="getList"
			>
				查询
			</el-button>
			<el-button
				v-permission="[ `POST ${api.getCustomerList}` ]" size="mini" class="filter-item" type="info"
				plain
				style="margin-left:10px;padding: 7px 22px;border: 0;" @click="(listQuery.search = '') || getList()"
			>
				重置
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;"
			@update-fields="updateFields" @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '客户管理')"
		>
			<el-button
				v-permission="[ `POST ${api.customerSave}` ]" size="mini" type="success"
				icon="el-icon-plus" style="border: 0;"
				@click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
			>
				添加客户
			</el-button>
		</TableTools>

		<!-- 客户管理列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
			:api-path="api.getCustomerList" :columns="columns" page-alias="pageNo" size-alias="pageSize"
			:grid-options="{ rowConfig: { height: 60 } }"
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);"
		>
			<template #headUrl="{ row }">
				<div v-if="row.headUrl" style="">
					<el-image
						lazy :src="row.headUrl" style="width:40px; height:40px;border-radius: 50% 50%;" fit="cover"
						:preview-src-list="[ row.headUrl ]"
					/>
				</div>
				<span v-else>--</span>
			</template>
			<template #customerGender="{ row }">
				<span v-if="row.customerGender === 1">男</span>
				<span v-else-if="row.customerGender === 2">女</span>
				<span v-else>--</span>
			</template>
			<template #customerType="{ row }">
				<el-tag v-if="row.customerType === 0" type="success">个人</el-tag>
				<el-tag v-else-if="row.customerType === 1">商户</el-tag>
				<el-tag v-else-if="row.customerType === 2" type="warning">工程</el-tag>
				<el-tag v-else-if="row.customerType === 3" type="danger">平台</el-tag>
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
					v-permission="[ `POST ${api.getCustomerInfo}` ]" size="mini" type="text" style="color: #2E8982;"
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
	created() { },
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

<style lang="scss" scoped>
.app-container {
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

/deep/ .vxe-cell-two-row {
	.vxe-cell {
		color: #666666;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		white-space: normal !important;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
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

/deep/ .el-button--success {
	background-color: #2e8982;
	border-color: #2e8982;
}

/deep/ .el-button--success:active {
	background: #11b95c;
	border-color: #11b95c;
	color: #FFFFFF;
	outline: none;
}

/deep/ .el-button--success:hover {
	background: #42d885;
	border-color: #42d885;
	color: #FFFFFF;
}
</style>
