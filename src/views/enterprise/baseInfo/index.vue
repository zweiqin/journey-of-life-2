<template>
	<div class="app-container">

		<div class="other-container">
			<div style="display: flex;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
				<div
					style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;"
				>
				</div>
				<div>店长信息</div>
			</div>
		</div>
		<div>
			<el-card
				:body-style="{ 'padding': '30px 28px 20px' }"
				style="box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);"
			>
				<div class="">
					<div style="display: flex;justify-content: space-between;">
						<div style="font-weight: bold;">基本信息</div>
						<!-- <div>信息变更</div> -->
					</div>
					<div style="display: flex;justify-content: space-between;margin-top: 12px;padding: 20px 5px;background-color: #f9f9f9;">
						<div style="width: 200px;">
							<el-image
								lazy :src="information.headUrl" style="width:100%; height:100%" fit="contain"
								:preview-src-list="[ information.headUrl ]"
							/>
						</div>
						<div style="flex: 1;width: 0;margin-left: 30px;padding: 20px;background-color: #ffffff;">
							<div style="display: flex;justify-content: space-between;align-items: center;">
								<div style="font-weight: bold;">
									{{ information.name }} | {{ information.gender === 0 ? '男'
										: information.gender === 1 ? '女' : '--' }} | ID {{ information.userId || '--' }} | 生日： {{
										information.birth ||
											'--' }} | 工作年限： {{ information.workYear || '--' }} | <span
										style="padding: 3px;color: #FC4023;background-color: #FFFBED;"
									>
										{{ information.workState === 0 ? '在职'
											: information.workState === 1 ? '离职' : '--' }}
									</span>
								</div>
								<div
									style="display: flex;align-items: center;padding: 5px 15px;font-size: 16px;color: #ffffff;background-color: #e95d20;border-radius: 10px;cursor: pointer;"
									@click="handleOpenServiceArea"
								>
									<span>服务区域</span>
									<div style="padding-left: 8px;"><svg-icon icon-class="h-lineArrow" class-name="card-panel-icon" /></div>
								</div>
							</div>
							<div style="font-size: 16px;margin-top: 24px;">
								<span style="color: #64748B;">
									门店地址&nbsp;&nbsp;&nbsp;&nbsp;
								</span><span>{{ information.shopCity || '--' }}</span>
							</div>
							<div style="font-size: 16px;margin-top: 24px;">
								<span style="color: #64748B;">
									主营区域&nbsp;&nbsp;&nbsp;&nbsp;
								</span><span>{{ information.workCity || '--' }}</span>
							</div>
							<div style="font-size: 16px;display: flex;justify-content: space-around;margin-top: 36px;background-color: #f8fbfd;">
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
										<div style="color: #0519D4;">{{ information.mobile || '--' }}</div>
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
										<div style="color: #0519D4;">{{ information.email || '--' }}</div>
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
									<div style="color: #0519D4;">{{ information.ident || '--' }}</div>
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
										<div style="font-weight: bold;">客服经理</div>
									</div>
									<div style="padding-left: 2.5em;">
										<div style="color: #0519D4;">{{ information.createUser || '--' }}</div>
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
										<div style="color: #0519D4;">{{ information.createTime || '--' }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</el-card>
		</div>
		<div class="box-bottom-card" style="flex: 1;height: 0;display: flex;justify-content: space-between;margin-top: 16px;">
			<div style="width: 49%;">
				<el-card style="height: 100%;overflow-y: auto;" :body-style="{ 'padding': '30px 28px 20px' }">
					<div slot="header">
						<div><span style="font-weight: bold;">车辆信息</span></div>
					</div>
					<div class="" style="overflow-y: auto;">
						<el-form
							ref="formDataCar" :model="information" size="mini" label-suffix=""
							label-width="100px"
							label-position="left"
						>
							<el-form-item label="品牌型号" prop="brand">
								{{ information.brand || '--' }}
							</el-form-item>
							<el-form-item label="车辆号码" prop="carNo">
								{{ information.carNo || '--' }}
							</el-form-item>
							<el-form-item label="车辆规格" prop="specification">
								{{ information.specification || '--' }}
							</el-form-item>
							<el-form-item label="车辆类型" prop="typ">
								{{ information.typ || '--' }}
							</el-form-item>
						</el-form>
					</div>
				</el-card>
			</div>
			<div style="width: 49%;">
				<el-card style="height: 100%;overflow-y: auto;" :body-style="{ 'padding': '30px 28px 20px' }">
					<div slot="header">
						<div><span style="font-weight: bold;">认证信息</span></div>
					</div>
					<div class="" style="overflow-y: auto;">
						<el-form
							ref="formDataCar" :model="information" size="mini" label-suffix=""
							label-width="100px"
							label-position="left"
						>
							<el-form-item label="专业技能" prop="skillTypeNameList">
								<span>{{ information.skillTypeNameList.length ? information.skillTypeNameList.join('，\n') : '--' }}</span>
							</el-form-item>
							<!-- <el-form-item label="身份证" prop="certImg1">
								<el-collapse accordion style="">
								<el-collapse-item title="">
								<div style="display: flex;">
								<div style="">
								<el-image
								v-if="information.certImg1" :src="information.certImg1"
								style="width:80px; height:80px" fit="cover" :preview-src-list="[ information.certImg1 ]"
								/>
								<span v-else>--</span>
								</div>
								<div style="padding-left: 15px;">
								<el-image
								v-if="information.certImg2" :src="information.certImg2"
								style="width:80px; height:80px" fit="cover" :preview-src-list="[ information.certImg2 ]"
								/>
								<span v-else>--</span>
								</div>
								</div>
								</el-collapse-item>
								</el-collapse>
								</el-form-item> -->
							<el-form-item label="车辆图片" prop="carImg">
								<el-collapse accordion style="">
									<el-collapse-item title="">
										<div style="">
											<el-image
												v-if="information.carImg" :src="information.carImg" style="width:80px; height:80px"
												fit="cover" :preview-src-list="[ information.carImg ]"
											/>
											<span v-else>--</span>
										</div>
									</el-collapse-item>
								</el-collapse>
							</el-form-item>
							<el-form-item label="行驶证" prop="driverLicensePath">
								<el-collapse accordion style="">
									<!-- <el-collapse-item>
										<template #title>
										<el-image v-if="information.driverLicensePath" :src="information.driverLicensePath" style="width:80px; height:80px" fit="cover" :preview-src-list="[ information.driverLicensePath ]" />
										<span v-else>--</span>
										</template>
										</el-collapse-item> -->
									<el-collapse-item title="">
										<div style="">
											<el-image
												v-if="information.driverLicensePath" :src="information.driverLicensePath"
												style="width:80px; height:80px" fit="cover"
												:preview-src-list="[ information.driverLicensePath ]"
											/>
											<span v-else>--</span>
										</div>
									</el-collapse-item>
								</el-collapse>
							</el-form-item>
							<el-form-item label="驾驶证" prop="driverNoPath">
								<el-collapse accordion style="">
									<el-collapse-item title="">
										<div style="">
											<el-image
												v-if="information.driverNoPath" :src="information.driverNoPath"
												style="width:80px; height:80px" fit="cover" :preview-src-list="[ information.driverNoPath ]"
											/>
											<span v-else>--</span>
										</div>
									</el-collapse-item>
								</el-collapse>
							</el-form-item>
						</el-form>
					</div>
				</el-card>
			</div>
		</div>

		<el-dialog
			:visible.sync="serviceAreaVisible"
			v-bind="{ closeOnClickModal: false, width: '1000px', title: '服务区域', modal: true, showClose: false }"
			custom-class="master-dialog-area"
		>
			<div slot="title" style="padding-bottom: 10px;border-bottom: 1px solid #eaeaea;">
				<div style="display: flex;font-size: 18px;">
					<div>服务区域（{{ information.serverCity.length }}个）</div>
				</div>
			</div>
			<el-form ref="information" :model="information" label-position="left" label-width="0px" label-suffix="" size="mini">
				<div style="margin-top: 5px;">
					<el-form-item label="" prop="serverCity">
						<div v-if="information.serverCity">
							<div v-for="i in JSON.parse(information.serverCity).map(item => item.join(' '))" :key="i" style="margin-bottom: 1px;">
								<span>{{ i }}</span>
							</div>
						</div>
						<div v-else>--</div>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" style="text-align: center;">
				<el-button style="padding: 10px 32px;" type="danger" size="medium" @click="serviceAreaVisible = false">关闭</el-button>
			</div>
		</el-dialog>

		<el-dialog
			:visible.sync="serviceAreaVisible" v-bind="{ closeOnClickModal: false, width: '1000px', title: '服务区域（区）', modal: false }"
			class="master-dialog-sarea" custom-class="master-dialog-sa"
		>
			<div>
				<div style="height: 500px;">
					<ServiceArea :server-city-all="serverCityAll" @map-change="handleMapChange"></ServiceArea>
				</div>
				<div style="display: flex;justify-content: center;">
					<el-button style="padding: 7px 22px;margin-top: 15px;" type="primary" size="mini" @click="serviceAreaVisible = false">
						确定
					</el-button>
				</div>
			</div>
		</el-dialog>

	</div>
</template>

<script>
import { getMasterInfoByUserId } from '@/api/baseInfo/baseInfo'
import ServiceArea from '@/components/ServiceArea'
import { zhanzhangStatistics } from '@/api/homepage/homepage'
import pcaCode from '@/../static/echartsMaps/dtsj/ld/ssq/pca-code-change.json'

export default {
	name: 'BaseInfo',
	components: {
		ServiceArea
	},
	data() {
		return {
			information: {
				id: '',
				userId: '',
				name: '',
				ident: '',
				gender: '',
				headUrl: '',
				certImg1: '',
				certImg2: '',
				birth: '',
				email: '',
				driverNoPath: '',
				driverLicensePath: '',
				skillType: '',
				skillList: '',
				skillTypeNameList: '',
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
			},
			serviceAreaVisible: false,
			serverCityAll: []
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		async getInfo() {
			const res = await getMasterInfoByUserId({ userId: this.$store.state.user.userId })
			this.information = Object.assign(this.$options.data().information, res.data, {
				id: res.data.id || '',
				userId: res.data.userId || '',
				name: res.data.name || '',
				ident: res.data.ident || '',
				gender: res.data.gender,
				headUrl: res.data.headUrl || '',
				certImg1: res.data.certImg1 || '',
				certImg2: res.data.certImg2 || '',
				birth: res.data.birth || '',
				email: res.data.email || '',
				driverNoPath: res.data.driverNoPath || '',
				driverLicensePath: res.data.driverLicensePath || '',
				skillType: res.data.skillType || '',
				skillList: res.data.skillList || '',
				skillTypeNameList: res.data.skillTypeNameList || '',
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
		},
		async handleOpenServiceArea() {
			await this.getServiceAreaInfo()
			this.serviceAreaVisible = true
		},
		async getServiceAreaInfo() {
			const res = await zhanzhangStatistics({})
			// this.setStatic(res)
			// const res = { data: {} }
			// this.provinceAll = this.information.serverCityList.filter((item, index) => this.information.serverCityList.findIndex((element) => element.province === item.province) === index).map((item) => item.province) // 一维数组，所有省级
			// this.serverCityAll = this.provinceAll.map((item) => this.information.serverCityList.filter((element) => element.province === item)) // 二维数组：[ [省1[区一],[区二]]，[省2[区三],[区四]] ]
			this.serverCityAll = this.arrConversion(res.data.serverCityList, { province: '', city: '', area: '' }, pcaCode)
			console.log(this.serverCityAll)
			// console.log(this.information)
		},
		async handleMapChange(address) {
			// const res = await zhanzhangStatistics({ address })
			// this.setStatic(res)
		},
		arrConversion(arr, subobject, comparison) {
			const keys = Object.keys(subobject)
			const level1 = keys[0]// 获取一级属性名称
			const level2 = keys[1]// 获取二级属性名称
			const level3 = keys[2]// 获取三级属性名称
			const list = Array.from(new Set(arr.map((item) => item[level1]))) // 省的数组
			const subList = []
			list.forEach((res, index) => { // 省的数组，每一个省（的名称）
				const tempLevel1 = comparison.find((item) => item.name === res) // 某个省对象
				arr.forEach((ele, num) => { // 一条一条的数据的数组，每一条
					if (ele[level1] === res) { // 选出，部分（每一条，根据省，进行分组）
						const nameArr = subList.map((item) => item.label) // 数组，包含已有的省的名称（label），组成的数组
						const tempLevel2 = tempLevel1 && tempLevel1.children.find((item) => item.name === ele[level2]) // 某个市对象
						if (nameArr.indexOf(res) !== -1) { // 判断1，已经有某省（的名称的）数据
							const nameArr2 = subList[nameArr.indexOf(res)].children.map((item) => item.label) // 数组，包含某省下面，已有的市的名称（label），组成的数组
							if (nameArr2.indexOf(ele[level2]) !== -1) { // 判断2，已经有某市（的名称的）数据
								const levelTwoVal = tempLevel1 && tempLevel1.children.find((item) => item.name === ele[level2]).code
								const levelThreeVal = tempLevel2 && tempLevel2.children.find((item) => item.name === ele[level3]).code
								subList[nameArr.indexOf(res)].children[nameArr2.indexOf(ele[level2])].children.push({ // 某市（的名称的）数据，下面的children加一个子数据
									value: levelThreeVal,
									label: ele[level3],
									pv: levelTwoVal,
									level: 3,
									workerCount: ele.workerCount,
									orderSum: ele.orderSum
								})
							} else { // 判断2，还没有某市（的名称的）数据
								// console.log(ele[level1], ele[level2], ele[level3])
								const levelOneVal = tempLevel1 && tempLevel1.code
								const levelTwoVal = tempLevel1 && tempLevel1.children.find((item) => item.name === ele[level2]).code
								const levelThreeVal = tempLevel2 && tempLevel2.children.find((item) => item.name === ele[level3]).code
								subList[nameArr.indexOf(res)].children.push({
									value: levelTwoVal,
									label: ele[level2],
									level: 2,
									pv: levelOneVal,
									children: [ {
										value: levelThreeVal,
										label: ele[level3],
										level: 3,
										pv: levelTwoVal,
										workerCount: ele.workerCount,
										orderSum: ele.orderSum
									} ]
								})
							}
						} else { // 判断1，还没有某省（的名称的）数据
							const levelOneVal = tempLevel1 && tempLevel1.code
							const levelTwoVal = tempLevel1 && tempLevel1.children.find((item) => item.name === ele[level2]).code
							const levelThreeVal = tempLevel2 && tempLevel2.children.find((item) => item.name === ele[level3]).code
							subList.push({
								value: levelOneVal,
								label: res,
								level: 1,
								pv: '100000',
								// id: index + 1,
								// pid: 0,
								children: [ {
									value: levelTwoVal,
									label: ele[level2],
									level: 2,
									pv: levelOneVal,
									// id: ,
									pid: index + 1,
									children: [ {
										value: levelThreeVal,
										label: ele[level3],
										level: 3,
										pv: levelTwoVal,
										// id: ,
										// pid: ,
										workerCount: ele.workerCount,
										orderSum: ele.orderSum
									} ]
								} ]
							})
						}
					}
				})
			})
			return subList
		}
	}
}
</script>

<style lang="scss" scoped>
.app-container {
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 20px;
	font-size: 18px;
	background-color: rgb(245, 246, 247);

	/deep/ .box-bottom-card {
		.el-card__header {
			padding-left: 28px;
			font-size: 18px;
			color: #555555;
		}

		.el-form {
			.el-form-item__label {
				font-size: 16px;
				color: #64748B;
			}

			.el-form-item__content {
				font-size: 16px;
			}

			.el-collapse {
				border: 0;

				.el-collapse-item {
					&.is-active {
						height: 90px;
					}

					.el-collapse-item__header {
						height: 24px;
						border: 0;
					}

					.el-collapse-item__wrap {
						position: relative;
						top: -24px;
						left: 0;
						z-index: 2;
						width: 60%;
						border: 0;

						.el-collapse-item__content {
							padding: 0;
						}
					}
				}
			}
		}
	}
}

/deep/ .el-button--primary {
	background-color: #0519d4;
	border-color: #0519d4;
}

/deep/ .el-button--primary:active {
	background: #1682e6;
	border-color: #1682e6;
	color: #FFFFFF;
	outline: none;
}

/deep/ .el-button--primary:hover {
	background: #46a6ff;
	border-color: #46a6ff;
	color: #FFFFFF;
}

/deep/ .master-dialog-sarea {
	top: calc(99vh - 660px); // （+顶5vh）（+387.xx）（+底5vh）
}

/deep/ .el-dialog {
	&.master-dialog-area {
		margin-top: 3vh !important;
		margin-bottom: 3vh !important;
		max-height: calc(93vh - 660px); // 100-（10vh + 387px）-（底5vh）
		.el-dialog__body {
			padding: 5px 20px;
		}
	}

	&.master-dialog-sa {
		margin-top: 0vh !important;
		margin-bottom: 1vh !important;
	}
}
</style>
