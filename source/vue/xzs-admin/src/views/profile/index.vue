<template>
  <div class="app-container">
    <div>
      <user-card :userInfo="userInfo" />
      <el-card style="margin-top: 20px;">
        <el-tabs active-name="timeline">
          <el-tab-pane label="时间线" name="timeline">
            <timeline :userInfo="userInfo" />
          </el-tab-pane>
          <el-tab-pane label="账号" name="account">
            <account :userInfo="userInfo" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import UserCard from './components/UserCard'
import Timeline from './components/Timeline'
import Account from './components/Account'
import userApi from '@/api/user'

export default {
  name: 'Profile',
  data() {
    return {
      userInfo: {
        realName: '',
        phone: '',
        lastActiveTime: '',
        createTime: '',
        role: '1',
        imagePath: null
      }
    }
  },
  components: { UserCard, Timeline, Account },
  created() {
    let _this = this
    userApi.getCurrentUser().then(re => {
      _this.userInfo = re.response
    })
  }
}
</script>
