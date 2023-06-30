<template>
	<div>
		<el-dialog
			:visible.sync="visible" v-bind="modalOptions"
			:custom-class="visibleArea ? 'master-dialog-info' : 'master-dialog-info-only'"
		>
			<div slot="title">
				<div style="display: flex;font-size: 18px;">
					<div>基本信息</div>
				</div>
			</div>
			<div
				style="display: flex;justify-content: space-between;align-items: center;height: 295px;margin-top: 12px;;background-color: #f9f9f9;"
			>
				<div style="width: 200px;">
					<el-image
						lazy :src="formData.headUrl" style="width:100%; height:100%" fit="contain"
						:preview-src-list="[ formData.headUrl ]"
					/>
				</div>
				<div style="flex: 1;width: 0;margin-left: 30px;padding: 20px;background-color: #ffffff;">
					<div style="display: flex;justify-content: space-between;align-items: center;">
						<div style="font-weight: bold;">
							{{ formData.name }}<span v-if="formData.certification === 1"> （已认证）</span><span
								v-else-if="formData.certification === 0"
							>
								（未认证）
							</span> | {{ formData.gender === 0 ? '男'
								: formData.gender === 1 ? '女' : '--' }}
							<!-- | ID {{ formData.userId || '--' }} -->
							| 生日： {{
								formData.birth ||
									'--' }} | 工作年限： {{ formData.workYear ? formData.workYear + 'Y' : '--' }} | <span
								style="padding: 3px;color: #FC4023;background-color: #FFFBED;"
							>
								{{ formData.workState === 0 ? '在职'
									: formData.workState === 1 ? '离职' : '--' }}
							</span>
						</div>
						<div
							style="display: flex;align-items: center;padding: 5px 15px;font-size: 16px;color: #ffffff;background-color: #e95d20;border-radius: 10px;cursor: pointer;"
							@click="handleOpenWorkArea"
						>
							<span>主营区域</span>
							<div style="padding-left: 8px;"><svg-icon icon-class="h-lineArrow" class-name="card-panel-icon" /></div>
						</div>
					</div>
					<div style="font-size: 16px;margin-top: 24px;">
						<span style="color: #64748B;">
							门店地址&nbsp;&nbsp;&nbsp;&nbsp;
						</span><span>{{ formData.shopCity || '--' }}</span>
					</div>
					<div style="font-size: 16px;margin-top: 24px;display: flex;">
						<span style="color: #64748B;">
							服务区域&nbsp;&nbsp;&nbsp;&nbsp;
						</span>
						<div v-if="formData.serverCity" style="flex: 1;max-height: 58px;overflow-y: auto;">
							<div v-for="i in JSON.parse(formData.serverCity).map(item => item.join(' '))" :key="i">
								<span>{{ i }}</span>
							</div>
						</div>
						<div v-else>--</div>
					</div>
					<div
						style="font-size: 16px;display: flex;justify-content: space-around;margin-top: 36px;background-color: #f8fbfd;"
					>
						<div style="">
							<div style="display: flex;justify-content: flex-start;align-items: center;padding-bottom: 2px;">
								<div
									style="display: flex;align-items: center;justify-content: center;padding: 0.5em;margin-right: 0.5em;;border: 1px solid #64748B;border-radius: 50%;"
								>
									<svg-icon icon-class="h-call" class-name="card-panel-icon" />
								</div>
								<div style="font-weight: bold;">手机号码</div>
							</div>
							<div style="padding-left: 2.5em;">
								<div style="color: #0519D4;">{{ formData.mobile || '--' }}</div>
							</div>
						</div>
						<div style="width: 2px;background-color: #e4eafd;"></div>
						<div>
							<div style="display: flex;justify-content: flex-start;align-items: center;padding-bottom: 2px;">
								<div
									style="display: flex;align-items: center;justify-content: center;padding: 0.5em;margin-right: 0.5em;;border: 1px solid #64748B;border-radius: 50%;"
								>
									<svg-icon icon-class="h-aEmail" class-name="card-panel-icon" />
								</div>
								<div style="font-weight: bold;">邮箱</div>
							</div>
							<div style="padding-left: 2.5em;">
								<div style="color: #0519D4;">{{ formData.email || '--' }}</div>
							</div>
						</div>
						<div style="width: 2px;background-color: #e4eafd;"></div>
						<!-- <div>
							<div style="display: flex;justify-content: flex-start;align-items: center;padding-bottom: 2px;">
							<div
							style="display: flex;align-items: center;justify-content: center;padding: 0.5em;margin-right: 0.5em;;border: 1px solid #64748B;border-radius: 50%;"
							>
							<svg-icon icon-class="h-account" class-name="card-panel-icon" />
							</div>
							<div style="font-weight: bold;">身份证</div>
							</div>
							<div style="padding-left: 2.5em;">
							<div style="color: #0519D4;">{{ formData.ident || '--' }}</div>
							</div>
							</div>
							<div style="width: 2px;background-color: #e4eafd;"></div> -->
						<div>
							<div style="display: flex;justify-content: flex-start;align-items: center;padding-bottom: 2px;">
								<div
									style="display: flex;align-items: center;justify-content: center;padding: 0.5em;margin-right: 0.5em;;border: 1px solid #64748B;border-radius: 50%;"
								>
									<svg-icon icon-class="h-service" class-name="card-panel-icon" />
								</div>
								<div style="font-weight: bold;">客服专员</div>
							</div>
							<div style="padding-left: 2.5em;">
								<div style="color: #0519D4;">{{ formData.createUser || '--' }}</div>
							</div>
						</div>
						<div style="width: 2px;background-color: #e4eafd;"></div>
						<div>
							<div style="display: flex;justify-content: flex-start;align-items: center;padding-bottom: 2px;">
								<div
									style="display: flex;align-items: center;justify-content: center;padding: 0.5em;margin-right: 0.5em;;border: 1px solid #64748B;border-radius: 50%;"
								>
									<svg-icon icon-class="h-watchLater" class-name="card-panel-icon" />
								</div>
								<div style="font-weight: bold;">注册时间</div>
							</div>
							<div style="padding-left: 2.5em;">
								<div style="color: #0519D4;">{{ formData.createTime || '--' }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</el-dialog>
		<el-dialog
			:visible.sync="visibleArea"
			v-bind="{ closeOnClickModal: false, width: '1100px', title: '主营区域', modal: visible ? false : true, showClose: false }"
			:class="visible ? 'master-dialog-service' : 'master-dialog-service-only'" custom-class="master-dialog-area"
		>
			<div slot="title" style="padding-bottom: 10px;border-bottom: 1px solid #eaeaea;">
				<div style="display: flex;font-size: 18px;">
					<div>主营区域（{{ formData.workCityArr.length }}个）</div>
				</div>
			</div>
			<el-form ref="formData" :model="formData" label-position="left" label-width="0px" label-suffix="" size="mini">
				<div style="margin-top: 5px;">
					<el-form-item label="" prop="workCity">
						<!-- {{ formData.workCity ? formData.workCity.replaceAll(',', '，\n') : '--' }} -->
						<div v-if="formData.workCity">
							<div v-for="i in formData.workCity.split(',')" :key="i" style="margin-bottom: 10px;">
								<span>{{ i }}</span>
							</div>
						</div>
						<div v-else>--</div>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" style="text-align: center;">
				<el-button style="padding: 10px 32px;" type="danger" size="medium" @click="visibleArea = false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { correlationInfo } from '@/api/enterprise/employee'

export default {
	name: 'DetailModal',
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '1100px',
				title: '师傅详情',
				beforeClose: this.handleClose
			},
			visible: false,
			visibleArea: false,
			formData: {
				id: '',
				headUrl: '',
				userId: '',
				name: '',
				gender: '',
				birth: '',
				email: '',
				ident: '',
				skillTypeNameList: '',
				workCity: '',
				workCityArr: [],
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
				carImg: '',
				certification: ''
			}
		}
	},
	methods: {
		handleClose() {
			this.visibleArea = false
			this.visible = false
		},
		handleOpen(params = {}, meaning) {
			this.formData = Object.assign(this.$options.data().formData, params, {
				workCityArr: params.workCity ? params.workCity.split(',') : []
			})
			if (params.id) {
				this.getInfo(params.id)
			}
			if (meaning === 'area') {
				this.visibleArea = true
			} else if (meaning === 'detail') {
				this.visible = true
			}
		},
		async getInfo(id) {
			const loading = this.$elLoading('加载中')
			try {
				const res = await correlationInfo({ id })
				this.formData = Object.assign(this.$options.data().formData, res.data, {
					id: res.data.id || '',
					headUrl: res.data.headUrl || '',
					userId: res.data.userId || '',
					name: res.data.name || '',
					gender: res.data.gender,
					birth: res.data.birth || '',
					email: res.data.email || '',
					skillTypeNameList: res.data.skillTypeNameList || '',
					workCity: res.data.workCity || '',
					workCityArr: res.data.workCity ? res.data.workCity.split(',') : [],
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
					carImg: res.data.carImg || '',
					certification: res.data.certification || ''
				})
			} finally {
				loading.close()
			}
		},
		handleOpenWorkArea() {
			this.visibleArea = !this.visibleArea
		}
	}
}
</script>

