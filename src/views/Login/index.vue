<template>
  <div class="container">
    <div class="main">
      <p class="title">欢迎登录</p>
      <el-form class="login-form" :model="loginForm" :rules="rules">
        <el-form-item prop="userName">
          <el-input
            placeholder="请输入用户名"
            v-model.trim="loginForm.userName"
          >
            <template #prefix>
              <SvgIcon icon="my-user"></SvgIcon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="passWard">
          <el-input
            placeholder="请输入密码"
            v-model.trim="loginForm.passWard"
            :type="isHidePwd ? 'password' : null"
          >
            <template #prefix>
              <SvgIcon icon="my-password"></SvgIcon>
            </template>
            <template #suffix>
              <SvgIcon
                :icon="isHidePwd ? 'my-eyeClose' : 'my-eye'"
                @click="isHidePwd = !isHidePwd"
              ></SvgIcon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button class="btn-login" type="primary"> 登录 </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { pwdValidator } from './rules'
// 表单
const loginForm = ref({
  userName: '',
  passWard: ''
})
// 表单验证规则
const rules = ref({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  passWard: [
    {
      required: true,
      trigger: 'blur',
      validator: pwdValidator
    }
  ]
})
const isHidePwd = ref(true)
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  background: url(@/assets/img/登录背景图.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  .main {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0);
    &:hover {
      box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
      border: 1px solid white;
      transform: scale(0.98);
    }

    width: 30vw;
    height: 50vh;
    padding: 20px;
    border-radius: 20px;
    background: rgba(250, 252, 254, 0.767);
    .title {
      margin-bottom: 20px;
      text-align: center;
      font-size: larger;
    }

    .login-form {
      :deep(.el-form-item__content) {
      }
    }

    :deep(.el-button) {
    }
  }

  :deep(.el-input__wrapper) {
    background-color: #a5b0e414;
  }
}
</style>
