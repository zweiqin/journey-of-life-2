<template>
  <div class="app-container">
    <!-- 标题 -->
    <div class="other-container">
      <div style="display: flex;padding-bottom: 14px;font-size: 16px;font-weight: bold;">
        <div
          style="width: 4px;height: 14px;margin-left: 6px;margin-right: 6px;background-color: #0519D4;border-radius: 2px;">
        </div>
        <div>{{ name }}</div>
      </div>
    </div>

    <!-- 查询 -->
    <div class="filter-container"
      style="padding: 20px 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-bottom: 0;border-radius: 6px 6px 0 0;">
      <el-input v-model="listQuery.search" clearable class="filter-item"
        style="width: 300px;border: 1px solid #64748B;border-radius: 4px;" placeholder="输入商品名称、商品详情"
        @keyup.enter.native="getList" />
      <el-button v-permission="[`POST ${api.queryVoucherGoodsList}`]" size="mini" class="filter-item" type="primary"
        style="margin-left:10px;padding: 7px 22px;" @click="getList">
        查询
      </el-button>
      <el-button v-permission="[`POST ${api.queryVoucherGoodsList}`]" size="mini" class="filter-item" type="info" plain
        style="margin-left:10px;padding: 7px 22px;border: 0;" @click="(listQuery.search = '') || getList()">
        重置
      </el-button>
    </div>

    <TableTools :custom-columns-config="customColumnsConfig" download custom-field
      style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;"
      @update-fields="updateFields" @refresh="getList" @download="toolsMixin_exportMethod($refs.vxeTable, name)">
      <el-button v-permission="[`POST /admin${api.saveShopGoods}`]" size="mini" type="primary" icon="el-icon-plus"
        @click="handleCreate">
        添加
      </el-button>
    </TableTools>

    <!-- 表格 -->
    <VxeTable ref="vxeTable" v-model="listQuery" :local-key="customColumnsConfig.localKey" api-method="POST"
      :api-path="api.queryVoucherGoodsList" :columns="columns" page-alias="pageNo" size-alias="pageSize"
      :grid-options="{ rowConfig: { height: 60 } }"
      style="padding: 0 20px;background-color: #ffffff;border: 1px solid #E2E8F0;border-top: 0;border-bottom: 0;box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);">
      <template #logo="{ row }">
        <div v-if="row.goodsLogo" style="">
          <el-image lazy :src="row.goodsLogo" style="width:40px; height:40px;" fit="cover"
            :preview-src-list="[row.goodsLogo]" />
        </div>
        <span v-else>--</span>
      </template>
      <template #operate="{ row }">
        <!-- <el-button v-permission="[`POST /admin${api.queryVoucherGoodsList}`]" size="mini" @click="handleDetail(row)">
          查看
        </el-button> -->
        <el-button v-permission="[`POST /admin${api.editShopGoods}`]" size="mini" @click="handleEdit(row)">
          编辑
        </el-button>
        <el-button v-permission="[`POST /admin${api.deleteByIdShopGoods}`]" type="danger" size="mini"
          @click="handleDelete(row)">
          删除
        </el-button>
      </template>
    </VxeTable>
  </div>
</template>

<script>
import { getColumns } from './table'
import {
  api,
  deleteVoucherGoods
} from '@/api/nearbyMerchants/nearbyMerchants'
import VxeTable from '@/components/VxeTable'
import TableTools from '@/components/TableTools'


export default {
  components: {
    TableTools,
    VxeTable
  },
  created() {

  },
  data() {
    return {
      api,
      columns: [],
      name: '',
      listQuery: {
        pageNo: 1,
        pageSize: 20,
        goodsType: '',
        search: ''
      },
      customColumnsConfig: {
        localKey: 'serviceList',
        columnsOptions: []
      },
    }
  },
  methods: {
    updateFields(columns) {
      this.columns = columns
    },

    getList(meaning) {
      meaning === 'keepPage' ? this.listQuery = { ...this.listQuery } : this.listQuery = { ...this.listQuery, pageNo: 1 }
    },
    // 点击添加
    handleCreate() {
      this.$router.push({ name: 'VoucherGoodSave', query: { type: this.listQuery.goodsType } })
    },
    // 点击编辑
    handleEdit(row) {
      this.$router.push({ name: 'VoucherGoodSave', query: { type: this.listQuery.goodsType, id: row.id } })
      // this.$router.push(`/enterprise/nearbyMerchants/voucherGoodSave?type=${this.listQuery.goodsType}&id=${row.id}`)
    },
    // 点击删除
    async handleDelete(row) {
      await this.$elConfirm('确认删除？')
      await deleteVoucherGoods({ shopVoucherId: row.id })
      this.$elMessage('删除成功！')
      this.getList()
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        this.name = this.$route.meta.title
        console.log(this.$route.meta);
        if (this.$route.meta.title === '代金券商品') {
          this.listQuery.goodsType = 1
        } else if (this.$route.meta.title === '代金券服务') {
          this.listQuery.goodsType = 2
        }
        this.columns = getColumns(this.listQuery.goodsType === '商品' ? '商品' : '服务')
        this.customColumnsConfig = this.columns
        this.getList()
      },

      immediate: true
    }
  },
}
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  background-color: #f5f6f7;
  padding: 20px 20px;
}
</style>