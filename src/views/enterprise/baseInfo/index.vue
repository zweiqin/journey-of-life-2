<template>
	<div class="dashboard-editor-container">
		<el-row :gutter="0" style="margin-bottom:10px;">
			<el-col :span="24" class="card-box-information">
				<el-card :body-style="{ 'padding': '5px 18px 10px' }">
					<!-- <div slot="header" class="clearfix">
						<div
						style="clip-path: polygon(0px 0px, 60% 0, 100% 50%, 60% 100%, 0px 100%);width: 16px;height: 16px;display: inline-block;background: linear-gradient(270deg, #3CA1FF 0%, #2E70AF 40%, #071A2C 100%);"
						>
						</div>
						<span style="font-weight: bold;color: #333333; ">站长信息</span>
						</div> -->
					<div class="el-table el-table--enable-row-hover el-table--medium">
						<table cellspacing="0" style="width: 100%;">
							<tbody>
								<tr>
									<td><div class="cell" style="padding-bottom: 16px;font-size: 16px;color: #333333;"><span style="padding-bottom: 8px;border-bottom: 2px solid #071A2C;">基本信息：</span></div></td>
								</tr>

								<tr>
									<td><div class="cell">姓名：</div></td>
									<td>
										<div v-if="information.name !== ''" class="cell" style="font-weight: 700;">{{ information.name }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">状态：</div></td>
									<td>
										<span v-if="information.state === 0" class="cell" style="font-weight: 700;">有效</span>
										<span v-else-if="information.state === 1" class="cell" style="font-weight: 700;">无效</span>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">站长性别：</div></td>
									<td>
										<span v-if="information.gender === 0" class="cell" style="font-weight: 700;">男</span>
										<span v-else-if="information.gender === 1" class="cell" style="font-weight: 700;">女</span>
										<span v-else>--</span>
									</td>
									<td><div class="cell">站长的用户ID：</div></td>
									<td>
										<div v-if="information.userId !== ''" class="cell" style="font-weight: 700;">{{ information.userId }}</div>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">站长生日：</div></td>
									<td>
										<div v-if="information.birth !== ''" class="cell" style="font-weight: 700;">{{ information.birth }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">在职状态：</div></td>
									<td>
										<span v-if="information.workState === 0" class="cell" style="font-weight: 700;">在职</span>
										<span v-else-if="information.workState === 1" class="cell" style="font-weight: 700;">离职</span>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">手机号：</div></td>
									<td>
										<div v-if="information.mobile !== ''" class="cell" style="font-weight: 700;">{{ information.mobile }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">工作年限：</div></td>
									<td>
										<div v-if="information.workYear !== ''" class="cell" style="font-weight: 700;">{{ information.workYear }}</div>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">技能清单：</div></td>
									<td>
										<div v-if="information.skillList !== ''" class="cell" style="font-weight: 700;">{{ information.skillList }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">站长邮箱：</div></td>
									<td>
										<div v-if="information.email !== ''" class="cell" style="font-weight: 700;">{{ information.email }}</div>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">主营区域：</div></td>
									<td>
										<div v-if="information.workCity !== ''" class="cell" style="font-weight: 700;">{{ information.workCity }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">技能专长：</div></td>
									<td>
										<div v-if="information.skillType !== ''" class="cell" style="font-weight: 700;">{{ information.skillType }}</div>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">门店地址：</div></td>
									<td>
										<div v-if="information.shopCity !== ''" class="cell" style="font-weight: 700;">{{ information.shopCity }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">添加人：</div></td>
									<td>
										<div v-if="information.createUser !== ''" class="cell" style="font-weight: 700;">{{ information.createUser }}</div>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">驾驶证：</div></td>
									<td>
										<el-image v-if="information.driverNoPath" :src="information.driverNoPath" style="width:80px; height:80px" fit="cover" :preview-src-list="[ information.driverNoPath ]" />
										<span v-else>--</span>
									</td>
									<td><div class="cell">创建时间：</div></td>
									<td>
										<div v-if="information.createTime !== ''" class="cell" style="font-weight: 700;">{{ information.createTime }}</div>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<!-- <td><div style="padding: 10px 0;text-align: center;">车辆信息：</div></td> -->
									<td><div class="cell" style="padding-bottom: 16px;font-size: 16px;color: #333333;"><span style="padding-bottom: 8px;border-bottom: 2px solid #071A2C;">车辆信息：</span></div></td>
								</tr>

								<tr>
									<td><div class="cell">品牌型号：</div></td>
									<td>
										<div v-if="information.brand !== ''" class="cell" style="font-weight: 700;">{{ information.brand }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">车辆规格：</div></td>
									<td>
										<div v-if="information.specification !== ''" class="cell" style="font-weight: 700;">{{ information.specification }}</div>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">车辆号码：</div></td>
									<td>
										<div v-if="information.carNo !== ''" class="cell" style="font-weight: 700;">{{ information.carNo }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">车辆类型：</div></td>
									<td>
										<div v-if="information.typ !== ''" class="cell" style="font-weight: 700;">{{ information.typ }}</div>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">行驶证：</div></td>
									<td>
										<el-image v-if="information.driverLicensePath" :src="information.driverLicensePath" style="width:80px; height:80px" fit="cover" :preview-src-list="[ information.driverLicensePath ]" />
										<span v-else>--</span>
									</td>
									<td><div class="cell">车辆图片：</div></td>
									<td>
										<el-image v-if="information.carImg" :src="information.carImg" style="width:80px; height:80px" fit="cover" :preview-src-list="[ information.carImg ]" />
										<span v-else>--</span>
									</td>
								</tr>

								<!-- <td><div class="cell">服务区域：</div></td>
									<td>
									<div v-if="information.serverCity !== ''" class="cell" style="font-weight: 700;">{{ information.serverCity }}</div>
									<span v-else>--</span>
									</td> -->

								<!-- <tr>
									<td><div class="cell">更新人：</div></td>
									<td>
									<div v-if="information.updateUser !== ''" class="cell" style="font-weight: 700;">{{ information.updateUser }}</div>
									<span v-else>--</span>
									</td>
									</tr>

									<tr>
									<td><div class="cell">更新时间：</div></td>
									<td>
									<div v-if="information.updateTime !== ''" class="cell" style="font-weight: 700;">{{ information.updateTime }}</div>
									<span v-else>--</span>
									</td>
									</tr> -->

							</tbody>
						</table>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row style="flex: 1;overflow: hidden;">
			<el-col :span="24" style="height: 100%;">
				<el-card class="box-map-card" style="height: 100%;">
					<div slot="header">
						<span style="font-weight: bold;">站长服务区域</span>
					</div>
					<div class="table-region el-table el-table--enable-row-hover el-table--medium" style="overflow-y: auto;">
						<table cellspacing="0" style="width: 100%;">
							<thead>
								<tr>
									<th class="is-leaf"><div class="cell">省</div></th>
									<th class="is-leaf"><div class="cell">市</div></th>
									<th class="is-leaf"><div class="cell">区</div></th>
								</tr>
							</thead>
							<tbody v-if="information.serverCityArr.length">
								<tr v-for="(item, index) in information.serverCityArr" :key="index">
									<td><div class="cell">{{ item[0] }}</div></td>
									<td><div class="cell">{{ item[1] }}</div></td>
									<td><div class="cell">{{ item[2] }}</div></td>
								</tr>
							</tbody>
						</table>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { getMasterInfoByUserId } from '@/api/baseInfo/baseInfo'
export default {
	name: 'BaseInfo',
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
				workCity: '',
				workYear: '',
				workState: '',
				serverCity: '',
				serverCityArr: [],
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
				gender: res.data.gender || '',
				headUrl: res.data.headUrl || '',
				certImg1: res.data.certImg1 || '',
				certImg2: res.data.certImg2 || '',
				birth: res.data.birth || '',
				email: res.data.email || '',
				driverNoPath: res.data.driverNoPath || '',
				driverLicensePath: res.data.driverLicensePath || '',
				skillType: res.data.skillType || '',
				skillList: res.data.skillList || '',
				workCity: res.data.workCity || '',
				workYear: res.data.workYear || '',
				workState: res.data.workState || '',
				serverCity: res.data.serverCity || '',
				serverCityArr: JSON.parse(res.data.serverCity),
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
		}
	}
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 10px;
	background-color: rgb(240, 242, 245);
	position: relative;
	/deep/ .box-map-card .el-card__body {
		height: calc(100% - 62px);
		overflow-y: auto;

		.el-collapse {
			border-top: 0;
		}

		.el-collapse-item__header {
			border-bottom: 0;
			.el-collapse-item__arrow{
				margin: 0 58px 0 auto;
			}
		}

		.el-collapse-item__wrap {
			border-bottom: 0;
			.el-collapse-item__content{
				padding-bottom: 5px;
			}
		}
	}
}
.cell {
	/* text-align: center; */
	white-space: nowrap;
}
.table-region .cell {
	text-align: center;
	white-space: nowrap;
}
.card-box-information {
	td {
		vertical-align: top;
	}
}
</style>
