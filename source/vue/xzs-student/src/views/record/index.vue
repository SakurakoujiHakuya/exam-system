<template>
  <div class="modern-record-page">
    <div class="modern-column-layout">
      <el-card class="modern-info-card" shadow="hover">
        <div class="modern-info-header">
          <el-avatar icon="el-icon-user" size="large" class="modern-info-avatar" />
          <div class="modern-info-title">答题统计</div>
        </div>
        <el-divider></el-divider>
        <div class="modern-info-list">
          <div class="modern-info-item">
            <span class="modern-info-label">系统判分</span>
            <span class="modern-info-value">{{ selectItem.systemScore }}</span>
          </div>
          <div class="modern-info-item">
            <span class="modern-info-label">最终得分</span>
            <span class="modern-info-value highlight">{{ selectItem.userScore }}</span>
          </div>
          <div class="modern-info-item">
            <span class="modern-info-label">试卷总分</span>
            <span class="modern-info-value">{{ selectItem.paperScore }}</span>
          </div>
          <div class="modern-info-item">
            <span class="modern-info-label">正确题数</span>
            <span class="modern-info-value">{{ selectItem.questionCorrect }}</span>
          </div>
          <div class="modern-info-item">
            <span class="modern-info-label">总题数</span>
            <span class="modern-info-value">{{ selectItem.questionCount }}</span>
          </div>
          <div class="modern-info-item">
            <span class="modern-info-label">用时</span>
            <span class="modern-info-value">{{ selectItem.doTime }}</span>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="modern-table-card">
        <div class="modern-table-title">
          <el-avatar icon="el-icon-document" size="medium" class="modern-avatar" />
          <span>我的答题记录</span>
        </div>
        <el-divider></el-divider>
        <el-table v-loading="listLoading" :data="tableData" fit highlight-current-row border stripe
          class="modern-table" @row-click="itemSelect">
          <el-table-column prop="id" label="序号" width="80" align="center" />
          <el-table-column prop="paperName" label="名称" min-width="120" />
          <el-table-column prop="subjectName" label="学科" width="80" align="center" />
          <el-table-column label="状态" prop="status" width="110" align="center">
            <template slot-scope="{row}">
              <el-tag :type="statusTagFormatter(row.status)" effect="plain">
                {{ statusTextFormatter(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="做题时间" width="170" align="center" />
          <el-table-column align="center" width="100">
            <template slot-scope="{row}">
              <router-link target="_blank" :to="{ path: '/edit', query: { id: row.id } }" v-if="row.status === 1">
                <el-button type="primary" size="mini" round>批改</el-button>
              </router-link>
              <router-link target="_blank" :to="{ path: '/read', query: { id: row.id } }" v-if="row.status === 2">
                <el-button type="success" size="mini" round>查看试卷</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :background="true" :page.sync="queryParam.pageIndex"
          :limit.sync="queryParam.pageSize" @pagination="search" style="margin-top: 24px" />
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import examPaperAnswerApi from '@/api/examPaperAnswer'
import { scrollTo } from '@/utils/scroll-to'
export default {
  components: { Pagination },
  data() {
    return {
      queryParam: {
        pageIndex: 1,
        pageSize: 10
      },
      listLoading: false,
      tableData: [],
      total: 0,
      selectItem: {
        systemScore: '0',
        userScore: '0',
        doTime: '0',
        paperScore: '0',
        questionCorrect: 0,
        questionCount: 0
      }
    }
  },
  created() {
    this.search()
    scrollTo(0, 800)
  },
  methods: {
    search() {
      this.listLoading = true
      let _this = this
      examPaperAnswerApi.pageList(this.queryParam).then(data => {
        const re = data.response
        _this.tableData = re.list
        _this.total = re.total
        _this.queryParam.pageIndex = re.pageNum
        _this.listLoading = false
      })
    },
    itemSelect(row, column, event) {
      this.selectItem = row
    },
    statusTagFormatter(status) {
      return this.enumFormat(this.statusTag, status)
    },
    statusTextFormatter(status) {
      return this.enumFormat(this.statusEnum, status)
    }
  },
  computed: {
    ...mapGetters('enumItem', [
      'enumFormat'
    ]),
    ...mapState('enumItem', {
      statusEnum: state => state.exam.examPaperAnswer.statusEnum,
      statusTag: state => state.exam.examPaperAnswer.statusTag
    })
  }
}
</script>

<style lang="scss" scoped>
// 纵向排列容器
.modern-record-page {
  min-height: 100vh;
  background: #f6f8fa;
  padding: 32px 0 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modern-column-layout {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.modern-table-card {
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.07);
  padding: 0 0 24px 0;
  background: #fff;
  min-height: 420px;
}

.modern-table-title {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: #222;
  padding: 18px 0 0 0;
}

.modern-avatar {
  margin-right: 12px;
  background: linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%);
  color: #fff;
}

.modern-table {
  border-radius: 12px;
  overflow: hidden;
  font-size: 15px;
}

.modern-table ::v-deep .el-table__header th {
  background: #f0f4f8;
  font-weight: bold;
  color: #333;
}

.modern-table ::v-deep .el-table__row:hover {
  background: #e6f7ff;
}

.modern-info-card {
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.09);
  background: #fff;
  padding-bottom: 18px;
  min-height: 180px;
}

.modern-info-header {
  display: flex;
  align-items: center;
  padding: 18px 0 0 0;
}

.modern-info-avatar {
  margin-right: 14px;
  background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%);
  color: #fff;
}

.modern-info-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
}

.modern-info-list {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modern-info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px dashed #f0f0f0;
  font-size: 15px;
}

.modern-info-item:last-child {
  border-bottom: none;
}

.modern-info-label {
  color: #888;
}

.modern-info-value {
  font-weight: 600;
  color: #222;
  font-size: 1.1em;
}

.modern-info-value.highlight {
  color: #ff6f00;
  font-size: 1.3em;
}

@media (max-width: 991px) {
  .modern-column-layout {
    max-width: 100vw;
    padding: 0 6px;
    gap: 16px;
  }
  .modern-table-card,
  .modern-info-card {
    min-width: 0;
    width: 100%;
  }
}
</style>
