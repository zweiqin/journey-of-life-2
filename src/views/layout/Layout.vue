<template>
	<div :class="classObj" class="app-wrapper">
		<div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
		<Sidebar class="sidebar-container" />
		<div class="main-container">
			<Navbar />
			<TagsView />
			<AppMain />
		</div>
	</div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
	name: 'Layout',
	components: {
		Navbar,
		Sidebar,
		AppMain,
		TagsView
	},
	mixins: [ ResizeMixin ],
	data() {
		return {
			chatDialogData: {
				dialogVisible: true
			},
			// path: process.env.VUE_APP_WS_API,
			path: process.env.BASE_WS_API,
			tipsPath: process.env.BASE_TIPS_WS_API,
			socket: '',
			socketTips: ''
		}
	},
	computed: {
		sidebar() {
			return this.$store.state.app.sidebar
		},
		device() {
			return this.$store.state.app.device
		},
		classObj() {
			return {
				hideSidebar: !this.sidebar.opened,
				openSidebar: this.sidebar.opened,
				withoutAnimation: this.sidebar.withoutAnimation,
				mobile: this.device === 'mobile'
			}
		}
	},
	mounted() {
		this.chatDialogData.dialogVisible = false
		if (typeof WebSocket === 'undefined') {
			alert('您的浏览器不支持socket')
		} else {
			this.initOrderTipsSocket()
			// 实例化socket
			// this.socket = new WebSocket(this.path, [ this.$store.getters.token ])
			// this.$refs.chat.init(this.socket)
			// this.$refs.chat.init(this.path)
		}
	},
	methods: {
		handleClickOutside() {
			this.$store.dispatch('closeSideBar', { withoutAnimation: false })
		},
		initOrderTipsSocket() {
			this.socketTips = new WebSocket(`${this.tipsPath}`)
			this.socketTips.onopen = this.openTips
			this.socketTips.onerror = this.errorTips
			this.socketTips.onmessage = this.onmessageTips
			this.socketTips.onclose = this.closeTips
		},
		openTips() {
			console.log('openTips')
			// this.handlePlayAudio('order-prompt.mp3')
		},
		errorTips() {
			console.log('errorTips')
		},
		onmessageTips(msg) {
			console.log('onmessageTips', msg)
			msg.data.noticeInfo === '开始播报' ? this.handlePlayAudio('order-prompt.mp3') : ''
		},
		closeTips() {
			console.log('closeTips连接关闭, 正在重连...')
			setTimeout(() => {
				this.initOrderTipsSocket()
			}, 2000)
		},
		handlePlayAudio(messageToneType) {
			const buttonAudio = document.getElementById('eventAudio')
			buttonAudio.setAttribute('src', '/static/audio/' + messageToneType)
			buttonAudio.play()
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  // background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.main-container {
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  // background: #000;
}
</style>
