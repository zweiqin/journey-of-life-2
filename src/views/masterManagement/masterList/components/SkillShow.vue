<template>
	<el-dialog
		:visible.sync="visible"
		v-bind="modalOptions"
	>
		<el-form ref="formData" :model="formData" label-position="left" label-width="0px" label-suffix="" size="mini">
			<div style="margin-top: 5px;">
				<el-form-item label="" prop="skill">
					<div v-if="formData.skill && formData.skill.length" style="display: flex;justify-content: space-between;flex-wrap: wrap;">
						<div v-for="i in formData.skill" :key="i" style="width: 40%;margin-bottom: 10px;text-align: center;">
							<span>{{ i }}</span>
						</div>
					</div>
					<div v-else>--</div>
				</el-form-item>
			</div>
		</el-form>
		<div slot="footer" style="text-align: center;">
			<el-button style="padding: 10px 32px;" type="danger" size="medium" @click="visible = false">关闭</el-button>
		</div>
	</el-dialog>
</template>

<script>
// import { accountFlow } from '@/api/enterprise/accountFlow'

export default {
	name: 'SkillShow',
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '800px',
				title: '查看技能详情'
			},
			visible: false,
			formData: {
				skill: []
			}
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		// handleOpen(params = {}) {
		handleOpen(params) {
			// this.formData = Object.assign(this.$options.data().formData, params)
			this.formData.skill = params
			if (params.id) {
				// this.getInfo(params.id)
			}
			this.visible = true
		}
		// async getInfo(id) {
		// 	const loading = this.$elLoading('加载中')
		// 	try {
		// 		const res = await accountFlow({ id })
		// 		this.formData = Object.assign(this.$options.data().formData, res.data, {
		// 			tradeNo: res.data.tradeNo || ''
		// 		})
		// 	} finally {
		// 		loading.close()
		// 	}
		// }
	}
}
</script>

