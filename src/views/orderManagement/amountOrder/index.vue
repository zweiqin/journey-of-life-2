<template>
	<div class="app-container">

		<div class="other-container">
			<div style="display: flex;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
				<div
					style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
				>
				</div>
				<div>追加金额订单</div>
			</div>
		</div>
		<!-- 查询和其他操作 -->
		<div
			class="filter-container"
			style="padding: 20px 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-bottom: 0;border-radius: 6px 6px 0 0;"
		>
			<el-input
				v-model="listQuery.search" clearable class="filter-item"
				style="width: 350px;border: 1px solid #64748B;border-radius: 4px;" placeholder="请输入追加订单号/平台订单号/追加原因/需求说明等"
				@keyup.enter.native="getList"
			/>
			<el-select
				v-model="listQuery.status" size="mini" class="filter-item" clearable
				placeholder="请选择审核状态"
				style="border: 1px solid #64748B;border-radius: 4px;"
			>
				<el-option label="待审核" :value="0" />
				<el-option label="已通过且已支付" :value="1" />
				<el-option label="已拒绝" :value="2" />
			</el-select>
			<el-button
				v-permission="[ `POST ${api.queryExtraList}` ]" size="mini" class="filter-item" type="primary"
				style="margin-left:10px;padding: 7px 22px;" @click="getList"
			>
				查询
			</el-button>
			<el-button
				v-permission="[ `GET ${api.queryExtraList}` ]" size="mini" class="filter-item" type="info"
				plain
				style="margin-left:10px;padding: 7px 22px;border: 0;"
				@click="(listQuery.status = 0) || (listQuery.search = '') || getList()"
			>
				重置
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;"
			@update-fields="updateFields" @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '追加金额订单')"
		>
		</TableTools>

		<!-- 追加金额订单列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
			:api-path="api.queryExtraList" :columns="columns" page-alias="pageNo" size-alias="pageSize"
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);"
		>
			<template #orderNo="{ row }">
				<span style="color: #0519D4;">{{ row.orderNo || '--' }}</span>
			</template>
			<template #createTime="{ row }">
				<span style="color: #007F75;">{{ row.createTime || '--' }}</span>
			</template>
			<template #extraPrice="{ row }">
				<span style="color: #FA5151;">￥ {{ row.extraPrice || row.extraPrice === 0 ? row.extraPrice : '--' }}</span>
			</template>
			<template #status="{ row }">
				<el-tag v-if="row.status === 0" type="danger">待付款</el-tag>
				<el-tag v-else-if="row.status === 1">待接单</el-tag>
				<el-tag v-else-if="row.status === 2" type="success">待报价</el-tag>
				<el-tag v-else-if="row.status === 3">待分配</el-tag>
				<el-tag v-else-if="row.status === 4" type="success">已分配</el-tag>
				<el-tag v-else-if="row.status === 5" type="success">待到场</el-tag>
				<el-tag v-else-if="row.status === 31" type="success">待完成</el-tag>
				<el-tag v-else-if="row.status === 6" type="info">已完成</el-tag>
				<el-tag v-else-if="row.status === 7" type="info">已取消</el-tag>
				<el-tag v-else-if="row.status === 8" type="danger">异常</el-tag>
				<span v-else>--</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-permission="[ `POST ${api.getOrderExtraInfo}` ]" size="mini" type="text" style="color: #2E8982;"
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

<style lang="scss" scoped>
.app-container {
	height: 100%;
	background-color: #f5f6f7;
	padding: 20px 20px;
}

.el-tag {
	height: auto;
	padding: 4px 10px;
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

/deep/ .el-button--primary.is-disabled {
	color: #FFFFFF;
	background-color: #a0cfff;
	border-color: #a0cfff;
}
</style>
