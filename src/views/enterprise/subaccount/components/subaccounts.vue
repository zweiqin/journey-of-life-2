<template>
	<div class="tabContainer">
		<div class="tabContainer-header">
			<el-form :inline="true" :model="listQuery" class="demo-form-inline" size="medium">
				<el-form-item label="角色">
					<el-select v-model="listQuery.role" placeholder="请选择">
						<el-option
							v-for="item in roleOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="手机号码">
					<el-input v-model="listQuery.phone" placeholder="手机号码" />
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="listQuery.name" placeholder="手机号码" />
				</el-form-item>
			</el-form>
			<div class="submit-btn" style="margin-left: 40px;">
				<el-button style="width: 100px;" size="medium" type="primary">
					查询
				</el-button>
				<el-button style="width: 100px;" size="medium" type="info">
					重置
				</el-button>
			</div>
			<div class="submit-btn right" style="margin-left: auto;">
				<el-button style="width: 100px;" size="medium" type="primary">
					导出
				</el-button>
				<el-button style="width: 150px;" size="medium" type="danger">
					新建子账号
				</el-button>
			</div>
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
	name: 'Subaccounts',
	components: {
		VxeTable
	},
	data() {
		return {
			roleOptions: [{ label: '店长', value: 1 }, { label: '合伙人', value: 2 }, { label: '会员', value: 3 }],
			listQuery: {
				page: 1,
				limit: 10,
				pageSize: 10,
				role: '',
				phone: '',
				name: ''
			},
			customColumnsConfig: {
				localKey: 'subaccounts',
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
