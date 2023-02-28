<template>
	<!-- <div
		:style="showwebh"
		class="base"
		@dblclick="bigImage"
		/> -->
	<div class="" style="height: 100%;">
		<el-row style="display: flex;flex-direction: column;height: 150%;">
			<el-col :span="24" class="card-box card-box-information">
				<el-card>
					<div slot="header">
						<span>站长信息</span>
					</div>
					<div class="el-table el-table--enable-row-hover el-table--medium">
						<table cellspacing="0" style="width: 100%;">
							<tbody>

								<tr>
									<td><div class="cell">站长的用户ID：</div></td>
									<td>
										<div v-if="information.userId !== ''" class="cell" style="font-weight: 700;">{{ information.userId }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">站长姓名：</div></td>
									<td>
										<div v-if="information.name !== ''" class="cell" style="font-weight: 700;">{{ information.name }}</div>
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
									<td><div class="cell">站长生日：</div></td>
									<td>
										<div v-if="information.birth !== ''" class="cell" style="font-weight: 700;">{{ information.birth }}</div>
										<span v-else>--</span>
									</td>
								</tr>
								<tr>
									<td><div class="cell">站长邮箱：</div></td>
									<td>
										<div v-if="information.email !== ''" class="cell" style="font-weight: 700;">{{ information.email }}</div>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">驾驶证：</div></td>
									<td>
										<el-image v-if="information.driverNoPath" :src="information.driverNoPath" style="width:80px; height:80px" fit="cover" :preview-src-list="[ information.driverNoPath ]" />
										<span v-else>--</span>
									</td>
									<td><div class="cell">行驶证：</div></td>
									<td>
										<el-image v-if="information.driverLicensePath" :src="information.driverLicensePath" style="width:80px; height:80px" fit="cover" :preview-src-list="[ information.driverLicensePath ]" />
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">技能专长：</div></td>
									<td>
										<div v-if="information.skillType !== ''" class="cell" style="font-weight: 700;">{{ information.skillType }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">技能清单：</div></td>
									<td>
										<div v-if="information.skillList !== ''" class="cell" style="font-weight: 700;">{{ information.skillList }}</div>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">主营区域：</div></td>
									<td>
										<div v-if="information.workCity !== ''" class="cell" style="font-weight: 700;">{{ information.workCity }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">工作年限：</div></td>
									<td>
										<div v-if="information.workYear !== ''" class="cell" style="font-weight: 700;">{{ information.workYear }}</div>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">在职状态：</div></td>
									<td>
										<span v-if="information.workState === 0" class="cell" style="font-weight: 700;">在职</span>
										<span v-else-if="information.workState === 1" class="cell" style="font-weight: 700;">离职</span>
										<span v-else>--</span>
									</td>
									<!-- <td><div class="cell">服务区域：</div></td>
										<td>
										<div v-if="information.serverCity !== ''" class="cell" style="font-weight: 700;">{{ information.serverCity }}</div>
										<span v-else>--</span>
										</td> -->
								</tr>

								<tr>
									<td><div class="cell">门店地址：</div></td>
									<td>
										<div v-if="information.shopCity !== ''" class="cell" style="font-weight: 700;">{{ information.shopCity }}</div>
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
									<td><div class="cell">添加人：</div></td>
									<td>
										<div v-if="information.createUser !== ''" class="cell" style="font-weight: 700;">{{ information.createUser }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">更新人：</div></td>
									<td>
										<div v-if="information.updateUser !== ''" class="cell" style="font-weight: 700;">{{ information.updateUser }}</div>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">插入时间：</div></td>
									<td>
										<div v-if="information.createTime !== ''" class="cell" style="font-weight: 700;">{{ information.createTime }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">更新时间：</div></td>
									<td>
										<div v-if="information.updateTime !== ''" class="cell" style="font-weight: 700;">{{ information.updateTime }}</div>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">手机号：</div></td>
									<td>
										<div v-if="information.mobile !== ''" class="cell" style="font-weight: 700;">{{ information.mobile }}</div>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">车辆规格：</div></td>
									<td>
										<div v-if="information.specification !== ''" class="cell" style="font-weight: 700;">{{ information.specification }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">车辆类型：</div></td>
									<td>
										<div v-if="information.typ !== ''" class="cell" style="font-weight: 700;">{{ information.typ }}</div>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">品牌型号：</div></td>
									<td>
										<div v-if="information.brand !== ''" class="cell" style="font-weight: 700;">{{ information.brand }}</div>
										<span v-else>--</span>
									</td>
									<td><div class="cell">车辆号码：</div></td>
									<td>
										<div v-if="information.carNo !== ''" class="cell" style="font-weight: 700;">{{ information.carNo }}</div>
										<span v-else>--</span>
									</td>
								</tr>

								<tr>
									<td><div class="cell">车辆图片：</div></td>
									<td>
										<el-image v-if="information.carImg" :src="information.carImg" style="width:80px; height:80px" fit="cover" :preview-src-list="[ information.carImg ]" />
										<span v-else>--</span>
									</td>
								</tr>

							</tbody>
						</table>
					</div>
				</el-card>
			</el-col>
			<el-col :span="24" class="card-box" style="flex: 1;height: 0;overflow-y: auto;">
				<el-card>
					<div slot="header">
						<span>站长服务区域</span>
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

<style scoped>
.cell {
	/* text-align: center; */
	white-space: nowrap;
}
.table-region .cell {
	text-align: center;
	white-space: nowrap;
}
</style>
