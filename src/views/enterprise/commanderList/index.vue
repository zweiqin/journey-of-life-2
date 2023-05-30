<template>
	<div class="app-container">

		<div class="other-container">
			<div style="display: flex;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
				<div
					style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
				>
				</div>
				<div>团长列表</div>
			</div>
		</div>
		<!-- 查询和其他操作 -->
		<div
			class="filter-container"
			style="padding: 20px 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-bottom: 0;border-radius: 6px 6px 0 0;"
		>
			<el-input
				v-model="listQuery.search" clearable class="filter-item"
				style="width: 300px;border: 1px solid #64748B;border-radius: 4px;" placeholder="请输入团长名称/号码"
				@keyup.enter.native="getList"
			/>
			<el-button
				v-permission="[ `POST ${api.getPartnerList}` ]" size="mini" class="filter-item" type="primary"
				icon="el-icon-search" style="margin-left:10px;" @click="getList"
			>
				查询
			</el-button>
			<el-button
				v-permission="[ `POST ${api.getPartnerList}` ]" size="mini" class="filter-item" type="info"
				plain
				style="margin-left:10px;padding: 7px 22px;border: 0;" @click="(listQuery.search = '') || getList()"
			>
				重置
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;"
			@update-fields="updateFields" @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '团长列表')"
		>
			<el-button
				v-permission="[ `POST ${api.savePartner}` ]" size="mini" type="success"
				icon="el-icon-plus" style="border: 0;"
				@click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' }, 2)"
			>
				添加团长
			</el-button>
		</TableTools>

		<!-- 客户管理列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
			:api-path="api.getPartnerList" :columns="columns" page-alias="pageNo" size-alias="pageSize"
			:grid-options="{ rowConfig: { height: 60 } }"
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);"
		>
			<template #status="{ row }">
				<el-tag v-if="row.status === 1" type="warning">已申请</el-tag>
				<el-tag v-else-if="row.status === 2">开始审核</el-tag>
				<el-tag v-else-if="row.status === 3" type="success">审核通过</el-tag>
				<el-tag v-else-if="row.status === 4" type="danger">审核不通过</el-tag>
				<span v-else>--</span>
			</template>
			<template #sfUserWorkCity="{ row }">
				<span v-if="row.sfUserWorkCity" style="position: relative;display: inline-block;height: 39px;overflow: hidden;text-overflow: ellipsis;word-break: break-all;white-space: normal !important;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
					<span v-if="row.sfUserWorkCity.split(',').length > 1">
						<span>{{ row.sfUserWorkCity.match(/^[^,]*(?=,)/)[0] }}</span>
						<div style="position: absolute;top: 52%;right: 10px;width: fit-content;color: #6956E5;background-color: #ffffff;cursor: pointer;" @click="$refs.DetailModalWC && $refs.DetailModalWC.handleOpen(row, 'area')">更多</div>
					</span>
					<span v-else>{{ row.sfUserWorkCity }}</span>
				</span>
				<span v-else>--</span>
			</template>
			<template #zzUserServerCity="{ row }">
				<span>{{ row.zzUserServerCity ? JSON.parse(row.zzUserServerCity).map(item => item.join(' ')).join('，\n') : '--' }}</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-permission="[ `GET ${api.getPartnerInfo}` ]" size="mini" type="text" style="color: #2E8982;"
					@click="$refs.DetailModal && $refs.DetailModal.handleOpen(row, 2)"
				>
					详情
				</el-button>
				<el-button
					v-permission="[ `DELETE ${api.deleteByPartner}` ]" type="danger" size="mini"
					@click="handleDelete(row)"
				>
					取消指定
				</el-button>
			</template>
		</VxeTable>

		<!-- 新增编辑 -->
		<EditModal ref="EditModal" @success="getList" />
		<!-- 查看详情 -->
		<DetailModal ref="DetailModal" @success="getList" />
		<!-- 主营区域 -->
		<DetailModalWC ref="DetailModalWC" @success="getList" />
	</div>
</template>

<script>
import {
	api,
	deleteByPartner
} from '@/api/enterprise/communityMember'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from '../partnerList/components/EditModal'
import DetailModal from '../partnerList/components/DetailModal'
import DetailModalWC from '../partnerList/components/DetailModalWC'
import { columns } from './table'

export default {
	name: 'CommanderList',
	components: {
		VxeTable,
		TableTools,
		EditModal,
		DetailModal,
		DetailModalWC
	},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'commanderList',
				columnsOptions: columns
			},
			listQuery: {
				pageNo: 1,
				pageSize: 20,
				type: 2,
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
		// handleEdit(row) {
		// 	this.$refs.EditModal && this.$refs.EditModal.handleOpen(row)
		// },
		async handleDelete({ id }) {
			await this.$elConfirm('确认取消指定?')
			await deleteByPartner({ ids: [ id ].join(',') })
			this.$elMessage('取消指定成功!')
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
