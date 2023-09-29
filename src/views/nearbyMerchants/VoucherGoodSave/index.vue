<template>
  <div class="app-container">
    <div class="body-container">
      <el-card class="box-card">
        <h3 slot="header">{{ `${formData.shopGoodsType === 1 ? '商品' : formData.shopGoodsType === 2 ? '服务' : ''}介绍` }}</h3>
        <div class="box-card-container">
          <div class="box-card-form">
            <el-form ref="voucherGoodsFormRef" :rules="formRules" :model="formData" size="mini" label-suffix="："
              label-width="150px">
              <el-form-item label="商品类型" prop="shopGoodsType">
                <el-radio-group v-model="formData.shopGoodsType" disabled>
                  <el-radio :label="1">商品</el-radio>
                  <el-radio :label="2">服务</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item :label="`请选择${currentType}`" prop="goodsIds">
                <span>已选 <span style=" color: #fff;padding: 2px 5px; background-color: #1890ff;
              border-radius: 4px;">{{
                formData.id ? 1 : formData.goodsIds.length }}</span> 件{{ currentType }}</span>
              </el-form-item>

              <el-form-item>
                <el-table v-if="!formData.id" border @selection-change="handleSelectionChange" :data="goodsListInfo.items"
                  style="width:
                  100%">
                  <el-table-column align="center" type="selection"></el-table-column>
                  <el-table-column label="索引" align="center" type="index"></el-table-column>
                  <el-table-column prop="goodsLogo" :label="`${currentType}logo`" width="100" align="center">
                    <template slot-scope="scope">
                      <el-image style="width: 30px; height: 30px;" :src="scope.row.goodsLogo"
                        :preview-src-list="[scope.row.goodsLogo]" fit="cover" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="goodsName" :label="`${currentType}名称`" width="180" align="center">
                  </el-table-column>
                  <el-table-column align="center" prop="goodsPrice" label="价格"> </el-table-column>
                  <el-table-column align="center" prop="preferentialPrice" label="价格"></el-table-column>
                  <el-table-column align="center" prop="serviceVolume" label="销量"></el-table-column>
                  <el-table-column label="是否上架" prop="goodsUpper" align="center">
                    <template slot-scope="scope"> <el-switch v-model="scope.row.goodsUpper"
                        @change="handleUpdate(scope.row, $event)"> </el-switch>
                    </template>
                  </el-table-column>
                </el-table>

                <el-pagination v-if="!formData.id" @current-change="handleCurrentChange" :page-size="goodsQuery.pageSize"
                  style="margin: 20px 0; float: right;" layout="total, prev, pager, next"
                  :total="goodsListInfo.total * 1">
                </el-pagination>

                <div class="goods-detail-info" v-if="formData.id && currentSelectGoodsInfo">
                  <el-image style="width: 50px; height: 50px; border-radius: 5px;" :src="currentSelectGoodsInfo.goodsLogo"
                    :preview-src-list="[currentSelectGoodsInfo.goodsLogo]" fit="cover" />
                  <div class="goods-name">{{ currentSelectGoodsInfo.goodsName }}</div>
                  <div class="icon-wrapper">
                    <i class="el-icon-check"></i>
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="活动类型" prop="voucherType">
                <el-radio-group v-model="formData.voucherType">
                  <el-radio :label="1">满减</el-radio>
                  <el-radio :label="2">折扣</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item v-if="formData.voucherType === 1" label="满减金额" prop="conditionAmount" :rules="[{
                required: true, message: '请输入满减金额', type: 'number',
                trigger: 'blur'
              }]">
                <el-input type="number" placeholder="请输入满减金额" v-model.number="formData.conditionAmount"></el-input>
              </el-form-item>

              <el-form-item v-if="formData.voucherType === 1" label="优惠金额" prop="benefitAmount" :rules="[{
                required: true, message: '请输入优惠金额', type: 'number',
                trigger: 'blur'
              }]">
                <el-input type="number" placeholder="请输入优惠金额" v-model.number="formData.benefitAmount"></el-input>
              </el-form-item>

              <el-form-item v-if="formData.voucherType === 2" label="折扣" prop="discount">
                <el-input type="number" placeholder="请输入折扣" v-model.number="formData.discount"></el-input>
                <div class="tip">输入超过三位默认四舍五入保留两位小数</div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
    </div>

    <div class="footer-container">
      <el-button size="medium" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="medium" @click="handleSubmit">保存</el-button>
    </div>
  </div>
</template>

<script>
import {
  queryShopGoodsList,
  upperShopGoods,
  createVoucherGoods,
  getVoucherGoodsDetail,
  editVoucherGoodsDetail
} from '@/api/nearbyMerchants/nearbyMerchants'
import { isNull } from 'xe-utils'

