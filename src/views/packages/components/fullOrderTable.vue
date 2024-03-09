<template>
	<!-- 接单管理列表 -->
	<VxeTable
		ref="vxeTable"
		v-model="listQuery"
		:is-request="isRequest"
		request-method="request2"
		local-key="fullOrderTable"
		api-method="POST"
		:api-path="api.partnerOrder"
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
	</VxeTable>
</template>

<script>
import VxeTable from '@/components/VxeTable'
import { api } from '@/api/packagesManagement'

export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'FullOrderTable',
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
		getList(meaning) {
			meaning === 'keepPage'
				// eslint-disable-next-line vue/no-mutating-props
				? this.listQuery = { ...this.listQuery }
				// eslint-disable-next-line vue/no-mutating-props
				: this.listQuery = { ...this.listQuery, pageNo: 1 }
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
