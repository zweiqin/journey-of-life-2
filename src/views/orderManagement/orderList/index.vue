<template>
	<div class="app-container">

		<div class="other-container">
			<div style="display: flex;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
				<div
					style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;">
				</div>
				<div>订单列表</div>
			</div>
		</div>
		<!-- 查询和其他操作 -->
		<div class="filter-container"
			style="padding: 20px 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-bottom: 0;border-radius: 6px 6px 0 0;">
			<el-input v-model="listQuery.search" clearable class="filter-item"
				style="width: 400px;border: 1px solid #64748B;border-radius: 4px;" placeholder="请输入订单号码/手机号码/姓名等"
				@keyup.enter.native="getList" />
			<!-- <el-select
				v-model="listQuery.status" clearable class="filter-item"
				style="width: 200px;"
				placeholder="选择订单状态"
				>
				<el-option label="全部" :value="null" />
				<el-option label="待分配" :value="3" />
				<el-option label="已分配" :value="4" />
				<el-option label="待到场" :value="5" />
				<el-option label="待完成" :value="31" />
				<el-option label="已完成" :value="6" />
				<el-option label="已取消" :value="7" />
				</el-select> -->
			<el-button v-permission="[`GET ${api.orderPagelist}`]" size="mini" class="filter-item" type="primary"
				style="margin-left:10px;padding: 7px 22px;border: 0;" @click="getList">
				查询
			</el-button>
			<el-button v-permission="[`GET ${api.orderPagelist}`]" size="mini" class="filter-item" type="info" plain
				style="margin-left:10px;padding: 7px 22px;border: 0;"
				@click="(listQuery.status = null) || (listQuery.search = '') || getList()">
				重置
			</el-button>
		</div>

		<TableTools :custom-columns-config="customColumnsConfig" download custom-field
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;"
			@update-fields="updateFields" @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '订单管理')">
			<el-radio-group v-model="listQuery.status" class="filter-item" size="mini" @input="getList">
				<el-radio-button :label="null">全部</el-radio-button>
				<el-radio-button :label="3">待分配</el-radio-button>
				<el-radio-button :label="4">已分配</el-radio-button>
				<el-radio-button :label="5">待到场</el-radio-button>
				<el-radio-button :label="31">待完成</el-radio-button>
				<el-radio-button :label="6">已完成</el-radio-button>
				<el-radio-button :label="7">已取消</el-radio-button>
			</el-radio-group>
			<el-button v-permission="[`POST /admin${api.createOrder}`]" size="mini" type="success" icon="el-icon-plus"
				@click="$refs.EditModal && $refs.EditModal.handleOpen({ orderNo: '' }, 2)">
				创建
			</el-button>
		</TableTools>

		<!-- 订单管理列表 -->
		<VxeTable ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
			:api-path="api.orderPagelist" :columns="columns" page-alias="pageNo" size-alias="pageSize"
			:grid-options="{ rowConfig: { height: 60 }, tooltipConfig: { showAll: true, enterDelay: 800 } }"
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);">
			<template #orderNo="{ row }">
				<span style="color: #0519D4;">{{ row.orderNo || '--' }}</span>
			</template>
			<template #senderName="{ row }">
				<div>{{ row.senderName || '--' }}</div>
				<div>{{ row.senderMobile || '--' }}</div>
			</template>
			<template #consigneeName="{ row }">
				<div> <span class="biz-tag" v-if="row.bizType === 3">企业</span> {{ row.consigneeName || '--' }}</div>
				<div>{{ row.consigneeMobile || '--' }}</div>
			</template>
			<!-- <template #createUserType="{ row }">
				<span v-if="row.createUserType === 1">货主</span>
				<span v-else-if="row.createUserType === 2">物流</span>
				<span v-else-if="row.createUserType === 3">店长</span>
				<span v-else>--</span>
				</template>
				<template #paymentMethod="{ row }">
				<span v-if="row.paymentMethod === 1">现付</span>
				<span v-else-if="row.paymentMethod === 2">到付</span>
				<span v-else>--</span>
				</template> -->
			<template #subscribeTime="{ row }">
				<span style="color: #007F75;">{{ row.subscribeTime || '--' }}</span>
			</template>
			<template #installDate="{ row }">
				<div
					v-if="row.installDate && Date.now() - Date.parse(row.installDate) <= 3600000 && Date.now() - Date.parse(row.installDate) > 0"
					style="width: 100%;">
					<div style="width: 65%;margin-left: 25%;font-size: 12px;">
						<div style="padding: 1px 10px;color: #FFFFFF;background-color: #fa5151;border-radius: 5px;">时间不足1h</div>
						<div style="height: 4px;background-color: #fa5151;clip-path: polygon(0px 0px, 80% 0, 85% 4px, 75% 0);"></div>
					</div>
				</div>
				<div style="color: #E95D20;">{{ row.installDate || '--' }}</div>
			</template>
			<template #orderType="{ row }">
				<el-tag v-if="row.orderType === 1" type="success">常规单</el-tag>
				<el-tag v-else-if="row.orderType === 2" type="danger">加急单</el-tag>
				<el-tag v-else-if="row.orderType === 3">顺路单</el-tag>
				<span v-else>--</span>
			</template>
			<template #deliveryType="{ row }">
				<span v-if="row.deliveryType === 1">送货安装</span>
				<span v-else-if="row.deliveryType === 2">送货到家</span>
				<span v-else-if="row.deliveryType === 3">送货到楼下</span>
				<span v-else-if="row.deliveryType === 4">客户自提</span>
				<span v-else>--</span>
			</template>
			<template #price="{ row }">
				<span style="color: #FA5151;">￥ {{ row.price || row.price === 0 ? row.price : '--' }}</span>
			</template>
			<template #brokerage="{ row }">
				<span>￥ {{ row.brokerage || row.brokerage === 0 ? row.brokerage : '--' }}</span>
			</template>
			<template #arrivalPrice="{ row }">
				<span>￥ {{ row.arrivalPrice || row.arrivalPrice === 0 ? row.arrivalPrice : '--' }}</span>
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
				<el-tag v-if="row.status === 0" type="danger">待付款</el-tag>
				<el-tag v-else-if="row.status === 1" style="color: #F17850;background-color: #fff6dc;">待接单</el-tag>
				<el-tag v-else-if="row.status === 2">待报价</el-tag>
				<el-tag v-else-if="row.status === 3">待分配</el-tag>
				<el-tag v-else-if="row.status === 4" type="success">已分配</el-tag>
				<el-tag v-else-if="row.status === 5" type="success">待到场</el-tag>
				<el-tag v-else-if="row.status === 31" type="success">待完成</el-tag>
				<el-tag v-else-if="row.status === 6" type="info">已完成</el-tag>
				<el-tag v-else-if="row.status === 7" type="info">已取消</el-tag>
				<el-tag v-else-if="row.status === 8" type="danger">异常</el-tag>
				<span v-else>--</span>
			</template>
			<!-- <template #isHasElevator="{ row }">
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
				</template> -->
			<template #operate="{ row }">
				<el-button v-permission="[`POST ${api.getOrderInfo}`]" size="mini" type="text" style="color: #2E8982;"
					@click="$refs.DetailModal && $refs.DetailModal.handleOpen(row)">
					详情
				</el-button>
				<el-button v-if="row.status == 2" v-permission="[`POST ${api.orderOfferSuccess}`]" size="mini" type="primary"
					@click="$refs.OrderOffer && $refs.OrderOffer.handleOpen(row)">
					报价
				</el-button>
				<el-button
					v-if="!(row.status == 2 || row.status == 0 || row.status == 1 || row.status == 3 || row.status == 7 || row.status == 8)"
					v-permission="[`POST ${api.createOrderExtra}`]" type="warning" size="mini"
					@click="$refs.AdditionalAmount && $refs.AdditionalAmount.handleOpen(row)">
					追加金额
				</el-button>
				<el-button v-if="row.status == 1" v-permission="[`POST ${api.updateByOrderNoStatus}`]" type="danger" size="mini"
					@click="handleUpdate(row)">
					接单
				</el-button>
				<el-button v-if="row.status == 3" v-permission="[`POST ${api.updateByOrderNoStatus}`]" type="primary"
					size="mini" @click="$refs.Distribution && $refs.Distribution.handleOpen(row)">
					分配
				</el-button>
				<el-button v-if="row.status == 4 || row.status == 5" v-permission="[`POST ${api.replaceMaster}`]" type="danger"
					size="mini" @click="$refs.MasterReplace && $refs.MasterReplace.handleOpen(row)">
					更换师傅
				</el-button>
			</template>
		</VxeTable>

		<!-- 报价 -->
		<OrderOffer ref="OrderOffer" @success="getList" />
		<!-- 新增编辑 -->
		<EditModal ref="EditModal" @success="getList" />
		<!-- 分配 -->
		<Distribution ref="Distribution" @success="getList" />
		<!-- 追加金额 -->
		<AdditionalAmount ref="AdditionalAmount" @success="getList" />
		<!-- 更换师傅 -->
		<MasterReplace ref="MasterReplace" @success="getList" />
		<!-- 查看详情 -->
		<DetailModal ref="DetailModal" @success="getList" />
	</div>
