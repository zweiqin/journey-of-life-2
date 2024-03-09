<template>
	<!-- 接单管理列表 -->
	<VxeTable
		ref="vxeTable"
		v-model="listQuery"
		:is-request="isRequest"
		request-method="request2"
		local-key="orderCancellationTable"
		api-method="POST"
		:api-path="api.parOneTnerOrder"
		:columns="columns"
		page-alias="page"
		size-alias="pageSize"
		res-alias="list"
		:grid-options="{
			rowConfig: { height: 60 },
			tooltipConfig: { showAll: true, enterDelay: 800 }
		}"
		style="
        padding: 0 20px;
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-top: 0;
        border-bottom: 0;
        box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);
      "
	>
		<template #state="{ row }">
			<el-tag :type="row.state ? 'danger' : ''">
				{{
					['待付款', '待发货', '待收货', '已完成', '已取消', '待成团', '待售后', '待核销', '待核销已付款', '已核销'][row.state - 1]
				}}
			</el-tag>
		</template>
		<template #haldelFunction="{ row }">
			<el-button
				v-if="row.state === 8 || row.state === 9"
				size="mini"
				@click="hadelOrderCancellation(row)"
			>
				核销订单
			</el-button>
		</template>
	</VxeTable>
</template>

<script>
import VxeTable from '@/components/VxeTable'
import { api, cancellationWrite } from '@/api/packagesManagement'

export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'OrderCancellationTable',
	components: {
		VxeTable
	},
	props: {
		listQuery: {
			type: Object,
			default: () => ({})
		},
		isRequest: {
			type: Boolean,
			default: false
		},
		columns: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			api
		}
	},
	methods: {
		hadelOrderCancellation(row) {
			// console.log(row)
			this.$confirm('请确认订单已经核销完毕', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					cancellationWrite({
						orderId: row.orderId,
						noticeId: '0'
					})
						.then((res) => {
							this.$message({
								type: 'success',
								message: '核销成功!'
							})
						})
						.catch((err) => {
							this.$message.error('核销失败', err)
						})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消核销'
					})
				})
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
