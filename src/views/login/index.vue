<template>
  <div class="login">
    <div class="logo" />
    <div class="form">
      <h1>手机号登录</h1>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item prop="mobile">
          <el-input
            v-model="ruleForm.mobile"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item prop="isAgree">
          <el-checkbox v-model="ruleForm.isAgree">用户平台使用协议</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit(ruleForm)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsianOAIndex',

  data() {
    return {
      ruleForm: {
        mobile: '',
        password: '',
        isAgree: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '密码长度应该为6-16位之间',
            trigger: 'blur'
          }
        ],
        isAgree: [
          {
            validator: (rule, value, callback) => {
              value ? callback() : callback(new Error('没有勾选用户平台协议'))
            }
          }
        ]
      }
    }
  },

  mounted() {},

  methods: {
    submit() {
      this.$refs.ruleForm.validate((value) => {
        if (value) {
          console.log(value)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  height: 100vh;
  // align-items: stretch;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-radius: 0 60px 0 0;
  }
  .form {
    flex: 2;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 100px;
    h1 {
      font-size: 24px;
    }
    ::v-deep .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-button {
      width: 350px;
      border: 0;
    }
  }
}
</style>
