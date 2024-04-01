<template>
	<div class="app-container">
		<div class="main">
			<div class="treeCheckBox">
				<p>服务分类</p>
				<div class="BtnBox">
					<!-- <el-button style="width: 120px;" size="medium" type="primary" disabled>新增分类</el-button>
						<el-button style="width: 120px;" size="medium" type="danger" disabled>批量删除</el-button> -->
					<el-button style="width: 120px;" size="medium" type="warning" @click="handleToggleTree();">{{ isToggle ? '收起' : '展开' }}全部</el-button>
				</div>
				<el-tree ref="treeRef" class="threeBox" :data="datas" :props="defaultProps" show-checkbox node-key="id" default-expand-all>
					<div slot-scope="{ data }" class="custom-tree-node">
						<span style="margin-top: 3px;font-size: 18px;">{{ data.serverNameOne }}</span>
						<!-- <span class="btns">
							<i style="font-size: 24px;" class="el-icon-edit-outline" @click="handleEditCategory(data)"></i>
							<i style="font-size: 24px;" class="el-icon-delete" @click="handleDeletaCategory(data)"></i>
							</span> -->
					</div>
				</el-tree>
			</div>
			<div class="table">
				<div
					class="filter-container"
					style="padding: 0px 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-radius: 6px 6px 0 0;"
				>
					<el-form :inline="true" class="from-inline">
						<!-- <el-form-item label="一级类目">
							<el-input
							clearable class="filter-item"
							style="width: 300px;border: 1px solid #64748B;border-radius: 4px;" placeholder="请输入一级类目名称"
							disabled @keyup.enter.native="getList"
							/>
							</el-form-item>
							<el-form-item label="二级类目">
							<el-input
							clearable class="filter-item"
							style="width: 300px;border: 1px solid #64748B;border-radius: 4px;" placeholder="请输入二级类目名称"
							disabled @keyup.enter.native="getList"
							/>
							</el-form-item> -->
						<el-form-item label="类目">
							<el-input
								clearable class="filter-item"
								style="width: 300px;border: 1px solid #64748B;border-radius: 4px;" placeholder="输入需要搜索的分类"
								@keyup.enter.native="getList"
							/>
						</el-form-item>
						<!-- <el-form-item label="报价模式">
							<el-input
							v-model="querList.search" clearable class="filter-item"
							style="width: 300px;border: 1px solid #64748B;border-radius: 4px;" placeholder="选择报价模式"
							disabled @keyup.enter.native="getList"
							/>
							</el-form-item> -->
						<el-form-item>
							<el-button
								size="mini" class="filter-item" type="primary"
								style="margin-left:10px;padding: 7px 22px;" @click="getList"
							>
								查询
							</el-button>
							<el-button
								size="mini" class="filter-item" type="info"
								plain
								style="margin-left:10px;padding: 7px 22px;border: 0;"
								@click="querList.search = ''; getList()"
							>
								重置
							</el-button>
						</el-form-item>
					</el-form>
				</div>
				<!-- <div class="ButtonGroup">
					<div class="btn-left">
					<el-button size="medium" type="primary" disabled>添加服务</el-button>
					<el-button size="medium" type="success" disabled>批量上架</el-button>
					<el-button size="medium" type="danger" disabled>批量下架</el-button>
					</div>
					<div class="btn-right">
					<el-button size="medium" type="primary" disabled>批量设置服务价格</el-button>
					<el-button size="medium" type="primary" disabled>批量修改分佣比例</el-button>
					</div>
					</div> -->
				<!-- 服务列表 api-path="/third/community/serverTypeList"此接口为待确定开开发的接口，待完善后切换，目前依旧采用老版本的接口 -->
				<VxeTable
					ref="vxeTable" v-model="querList"
					set-table-height="685" :show-index="false" :local-key="customColumnsConfig.localKey" api-method="POST"
					res-alias="records" request-method="request3" api-path="/third/community/serverInfoList"
					:columns="columns" page-alias="pageNo" size-alias="pageSize" :grid-options="{ rowConfig: { height: 50 } }"
					style="height: auto; padding: 10px 0px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);"
				>
					<template #isArtificial="{ row }">
						<el-tag :type="row.isArtificial ? 'danger' : ''">
							{{
								row.isArtificial ? "一口价" : "人工报价"
							}}
						</el-tag>
					</template>
					<template #haldelFunction="{ row }">
						<el-button type="text" disabled><span style="color: red;">设置价格</span></el-button>
						<el-button type="text" disabled><span style="color: green;">上架</span></el-button>
						<el-button type="text" disabled><span style="color: black;">服务详情</span></el-button>
						<el-button type="text" @click="$refs.EditCommissionRatio.show(row.id)">设置分佣比例</el-button>
					</template>
				</VxeTable>
			</div>

			<EditCommissionRatio ref="EditCommissionRatio"></EditCommissionRatio>
		</div>
	</div>
