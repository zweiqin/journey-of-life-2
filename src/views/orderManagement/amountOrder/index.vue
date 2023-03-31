<template>
	<div class="app-container">

		<!-- 查询和其他操作 -->
		<div class="filter-container">
			<el-input
				v-model="listQuery.search" clearable class="filter-item" style="width: 400px;"
				placeholder="输入追加订单号，平台订单号、追加原因、需求说明" @keyup.enter.native="getList"
			/>
			<el-select v-model="listQuery.status" size="mini" class="filter-item" clearable placeholder="请选择审核状态">
				<el-option label="待审核" :value="0" />
				<el-option label="已通过且已支付" :value="1" />
				<el-option label="已拒绝" :value="2" />
			</el-select>
			<el-button
				v-permission="[ `POST ${api.queryExtraList}` ]" size="mini" class="filter-item" type="primary"
				icon="el-icon-search" style="margin-left:10px;" @click="getList"
			>
				查找
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
			@refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '追加金额订单')"
		>
		</TableTools>

		<!-- 追加金额订单列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
			:api-path="api.queryExtraList" :columns="columns" page-alias="pageNo" size-alias="pageSize"
		>
			<template #status="{ row }">
				<el-tag v-if="row.status === 0">待付款</el-tag>
				<el-tag v-else-if="row.status === 1">待接单</el-tag>
				<el-tag v-else-if="row.status === 2" type="success">待报价</el-tag>
				<el-tag v-else-if="row.status === 3">待分配</el-tag>
				<el-tag v-else-if="row.status === 4" type="success">已分配</el-tag>
				<el-tag v-else-if="row.status === 5" type="success">配送中</el-tag>
				<el-tag v-else-if="row.status === 6" type="info">已完成</el-tag>
				<el-tag v-else-if="row.status === 7" type="info">已取消</el-tag>
				<el-tag v-else-if="row.status === 8" type="danger">异常</el-tag>
				<span v-else>--</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-permission="[ `POST ${api.getOrderExtraInfo}` ]" size="mini"
					@click="$refs.DetailModal && $refs.DetailModal.handleOpen(row)"
				>
					详情
				</el-button>
				<!-- <el-button
					v-permission="[ `POST ${api.createOrderExtra}` ]" type="warning" size="mini" :disabled="row.status == 7 || row.status == 8"
					@click="$refs.AdditionalAmount && $refs.AdditionalAmount.handleOpen(row)"
					>
					追加金额
					</el-button>
					<el-button
					v-permission="[ `POST ${api.updateByOrderNoStatus}` ]" type="danger" size="mini" :disabled="row.status != 3"
					@click="$refs.Distribution && $refs.Distribution.handleOpen(row)"
					>
					分配
					</el-button> -->
			</template>
		</VxeTable>

		<!-- 查看详情 -->
		<DetailModal ref="DetailModal" @success="getList" />
	</div>
</template>

<script>
import {
	api
} from '@/api/orderManagement/order'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import DetailModal from './components/DetailModal'
import { columns } from './table'

export default {
	name: 'AmountOrder',
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
				localKey: 'amountOrder',
				columnsOptions: columns
			},
			listQuery: {
				pageNo: 1,
				pageSize: 20,
				search: '',
				status: 0
			}
		}
	},
	computed: {},
	created() {
	},
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