export default {
  name: "VoucherGoodSave",
  data() {

    const formData = {
      id: undefined, // 修改用
      goodsIds: [],
      shopGoodsId: undefined, // 修改用
      shopGoodsType: 1,  // 门店商品类型
      voucherType: 1, // 活动类型
      conditionAmount: '', // 满减金额
      benefitAmount: '', // 优惠金额
      discount: '' // 折扣
    }

    const validateIds = (_, value, callback) => {
      if (!formData.id && (!value || (Array.isArray(value) && !value.length))) {
        callback(new Error(`请选择${this.currentType}`))
      } else {
        callback()
      }
    }

    const validateDiscount = (_, value, callback) => {
      if ((!value && value !== 0) || formData.voucherType !== 2) {
        return callback()
      }
      if (isNull(value)) {
        return callback(new Error('请输入数字'))
      }
      const discount = Number(value)
      console.log(discount <= 0 || discount >= 1);
      if (discount <= 0 || discount >= 1) {
        return callback(new Error("折扣的范围应该在0 ~ 1之间"))
      }
      callback()
    }

    return {
      formData,
      validateDiscount,
      formRules: {
        shopGoodsType: [{ type: 'number', required: true, message: `请选择${this.currentType}类型`, trigger: 'blur' }],
        voucherType: [{ type: 'number', required: true, message: "请选择活动类型", trigger: 'blur' }],
        goodsIds: [{ validator: validateIds, trigger: 'blur' }],
        discount: [{ validator: validateDiscount, trigger: 'blur' }],
      },
      goodsQuery: {
        pageSize: 40,
        pageNo: 1,
        search: '',
        goodsType: '',
        flag: 1
      },
      loading: false,
      goodsListInfo: {},
      currentSelectGoodsInfo: null
    }
  },

  created() {
    this.init()
  },

  deactivated() {
    this.goodsListInfo = {}
    this.currentSelectGoodsInfo = null
    this.loading = false
    this.goodsQuery = {
      pageSize: 40,
      pageNo: 1,
      search: '',
      goodsType: '',
      flag: 1
    }
  },

  computed: {
    currentType() {
      return this.formData.shopGoodsType === 1 ? '商品' : "服务"
    }
  },

  methods: {
    init() {
      const goodsType = Number(this.$route.query.type)
      this.formData.shopGoodsType = goodsType
      this.goodsQuery.goodsType = goodsType
      this.getGoodsList()
      if (this.$route.query.id) {
        this.getVoucherGoodsDetail(this.$route.query.id)
      }
    },

    async getGoodsList() {
      const res = await queryShopGoodsList(this.goodsQuery)
      this.goodsListInfo = res.data
      this.goodsListInfo.items = this.goodsListInfo.items.map(item => {
        item.goodsUpper = item.goodsUpper === 1
        return item
      })
    },

    handleCancel() {
      this.$router.back()
    },

    // 获取商品详情
    async getVoucherGoodsDetail(goodsId) {
      const loading = this.$elLoading('信息获取中...')
      try {
        const { data } = await getVoucherGoodsDetail({ shopVoucherId: goodsId })
        this.formData.id = data.id * 1
        this.formData.shopGoodsId = data.shopGoodsId
        this.formData.shopGoodsType = data.shopGoodsType
        this.formData.voucherType = data.voucherType
        this.formData.conditionAmount = data.conditionAmount
        this.formData.benefitAmount = data.benefitAmount
        this.formData.discount = data.discount
        this.currentSelectGoodsInfo = data
        loading.close()
      } catch (error) {
        loading.close()
      }
    },

    async handleUpdate(row, status) {
      const loading = this.$elLoading()
      try {
        await upperShopGoods({ shopGoodsId: row.id })
        loading.close()
        this.$message.success(status ? "上架成功" : "下架成功")
      } catch (e) {
        loading.close()
      } finally {
        this.getGoodsList()
        this.formData.goodsIds = []
      }
    },

    handleCurrentChange(e) {
      this.goodsQuery.pageNo = e
      this.getGoodsList()
    },

    handleSelectionChange(e) {
      this.formData.goodsIds = [...new Set([...e.map(item => item.id)])]
    },

    async handleSubmit() {
      // if (!this.formData.id && (!this.formData.goodsIds || (this.formData.goodsIds && Array.isArray(this.formData.goodsIds) && !this.formData.goodsIds.length))) {
      //   return this.$message.error('请选择要支持代金券的商品')
      // }
      const loading = this.$elLoading()
      const api = this.formData.id ? editVoucherGoodsDetail : createVoucherGoods
      try {
        await this.$refs.voucherGoodsFormRef.validate()
        await api(this.formData)
        loading.close()
        this.$message.success(this.formData.id ? "修改成功" : '添加成功')
        this.handleCancel()
      } catch (error) {
        loading.close()
      }
    }
  },


}
</script>

<style lang="scss" scoped>
.el-select-dropdown__item {
  height: auto !important;
}

.app-container {
  height: 100%;
  padding: 0;
}

.body-container {
  flex: 1;
  overflow-y: auto;

  .el-card {
    margin: 20px;


  }
}

.footer-container {
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.goods-detail-info {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #f6f6f6;
  display: flex;
  align-items: center;


  .goods-name {
    font-size: 17px;
    color: #1890ff;
    margin-left: 10px;
    flex: 1;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #1890ff;

    .el-icon-check {
      color: #fff;
    }
  }


}

.tip {
  font-size: 12px;
  color: #ccc;
}
</style>