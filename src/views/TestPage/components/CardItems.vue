<template>
	<div class="CardItems">
		<p class="CardName">{{ datas.name }}</p>
		<p class="CardData">{{ datas.num }}</p>
		<div class="RateIncrease">
			<div class="triangle"></div> <span>较昨日{{ datas.rateIncrease }}%</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CardItems',
	props: {
		datas: {
			type: Object,
			default: () => ({
				name: '今日累计订单数（笔）',
				num: 18000,
				rateIncrease: 15
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.CardItems {
  padding: 15px 33px;
  width: 300px;
  height: 154px;
  border-radius: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .CardName {
    font-family: Source Han Sans;
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    color: #000000;
  }
  .CardData {
    /* margin-top: 10px; */
    font-family: Roboto;
    font-size: 26px;
    font-weight: 500;
    line-height: 36px;
    color: #000000;
  }
}
.RateIncrease {
  display: flex;
  align-items: center;
  .triangle {
    margin-top: 3px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 12px solid #146c36;
  }
  > span {
    margin-left: 13px;
    font-family: Source Han Sans;
    font-size: 14px;
    font-weight: normal;
    line-height: 17px;
    color: #2C2C2C;
  }
}
</style>
