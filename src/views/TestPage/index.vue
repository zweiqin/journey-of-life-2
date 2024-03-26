<template>
	<div class="dashboard-editor-container">
		<div class="TopMain">
			<div class="DataPresentation">
				<div class="DataCardes">
					<p class="cardTitle" style="margin-bottom: 10px">实时数据</p>
					<div class="cardFader">
						<CardItems v-for="(item, index) in cardDatas" :key="index" :datas="item"></CardItems>
					</div>
				</div>
				<div class="HorseRacLamp_list">
					<p style="padding: 10px 20px;" class="cardTitle">新增会员情况</p>
					<HorseRacLampList table-name="newAddMember" :data-config="table1Config" :table-data="table1Data">
						<template #name="row">
							<span style="color: blue">{{ row.rowData.name }}</span>
						</template>
					</HorseRacLampList>
				</div>
			</div>
			<div class="BarChartBox">
				<div style="display: flex;align-items: center;justify-content: space-between;">
					<p style="padding: 10px 10px;" class="cardTitle">服务需求排名</p>
					<TabNavs :datas="['7天', '15天', '30天']"></TabNavs>
				</div>
				<BarCharts
					id="IndexBarChart" :styles="{
						width: '100%',
						height: '628px'
					}"
				></BarCharts>
			</div>
		</div>
		<div class="CenterMain">
			<p class="cardTitle" style="margin-bottom: 10px;font-size: 24px;">核心指标变化趋势</p>
			<LineChart id="ChangeTrend"></LineChart>
		</div>
		<footer class="footerMain">
			<div class="HorseRacLamp_listBox nth1">
				<div class="BoxTop">
					<p>团长排名</p>
					<TabNavs style="width: 248.57px; height: 32px;" :datas="['7天', '15天', '30天']"></TabNavs>
				</div>
				<HorseRacLampList table-name="MasterRanking" :data-config="table2Config" :table-data="table2Data" height="420px">
					<template #name="row">
						<span style="color: blue">{{ row.rowData.name }}</span>
					</template>
				</HorseRacLampList>
			</div>
			<div class="HorseRacLamp_listBox nth2">
				<div class="BoxTop">
					<p>合伙人排名</p>
					<TabNavs style="width: 248.57px; height: 32px;" :datas="['7天', '15天', '30天']"></TabNavs>
				</div>
				<HorseRacLampList :data-config="table3Config" :table-data="table3Data" table-name="PartnerRank" height="420px">
					<template #name="row">
						<span style="color: blue">{{ row.rowData.name }}</span>
					</template>
				</HorseRacLampList>
			</div>
			<div class="HorseRacLamp_listBox nth3">
				<div class="BoxTop">
					<p>师傅接单排名</p>
					<TabNavs style="width: 248.57px; height: 32px;" :datas="['7天', '15天', '30天']"></TabNavs>
				</div>
				<HorseRacLampList :data-config="table4Config" :table-data="table4Data" table-name="OrderRanking" height="420px">
					<template #name="row">
						<span style="color: blue">{{ row.rowData.name }}</span>
					</template>
				</HorseRacLampList>
			</div>
		</footer>
		<!-- <div class="testPage">
			<DtSrcoll
			:new-data="dutyRateData"
			:menu-data="menuData"
			:line-height="5"
			:table-height="50"
			>
			<template #footerTable>
			//自定义插槽
			<el-table-column
			label="操作"
			>
			<template slot-scope="row">
			<el-button type="text" size="small">详情</el-button>
			</template>
			</el-table-column>
			</template>
			</DtSrcoll>
			</div> -->
	</div>
</template>

<script>
import CardItems from './components/CardItems'
import HorseRacLampList from './components/HorseRacLampList'
import TabNavs from './components/TabNavs'
import BarCharts from './components/BarCharts'
import LineChart from './components/LineChart'
import { table1Data, table1Config, table2Data, table2Config, table3Data, table3Config, table4Data, table4Config } from './data'

