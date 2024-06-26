<!----------------------------------------------------------------------------------
about：vxe-table
author：zzw
date：2021-7
----------------------------------------------------------------------------------->
<script>
import empty from './image/no-data.png'
import request from '@/utils/request'
import request2 from '@/utils/request2'
import request3 from '@/utils/request3'
import client from '@/utils/request.js'
import XEUtils from 'xe-utils'
import { objDeepMerge } from '@/utils'
import { cloneDeep } from 'lodash'

const slotHeader_titleHelp = function ($titleHelp = {}, props, h) {
	const { title } = props.column
	// 1.针对 column 配置有 titleHelp 对象的 进行默认提示处理
	const { message, icon } = $titleHelp || {}
	let TitleHelp = ''
	if (message) {
		TitleHelp = <a-tooltip placement="top">
			<span slot="title" domPropsInnerHTML={message} />
		</a-tooltip>
	}
	return [
		<div class="slot_titleHelpWrap">
			<span class="label">{title}</span>
			{TitleHelp}
		</div>
	]
}

const slotDefault = ({ row, column }, h) => {
	const val = row[column.property]
	const _params = XEUtils.get(column, 'params') || {}
	// 如果有多行省略号处理
	const ellipsis_line = _params.ellipsis_line
	if (ellipsis_line) {
		return [
			<el-tooltip placement={_params.placement || 'top'}>
				<span slot="content" domPropsInnerHTML={val} />
				<div class="text-overflow_ellipsis_line_2" style={`width: fit-content;-webkit-line-clamp: ${ellipsis_line}`}>{val || '--'}</div>
			</el-tooltip>
		]
	}
	if (typeof val !== 'number') {
		return val || '--'
	}
	return val
}

const baseOption = {
	round: true,
	resizable: true,
	showOverflow: true,
	showHeaderOverflow: true,
	highlightHoverRow: true,
	autoResize: true,
	rowClassName: (item) => {
		if (item.level > 0) return 'child-row'
	},
	scrollY: {
		gt: -1
	},
	// treeConfig: {
	//   showIcon: true,
	//   iconOpen: 'iconfonterp icon-erp-arrow-right-fill table-tree-icon table-tree-icon-open',
	//   iconClose: 'iconfonterp icon-erp-arrow-right-fill table-tree-icon'
	// },
	// 排序
	sortConfig: {
		trigger: 'cell',
		remote: false // 所有列是否使用服务端排序，如果设置为 true 则不会对数据进行处理
	},
	rowConfig: {
		isHover: true,
		isCurrent: true
	}
}

