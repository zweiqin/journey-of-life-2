<template>
	<div class="app-container">

		<!-- 查询和其他操作 -->
		<div class="filter-container">
			<el-input
				v-model="listQuery.search" clearable class="filter-item" style="width: 400px;"
				placeholder="输入师傅姓名、师傅身份证号、师傅手机号等" @keyup.enter.native="getList"
			/>
			<el-button
				v-permission="[ `GET ${api.getMasterPageList}` ]" size="mini" class="filter-item" type="primary"
				icon="el-icon-search" style="margin-left:10px;" @click="getList"
			>
				查找
			</el-button>
		</div>

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
			<!-- <template #headUrl="{ row }">
				<el-popover v-if="row.headUrl" placement="top-start" width="150" trigger="click">
				<div style="height:79px;overflow: auto;">
				<el-image lazy :src="row.headUrl" style="width:80px; height:80px" fit="cover" :preview-src-list="[ row.headUrl ]" />
				</div>
				<el-button slot="reference" @click="handlePopClick">查看</el-button>
				</el-popover>
				<span v-else>--</span>
				</template>
				<template #certImg1="{ row }">
				<el-popover v-if="row.certImg1" placement="top-start" width="150" trigger="click">
				<div style="height:79px;overflow: auto;">
				<el-image lazy :src="row.certImg1" style="width:80px; height:80px" fit="cover" :preview-src-list="[ row.certImg1 ]" />
				</div>
				<el-button slot="reference" @click="handlePopClick">查看</el-button>
				</el-popover>
				<span v-else>--</span>
				</template>
				<template #certImg2="{ row }">
				<el-popover v-if="row.certImg2" placement="top-start" width="150" trigger="click">
				<div style="height:79px;overflow: auto;">
				<el-image lazy :src="row.certImg2" style="width:80px; height:80px" fit="cover" :preview-src-list="[ row.certImg2 ]" />
				</div>
				<el-button slot="reference" @click="handlePopClick">查看</el-button>
				</el-popover>
				<span v-else>--</span>
				</template>
				<template #driverNoPath="{ row }">
				<el-popover v-if="row.driverNoPath" placement="top-start" width="150" trigger="click">
				<div style="height:79px;overflow: auto;">
				<el-image lazy :src="row.driverNoPath" style="width:80px; height:80px" fit="cover" :preview-src-list="[ row.driverNoPath ]" />
				</div>
				<el-button slot="reference" @click="handlePopClick">查看</el-button>
				</el-popover>
				<span v-else>--</span>
				</template>
				<template #driverLicensePath="{ row }">
				<el-popover v-if="row.driverLicensePath" placement="top-start" width="150" trigger="click">
				<div style="height:79px;overflow: auto;">
				<el-image lazy :src="row.driverLicensePath" style="width:80px; height:80px" fit="cover" :preview-src-list="[ row.driverLicensePath ]" />
				</div>
				<el-button slot="reference" @click="handlePopClick">查看</el-button>
				</el-popover>
				<span v-else>--</span>
				</template> -->
			<template #skillList="{ row }">
				<span>{{ row.skillList }}</span>
			</template>
			<template #workCity="{ row }">
				<span>{{ row.workCity ? row.workCity.replaceAll(',', '，\n') : '--' }}</span>
			</template>
			<template #serverCity="{ row }">
				<span>{{ row.serverCity ? JSON.parse(row.serverCity).map(item => item.join(' ')).join('，\n') : '--' }}</span>
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
			<!-- <template #carImg="{ row }">
				<el-image v-if="row.carImg" lazy :src="row.carImg" style="width:80px; height:80px" fit="cover" :preview-src-list="[ row.carImg ]" />
				<span v-else>--</span>
				</template> -->
			<template #operate="{ row }">
				<el-button
					v-permission="[ `POST ${api.saveOrDeleteWorker}` ]" size="mini"
					@click="$refs.DetailModal && $refs.DetailModal.handleOpen(row)"
				>
					详情
				</el-button>
				<el-button
					v-if="(listQuery.isCooperationOrisBlacklist == null)" v-permission="[ `POST ${api.saveOrDeleteWorker}` ]" type="primary"
					size="mini" @click="handleUpdate(row, 1, 1, '进行合作')"
				>
					进行合作
				</el-button>
				<el-button
					v-if="(listQuery.isCooperationOrisBlacklist == 1)" v-permission="[ `POST ${api.saveOrDeleteWorker}` ]" type="danger"
					size="mini" @click="handleUpdate(row, 2, 1, '进行拉黑')"
				>
					进行拉黑
				</el-button>
				<el-button
					v-if="(listQuery.isCooperationOrisBlacklist == 1)" v-permission="[ `POST ${api.saveOrDeleteWorker}` ]" type="danger"
					size="mini" @click="handleUpdate(row, 1, 0, '取消合作')"
				>
					取消合作
				</el-button>
				<el-button
					v-if="(listQuery.isCooperationOrisBlacklist == 2)" v-permission="[ `POST ${api.saveOrDeleteWorker}` ]" type="warning"
					size="mini" @click="handleUpdate(row, 2, 0, '取消拉黑')"
				>
					取消拉黑
				</el-button>
			</template>
		</VxeTable>

		<!-- 新增编辑 -->
		<!-- <EditModal ref="EditModal" :list="statusList" @success="getList" /> -->
		<!-- 查看详情 -->
		<DetailModal ref="DetailModal" @success="getList" />
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
import DetailModal from './components/DetailModal'
import { columns } from './table'

export default {
	name: 'CooperativeMaster',
	components: {
		VxeTable,
		TableTools,
		DetailModal
		// EditModal
	},
	filters: {},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'cooperativeMaster',
				columnsOptions: columns
			},
			listQuery: {
				pageNo: 1,
				pageSize: 20,
				userId: this.$store.state.user.userId,
				isCooperationOrisBlacklist: 1,
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
		},
		handlePopClick(e) {
			let attributes
			e.target.nodeName === 'SPAN' ? attributes = e.target.parentElement.attributes : attributes = e.target.attributes
			for (const key in attributes) {
				if (attributes[key].name === 'aria-describedby') {
					const container = document.getElementById(attributes[key].nodeValue).children[0]
					setTimeout(() => {
						container.dispatchEvent(new Event('scroll'))
					}, 200)
					break
				}
			}
		}
	}
}
</script>
