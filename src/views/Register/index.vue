<template>
  <div
    class="register-container"
    :class="{
      'register-container-mobile': $store.getters.screenInfo.isMobile
    }"
  >
    <div class="main">
      <p class="title">{{ $t('Register.index.808361-0') }}</p>
      <el-form
        ref="registerFromRef"
        class="register-form"
        :model="registerForm"
        :rules="rules"
      >
        <el-form-item prop="username">
          <el-input
            :placeholder="$t('Register.index.808361-1')"
            v-model.trim="registerForm.username"
          >
            <template #prefix>
              <SvgIcon icon="my-user"></SvgIcon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :placeholder="$t('Register.index.808361-2')"
            v-model.trim="registerForm.password"
            :type="isHidePwd ? 'password' : null"
            @keyup.enter="handleregister"
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
        class="btn-register"
        type="primary"
        @click="handleregister"
      >
        {{ $t('Register.index.808361-3') }}
      </el-button>
      <div class="footer">
        <router-link class="go-register" to="/login">{{
          $t('Register.index.808361-4')
        }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { pwdValidator } from '@/validator'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { register } from '@/api/sys'
import i18n from '@/i18n'
// 表单
const registerForm = ref({
  username: '',
  password: ''
})
// 表单验证规则
const rules = ref({
  username: [
    {
      required: true,
      message: i18n.$t('Register.index.808361-1'),
      trigger: 'blur'
    }
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
const registerFromRef = ref(null)
const isLoading = ref(false)
const router = useRouter()
// 处理注册
function handleregister() {
  // 参数校验
  if (registerFromRef.value) {
    registerFromRef.value.validateField().then(() => {
      // 动画
      isLoading.value = true
      // 发请求
      register(registerForm)
        .then(() => {
          ElMessage.success({ message: i18n.$t('Register.index.808361-5') })
          router.push('/login')
        })
        .finally(() => {
          isLoading.value = false
        })
    })
  }
}
</script>

<style scoped lang="scss">
.register-container {
  height: 100vh;
  background: url(@/assets/img/Computer\ display_Outline.png);
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
    border: 1px solid rgba(255, 255, 255, 0);

    width: 30vw;
    padding: 20px;
    border-radius: 20px;
    background: rgba(250, 252, 254, 0.767);
    transform: translate(0, -30%) scale(1);

    &:hover {
      box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
      border: 1px solid white;
      transform: translate(0, -25%) scale(0.98);
    }

    .title {
      margin-bottom: 20px;
      text-align: center;
      font-size: larger;
    }

    .register-form {
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

.register-container-mobile {
  .main {
    width: 90vw;
  }
}
</style>