// import DtSrcoll from './components/DtSrcoll'
export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'TestPage',
	components: {
		CardItems,
		HorseRacLampList,
		TabNavs,
		BarCharts,
		LineChart
		// DtSrcoll
	},
	data() {
		return {
			table1Data,
			table1Config,
			table2Data,
			table2Config,
			table3Data,
			table3Config,
			table4Data,
			table4Config,
			menuData: [ // 表格内容
				{
					name: '班级',
					prop: 'group'
				},
				{
					name: '书本数量',
					prop: 'bookNum'
				},
				{
					name: '数量',
					prop: 'sceneNum'
				},
				{
					name: '进度',
					prop: 'dutyRate'
				}
			],
			dutyRateData: [    // 表格数据（也可以通过实时推送更新数据）
				{ group: '电工班1', bookNum: 3, sceneNum: 0, dutyRate: '88%', name: '小牛马1' },
				{ group: '电工班2', bookNum: 3, sceneNum: 0, dutyRate: '88%', name: '小牛马2' },
				{ group: '电工班3', bookNum: 3, sceneNum: 0, dutyRate: '88%', name: '小牛马3' },
				{ group: '电工班4', bookNum: 3, sceneNum: 0, dutyRate: '88%', name: '小牛马4' },
				{ group: '电工班5', bookNum: 3, sceneNum: 0, dutyRate: '88%', name: '小牛马5' },
				{ group: '电工班6', bookNum: 3, sceneNum: 0, dutyRate: '88%', name: '小牛马6' },
				{ group: '电工班7', bookNum: 3, sceneNum: 0, dutyRate: '88%', name: '小牛马7' },
				{ group: '电工班8', bookNum: 3, sceneNum: 0, dutyRate: '88%', name: '小牛马8' },
				{ group: '电工班9', bookNum: 3, sceneNum: 0, dutyRate: '88%', name: '小牛马9' },
				{ group: '电工班10', bookNum: 3, sceneNum: 0, dutyRate: '88%', name: '小牛马10' },
				{ group: '电工班11', bookNum: 3, sceneNum: 0, dutyRate: '88%', name: '小牛马11' }
			],
			cardDatas: [{ name: '今日累计订单数（笔）', num: 18000, rateIncrease: 15 },
				{ name: '今日支付订单数（笔）', num: 18000, rateIncrease: 15 },
				{ name: '今日订单金额（元）', num: 18000, rateIncrease: 15 },
				{ name: '今日发放的代金券（张）', num: 18000, rateIncrease: 15 },
				{ name: '今日新增会员（人）', num: 18000, rateIncrease: 15 },
				{ name: '今日新增团长（人）', num: 18000, rateIncrease: 15 },
				{ name: '今日新增合伙人（人）', num: 18000, rateIncrease: 15 },
				{ name: '今日使用的代金券（张）', num: 18000, rateIncrease: 15 }]

		}
	}
}
</script>

<style lang="scss" scoped>
.testPage {
  width: 100%;
  height: 500px;
  border-radius: 20px;
  background-color: #fff;
}
.cardTitle {
    font-family: Source Han Sans;
    font-size: 18px;
    font-weight: normal;
    line-height: normal;
    color: #000000;
}
.dashboard-editor-container {
	padding: 18px;
	background-color: #f5f6f7;
  .TopMain {
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    .DataPresentation {
      width: 1330px;
      height: auto;
      .DataCardes {
        width: 100%;
        padding: 20px;
        border-radius: 20px;
        background: #FFFFFF;
        .cardFader {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          /* justify-content: space-between; */
        }
      }
      .HorseRacLamp_list {
        overflow: hidden;
        margin-top: 15px;
        width: 100%;
        /* height: 279px; */
        border-radius: 20px;
        background: #FFFFFF;
      }
    }
    .BarChartBox {
      /* width: 336px;
      height: 100%; */
      padding: 10px;
      flex: 1;
      border-radius: 20px;
      background: #FFFFFF;
    }
  }
  .CenterMain {
    margin-top: 20px;
    padding: 20px;
    width: 100%;
    height: 478px;
    border-radius: 20px;
    background: #FFFFFF;
  }
  .footerMain {
    margin-top: 10px;
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .HorseRacLamp_listBox{
      overflow: hidden;
      /* flex: 1; */
      border-radius: 20px;
      background: #FFFFFF;
      .BoxTop {
        padding: 10px 22px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > p {
          font-family: Source Han Sans;
          font-size: 24px;
          font-weight: normal;
          line-height: 40px;
        }
      }
    }
    .nth1 {
      width: 469px;
      height: 480px;
    }
    .nth2 {
      width: 603px;
      height: 478px;
    }
    .nth3 {
      width: 578px;
      height: 478px;
    }
  }
}
</style>