export default {
	name: 'VxeTable',
	inheritAttrs: false,
	model: {
		prop: 'searchParams',
		event: 'update:searchParams'
	},
	props: {
		setTableHeight: { // 设置表格高度 不给值则默认计算最大高度
			type: [String, Number],
			default: null
		},
		columns: { // !表格基本配置 用于配置每一列的数据格式或者插槽等等
			type: Array,
			default: () => []
		},
		tableData: { // 表格数据
			type: Array,
			default: () => []
		},
		isRequest: { // 是否开启自动请求数据
			type: Boolean,
			default: true
		},
		requestMethod: { // 请求的方法
			type: String,
			default: 'request'
		},
		gridOptions: {
			type: Object,
			default: () => ({})
		},
		className: {
			type: String,
			default: ''
		},
		// 查询条件
		searchParams: {
			type: Object
		},
		// 请求方式
		apiMethod: {
			type: String,
			default: 'GET'
		},
		// 请求地址
		apiPath: {
			type: String,
			default: ''
		},
		// // 请求函数
		// apiFn: {
		// 	type: Function,
		// 	default(params) {
		// 		return request({
		// 			url: '',
		// 			method: 'GET',
		// 			params
		// 		})
		// 	}
		// },
		// res别名
		resAlias: {
			type: String,
			default: ''
		},
		// 是否有分页
		isPager: {
			type: Boolean,
			default: true
		},
		loading: {
			type: Boolean,
			default: false
		},
		pageTotal: {
			type: Number,
			default: 0
		},
		// 需要减去的高度
		diffHeight: {
			type: Number,
			default: 0
		},
		// 是否显示table empty的暂无数据图片
		showEmptyImage: {
			type: Boolean,
			default: true
		},
		pageAlias: {
			type: String,
			default: 'page'
		},
		sizeAlias: {
			type: String,
			default: 'limit'
		},
		// 添加序号
		showIndex: {
			type: Boolean,
			default: true
		},
		localKey: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			isDataLoading: false,
			tableHeight: 0,
			option: baseOption,
			pagination: {
				// currentPage: 1,
				// pageSize: 20,
				background: true,
				pageSizes: [10, 20, 30, 40, 50, 100, 10000],
				layout: 'total, sizes, prev, pager, next, jumper',
				total: 0
			},
			postData: [],
			// 排序
			descParams: {
				column: undefined,
				direction: undefined
			}
		}
	},
	computed: {
		resizelocalKey() {
			return this.localKey + '_resizeConfig'
		}
	},
	watch: {
		searchParams: {
			handler(val) {
				if (!this.isRequest) return
				// this.$emit('update:searchParams', Object.assign(val, { [this.pageAlias]: 1 }))
				this.$emit('update:searchParams', Object.assign(val, { [this.pageAlias]: val[this.pageAlias] || 1 }))
				this.getData()
			},
			immediate: true
		},
		gridOptions: {
			handler(options) {
				this.option = objDeepMerge(this.option, options)
			},
			deep: true,
			immediate: true
		}
	},
	mounted() {
		if (!this.gridOptions.height && this.gridOptions.height !== '') {
			this.calcTableHeight()
			window.addEventListener('resize', XEUtils.debounce(this.calcTableHeight, 300), true)
			this.$once('hook:beforeDestroy', () => {
				window.removeEventListener('resize', this.calcTableHeight, true)
			})
		}
	},
	methods: {
		/* ----------------------------------------- 绑定方法 ----------------------------------------- */

		sortChange({ column, property, order }) {
			this.$emit('sortChange', order)
			const params = {
				// column: property,
				// order: order,
				order: order || undefined
			}
			if (order) {
				this.descParams = {
					orderField: property,
					order
				}
			} else {
				this.descParams = this.$options.data.call(this).descParams
			}
			// this.getData(params)
		},

		/* ----------------------------------------- 自定义方法 ----------------------------------------- */

		async getData() {
			if (!this.isRequest) return
			try {
				this.isDataLoading = true

				const { apiPath, apiMethod } = this
				let res
				if (this.requestMethod === 'request') {
					res = await request({
						url: apiPath,
						method: apiMethod,
						[apiMethod.toUpperCase() === 'GET' ? 'params' : 'data']: this.searchParams
					})
				} else if (this.requestMethod === 'request2') {
					res = await request2({
						url: apiPath,
						method: apiMethod,
						[apiMethod.toUpperCase() === 'GET' ? 'params' : 'data']: this.searchParams
					})
				} else if (this.requestMethod === 'request3') {
					res = await request3({
						url: apiPath,
						method: apiMethod,
						[apiMethod.toUpperCase() === 'GET' ? 'params' : 'data']: this.searchParams
					})
				}

				// const { apiFn } = this
				// const res = await apiFn(this.searchParams)

				const { data } = res
				// console.log(data)
				this.$emit('fetch-data', res)
				let postData
				let page
				let pageSize
				if (this.isPager) {
					postData = this.resAlias ? data[this.resAlias] : data.items
					page = this.searchParams[this.pageAlias]
					pageSize = this.searchParams[this.sizeAlias]
					this.pagination.total = data.total
				} else {
					postData = data
					page = this.searchParams[this.pageAlias] || 1
					pageSize = this.searchParams[this.sizeAlias] || (data ? data.length : 0)
					this.pagination.total = data ? data.length : 0
				}
				this.showIndex && (postData = postData.map((v, i) => ({
					...v,
					$index: (page - 1) * pageSize + (i + 1)
				})))
				this.postData = postData
				this.$emit('post-data', cloneDeep(this.postData))
				this.isDataLoading = false
			} catch (e) {
				console.log(e)
				this.postData = []
				this.isDataLoading = false
			}
		},
		onPageChange(val) {
			const params = {
				[this.pageAlias]: val,
				[this.sizeAlias]: this.searchParams[this.sizeAlias]
			}
			if (this.isRequest) {
				this.$emit('update:searchParams', Object.assign(this.searchParams, params))
				this.getData()
			} else {
				this.$emit('pageChange', params)
			}
		},
		onSizeChange(val) {
			const params = {
				[this.pageAlias]: 1,
				[this.sizeAlias]: val
			}
			if (this.isRequest) {
				this.$emit('update:searchParams', Object.assign(this.searchParams, params))
				this.getData()
			} else {
				this.$emit('pageChange', params)
			}
		},
		setTotal(total = 0) {
			this.pagination.total = total
		},

		/**
		 * 记录列宽
		 * @param {*} event
		 */

		resizableChange(event) {
			const { field, resizeWidth } = event.column
			const __resizeConfig = this.$ls.get(this.resizelocalKey) || []
			const index = __resizeConfig.findIndex((item) => item.field === field)
			if (index > -1) {
				__resizeConfig[index].resizeWidth = resizeWidth
			} else {
				__resizeConfig.push({
					field,
					resizeWidth
				})
			}
			this.$ls.set(this.resizelocalKey, __resizeConfig)
			this.$emit('resizable-change', { field })
		},
		// 调用vxe-table方法
		handleVxeTableMethod(method, ...params) {
			return this.$refs.erpVxeTable[method](...params)
		},
		checkboxChange(...arg) {
			this.$emit('select-change', ...arg)
		},
		checkboxAll(...arg) {
			this.$emit('select-change', ...arg)
		},
		calcTableHeight() {
			// const pagerHeight = this.isPager ? 55 : 0
			// const qiankunHeight = window.__POWERED_BY_QIANKUN__ ? 10 : 0
			this.$nextTick(() => {
				// const tableTop = document.querySelector('.jufeng-vxe-table') && document.querySelector('.jufeng-vxe-table').getBoundingClientRect().top
				// this.tableHeight = window.innerHeight - tableTop - pagerHeight - qiankunHeight - this.diffHeight
				const navbarHeight = 50 * (document.documentElement.clientWidth / 1920) + 10
				const tabsHeight = 50
				const searchHeight = document.querySelector('.app-container>.filter-container') ? document.querySelector('.app-container>.filter-container').offsetHeight : 0
				const pageHeight = this.isPager ? 75 : 25
				const otherHeight = document.querySelector('.app-container>.other-container') ? document.querySelector('.app-container>.other-container').offsetHeight : 0
				const toolsHeight = document.querySelector('.app-container>.table-tools') ? document.querySelector('.app-container>.table-tools').offsetHeight : 0
				const height = navbarHeight + tabsHeight + searchHeight + pageHeight + otherHeight + toolsHeight
				if (this.setTableHeight) {
					this.tableHeight = this.setTableHeight
				} else {
					this.tableHeight = window.innerHeight - height
				}
				// console.log('tableHeight', this.tableHeight)
			})
		},
		updateFooter() {
			this.$refs.erpVxeTable.updateFooter()
		},
		clearScroll() {
			this.$refs.erpVxeTable.clearScroll()
		},
		updateScroll(left, table_fixed_width) {
			this.$refs.erpVxeTable.scrollTo(left - table_fixed_width)
		}
	},
	render(h) {
		const {
			columns,
			tableData,
			isRequest,
			postData,
			className,
			option,
			loading,
			isDataLoading,
			tableHeight,
			$scopedSlots,
			$slots,
			$listeners,
			$attrs,
			pagination,
			isPager
		} = this

		const data = isRequest ? postData : tableData

		const _this = this

		// 添加序号
		if (this.showIndex && columns.length && columns[0].field !== '$index' && columns[1].field !== '$index') {
			columns.unshift({
				fixed: 'left',
				field: '$index',
				resizable: false,
				title: '序号',
				width: 50
			})
		}
		XEUtils.eachTree(columns, function (column) {
			// 内置表头
			if (column.$titleHelp) {
				const $titleHelp = column.$titleHelp
				delete column.$titleHelp
				column.slots.header = slotHeader_titleHelp.bind(_this, $titleHelp)
			}

			// 对非组件级内置的 column类型 且 未定义formatter 进行默认 default处理
			if (!column.type && !column.formatter) {
				if (!column.slots) {
					// console.log('no')
					column.slots = { default: slotDefault }
				} else if (!column.slots.default) {
					// 针对没有 column slot default 的 数据进行处理
					// console.log('slotDefault', slotDefault)
					column.slots.default = slotDefault
				}
			} else {
				column.slots = column.slots || {}
			}
			// Object.keys(column).forEach((key) => {
			// 	if (key.match(/[A-Z]/g)) {
			// 		column[key.replace(/([A-Z])/g, (p, m) => `-${m.toLowerCase()}`)] = column[key]
			// 		delete column[key]
			// 	}
			// })
		})

		const props = { height: option.height || tableHeight, columns, data, ...option }
		const isLoading = isRequest ? isDataLoading : loading
		// const spin = h('div', { class: 'spin-wrap', style: { 'display': isLoading ? 'flex' : '' } }, [h('span', { class: 'spin-item', props: { tip: '加载中...' } })])
		const spin = [
			<div
				class="spin-wrap"
				style={{ display: isLoading ? 'flex' : 'none' }}
			>
				<i class="el-icon-loading"></i>
				<div> 努力加载中...</div>
			</div>
		]
		// pagination
		const pager = isPager ? h('el-pagination', {
			props: {
				currentPage: this.searchParams[this.pageAlias],
				pageSize: this.searchParams[this.sizeAlias],
				...pagination,
				total: this.pageTotal * 1 || pagination.total * 1
			},
			on: {
				'current-change': this.onPageChange,
				'size-change': this.onSizeChange
			}
		}) : null

		// table-empty
		const emptySlots = this.showEmptyImage ? h('div', { class: 'table-empty', slot: 'empty' }, [h('img', { attrs: { src: empty } }), h('div', '暂无数据')]) : undefined
		// vxe-table
		const el = h('div', { style: { 'height': '100%' }, class: [ 'flexColumnPageWrap ' + className ] }, [
			h('div', { style: { 'height': '100%' } }, [
				h('vxe-grid', {
					style: { 'z-index': 50 },
					ref: 'erpVxeTable',
					class: 'jufeng-vxe-table',
					props,
					scopedSlots: $scopedSlots,
					slots: $slots,
					attrs: $attrs,
					on: {
						...$listeners,
						'sort-change': this.sortChange,
						'resizable-change': this.resizableChange,
						'checkbox-change': this.checkboxChange,
						'checkbox-all': this.checkboxAll
					}
					// directives: [ { name: 'tableHeight' } ]
				}, [ emptySlots ]),
				h('div', { class: [ 'pagination-container' ] }, [
					pager
				])
			])
		])

		// wrapper
		return h('div', { class: 'vxe-table__wrapper' }, [spin, el])
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.vxe-table__wrapper {
	position: relative;
	height: 100%;

	.spin-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 999;
		background: rgba(0, 0, 0, 0.02);
		color: #409EFF;
		font-size: 14px;

		.el-icon-loading {
			margin-right: 4px;
		}

		&[style*="display: flex"]+.flexColumnPageWrap .table-empty {
			display: none;
		}
	}

	.pagination-container {
		position: relative;
		// height: 25px;
		padding: 10px 20px 0 0 !important;
		// margin-bottom: 10px;
		// margin-top: 15px;
		background: #fff;
	}

	.el-pagination {
		text-align: right;
		// float: right;
		// right: 0;
		// position: absolute;
	}

	// 加上的
	/deep/ .flexColumnPageWrap {
		.jufeng-vxe-table {
			.vxe-table {
				.vxe-table--render-wrapper {

					// 主框
					.vxe-table--main-wrapper {
						.vxe-table--header-wrapper {
							background-color: #f8fbfd;

							.vxe-body--x-space {
								height: 0;
							}

							table {
								thead {
									.vxe-header--row {
										.vxe-header--column {
											background-image: none;
										}
									}
								}
							}

							.vxe-table--header-border-line {
								border: 0;
							}
						}

						.vxe-table--body-wrapper {
							.vxe-body--x-space {
								height: 0;
							}

							table {
								tbody {
									.vxe-body--row {
										.vxe-body--column {
											background-image: none;
										}
									}
								}
							}
						}
					}

					.vxe-table--fixed-wrapper {

						// 左框
						.vxe-table--fixed-left-wrapper {
							.vxe-table--header-wrapper {
								background-color: #f8fbfd;

								table {
									tbody {
										.vxe-body--row {
											.vxe-body--column {
												background-image: none;
											}
										}
									}
								}

								.vxe-table--header-border-line {
									border: 0;
								}
							}

							.vxe-table--body-wrapper {
								table {
									tbody {
										.vxe-body--row {
											.vxe-body--column {
												background-image: none;
											}
										}
									}
								}
							}
						}

						// 右框
						.vxe-table--fixed-right-wrapper {
							.vxe-table--header-wrapper {
								background-color: #f8fbfd;

								table {
									tbody {
										.vxe-body--row {
											.vxe-body--column {
												background-image: none;
											}
										}
									}
								}

								.vxe-table--header-border-line {
									border: 0;
								}
							}

							.vxe-table--body-wrapper {
								table {
									tbody {
										.vxe-body--row {
											.vxe-body--column {
												background-image: none;
											}
										}
									}
								}
							}
						}
					}
				}

				.vxe-table--border-line {
					border: 0;
				}
			}
		}

		.pagination-container {
			.el-pagination {
				.el-pagination__total {
					color: #64748B;
				}
				span:nth-child(2) {
					float: left;
					color: #999999;
				}
				.btn-prev {
					background-color: transparent;
					border-radius: 4px;
					border: 1px solid #64748B;
				}

				.el-pager {
					.number {
						color: #999999;
						background-color: transparent;
						border-radius: 4px;
						border: 1px solid #64748B;
					}

					.number:hover {
						color: #1890ff;
					}

					.active {
						color: #FFFFFF;
						background-color: #0519d4;
						border: 0;
					}

					.active:hover {
						color: #FFFFFF;
					}
					.btn-quicknext {
						background-color: transparent;
						border-radius: 4px;
						border: 1px solid #64748B;
					}
				}
				.btn-next {
					background-color: transparent;
					border: 1px solid #64748B;
					border-radius: 4px;
				}
				.el-pagination__jump {
					position: relative;
					&::before {
						content: '跳至';
						position: absolute;
						top: 0;
						left: 0;
						background-color: #ffffff;
					}
					.el-input {
						input {
							border: 1px solid #64748B;
						}
					}
				}
			}
		}
	}

	// 加上的
}
</style>
