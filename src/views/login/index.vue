<template>
  <div class="login">
    <div class="introduce-container">
      <div style="font-size: 18px">一样的生活 不一样的享受</div>
      <div
        style="
          margin-top: 20px;
          margin-bottom: 15px;
          font-size: 40px;
          font-weight: 700;
        "
      >
        团蜂服务&nbsp;&nbsp;走进千家万户
      </div>
      <div style="font-size: 15px">BEE GROUP</div>
    </div>
    <div class="login-container">
      <div class="login-header">
        <h2 class="login-title">欢迎登录团蜂社区服务中心系统</h2>
        <hr />
        <h4>Welcome To The Bee Community Service Center System</h4>
      </div>
      <div class="login-card">
        <!-- <div class="login-changein">
					<div class="code-img" @click="switchLogin">
					<svg-icon v-if="activeName === 'third'" icon-class="computer" class="code-icon code-icon-computer" />
					<svg-icon v-else icon-class="qr-code" class="code-icon code-icon-qr" />
					</div>
					<div class="login-tip">
					<div class="poptip">
					<div class="poptip-arrow"><span></span></div>
					<div class="poptip-content">{{ activeName === 'third' ? '切换为账号密码登录' : '扫码登录更便捷' }}</div>
					</div>
					</div>
					</div> -->
        <el-card
          shadow="never"
          :body-style="{ padding: '0px' }"
          style="border: 0; background-color: transparent"
        >
          <div v-if="activeName === 'third'">
            <div class="login-box">
              <div class="login-content">
                <div class="master-login-title">手机扫码，安全登录</div>
                <div class="qrcode-login">
                  <div class="qrcode-img">
                    <img
                      style="height: 250px; width: 250px"
                      src="https://i0.hdslb.com/bfs/archive/aff45710ff2ac08360c5881e013b9bde3284b71f.jpg"
                    />
                  </div>
                  <div class="qrcode-desc">
                    <p>
                      打开<span class="light-link"> 微信APP </span>扫一扫登录
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <el-tabs v-else v-model="activeName" @tab-click="handleClick"> -->
          <!-- <el-tab-pane label="密码登录" name="first"> -->
          <div class="login-box login-tab-box">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
              <el-form-item prop="username">
                <el-input
                  v-model="loginForm.username"
                  type="text"
                  auto-complete="off"
                  placeholder="请输入账号"
                >
                  <div
                    slot="prefix"
                    style="width: 100%; height: 100%; background-color: #073e8e"
                  >
                    <svg-icon
                      icon-class="user"
                      class="el-input__icon input-icon"
                    />
                  </div>
                </el-input>
              </el-form-item>
              <el-form-item
                prop="password"
                v-if="loginType === 1"
                :rules="[
                  { required: true, trigger: 'blur', message: '密码不能为空' },
                ]"
              >
                <el-input
                  v-model="loginForm.password"
                  type="password"
                  auto-complete="off"
                  placeholder="请输入密码"
                  show-password
                  @keyup.enter.native="handleLogin"
                >
                  <div
                    slot="prefix"
                    style="width: 100%; height: 100%; background-color: #073e8e"
                  >
                    <svg-icon
                      icon-class="password"
                      class="el-input__icon input-icon"
                    />
                  </div>
                </el-input>
              </el-form-item>
              <!-- <el-form-item prop="code" v-if="loginType === 1">
                <el-input
                  v-model="loginForm.code"
                  auto-complete="off"
                  placeholder="验证码"
                  style="width: 63%"
                  @keyup.enter.native="handleLogin"
                >
                  <div
                    slot="prefix"
                    style="width: 100%; height: 100%; background-color: #073e8e"
                  >
                    <svg-icon
                      icon-class="validCode"
                      class="el-input__icon input-icon"
                    />
                  </div>
                </el-input>
                <div class="login-code">
                  <img
                    width="100%"
                    height="100%"
                    :src="codeUrl"
                    @click="getCode"
                  />
                </div>
              </el-form-item> -->

              <el-form-item
                style="position: relative"
                prop="code"
                :rules="[
                  {
                    required: true,
                    trigger: 'change',
                    message: '验证码不能为空',
                  },
                ]"
                v-if="loginType === 2"
              >
                <el-input
                  v-model="loginForm.code"
                  auto-complete="off"
                  placeholder="手机验证码"
                  @keyup.enter.native="handleLogin"
                >
                  <div
                    slot="prefix"
                    style="width: 100%; height: 100%; background-color: #073e8e"
                  >
                    <svg-icon
                      icon-class="validCode"
                      class="el-input__icon input-icon"
                    />
                  </div>
                </el-input>

                <div
                  style="
                    position: absolute;
                    top: 50%;
                    right: 10px;
                    z-index: 10;
                    transform: translateY(-50%);
                  "
                >
                  <el-button @click="sendCode" type="text">{{
                    timer ? `${time}s后重新发送` : '获取手机验证码'
                  }}</el-button>
                </div>
              </el-form-item>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <el-checkbox
                  v-model="loginForm.rememberMe"
                  style="margin: 0px 0px 25px 0px; color: rgba(0, 0, 0, 0.85)"
                >
                  记住密码
                </el-checkbox>

                <el-button
                  @click="loginType = loginType === 1 ? 2 : 1;$refs.loginForm.clearValidate()"
                  type="text"
                  style="margin-top: -25px; padding-right: 0"
                  >{{ loginType === 1 ? '验证码登录' : '密码登录'
                  }}</el-button
                >
                <!-- 点名道姓加班 -->
              </div>
              <el-form-item style="width: 100%">
                <el-button
                  :loading="loading"
                  size="medium"
                  type="primary"
                  style="width: 100%; height: 50px"
                  @click.native.prevent="handleLogin"
                >
                  <span v-if="!loading">登 录</span>
                  <span v-else>登 录 中...</span>
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </div>
    <!--  底部  -->
    <!-- <div class="el-login-footer">
			<span>Copyright © 2020-2030 团蜂科技版权所有.</span>
			</div> -->
  </div>
