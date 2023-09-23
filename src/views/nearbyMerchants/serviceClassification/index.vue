<template>
	<div class="app-container">

		<div class="other-container">
			<div style="display: flex;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
				<div
					style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
				>
				</div>
				<div>{{ name }}</div>
			</div>
		</div>
		<!-- 查询和其他操作 -->
		<div
			class="filter-container"
			style="padding: 20px 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-bottom: 0;border-radius: 6px 6px 0 0;"
		>
			<el-input
				v-model="listQuery.search" clearable class="filter-item"
				style="width: 300px;border: 1px solid #64748B;border-radius: 4px;" placeholder="输入分类名称"
				@keyup.enter.native="getList"
			/>
			<el-button
				v-permission="[ `POST ${api.queryShopGoodsTypeList}` ]" size="mini" class="filter-item" type="primary"
				style="margin-left:10px;padding: 7px 22px;" @click="getList"
			>
				查询
			</el-button>
			<el-button
				v-permission="[ `POST ${api.queryShopGoodsTypeList}` ]" size="mini" class="filter-item" type="info"
				plain
				style="margin-left:10px;padding: 7px 22px;border: 0;" @click="(listQuery.search = '') || getList()"
			>
				重置
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig" download custom-field
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;"
			@update-fields="updateFields" @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, name)"
		>
			<el-button
				v-permission="[ `POST /admin${api.saveShopGoods}` ]" size="mini" type="primary" icon="el-icon-plus"
				@click="$refs.EditModal && $refs.EditModal.handleOpen({ id: '' }, listQuery.goodsType)"
			>
				添加
			</el-button>
		</TableTools>

		<!-- 分类列表 -->
		<VxeTable
			ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
			:api-path="api.queryShopGoodsTypeList" :columns="columns" page-alias="pageNo" size-alias="pageSize"
			:grid-options="{ rowConfig: { height: 60 } }"
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);"
		>
			<template #goodsTypeUrl="{ row }">
				<div v-if="row.goodsTypeUrl" style="">
					<el-image
						lazy :src="row.goodsTypeUrl" style="width:40px; height:40px;" fit="cover"
						:preview-src-list="[ row.goodsTypeUrl ]"
					/>
				</div>
				<span v-else>--</span>
			</template>
			<template #typeCategory="{ row }">
				<el-tag v-if="row.typeCategory === 1" type="primary">商品</el-tag>
				<el-tag v-else-if="row.typeCategory === 2" type="warning">服务</el-tag>
				<span v-else>--</span>
			</template>
			<template #operate="{ row }">
				<el-button
					v-permission="[ `GET /admin${api.getByIdShopGoodsTypeInfo}` ]" size="mini"
					@click="$refs.DetailModal && $refs.DetailModal.handleOpen(row)"
				>
					查看
				</el-button>
				<el-button
					v-permission="[ `POST /admin${api.editShopGoodsType}` ]" size="mini"
					@click="$refs.EditModal && $refs.EditModal.handleOpen(row)"
				>
					编辑
				</el-button>
				<el-button
					v-permission="[ `DELETE /admin${api.deleteByIdShopGoodsType}` ]" type="danger" size="mini"
					@click="handleDelete(row)"
				>
					删除
				</el-button>
			</template>
		</VxeTable>

		<!-- 新增编辑 -->
		<EditModal ref="EditModal" @success="getList" />
		<!-- 查看详情 -->
		<DetailModal ref="DetailModal" @success="getList" />
	</div>
</template>

<script>
import {
	api,
	deleteByIdShopGoodsType
} from '@/api/nearbyMerchants/nearbyMerchants'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import EditModal from './components/EditModal'
import DetailModal from './components/DetailModal'
import { columns } from './table'

export default {
	name: 'ServiceClassification',
	components: {
		VxeTable,
		TableTools,
		EditModal,
		DetailModal
	},
	filters: {},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'serviceClassification',
				columnsOptions: columns
			},
			listQuery: {
				pageNo: 1,
				pageSize: 20,
				goodsType: '',
				search: ''
			},
			name: ''
		}
	},
	watch: {
		$route(to, from) {
			this.name = this.$route.meta.title
			if (this.$route.meta.title === '商品分类') {
				this.listQuery.goodsType = 1
			} else if (this.$route.meta.title === '服务分类') {
				this.listQuery.goodsType = 2
			}
			this.getList()
		}
	},
	created() {
		this.name = this.$route.meta.title
		if (this.$route.meta.title === '商品分类') {
			this.listQuery.goodsType = 1
		} else if (this.$route.meta.title === '服务分类') {
			this.listQuery.goodsType = 2
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
		async handleDelete(row) {
			await this.$elConfirm('确认删除？')
			await deleteByIdShopGoodsType({ shopGoodsTypeId: row.id })
			this.$elMessage('删除成功！')
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
</style>
