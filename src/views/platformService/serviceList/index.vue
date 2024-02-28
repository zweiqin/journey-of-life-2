<template>
	<div class="app-container">
		<div class="other-box">
			<div class="other-box-cnm">
			</div>
			<div>社区服务列表</div>
		</div>
		<!-- 查询和其他操作 -->
		<div
			class="filter-container"
			style="padding: 20px 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-bottom: 0;border-radius: 6px 6px 0 0;"
		>
			<el-input
				v-model="querList.search" clearable class="filter-item"
				style="width: 300px;border: 1px solid #64748B;border-radius: 4px;" placeholder="输入商品名称、商品详情"
				@keyup.enter.native="getList"
			/>
			<el-button
				size="mini" class="filter-item" type="primary"
				style="margin-left:10px;padding: 7px 22px;" @click="getList"
			>
				查询
			</el-button>
			<el-button
				size="mini" class="filter-item" type="info"
				plain
				style="margin-left:10px;padding: 7px 22px;border: 0;"
				@click="querList.search = ''; getList()"
			>
				重置
			</el-button>
		</div>
		<!-- 服务列表 -->
		<VxeTable
			ref="vxeTable" v-model="querList" :local-key="customColumnsConfig.localKey" api-method="POST"
			res-alias="records" request-method="request3" api-path="/third/community/serverInfoList"
			:columns="columns" page-alias="pageNo" size-alias="pageSize" :grid-options="{ rowConfig: { height: 60 } }"
			style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);"
		>
			<template #isArtificial="{ row }">
				<el-tag :type="row.isArtificial ? 'danger' : ''">
					{{
						row.isArtificial ? "一口价" : "人工报价"
					}}
				</el-tag>
			</template>
			<template #haldelFunction="{ row }">
				<el-button
					size="mini"
					@click="updataCommissionRatio(row)"
				>
					修改分佣比例
				</el-button>
			</template>
		</VxeTable>

		<el-dialog width="20%" title="修改分佣比例 (最小10%)" :visible.sync="showUpdataForm">
			<el-form :model="formData">
				<el-form-item label="">
					<div style="display:flex; justify-content: center;align-items: center;flex-direction: column;">
						<el-input-number v-model.number="formData.bizConf" size="medium" :min="10"></el-input-number>
						<el-button type="primary" style="margin-top: 30px;width: 160px;height: 30px;" @click="editCommissionRatio">确定</el-button>
					</div>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import { queryListByServerInfoIds, editBizConf } from '@/api/platformService'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { columns } from './table'

export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'ServiceList',
	components: {
		VxeTable,
		TableTools
	},
	data() {
		return {
			columns,
			customColumnsConfig: {
				localKey: 'platformService',
				columnsOptions: columns
			},
			querList: {
				pageNo: 1,
				pageSize: 20,
				search: ''
			},
			formData: {
				serverInfoId: 1,
				bizConf: 10
			},
			showUpdataForm: false
		}
	},
	created() {
		// getOrderInfo({
		// 	pageNo: 1,
		// 	pageSize: 20,
		// 	search: ''
		// }).then((res) => {
		// 	console.log(res)
		// })
		// console.log(123123)
	},
	methods: {
		getList(meaning) {
			meaning === 'keepPage' ? this.querList = { ...this.querList } : this.querList = { ...this.querList, pageNo: 1 }
		},
		updataCommissionRatio(row) {
			// console.log(row);
			queryListByServerInfoIds({
				'serverInfoIds': [ row.id ]
				// 'serverInfoIds': [14, 17, 20, 23, 25, 28, 30, 33, 34, 35, 36, 37]
			}).then((res) => {
				this.showUpdataForm = true
				this.formData.serverInfoId = res.data[0].id
				this.formData.bizConf = res.data[0].bizConf ? JSON.parse(res.data[0].bizConf).commissionRatio : 10
				console.log(res)
			})
				.catch((err) => {
					window.console.log('妈的', err)
				})
		},
		editCommissionRatio() {
			editBizConf({
				'serverInfoId': this.formData.serverInfoId,
				'bizConf': JSON.stringify({
					commissionRatio: this.formData.bizConf
				})
			}).then((res) => {
				this.$message({
					message: '修改成功',
					type: 'success'
				})
				this.showUpdataForm = false
				console.log(res)
			})
				.catch((err) => {
					this.$message.error('修改失败')
					console.log(err)
				})
				.finally((res) => {
					this.getList()
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.other-box {
  display: flex;
  padding-bottom: 14px;
  font-size: 16px;
  font-weight: bold;
    .other-box-cnm {
      width: 4px;
      height: 14px;
      margin-left: 6px;
      margin-right: 6px;
      background-color: #0519D4;
      border-radius: 2px;
    }
}
</style>