<style lang="scss" scoped>
// /deep/ .master-dialog-service {
// 	top: 447px; // 30（此）（+387.xx）（+顶30）
// }
// /deep/ .master-dialog-service-only {
// 	top: 220px;
// }

// /deep/ .el-dialog {
// 	&.master-dialog-info {
// 		margin-top: 30px !important;
// 	}
// 	&.master-dialog-info-only {
// 		margin-top: 220px !important;
// 	}

// 	&.master-dialog-area {
// 		margin-top: 0px !important;
// 		margin-bottom: 30px !important;
// 		max-height: calc(100vh - 477px); // 447（+底30）
// 	}
/deep/ .master-dialog-service {
	top: calc(10vh + 387px); // （+顶5vh）（+387.xx）（+底5vh）
}

/deep/ .master-dialog-service-only {
	top: 25vh;
}

/deep/ .el-dialog {
	&.master-dialog-info {
		margin-top: 5vh !important;
	}

	&.master-dialog-info-only {
		margin-top: 25vh !important;
	}

	&.master-dialog-area {
		margin-top: 0px !important;
		margin-bottom: 5vh !important;
		max-height: calc(85vh - 387px); // 100-（10vh + 387px）-（底5vh）
	}

	.el-dialog__header {
		font-size: 18px;
		font-weight: bold;
		color: #333333;
	}

	.el-dialog__body {
		padding: 0 25px 30px;
		font-size: 18px;
		color: #000000;

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
