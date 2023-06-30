<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions">
		<div>

			<TableTools
				:custom-columns-config="customColumnsConfig" download custom-field
				@update-fields="updateFields" @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '累计会员')"
			>
			</TableTools>

			<!-- 佣金记录列表 -->
			<VxeTable
				ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="GET"
				:api-path="api.getByMenmberIdList" :columns="columns" page-alias="pageNo" size-alias="pageSize"
				:is-pager="false" :grid-options="{ rowConfig: { height: 60 }, height: '600px' }"
			>
				<template #avatar="{ row }">
					<div v-if="row.avatar" style="">
						<el-image
							lazy :src="row.avatar" style="width:40px; height:40px;border-radius: 50% 50%;" fit="cover"
							:preview-src-list="[ row.avatar ]"
						/>
					</div>
					<span v-else>--</span>
				</template>
			</VxeTable>

		</div>
	</el-dialog>
</template>

<script>
import { api } from '@/api/enterprise/commissionManagement'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
// import { getByMenmberIdList } from '@/api/enterprise/commissionManagement'
const columns = [
	{
		align: 'center',
		fixed: 'left',
		field: 'avatar',
		title: '头像',
		showOverflow: 'tooltip',
		slots: {
			default: 'avatar'
		},
		width: 150
	},
	{
		align: 'center',
		field: 'nickname',
		title: '昵称',
		width: 150
	},
	{
		align: 'center',
		field: 'mobile',
		title: '手机号',
		width: 150
	}
]

export default {
	name: 'AccumulatedMembership',
	components: {
		VxeTable,
		TableTools
	},
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '800px',
				title: '累计会员列表'
			},
			visible: false,
			formData: {
			},
			data: [],
			api,
			columns,
			customColumnsConfig: {
				localKey: 'accumulatedMembership',
				columnsOptions: columns
			},
			listQuery: {}
		}
	},
	methods: {
		// 自定义列
		updateFields(columns) {
			this.columns = columns
		},
		getList(meaning) {
			meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, pageNo: 1 }
		},
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.getList()
			// const loading = this.$elLoading('加载中')
			// getByMenmberIdList()
			// 	.then((res) => {
			// 		console.log(res)
			// 		this.data = res.data || []
			// 		loading.close()
			// 	})
			// 	.catch((e) => {
			// 		loading.close()
			// 	})
			this.visible = true
		}
	}
}
</script>

