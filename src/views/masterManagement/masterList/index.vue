<template>
	<div class="app-container">

		<div class="other-container">
			<div style="display: flex;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
				<div
					style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
				>
				</div>
				<div>师傅列表</div>
			</div>
		</div>
		<!-- 查询和其他操作 -->
		<div
			class="filter-container"
			style="padding: 20px 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-bottom: 0;border-radius: 6px 6px 0 0;"
		>
			<el-input
				v-model="listQuery.search" clearable class="filter-item"
				style="width: 300px;border: 1px solid #64748B;border-radius: 4px;" placeholder="输入师傅姓名/地址"
				@keyup.enter.native="getList"
			/>
			<el-button
				v-permission="[ `GET ${api.getMasterPageList}` ]" size="mini" class="filter-item" type="primary"
				style="margin-left:10px;padding: 7px 22px;" @click="getList"
			>
				查询
			</el-button>
			<el-button
				v-permission="[ `GET ${api.getMasterPageList}` ]" size="mini" class="filter-item" type="info"
				plain
				style="margin-left:10px;padding: 7px 22px;border: 0;"
				@click="(listQuery.isCooperationOrisBlacklist = null) || (listQuery.search = '') || getList()"
			>
				重置
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;"
			@update-fields="updateFields" @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '师傅管理')"
		>
		</TableTools>

		<!-- 师傅管理列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
			:api-path="api.getMasterPageList" :columns="columns" page-alias="pageNo" size-alias="pageSize"
			:is-pager="false" :grid-options="{ rowConfig: { height: 60 } }"
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);"
		>
			<template #gender="{ row }">
				<span v-if="row.gender === 0">男</span>
				<span v-else-if="row.gender === 1">女</span>
				<span v-else>--</span>
			</template>
			<template #headUrl="{ row }">
				<div v-if="row.headUrl" style="">
					<el-image lazy :src="row.headUrl" style="width:40px; height:40px;border-radius: 50% 50%;" fit="cover" :preview-src-list="[ row.headUrl ]" />
				</div>
				<span v-else>--</span>
			</template>
			<template #workState="{ row }">
				<el-tag v-if="row.workState === 0" style="color: #F17850;background-color: #fff6dc;">在职</el-tag>
				<el-tag v-else-if="row.workState === 1" style="color: #999999;background-color: #0D2E50;">离职</el-tag>
				<span v-else>--</span>
			</template>
			<!-- <template #certImg1="{ row }">
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
			<template #skillTypeNameList="{ row }">
				<span v-if="row.skillExpertise">{{ row.skillExpertise.replaceAll(',', '，\n') }}</span>
				<span v-else-if="row.skillTypeNameList && row.skillTypeNameList.length">{{ row.skillTypeNameList.join('，\n') }}</span>
				<span v-else>--</span>
				<div v-if="row.skillExpertise" style="width: fit-content;color: #6956E5;background-color: #ffffff;cursor: pointer;" @click="$refs.SkillShow && $refs.SkillShow.handleOpen(row.skillExpertise.split(','))">显示</div>
				<div v-else-if="row.skillTypeNameList && row.skillTypeNameList.length" style="width: fit-content;color: #6956E5;background-color: #ffffff;cursor: pointer;" @click="$refs.SkillShow && $refs.SkillShow.handleOpen(row.skillTypeNameList)">显示</div>
			</template>
			<template #workCity="{ row }">
				<span v-if="row.workCity" style="position: relative;display: inline-block;height: 39px;overflow: hidden;text-overflow: ellipsis;word-break: break-all;white-space: normal !important;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
					<span v-if="row.workCity.split(',').length > 1">
						<span>{{ row.workCity.match(/^[^,]*(?=,)/)[0] }}</span>
						<div style="position: absolute;top: 52%;right: 10px;width: fit-content;color: #6956E5;background-color: #ffffff;cursor: pointer;" @click="$refs.DetailModal && $refs.DetailModal.handleOpen(row, 'area')">更多</div>
					</span>
					<span v-else>{{ row.workCity }}</span>
				</span>
				<span v-else>--</span>
				<!-- <span>{{ row.workCity.replaceAll(',', '，\n') }}</span> -->
			</template>
			<template #serverCity="{ row }">
				<span>{{ row.serverCity ? JSON.parse(row.serverCity).map(item => item.join(' ')).join('，\n') : '--' }}</span>
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
			<template #certification="{ row }">
				<el-tag v-if="row.certification === 0" type="danger">未认证</el-tag>
				<el-tag v-else-if="row.certification === 1" type="success">已认证</el-tag>
				<span v-else>--</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-permission="[ `POST ${api.saveOrDeleteWorker}` ]" size="mini" type="text" style="color: #2E8982;"
					@click="$refs.DetailModal && $refs.DetailModal.handleOpen(row, 'detail')"
				>
					详情
				</el-button>
				<el-button
					v-if="(listQuery.isCooperationOrisBlacklist == null)"
					v-permission="[ `POST ${api.saveOrDeleteWorker}` ]" type="primary" :disabled="row.certification !== 1"
					size="mini" @click="handleUpdate(row, 1, 1, '确认与该师傅进行合作')"
				>
					合作
				</el-button>
				<el-button
					v-if="(listQuery.isCooperationOrisBlacklist == 1)" v-permission="[ `POST ${api.saveOrDeleteWorker}` ]"
					type="info" :disabled="row.certification !== 1" size="mini" class="row-block"
					@click="handleUpdate(row, 2, 1, '拉黑将限制该师傅平台权益，确定拉黑')"
				>
					拉黑
				</el-button>
				<el-button
					v-if="(listQuery.isCooperationOrisBlacklist == 1)" v-permission="[ `POST ${api.saveOrDeleteWorker}` ]"
					type="danger" :disabled="row.certification !== 1" size="mini" @click="handleUpdate(row, 1, 0, '该师傅处于合作中，确定取消合作')"
				>
					取消合作
				</el-button>
				<el-button
					v-if="(listQuery.isCooperationOrisBlacklist == 2)" v-permission="[ `POST ${api.saveOrDeleteWorker}` ]"
					type="success" :disabled="row.certification !== 1" size="mini" @click="handleUpdate(row, 2, 0, '该师傅已经被拉黑，确定解除')"
				>
					解除
				</el-button>
			</template>
		</VxeTable>

		<!-- 新增编辑 -->
		<!-- <EditModal ref="EditModal" :list="statusList" @success="getList" /> -->
		<!-- 查看详情 -->
		<DetailModal ref="DetailModal" @success="getList" />
		<!-- 查看技能详情 -->
		<SkillShow ref="SkillShow" />
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
import SkillShow from './components/SkillShow'
import { columns } from './table'

