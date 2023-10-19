<template>
  <div class="app-container">
    <div class="other-container">
      <div
        style="
          display: flex;
          padding-bottom: 14px;
          font-size: 16px;
          font-weight: bold;
        "
      >
        <div
          style="
            width: 4px;
            height: 14px;
            margin-left: 6px;
            margin-right: 6px;
            background-color: #0519d4;
            border-radius: 2px;
          "
        ></div>
        <div>订单列表</div>
      </div>
    </div>
    <!-- 查询和其他操作 -->
    <div
      class="filter-container"
      style="
        padding: 20px 20px;
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-bottom: 0;
        border-radius: 6px 6px 0 0;
      "
    >
      <el-input
        v-model="listQuery.search"
        clearable
        class="filter-item"
        style="width: 400px; border: 1px solid #64748b; border-radius: 4px"
        placeholder="请输入订单号码/手机号码/姓名等"
        @keyup.enter.native="getList"
      />
      <el-button
        v-permission="[`GET ${api.orderPagelist}`]"
        size="mini"
        class="filter-item"
        type="primary"
        style="margin-left: 10px; padding: 7px 22px; border: 0"
        @click="getList"
      >
        查询
      </el-button>
      <el-button
        v-permission="[`GET ${api.orderPagelist}`]"
        size="mini"
        class="filter-item"
        type="info"
        plain
        style="margin-left: 10px; padding: 7px 22px; border: 0"
        @click="
          (listQuery.status = null) || (listQuery.search = '') || getList()
        "
      >
        重置
      </el-button>
    </div>

    <TableTools
      :custom-columns-config="customColumnsConfig"
      download
      custom-field
      style="
        padding: 0 20px;
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-top: 0;
        border-bottom: 0;
      "
      @update-fields="updateFields"
      @refresh="getList"
      @download="toolsMixin_exportMethod($refs.vxeTable, '订单管理')"
    >
    </TableTools>

    <!-- 订单管理列表 -->
    <VxeTable
      ref="vxeTable"
      v-model="listQuery"
      :local-key="customColumnsConfig.localKey"
      api-method="POST"
      :api-path="api.orderPagelist"
      :columns="columns"
      page-alias="pageNo"
      size-alias="pageSize"
      :grid-options="{
        rowConfig: { height: 60 },
        tooltipConfig: { showAll: true, enterDelay: 800 },
      }"
      style="
        padding: 0 20px;
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-top: 0;
        border-bottom: 0;
        box-shadow: 0px 10px 15px -3px rgba(15, 23, 42, 0.08);
      "
    >
      <template #orderNo="{ row }">
        <span style="color: #0519d4">{{ row.orderNo || '--' }}</span>
      </template>
      <template #senderName="{ row }">
        <div>{{ row.senderName || '--' }}</div>
        <div>{{ row.senderMobile || '--' }}</div>
      </template>
      <template #consigneeName="{ row }">
        <div>{{ row.consigneeName || '--' }}</div>
        <div>{{ row.consigneeMobile || '--' }}</div>
      </template>
      <template #subscribeTime="{ row }">
        <span style="color: #007f75">{{ row.subscribeTime || '--' }}</span>
      </template>
      <template #installDate="{ row }">
        <div
          v-if="
            row.installDate &&
            Date.now() - Date.parse(row.installDate) <= 3600000 &&
            Date.now() - Date.parse(row.installDate) > 0
          "
          style="width: 100%"
        >
          <div style="width: 65%; margin-left: 25%; font-size: 12px">
            <div
              style="
                padding: 1px 10px;
                color: #ffffff;
                background-color: #fa5151;
                border-radius: 5px;
              "
            >
              时间不足1h
            </div>
            <div
              style="
                height: 4px;
                background-color: #fa5151;
                clip-path: polygon(0px 0px, 80% 0, 85% 4px, 75% 0);
              "
            ></div>
          </div>
        </div>
        <div style="color: #e95d20">{{ row.installDate || '--' }}</div>
      </template>
      <template #orderType="{ row }">
        <el-tag v-if="row.orderType === 1" type="success">常规单</el-tag>
        <el-tag v-else-if="row.orderType === 2" type="danger">加急单</el-tag>
        <el-tag v-else-if="row.orderType === 3">顺路单</el-tag>
        <span v-else>--</span>
      </template>
      <template #deliveryType="{ row }">
        <span v-if="row.deliveryType === 1">送货安装</span>
        <span v-else-if="row.deliveryType === 2">送货到家</span>
        <span v-else-if="row.deliveryType === 3">送货到楼下</span>
        <span v-else-if="row.deliveryType === 4">客户自提</span>
        <span v-else>--</span>
      </template>
      <template #price="{ row }">
        <span style="color: #fa5151"
          >￥ {{ row.price || row.price === 0 ? row.price : '--' }}</span
        >
      </template>
      <template #brokerage="{ row }">
        <span
          >￥
          {{
            row.brokerage || row.brokerage === 0 ? row.brokerage : '--'
          }}</span
        >
      </template>
      <template #arrivalPrice="{ row }">
        <span
          >￥
          {{
            row.arrivalPrice || row.arrivalPrice === 0 ? row.arrivalPrice : '--'
          }}</span
        >
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.status === 0" type="danger">待付款</el-tag>
        <el-tag
          v-else-if="row.status === 1"
          style="color: #f17850; background-color: #fff6dc"
          >待接单</el-tag
        >
        <el-tag v-else-if="row.status === 2">待报价</el-tag>
        <el-tag v-else-if="row.status === 3">待分配</el-tag>
        <el-tag v-else-if="row.status === 4" type="success">已分配</el-tag>
        <el-tag v-else-if="row.status === 5" type="success">待到场</el-tag>
        <el-tag v-else-if="row.status === 31" type="success">待完成</el-tag>
        <el-tag v-else-if="row.status === 6" type="info">已完成</el-tag>
        <el-tag v-else-if="row.status === 7" type="info">已取消</el-tag>
        <el-tag v-else-if="row.status === 8" type="danger">异常</el-tag>
        <span v-else>--</span>
      </template>
      <template #verfi-status="{ row }">
        <el-tag v-if="row.receiveTime && row.receiveName">已核销</el-tag>
        <el-tag type="warning" v-else>未核销</el-tag>
      </template>
      <template #operate="{ row }">
        <el-button
          v-permission="[`POST ${api.verification}`]"
          size="mini"
          type="text"
          :disabled="!!(row.receiveTime && row.receiveName)"
          style="color: #2e8982"
          @click="
            $refs.VerificationModal && $refs.VerificationModal.handleOpen(row)
          "
        >
          核销
        </el-button>
      </template>
    </VxeTable>

    <!-- 礼品核销 -->
    <VerificationModal
      @refresh="getList"
      ref="VerificationModal"
    ></VerificationModal>
  </div>
