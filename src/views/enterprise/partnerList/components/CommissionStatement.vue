<template>
  <div class="dailog-container">
    <el-dialog
      :visible.sync="visible"
      :modal-append-to-body="false"
      v-bind="modalOptions"
    >
      <div>
        <TableTools
          :custom-columns-config="customColumnsConfig"
          download
          custom-field
          @update-fields="updateFields"
          @refresh="getList"
          @download="toolsMixin_exportMethod($refs.vxeTable, excelName)"
        >
        </TableTools>

        <!-- 佣金记录列表 -->
        <VxeTable
          ref="vxeTable"
          v-model="listQuery"
          :local-key="customColumnsConfig.localKey"
          api-method="GET"
          :api-path="api.getCommissionStatement"
          :columns="columns"
          page-alias="pageNo"
          size-alias="pageSize"
          :is-pager="false"
          :grid-options="{ rowConfig: { height: 60 }, height: '600px' }"
        >
          <template #status="{ row }">
            <el-tag v-if="row.status === 1" type="warning">未完成</el-tag>
            <el-tag type="success" v-else-if="row.status === 2">已完成</el-tag>
            <span v-else>--</span>
          </template>
        </VxeTable>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { api } from '@/api/enterprise/communityMember';
import VxeTable from '@/components/VxeTable';
import TableTools from '@/components/TableTools';
import { commissionStatementColumn as columns } from '../table';

export default {
  name: 'MasterAccountFlow',
  components: {
    VxeTable,
    TableTools,
  },
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '1000px',
        title: '师傅佣金流水',
      },
      visible: false,
      formData: {},
      data: [],
      api,
      columns: columns.filter((i) => i.field !== 'operate'),
      customColumnsConfig: {
        localKey: 'commissionStatement',
        columnsOptions: columns.filter((i) => i.field !== 'operate'),
      },
      listQuery: {},
      excelName: '',
    };
  },
  methods: {
    // 自定义列
    updateFields(columns) {
      this.columns = columns;
    },
    getList(meaning) {
      meaning === 'keepPage'
        ? (this.listQuery = { ...this.listQuery })
        : (this.listQuery = { ...this.listQuery, pageNo: 1 });
    },
    handleClose() {
      this.visible = false;
    },
    handleOpen(params = {}, idKey = 'sfUserId') {
      this.listQuery.sfUserId = params[idKey];
      this.excelName = params.sfUserName
        ? params.sfUserName + '师傅佣金流水'
        : '师傅佣金流水';
      this.getList();
      this.visible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.dailog-container {
  position: relative;
  z-index: 1002;
}
</style>
