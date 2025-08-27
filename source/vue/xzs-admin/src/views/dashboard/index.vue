<template>
  <div class="dashboard-container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="exam" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              试卷总数
            </div>
            <count-to :start-val="0" :end-val="examPaperCount" :duration="2600" class="card-panel-num"
              v-loading="loading" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="question" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              题目总数
            </div>
            <count-to :start-val="0" :end-val="questionCount" :duration="3000" class="card-panel-num"
              v-loading="loading" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="doexampaper" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              答卷总数
            </div>
            <count-to :start-val="0" :end-val="doExamPaperCount" :duration="3600" class="card-panel-num"
              v-loading="loading" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="doquestion" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              答题总数
            </div>
            <count-to :start-val="0" :end-val="doQuestionCount" :duration="3200" class="card-panel-num"
              v-loading="loading" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="student-show">
      <h3 class="student-show-title">优秀学员展示</h3>
      <el-carousel :interval="5000" arrow="always" height="220px">
        <el-carousel-item v-for="item in excellentStudents" :key="item.name">
          <div class="student-show-item">
            <img :src="item.avatar" class="student-avatar" />
            <div class="student-info">
              <p class="student-name">{{ item.name }}</p>
              <p class="student-description">{{ item.description }}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-row>
    <el-row class="echarts-line">
      <div id="echarts-moth-user" style="width: 100%;height:400px;" v-loading="loading" />
    </el-row>
  </div>
</template>

<script>
import resize from './components/mixins/resize'
import CountTo from 'vue-count-to'
import dashboardApi from '@/api/dashboard'
export default {
  mixins: [resize],
  components: {
    CountTo
  },
  data() {
    return {
      examPaperCount: 0,
      questionCount: 0,
      doExamPaperCount: 0,
      doQuestionCount: 0,
      echartsUserAction: null,
      loading: false,
      excellentStudents: [
        { name: '张三', avatar: require('@/assets/avatar.gif'), description: '勤奋刻苦，成绩优异，多次获得奖学金。' },
        { name: '李四', avatar: require('@/assets/avatar.gif'), description: '积极参加各类竞赛，并取得优异成绩。' },
        { name: '王五', avatar: require('@/assets/avatar.gif'), description: '乐于助人，团结同学，是老师的得力助手。' },
        { name: '赵六', avatar: require('@/assets/avatar.gif'), description: '不断挑战自我，超越自我，实现自己的梦想。' }
      ]
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.echartsUserAction = echarts.init(document.getElementById('echarts-moth-user'), 'macarons')
    let _this = this
    this.loading = true
    dashboardApi.index().then(re => {
      let response = re.response
      _this.examPaperCount = response.examPaperCount
      _this.questionCount = response.questionCount
      _this.doExamPaperCount = response.doExamPaperCount
      _this.doQuestionCount = response.doQuestionCount
      _this.echartsUserAction.setOption(this.option('用户活跃度', '{b}日{c}度', response.mothDayText, response.mothDayUserActionValue))
      this.loading = false
    })
  },
  methods: {
    option(title, formatter, label, vaule) {
      return {
        title: {
          text: title,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: formatter
        },
        xAxis: {
          type: 'category',
          data: label
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: vaule,
          type: 'line'
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
        user-select: none;
        outline: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }

      .card-panel-text:focus {
        outline: none !important;
        box-shadow: none !important;
      }

      .card-panel-num {
        font-size: 20px;
        user-select: none;
        outline: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }

      .card-panel-num:focus {
        outline: none !important;
        box-shadow: none !important;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}

.echarts-line {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}

.student-show {
  background: #fff;
  padding: 16px;
  margin-bottom: 32px;
  border-radius: 6px;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
}

.student-show-title {
  font-size: 18px;
  color: #333;
  margin: 0 0 20px 10px;
  font-weight: bold;
}

.student-show-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  text-align: center;
}

.student-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 15px;
}

.student-info {
  color: #666;
}

.student-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.student-description {
  font-size: 14px;
  line-height: 1.5;
  padding: 0 20px;
}

.el-carousel__item {
  background-color: #f7f9fc;
  border-radius: 8px;
}
</style>
