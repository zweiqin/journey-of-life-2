<template>
  <el-dialog
    title="团长申请审核"
    :visible.sync="excmineDialogVisible"
    width="30%"
    :before-close="onBeforeClose"
  >
    <el-radio-group v-model="form.status">
      <el-radio :label="3">通过</el-radio>
      <el-radio :label="4">不通过</el-radio>
    </el-radio-group>
    <el-input
      v-show="form.status === 4"
      style="margin-top: 20px"
      type="textarea"
      :rows="2"
      placeholder="请输入不通过原因"
      v-model="form.cause"
    >
    </el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="excmineDialogVisible = false">取 消</el-button>
      <el-button :loading="isLoading" type="primary" @click="onSubmit"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { examineSFApply } from '@/api/enterprise/communityMember';
export default {
  data() {
    return {
      excmineDialogVisible: false,
      form: {
        cause: '',
        status: 3,
        id: '',
      },
      onSuccess: null,
      isLoading: false,
    };
  },

  methods: {
    show({ status, id, onSuccess }) {
      if (id) {
        this.form.id = id;
        this.excmineDialogVisible = true;
        this.onSuccess = onSuccess;
      } else {
        this.$elMessage('数据有误', 'error');
      }
    },

    onBeforeClose() {
      this.examineResult = 3;
      this.queryId = null;
    },

    async onSubmit() {
      if (this.form.status) {
        try {
          await examineSFApply(this.form);
          this.$elMessage('审核成功');
          this.onSuccess &&
            typeof this.onSuccess === 'function' &&
            this.onSuccess();
          this.excmineDialogVisible = false;
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
