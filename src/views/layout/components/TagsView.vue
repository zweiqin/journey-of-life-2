<template>
	<!-- <div :style="{ height: 35 * $root.dw + 'px' }" class="tags-view-container"> -->
	<div class="tags-view-container">
		<div style="width: 96%;">
			<ScrollPane ref="scrollPane" class="tags-view-wrapper">
				<router-link
					v-for="tag in visitedViews" ref="tag" :key="tag.path"
					:class="isActive(tag) ? 'active' : ''" :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }" tag="span"
					class="tags-view-item" @click.middle.native="closeSelectedTag(tag)"
					@contextmenu.prevent.native="openMenu(tag, $event)"
				>
					{{ generateTitle(tag.title) }}
					<i class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
				</router-link>
			</ScrollPane>
		</div>
		<i v-if="visitedViews.length" class="el-icon-circle-close" style="position: absolute;font-size: 24px;color: burlywood;top: 3px;right: 6px;cursor: pointer;" @click="closeAllTags"></i>
		<ul
			v-show="visible" :style="{
				fontSize: 12 * $root.dw + 'px',
				height: 12 * $root.dw + 'px',
				lineHeight: 12 * $root.dw + 'px',
				borderRadius: 4 * $root.dw + 'px'
			}" class="contextmenu"
		>
			<li style="margin-right: 10px;" @click="refreshSelectedTag(selectedTag)">{{ $t('tagsView.refresh') }}</li>
			<li style="margin-right: 10px;" @click="closeSelectedTag(selectedTag)">{{ $t('tagsView.close') }}</li>
			<li style="margin-right: 10px;" @click="closeOthersTags">{{ $t('tagsView.closeOthers') }}</li>
			<li @click="closeAllTags">{{ $t('tagsView.closeAll') }}</li>
		</ul>
	</div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane'
import { generateTitle } from '@/utils/i18n'

export default {
	name: 'TagsView',
	components: { ScrollPane },
	data() {
		return {
			visible: false,
			top: 0,
			left: 0,
			selectedTag: {}
		}
	},
	computed: {
		visitedViews() {
			return this.$store.state.tagsView.visitedViews
		}
	},
	watch: {
		$route() {
			this.addViewTags()
			this.moveToCurrentTag()
		},
		visible(value) {
			if (value) {
				document.body.addEventListener('click', this.closeMenu)
			} else {
				document.body.removeEventListener('click', this.closeMenu)
			}
		}
	},
	mounted() {
		this.addViewTags()
	},
	methods: {
		generateTitle, // generateTitle by vue-i18n
		isActive(route) {
			return route.path === this.$route.path
		},
		addViewTags() {
			const { name } = this.$route
			if (name) {
				this.$store.dispatch('addView', this.$route)
			}
			return false
		},
		moveToCurrentTag() {
			const tags = this.$refs.tag
			this.$nextTick(() => {
				for (const tag of tags) {
					if (tag.to.path === this.$route.path) {
						this.$refs.scrollPane.moveToTarget(tag)

						// when query is different then update
						if (tag.to.fullPath !== this.$route.fullPath) {
							this.$store.dispatch('updateVisitedView', this.$route)
						}

						break
					}
				}
			})
		},
		refreshSelectedTag(view) {
			this.$store.dispatch('delCachedView', view).then(() => {
				const { fullPath } = view
				this.$nextTick(() => {
					this.$router.replace({
						path: '/redirect' + fullPath
					})
				})
			})
		},
		closeSelectedTag(view) {
			this.$store.dispatch('delView', view).then(({ visitedViews }) => {
				if (this.isActive(view)) {
					const latestView = visitedViews.slice(-1)[0]
					if (latestView) {
						this.$router.push(latestView)
					} else {
						this.$router.push('/')
					}
				}
			})
		},
		closeOthersTags() {
			this.$router.push(this.selectedTag)
			this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
				this.moveToCurrentTag()
			})
		},
		closeAllTags() {
			this.$store.dispatch('delAllViews')
			this.$router.push('/')
		},
		openMenu(tag, e) {
			const menuMinWidth = 105
			const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
			const offsetWidth = this.$el.offsetWidth // container width
			const maxLeft = offsetWidth - menuMinWidth // left boundary
			const left = e.clientX - offsetLeft + 15 // 15: margin right

			if (left > maxLeft) {
				this.left = maxLeft
			} else {
				this.left = left
			}
			this.top = e.clientY

			this.visible = true
			this.selectedTag = tag
		},
		closeMenu() {
			this.visible = false
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
	position: relative;
	width: 100%;
	// position: fixed;
	background: #fff;
	border-bottom: 1px solid #d8dce5;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

	.tags-view-wrapper {
		.tags-view-item {
			position: relative;
			cursor: pointer;
			color: #495060;
			background: #fff;
			border: 1px solid #d8dce5;
			height: 26px;
			line-height: 26px;
			padding: 4px 0 4px 8px;
			font-size: 14px;
			margin-left: 5px;
			margin-top: 4px;

			&:first-of-type {
				margin-left: 15px;
			}

			&:last-of-type {
				margin-right: 15px;
			}

			&.active {
				background-color: #42b983;
				color: #fff;
				border-color: #42b983;

				&::before {
					content: '';
					background: #fff;
					display: inline-block;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					position: relative;
					margin-right: 2px;
				}
			}

			.el-icon-close {
				margin-right: 4px;
				font-size: 14px;
				border-radius: 50%;
				padding: 2px;

				&:hover {
					background-color: #b4bccc;
					color: #fff;
				}
			}
		}
	}

	.contextmenu {
		margin: 0;
		background: #fff;
		z-index: 100;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		list-style-type: none;
		// padding: 5px 0;
		// border-radius: 4px;
		// font-size: 12px;
		// font-weight: 400;
		color: #333;
		box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

		li {
			margin: 0;
			// padding: 7px 16px;
			cursor: pointer;

			&:hover {
				background: #eee;
			}
		}
	}
}
</style>
