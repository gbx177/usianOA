<template>
  <div class="container">
    <div class="app-container">
      <el-tree
        :data="data"
        :props="defaultProps"
        :default-expand-all="true"
        :expand-on-click-node="false"
      >
        <template v-slot="{ data }">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            style="width: 100%; height: 40px"
          >
            <el-col>{{ data.name }}</el-col>
            <el-col style="text-align: right" :span="4">
              <span class="span">{{ data.managerName }}</span>
              <!-- 下拉框 -->
              <el-dropdown
                trigger="click"
                @command="handleCommand($event, data.id)"
              >
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="remove">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <AddBox :id="id" ref="box" :show-dialog.sync="showDialog" @a="getList" />
  </div>
</template>
<script>
import { getDepartmentListApi, getDeleteListApi } from '@/api/department'
import { transListToTreeData } from '@/utils'
import AddBox from './components/add-box.vue'
export default {
  name: 'Department',
  components: {
    AddBox
  },

  data() {
    return {
      data: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      showDialog: false,
      id: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleCommand(e, id) {
      switch (e) {
        case 'add':
          this.showDialog = true
          this.id = id
          break
        case 'edit':
          this.showDialog = true
          this.id = id
          this.$nextTick(() => {
            this.$refs.box.getDetails()
          })
          break
        case 'remove':
          this.$confirm('您确定要删除该部门吗', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
            .then(async() => {
              await getDeleteListApi(id)
              this.getList()
              this.$message({
                type: 'success',
                message: '删除部门成功'
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          break
      }
    },
    async getList() {
      const res = await getDepartmentListApi()
      this.data = transListToTreeData(res, 0)
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
.span {
  min-width: 50px;
  margin: 10px;
}
</style>
