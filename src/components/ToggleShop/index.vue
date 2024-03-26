<template>
	<div class="checkbox">
		<el-dropdown trigger="click">
			<span class="el-dropdown-link">
				龙江加盟店<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item icon="el-icon-plus">大良加盟店</el-dropdown-item>
					<el-dropdown-item icon="el-icon-circle-plus">日本加盟店</el-dropdown-item>
					<el-dropdown-item icon="el-icon-circle-plus-outline">韩国加盟店</el-dropdown-item>
					<el-dropdown-item icon="el-icon-check">美国加盟店</el-dropdown-item>
					<el-dropdown-item icon="el-icon-circle-check">印度加盟店</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script>
export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'ToggleShop'
}
</script>

<style lang="scss" scoped>

</style>
