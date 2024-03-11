<template>
	<div class="app-container">
		<div class="pageHeadDatas">
			<PageHeadeDataBox v-for="(item, index) in pageHeadData" :key="index" :datas="pageHeadData[index]"></PageHeadeDataBox>
		</div>
	</div>
</template>

<script>
import PageHeadeDataBox from '@/components/pageHeadeDataBox'
export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'FranchiseeList',
	components: {
		PageHeadeDataBox
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
}
</style>
