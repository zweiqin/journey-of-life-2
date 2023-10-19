<template>
  <el-dialog
    title="订单核销"
    :visible.sync="verificationModalVisible"
    width="30%"
    :before-close="resetForm"
    :close-on-click-modal="false"
  >
    <el-form
      ref="verificationFormRef"
      :model="verificationForm"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="订单号">
        {{ verificationForm.orderNo }}
      </el-form-item>
      <el-form-item label="领取时间" prop="receiveTime">
        <el-date-picker
          ref="elDatePickerRef"
          v-if="!isCustorm"
          v-model="verificationForm.receiveTime"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>

        <el-input
          style="width: 220px"
          v-else
          placeholder="请输入时间"
          v-model="verificationForm.receiveTime"
        ></el-input>

        <el-button
          type="primary"
          size="mini"
          @click="
            isCustorm = !isCustorm;
            verificationForm.receiveTime = '';
          "
          >{{ isCustorm ? '选择时间' : '自定义时间' }}</el-button
        >
      </el-form-item>
      <el-form-item label="领取人" prop="receiveName">
        <el-input
          style="width: 220px"
          v-model="verificationForm.receiveName"
          placeholder="请输入领取人"
        />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeModal">取 消</el-button>
      <el-button type="primary" @click="handleVerification">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { orderVerification } from '@/api/orderManagement/order';
export default {
  data() {
    return {
      verificationModalVisible: false,
      isVerificationLoading: false,
      verificationForm: {
        orderNo: '',
        receiveTime: '',
        receiveName: '',
      },
      isCustorm: false,
      rules: {
        orderNo: [
          { required: true, message: '订单号是必须的', trigger: 'blur' },
        ],
        receiveTime: [
          { required: true, message: '请输入领取时间', trigger: 'blur' },
        ],
        receiveName: [
          { required: true, message: '请输入领取人', trigger: 'blur' },
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  methods: {
    handleOpen(orderInfo) {
      this.verificationForm.orderNo = orderInfo.orderNo;
      this.verificationModalVisible = true;
      this.$nextTick(() => {
        this.verificationForm.receiveTime =
          this.$refs.elDatePickerRef.formatToValue(new Date());
      });
    },

    resetForm(done) {
      this.closeModal();
      done();
    },

    closeModal() {
      this.verificationForm.orderNo = '';
      this.verificationForm.receiveName = '';
      this.verificationForm.receiveTime = '';
      this.isVerificationLoading = false;
      this.verificationModalVisible = false;
    },

    // 点击确定
    async handleVerification() {
      try {
        await this.$refs.verificationFormRef.validate();
        this.isVerificationLoading = true;
        const formData = JSON.parse(JSON.stringify(this.verificationForm));
        console.log('来了老弟', formData);
        await orderVerification(formData);
        this.$elMessage('核销成功');
        this.$emit('refresh');
        this.closeModal();
      } finally {
        this.isVerificationLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
