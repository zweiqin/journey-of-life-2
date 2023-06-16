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
					<div style="margin-top: 12px;color: #64748B;">今日佣金</div>
					<div style="margin-top: 14px;font-weight: bold;">
						<span style="font-size: 24px;">{{ information.toDayCommissionSum }}</span><span
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
					<div style="margin-top: 12px;color: #64748B;">累计佣金</div>
					<div style="margin-top: 14px;font-weight: bold;">
						<span style="font-size: 24px;">{{ information.commissionSum }}</span><span
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
						<svg-icon style="width: 36;height: 36;" icon-class="h-tu" class-name="card-panel-icon" />
					</div>
					<div style="margin-top: 12px;color: #64748B;">途中佣金</div>
					<div style="margin-top: 14px;font-weight: bold;">
						<span style="font-size: 24px;">{{ information.commissionOnTheWay }}</span><span
							style="font-size: 15px;"
						>
							元
						</span>
					</div>
				</div>
				<div style="width: 1px;height: 70px;background-color: #D8D8D8;"></div>
				<div style="text-align: center;cursor: pointer;" @click="$refs.AccumulatedMembership && $refs.AccumulatedMembership.handleOpen()">
					<div
						style="width: 84px;height: 84px;line-height: 104px;background-color: #0519d4;border-radius: 50%;box-shadow: 0px 0px 10px -3px #0B1579;"
					>
						<svg-icon style="width: 36;height: 36;" icon-class="h-zong-vip" class-name="card-panel-icon" />
					</div>
					<div style="margin-top: 12px;color: #2497f5;">累计会员 →</div>
					<div style="margin-top: 14px;font-weight: bold;">
						<span style="font-size: 24px;">{{ information.memberSum }}</span><span
							style="font-size: 15px;"
						>
							个
						</span>
					</div>
				</div>
				<div style="width: 1px;height: 70px;background-color: #D8D8D8;"></div>
				<div style="text-align: center;">
					<div
						style="width: 84px;height: 84px;line-height: 104px;background-color: #0519d4;border-radius: 50%;box-shadow: 0px 0px 10px -3px #0B1579;"
					>
						<svg-icon style="width: 36;height: 36;" icon-class="h-jin-vip" class-name="card-panel-icon" />
					</div>
					<div style="margin-top: 12px;color: #64748B;">今日会员（个）</div>
					<div style="margin-top: 14px;font-weight: bold;">
						<span style="font-size: 24px;">{{ information.toDayMemberSum }}</span><span
							style="font-size: 15px;"
						>
							个
						</span>
					</div>
				</div>
				<div style="width: 1px;height: 70px;background-color: #D8D8D8;"></div>
				<div style="text-align: center;">
					<div
						style="width: 84px;height: 84px;line-height: 104px;background-color: #0519d4;border-radius: 50%;box-shadow: 0px 0px 10px -3px #0B1579;"
					>
						<svg-icon style="width: 36;height: 36;" icon-class="h-card-open" class-name="card-panel-icon" />
					</div>
					<div style="margin-top: 12px;color: #64748B;">可提现佣金</div>
					<div style="margin-top: 14px;font-weight: bold;">
						<span style="font-size: 24px;">{{ information.commissionWithdrawable }}</span><span
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
						<svg-icon style="width: 36;height: 36;" icon-class="h-card-yes" class-name="card-panel-icon" />
					</div>
					<div style="margin-top: 12px;color: #64748B;">已提现佣金</div>
					<div style="margin-top: 14px;font-weight: bold;">
						<span style="font-size: 24px;">{{ information.commissionWithdrawn }}</span><span
							style="font-size: 15px;"
						>
							元
						</span>
					</div>
				</div>
			</div>
		</el-card>

		<!-- 查看累计会员 -->
		<AccumulatedMembership ref="AccumulatedMembership" />
	</div>
</template>

<script>
import { getCommissionStatistics } from '@/api/enterprise/commissionManagement'
import AccumulatedMembership from './AccumulatedMembership'

export default {
	name: 'MyCommission',
	components: {
		AccumulatedMembership
	},
	data() {
		return {
			information: {
				commissionOnTheWay: '--',
				commissionSum: '--',
				commissionWithdrawable: '--',
				commissionWithdrawn: '--',
				memberSum: '--',
				orderPriceSum: '--',
				toDayCommissionSum: '--',
				toDayMemberSum: '--',
				toDayOrderPriceSum: '--'
			}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		async getInfo(id) {
			const res = await getCommissionStatistics({ })
			this.information = Object.assign(this.$options.data().information, res.data, {
				commissionOnTheWay: res.data.commissionOnTheWay,
				commissionSum: res.data.commissionSum,
				commissionWithdrawable: res.data.commissionWithdrawable,
				commissionWithdrawn: res.data.commissionWithdrawn,
				memberSum: res.data.memberSum,
				orderPriceSum: res.data.orderPriceSum,
				toDayCommissionSum: res.data.toDayCommissionSum,
				toDayMemberSum: res.data.toDayMemberSum,
				toDayOrderPriceSum: res.data.toDayOrderPriceSum
			})
		}
	}
}
</script>

