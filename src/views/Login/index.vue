<template>
  <div
    class="login-container"
    :class="{
      'login-container-mobile': $store.getters.screenInfo.isMobile
    }"
  >
    <div class="main">
      <p class="title">{{ $t('Login.index.808362-0') }}</p>
      <el-form
        ref="loginFromRef"
        class="login-form"
        :model="loginForm"
        :rules="rules"
      >
        <el-form-item :label="$t('Login.index.017834-0')">
          <el-select v-model="loginForm.username">
            <el-option value="admin" label="admin"></el-option>
            <el-option value="admin-look" label="admin-look"></el-option>
            <el-option value="maofu" label="maofu"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :placeholder="$t('Login.index.808362-1')"
            v-model.trim="loginForm.username"
          >
            <template #prefix>
              <SvgIcon icon="my-user"></SvgIcon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :placeholder="$t('Login.index.808362-2')"
            v-model.trim="loginForm.password"
            :type="isHidePwd ? 'password' : null"
            @keyup.enter="handleLogin"
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
      <el-button
        :loading="isLoading"
        class="btn-login"
        type="primary"
        @click="handleLogin"
      >
        {{ $t('Login.index.808362-3') }}
      </el-button>
      <div class="footer">
        <router-link to="/register" class="go-register">{{
          $t('Login.index.808362-4')
        }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { pwdValidator } from '@/validator'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import i18n from '@/i18n'
// 状态管理
const store = useStore()
// 表单
const loginForm = ref({
  username: 'admin',
  password: '000000'
})
// 表单验证规则
const rules = ref({
  username: [
    { required: true, message: i18n.$t('Login.index.808362-1'), trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: pwdValidator
    }
  ]
})
const isHidePwd = ref(true)
const loginFromRef = ref(null)
const isLoading = ref(false)
const router = useRouter()
const route = useRoute()
// 处理登录
function handleLogin() {
  // 参数校验
  if (loginFromRef.value) {
    loginFromRef.value.validateField().then(() => {
      // 动画
      isLoading.value = true
      // 发请求
      store
        .dispatch('user/login', loginForm)
        .then(() => {
          // 如果有重定向参数redirect，将进行重定向
          router.push({
            path: route.query.redirect ? route.query.redirect : '/'
          })
          ElMessage.success({ message: i18n.$t('Login.index.808362-5') })
        })
        .finally(() => {
          isLoading.value = false
        })
    })
  }
}
</script>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  background: url(@/assets/img/Computer\ display_Flatline.png);
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;

  .main {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s;
    width: 30vw;
    padding: 20px;
    border-radius: 20px;
    background: rgba(250, 252, 254, 0.767);
    border: 1px solid rgba(255, 255, 255, 0);
    &:hover {
      box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
      border: 1px solid white;
      transform: scale(0.98);
    }

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
      margin-top: 20px;
    }
    .footer {
      padding: 20px 0;
      .go-register {
        font-size: small;
        color: rgb(20, 161, 217);
        text-decoration: none;
      }
    }
  }

  :deep(.el-input__wrapper) {
    background-color: #a5b0e414;
  }
}

.login-container-mobile {
  .main {
    width: 90vw;
  }
}
</style>
