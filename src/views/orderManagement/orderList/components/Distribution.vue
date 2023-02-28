<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions">
		<el-form ref="formData" :model="formData" :rules="formRules" size="mini" label-suffix=":" label-width="100px">
			<el-form-item label="分配师傅" prop="sfUserId">
				<el-select v-model="formData.sfUserId" placeholder="请选择师傅">
					<el-option v-for="item in masterList" :key="item.id" :label="`${item.name}${item.mobile ? ' ' + item.mobile : ''}`" :value="item.id" />
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
import { updateByOrderNoStatus } from '@/api/orderManagement/order'

export default {
	name: 'Distribution',
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
				sfUserId: '',
				status: 4
			},
			formRules: {
				sfUserId: [
					{ required: true, message: '请选择师傅' }
				]
			},
			masterList: [] // 角色列表
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.getMasterList()
			this.modalOptions.title = '分配师傅'
			this.visible = true
			this.formData.orderNo = params.orderNo || ''
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
			await this.$validatorForm('formData')
			const loading = this.$elLoading()
			try {
				const res = await updateByOrderNoStatus(this.formData)
				loading.close()
				this.$elMessage(`分配成功!`)
				this.$emit('success')
				this.visible = false
			} catch (e) {
				loading.close()
			}
		}
	}
}
</script>

