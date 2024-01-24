<template>
  <div class="container">
    <div class="app-container">
      <div class="top">
        <el-button
          size="mini"
          type="primary"
          @click="dialogFormVisible = true"
        >添加角色</el-button>
      </div>
      <!-- 表格 -->
      <div class="content">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column type="index" width="50" align="center" label="序号" />
          <el-table-column prop="name" label="角色" align="center" width="180" />
          <el-table-column prop="state" label="启用" align="center" width="180">
            <template v-slot="{ row }">
              {{ row.state | f }}
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述" align="center" />
          <el-table-column label="操作" align="center">
            <template>
              <el-button type="text" size="mini">分配权限</el-button>
              <el-button type="text" size="mini">编辑</el-button>
              <el-button type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <el-row>
        <el-col justify="center" type="flex" align="middle">
          <el-pagination
            :current-page="page"
            :page-size="pagesize"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </el-col>
      </el-row>
      <!-- 新增模态框 -->
      <el-dialog
        title="新增角色"
        :visible.sync="dialogFormVisible"
        width="40%"
        @close="close"
      >
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" size="mini" />
          </el-form-item>
          <el-form-item label="启用">
            <el-switch
              v-model="form.state"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input
              v-model="form.description"
              size="mini"
              type="textarea"
              :rows="4"
            />
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" size="mini" @click="add">确 定</el-button>
          <el-button size="mini" @click="close">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getRoleListApi, getAddListApi } from '@/api/role'
export default {
  name: 'Role',
  filters: {
    f(item) {
      switch (item) {
        case 1:
          return '已启用'
        case 0:
          return '未启用'
        default:
          return '无'
      }
    }
  },
  data() {
    return {
      tableData: [],
      page: 1,
      pagesize: 3,
      total: null,
      form: {
        name: '',
        description: '',
        state: 1
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '请输入角色描述',
            trigger: 'blur'
          }
        ]
      },
      dialogFormVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getRoleListApi({
        page: this.page,
        pagesize: this.pagesize
      })
      this.tableData = res.rows
      this.total = res.total
    },
    handleCurrentChange(e) {
      this.page = e
      this.getList()
    },
    close() {
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
      this.dialogFormVisible = false
    },
    add() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          await getAddListApi(this.form)
          this.close()
          this.$message({
            message: '新增角色成功',
            type: 'success'
          })
          this.getList()
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.top {
  padding: 10px;
}
.content {
  padding: 10px;
}
</style>
