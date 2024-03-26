<template>
	<div class="tabContainer">
		<div class="tabContainer-header">
			<el-button style="width: 100px;" size="medium" type="danger">
				新建角色
			</el-button>
		</div>
		<VxeTable
			v-model="listQuery" :is-request="false"
			:table-data="tableData" :columns="columns"
			:grid-options="{ rowConfig: { height: 60 } }"
			:local-key="customColumnsConfig.localKey"
			style="
        padding: 10px 0px;
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-top: 0;
        border-bottom: 0;
        box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);
      "
		>
			<template #Controls="{ row }">
				<span>
					{{ row.name }}
				</span>
			</template>
		</VxeTable>
	</div>
</template>

<script>
import VxeTable from '@/components/VxeTable'
import columns from './subaccount'
export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'RoleManagement',
	components: {
		VxeTable
	},
	data() {
		return {
			listQuery: {
				page: 1,
				limit: 10,
				pageSize: 10
			},
			customColumnsConfig: {
				localKey: 'roleManagement',
				columnsOptions: columns
			},
			tableData: [ { account: 'dianzhang', name: '梁店长', phone: 13286520928, role: '店长', createTime: '2023-3-31' } ],
			columns
		}
	}
}
</script>

<style lang="scss" scoped>
.tabContainer-header{
  padding: 10px 23px;
  padding-bottom: 0;
  display: flex;
}
.el-form--inline .el-form-item {
  margin-bottom: 0;
}
.demo-form-inline {
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* justify-content: space-between; */
  gap: 20px;
}
</style>
