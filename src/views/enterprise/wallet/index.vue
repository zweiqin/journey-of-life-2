<template>
	<!-- <div
		:style="showwebh"
		class="base"
		@dblclick="bigImage"
		/> -->
	<div class="" style="height: 100%;">
		<el-row style="display: flex;flex-direction: column;height: 100%;">
			<el-col :span="24" class="card-box card-box-information">
				<el-card>
					<div slot="header">
						<span>余额信息</span>
					</div>
					<div class="el-table el-table--enable-row-hover el-table--medium">
						<table cellspacing="0" style="width: 100%;">
							<tbody>

								<tr style="display: flex;justify-content: center;">
									<td><div class="cell">店长余额：</div></td>
									<td>
										<div v-if="information.data !== ''" class="cell" style="color: brown;font-weight: 700;">{{ information.data }}</div>
										<span v-else>--</span>
									</td>
								</tr>

							</tbody>
						</table>
					</div>
				</el-card>
			</el-col>
			<el-col :span="24" class="card-box" style="flex: 1;height: 0;overflow-y: auto;">
				<el-card>
					<div slot="header">
						<span>提现记录列表</span>
					</div>
					<div class="table-region el-table el-table--enable-row-hover el-table--medium" style="overflow-y: auto;">
						<table cellspacing="0" style="width: 100%;">
							<thead>
								<tr>
									<th class="is-leaf"><div class="cell">敬请</div></th>
									<th class="is-leaf"><div class="cell">期</div></th>
									<th class="is-leaf"><div class="cell">待</div></th>
								</tr>
							</thead>
							<tbody v-if="recordList.length">
								<tr v-for="(item, index) in recordList" :key="index">
									<td><div class="cell">{{ item[0] }}</div></td>
									<td><div class="cell">{{ item[1] }}</div></td>
									<td><div class="cell">{{ item[2] }}</div></td>
								</tr>
							</tbody>
						</table>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { getUserBalance, getWithdrawRecordList } from '@/api/wallet/wallet'
export default {
	name: 'BaseInfo',
	data() {
		return {
			information: {
				data: '--'
			},
			recordList: []
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		async getInfo() {
			const res = await getUserBalance({ userId: this.$store.state.user.userId })
			this.information = Object.assign(this.$options.data().information, res.data, {
				data: res.data
			})
			const result = await getWithdrawRecordList({ pageNo: 1, pageSize: 100, userId: this.$store.state.user.userId })
			this.recordList = result.data.items
		}
	}
}
</script>

<style scoped>
.cell {
	/* text-align: center; */
	white-space: nowrap;
}
.table-region .cell {
	text-align: center;
	white-space: nowrap;
}
</style>
