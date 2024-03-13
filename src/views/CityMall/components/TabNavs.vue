<!-- eslint-disable vue/v-on-handler-style -->
<template>
	<div class="Ding_Tab">
		<span
			v-for="(item, index) in datas" :key="index" class="Ding_tabs_items" :class="{ isActive: index === AnyDataIndex }"
			@click="($event) => {
				switchData(index);
				onNavClick($event, { data: item, index });
			}"
		>
			{{ keyName ? item[keyName] : item }}
		</span>
	</div>
</template>

<script>
export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'TabNavs',
	props: {
		keyName: {
			type: String,
			default: ''
		},
		datas: {
			type: Array,
			default: () => []
		},
		onNavClick: {
			type: Function,
			// eslint-disable-next-line no-empty-function
			default: () => {}
		}
	},
	data() {
		return {
			AnyDataIndex: 0
		}
	},
	methods: {
		switchData(index) {
			this.AnyDataIndex = index
		}
	}
}
</script>

<style lang="scss" scoped>
.Ding_Tab {
  position: relative;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #D8D8D8;
  .Ding_tabs_items {
    cursor: pointer;
    text-align: center;
    width: 61.54px;
    height: 100%;
    font-size: 16px;
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #D8D8D8;
  }
  .Ding_tabs_items:nth-last-child(1) {
    border-right: none;
  }
  .isActive {
    background: #0088EA;
    color: #fff;
  }
}
</style>
