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
						<span>统计信息</span>
					</div>
					<div class="el-table el-table--enable-row-hover el-table--medium">
						<table cellspacing="0" style="width: 100%;">
							<tbody>
								<tr>
									<td><div class="cell">总金额</div></td>
									<td>
										<div v-if="information.sumPrice !== ''" class="cell" style="color: brown;font-weight: 700;">{{ information.sumPrice }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">利润</div></td>
									<td>
										<div v-if="information.profit !== ''" class="cell" style="color: brown;font-weight: 700;">{{ information.profit }}</div>
										<span v-else>--</span>
									</td>
								</tr>
								<tr>
									<td><div class="cell">支出</div></td>
									<td>
										<div v-if="information.expend !== ''" class="cell" style="color: brown;font-weight: 700;">{{ information.expend }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">待接单数量</div></td>
									<td>
										<div v-if="information.stayOrderNum !== ''" class="cell" style="color: brown;font-weight: 700;">{{ information.stayOrderNum }}</div>
										<span v-else>--</span>
									</td>
								</tr>
								<tr>
									<td><div class="cell">待报价单数量</div></td>
									<td>
										<div v-if="information.stayOfferNum !== ''" class="cell" style="color: brown;font-weight: 700;">{{ information.stayOfferNum }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">师傅数量</div></td>
									<td>
										<div v-if="information.masterNum !== ''" class="cell" style="color: brown;font-weight: 700;">{{ information.masterNum }}</div>
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
						<span>站长服务区域</span>
					</div>
					<div class="el-table el-table--enable-row-hover el-table--medium" style="overflow-y: auto;">
						<table cellspacing="0" style="width: 100%;">
							<thead>
								<tr>
									<th class="is-leaf"><div class="cell">省</div></th>
									<th class="is-leaf"><div class="cell">市</div></th>
									<th class="is-leaf"><div class="cell">区</div></th>
								</tr>
							</thead>
							<tbody v-if="information.serverCityArr.length">
								<tr v-for="(item, index) in information.serverCityArr" :key="index">
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
import { zhanzhangStatistics } from '@/api/homepage/homepage'
export default {
	name: 'Homepage',
	data() {
		return {
			// showwebh: {
			// 	width: '100%',
			// 	// height: 850 * this.$root.dw + 'px',
			// 	height: '100%',
			// 	backgroundImage: `url(${require('@/assets/homepage.png')})`,
			// 	backgroundSize: '100% 100%',
			// 	backgroundRepeat: 'no-repeat',
			// 	backgroundPosition: 'center'
			// }
			information: {
				serverCity: '',
				serverCityArr: [],
				sumPrice: '',
				profit: '',
				expend: '',
				stayOrderNum: '',
				stayOfferNum: '',
				masterNum: ''
			}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		// bigImage() {
		// 	// this.$router.push({ name: 'homepageBig' })
		// 	// document.documentElement.requestFullscreen()
		// }
		async getInfo() {
			const res = await zhanzhangStatistics({})
			this.information = Object.assign(this.$options.data().information, res.data, {
				serverCity: res.data.serverCity,
				serverCityArr: JSON.parse(res.data.serverCity),
				sumPrice: res.data.sumPrice,
				profit: res.data.profit,
				expend: res.data.expend,
				stayOrderNum: res.data.stayOrderNum,
				stayOfferNum: res.data.stayOfferNum,
				masterNum: res.data.masterNum
			})
			console.log(this.information)
		}
	}
}
</script>

<style scoped>
/* .base {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
} */
.cell {
	text-align: center;
	white-space: nowrap;
}
</style>
