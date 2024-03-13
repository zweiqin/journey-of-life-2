<template>
	<div class="app-container">
		<div class="pageHead">
			<p>商品数据</p>
			<DataStrip :datas="datas"></DataStrip>
			<div class="chartsBox">
				<div class="chartsItem">
					<p>代金卷使用金额比例</p>
					<PieChart id="AmountRatio" :datas="[{ 'name': '1-100元', 'value': 31 }, { 'name': '101-500元', 'value': 55 }, { 'name': '501-1000元', 'value': 24 }]"></PieChart>
				</div>
				<div class="chartsItem">
					<div class="chartsHead">
						<p>商家使用代金券热门排名</p>
						<TabNavs :datas="['7天', '15天', '30天']"></TabNavs>
					</div>
					<BarChart id="HotRanking"></BarChart>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PieChart from './components/PieChart.vue'
import DataStrip from './components/DataStrip'
import TabNavs from './components/TabNavs'
import BarChart from './components/BarChart'

export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'CityMall',
	components: {
		DataStrip,
		TabNavs,
		PieChart,
		BarChart
	},
	data() {
		return {
			datas: {
				name: '代金卷使用统计',
				data: [{ name: '代金卷领取数量', num: 1000 },
					{ name: '代金卷使用数量', num: 1000 },
					{ name: '代金卷使用金额', num: 1000 },
					{ name: '代金卷生产订单量', num: 1000 },
					{ name: '代金券产生金额', num: 1000 }]
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f6f7;
  .pageHead {
    width: 100%;
    /* height: 283px; */
    border-radius: 20px;
    background: #FFFFFF;
    padding: 28px;
    > p {
      font-size: 22px;
      font-weight: normal;
      line-height: normal;
      color: #000000;
    }
    .chartsBox {
      margin-top: 30px;
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      .chartsItem {
        border-radius: 20px;
        padding: 20px;
        width: 800px;
        height: 669px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        p {
          font-family: 思源黑体;
          font-size: 22px;
          font-weight: normal;
          line-height: 28px;
          color: #000000;
        }
        .chartsHead {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
