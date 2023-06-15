<template>
	<div class="">
		<el-card shadow="never">
			<div style="display: flex;justify-content: space-around;align-items: flex-end;padding: 10px 0 0;">
				<div style="text-align: center;">
					<div
						style="width: 84px;height: 84px;line-height: 104px;background-color: #0519d4;border-radius: 50%;box-shadow: 0px 0px 10px -3px #0B1579;"
					>
						<svg-icon style="width: 36;height: 36;" icon-class="h-jin" class-name="card-panel-icon" />
					</div>
					<div style="margin-top: 12px;color: #64748B;">今日订单金额</div>
					<div style="margin-top: 14px;font-weight: bold;">
						<span style="font-size: 24px;">{{ data1 }}</span><span
							style="font-size: 15px;"
						>
							元
						</span>
					</div>
				</div>
				<div style="width: 1px;height: 70px;background-color: #D8D8D8;"></div>
				<div style="text-align: center;">
					<div
						style="width: 84px;height: 84px;line-height: 104px;background-color: #0519d4;border-radius: 50%;box-shadow: 0px 0px 10px -3px #0B1579;"
					>
						<svg-icon style="width: 36;height: 36;" icon-class="h-zong" class-name="card-panel-icon" />
					</div>
					<div style="margin-top: 12px;color: #64748B;">累计订单金额</div>
					<div style="margin-top: 14px;font-weight: bold;">
						<span style="font-size: 24px;">{{ data2 }}</span><span
							style="font-size: 15px;"
						>
							元
						</span>
					</div>
				</div>
				<div style="width: 1px;height: 70px;background-color: #D8D8D8;"></div>
				<div style="text-align: center;">
					<div
						style="width: 84px;height: 84px;line-height: 104px;background-color: #0519d4;border-radius: 50%;box-shadow: 0px 0px 10px -3px #0B1579;"
					>
						<svg-icon style="width: 36;height: 36;" icon-class="h-yu" class-name="card-panel-icon" />
					</div>
					<div style="margin-top: 12px;color: #64748B;">余额</div>
					<div style="margin-top: 14px;font-weight: bold;">
						<span style="font-size: 24px;">{{ information.data }}</span><span
							style="font-size: 15px;"
						>
							元
						</span>
					</div>
				</div>
				<div style="width: 1px;height: 70px;background-color: #D8D8D8;"></div>
				<div style="text-align: center;">
					<div
						style="width: 84px;height: 84px;line-height: 104px;background-color: #0519d4;border-radius: 50%;box-shadow: 0px 0px 10px -3px #0B1579;"
					>
						<svg-icon style="width: 36;height: 36;" icon-class="h-ti" class-name="card-panel-icon" />
					</div>
					<div style="margin-top: 12px;color: #64748B;">可提现余额<i class="el-icon-arrow-right"></i></div>
					<div style="margin-top: 14px;font-weight: bold;">
						<span style="font-size: 24px;">{{ information.data }}</span><span
							style="font-size: 15px;"
						>
							元
						</span>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
import { getUserBalance } from '@/api/wallet/wallet'
import { getCommissionStatistics } from '@/api/enterprise/commissionManagement'
import { zhanzhangStatistics } from '@/api/homepage/homepage'

export default {
	name: 'MyWallet',
	data() {
		return {
			information: {
				data: '--'
			},
			data1: '--',
			data2: '--'
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		async getInfo(id) {
			const res = await getUserBalance({ userId: this.$store.state.user.userId })
			this.information = Object.assign(this.$options.data().information, res.data, {
				data: res.data
			})
			const res1 = await getCommissionStatistics({ })
			this.data1 = res1.data.toDayOrderPriceSum
			const res2 = await zhanzhangStatistics({ })
			this.data2 = res2.data.sumPrice
		}
	}
}
</script>

