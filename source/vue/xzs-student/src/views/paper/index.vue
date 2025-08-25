<template>
  <div class="paper-container">
    <el-card class="paper-card" shadow="never">
      <el-tabs v-model="tabId" @tab-click="subjectChange" class="paper-tabs">
        <el-tab-pane :label="item.name" :key="item.id" :name="item.id" v-for="item in subjectList">
          <div class="filter-bar">
            <el-radio-group v-model="queryParam.paperType" size="small" @change="paperTypeChange">
              <el-radio-button v-for="item in paperTypeEnum" :key="item.key"
                :label="item.key">{{ item.value }}</el-radio-button>
            </el-radio-group>
          </div>
          <el-table v-loading="listLoading" :data="tableData" fit highlight-current-row class="paper-table" stripe>
            <el-table-column prop="id" label="序号" width="90" align="center" />
            <el-table-column prop="name" label="试卷名称" min-width="200" />
            <el-table-column prop="questionCount" label="题目数" width="100" align="center" />
            <el-table-column prop="score" label="总分" width="100" align="center" />
            <el-table-column prop="createTime" label="创建时间" width="180" align="center" />
            <el-table-column label="操作" width="120" align="center">
              <template slot-scope="{row}">
                <router-link target="_blank" :to="{ path: '/do', query: { id: row.id } }">
                  <el-button type="primary" size="mini" round>开始答题</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total > 0" :total="total" :page.sync="queryParam.pageIndex"
            :limit.sync="queryParam.pageSize" @pagination="search" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import examPaperApi from '@/api/examPaper'
import subjectApi from '@/api/subject'

export default {
  components: { Pagination },
  data() {
    return {
      queryParam: {
        paperType: 1,
        subjectId: 0,
        pageIndex: 1,
        pageSize: 10
      },
      tabId: '',
      listLoading: true,
      subjectList: [],
      tableData: [],
      total: 0
    }
  },
  created() {
    this.initSubject()
  },
  methods: {
    initSubject() {
      let _this = this
      subjectApi.list().then(re => {
        _this.subjectList = re.response
        let subjectId = _this.subjectList[0].id
        _this.queryParam.subjectId = subjectId
        _this.tabId = subjectId.toString()
        _this.search()
      })
    },
    search() {
      this.listLoading = true
      examPaperApi.pageList(this.queryParam).then(data => {
        const re = data.response
        this.tableData = re.list
        this.total = re.total
        this.queryParam.pageIndex = re.pageNum
        this.listLoading = false
      })
    },
    paperTypeChange(val) {
      this.search()
    },
    subjectChange(tab, event) {
      this.queryParam.subjectId = Number(this.tabId)
      this.search()
    }
  },
  computed: {
    ...mapState('enumItem', {
      paperTypeEnum: state => state.exam.examPaper.paperTypeEnum
    })
  }
}
</script>