</template>

<script>
import { getCodeImg, sendeQrCodeApi } from '@/api/login';
import Cookies from 'js-cookie';

export default {
  name: 'Login',
  data() {
    const phoneCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的手机号'));
      }
    };
    return {
      loginType: 1, // 1：密码登录，2：验证码登录
      activeName: 'first',
      codeUrl: '',
      cookiePassword: '',

      // 手机验证码
      timer: null,
      time: 60,

      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        typ: 0,
        uuid: '',
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' },
        ],
        // password: [
        //   { required: true, trigger: 'blur', message: '密码不能为空' },
        // ],
        // code: [
        //   { required: true, trigger: 'change', message: '验证码不能为空' },
        // ],
      },

      validationForm: {
        phone: '',
        code: '',
      },
      validationRules: {
        phone: [{ required: true, trigger: 'change', validator: phoneCheck }],
        code: [
          { required: true, trigger: 'change', message: '验证码不能为空' },
        ],
      },
      validationDisabled: false,
      validationText: '发送验证码',
      countDown: 60,

      loading: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    // this.getCode();
    this.getCookie();
  },
  methods: {
    switchLogin() {
      if (this.activeName === 'third') {
        this.activeName = 'first';
      } else {
        this.activeName = 'third';
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getCode() {
      getCodeImg().then((res) => {
        this.codeUrl = 'data:image/gif;base64,' + res.data;
        this.loginForm.uuid = res.data.uuid;
      });
    },
    getCookie() {
      const username = Cookies.get('username');
      const password = Cookies.get('password');
      const typ = Cookies.get('typ');
      const rememberMe = Cookies.get('rememberMe');
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : password,
        typ: typ === undefined ? this.loginForm.typ : typ,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    handleLogin() {
      if (this.activeName === 'first') {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            if (this.loginForm.rememberMe) {
              Cookies.set('username', this.loginForm.username, { expires: 30 });
              Cookies.set('password', this.loginForm.password, { expires: 30 });
              Cookies.set('typ', this.loginForm.typ, { expires: 30 });
              Cookies.set('rememberMe', this.loginForm.rememberMe, {
                expires: 30,
              });
            } else {
              Cookies.remove('username');
              Cookies.remove('password');
              Cookies.remove('rememberMe');
            }

            const loginData = {
              mobile: this.loginForm.username,
              code: this.loginForm.code,
              typ: 0,
              operaType: 1,
            };

            this.loginType === 1 &&
              (loginData.password = this.loginForm.password);

            this.$store
              .dispatch('LoginByUsername', loginData)
              .then(() => {
                this.loading = false;
                this.$router.push({ path: this.redirect || '/' });
              })
              .catch((response) => {
                this.loading = false;
                this.getCode();
              });
          }
        });
      } else if (this.activeName === 'second') {
        this.$refs.validationForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$store
              .dispatch('LoginByVerification', this.loginForm)
              .then(() => {
                this.loading = false;
                this.$router.push({ path: this.redirect || '/' });
              })
              .catch((response) => {
                this.loading = false;
              });
          }
        });
      } else if (this.activeName === 'third') {
        return false;
      }
    },
    async sendCode() {
      if (!this.loginForm.username) {
        return this.$message.warning('请填写登录手机号');
      }

      if (this.timer) {
        return this.$message.warning('验证码发送中，请勿频繁获取');
      }

      try {
        this.timer = setInterval(() => {
          if (this.time === 1) {
            this.resetTimer();
          }
          this.time--;
        }, 1000);
        await sendeQrCodeApi(this.loginForm.username);
      } catch (error) {
        console.log('你麻痹', error);
        this.$message.error('验证码发送失败', error);
        this.resetTimer();
      }
    },
    resetTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.time = 60;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  position: relative;
  height: 100%;
  background-image: url('~@/assets/image/login-background.jpg');
  // background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  .introduce-container {
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translateY(-50%);
    color: #ffffff;
  }

  .login-container {
    position: absolute;
    right: 8%;
    top: 50%;
    transform: translateY(-50%);
    padding: 30px 60px;
    background: rgba(195, 212, 228, 0.8);
    border-radius: 15px;
    box-shadow: 0px 0px 15px 3px #ffffff;

    .login-header {
      color: #000000;

      .login-title {
        // width: 100%;
        height: 1.5em;
        text-align: justify;
      }

      .login-title:after {
        display: inline-block;
        width: 100%;
        content: '';
      }

      hr {
        margin: 4px 0;
        border-color: rgba(0, 0, 0, 0.85);
      }

      h4 {
        // width: 100%;
        height: 1.5em;
        text-align: justify;
      }

      h4:after {
        display: inline-block;
        width: 100%;
        content: '';
      }
    }

    .login-card {
      position: relative;

      .el-tabs__nav-wrap::after {
        background-color: transparent;
      }

      // .login-changein {
      // 	position: absolute;
      // 	right: 2px;
      // 	top: 2px;
      // 	z-index: 2;
      // 	width: 50%;
      // 	height: 44px;
      // 	margin: 0 auto;

      // 	.code-img {
      // 		position: absolute;
      // 		top: 2px;
      // 		right: 2px;

      // 		// z-index: 1;
      // 		.code-icon {
      // 			color: #111;
      // 			cursor: pointer;
      // 		}

      // 		.code-icon-computer {
      // 			font-size: 50px;
      // 		}

      // 		.code-icon-qr {
      // 			font-size: 60px;
      // 		}
      // 	}

      // 	.login-tip {
      // 		position: absolute;
      // 		top: 10px;
      // 		right: 61px;

      // 		.poptip {
      // 			position: relative;
      // 			// z-index: 3;
      // 			border-radius: 6px;
      // 			background-color: rgba(61, 127, 255, .1);
      // 			border: none;
      // 			height: 30px;
      // 			line-height: 30px;
      // 			padding: 0 10px;

      // 			.poptip-arrow {
      // 				position: absolute;
      // 				// z-index: 2;
      // 				top: 9px;
      // 				right: 0;

      // 				// em {
      // 				// 	position: absolute;
      // 				// 	top: 0;
      // 				// 	left: 1px;
      // 				// 	width: 0;
      // 				// 	height: 0;
      // 				// 	border: none;
      // 				// }

      // 				span {
      // 					position: absolute;
      // 					top: 0;
      // 					left: 0;
      // 					width: 0;
      // 					height: 0;
      // 					border-style: solid;
      // 					border-color: #fff0;
      // 					border-width: 6px 0 6px 6px;
      // 					border-left-color: rgba(61, 127, 255, .1);
      // 					overflow: hidden;
      // 				}

      // 			}

      // 			.poptip-content {
      // 				font-size: 14px;
      // 				font-weight: 400;
      // 				color: rgba(61, 127, 255, 1);
      // 			}
      // 		}
      // 	}
      // }

      .login-box {
        // width: 500px;
        height: 350px;
        padding: 25px 25px 5px 25px;
        border-radius: 6px;

        .login-content {
          .master-login-title {
            padding-top: 10px;
            font-weight: lighter;
            font-size: 20px;
            text-align: center;
            font-family: PingFangSC-Regular;
            color: #111;
          }

          .qrcode-login {
            .qrcode-img {
              width: 100%;
              height: 260px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 0;
            }

            .qrcode-desc {
              width: 100%;
              margin: 0 auto;

              p {
                text-align: center;
                font-size: 20px;
                color: #111;
                font-family: PingFangSC-Regular;
              }
            }
          }
        }
      }

      .login-tab-box {
        height: 312px;
        padding: 30px 5px 0;

        .el-input {
          height: 38px;
          box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.8);

          input {
            height: 38px;
            padding-left: 50px;
          }

          .el-input__prefix {
            left: 0;
            width: 38px;
          }
        }

        .input-icon {
          height: 39px;
          width: 14px;
          margin-left: 2px;
        }

        .login-tip {
          font-size: 13px;
          text-align: center;
          color: #bfbfbf;
        }

        .login-code {
          width: 33%;
          height: 38px;
          float: right;
          line-height: 38px;

          img {
            cursor: pointer;
            vertical-align: middle;
          }
        }

        .el-button--primary {
          background-color: #073e8e;
          border-color: #073e8e;
          box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.8);
        }

        .el-button--primary:active {
          background: #1682e6;
          border-color: #1682e6;
          color: #ffffff;
          outline: none;
        }
      }
    }
  }

  // .el-login-footer {
  // 	height: 40px;
  // 	line-height: 40px;
  // 	position: fixed;
  // 	bottom: 0;
  // 	width: 100%;
  // 	text-align: center;
  // 	color: #fff;
  // 	font-family: Arial;
  // 	font-size: 12px;
  // 	letter-spacing: 1px;
  // }
}
</style>
