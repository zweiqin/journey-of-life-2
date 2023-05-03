<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions">
		<div slot="title">
			<div style="display: flex;font-size: 20px;">
				<div
					style="width: 4px;height: 18px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
				>
				</div>
				<div>追加金额订单详情</div>
			</div>
		</div>
		<el-form ref="formData" :model="formData" size="mini" label-suffix="：" label-width="170px">
			<!-- 订单信息 -->
			<el-form-item label="订单ID" prop="id">
				{{ formData.id || '--' }}
			</el-form-item>
			<el-form-item label="追加订单号" prop="extraNo">
				{{ formData.extraNo || '--' }}
			</el-form-item>
			<el-form-item label="订单号码" prop="orderNo">
				{{ formData.orderNo || '--' }}
			</el-form-item>
			<el-form-item label="创建追加单的用户ID" prop="createId">
				{{ formData.createId || '--' }}
			</el-form-item>
			<el-form-item label="追加金额" prop="extraPrice">
				<span style="color: #FA5151;">￥{{ formData.extraPrice || formData.extraPrice === 0 ? formData.extraPrice : '--' }}</span>
			</el-form-item>
			<el-form-item label="追加原因" prop="extraRemark">
				{{ formData.extraRemark || '--' }}
			</el-form-item>
			<el-form-item label="订单状态" prop="status">
				<el-tag v-if="formData.status === 0" type="danger">待付款</el-tag>
				<el-tag v-else-if="formData.status === 1">待接单</el-tag>
				<el-tag v-else-if="formData.status === 2" type="success">待报价</el-tag>
				<el-tag v-else-if="formData.status === 3">待分配</el-tag>
				<el-tag v-else-if="formData.status === 4" type="success">已分配</el-tag>
				<el-tag v-else-if="formData.status === 5" type="success">服务中</el-tag>
				<el-tag v-else-if="formData.status === 6" type="info">已完成</el-tag>
				<el-tag v-else-if="formData.status === 7" type="info">已取消</el-tag>
				<el-tag v-else-if="formData.status === 8" type="danger">异常</el-tag>
				<span v-else>--</span>
			</el-form-item>
			<el-form-item label="需求说明" prop="remarks">
				{{ formData.remarks || '--' }}
			</el-form-item>
			<div style="display: flex;">
				<el-form-item label="创建时间" prop="createTime">
					<span style="color: #007F75;">{{ formData.createTime || '--' }}</span>
				</el-form-item>
				<el-form-item label="更新时间" prop="updateTime">
					{{ formData.updateTime || '--' }}
				</el-form-item>
			</div>
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
					status: res.data.status,
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

<style lang="scss" scoped>

.el-tag {
	height: auto;
	padding: 4px 10px;
	line-height: normal;
	border: 0;
}
/deep/ .el-dialog {

	.el-dialog__header {
		position: relative;
		margin-top: 20px;
		margin-left: 20px;
		font-weight: bold;
		color: #333333;
	}

	.el-dialog__body {
		padding: 18px 40px 20px;

		.el-form-item {
			margin-top: 2px;
			margin-bottom: 10px;

			label {
				color: #64748B;
			}

			.el-form-item__content {
				// margin-left: 0!important;
				color: #000000;
			}
		}
	}
}
</style>

