<template>
	<el-dialog :visible.sync="visible" v-bind="modalOptions">
		<el-tree
			ref="tree" :data="systemPermissions" :default-checked-keys="assignedPermissions" show-checkbox
			node-key="id" highlight-current
		>
			<span slot-scope="{ node, data }" class="custom-tree-node">
				<span>{{ data.authorityDesc }}</span>
				<el-tag v-if="data.authority" type="success" size="mini">
					{{ data.authority }}
				</el-tag>
			</span>
		</el-tree>
		<span slot="footer" class="dialog-footer">
			<el-button size="mini" @click="handleClose">取 消</el-button>
			<el-button type="primary" size="mini" @click="handleSubmit">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { authorityList, authorityInfo, saveOrUpdateAuthority } from '@/api/enterprise/employee'

export default {
	name: 'PermissionModal',
	data() {
		return {
			modalOptions: {
				closeOnClickModal: false,
				width: '520px',
				title: '权限配置'
			},
			visible: false,
			formData: {
				id: ''
			},
			// formRules: {
			// },
			systemPermissions: [],
			assignedPermissions: []
		}
	},
	methods: {
		handleClose() {
			this.visible = false
		},
		handleOpen(params = {}) {
			this.formData = Object.assign(this.$options.data().formData, params)
			this.visible = true
			// this.$refs.formData && this.$refs.formData.resetFields()
			this.getRolePmsList()
		},
		async getRolePmsList() {
			// this.systemPermissions = this.assignedPermissions = []
			const loading = this.$elLoading()
			try {
				const res1 = await authorityList()
				const res2 = await authorityInfo({ userId: this.formData.id })
				// console.log('r', res1, res2)
				const typeList = Array.from(new Set(res1.data.map((item) => item.authorityType)))
				this.systemPermissions = typeList.map((item) => {
					let tempName
					switch (item) {
						case 1:
							tempName = '运营仪表盘'
							break
						case 2:
							tempName = '接单管理'
							break
						case 3:
							tempName = '订单管理'
							break
						case 4:
							tempName = '网点管理'
							break
						case 5:
							tempName = '师傅管理'
							break
						default:
							tempName = '其它'
							break
					}
					return {
						authorityDesc: tempName,
						children: res1.data.filter((i) => i.authorityType === item)
					}
				})
				this.assignedPermissions = res2.data.map((item) => item.authorityId)
				loading.close()
			} catch (e) {
				loading.close()
			}
		},
		async handleSubmit() {
			const loading = this.$elLoading()
			try {
				const permissions = this.$refs.tree.getCheckedKeys(true)
				// console.log(permissions)
				await saveOrUpdateAuthority({
					userId: this.$store.state.user.userId,
					authoritys: permissions
				})
				loading.close()
				this.$elMessage('授权成功!')
				this.$emit('success')
				this.visible = false
				this.systemPermissions = this.assignedPermissions = []
			} catch (e) {
				loading.close()
			}
		}
	}
}
</script>

