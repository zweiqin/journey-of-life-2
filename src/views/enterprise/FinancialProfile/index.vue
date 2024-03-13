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
			<DataStrip :datas="datas1"></DataStrip>
			<DataStrip :datas="datas2"></DataStrip>
			<DataStrip :datas="datas3"></DataStrip>
			<div class="BarChart">
				<div class="chartsHead">
					<span>师傅接单排名</span>
					<TabNavs key-name="name" :datas="[{ name: '年度' }, { name: '季度' }, { name: '月度' }]" :on-nav-click="checkTabNavs"></TabNavs>
				</div>
				<BarchartTwo id="IncomeStatistics"></BarchartTwo>
			</div>
		</div>
	</div>
</template>

<script>
import DataStrip from './components/DataStrip.vue'
import BarchartTwo from './components/BarchartTwo'
import TabNavs from './components/TabNavs'
export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'OrderProfile',
	components: {
		DataStrip,
		TabNavs,
		BarchartTwo
	},
	data() {
		return {
			dataCard: [
				{ name: '累计订单金额', num: '30000' },
				{ name: '累计支出佣金', num: '30000' },
				{ name: '实际总营收', num: '30000' },
				{ name: '实际总利润', num: '30000' }
			],
			datas1: {
				name: '账户情况',
				data: [{ name: '待指定数量', num: 1000 },
					{ name: '已指定数量', num: 1000 },
					{ name: '支付订单数', num: 1000 },
					{ name: '支付订单金额', num: 1000 },
					{ name: '会员推广量', num: 1000 },
					{ name: '会员累计佣金', num: 1000 }]
			},
			datas2: {
				name: '代金卷消费情况',
				data: [{ name: '待结算金额', num: 1000 },
					{ name: '可提现金额', num: 1000 },
					{ name: '提现中金额', num: 1000 },
					{ name: '已提现金额', num: 1000 }]
			},
			datas3: {
				name: '佣金情况',
				data: [{ name: '待结算金额', num: 1000 },
					{ name: '已结算金额', num: 1000 },
					{ name: '团长待发放佣金', num: 1000 },
					{ name: '团长已发放佣金', num: 1000 },
					{ name: '合伙人待发放佣金', num: 1000 },
					{ name: '合伙人已发放佣金', num: 1000 }]
			}
		}
	},
	methods: {
		checkTabNavs(ev, data) {
			console.log(data)
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
    .BarChart {
      margin-top: 40px;
      width: 100%;
      .chartsHead {
        padding: 10px 24px;
        display: flex;
        justify-content: space-between;
        > span {
          font-family: Source Han Sans;
          font-size: 22px;
          font-weight: normal;
          line-height: normal;
          color: #000000;
        }
      }
    }
  }
}
</style>
