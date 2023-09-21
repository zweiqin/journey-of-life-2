<template>
  <el-dialog
    title="指定团长"
    :visible.sync="addCommanderVisible"
    width="40%"
    :before-close="handleBeforeClose"
  >
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
      <el-form-item label="选择用户" prop="userId">
        <el-select
          style="width: 300px"
          v-model="form.userId"
          filterable
          remote
          reserve-keyword
          placeholder="请输入要指定团长的用户ID、手机号、昵称"
          :remote-method="remoteMethod"
          :loading="isLoading"
          @change="handleSelectUser"
        >
          <el-option
            :disabled="!item.mobile"
            v-for="item in userList"
            :key="item.id"
            :label="item.nickname"
            :value="item.id"
          >
            <div class="user-info-wrapper">
              <img class="avatar" :src="item.avatar" alt="" />
              <span style="flex: 1; margin-left: 10px">{{
                item.nickname
              }}</span>
              <el-tag>{{ item.id }}</el-tag>
              <el-tag
                type="danger"
                style="margin-left: 10px"
                v-if="!item.mobile"
                >未绑定手机号</el-tag
              >
            </div>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="设置团长区域" prop="region">
        <el-cascader
          ref="cascaderRef"
          placeholder="请选择团长区域"
          v-show="isDZServe"
          v-model="selectData"
          style="width: 300px"
          :props="cascaderProps"
          @change="handleSelectAll"
        ></el-cascader>

        <el-select
          v-show="!isDZServe"
          style="width: 300px"
          v-model="form.region"
          placeholder="请选择团长区域"
        >
          <el-option
            v-for="item in dZserveCity"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>

        <el-button type="primary" @click="handleSwitchData"
          >切换区域数据</el-button
        >
      </el-form-item>

      <el-form-item label="类型" prop="userType">
        <!-- <el-select
          style="width: 300px"
          v-model="form.userType"
          placeholder="请选择类型"
        >
          <el-option label="师傅合伙人" :value="1"> </el-option>
          <el-option label="团长" :value="2"> </el-option>
          <el-option label="门店合伙人" :value="3"> </el-option>
        </el-select> -->

        <el-radio-group v-model="form.userType">
          <el-radio :label="1">师傅合伙人</el-radio>
          <el-radio :label="2">团长</el-radio>
          <el-radio :label="3">门店合伙人</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addCommanderVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirm" :loading="isLoading"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import {
  apponitCommander,
  getSfList,
  getCitiesData,
  getCounsData,
} from '@/api/enterprise/communityMember';
import { provinceData } from '../table';
import { getMasterInfoByUserId } from '@/api/baseInfo/baseInfo';
export default {
  data() {
    return {
      addCommanderVisible: false,
      form: { userId: '', region: '', mobile: '', name: '', userType: 2 },
      isLoading: false,
      userList: [],
      cascaderProps: {
        lazy: true,
        lazyLoad: this.loadAreaData,
      },
      dZserveCity: [],
      selectData: [],
      isDZServe: false,
      rules: {
        userId: [
          { required: true, message: '请选择要添加的团长', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '请设置团长的区域', trigger: 'blur' },
        ],
        userType: [{ required: true, message: '请选择类型', trigger: 'blur' }],
      },
      isLoading: false,
    };
  },

  methods: {
    show() {
      this.addCommanderVisible = true;
      this.userList = [];
      this.dZserveCity = [];
      this.isDZServe = false;
      this.selectData = [];
      this.form = { userId: '', region: '', mobile: '', name: '', userType: 2 };
      this.getDZBaseInfo();
    },

    handleBeforeClose() {},

    async getList(query) {
      const { data } = await getSfList({
        keyword: query,
      });

      this.userList = data;
    },

    // 获取店长基本信息
    async getDZBaseInfo() {
      const { data } = await getMasterInfoByUserId({
        userId: this.$store.state.user.userId,
      });

      let serverCity = data.serverCity;
      if (serverCity) {
        try {
          serverCity = JSON.parse(serverCity);
        } catch (error) {
          serverCity = data.serverCity;
        }

        this.dZserveCity = serverCity.map(
          (item) => item[0] + item[1] + item[2]
        );
      }

      this.form.region = this.dZserveCity[0];
    },

    // 搜索数据
    remoteMethod(value) {
      if (value && value.trim()) {
        this.getList(value);
      }
    },

    // 动态搜索数据
    async loadAreaData(node, resolve) {
      const { level, value, label } = node;
      if (level == 0) {
        resolve(
          provinceData.map((item) => {
            item.label = item.nameProv;
            item.value = item.codeProv;
            return item;
          })
        );
      } else if (level === 1) {
        const { data } = await getCitiesData({
          code: value,
        });

        resolve(
          data.map((item) => {
            item.label = item.nameCity;
            item.value = item.codeCity;
            return item;
          })
        );
      } else if (level === 2) {
        const { data } = await getCounsData({
          code: value,
        });

        resolve(
          data.map((item) => {
            item.label = item.nameCoun;
            item.value = item.codeCoun;
            item.leaf = true;
            return item;
          })
        );
      }
    },

    handleSelectUser(data) {
      const userInfo = this.userList.find((item) => item.id === data);
      if (userInfo) {
        this.form.name = userInfo.nickname;
        this.form.mobile = userInfo.mobile;
      }
    },

    handleSelectAll() {
      const selectNode = this.$refs.cascaderRef.getCheckedNodes();
      if (selectNode.length) {
        const selectData = selectNode[0].pathNodes;
        this.form.region =
          selectData[0].label + selectData[1].label + selectData[2].label;
      }
    },

    handleSwitchData() {
      this.isDZServe = !this.isDZServe;
      this.form.region = '';
      this.selectData = [];
    },

    // 确定
    handleConfirm() {
      const _this = this;
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          try {
            _this.isLoading = true;
            await apponitCommander(_this.form);
            _this.$elMessage('指定成功');
            this.addCommanderVisible = false;
            this.$emit('success');
          } finally {
            _this.isLoading = false;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
}
</style>
