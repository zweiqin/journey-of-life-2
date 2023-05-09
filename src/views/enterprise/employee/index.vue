<template>
	<div class="app-container">

		<div class="other-container">
			<div style="display: flex;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
				<div
					style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
				>
				</div>
				<div>员工列表</div>
			</div>
		</div>
		<!-- 查询和其他操作 -->
		<div
			class="filter-container"
			style="padding: 20px 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-bottom: 0;border-radius: 6px 6px 0 0;"
		>
			<el-input
				v-model="listQuery.search" clearable class="filter-item"
				style="width: 300px;border: 1px solid #64748B;border-radius: 4px;" placeholder="请输入员工姓名/号码"
			/>
			<el-button
				v-permission="[ `POST ${api.getCorrelationList}` ]" size="mini" class="filter-item" type="primary"
				style="margin-left:10px;padding: 7px 22px;" @click="getList"
			>
				查询
			</el-button>
			<el-button
				v-permission="[ `GET ${api.getCorrelationList}` ]" size="mini" class="filter-item" type="info"
				plain
				style="margin-left:10px;padding: 7px 22px;border: 0;" @click="(listQuery.search = '') || getList()"
			>
				重置
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;"
			@update-fields="updateFields" @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, '员工管理')"
		>
			<el-button
				v-permission="[ `POST ${api.correlationSave}` ]" size="mini" type="info" plain
				icon="el-icon-plus"
				style="border: 0;" @click="$refs.Correlation && $refs.Correlation.handleOpen({ id: '' })"
			>
				添加员工
			</el-button>
		</TableTools>

		<!-- 员工管理列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
			:api-path="api.getCorrelationList" :columns="columns" page-alias="pageNo" size-alias="pageSize"
			:is-pager="false" :grid-options="{ rowConfig: { height: 60 } }"
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);"
		>
			<!-- <template #employeeHead="{ row }">
				<div v-if="row.employeeHead" style="">
				<el-image
				lazy :src="row.employeeHead" style="width:40px; height:40px;border-radius: 50% 50%;" fit="cover"
				:preview-src-list="[ row.employeeHead ]"
				/>
				</div>
				<span v-else>--</span>
				</template>
				<template #employeeGender="{ row }">
				<span v-if="row.employeeGender === 1">男</span>
				<span v-else-if="row.employeeGender === 2">女</span>
				<span v-else>--</span>
				</template>
				<template #employeeEmail="{ row }">
				<span style="color: #0519d4;">{{ row.employeeEmail || '--' }}</span>
				</template> -->
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
				<span>{{ row.skillTypeNameList && row.skillTypeNameList.length ? row.skillTypeNameList.join('，\n') : '--' }}</span>
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
					v-permission="[ `POST ${api.correlationInfo}` ]" size="mini" type="text" style="color: #2E8982;"
					@click="$refs.DetailModal && $refs.DetailModal.handleOpen(row, 'detail')"
				>
					详情
				</el-button>
				<el-button
					v-permission="[ `POST ${api.correlationDelete}` ]" size="mini" type="danger"
					@click="handleDelete(row)"
				>
					解除关联
				</el-button>
				<el-button
					v-permission="[ `POST ${api.saveOrUpdateAuthority}` ]" size="mini" type="warning"
					@click="$refs.PermissionModal && $refs.PermissionModal.handleOpen(row)"
				>
					授权
				</el-button>
			</template>
		</VxeTable>

		<!-- 新增编辑 -->
		<Correlation ref="Correlation" @success="getList" />
		<!-- 查看详情 -->
		<DetailModal ref="DetailModal" @success="getList" />
		<!-- 权限配置 -->
		<PermissionModal ref="PermissionModal" @success="getList" />
	</div>
</template>

<script>
import {
	api,
	correlationDelete
} from '@/api/enterprise/employee'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import Correlation from './components/Correlation'
import DetailModal from './components/DetailModal'
import PermissionModal from './components/PermissionModal'
import { columns } from './table'

export default {
	name: 'Employee',
	components: {
		VxeTable,
		TableTools,
		Correlation,
		DetailModal,
		PermissionModal
	},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'employee',
				columnsOptions: columns
			},
			listQuery: {
				pageNo: 1,
				pageSize: 20,
				search: ''
			}
		}
	},
	computed: {
	},
	created() { },
	methods: {
		// 自定义列
		updateFields(columns) {
			this.columns = columns
		},
		getList(meaning) {
			meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, page: 1 }
		},
		// async handleUpdate(row) {
		// 	this.$refs.EditModal && this.$refs.EditModal.handleOpen(row)
		// },
		async handleDelete({ id }) {
			await this.$elConfirm('确认解除关联？')
			await correlationDelete({ ids: [ id ].join(',') })
			this.$elMessage('解除关联成功!')
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
