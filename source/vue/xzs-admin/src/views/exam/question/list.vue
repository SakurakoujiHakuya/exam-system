<template>
  <div class="app-container">
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="题目ID：">
        <el-input v-model="queryParam.id" clearable></el-input>
      </el-form-item>
      <el-form-item label="题目内容：">
        <el-input v-model="queryParam.content" clearable></el-input>
      </el-form-item>

      <el-form-item label="年级：">
        <el-select v-model="queryParam.level" placeholder="年级" @change="levelChange" clearable>
          <el-option v-for="item in levelEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学科：">
        <el-select v-model="queryParam.subjectId" clearable>
          <el-option v-for="item in subjectFilter" :key="item.id" :value="item.id"
            :label="item.name + ' ( ' + item.levelName + ' )'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题型：">
        <el-select v-model="queryParam.questionType" clearable>
          <el-option v-for="item in questionType" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
        <el-popover placement="bottom" trigger="click">
          <el-button type="warning" size="mini" v-for="item in editUrlEnum" :key="item.key"
            @click="$router.push({ path: item.value })">{{ item.name }}
          </el-button>
          <el-button slot="reference" type="primary" class="link-left">添加</el-button>
        </el-popover>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="Id" width="90px" />
      <el-table-column prop="subjectId" label="学科" :formatter="subjectFormatter" width="120px" />
      <el-table-column prop="questionType" label="题型" :formatter="questionTypeFormatter" width="70px" />
      <el-table-column prop="shortTitle" label="题干" show-overflow-tooltip />
      <el-table-column prop="score" label="分数" width="60px" />
      <el-table-column prop="difficult" label="难度" width="60px" />
      <el-table-column prop="createTime" label="创建时间" width="160px" />
      <el-table-column label="操作" align="center" width="220px">
        <template slot-scope="{row}">
          <el-button size="mini" @click="showQuestion(row)">预览</el-button>
          <el-button size="mini" @click="editQuestion(row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteQuestion(row)" class="link-left">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParam.pageIndex" :limit.sync="queryParam.pageSize"
      @pagination="search" />
    <el-dialog :visible.sync="questionShow.dialog" style="width: 100%;height: 100%">
      <QuestionShow :qType="questionShow.qType" :question="questionShow.question" :qLoading="questionShow.loading" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination'
import QuestionShow from './components/Show'
import questionApi from '@/api/question'

export default {
  components: { Pagination, QuestionShow },
  data() {
    return {
      queryParam: {
        id: null,
        questionType: null,
        level: null,
        subjectId: null,
        pageIndex: 1,
        pageSize: 10
      },
      subjectFilter: null,
      listLoading: true,
      tableData: [],
      total: 0,
      questionShow: {
        qType: 0,
        dialog: false,
        question: null,
        loading: false
      }
    }
  },
  created() {
    this.initSubject()
    this.search()
  },
  methods: {
    submitForm() {
      this.queryParam.pageIndex = 1
      this.search()
    },
    search() {
      this.listLoading = true
      questionApi.pageList(this.queryParam).then(data => {
        const re = data.response
        this.tableData = re.list
        this.total = re.total
        this.queryParam.pageIndex = re.pageNum
        this.listLoading = false
      })
    },
    levelChange() {
      this.queryParam.subjectId = null
      this.subjectFilter = this.subjects.filter(data => data.level === this.queryParam.level)
    },
    addQuestion() {
      this.$router.push('/exam/question/edit/singleChoice')
    },
    showQuestion(row) {
      let _this = this
      this.questionShow.dialog = true
      this.questionShow.loading = true
      questionApi.select(row.id).then(re => {
        _this.questionShow.qType = re.response.questionType
        _this.questionShow.question = re.response
        _this.questionShow.loading = false
      })
    },
    editQuestion(row) {
      let url = this.enumFormat(this.editUrlEnum, row.questionType)
      this.$router.push({ path: url, query: { id: row.id } })
    },
    deleteQuestion(row) {
      let _this = this
      questionApi.deleteQuestion(row.id).then(re => {
        if (re.code === 1) {
          _this.search()
          _this.$message.success(re.message)
        } else {
          _this.$message.error(re.message)
        }
      })
    },
    questionTypeFormatter(row, column, cellValue, index) {
      return this.enumFormat(this.questionType, cellValue)
    },
    subjectFormatter(row, column, cellValue, index) {
      return this.subjectEnumFormat(cellValue)
    },
    ...mapActions('exam', { initSubject: 'initSubject' })
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      questionType: state => state.exam.question.typeEnum,
      editUrlEnum: state => state.exam.question.editUrlEnum,
      levelEnum: state => state.user.levelEnum
    }),
    ...mapGetters('exam', ['subjectEnumFormat']),
    ...mapState('exam', { subjects: state => state.subjects })
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