export default {
	name: 'MasterList',
	components: {
		VxeTable,
		TableTools,
		DetailModal,
		SkillShow
		// EditModal
	},
	filters: {},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'masterList',
				columnsOptions: columns,
				defaultFields: ['$index', ...columns.filter((v) => v.field && !['birth', 'email'].includes(v.field)).map((item) => item.field)]
			},
			listQuery: {
				pageNo: 1,
				pageSize: 20,
				userId: this.$store.state.user.userId,
				isCooperationOrisBlacklist: null,
				search: ''
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
		},
		handleStatusChange(status) {
			this.listQuery = { ...this.listQuery, status }
		},
		async handleUpdate(row, isHz, status, text) {
			await this.$elConfirm(`${text}？`, '', { showClose: false, iconClass: 'el-icon-warning-outline', customClass: 'box-warning-wrapper font-bold pt20 pl20 pr20 pb20', cancelButtonClass: 'box-button-cancel', confirmButtonClass: 'box-button-comfirm' })
			await saveOrDeleteWorker({
				zzuserId: this.$store.state.user.userId,
				sfuserId: row.userId,
				isHz,
				status
			})
			this.$elMessage()
			this.getList('keepPage')
		},
		handlePopClick(e) {
			let attributes
			e.target.nodeName === 'SPAN' ? attributes = e.target.parentElement.attributes : attributes = e.target.attributes
			// console.log(attributes)
			for (const key in attributes) {
				// console.dir(attributes[key])
				if (attributes[key].name === 'aria-describedby') {
					const container = document.getElementById(attributes[key].nodeValue).children[0]
					setTimeout(() => {
						// console.log(container, container.scrollHeight, container.clientHeight)
						container.dispatchEvent(new Event('scroll'))
						// container.scrollTop = container.scrollHeight - container.clientHeight
					}, 200)
					break
				}
			}
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

/deep/ .el-button--primary.is-disabled {
	color: #FFFFFF;
	background-color: #a0cfff;
	border-color: #a0cfff;
}

.row-block {
	&.el-button--info {
		background-color: #0d2e50;
		border-color: #0d2e50;
		color: #FFFFFF;
	}

	&.el-button--info:active {
		background: #82848a;
		border-color: #82848a;
		color: #FFFFFF;
		outline: none;
	}

	&.el-button--info:hover {
		background: #a6a9ad;
		border-color: #a6a9ad;
		color: #FFFFFF;
	}

	&.el-button--info.is-disabled {
		color: #FFFFFF;
		background-color: #c8c9cc;
		border-color: #c8c9cc;
	}
}
</style>
