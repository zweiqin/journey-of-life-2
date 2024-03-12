<template>
	<div class="dataCard">
		<div class="imgAndDatas">
			<img :src="datas.iconUrl" alt="">
			<div class="tag">
				<p>{{ datas.name }}</p>
				<p>{{ datas.num }}</p>
			</div>
		</div>
		<div class="line"></div>
		<div class="moneyBox">
			<span>金额</span><span>{{ datas.price }}  (元)</span>
		</div>
	</div>
</template>

<script>
export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'DataCard',
	props: {
		datas: {
			type: Object,
			default: () => ({ name: '待接单订单', num: 12000, price: 20000, iconUrl: require('@/assets/image/OrderProfile/haedel.png') })
		}
	}
}
</script>

<style lang="scss" scoped>
  .dataCard {
    flex: 1;
    max-width: 400px;
    /* width: 400px; */
    height: 260px;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 30px;
    .imgAndDatas {
      display: flex;
      img {
        width: 110px;
        height: 110.85px;
      }
      .tag {
        margin-left: 42px;
        display: flex;
        flex-direction: column;
        > p:nth-of-type(1) {
          margin-top: 10px;
          font-size: 26px;
          font-weight: normal;
          line-height: 15px;
          color: #000000;
        }
        > p:nth-of-type(2) {
          margin-top: 40px;
          font-size: 50px;
          font-weight: bold;
          line-height: 28px;
          color: #000000;
        }
      }
    }
    .line {
      margin-top: 18px;
      width: 350px;
      height: 0px;
      border-radius: 50px;
      border: 5px solid #FFFFFF;
    }
    .moneyBox {
      padding-left: 20px;
      padding-right: 10px;
      margin-top: 25px;
      display: flex;
      justify-content: space-between;
      span:nth-of-type(1) {
        font-size: 26px;
        font-weight: normal;
        line-height: 15px;
        color: #000000;
      }
      span:nth-of-type(2) {
        font-size: 38px;
        font-weight: normal;
        line-height: 15px;
        color: #000000;
      }
    }
  }
</style>
