<template>
	<div class="app-container">
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
				<div>订单列表</div>
			</div>
		</div>
		<el-card class="topCard">
			<template #header>
				<div class="clearfix">
					<span class="leftText">财务数据</span>
					<!-- <span class="leftTip">所有交易成功的金额，微信侧将收取6‰的交易手续费</span> -->
					<!-- <el-button class="rightBtn" type="primary" @click="getMoney">提现</el-button> -->
				</div>
			</template>
			<div class="cardLIst">
				<div v-for="(item, index) in cardList" :key="index" class="cardItem">
					<div class="cardDetal">
						<div class="cardMoney">{{ cardNumber[item.key] }}</div>
						<div class="cardText">
							<span>{{ item.name }}</span>
							<img src="@/assets/image/shuoming.png">
						</div>
					</div>
				</div>
			</div>
		</el-card>
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
			<!-- <el-cascader class="filter-item" :props="cascaderProps"></el-cascader> -->
			<el-button
				v-permission="[ `GET ${api.partnerOrder}` ]"
				size="mini"
				class="filter-item"
				type="primary"
				style="margin-left: 10px; padding: 7px 22px"
				@click="getList"
			>
				查找
			</el-button>
			<el-button
				v-permission="[ `GET ${api.partnerOrder}` ]"
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
			:custom-columns-config="cloumsConfig[tableName]"
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
			<template>
				<div class="tabs">
					<button class="tabItem" :class="{ active: tableName === 'fullOrderTable' }" type="button" @click="tableName = 'fullOrderTable'">活动订单</button>
					<button class="tabItem" :class="{ active: tableName === 'orderCancellationTable' }" type="button" @click="tableName = 'orderCancellationTable'">订单核销</button>
				</div>
			</template>
		</TableTools>
		<transition name="fade-transform" mode="out-in">
			<keep-alive>
				<component
					:is="tableName" :list-query="listQuery" :is-request="isRequest"
					:custom-columns-config="cloumsConfig[tableName]" :columns="cloumsConfig[tableName].columnsOptions"
				></component>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
import { jsonp } from 'vue-jsonp'
import { api, cancellationWrite, getAreaList, revenueStatistics } from '@/api/packagesManagement'
import TableTools from '@/components/TableTools'

import { fullOrderTableCloums } from './fullOrderTable'
import { orderCancellationTableCloums } from './orderCancellationTable'

import { getMasterInfoByUserId } from '@/api/baseInfo/baseInfo'

import FullOrderTable from '../components/fullOrderTable'
import OrderCancellationTable from '../components/orderCancellationTable'

export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'OrderCancellation',
	components: {
		TableTools,
		FullOrderTable,
		OrderCancellationTable
	},
	data() {
		return {
			api,
			isRequest: false,
			tableName: 'fullOrderTable',
			cloumsConfig: {
				fullOrderTable: {
					localKey: 'fullOrderTable',
					columnsOptions: fullOrderTableCloums
				},
				orderCancellationTable: {
					localKey: 'orderCancellationTable',
					columnsOptions: orderCancellationTableCloums
				}
			},
			listQuery: {
				phone: '',
				relationshipLevelId: '',
				address: '',
				pageSize: 20,
				page: 1
			},
			cascaderProps: {
				value: 'id',
				label: 'name',
				lazy: true,
				async lazyLoad(node, resolve) {
					const { level, value } = node
					const areaList = await getAreaList({ parentId: !level ? 0 : value })
					resolve(areaList.data.map((item) => {
						item.leaf = level === 3
						return item
					}))
				}
			},
			cardList: [
				{
					key: 'commissionTotal',
					name: '佣金总额'
				},
				{
					key: 'orderNum',
					name: '订单数量'
				},
				{
					key: 'presenterTotal',
					name: '赠送总额'
				}
			],
			cardNumber: {
				commissionTotal: 0,
				orderNum: 0,
				presenterTotal: 0
			}
		}
	},
	mounted() {
		this.getSFInfo()
	},
	created() {
		// console.log(columns)
	},
	methods: {
		// 自定义列
		updateFields(columns) {
			this.columns = columns
		},
		tabsHandleClick(tabs, ev) {
			// console.log(tabs, ev)
			console.log(this.tableName)
		},
		getList(meaning) {
			meaning === 'keepPage'
				? this.listQuery = { ...this.listQuery }
				: this.listQuery = { ...this.listQuery, pageNo: 1 }
			revenueStatistics({
				address: this.listQuery.address,
				phone: JSON.parse(localStorage.getItem('user_information')).value.account
			}).then((res) => {
				console.log(res)
				this.cardNumber = res.data
			})
				.catch((err) => {
					console.log(err)
				})
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
					_this.listQuery.address = `${province}-${city}-${district}-${township}`
					this.isRequest = true
					_this.getList()
				})
			})
		}
	}
}
</script>

<style lang="scss" scoped>
  .tabs {
    /* margin-left: 20px; */
    margin-bottom: 10px;
    float: left;
    width: auto;
    display: flex;
    align-items: center;
    .tabItem {
        color:#606266;
        height: 30px;
        width: 114px;
        background: #FFFFFF;
        /* border: none; */
        border: 1px solid #B8C4D1;
    }
    .active {
      color: #0088EA;
    }
    .tabItem:nth-of-type(1) {
      border-right: none;
    }
    .tabItem:hover {
      color: #0088EA;
      transition: color 0.3s;
      border-color: #badeff;
      background-color: #e8f4ff;
      transition: background-color 0.3s;
    }
  }
	.cardLIst {
		padding: 10px;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.cardItem {
			padding: 20px;
		}

		.cardDetal {
			.cardMoney {
				font-size: 40px;
				font-weight: bold;
				color: #ffae11;
				margin-bottom: 20px;
				text-align: center;
			}

			.cardText {
				font-size: 18px;
				display: flex;
				color: #333333;

				img {
					width: 20px;
					height: 20px;
					margin-left: 6px;
				}
			}
		}
	}
</style>
