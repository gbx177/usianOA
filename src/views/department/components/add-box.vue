<template>
  <!-- .sync 不会正常工作 -->
  <el-dialog title="新增部门" :visible="showDialog" @close="close">
    <!-- 表单 -->
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="form.name"
          size="mini"
          placeholder="2-10个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="form.code"
          size="mini"
          placeholder="2-10个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <el-select
          v-model="form.managerId"
          placeholder="请选择负责人"
          size="mini"
        >
          <el-option
            v-for="item in arr"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="form.introduce"
          size="mini"
          type="textarea"
          placeholder="1-100个字符"
          :rows="4"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="mini" @click="add">确 定</el-button>
      <el-button size="mini" @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  getDepartmentListApi,
  getDepartmentUserListApi,
  getListApi
} from '@/api/department'
export default {
  name: 'AddBox',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      form: {
        name: '',
        code: '',
        managerId: '',
        introduce: '',
        pid: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '部门名称的长度为2-10个字符',
            trigger: 'blur'
          },
          {
            validator: async(rule, value, callback) => {
              const list = await getDepartmentListApi()
              if (list.some((item) => item.name === value)) {
                callback(new Error('部门中已经有该名称了'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '部⻔编码的⻓度为2-10个字符',
            trigger: 'blur'
          },
          {
            validator: async(rule, value, callback) => {
              const list = await getDepartmentListApi()
              if (list.some((item) => item.code === value)) {
                callback(new Error('部门中已经有该编码了'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        managerId: [
          { required: true, message: '部门负责人不能为空', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '部⻔介绍的⻓度为1-100个字符',
            trigger: 'blur'
          }
        ]
      },
      arr: []
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    close() {
      this.$refs.form.resetFields()
      this.$emit('update:showDialog', false)
    },
    async getUserList() {
      const res = await getDepartmentUserListApi()
      this.arr = res
    },
    add() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          this.form.pid = this.id
          await getListApi(this.form)
          this.close()
          this.$message({
            message: '新增部门成功',
            type: 'success'
          })
          this.$emit('a')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
