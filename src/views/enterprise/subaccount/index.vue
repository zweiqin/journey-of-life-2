// ⚡🌪🌪🌪🌪🌪🌪🌪⚡
//    ⚡🌪🌪⭐🌪🌪⚡
//     ⚡🌪🌪🌪🌪⚡
//        ⚡🌪🌪🌪⚡
//            🌩
//         ╰🤡ﾉ   暴风星云烈
//          ╭┴╮
<template>
	<div class="app-container">
		<div class="mainBox one">
			<div class="tabNavsBox">
				<TabNavs
					label="name"
					:tab-datas="[{ name: '子账号管理', componentId: 'Subaccounts' }, { name: '角色管理', componentId: 'roleManagement' }]"
					@NavClick="tabClick"
				></TabNavs>
			</div>
			<keep-alive>
				<transition name="fade-transform" mode="out-in">
					<component :is="componentId"></component>
				</transition>
			</keep-alive>
		</div>
	</div>
</template>

<script>
import TabNavs from './components/tabNavs'
import Subaccounts from './components/subaccount'
import RoleManagement from './components/roleManagement'
export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'Subaccount',
	components: { TabNavs, Subaccounts, RoleManagement },
	data() {
		return {
			componentId: 'Subaccounts'
		}
	},
	methods: {
		tabClick(value, ev) {
			this.componentId = value.data.componentId
			console.log(value)
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
    width: 100%;
    min-height: 100%;
    background-color: #f5f6f7;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
    .mainBox {
      width: 100%;
      border-radius: 10px;
      background-color: #fff;
      /* padding: 20px; */
      .tabNavsBox {
        width: 100%;
        padding: 20px;
        /* height: 100px; */
        border-bottom: 1px solid #f5f6f7;
      }
    }
}
</style>
