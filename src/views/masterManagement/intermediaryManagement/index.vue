<template>
	<div class="app-container">
		<img src="@/assets/image/StayTuned.png" alt="">
		<div class="developing">此功能正在开发，敬请期待...</div>
	</div>
</template>

<script>
export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'IntermediaryManagement'
}
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .developing {
    margin-top: 20px;
    font-size: 32px;;
  }
}
</style>
