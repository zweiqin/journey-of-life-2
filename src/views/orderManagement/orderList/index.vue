<template>
	<div class="app-container">

		<!-- 查询和其他操作 -->
		<div class="filter-container">
			<el-input
				v-model="listQuery.search" clearable class="filter-item" style="width: 400px;"
				placeholder="输入订单号码、订单费用、订单备注等" @keyup.enter.native="getList"
			/>
			<el-select
				v-model="listQuery.status" clearable class="filter-item"
				style="width: 200px;"
				placeholder="选择订单状态"
			>
				<el-option label="待分配" :value="3" />
				<el-option label="已分配" :value="4" />
				<el-option label="配送中" :value="5" />
				<el-option label="已完成" :value="6" />
				<el-option label="已取消" :value="7" />
			</el-select>
			<el-button
				v-permission="[ `GET ${api.orderPagelist}` ]" size="mini" class="filter-item" type="primary"
				icon="el-icon-search" style="margin-left:10px;" @click="getList"
			>
				查找
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
			@refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '订单管理')"
		>
			<el-button
				v-permission="[ `POST /admin${api.createOrder}` ]" size="mini" type="primary" icon="el-icon-plus"
				@click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' })"
			>
				添加
			</el-button>
		</TableTools>

		<!-- 订单管理列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
			:api-path="api.orderPagelist" :columns="columns" page-alias="pageNo" size-alias="pageSize"
		>
			<template #createUserType="{ row }">
				<span v-if="row.createUserType === 1">货主</span>
				<span v-else-if="row.createUserType === 2">物流</span>
				<span v-else-if="row.createUserType === 3">站长</span>
				<span v-else>--</span>
			</template>
			<template #paymentMethod="{ row }">
				<span v-if="row.paymentMethod === 1">现付</span>
				<span v-else-if="row.paymentMethod === 2">到付</span>
				<span v-else>--</span>
			</template>
			<template #deliveryType="{ row }">
				<span v-if="row.deliveryType === 1">送货安装</span>
				<span v-else-if="row.deliveryType === 2">送货到家</span>
				<span v-else-if="row.deliveryType === 3">送货到楼下</span>
				<span v-else-if="row.deliveryType === 4">客户自提</span>
				<span v-else>--</span>
			</template>
			<!-- <template #orderChargeDetails="{ row }">
				<div v-if="row.orderChargeDetails">
				<span>超距费：{{ JSON.parse(row.orderChargeDetails).exceedDistancePrice || '--' }}；</span>
				<span>超方费：{{ JSON.parse(row.orderChargeDetails).exceedPartyPrice || '--' }}；</span>
				<span>安装费用：{{ JSON.parse(row.orderChargeDetails).installAmount || '--' }}；</span>
				<span>起步价：{{ JSON.parse(row.orderChargeDetails).startPrice || '--' }}；</span>
				<span>订单总费用：{{ JSON.parse(row.orderChargeDetails).sumPrice || '--' }}；</span>
				<span>会员价：{{ JSON.parse(row.orderChargeDetails).vipPrice || '--' }}；</span>
				<span>上楼费：{{ JSON.parse(row.orderChargeDetails).upstairsPrice || '--' }}</span>
				</div>
				<span v-else>--</span>
				</template> -->
			<template #status="{ row }">
				<span v-if="row.status === 0">待支付</span>
				<span v-else-if="row.status === 1">待接单</span>
				<span v-else-if="row.status === 2">待报价</span>
				<span v-else-if="row.status === 3">待分配</span>
				<span v-else-if="row.status === 4">已分配</span>
				<span v-else-if="row.status === 5">配送中</span>
				<span v-else-if="row.status === 6">已完成</span>
				<span v-else-if="row.status === 7">已取消</span>
				<span v-else-if="row.status === 8">异常</span>
				<span v-else>--</span>
			</template>
			<template #isHasElevator="{ row }">
				<span v-if="row.isHasElevator === 0">无</span>
				<span v-else-if="row.isHasElevator === 1">有</span>
				<span v-else>--</span>
			</template>
			<template #isDelete="{ row }">
				<span v-if="row.isDelete === 0">未删除</span>
				<span v-else-if="row.isDelete === 1">已删除</span>
				<span v-else>--</span>
			</template>
			<template #signUrl="{ row }">
				<div v-if="row.signUrl && row.signUrl.split(',').length">
					<el-image :src="row.signUrl.split(',')[0]" style="width:40px; height:40px" fit="cover" :preview-src-list="row.signUrl.split(',')" />
					<span v-if="row.signUrl.split(',').length > 1" style="margin-left:8px;">+{{ row.signUrl.split(',').length }}</span>
				</div>
				<span v-else>--</span>
			</template>
			<template #signatureUrl="{ row }">
				<div v-if="row.signatureUrl && row.signatureUrl.split(',').length">
					<el-image :src="row.signatureUrl.split(',')[0]" style="width:40px; height:40px" fit="cover" :preview-src-list="row.signatureUrl.split(',')" />
					<span v-if="row.signatureUrl.split(',').length > 1" style="margin-left:8px;">+{{ row.signatureUrl.split(',').length }}</span>
				</div>
				<span v-else>--</span>
			</template>
			<template #exceptionUrl="{ row }">
				<div v-if="row.exceptionUrl && row.exceptionUrl.split(',').length">
					<el-image :src="row.exceptionUrl.split(',')[0]" style="width:40px; height:40px" fit="cover" :preview-src-list="row.exceptionUrl.split(',')" />
					<span v-if="row.exceptionUrl.split(',').length > 1" style="margin-left:8px;">+{{ row.exceptionUrl.split(',').length }}</span>
				</div>
				<span v-else>--</span>
			</template>
			<template #orderType="{ row }">
				<span v-if="row.orderType === 1">常规单</span>
				<span v-else-if="row.orderType === 2">加急单</span>
				<span v-else-if="row.orderType === 3">顺路单</span>
				<span v-else>--</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-permission="[ `POST ${api.getOrderInfo}` ]" size="mini"
					@click="$refs.DetailModal && $refs.DetailModal.handleOpen(row)"
				>
					详情
				</el-button>
				<el-button
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
				</el-button>
			</template>
		</VxeTable>

		<!-- 新增编辑 -->
		<EditModal ref="EditModal" @success="getList" />
		<!-- 分配 -->
		<Distribution ref="Distribution" @success="getList" />
		<!-- 追加金额 -->
		<AdditionalAmount ref="AdditionalAmount" @success="getList" />
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
import Distribution from './components/Distribution'
import AdditionalAmount from './components/AdditionalAmount'
import EditModal from './components/EditModal'
import DetailModal from './components/DetailModal'
import { columns } from './table'

export default {
	name: 'OrderList',
	components: {
		VxeTable,
		TableTools,
		EditModal,
		DetailModal,
		Distribution,
		AdditionalAmount
	},
	filters: {},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'orderList',
				columnsOptions: columns
			},
			listQuery: {
				isZz: this.$store.state.user.typ,
				pageNo: 1,
				pageSize: 10,
				status: 3,
				search: ''
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
		}
		// handleUpdate({ id, value, sortOrder }) {
		// 	this.$refs.EditModal && this.$refs.EditModal.handleOpen({ id, value, sortOrder })
		// }
		// async handleDelete({ id }) {
		// 	await this.$elConfirm('确认删除?')
		// 	await staffDelete({ id })
		// 	this.$elMessage('删除成功!')
		// 	this.getList()
		// }
	}
}
</script>
