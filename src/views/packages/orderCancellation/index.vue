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
        v-model="listQuery.phone"
        clearable
        class="filter-item"
        style="width: 200px; border-radius: 4px"
        placeholder="请输入手机号码"
        @keyup.enter.native="getList"
      />

      <el-select
        v-model="listQuery.relationshipLevelId"
        class="filter-item"
        placeholder="请选择"
      >
        <el-option label="会员" :value="1"> </el-option>
        <el-option label="团长" :value="2"> </el-option>
        <el-option label="合伙人" :value="3"> </el-option>
      </el-select>
      <el-cascader class="filter-item" :props="cascaderProps"></el-cascader>
      <el-button
        v-permission="[`GET ${api.orderPagelist}`]"
        size="mini"
        class="filter-item"
        type="primary"
        style="margin-left: 10px; padding: 7px 22px"
        @click="getList"
      >
        查找
      </el-button>
      <el-button
        v-permission="[`GET ${api.orderPagelist}`]"
        size="mini"
        class="filter-item"
        type="info"
        plain
        style="margin-left: 10px; padding: 7px 22px"
        @click="(listQuery.phone = '') || getList()"
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
      @download="toolsMixin_exportMethod($refs.vxeTable, '异常订单')"
    >
    </TableTools>

    <!-- 接单管理列表 -->
    <VxeTable
      ref="vxeTable"
      v-model="listQuery"
      request-method="request2"
      :local-key="customColumnsConfig.localKey"
      api-method="POST"
      :api-path="api.partnerOrder"
      :columns="columns"
      page-alias="page"
      size-alias="pageSize"
      res-alias="list"
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
      <template #haldelFunction="{ row }">
        <el-button size="mini" @click="hadelOrderCancellation(row)">
          核销订单
        </el-button>
      </template>
    </VxeTable>
  </div>
</template>

<script>
import { jsonp } from 'vue-jsonp';
import { api, cancellationWrite, getAreaList } from '@/api/packagesManagement';
import VxeTable from '@/components/VxeTable';
import TableTools from '@/components/TableTools';
import { columns } from './table';
import { getMasterInfoByUserId } from '@/api/baseInfo/baseInfo';

export default {
  // eslint-disable-next-line vue/match-component-file-name
  name: 'OrderCancellation',
  components: {
    VxeTable,
    TableTools,
  },
  mounted() {
    this.getSFInfo();
  },
  data() {
    return {
      api,
      columns,
      customColumnsConfig: {
        localKey: 'abnormalOrder',
        columnsOptions: columns,
      },
      listQuery: {
        phone: '',
        relationshipLevelId: '',
        address: '',
        pageSize: 20,
        page: 1,
      },
      cascaderProps: {
        value: 'id',
        label: 'name',
        lazy: true,
        async lazyLoad(node, resolve) {
          const { level, value } = node;
          const areaList = await getAreaList({ parentId: !level ? 0 : value });
          resolve(
            areaList.data.map((item) => {
              item.leaf = level === 3;
              return item;
            })
          );
        },
      },
    };
  },
  created() {
    // console.log(columns)
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
    async getSFInfo() {
      const _this = this;
      const res = await getMasterInfoByUserId({
        userId: this.$store.state.user.userId,
      });
      jsonp('https://restapi.amap.com/v3/geocode/geo', {
        key: '5773f02930998e41b0de1d4e1bdbcaa9',
        address: res.data.shopCity,
      }).then((res) => {
        const location = res.geocodes[0].location;
        jsonp('https://restapi.amap.com/v3/geocode/regeo', {
          key: '5773f02930998e41b0de1d4e1bdbcaa9',
          location: `${location.split(',')[0]},${location.split(',')[1]}`,
        }).then((res) => {
          const addressComponent = res.regeocode.addressComponent;
          const { district, township, city, province } = addressComponent;
          _this.listQuery.address = `${province}-${city}-${district}-${township}`;
          _this.getList();
        });
      });
    },
    hadelOrderCancellation(row) {
      // console.log(row)
      this.$confirm('请确认订单已经核销完毕', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          cancellationWrite({
            orderId: row.orderId,
            noticeId: '0',
          })
            .then((res) => {
              this.$message({
                type: 'success',
                message: '核销成功!',
              });
            })
            .catch((err) => {
              this.$message.error('核销失败', err);
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消核销',
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
