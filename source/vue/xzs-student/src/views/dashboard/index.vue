<template>
  <div style="margin-top: 10px">
    <el-row class="app-item-contain">
      <h3 class="index-title-h3" style="border-left: solid 10px #3651d4;">任务中心</h3>
      <div style="padding-left: 15px">
        <el-table :data="flatTaskList" v-loading="taskLoading" class="task-table" stripe>
          <el-table-column prop="taskTitle" label="任务标题" min-width="180" />
          <el-table-column prop="examPaperName" label="试卷名称" min-width="200" />
          <el-table-column prop="status" label="状态" width="120" align="center">
            <template slot-scope="{row}">
              <el-tag :type="statusTagFormatter(row.status)" v-if="row.status !== null" size="small" effect="plain">
                {{ statusTextFormatter(row.status) }}
              </el-tag>
              <el-tag v-else size="small" effect="plain" type="info">
                未开始
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="{row}">
              <router-link target="_blank" :to="{ path: '/do', query: { id: row.examPaperId } }"
                v-if="row.status === null">
                <el-button type="primary" size="mini" round>开始答题</el-button>
              </router-link>
              <router-link target="_blank" :to="{ path: '/edit', query: { id: row.examPaperAnswerId } }"
                v-else-if="row.status === 1">
                <el-button type="warning" size="mini" round>批改试卷</el-button>
              </router-link>
              <router-link target="_blank" :to="{ path: '/read', query: { id: row.examPaperAnswerId } }"
                v-else-if="row.status === 2">
                <el-button type="success" size="mini" round>查看试卷</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <el-row class="app-item-contain">
      <h3 class="index-title-h3">固定试卷</h3>
      <div style="padding-left: 15px">
        <el-col :span="4" v-for="(item, index) in fixedPaper" :key="index" :offset="index > 0 ? 1 : 0">
          <el-card :body-style="{ padding: '0px' }" v-loading="loading">
            <img src="@/assets/exam-paper/show1.png" class="image">
            <div style="padding: 14px;">
              <span>{{ item.name }}</span>
              <div class="bottom clearfix">
                <router-link target="_blank" :to="{ path: '/do', query: { id: item.id } }">
                  <el-button type="text" class="button">开始做题</el-button>
                </router-link>
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>
    <el-row class="app-item-contain">
      <h3 class="index-title-h3" style="border-left: solid 10px rgb(220, 208, 65);">时段试卷</h3>
      <div style="padding-left: 15px">
        <el-col :span="4" v-for="(item, index) in timeLimitPaper" :key="index" :offset="index > 0 ? 1 : 0">
          <el-card :body-style="{ padding: '0px' }" v-loading="loading">
            <img src="@/assets/exam-paper/show2.png" class="image">
            <div style="padding: 14px;">
              <span>{{ item.name }}</span>
              <p class="index-limit-paper-time">
                <span>{{ item.startTime }}</span>
                <br />
                <span>{{ item.endTime }}</span>
              </p>
              <div class="bottom clearfix">
                <router-link target="_blank" :to="{ path: '/do', query: { id: item.id } }">
                  <el-button type="text" class="button">开始做题</el-button>
                </router-link>
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import indexApi from '@/api/dashboard'
export default {
  data() {
    return {
      fixedPaper: [],
      timeLimitPaper: [],
      pushPaper: [],
      loading: false,
      taskLoading: false,
      taskList: []
    }
  },
  created() {
    let _this = this
    this.loading = true
    indexApi.index().then(re => {
      _this.fixedPaper = re.response.fixedPaper
      _this.timeLimitPaper = re.response.timeLimitPaper
      _this.pushPaper = re.response.pushPaper
      _this.loading = false
    })

    this.taskLoading = true
    indexApi.task().then(re => {
      _this.taskList = re.response
      _this.taskLoading = false
    })
  },
  methods: {
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
    }),
    flatTaskList() {
      const flatList = []
      this.taskList.forEach(task => {
        if (task.paperItems) {
          task.paperItems.forEach(paper => {
            flatList.push({
              taskTitle: task.title,
              ...paper
            })
          })
        }
      })
      return flatList
    }
  }
}
</script>

<style lang="scss" scoped>
.index-title-h3 {
  font-size: 22px;
  font-weight: 400;
  color: #1f2f3d;
  border-left: solid 10px #2ce8b4;
  padding-left: 10px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 50%;
  height: 80%;
  display: block;
  margin: 20px auto 10px auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.task-table {
  border-radius: 12px;
  overflow: hidden;
  font-size: 14px;
}

.task-table ::v-deep .el-table__header th {
  background: #f5f7fa;
  font-weight: bold;
  color: #333;
}

.task-table ::v-deep .el-table__row:hover {
  background: #eef8ff;
}
</style>
