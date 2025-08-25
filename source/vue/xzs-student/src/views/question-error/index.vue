<template>
  <div class="question-error-container">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="card-header">
        <span>我的错题本</span>
      </div>
      <el-row :gutter="30">
        <el-col :span="14">
          <el-table v-loading="listLoading" :data="tableData" fit highlight-current-row class="question-table"
            @row-click="itemSelect" stripe>
            <el-table-column prop="shortTitle" label="题干" show-overflow-tooltip min-width="200" />
            <el-table-column prop="questionType" label="题型" width="100" align="center">
              <template slot-scope="{ row }">
                <el-tag size="small">{{ questionTypeFormatter(row, null, row.questionType) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="subjectName" label="学科" width="100" align="center" />
            <el-table-column prop="createTime" label="做题时间" width="180" align="center" />
          </el-table>
          <pagination v-show="total > 0" :total="total" :background="true" :page.sync="queryParam.pageIndex"
            :limit.sync="queryParam.pageSize" @pagination="search" />
        </el-col>
        <el-col :span="10">
          <el-card class="question-detail-card" shadow="never">
            <div slot="header" class="card-header">
              <span>题目详情与解析</span>
            </div>
            <el-skeleton :rows="10" animated v-if="qAnswerLoading" />
            <QuestionAnswerShow v-else :qType="selectItem.questionType" :question="selectItem.questionItem"
              :answer="selectItem.answerItem" />
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import questionAnswerApi from '@/api/questionAnswer'
import QuestionAnswerShow from '../exam/components/QuestionAnswerShow'

export default {
  components: { Pagination, QuestionAnswerShow },
  data() {
    return {
      queryParam: {
        pageIndex: 1,
        pageSize: 10
      },
      listLoading: false,
      tableData: [],
      total: 0,
      qAnswerLoading: false,
      selectItem: {
        questionType: 0,
        questionItem: null,
        answerItem: null
      }
    }
  },
  created() {
    this.search()
  },
  methods: {
    search() {
      this.listLoading = true
      let _this = this
      questionAnswerApi.pageList(this.queryParam).then(data => {
        const re = data.response
        _this.tableData = re.list
        _this.total = re.total
        _this.queryParam.pageIndex = re.pageNum
        _this.listLoading = false
        if (re.list.length !== 0) {
          _this.qAnswerShow(re.list[0].id)
        }
      })
    },
    itemSelect(row, column, event) {
      this.qAnswerShow(row.id)
    },
    qAnswerShow(id) {
      let _this = this
      this.qAnswerLoading = true
      questionAnswerApi.select(id).then(re => {
        let response = re.response
        _this.selectItem.questionType = response.questionVM.questionType
        _this.selectItem.questionItem = response.questionVM
        _this.selectItem.answerItem = response.questionAnswerVM
        _this.qAnswerLoading = false
      })
    },
    questionTypeFormatter(row, column, cellValue, index) {
      return this.enumFormat(this.questionTypeEnum, cellValue)
    }
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      questionTypeEnum: state => state.exam.question.typeEnum
    })
  }
}
</script>

<style lang="scss" scoped>
.question-error-container {
  padding: 24px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 84px);
}

.box-card {
  border-radius: 12px;
  border: none;
}

.card-header {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.question-table {
  border-radius: 8px;
  overflow: hidden;

  &::v-deep .el-table__header th {
    background: #fafafa;
    font-weight: 600;
    color: #333;
  }

  &::v-deep .el-table__row:hover {
    background: #f5f7fa;
  }
}

.question-detail-card {
  border-radius: 12px;
  min-height: 500px;

  &::v-deep .el-card__header {
    border-bottom: 1px solid #ebeef5;
  }

  &::v-deep .el-card__body {
    padding: 20px;
  }
}
</style>
