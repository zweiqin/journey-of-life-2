<template>
	<div class="app-container">
		<div class="topContainer">
			<p class="boxTitle">团队情况</p>
			<div class="dataCardBox">
				<div v-for="(item, index) in dataCard" :key="index" class="dataCard">
					<p>{{ item.name }}</p>
					<p>{{ item.num }}</p>
				</div>
			</div>
			<DataStrip></DataStrip>
			<DataStrip :datas="datas1"></DataStrip>
			<DataStrip :datas="datas2"></DataStrip>
			<DataStrip :datas="datas3"></DataStrip>
			<div class="PieChart">
				<div class="chartBox">
					<p>会员注册渠道比例</p>
					<PieChart
						id="PieChartChannel" :datas="[{ 'name': '微信公众号', 'value': 31 }, { 'name': '小程序', 'value': 55 }, { 'name': 'APP', 'value': 24 }]"
					></PieChart>
				</div>
				<div class="chartBox">
					<p>会员身份比例比例</p>
					<PieChart
						id="PieChartStanding" :datas="[{ 'name': '会员', 'value': 31 }, { 'name': '团长', 'value': 55 }, { 'name': '合伙人', 'value': 24 }]"
					></PieChart>
				</div>
			</div>
		</div>
		<div class="echartsBox">
			<p class="chartsTitle">新增会员趋势</p>
			<LineChart id="newAdd"></LineChart>
		</div>
		<div class="echartsBox">
			<p class="chartsTitle">会员收益趋势</p>
			<LineChart id="earnings"></LineChart>
		</div>
	</div>
</template>

<script>
import DataStrip from './components/DataStrip.vue'
import PieChart from './components/PieChart.vue'
import LineChart from './components/LineChart.vue'
export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'OrderProfile',
	components: {
		DataStrip,
		PieChart,
		LineChart
	},
	data() {
		return {
			dataCard: [
				{ name: '会员累计数量', num: '30000' },
				{ name: '团长累计数量', num: '30000' },
				{ name: '合伙人累计数量', num: '30000' },
				{ name: '小区店累计数量', num: '30000' }
			],
			datas1: {
				name: '团长数据',
				data: [{ name: '待审核数量', num: 1000 },
					{ name: '审核通过数', num: 1000 },
					{ name: '支付订单数', num: 1000 },
					{ name: '支付订单金额', num: 1000 },
					{ name: '团长推广量', num: 1000 },
					{ name: '团长累计佣金', num: 1000 }]
			},
			datas2: {
				name: '合伙人数据',
				data: [{ name: '待审核数量', num: 1000 },
					{ name: '审核通过数', num: 1000 },
					{ name: '支付订单数', num: 1000 },
					{ name: '支付订单金额', num: 1000 },
					{ name: '合伙人推广量', num: 1000 },
					{ name: '合伙人累计佣金', num: 1000 }]
			},
			datas3: {
				name: '小区店数据',
				data: [{ name: '待审核数量', num: 1000 },
					{ name: '审核通过数', num: 1000 },
					{ name: '支付订单数', num: 1000 },
					{ name: '支付订单金额', num: 1000 },
					{ name: '小区店推广量', num: 1000 },
					{ name: '小区店累计佣金', num: 1000 }]
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  min-height: 100%;
  background-color: #f5f6f7;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  .topContainer {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    border-radius: 20px;
    padding: 28px;
    background-color: #fff;
    .boxTitle {
      font-size: 22px;
      font-weight: normal;
      line-height: normal;
      color: #000000;
    }
    .dataCardBox {
      margin-top: 20px;
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .dataCard {
        padding: 20px;
        border-radius: 20px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        background: #FFFFFF;
        width: 380px;
        height: 154px;
        > p:nth-of-type(1) {
          font-family: 思源黑体;
          font-size: 20px;
          font-weight: normal;
          line-height: 28px;
          color: #000000;
        }
        > p:nth-of-type(2) {
          font-family: 思源黑体;
          font-size: 48px;
          font-weight: normal;
          line-height: 67px;
          color: #000000;
        }
      }
    }
    .PieChart {
      margin-top: 22px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .chartBox {
        padding: 20px;
        width: 791px;
        height: 335px;
        border-radius: 20px;
        background: #FFFFFF;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        > p {
          font-family: 思源黑体;
          font-size: 22px;
          font-weight: normal;
          line-height: 28px;
          color: #000000;
        }
      }
    }
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
