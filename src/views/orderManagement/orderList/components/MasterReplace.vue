<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions">
		<el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="100px">
			<el-form-item label="原来的师傅" prop="oldSfUserId">
				<el-select v-model="formData.oldSfUserId" placeholder="" disabled>
					<el-option v-for="item in masterList" :key="item.userId" :label="`${item.name}${item.mobile ? ' ' + item.mobile : ''}`" :value="item.userId" />
				</el-select>
			</el-form-item>
			<el-form-item label="更换师傅" prop="newSfUserId">
				<el-select v-model="formData.newSfUserId" placeholder="请选择师傅" filterable>
					<el-option v-for="item in masterList" :key="item.userId" :label="`${item.name}${item.mobile ? ' ' + item.mobile : ''}`" :value="item.userId" />
				</el-select>
			</el-form-item>
			<el-form-item label="更换原因" prop="cause">
				<el-input
					v-model="formData.cause" type="textarea" placeholder="请输入更换原因" maxlength="150"
					:rows="4"
					show-word-limit
				/>
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
import { replaceMaster } from '@/api/orderManagement/order'

export default {
	name: 'MasterReplace',
	// components: {
	// 	MyUpload
	// },
	// props: {
	// 	list: {
	// 		type: Array,
	// 		default: () => []
	// 	}
	// },
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '520px',
				title: ''
			},
			visible: false,
			formData: {
				orderNo: '',
				oldSfUserId: '',
				newSfUserId: '',
				cause: ''
			},
			formRules: {
				newSfUserId: [
					{ required: true, message: '请选择师傅' }
				],
				cause: [
					{ required: false, message: '请输入追加原因' }
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
			this.formData = Object.assign(this.$options.data().formData, {
				// this.formData = Object.assign(this.$options.data().formData, params, {
				orderNo: params.orderNo || '',
				oldSfUserId: params.belongsToSfUserId || ''
			})
			this.modalOptions.title = '更换师傅'
			this.visible = true
			this.$refs.formData && this.$refs.formData.resetFields()
		},
		async getMasterList() {
			const res = await getMasterPageList({
				userId: this.$store.state.user.userId,
				isCooperationOrisBlacklist: 1
			})
			this.masterList = res.data
		},
		async handleSubmit() {
			if (!this.formData.orderNo) return this.$elMessage('获取订单信息失败', 'warning')
			if (!this.formData.oldSfUserId) return this.$elMessage('获取原来的师傅信息失败', 'warning')
			await this.$validatorForm('formData')
			const loading = this.$elLoading()
			try {
				const res = await replaceMaster(this.formData)
				loading.close()
				this.$elMessage(`更换成功!`)
				this.$emit('success')
				this.visible = false
			} catch (e) {
				loading.close()
			}
		}
	}
}
</script>