</template>

<script>
import { queryListByServerInfoIds, getServiceType } from '@/api/platformService'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'
import { columns } from './table'
import cdata from './data.json'

import EditCommissionRatio from './components/editCommissionRatio.vue'

export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: 'ServiceList',
	components: {
		VxeTable,
		TableTools,
		EditCommissionRatio
	},
	data() {
		return {
			isToggle: true,
			columns,
			customColumnsConfig: {
				localKey: 'serviceList',
				columnsOptions: columns
			},
			querList: {
				pageNo: 1,
				pageSize: 20,
				pids: []
			},
			showUpdataForm: false,
			datas: [ {
				id: 1,
				label: '一级 1',
				children: [ {
					id: 4,
					label: '二级 1-1',
					children: [{
						id: 9,
						label: '三级 1-1-1'
					}, {
						id: 10,
						label: '三级 1-1-2'
					}]
				} ]
			} ],
			defaultProps: {
				children: 'children',
				label: 'label'
			}
		}
	},
	created() {
		this.getServiceCategory()
	},
	methods: {
		getServiceCategory() {
			getServiceType().then((res) => {
				this.datas = res.data.map((item) => {
					item.children.map((item1) => {
						item1.serverNameOne = item1.serverNameTwo
						return item1
					})
					return item
				})
			})
				.catch((err) => {
					this.$message({
						message: '社区服务分类获取失败，请联系管理员，当前使用本地数据',
						type: 'error'
					})
					this.datas = cdata.map((item) => {
						item.children.map((item1) => {
							item1.serverNameOne = item1.serverNameTwo
							return item1
						})
						return item
					})
				})
		},
		handleToggleTree() {
			const treeNodes = this.$refs.treeRef.store.nodesMap
			for (const key in treeNodes) {
				treeNodes[key].expanded = !this.isToggle
			}

			this.isToggle = !this.isToggle
		},
		getList(meaning) {
			meaning === 'keepPage' ? this.querList = { ...this.querList } : this.querList = { ...this.querList, pageNo: 1 }
		},
		handleEditCategory(data) {
			console.log(data)
		},
		handleDeletaCategory(data) {
			console.log(data)
		}
	}
}
</script>

<style lang="scss" scoped>
.ButtonGroup {
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .btn-left {
    display: flex;
    gap: 10px;
  }
  .btn-right {
    display: flex;
    gap: 10px;
  }
}

.el-form-item {
  margin: 10px 20px;
}

.from-inline {
  /* padding: 0 20px; */
  padding-top: 18px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* gap: 30px; */
  /* justify-content: space-between; */
}
.other-box {
  display: flex;
  padding-bottom: 14px;
  font-size: 16px;
  font-weight: bold;
    .other-box-cnm {
      width: 4px;
      height: 14px;
      margin-left: 6px;
      margin-right: 6px;
      background-color: #0519D4;
      border-radius: 2px;
    }
}
::v-deep .el-checkbox__inner::after {
    border: 2px solid #FFFFFF;
    border-left: 0;
    border-top: 0;
    height: 15px;
    left: 9px;
    top: 1px;
}
::v-deep .el-checkbox__inner {
  width: 25px;
  height: 25px;
}
::v-deep .el-tree-node__content {
  padding: 15px 0px;
}
.custom-tree-node {
  padding-right: 10px;
  /* padding: 0px 10px; */
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .btns {
    margin-right: 5px;
    display: flex;
    gap: 12px;
  }
}
.app-container {
  padding: 10px;
  min-width: 100%;
  min-height: 100%;
  background-color: #f5f6f7;
  flex-direction: row;
  .main {
    min-width: 100%;
    min-height: 100%;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
      .treeCheckBox {
        width: 410px;
        max-height: 100%;
        border-right: 1px solid #e1e2e3cb;
        display: flex;
        flex-direction: column;
        > p {
          padding: 20px 25px 10px 25px;
          font-size: 24px;
          font-weight: normal;
          line-height: 44px;
          display: flex;
          align-items: center;
          letter-spacing: 0.32px;
          color: #000000;
          border-bottom: 1px solid #e1e2e3cb;
        }
        .BtnBox {
          padding: 10px;
          width: 100%;
          height: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
         .threeBox {
          position: relative;
          height: calc(100vh - 235px);
          overflow: hidden auto;
        }
      }
      .table {
        width: 100%;
      }
  }
}
.threeBox::-webkit-scrollbar {
   width: 3px !important;
}
</style>
