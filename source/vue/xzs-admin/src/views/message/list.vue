<template>
  <div class="app-container">
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="发送者用户名：">
        <el-input v-model="queryParam.sendUserName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="Id" width="100" />
      <el-table-column prop="title" label="标题" show-overflow-tooltip />
      <el-table-column prop="content" label="内容" show-overflow-tooltip />
      <el-table-column prop="sendUserName" label="发送人" width="100" />
      <el-table-column prop="receives" label="接收人" show-overflow-tooltip />
      <el-table-column prop="readCount" label="已读数" width="70" />
      <el-table-column prop="receiveUserCount" label="接收人数" width="100" />
      <el-table-column prop="createTime" label="创建时间" width="160px" />
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParam.pageIndex" :limit.sync="queryParam.pageSize"
      @pagination="search" />
  </div>
</template>

<script>

import Pagination from '@/components/Pagination'
import messageApi from '@/api/message'

export default {
  components: { Pagination },
  data() {
    return {
      queryParam: {
        sendUserName: null,
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
      messageApi.pageList(this.queryParam).then(data => {
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
    }
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