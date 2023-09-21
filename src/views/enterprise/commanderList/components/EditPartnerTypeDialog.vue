<template>
  <div>
    <el-dialog
      title="修改类型"
      :visible.sync="editTypeVisible"
      width="30%"
      :before-close="handleBeforeClose"
    >
      <el-radio-group v-model="editTypeForm.type">
        <el-radio :label="1">师傅合伙人</el-radio>
        <el-radio :label="2">团长</el-radio>
        <el-radio :label="3">门店合伙人</el-radio>
      </el-radio-group>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editTypeVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm" :loading="isLoading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editPartnerType } from '@/api/enterprise/communityMember';

export default {
  data() {
    return {
      editTypeVisible: false,
      isLoading: false,
      editTypeForm: {
        userId: null,
        type: null,
      },
    };
  },
  methods: {
    show(rowInfo) {
      if (rowInfo) {
        this.editTypeForm.type = rowInfo.type;
        this.editTypeForm.userId = rowInfo.sfUserId;
        this.editTypeVisible = true;
      } else {
        this.$message.warning('数据错误');
      }
    },

    async handleConfirm() {
      const { userId, type } = this.editTypeForm;
      console.log(userId, type);

      if (!userId || !type) {
        this.$message.error('数据错误，请联系管理员');
        return;
      }

      try {
        this.isLoading = true;
        await editPartnerType({ ...this.editTypeForm });
        this.$message.success("修改成功")
        this.$emit('success')
        this.editTypeVisible = false
      } finally {
        this.isLoading = false;
      }
    },

    handleBeforeClose() {
      this.editTypeForm = {
        userId: null,
        type: null,
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
