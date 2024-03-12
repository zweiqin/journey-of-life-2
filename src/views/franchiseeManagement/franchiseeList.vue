<template>
	<div class="app-container">
		<div class="pageHeadDatas">
			<PageHeadeDataBox v-for="(item, index) in pageHeadData" :key="index" :datas="pageHeadData[index]"></PageHeadeDataBox>
		</div>
		<div class="echartsBox">
			<div class="dataBox">
				<div class="dataTltle">服务订单销量排行</div>
				<RankingServiceOrders id="rankingServiceOrders"></RankingServiceOrders>
			</div>
			<div class="dataBox">
				<div class="dataTltle">产品订单销售量排名</div>
				<RankingServiceOrders id="productOrdeRanking"></RankingServiceOrders>
			</div>
		</div>
	</div>
</template>

<script>
import PageHeadeDataBox from '@/components/pageHeadeDataBox'
import RankingServiceOrders from './components/rankingServiceOrders'
export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'FranchiseeList',
	components: {
		PageHeadeDataBox,
		RankingServiceOrders
	},
	data() {
		return {
			pageHeadData: [{ name: '已合作加盟商', data: '1433223', imgUrl: require('@/assets/image/blueLove.png') },
				{ name: '今日新增加盟商', data: '7758258', imgUrl: require('@/assets/image/yellowGame.png') },
				{ name: '累计服务订单 (笔)', data: '1370', imgUrl: require('@/assets/image/pinkPay.png') },
				{ name: '累计产品订单 (笔)', data: '9394', imgUrl: require('@/assets/image/bluePack.png') }]
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f6f7;
  /* justify-content: center; */
  align-items: center;
  .pageHeadDatas {
    display: flex;
    gap: 22px;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }
  .echartsBox {
    width: 1666px;
    height: 500px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    .dataBox {
      flex: 1;
      max-width: 820px;
      height: 490px;
      background: #fff;
      border-radius: 10px;
      .dataTltle {
        margin-top: 45px;
        margin-left: 65px;
        font-family: Source Han Sans;
        font-size: 24px;
        font-weight: bold;
        line-height: 25px;
        color: #000000;
      }
    }
  }
}
</style>
