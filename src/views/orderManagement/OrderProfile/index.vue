<template>
	<div class="app-container">
		<div class="pageHeade">
			<DataCard v-for="(item, index) in pageHeadData" :key="index" :style="{ background: index >= 4 ? '#C0E3FF' : '#FDF0EC' }" :datas="item"></DataCard>
		</div>
		<div class="echartsBox">
			<p class="chartsTitle">核心指标变化趋势</p>
			<OrderProfileCharts></OrderProfileCharts>
		</div>
	</div>
</template>

<script>
import DataCard from './components/dataCard.vue'
import OrderProfileCharts from './components/OrderProfileCharts'
export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'OrderProfile',
	components: {
		DataCard,
		OrderProfileCharts
	},
	data() {
		return {
			pageHeadData: [
				{ name: '待付款订单', num: 12000, price: 20000, iconUrl: require('@/assets/image/OrderProfile/moneyPack.png') },
				{ name: '待接单订单', num: 12000, price: 20000, iconUrl: require('@/assets/image/OrderProfile/haedel.png') },
				{ name: '待报价订单', num: 12000, price: 20000, iconUrl: require('@/assets/image/OrderProfile/money.png') },
				{ name: '待分配订单', num: 12000, price: 20000, iconUrl: require('@/assets/image/OrderProfile/dbs.png') },
				{ name: '待到场订单', num: 12000, price: 20000, iconUrl: require('@/assets/image/OrderProfile/humCar.png') },
				{ name: '待完成订单', num: 12000, price: 20000, iconUrl: require('@/assets/image/OrderProfile/what.png') },
				{ name: '已完成订单', num: 12000, price: 20000, iconUrl: require('@/assets/image/OrderProfile/right.png') },
				{ name: '已取消订单', num: 12000, price: 20000, iconUrl: require('@/assets/image/OrderProfile/nono.png') }
			]
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  min-height: 100%;
  /* display: flex;
  flex-direction: column; */
  background-color: #f5f6f7;
  .pageHeade {
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
    /* height: 606px; */
    border-radius: 20px;
    background: #FFFFFF;
    display: flex;
    flex-wrap: wrap;
    gap: 11px;
  }
  .echartsBox {
    margin-top: 27px;
    width: 100%;
    height: 478px;
    border-radius: 20px;
    background: #FFFFFF;
    padding: 20px;
    .chartsTitle {
      font-family: Source Han Sans;
      font-size: 24px;
      font-weight: normal;
      line-height: 40px;
      color: #000000;
    }
  }
}
</style>
