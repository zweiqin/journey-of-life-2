<template>
	<el-dialog
		:visible.sync="visible"
		v-bind="modalOptions"
	>
		<el-form
			ref="formData"
			:model="formData"
			size="mini"
			label-suffix=":"
			label-width="150px"
		>
			<!-- 订单信息 -->
			<el-form-item label="订单Id" prop="id">
				{{ formData.id || '--' }}
			</el-form-item>
			<el-form-item label="追加订单号" prop="extraNo">
				{{ formData.extraNo || '--' }}
			</el-form-item>
			<el-form-item label="订单号码" prop="orderNo">
				{{ formData.orderNo || '--' }}
			</el-form-item>
			<el-form-item label="创建追加单的用户id" prop="createId">
				{{ formData.createId || '--' }}
			</el-form-item>
			<el-form-item label="追加金额" prop="extraPrice">
				{{ formData.extraPrice || '--' }}
			</el-form-item>
			<el-form-item label="追加原因" prop="extraRemark">
				{{ formData.extraRemark || '--' }}
			</el-form-item>
			<el-form-item label="订单状态" prop="status">
				<span v-if="formData.status === 0">待支付</span>
				<span v-else-if="formData.status === 1">待接单</span>
				<span v-else-if="formData.status === 2">待报价</span>
				<span v-else-if="formData.status === 3">待分配</span>
				<span v-else-if="formData.status === 4">已分配</span>
				<span v-else-if="formData.status === 5">配送中</span>
				<span v-else-if="formData.status === 6">已完成</span>
				<span v-else-if="formData.status === 7">已取消</span>
				<span v-else-if="formData.status === 8">异常</span>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="订单备注" prop="remarks">
				{{ formData.remarks || '--' }}
			</el-form-item>
			<el-form-item label="创建时间" prop="createTime">
				{{ formData.createTime || '--' }}
			</el-form-item>
			<el-form-item label="更新时间" prop="updateTime">
				{{ formData.updateTime || '--' }}
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
import { getOrderExtraInfo } from '@/api/orderManagement/order'

export default {
	name: 'DetailModal',
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '800px',
				title: '查看追加金额订单详情'
			},
			visible: false,
			formData: {
				id: '',
				extraNo: '',
				orderNo: '',
				createId: '',
				extraPrice: '',
				extraRemark: '',
				status: '',
				remarks: '',
				createTime: '',
				updateTime: ''
			}
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.formData = Object.assign(this.$options.data().formData, params)
			if (params.extraNo) {
				this.getInfo(params.extraNo)
			}
			this.visible = true
		},
		async getInfo(extraNo) {
			const loading = this.$elLoading('加载中')
			try {
				const res = await getOrderExtraInfo({ extraNo })
				this.formData = Object.assign(this.$options.data().formData, res.data, {
					id: res.data.id || '',
					extraNo: res.data.extraNo || '',
					orderNo: res.data.orderNo || '',
					createId: res.data.createId || '',
					extraPrice: res.data.extraPrice || '',
					extraRemark: res.data.extraRemark || '',
					status: res.data.status || '',
					remarks: res.data.remarks || '',
					createTime: res.data.createTime || '',
					updateTime: res.data.updateTime || ''
				})
			} finally {
				loading.close()
			}
		}
	}
}
</script>

