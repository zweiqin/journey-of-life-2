<template>
	<el-scrollbar wrap-class="scrollbar-wrapper">
		<div class="sidebar-logo-container collapse">
			<transition name="sidebarLogoFade">
				<router-link key="expand" class="sidebar-logo-link" to="/">
					<!-- <img src="../../../assets/images/logo.png" class="sidebar-logo"> -->
					<h1 class="sidebar-title">团蜂智慧社区</h1>
				</router-link>
			</transition>
		</div>
		<el-menu
			:show-timeout="200" :default-active="$route.path" :collapse="isCollapse" mode="vertical"
			background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF"
		>
			<SidebarItem v-for="route in menuList" :key="route.path" :item="route" :base-path="route.path" />
		</el-menu>
	</el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import XeUtils from 'xe-utils'

export default {
	components: { SidebarItem },
	computed: {
		...mapGetters([
			'permission_routers',
			'sidebar',
			'roles'
		]),
		isCollapse() {
			return !this.sidebar.opened
		},
		menuList() {
			let routers
			if (this.roles.includes('店长')) {
				routers = XeUtils.mapTree(this.permission_routers, (item) => {
					if (item._ROLES) {
						if (item._ROLES.includes('ADMIN')) {
							item.hidden = false
						} else {
							item.hidden = true
						}
					}
					return item
				})
			} else if (this.roles.includes('师傅')) {
				routers = XeUtils.mapTree(this.permission_routers, (item) => {
					if (item._ROLES) {
						if (item._ROLES.includes('USER')) {
							item.hidden = false
						} else {
							item.hidden = true
						}
					}
					return item
				})
			}
			return routers
		}
	}
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #001325 !important;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 19px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
