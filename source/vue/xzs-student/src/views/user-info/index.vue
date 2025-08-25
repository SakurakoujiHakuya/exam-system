<template>
  <div class="app-contain user-info-container">
    <!-- 个人信息 -->
    <el-row type="flex" justify="center" class="profile-row">
      <el-col :xs="24" :sm="20" :md="16" :lg="12">
        <el-card class="user-profile-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div class="user-profile-content">
            <el-upload action="/api/student/upload/image" accept=".jpg,.png" :show-file-list="false"
              :on-success="uploadSuccess">
              <el-tooltip content="点击上传头像" placement="top">
                <el-avatar class="el-dropdown-avatar" :size="120"
                  :src="form.imagePath === null ? require('@/assets/avatar.png') : form.imagePath" />
              </el-tooltip>
            </el-upload>
            <h2 class="user-name">{{ form.userName }}</h2>
            <div class="user-details">
              <span>姓名：{{ form.realName }}</span>
              <el-divider direction="vertical" />
              <span>年级：{{ levelFormatter(form.userLevel) }}</span>
              <el-divider direction="vertical" />
              <span>注册时间：{{ form.createTime }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 用户动态和资料修改 -->
    <el-row type="flex" justify="center" class="activity-row">
      <el-col :xs="24" :sm="20" :md="16" :lg="12">
        <el-card class="user-activity-card" shadow="hover">
          <el-tabs active-name="event" type="card">
            <el-tab-pane label="用户动态" name="event">
              <div class="block">
                <el-timeline>
                  <el-timeline-item v-for="item in event" :key="item.id" :timestamp="item.createTime" placement="top">
                    <el-card>
                      <p>{{ item.content }}</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-tab-pane>
            <el-tab-pane label="个人资料修改" name="update">
              <el-form ref="form" :model="form" :rules="rules" label-width="100px" v-loading="formLoading">
                <el-form-item label="真实姓名：" prop="realName" required>
                  <el-input v-model="form.realName" />
                </el-form-item>
                <el-form-item label="年龄：">
                  <el-input v-model="form.age" />
                </el-form-item>
                <el-form-item label="性别：">
                  <el-select v-model="form.sex" placeholder="性别" clearable>
                    <el-option v-for="item in sexEnum" :key="item.key" :value="item.key" :label="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item label="出生日期：">
                  <el-date-picker v-model="form.birthDay" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" />
                </el-form-item>
                <el-form-item label="手机：">
                  <el-input v-model="form.phone" />
                </el-form-item>
                <el-form-item label="年级：" prop="userLevel" required>
                  <el-select v-model="form.userLevel" placeholder="年级">
                    <el-option v-for="item in levelEnum" :key="item.key" :value="item.key" :label="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm">更新</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userApi from '@/api/user'
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      event: [],
      form: {
        userName: '',
        realName: '',
        age: '',
        sex: '',
        birthDay: null,
        phone: null,
        userLevel: null,
        createTime: null,
        imagePath: null
      },
      formLoading: false,
      rules: {
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        userLevel: [
          { required: true, message: '请选择年级', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    let _this = this
    userApi.getUserEvent().then(re => {
      _this.event = re.response
    })
    userApi.getCurrentUser().then(re => {
      _this.form = re.response
    })
  },
  methods: {
    uploadSuccess(re, file) {
      if (re.code === 1) {
        window.location.reload()
      } else {
        this.$message.error(re.message)
      }
    },
    submitForm() {
      let _this = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formLoading = true
          userApi.update(this.form).then(data => {
            if (data.code === 1) {
              _this.$message.success(data.message)
            } else {
              _this.$message.error(data.message)
            }
            _this.formLoading = false
          }).catch(e => {
            _this.formLoading = false
          })
        } else {
          return false
        }
      })
    },
    levelFormatter(level) {
      return this.enumFormat(this.levelEnum, level)
    }
  },
  computed: {
    ...mapGetters('enumItem', [
      'enumFormat'
    ]),
    ...mapState('enumItem', {
      sexEnum: state => state.user.sexEnum,
      levelEnum: state => state.user.levelEnum
    })
  }
}
</script>

<style lang="scss" scoped>
.user-info-container {
  padding: 20px;
}

.profile-row {
  margin-bottom: 20px;
}

.user-profile-card {
  .clearfix span {
    font-weight: bold;
    font-size: 1.2em;
  }

  .user-profile-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .el-dropdown-avatar {
    cursor: pointer;
    border: 2px solid #ebeef5;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .user-name {
    font-size: 1.8em;
    font-weight: 600;
    margin: 0;
    color: #303133;
  }

  .user-details {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #606266;
    font-size: 1em;
  }
}

.user-activity-card {
  .el-timeline-item {
    padding-bottom: 10px;
  }

  .el-card {
    border-radius: 8px;
  }
}
</style>
