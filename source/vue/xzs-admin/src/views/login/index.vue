<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">考试管理系统</h3>
      </div>

      <el-form-item prop="userName">
        <div class="form-item-inner">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input ref="userName" v-model="loginForm.userName" placeholder="用户名" name="userName" type="text"
            tabindex="1" auto-complete="on" />
        </div>
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <div class="form-item-inner">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
              placeholder="密码" name="password" tabindex="2" auto-complete="on" @keyup.native="checkCapslock"
              @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </div>
        </el-form-item>
      </el-tooltip>

      <el-checkbox v-model="loginForm.remember" style="margin-bottom: 20px;margin-left: 5px;">记住密码</el-checkbox>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin">登录</el-button>

    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import loginApi from '@/api/login'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        userName: '',
        password: '',
        remember: false
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.userName === '') {
      this.$refs.userName.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        // eslint-disable-next-line no-mixed-operators
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      let _this = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          loginApi.login(this.loginForm).then(function (result) {
            if (result && result.code === 1) {
              _this.setUserName(_this.loginForm.userName)
              _this.$router.push({ path: '/' })
            } else {
              _this.loading = false
              _this.$message({
                message: result.message,
                type: 'error'
              })
            }
          }).catch(function (reason) {
            _this.loading = false
          })
        } else {
          return false
        }
      })
    },
    ...mapMutations('user', ['setUserName'])
  }
}
</script>


<style lang="scss" scoped>
// shadcn 风格登录页样式

.login-container {
  min-height: 100vh;
  width: 100vw;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
}


.login-form {
  background: #fff;
  border-radius: 32px;
  box-shadow: 0 12px 72px 0 rgba(16, 24, 40, 0.16);
  padding: 64px 64px 40px 64px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.title-container {
  margin-bottom: 10px;

  .title {
    font-size: 1.7rem;
    color: #0f172a;
    font-weight: 700;
    text-align: center;
    letter-spacing: 0.04em;
    margin-bottom: 0;
    user-select: none;
    pointer-events: none;
  }
}



.el-form-item {
  background: #f1f5f9;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  margin-bottom: 0;
  padding: 0;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: none;

  &:focus-within {
    border-color: #6366f1;
    box-shadow: 0 0 0 2px #6366f133;
  }
}

.form-item-inner {
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 4px;
}

.svg-container {
  color: #b6c1d6;
  width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  transition: color 0.2s;
}

.el-form-item:focus-within .svg-container {
  color: #6366f1;
}

.el-input {
  flex: 1;

  .el-input__inner,
  input {
    background: transparent;
    border: none;
    outline: none;
    font-size: 1.15rem;
    color: #0f172a;
    padding: 16px 0 16px 0;
    height: 48px;
    box-shadow: none;

    &::placeholder {
      color: #b6c1d6;
      opacity: 1;
    }
  }
}


.show-pwd {
  color: #b6c1d6;
  cursor: pointer;
  font-size: 20px;
  margin-left: 10px;
  user-select: none;
  transition: color 0.2s, transform 0.1s;

  &:hover {
    color: #6366f1;
    transform: scale(1.15);
  }
}


.el-checkbox {
  margin-bottom: 0;
  margin-top: 8px;
  display: flex;
  align-items: center;

  .el-checkbox__input {
    border-radius: 6px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    width: 18px;
    height: 18px;
    margin-right: 8px;
    transition: border-color 0.2s, background 0.2s;
  }

  .el-checkbox__input.is-checked {
    border-color: #6366f1;
    background: #6366f1;
  }

  .el-checkbox__label {
    color: #334155;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
}


.el-button {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(90deg, #6366f1 0%, #818cf8 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.15rem;
  border: none;
  box-shadow: 0 2px 8px 0 rgba(99, 102, 241, 0.08);
  transition: background 0.2s, box-shadow 0.2s, transform 0.08s;
  margin-bottom: 12px;
  letter-spacing: 0.04em;

  &:hover,
  &:focus {
    background: linear-gradient(90deg, #818cf8 0%, #6366f1 100%);
    box-shadow: 0 4px 16px 0 rgba(99, 102, 241, 0.16);
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
}

@media (max-width: 900px) {
  .login-form {
    padding: 20px 3vw 12px 3vw;
    max-width: 98vw;
    gap: 14px;
  }

  .title-container .title {
    font-size: 1.1rem;
  }

  .form-item-inner {
    padding: 0 2vw;
  }

  .el-input {

    .el-input__inner,
    input {
      font-size: 1rem;
      padding: 10px 0 10px 0;
      height: 36px;
    }
  }

  .el-button {
    height: 36px;
    font-size: 1rem;
  }

  .el-checkbox__label {
    font-size: 0.95rem;
  }

  .svg-container {
    width: 16px;
    margin-right: 3px;
  }

  .show-pwd {
    font-size: 14px;
    margin-left: 6px;
  }

  .el-checkbox__input {
    width: 14px;
    height: 14px;
    margin-right: 4px;
  }
}
</style>