</template>

<script>
import {
	api,
	zzReceiveAnOrder
} from '@/api/orderManagement/order'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import OrderOffer from './components/OrderOffer'
import Distribution from './components/Distribution'
import AdditionalAmount from './components/AdditionalAmount'
import MasterReplace from './components/MasterReplace'
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
		OrderOffer,
		Distribution,
		AdditionalAmount,
		MasterReplace
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
				pageSize: 20,
				status: null,
				search: '',
				orderType: 1
			}
		}
	},
	computed: {},
	created() {
		this.$route.query.search ? this.handleChangeQuery({ search: this.$route.query.search }) : ''
	},
	mounted() { },
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
		async handleUpdate({ orderNo }) {
			await this.$elConfirm(`确认接单？`)
			await zzReceiveAnOrder({
				orderNo
				// status: 3
			})
			this.$elMessage()
			this.getList()
		},
		// async handleDelete({ id }) {
		// 	await this.$elConfirm('确认删除?')
		// 	await staffDelete({ id })
		// 	this.$elMessage('删除成功!')
		// 	this.getList()
		// }
		handleChangeQuery({ search }) {
			this.listQuery = { ...this.listQuery, pageNo: 1, search }
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

/deep/ .el-button--warning {
	background-color: #ff8c00;
	border-color: #ff8c00;
}

/deep/ .el-button--warning:active {
	background: #e6a700;
	border-color: #e6a700;
	color: #FFFFFF;
	outline: none;
}

/deep/ .el-button--warning:hover {
	background: #ffc833;
	border-color: #ffc833;
	color: #FFFFFF;
}

/deep/ .table-tools {
	.el-radio-group {
		label {
			.el-radio-button__inner {
				border: 0;
			}
		}

		label.is-active {
			.el-radio-button__inner {
				color: #4D70FF;
				background-color: #f1f4ff;
				box-shadow: none;
			}
		}
	}
}

.biz-tag{
	padding: 2px 5px;
	border-radius: 4px;
	background-color: #0519d4;
	color: #fff;
	font-size: 12px;
	transform: scale(0.7);
	display: inline-block;
	margin-left: -4px;
}
</style>
