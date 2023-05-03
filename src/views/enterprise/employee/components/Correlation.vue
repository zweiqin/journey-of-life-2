<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions">
		<el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="100px">
			<el-form-item label="员工来源" prop="masterType">
				<el-radio-group v-model="formData.masterType" size="mini" :disabled="isMasterListRequest" @input="getMasterList">
					<el-radio-button :label="1">已合作师傅</el-radio-button>
					<el-radio-button :label="2">已拉黑师傅</el-radio-button>
					<el-radio-button :label="null">其余师傅</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="关联的师傅" prop="sfUserId">
				<el-select v-model="formData.sfUserId" placeholder="请选择要关联的师傅" :disabled="isMasterListRequest">
					<el-option v-for="item in masterList" :key="item.userId" :label="`${item.name}${item.mobile ? ' ' + item.mobile : ''}`" :value="item.userId" />
				</el-select>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="handleClose">取 消</el-button>
			<el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
// import MyUpload from '@/components/MyUpload'
import { getMasterPageList } from '@/api/enterprise/master'
import { correlationSave } from '@/api/enterprise/employee'

export default {
	name: 'Correlation',
	components: { },
	props: {
		// list: {
		// 	type: Array,
		// 	default: () => []
		// }
	},
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '520px',
				title: ''
			},
			visible: false,
			isMasterListRequest: false,
			formData: {
				masterType: 1,
				sfUserId: ''
			},
			formRules: {
				sfUserId: [
					{ required: true, message: '请选择要关联的师傅' }
				]
			},
			masterList: [] // 师傅列表
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.getMasterList()
			this.modalOptions.title = '添加员工'
			this.visible = true
			if (params.id) {
				// this.getInfo(params.id)
			} else {
				this.$refs.formData && this.$refs.formData.resetFields()
			}
		},
		async getMasterList() {
			this.formData.sfUserId = ''
			this.isMasterListRequest = true
			const res = await getMasterPageList({
				userId: this.$store.state.user.userId,
				isCooperationOrisBlacklist: this.formData.masterType
			})
			this.isMasterListRequest = false
			this.masterList = res.data
		},
		async handleSubmit() {
			await this.$validatorForm('formData')
			const loading = this.$elLoading()
			try {
				const res = await correlationSave(this.formData)
				loading.close()
				this.$elMessage(`添加成功！`)
				this.$emit('success')
				this.visible = false
			} catch (e) {
				loading.close()
			}
		}
	}
}
</script>

