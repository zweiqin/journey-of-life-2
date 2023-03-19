<template>
	<el-card class="box-card" shadow="never" style="padding: 8px;height: 100%;">
		<div slot="header" class="clearfix">
			<div
				style="clip-path: polygon(0px 0px, 60% 0, 100% 50%, 60% 100%, 0px 100%);width: 16px;height: 16px;display: inline-block;background: linear-gradient(270deg, #2E70AF 0%, #071A2C 100%)"
			>
			</div>
			<span>信息公告</span>
		</div>
		<div class="notice_box" style="overflow-y:auto;">
			<el-timeline v-if="noticeList.length > 0" class="notice_line">
				<el-timeline-item v-for="(item, index) in noticeList" :key="index" :timestamp="item.created_at" placement="top">
					<el-card>
						<h4 v-html="item.title"></h4>
						<p v-html="item.content"></p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<span v-else>暂无通知</span>
		</div>
	</el-card>
</template>

<script>
// import { formatDate } from '@/utils/date'

export default {
	name: 'NoticePanel',
	props: {
		noticeList: {
			type: Array,
			default: []
		}
	},
	watch: {
		noticeList(newVal, oldVal) {
			this.noticeList = newVal
		}
	}
}
</script>

<style lang="scss" scoped>
.notice_box {
	position: relative;
}

.notice_line {
	padding: 0 30px 0 10px;
}

.clearfix span {
	font-family: Source Han Sans CN;
	font-size: 16px;
	font-weight: 500;
	// line-height: 24px;
	color: #333333;
}
</style>
