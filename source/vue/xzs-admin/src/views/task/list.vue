<template>
  <div class="app-container">
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="年级：">
        <el-select v-model="queryParam.gradeLevel" placeholder="年级" clearable>
          <el-option v-for="item in levelEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="Id" width="100" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="gradeLevel" label="学级" :formatter="levelFormatter" />
      <el-table-column prop="createUserName" label="发送人" width="100" />
      <el-table-column prop="createTime" label="创建时间" width="160px" />
      <el-table-column label="操作" align="center" width="160px">
        <template slot-scope="{row}">
          <el-button size="mini" @click="$router.push({ path: '/task/edit', query: { id: row.id } })">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteTask(row)" class="link-left">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParam.pageIndex" :limit.sync="queryParam.pageSize"
      @pagination="search" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import taskApi from '@/api/task'

export default {
  components: { Pagination },
  data() {
    return {
      queryParam: {
        gradeLevel: null,
        pageIndex: 1,
        pageSize: 10
      },
      listLoading: true,
      tableData: [],
      total: 0
    }
  },
  created() {
    this.search()
  },
  methods: {
    search() {
      this.listLoading = true
      taskApi.pageList(this.queryParam).then(data => {
        const re = data.response
        this.tableData = re.list
        this.total = re.total
        this.queryParam.pageIndex = re.pageNum
        this.listLoading = false
      })
    },
    submitForm() {
      this.queryParam.pageIndex = 1
      this.search()
    },
    deleteTask(row) {
      let _this = this
      taskApi.deleteTask(row.id).then(re => {
        if (re.code === 1) {
          _this.search()
          _this.$message.success(re.message)
        } else {
          _this.$message.error(re.message)
        }
      })
    },
    levelFormatter(row, column, cellValue, index) {
      return this.enumFormat(this.levelEnum, cellValue)
    }
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      levelEnum: state => state.user.levelEnum
    })
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgba(16, 24, 40, 0.08);
  padding: 32px 24px 24px 24px;
  min-height: 80vh;
}

.el-form {
  margin-bottom: 18px;
  display: flex;
  align-items: flex-end;
  gap: 16px;
}

.el-table {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 4px 0 rgba(16, 24, 40, 0.06);
  font-size: 15px;
}

.el-table__header th {
  background: #f1f5f9;
  color: #334155;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
}

.el-table__row {
  transition: background 0.2s;
}

.el-table__row:hover {
  background: #e0e7ff;
}

.el-tag {
  border-radius: 6px !important;
  font-size: 13px !important;
  padding: 0 10px !important;
}

.el-button.link-left {
  margin-left: 6px;
}
</style>