</template>

<script>
import { api } from '@/api/orderManagement/order';
import VxeTable from '@/components/VxeTable';
import TableTools from '@/components/TableTools';
import { columns } from './table';
import VerificationModal from './components/VerificationModal.vue';

export default {
  name: 'OrderList',
  components: {
    VxeTable,
    TableTools,
    VerificationModal,
  },
  filters: {},
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'orderList',
        columnsOptions: columns,
      },
      listQuery: {
        isZz: this.$store.state.user.typ,
        pageNo: 1,
        pageSize: 20,
        status: null,
        search: '',
        isVipOrder: 1,
      },
    };
  },
  computed: {},
  created() {},
  mounted() {},
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
    handleStatusChange(status) {
      this.listQuery = { ...this.listQuery, status };
    },
    handleChangeQuery({ search }) {
      this.listQuery = { ...this.listQuery, pageNo: 1, search };
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
  background-color: #f5f6f7;
  padding: 20px 20px;
}

.el-tag {
  height: auto;
  padding: 8px 10px;
  line-height: normal;
  border: 0;
}

/deep/ .vxe-cell-two-row {
  .vxe-cell {
    color: #666666;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: normal !important;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

/deep/ .el-button--primary {
  background-color: #0519d4;
  border-color: #0519d4;
}

/deep/ .el-button--primary:active {
  background: #1682e6;
  border-color: #1682e6;
  color: #ffffff;
  outline: none;
}

/deep/ .el-button--primary:hover {
  background: #46a6ff;
  border-color: #46a6ff;
  color: #ffffff;
}

/deep/ .el-button--success {
  background-color: #2e8982;
  border-color: #2e8982;
}

/deep/ .el-button--success:active {
  background: #11b95c;
  border-color: #11b95c;
  color: #ffffff;
  outline: none;
}

/deep/ .el-button--success:hover {
  background: #42d885;
  border-color: #42d885;
  color: #ffffff;
}

/deep/ .el-button--warning {
  background-color: #ff8c00;
  border-color: #ff8c00;
}

/deep/ .el-button--warning:active {
  background: #e6a700;
  border-color: #e6a700;
  color: #ffffff;
  outline: none;
}

/deep/ .el-button--warning:hover {
  background: #ffc833;
  border-color: #ffc833;
  color: #ffffff;
}

/deep/ .table-tools {
  .el-radio-group {
    label {
      .el-radio-button__inner {
        border: 0;
      }
    }

    label.is-active {
      .el-radio-button__inner {
        color: #4d70ff;
        background-color: #f1f4ff;
        box-shadow: none;
      }
    }
  }
}
</style>
