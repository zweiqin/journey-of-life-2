<template>
	<div class="box-container">
		<img v-if="!datas.imgUrl" src="@/assets/image/tuanfeng.png" alt="">
		<img v-else :src="datas.imgUrl" alt="">
		<div class="infomationBox">
			<div class="dataNumber">
				{{ datas[labelProps] }}
			</div>
			<div class="dataName">
				{{ datas.name }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'PageHeadeDataBox',
	props: {
		datas: {
			type: Object,
			// eslint-disable-next-line vue/require-valid-default-prop
			default: () => ({
				data: '10000',
				name: 'hellow world',
				imgUrl: 'none'
			})
		},
		labelProps: {
			type: String,
			default: 'data'
		}
	}
}
</script>

<style lang="scss" scoped>
.box-container {
  padding: 37px;
  height: auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-width: 400px;
  max-height: 157px;
  border-radius: 10px;
  background-color: #fff;
  letter-spacing: 2px;
  > img {
    width: 81.22px;
    height: 81.21px;
    border-radius: 38px;
  }
  .infomationBox {
    margin-left: 20px;
    .dataNumber {
      font-family: Source Han Sans;
      font-size: 40px;
      font-weight: 900;
      line-height: 31px;
      color: #000000;
    }
    .dataName {
      margin-top: 10px;
      font-family: Source Han Sans;
      font-size: 20px;
      font-weight: bold;
      line-height: 20px;
      font-variation-settings: "opsz" auto;
      /* 纯黑 */
      color: #000000;
    }
  }
}
</style>
