<template>
	<div class="DataStrip">
		<slot name="LeftIcon">
			<div class="LeftIcon">
				<span>{{ datas.name }}</span>
			</div>
		</slot>
		<div class="rightData">
			<div v-for="(item, index) in datas.data" :key="index + 'a'" class="dataItems">
				<p>{{ item.name }}</p>
				<p>{{ item.num }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DataStrip',
	props: {
		datas: {
			type: Object,
			default: () => ({
				name: '会员数据',
				data: [{ name: '待指定数量', num: 1000 },
					{ name: '已指定数量', num: 1000 },
					{ name: '支付订单数', num: 1000 },
					{ name: '支付订单金额', num: 1000 },
					{ name: '会员推广量', num: 1000 },
					{ name: '会员累计佣金', num: 1000 }]
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.DataStrip {
  width: 100%;
  height: 120px;
  margin-top: 22px;
  background: rgba(43, 147, 252, 0.3);
  display: flex;
  .LeftIcon {
    width: 169px;
    height: 120px;
    background: url("../../../../assets/image/BlueTrapezoidal.png");
    font-family: Source Han Sans;
    font-size: 20px;
    font-weight: bold;
    line-height: 120px;
    color: #FFFFFF;
    > span {
      margin-left: 17%;
    }
  }
  .rightData {
    flex: 1;
    display: flex;
    .dataItems {
      flex: 1;
      max-width: 240px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      > p {
        font-family: Source Han Sans;
        font-weight: normal;
        line-height: 28px;
        font-variation-settings: "opsz" auto;
        font-feature-settings: "kern" on;
        color: #000000;
      }
      > p:nth-of-type(1) {
          font-size: 20px;
      }
      > p:nth-of-type(2) {
          font-size: 30px;
      }
    }
  }
}
</style>
