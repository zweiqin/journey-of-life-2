<template>
	<div class="app-container">
		<div class="pageHead">
			<p>团队概况</p>
			<div class="dataBox">
				<div v-for="(item, index) in datas" :key="index" class="dataItems">
					<p style="font-size: 20px;">{{ item.name }}</p>
					<p style="font-size: 40px;margin-top: 20px;">{{ item.num }}</p>
				</div>
			</div>
		</div>
		<div class="BarChartBox">
			<div class="chartItem">
				<div class="chartsHead">
					<span>师傅接单排名</span>
					<TabNavs key-name="name" :datas="[{ name: '7天' }, { name: '15天' }, { name: '30天' }]" :on-nav-click="checkTabNavs"></TabNavs>
				</div>
				<BarChart id="OrderRanking"></BarChart>
			</div>
			<div class="chartItem">
				<div class="chartsHead">
					<span>服务类型排名</span>
					<TabNavs key-name="name" :datas="[{ name: '7天' }, { name: '15天' }, { name: '30天' }]" :on-nav-click="checkTabNavs"></TabNavs>
				</div>
				<BarChart id="ServiceRanking"></BarChart>
			</div>
		</div>
	</div>
</template>

<script>
import TabNavs from './components/TabNavs'
import BarChart from './components/BarChart'

export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'MastersProfile',
	components: {
		TabNavs,
		BarChart
	},
	data() {
		return {
			datas: [
				{ name: '累计申请师傅', num: '30000' },
				{ name: '已合作师傅', num: '30000' },
				{ name: '已拉黑师傅', num: '30000' },
				{ name: '师傅累计接单量', num: '30000' },
				{ name: '师傅累计收益', num: '30000' }
			]
		}
	},
	methods: {
		checkTabNavs(ev, data) {
			console.log(ev, data)
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
      font-family: 思源黑体;
      font-size: 20px;
      font-weight: normal;
      line-height: 28px;
      color: #000000;
    }
    .dataBox {
      margin-top: 12px;
      display: flex;
      justify-content: space-between;
      .dataItems {
        width: 300px;
        height: 154px;
        border-radius: 20px;
        background: #FFFFFF;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        padding: 20px;
        > p {
          font-family: 思源黑体;
          font-weight: normal;
          line-height: 28px;
          color: #000000;
        }
      }
    }
  }
  .BarChartBox {
    margin-top: 14px;
    width: 100%;
    max-height: 630px;
    display: flex;
    justify-content: space-between;
    .chartItem {
      width: 818px;
      height: 621px;
      border-radius: 20px;
      background: #FFFFFF;
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
