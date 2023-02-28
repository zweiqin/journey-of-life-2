<template>
	<div class="app-container">

		<!-- 查询和其他操作 -->
		<!-- <div class="filter-container">
			<el-radio-group v-model="listQuery.isCooperationOrisBlacklist" class="filter-item" size="mini" @input="handleStatusChange">
			<el-radio-button :label="null">全部</el-radio-button>
			<el-radio-button :label="1">合作中</el-radio-button>
			<el-radio-button :label="2">已拉黑</el-radio-button>
			</el-radio-group>
			</div> -->

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field @update-fields="updateFields"
			@refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '师傅管理')"
		>
		</TableTools>

		<!-- 师傅管理列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
			:api-path="api.getMasterPageList" :columns="columns" page-alias="pageNo" size-alias="pageSize"
			:is-pager="false"
		>
			<template #gender="{ row }">
				<span v-if="row.gender === 0">男</span>
				<span v-else-if="row.gender === 1">女</span>
				<span v-else>--</span>
			</template>
			<template #headUrl="{ row }">
				<el-image v-if="row.headUrl" lazy :src="row.headUrl" style="width:80px; height:80px" fit="cover" :preview-src-list="[ row.headUrl ]" />
				<span v-else>--</span>
			</template>
			<template #certImg1="{ row }">
				<el-image v-if="row.certImg1" lazy :src="row.certImg1" style="width:80px; height:80px" fit="cover" :preview-src-list="[ row.certImg1 ]" />
				<span v-else>--</span>
			</template>
			<template #certImg2="{ row }">
				<el-image v-if="row.certImg2" lazy :src="row.certImg2" style="width:80px; height:80px" fit="cover" :preview-src-list="[ row.certImg2 ]" />
				<span v-else>--</span>
			</template>
			<template #driverNoPath="{ row }">
				<el-image v-if="row.driverNoPath" lazy :src="row.driverNoPath" style="width:80px; height:80px" fit="cover" :preview-src-list="[ row.driverNoPath ]" />
				<span v-else>--</span>
			</template>
			<template #driverLicensePath="{ row }">
				<el-image v-if="row.driverLicensePath" lazy :src="row.driverLicensePath" style="width:80px; height:80px" fit="cover" :preview-src-list="[ row.driverLicensePath ]" />
				<span v-else>--</span>
			</template>
			<template #skillList="{ row }">
				<span>{{ row.skillList }}</span>
			</template>
			<template #workState="{ row }">
				<span v-if="row.workState === 0">在职</span>
				<span v-else-if="row.workState === 1">离职</span>
				<span v-else>--</span>
			</template>
			<template #state="{ row }">
				<span v-if="row.state === 0">有效</span>
				<span v-else-if="row.state === 1">无效</span>
				<span v-else>--</span>
			</template>
			<template #typ="{ row }">
				<span>{{ row.typ }}</span>
			</template>
			<template #carImg="{ row }">
				<el-image v-if="row.carImg" lazy :src="row.carImg" style="width:80px; height:80px" fit="cover" :preview-src-list="[ row.carImg ]" />
				<span v-else>--</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-if="(listQuery.isCooperationOrisBlacklist == null)" v-permission="[ `POST ${api.staffDelete}` ]" type="primary"
					size="mini" @click="handleUpdate(row, 1, 1, '进行合作')"
				>
					进行合作
				</el-button>
				<el-button
					v-if="(listQuery.isCooperationOrisBlacklist == 1)" v-permission="[ `POST ${api.staffDelete}` ]" type="danger"
					size="mini" @click="handleUpdate(row, 2, 1, '进行拉黑')"
				>
					进行拉黑
				</el-button>
				<el-button
					v-if="(listQuery.isCooperationOrisBlacklist == 1)" v-permission="[ `POST ${api.staffDelete}` ]" type="danger"
					size="mini" @click="handleUpdate(row, 1, 0, '取消合作')"
				>
					取消合作
				</el-button>
				<el-button
					v-if="(listQuery.isCooperationOrisBlacklist == 2)" v-permission="[ `POST ${api.staffDelete}` ]" type="warning"
					size="mini" @click="handleUpdate(row, 2, 0, '取消拉黑')"
				>
					取消拉黑
				</el-button>
			</template>
		</VxeTable>

		<!-- 新增编辑 -->
		<!-- <EditModal ref="EditModal" :list="statusList" @success="getList" /> -->
	</div>
</template>

<script>
import {
	api,
	saveOrDeleteWorker
} from '@/api/enterprise/master'
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
				isCooperationOrisBlacklist: null
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
		async handleUpdate(row, isHz, status, text) {
			await this.$elConfirm(`确认${text}？`)
			await saveOrDeleteWorker({
				zzuserId: this.$store.state.user.userId,
				sfuserId: row.id,
				isHz,
				status
			})
			this.$elMessage()
			this.getList('keepPage')
		}
	}
}
</script>
