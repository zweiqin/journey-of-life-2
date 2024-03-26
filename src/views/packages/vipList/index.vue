<template>
	<div class="app-container">
		<div class="pageHeadDatas">
			<PageHeadeDataBox v-for="(item, index) in pageHeadData" :key="index" :datas="item"></PageHeadeDataBox>
		</div>
		<div class="other-container">
			<div
				style="
          display: flex;
          padding-bottom: 14px;
          font-size: 16px;
          font-weight: bold;
        "
			>
				<div
					style="
            width: 4px;
            height: 14px;
            margin-left: 6px;
            margin-right: 6px;
            background-color: #0519d4;
            border-radius: 2px;
          "
				></div>
				<div>会员列表</div>
			</div>
		</div>
		<!-- 查询和其他操作 -->
		<div
			class="filter-container"
			style="
        padding: 20px 20px;
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-bottom: 0;
        border-radius: 6px 6px 0 0;
      "
		>
			<el-input
				v-model="listQuery.phone"
				clearable
				class="filter-item"
				style="width: 200px; border-radius: 4px"
				placeholder="请输入手机号码"
				@keyup.enter.native="getList"
			/>

			<el-select
				v-model="listQuery.relationshipLevelId"
				class="filter-item"
				placeholder="请选择"
			>
				<el-option label="会员" :value="1"> </el-option>
				<el-option label="团长" :value="2"> </el-option>
				<el-option label="合伙人" :value="3"> </el-option>
			</el-select>
			<el-button
				v-permission="[ `GET ${api.orderPagelist}` ]"
				size="mini"
				class="filter-item"
				type="primary"
				style="margin-left: 10px; padding: 7px 22px"
				@click="getList"
			>
				查找
			</el-button>
			<el-button
				v-permission="[ `GET ${api.orderPagelist}` ]"
				size="mini"
				class="filter-item"
				type="info"
				plain
				style="margin-left: 10px; padding: 7px 22px"
				@click="(listQuery.phone = '') || getList()"
			>
				重置
			</el-button>
		</div>

		<TableTools
			:custom-columns-config="customColumnsConfig"
			download
			custom-field
			style="
        padding: 0 20px;
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-top: 0;
        border-bottom: 0;
      "
			@update-fields="updateFields"
			@refresh="getList"
			@download="toolsMixin_exportMethod($refs.vxeTable, '异常订单')"
		>
		</TableTools>

		<!-- 接单管理列表 -->
		<VxeTable
			ref="vxeTable"
			v-model="listQuery"
			request-method="request2"
			:local-key="customColumnsConfig.localKey"
			api-method="POST"
			:api-path="api.partnerPage"
			:columns="columns"
			:is-request="isRequest"
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
			<template #relationshipLevelId="{ row }">
				<el-tag v-if="row.relationshipLevelId === 1" type="primary">
					会员
				</el-tag>
				<el-tag v-else-if="row.relationshipLevelId === 2" type="warning">
					团长
				</el-tag>
				<el-tag v-else type="success">合伙人</el-tag>
			</template>

			<template #communityName="{ row }">
				<el-tag v-if="row.communityName" type="success">
					{{
						row.communityName
					}}
				</el-tag>
				<el-tag v-else type="info">未指定</el-tag>
			</template>

			<template #operate="{ row }">
				<el-button
					v-permission="[ `POST /admin${api.partnerPage}` ]"
					:type="row.communityName ? 'success' : 'primary'"
					size="mini"
					@click="
						$refs.ApponitRef &&
							$refs.ApponitRef.handleOpen(
								{ buyerUserId: row.buyerUserId },
								!!row.communityName
							)
					"
				>
					{{ row.communityName ? '修改' : '指定' }}
				</el-button>
				<el-button
					v-permission="[ `POST /admin${api.partnerPage}` ]"
					type="danger"
					:disabled="!row.communityName"
					size="mini"
					@click="handleRevoke(row)"
				>
					撤销
				</el-button>
			</template>
		</VxeTable>

		<Apponit ref="ApponitRef" @refresh="getList"></Apponit>
	</div>
</template>

<script>
import { jsonp } from 'vue-jsonp'
import { api, revoke } from '@/api/packagesManagement'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { columns } from './table'
import Apponit from './components/Apponit.vue'
import { getMasterInfoByUserId } from '@/api/baseInfo/baseInfo'

import pageHeadeDataBox from '@/components/pageHeadeDataBox'

export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'AbnormalOrder',
	components: {
		VxeTable,
		TableTools,
		Apponit,
		PageHeadeDataBox: pageHeadeDataBox
	},
	data() {
		return {
			api,
			columns,
			customColumnsConfig: {
				localKey: 'abnormalOrder',
				columnsOptions: columns
			},
			isRequest: false,
			listQuery: {
				phone: '',
				relationshipLevelId: '',
				address: '',
				pageSize: 20
			},
			pageHeadData: [{ name: '累计会员', data: '1433223', imgUrl: require('@/assets/image/blueLove.png') },
				{ name: '今日新增会员', data: '1433223', imgUrl: require('@/assets/image/yellowGame.png') },
				{ name: '会员收益', data: '1433223', imgUrl: require('@/assets/image/pinkPay.png') },
				{ name: '会员代金卷', data: '1433223', imgUrl: require('@/assets/image/bluePack.png') }]
		}
	},
	mounted() {
		this.getSFInfo()
	},
	methods: {
		// 自定义列
		updateFields(columns) {
			this.columns = columns
		},
		getList(meaning) {
			meaning === 'keepPage'
				? this.listQuery = { ...this.listQuery }
				: this.listQuery = { ...this.listQuery, pageNo: 1 }
		},
		async getSFInfo() {
			const _this = this
			const res = await getMasterInfoByUserId({
				userId: this.$store.state.user.userId
			})
			jsonp('https://restapi.amap.com/v3/geocode/geo', {
				key: '5773f02930998e41b0de1d4e1bdbcaa9',
				address: res.data.shopCity
			}).then((res) => {
				const location = res.geocodes[0].location
				jsonp('https://restapi.amap.com/v3/geocode/regeo', {
					key: '5773f02930998e41b0de1d4e1bdbcaa9',
					location: `${location.split(',')[0]},${location.split(',')[1]}`
				}).then((res) => {
					const addressComponent = res.regeocode.addressComponent
					const { district, township, city, province } = addressComponent
					_this.isRequest = true
					_this.listQuery.address = `${province}-${city}-${district}-${township}`
					_this.getList()
				})
			})
		},
		handleRevoke(row) {
			const _this = this
			this.$confirm(`是否撤销【${row.wechatName}】的小区服务？`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					await revoke({ buyerUserId: row.buyerUserId })
					_this.$message.success('撤销成功')
					_this.getList()
				})
				.catch(() => {})
		}
	}
}
</script>

<style lang="scss" scoped>
.pageHeadDatas {
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
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
  color: #ffffff;
  outline: none;
}

/deep/ .el-button--primary:hover {
  background: #46a6ff;
  border-color: #46a6ff;
  color: #ffffff;
}
</style>
