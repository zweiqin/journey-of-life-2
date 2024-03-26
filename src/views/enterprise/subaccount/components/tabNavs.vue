<template>
	<div
		class="tabNavs" :style="{
			gap: tabsGap + 'px'
		}"
	>
		<div
			v-for="(item, index) in tabDatas" :key="tabName + index"
			class="tabItems" :class="{ 'isActive': index === currIndex }"
			@click="($event) => {
				currIndex = index;
				$emit('NavClick', { data: item, index }, $event) // 触发外部的绑定事件
				getActiveDomWidth()
			}"
		>
			{{ label ? item[label] : item }}
		</div>
		<!-- <div class="tabItems">角色管理</div> -->
		<div
			class="tab-active" :style="{
				width: ActiveWidth,
				left: LeftMargin
			}"
		></div>
	</div>
</template>

<script>
export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'TabNavs',
	props: {
		tabsGap: { // 控制每个tab的距离
			type: [String, Number],
			default: 15
		},
		label: { // 控制渲染时的数据的名字
			type: String,
			default: ''
		},
		tabDatas: { // 传入渲染的数据
			type: Array,
			default: () => ['子账号管理', '角色管理']
		},
		tabName: { // 控制渲染时的key, 防止key值重复
			type: String,
			default: 'TabNavs'
		},
		defaultCurrent: { // 初始化时默认选中的 tab
			type: [Number, String],
			default: 0
		}
	},
	data() {
		return {
			currIndex: 0,
			tabItemsDom: [],
			ActiveWidth: '0px',
			LeftMargin: '0px'
		}
	},
	computed: {

	},
	mounted() {
		// console.log(this)
		this.currIndex = this.defaultCurrent
		this.$nextTick(() => { // 初始化距离和位置
			this.tabItemsDom = this.$el.querySelectorAll('.tabItems')
			this.getActiveDomWidth()
		})
	},
	methods: {
		getActiveDomWidth() { // 计算激活的 tab 距离
			let width = 0
			this.tabItemsDom.forEach((item, index) => {
				if (index < this.currIndex) {
					width += item.clientWidth
				}
			})
			this.ActiveWidth = this.tabItemsDom[this.currIndex].clientWidth + 'px'
			this.LeftMargin = width + (this.tabsGap * this.currIndex) + 'px'
		}
	}
}
</script>

<style lang="scss" scoped>
.tabNavs {
  position: relative;
  display: flex;
}
.tabItems {
  cursor: pointer;
  font-family: Source Han Sans;
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.25px;
  font-variation-settings: "opsz" auto;
  font-feature-settings: "kern" on;
}
.isActive {
  color: #258CF4;
}
.tab-active {
  z-index: 1;
  position: absolute;
  bottom: -5px;
  /* width: 110px; */
  height: 2px;
  display: inline-block;
  background: #258CF4;
  transition: all .4s; /* 针对 left 变动来实现动画 */
}
</style>
