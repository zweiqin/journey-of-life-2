<template>
	<el-dialog width="60%" title="修改分佣比例 (平台服务费收取10%)" :visible.sync="showUpdataForm">
		<el-form style="margin-left: 20px;padding: 0px 10px;" :model="formData">
			<el-form-item label="设置分佣比例：">
				<el-input-number v-model.number="formData.bizConf.commissionRatio" size="medium" :min="0"></el-input-number>
			</el-form-item>
			<el-form-item label="平台固定服务费：">
				<span>10%  （平台服务费将以代金券形式转赠至订单用户）</span>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="tips">*平台固定服务费为团蜂平台固定收取的比例，额外设置分佣比例为商家在服务订单中所获得的佣金，请谨慎填写！</span>
			<span class="dialog-footer">
				<el-button @click="showUpdataForm = false">取 消</el-button>
				<el-button type="primary" @click="editCommissionRatio">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script>
import { editBizConf, queryListByServerInfoIds } from '@/api/platformService'

export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'EditCommissionRatio',
	props: {

	},
	data() {
		return {
			showUpdataForm: false,
			platformCut: 10,
			formData: {
				serverInfoId: 1,
				bizConf: {
					commissionRatio: 0
				}
			}
		}
	},
	methods: {
		show(id) {
			this.showUpdataForm = true
			this.formData.serverInfoId = id
			queryListByServerInfoIds({
				serverInfoIds: [ id ]
			}).then((res) => {
				console.log(res)
			})
			this.formData.bizConf = {
				commissionRatio: 0
			}
		},
		editCommissionRatio() {
			const bizConf = JSON.stringify({
				commissionRatio: this.formData.bizConf.commissionRatio + this.platformCut
			})
			editBizConf({
				'serverInfoId': this.formData.serverInfoId,
				bizConf
			}).then((res) => {
				this.$message({
					message: '修改成功',
					type: 'success'
				})
				this.showUpdataForm = false
				console.log(res)
			})
				.catch((err) => {
					this.$message.error('修改失败')
					console.log(err)
				})
				.finally((res) => {
					this.getList()
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.tips {
  float: left;
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
  color: #FF0000;
}
::v-deep .el-dialog {
  margin-top: 26vh !important;
}
</style>
