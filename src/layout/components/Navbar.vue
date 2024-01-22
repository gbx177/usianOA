<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <span v-else class="username">{{ name?.charAt(0) }}</span>
          <!-- 用户名称 -->
          <span class="name">{{ name }}</span>
          <!-- 设置 -->
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <el-dropdown-item
            @click.native="dialogFormVisible = true"
          >修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="logout">
            <span style="display: block">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改密码模态框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      :before-close="ko"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="原密码" prop="oldPassword">
          <el-input
            v-model.trim="ruleForm.oldPassword"
            show-password
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model.trim="ruleForm.newPassword"
            show-password
          />
        </el-form-item>
        <el-form-item label="重置密码" prop="password">
          <el-input v-model.trim="ruleForm.password" show-password />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUpdate">确定修改</el-button>
        <el-button @click="ko">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getAddUpdateApi } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        password: ''
      },
      dialogFormVisible: false,
      rules: {
        oldPassword: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '新密码的⻓度为6-16位之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.ruleForm.newPassword) {
                callback(new Error('重复密码和新密码输⼊不⼀致!'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name'])
  },
  created() {
    this.$store.dispatch('user/userInfo')
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    addUpdate() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          delete this.ruleForm.password
          await getAddUpdateApi(this.ruleForm)
          this.$message.success('修改密码成功')
          this.ko()
          this.$store.dispatch('user/logout')
          this.$router.push('/login')
        }
      })
    },
    ko() {
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        .username {
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 50%;
          background: #04c9be;
          color: #fff;
          margin-right: 4px;
        }
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .name {
          // ⽤户名称距离右侧距离
          margin-right: 10px;
          margin-left: 5px;
          font-size: 16px;
        }
        .el-icon-setting {
          font-size: 20px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
