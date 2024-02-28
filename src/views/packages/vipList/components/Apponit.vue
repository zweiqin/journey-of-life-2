<template>
  <el-dialog :visible.sync="visible" v-bind="modalOptions">
    <el-form
      ref="formData"
      :model="formData"
      :rules="rules"
      size="mini"
      label-suffix=":"
      label-width="120px"
    >
      <!-- 分类信息 -->
      <el-form-item label="区域" prop="cityId">
        <el-cascader
          ref="selectRef"
          @change="handleQueryCommunity"
          v-model="formData.cityId"
          :props="props"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="小区名称" prop="communityName">
        <el-autocomplete
          v-model="formData.communityName"
          :fetch-suggestions="handleQueryCommunity"
          placeholder="请输入小区名称"
          @select="handleSelectCommunity"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="用户状态" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio :label="1">指定</el-radio>
          <el-radio :label="2">撤销</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleApponit" :loading="isLoading"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { getByIdShopGoodsTypeInfo } from '@/api/nearbyMerchants/nearbyMerchants';
import {
  getAreaList,
  selectCommunity,
  apponitComunity,
} from '@/api/packagesManagement';

export default {
  name: 'DetailModal',
  data() {
    return {
      modalOptions: {
        closeOnClickModal: false,
        width: '400px',
        title: '查看详情',
      },
      visible: false,
      isLoading: false,
      props: {
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

      formData: {
        communityName: '', //小区名称
        cityName: '', // 城市名称
        cityId: [], // 城市主键
        buyerUserId: '用户ID', // 用户ID
        type: 1, // 状态：1-设定 2-撤销
      },

      rules: {
        cityId: [{ required: true, message: '请选择区域', trigger: 'blur' }],
        communityName: [
          { required: true, message: '请输入小区名称', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleOpen(params = {}) {
      this.formData = Object.assign(this.$options.data().formData, params);
      if (params.id) {
        this.getInfo(params.id);
      }
      this.visible = true;
    },
    async handleQueryCommunity(queryString, cb) {
      const communityList = await selectCommunity({
        cityId: this.formData.cityId[3],
      });

      if (communityList.data && Array.isArray(communityList.data)) {
        cb(communityList.data.map((item) => ({ value: item })));
      } else {
        cb([]);
      }
    },
    handleSelectCommunity(selectCommunityValue) {
      this.formData.communityName = selectCommunityValue.value;
    },
    async handleApponit() {
      try {
        await this.$refs.formData.validate();
        this.isLoading = true;
        const selectArea = this.$refs.selectRef.getCheckedNodes();
        const subData = JSON.parse(JSON.stringify(this.formData));
        subData.cityName = selectArea[0].data.name;
        subData.cityId = subData.cityId[3];
        await apponitComunity(subData);
        this.$message.success('指定成功');
        this.$emit('refresh');
        this.visible = false;
      } catch (e) {
      } finally {
        this.isLoading = false;
      }
    },
    async getInfo(id) {
      const loading = this.$elLoading('加载中');
      try {
        const res = await getByIdShopGoodsTypeInfo({ shopGoodsTypeId: id });
        this.formData = Object.assign(this.$options.data().formData, res.data, {
          id: res.data.id || '',
          shopId: res.data.shopId || '',
          goodsTypeName: res.data.goodsTypeName || '',
          goodsTypeUrl: res.data.goodsTypeUrl || '',
          goodsTypeSort: res.data.goodsTypeSort,
          typeCategory: res.data.typeCategory,
          createTime: res.data.createTime || '',
          updateTime: res.data.updateTime || '',
        });
      } finally {
        loading.close();
      }
    },
  },
};
</script>
