<template>
	<el-dialog
		:visible.sync="visible"
		v-bind="modalOptions"
		center
	>
		<el-form
			ref="formData"
			:model="formData"
			label-position="left"
			label-width="100px"
			label-suffix=""
			size="mini"
		>
			<!-- 订单信息 -->
			<div style="margin-top: 35px;">
				<div class="dialog-section-title" style="display: flex;margin-bottom: 15px;">
					<div
						style="width: 4px;margin-right: 8px;;background-image: linear-gradient(#409EFF, #2E6FAE, #071A2C);border-radius: 1px;"
					>
					</div>
					<span>基本信息</span>
				</div>
				<div style="display: flex;justify-content: space-between;">
					<div style="width: 40%;">
						<el-form-item label="用户姓名" prop="name">
							{{ formData.name || '--' }}
						</el-form-item>
						<el-form-item label="生日" prop="birth">
							{{ formData.birth || '--' }}
						</el-form-item>
						<el-form-item label="邮箱" prop="email">
							{{ formData.email || '--' }}
						</el-form-item>
						<el-form-item label="在职状态" prop="workState">
							<span v-if="formData.workState === 0">在职</span>
							<span v-else-if="formData.workState === 1">离职</span>
							<span v-else>--</span>
						</el-form-item>
						<el-form-item label="服务区域" prop="serverCity">
							{{ formData.serverCity || '--' }}
						</el-form-item>
						<el-form-item label="添加人" prop="createUser">
							{{ formData.createUser || '--' }}
						</el-form-item>
						<el-form-item label="更新人" prop="updateUser">
							{{ formData.updateUser || '--' }}
						</el-form-item>
						<el-form-item label="技能专长" prop="skillList">
							{{ formData.skillList || '--' }}
						</el-form-item>
					</div>
					<div style="width: 50%;">
						<el-form-item label="性别" prop="gender">
							<span v-if="formData.gender === 0">男</span>
							<span v-else-if="formData.gender === 1">女</span>
							<span v-else>--</span>
						</el-form-item>
						<el-form-item label="手机号" prop="mobile">
							{{ formData.mobile || '--' }}
						</el-form-item>
						<el-form-item label="工作年限" prop="workYear">
							{{ formData.workYear || '--' }}
						</el-form-item>
						<el-form-item label="主营区域" prop="workCity">
							{{ formData.workCity || '--' }}
						</el-form-item>
						<el-form-item label="门店地址" prop="shopCity">
							{{ formData.shopCity || '--' }}
						</el-form-item>
						<el-form-item label="创建时间" prop="createTime">
							{{ formData.createTime || '--' }}
						</el-form-item>
						<el-form-item label="更新时间" prop="updateTime">
							{{ formData.updateTime || '--' }}
						</el-form-item>
					</div>
				</div>
			</div>
			<div style="margin-top: 35px;">
				<div class="dialog-section-title" style="display: flex;margin-bottom: 15px;">
					<div
						style="width: 4px;margin-right: 8px;;background-image: linear-gradient(#409EFF, #2E6FAE, #071A2C);border-radius: 1px;"
					>
					</div>
					<span>车辆信息</span>
				</div>
				<div style="display: flex;justify-content: space-between;">
					<div style="width: 40%;">
						<el-form-item label="车辆号码" prop="carNo">
							{{ formData.carNo || '--' }}
						</el-form-item>
						<el-form-item label="车辆规格" prop="specification">
							{{ formData.specification || '--' }}
						</el-form-item>
						<el-form-item label="车辆照片" prop="carImg">
							<el-image v-if="formData.carImg" :src="formData.carImg" style="width:80px; height:80px" fit="cover" :preview-src-list="[ formData.carImg ]" />
							<span v-else>--</span>
						</el-form-item>
					</div>
					<div style="width: 50%;">
						<el-form-item label="车辆类型" prop="typ">
							{{ formData.typ || '--' }}
						</el-form-item>
						<el-form-item label="品牌型号" prop="brand">
							{{ formData.brand || '--' }}
						</el-form-item>
					</div>
				</div>
			</div>
			<!-- <el-form-item label="ID" prop="id">
				{{ formData.id || '--' }}
				</el-form-item>
				<el-form-item label="用户id" prop="userId">
				{{ formData.userId || '--' }}
				</el-form-item>
				<el-form-item label="状态" prop="state">
				<span v-if="formData.state === 0">有效</span>
				<span v-else-if="formData.state === 1">无效</span>
				<span v-else>--</span>
				</el-form-item> -->
		</el-form>
	</el-dialog>
</template>

<script>
// import { getOrderInfo } from '@/api/enterprise/master'

export default {
	name: 'DetailModal',
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '900px',
				title: '师傅详情'
			},
			visible: false,
			formData: {
				id: '',
				userId: '',
				name: '',
				gender: '',
				birth: '',
				email: '',
				skillList: '',
				workCity: '',
				workYear: '',
				workState: '',
				serverCity: '',
				shopCity: '',
				state: '',
				createUser: '',
				updateUser: '',
				createTime: '',
				updateTime: '',
				mobile: '',
				specification: '',
				typ: '',
				brand: '',
				carNo: '',
				carImg: ''
			}
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.formData = Object.assign(this.$options.data().formData, params)
			if (params.userId) {
				// this.getInfo(params.userId)
			}
			this.visible = true
		},
		async getInfo(userId) {
			const loading = this.$elLoading('加载中')
			try {
				const res = await getOrderInfo({ userId })
				this.formData = Object.assign(this.$options.data().formData, res.data, {
					id: res.data.id || '',
					userId: res.data.userId || '',
					name: res.data.name || '',
					gender: res.data.gender || '',
					birth: res.data.birth || '',
					email: res.data.email || '',
					skillList: res.data.skillList || '',
					workCity: res.data.workCity || '',
					workYear: res.data.workYear || '',
					workState: res.data.workState || '',
					serverCity: res.data.serverCity || '',
					shopCity: res.data.shopCity || '',
					state: res.data.state || '',
					createUser: res.data.createUser || '',
					updateUser: res.data.updateUser || '',
					createTime: res.data.createTime || '',
					updateTime: res.data.updateTime || '',
					mobile: res.data.mobile || '',
					specification: res.data.specification || '',
					typ: res.data.typ || '',
					brand: res.data.brand || '',
					carNo: res.data.carNo || '',
					carImg: res.data.carImg || ''
				})
			} finally {
				loading.close()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.dialog-section-title {
	font-size: 16px;
	color: #333333;
}

.form-item-line {
	/deep/ .el-form-item__content {
		line-height: 16px;
	}
}

/deep/ .el-dialog {

	.el-dialog__header {
		font-size: 18px;
		font-weight: bold;
		color: #333333;
	}

	.el-dialog__body {
		padding: 0 25px 30px;

		.el-form-item {
			margin-bottom: 6px;

			label {
				color: #9E9E9E;
			}

			.el-form-item__content {
				color: #333333;
			}
		}
	}
}
</style>
