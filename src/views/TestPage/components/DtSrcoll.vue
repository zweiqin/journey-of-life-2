<template>
	<div>
		<el-table
			id="dbM"
			:data="newData"
			border
			style="width: 100%"
			align="center"
			size="mini"
		>
			<el-table-column
				label="序号"
				type="index"
				width="60"
			>
			</el-table-column>
			<el-table-column
				v-for="(item, index) in menuData"
				:label="item.name"
				:show-overflow-tooltip="isOverFlowTooltip"
				:prop="item.prop"
			>
				<!-- todo 二级表头 -->
				<el-table-column
					v-for="subItem in item.child"
					:label="subItem.name"
				>
					<template v-if="!subItem.child" slot-scope="scope">
						{{ subItem.val }}
					</template>
					<!-- todo 三级表头 -->
					<el-table-column
						v-for="subItem2 in subItem.child"
						:label="subItem2.name"
					>
						<template v-if="!subItem2.child" slot-scope="scope">
							{{ subItem2.val }}
						</template>
					</el-table-column>
				</el-table-column>
			</el-table-column>
			<slot name="footerTable"></slot>
		</el-table>
	</div>
</template>

<script>
export default {
	name: 'DtSrcoll',
	props: {
		isOverFlowTooltip: {
			type: Boolean,
			default: true
		},
		newData: Array, // 表格数据
		menuData: Array, // 表格行内容
		lineHeight: { // 页面需要显示的行数
			type: Number,
			default: 4
		},
		rowTime: { // 每一行滚动切换等待的时间（毫秒）
			type: Number,
			default: 300
		},
		duration: { // 过渡时间
			type: Number,
			default: 500
		},
		tableHeight: { // 行高
			type: Number,
			default: 40
		},
		isClear: { // 数据滚动到最后一行是否停止滚动
			type: Boolean,
			default: false
		},
		isAgain: { // 数据滚动到最后一行是否重新开始滚动
			type: Boolean,
			default: true
		},
		isScroll: { // 是否允许内容滚动
			type: Boolean,
			default: true
		}

	},
	data() {
		return {
			active: 0,
			timer: ''
		}
	},
	mounted() {
		const _this = this
		this.$nextTick(() => {
			const elwrapper = _this.$el.querySelector('.el-table__body-wrapper')
			elwrapper.style.height = this.lineHeight * this.tableHeight + 'px'
			const elBody = this.$el.querySelector('.el-table__body')
			const elRow = this.$el.querySelectorAll('.el-table__row')
			for (const node of elRow) {
				node.style.height = this.tableHeight + 'px'
			}
			elBody.style.top = 0
			elBody.style.transactionDuration = this.duration + 'ms'
			if (_this.isScroll) {
				_this.timer = setInterval(function () {
					if (_this.active < parseInt(_this.newData.length) - parseInt(_this.lineHeight)) {
						_this.active += 1
						elBody.style.top = parseInt(elBody.style.top) - parseInt(_this.tableHeight) + 'px'
					} else {
						if (_this.isClear) {
							clearInterval(_this.timer)
						}
						if (_this.isAgain) {
							_this.active = 0
							elBody.style.top = 0
						} else {
							clearInterval(_this.timer)
						}
					}
				}, _this.rowTime)
			}
		})
	},
	unmounted() {
		clearInterval(this.timer)
	}
}
</script>

<style>
.el-table__body{
   position: absolute;
   transition: all 500ms linear;
}

</style>
