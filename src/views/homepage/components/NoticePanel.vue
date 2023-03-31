<template>
	<el-card class="box-card" shadow="never" style="display: flex;flex-direction: column;padding: 8px;height: 100%;">
		<div slot="header" class="clearfix">
			<div
				style="clip-path: polygon(0px 0px, 60% 0, 100% 50%, 60% 100%, 0px 100%);width: 16px;height: 16px;display: inline-block;background: linear-gradient(270deg, #3CA1FF 0%, #2E70AF 40%, #071A2C 100%);"
			>
			</div>
			<span style="font-weight: bold;">信息公告</span>
		</div>
		<div class="notice_box" style="height: 100%;">
			<div
				v-if="noticeList.length > 0" class="notice_line"
				style="display: flex;height: 100%;flex-direction: column;justify-content: space-between;font-size: 14px;"
			>
				<div v-for="(item, index) in 5" :key="index">
					<div v-if="index === 0" style="padding: 14px 12px;background-color: #F5F6F7;">
						<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">以组织联建，促乡村振兴啊啊啊啊啊</div>
						<div style="margin-top: 10px;margin-bottom: 12px;font-size: 12px;color: #999999;">03-23 09:57</div>
						<div
							style="color: #666666;overflow: hidden;text-overflow: ellipsis;word-break: break-all;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;"
						>
							党的二十大报告指出“扎实推动乡村产业、人才、文化、生态、组织振兴”...
						</div>
					</div>
					<div v-else style="display: flex;padding: 8px 0;border-bottom: 0.5px solid #EAEBED;">
						<div style="flex: 1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor: pointer;">
							<span>增强议事协商能力。用柔的...</span>
						</div>
						<div style="font-size: 12px;"><span style="vertical-align: middle;">03-03</span></div>
					</div>
				</div>
			</div>
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
		}
	}
}
</script>

<style lang="scss" scoped>
.notice_box {
	position: relative;
}

.clearfix span {
	font-size: 16px;
	font-weight: 500;
	// line-height: 24px;
	color: #333333;
}

/deep/ .el-card__body {
	flex: 1;
}
</style>
