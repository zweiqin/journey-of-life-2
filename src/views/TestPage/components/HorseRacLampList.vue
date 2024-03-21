<template>
	<div class="tableContainer" @mouseout="mouseout" @mouseover="mouseover">
		<!-- 要有一个固定高度 -->
		<el-table
			:data="tableData"
			:height="height"
			style="width: 100%;"
		>
			<template v-for="(item, index) in dataConfig">
				<!-- ['selection', 'index', 'expand'].includes(item.type) -->
				<el-table-column v-if="['selection', 'index', 'expand'].includes(item.type)" v-bind="item" :key="index" :align="item.align || rowAlign" />
				<el-table-column v-else-if="!['selection', 'index', 'expand'].includes(item.type) && item.prop" v-bind="item" :key="index" :align="item.align || rowAlign" />
				<el-table-column v-else v-bind="item" :key="index" :align="item.align || rowAlign">
					<template slot-scope="scope">
						<slot :name="item.slotName" :row-data="scope.row"></slot>
					</template>
				</el-table-column>
			</template>
			<!-- <el-table-column v-for="(item, index) in dataConfig" v-bind="item" :key="index" /> -->
			<!-- <el-table-column
				align="center"
				label="序号"
				type="index"
				>
				</el-table-column>
				<el-table-column
				label="企业名称"
				prop="name"
				>
				</el-table-column> -->
		</el-table>
		<!-- <slot name="columItem">

			</slot> -->
	</div>
</template>

<script>
export default {
	name: 'HorseRacLampList',
	props: {
		isScroll: { // 是否默认开启滚动
			type: Boolean,
			default: true
		},
		isRunToBootomClear: { // 数据滚动到最后一行是否停止滚动
			type: Boolean,
			default: false
		},
		isAgain: { // 数据滚动到最后一行是否重新开始滚动
			type: Boolean,
			default: true
		},
		rollInterval: { // 切换的时间
			type: [Number, String],
			default: 50
		},
		duration: { // 过度动画的时间
			type: [String, Number],
			default: 500
		},
		lineHeight: { // 页面需要显示的行数
			type: Number,
			default: 6
		},
		rowHeight: { // 控制每一行的行高
			type: [String, Number],
			default: 36
		},
		rowAlign: { // 控制表格对齐方式
			type: String,
			default: 'center'
		},
		height: { // 控制表格高度
			type: [Number, String],
			default: '240px'
		},
		dataConfig: { // 表格每列数据的配置
			type: Array,
			default: () => [{ label: '序号', type: 'index' },
				{ label: '名字', slotName: 'name' },
				{ label: '年龄', prop: 'age' }]
		},
		tableData: { // 表格数据
			type: Array,
			default: () => [{ value: 1, name: '草1', age: 20 },
				{ value: 2, name: '草2', age: 18 },
				{ value: 3, name: '草3', age: 11 },
				4,
				{ value: 5, name: '草5' },
				6,
				{ value: 7, name: '草7' },
				8,
				9,
				{ value: 10, name: '草10' },
				{ value: 11, name: '草11' },
				{ value: 12, name: '草12' }]
		},
		isMouseoverStop: { // 是否移入时停止滚动
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			active: 0,
			timer: null
		}
	},
	mounted() {
		this.autoScroll(true)
	},
	methods: {
		mouseover() {
			this.isMouseoverStop && clearInterval(this.timer)
		},
		mouseout() {
			this.isMouseoverStop && this.autoScroll(false)
		},
		autoScroll(init) {
			// const _this = this
			this.$nextTick(() => {
				// const t = 50
				const box = this.$el.querySelector('.el-table__body-wrapper')
				// box.style.height = this.lineHeight * this.rowHeight + 'px'

				const content = this.$el.querySelector('.el-table__body')

				const elRow = this.$el.querySelectorAll('.el-table__row')
				for (const node of elRow) {
					node.style.height = this.rowHeight + 'px'
				}

				// box.style.top = 0
				// content.style.transactionDuration = this.duration + 'ms'

				// if (this.isScroll) {
				// 	this.timer = setInterval(() => {
				// 		// eslint-disable-next-line radix
				// 		if (this.active < parseInt(this.tableData.length) - parseInt(this.lineHeight)) {
				// 			this.active += 1
				// 			// eslint-disable-next-line radix
				// 			content.style.top = parseInt(content.style.top) - this.rowHeight + 'px'
				// 		} else {
				// 			if (this.isRunToBootomClear) {
				// 				clearInterval(this.timer)
				// 			}
				// 			if (this.isAgain) {
				// 				this.active = 0
				// 				// box.scrollTop = 0
				// 				content.style.transaction = 0 + 'ms'
				// 				content.style.top = 0
				// 			} else {
				// 				clearInterval(this.timer)
				// 			}
				// 		}
				// 	}, this.rollInterval)
				// }

				// if (this.isScroll) { // !默认开启
				// 	this.timer = setInterval(function () {
				// 		if (_this.active < parseInt(_this.tableData.length) - parseInt(_this.lineHeight)) {
				// 			_this.active += 1
				// 			content.style.top = parseInt(content.style.top) - parseInt(_this.rowHeight) + 'px'
				// 		} else {
				// 			if (_this.isRunToBootomClear) {
				// 				clearInterval(_this.timer)
				// 			}
				// 			if (_this.isAgain) {
				// 				_this.active = 0
				// 				// box.scrollTop = 0
				// 				content.style.top = 0
				// 			} else {
				// 				clearInterval(_this.timer)
				// 			}
				// 		}
				// 	}, this.rollInterval)
				// }

				// console.log(box, content)
				if (init) box.scrollTop = 0
				this.timer = setInterval(() => {
					this.rollStart(box, content)
				}, this.rollInterval)
			})
		},
		rollStart(box, content) {
			if (box.scrollTop >= (content.scrollHeight - box.offsetHeight)) {
				box.scrollTop = 0
			} else {
				box.scrollTop++
				// box.scrollTop += this.rowHeight
			}
		}
	}
}
</script>

<style lang="scss" scoped>
/* ::v-deep .el-table__cell {
  display: none;
} */

::v-deep .el-table__body{
   position: absolute;
   transition: all 500ms linear;
}

::v-deep .el-table .el-table__header-wrapper th {
  background-color: #0088EA !important;
  font-size: 14px;
  color: #fff;
}
/* ::v-deep .el-table--scrollable-y .el-table__body-wrapper {
    // 整个滚动条
    &::-webkit-scrollbar {
        width: 0px !important; // 纵向滚动条的宽度
        background: rgba(213, 215, 220, 0.3);
        border: none !important;
        display: none !important;
    }
    // 滚动条轨道
    &::-webkit-scrollbar-track {
        border: none !important;
    }
} */

::v-deep .el-table__body {
  width: 100% !important;
}

::v-deep .el-table--scrollable-y .el-table__body-wrapper {
  overflow-y: hidden;
}
::v-deep .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar {
  display: none !important;
}
/*去除滚动的滚动条*/
</style>
