<template>
	<div class="app-container">

		<!-- 查询和其他操作 -->
		<div class="filter-container">
			<el-radio-group v-model="listQuery.status" class="filter-item" size="mini" @input="handleStatusChange">
				<!-- <el-radio-button label="待支付" :value="0"></el-radio-button>
					<el-radio-button label="待接单" :value="1"></el-radio-button>
					<el-radio-button label="待报价" :value="2"></el-radio-button>
					<el-radio-button label="待分配" :value="3"></el-radio-button> -->
				<!-- <el-radio-button :label="0" value="待支付"></el-radio-button>
					<el-radio-button :label="1" value="待接单"></el-radio-button>
					<el-radio-button :label="2" value="待报价"></el-radio-button>
					<el-radio-button :label="3" value="待分配"></el-radio-button> -->
				<el-radio-button :label="0">待支付</el-radio-button>
				<el-radio-button :label="1">待接单</el-radio-button>
				<el-radio-button :label="2">待报价</el-radio-button>
				<el-radio-button :label="3">待分配</el-radio-button>
			</el-radio-group>
			<!-- <el-button
				v-permission="[ `GET ${api.orderPagelist}` ]" size="mini" class="filter-item" type="primary"
				icon="el-icon-search" style="margin-left:10px;" @click="getList"
				>
				查找
				</el-button> -->
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
			@refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '接单管理')"
		>
		</TableTools>

		<!-- 接单管理列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
			:api-path="api.orderPagelist" :columns="columns" page-alias="pageNo" size-alias="pageSize"
		>
			<template #createUserType="{ row }">
				<span>{{ row.createUserType }}</span>
			</template>
			<template #paymentMethod="{ row }">
				<span>{{ row.paymentMethod }}</span>
			</template>
			<template #deliveryType="{ row }">
				<span>{{ row.deliveryType }}</span>
			</template>
			<template #status="{ row }">
				<span>{{ row.status }}</span>
			</template>
			<template #isHasElevator="{ row }">
				<span>{{ row.isHasElevator }}</span>
			</template>
			<template #isDelete="{ row }">
				<span>{{ row.isDelete }}</span>
			</template>
			<template #signUrl="{ row }">
				<span>{{ row.signUrl }}</span>
			</template>
			<template #signatureUrl="{ row }">
				<span>{{ row.signatureUrl }}</span>
			</template>
			<template #exceptionUrl="{ row }">
				<span>{{ row.exceptionUrl }}</span>
			</template>
			<template #orderType="{ row }">
				<span>{{ row.orderType }}</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-permission="[ `POST ${api.staffUpdate}` ]" size="mini"
					@click="handleUpdate(row)"
				>
					报价
				</el-button>
				<el-button
					v-permission="[ `POST ${api.staffDelete}` ]" type="warning" size="mini"
					@click="handleDelete(row)"
				>
					接单
				</el-button>
				<el-button
					v-permission="[ `POST ${api.staffDelete}` ]" type="danger" size="mini"
					@click="handleDelete(row)"
				>
					分配
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
} from '@/api/orderManagement/order'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
// import EditModal from './components/EditModal'
import { columns } from './table'

export default {
	name: 'ReceivingList',
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
				localKey: 'receivingList',
				columnsOptions: columns
			},
			listQuery: {
				isZz: this.$store.state.user.typ,
				pageNo: 1,
				pageSize: 10,
				status: 0
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
