<template>
  <div class="auth">
    <div
      v-loading="isLoadingApp"
      class="card"
      :style="{ width: isQrcodeLogin ? 'auto' : '400px' }"
    >
      <div class="logo">
        <img src="@/assets/img/logo.png">
      </div>
      <div class="app-name">
        {{ appInfo.appName }}
      </div>
      <template v-if="isQrcodeLogin">
        <div class="qrcode-login">
          <div class="qrcode-img">
            <img src="@/assets/img/auth/qrcode.png">
          </div>
          <div class="desc">
            请使用App或微信扫码登录
          </div>
        </div>
      </template>
      <template v-else>
        <div class="tabs">
          <div
            v-for="item in [LoginType.PASSWORD, LoginType.EMAIL, LoginType.PHONE, LoginType.REGISTER]"
            :key="item"
            class="item"
            :class="currentLoginType === item ? 'active' : ''"
            @click="currentLoginType = item"
          >
            {{ item }}
          </div>
        </div>
        <div
          v-if="currentLoginType === LoginType.PASSWORD"
          class="form"
        >
          <div class="item">
            <div class="label">
              用户名 / 手机号 / 邮箱
            </div>
            <el-input
              v-model="loginVo.email"
              type="text"
            />
          </div>
          <div class="item">
            <div class="label">
              密码
            </div>
            <el-input
              v-model="loginVo.password"
              type="password"
            />
          </div>
        </div>
        <div
          v-if="currentLoginType === LoginType.EMAIL"
          class="form"
        >
          <div class="item">
            <div
              class="label"
              :class="!AirValidator.isEmail(loginVo.email) ? 'error' : ''"
            >
              邮箱
            </div>
            <el-input
              v-model="loginVo.email"
              type="text"
            >
              <template #suffix>
                <el-button
                  text
                  type="primary"
                >
                  发送
                </el-button>
              </template>
            </el-input>
          </div>
          <div class="item">
            <div class="label">
              验证码
            </div>
            <el-input
              v-model="loginVo.code"
              type="text"
              maxlength="8"
            />
          </div>
        </div>
        <div
          v-if="currentLoginType === LoginType.PHONE"
          class="form"
        >
          <div class="item">
            <div
              class="label"
              :class="!AirValidator.isMobilePhone(loginVo.phone) ? 'error' : ''"
            >
              手机号
            </div>
            <el-input
              v-model="loginVo.phone"
              type="text"
            >
              <template #suffix>
                <el-button
                  text
                  type="primary"
                >
                  发送
                </el-button>
              </template>
            </el-input>
          </div>
          <div class="item">
            <div class="label">
              验证码
            </div>
            <el-input
              v-model="loginVo.code"
              type="text"
              maxlength="8"
            />
          </div>
        </div>
        <div
          v-if="currentLoginType === LoginType.REGISTER"
          class="form"
        >
          <div class="item">
            <div
              class="label"
              :class="!AirValidator.isEmail(loginVo.email) ? 'error' : ''"
            >
              邮箱
            </div>
            <el-input
              v-model="loginVo.email"
              type="text"
            >
              <template #suffix>
                <el-button
                  text
                  type="primary"
                >
                  发送
                </el-button>
              </template>
            </el-input>
          </div>
          <div class="item">
            <div class="label">
              验证码
            </div>
            <el-input
              v-model="loginVo.code"
              type="text"
              maxlength="8"
            />
          </div>
        </div>
        <div class="rules">
          <el-checkbox v-model="isReaded">
            我已阅读并同意 <a href="">
              隐私政策
            </a> 以及 <a href="">
              服务条款
            </a>
          </el-checkbox>
        </div>
        <div class="button">
          <div class="submit">
            <el-button
              v-if="LoginType.REGISTER === currentLoginType"
              :loading="isLogin"
              type="primary"
            >
              注册账号
            </el-button>
            <el-button
              v-else
              :loading="isLogin"
              type="primary"
              @click="onSubmit()"
            >
              立即登录
            </el-button>
          </div>
        </div>
      </template>
      <div class="link">
        <a
          href="javascript:void();"
          @click="isQrcodeLogin = !isQrcodeLogin"
        >
          {{ isQrcodeLogin ? '普通登录' : '扫码登录' }}
        </a>
        <a href="">钉钉登录</a>
        <a href="">企业微信登录</a>
      </div>
    </div>
    <div class="copyright">
      Copyright Hamm.cn &copy;{{ new Date().getFullYear() }}, All Rights Reserved.
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { LoginType } from '@/model/common/LoginType'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'
import { UserRequestVo } from '@/model/user/UserRequestVo'
import { AirValidator } from '@/airpower/helper/AirValidator'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { UserService } from '@/model/user/UserService'
import { AirConfig } from '@/airpower/config/AirConfig'
import { AirAlert } from '@/airpower/feedback/AirAlert'
import { AppEntity } from '@/model/app/AppEntity'
import { AppService } from '@/model/app/AppService'

const isQrcodeLogin = ref(false)

const currentLoginType = ref(LoginType.PASSWORD)

const isReaded = ref(false)

const loginVo = ref(new UserRequestVo())

const appKey = (AirConfig.router.currentRoute.value.query.appKey || '').toString()
const redirectUri = (AirConfig.router.currentRoute.value.query.redirectUri || '').toString()

const appInfo = ref(new AppEntity())

loginVo.value.email = 'admin@hamm.cn'
loginVo.value.password = 'Aa123456'

const isLoadingApp = ref(false)
const isLogin = ref(false)

async function getAppInfo() {
  if (!appKey) {
    AirAlert.error('未知的AppKey')
    return
  }
  loginVo.value.appKey = appKey
  appInfo.value = await AppService.create(isLoadingApp).getAppByKey(appKey)
}

async function onSubmit() {
  if (!isReaded.value) {
    await AirConfirm.create().setConfirmText('确认登录').show('登录即表示你已阅读隐私政策以及服务条款等内容,且你同意上述相关内容。', '是否确认登录?')
    isReaded.value = true
  }
  switch (currentLoginType.value) {
    case LoginType.PASSWORD:
      // eslint-disable-next-line no-case-declarations
      const json = await UserService.create(isLogin).appLogin(loginVo.value)

      // eslint-disable-next-line no-restricted-globals
      location.href = `${decodeURIComponent(redirectUri)}?code=${json.code}`
      break
    default:
      AirNotification.error('暂不支持的登录方式')
  }
}

getAppInfo()
</script>
<style scoped lang="scss">
.auth {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: white url(@/assets/img/auth/bg.jpg) no-repeat bottom center;
  background-size: cover;
  align-items: center;
  justify-content: center;

  .card {
    overflow: hidden;
    background-color: rgba($color: #f5f5f5, $alpha: 0.5);
    box-shadow: 0 0 60px rgba($color: #000, $alpha: 0.1);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .qrcode-login {
      margin: 30px 0px;
      padding: 0px 60px;

      .qrcode-img {
        background-color: rgba($color: #fff, $alpha: 0.9);
        padding: 10px;
        border-radius: 10px;
        font-size: 0;
        img {
          width: 200px;
          height: 200px;
        }
      }

      .desc {
        font-size: 14px;
        text-align: center;
        margin-top: 10px;
        color: #999;
      }
    }

    .logo {

      width: 80px;
      height: 80px;
      padding: 10px;
      background-color: rgba($color: #fff, $alpha: 0.1);
      border-radius: 20px;
      box-shadow: 0 0 60px rgba($color: #000, $alpha: 0.1);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .app-name {
      font-size: 20px;
      font-weight: bold;
      color: #333;
      margin-top: 20px;
    }

    .tabs {
      display: flex;
      flex-direction: row;
      margin-top: 30px;

      .item {
        position: relative;
        margin: 0px 4px;
        padding: 4px 16px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 14px;
        transition: all .3s;
        color: #333;
      }

      .item:hover {
        background-color: #fff;
      }

      .active {
        background-color: white;
        cursor: default;
        color: var(--primary-color);
      }

      .active:hover {
        background-color: white;
      }
    }

    .form {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 10px 60px;

      .item {
        height: 50px;
        background-color: white;
        margin: 5px;
        font-size: 14px;
        border-radius: 10px;
        overflow: hidden;
        padding: 10px 20px;

        .label {
          color: #999;
        }

        .error {
          color: red;
        }
      }
    }

    .button {
      display: flex;
      flex-direction: row;
      width: 100%;
      padding: 0px 40px;
      margin-top: 20px;

      .submit {
        width: 100%;
        flex: 1;

        .el-button {
          padding: 20px;
          width: 100%;
        }
      }
    }

    .link {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      margin-top: 20px;

      a {
        margin: 0px 5px;
        text-decoration: none;
        color: #333;
        transition: all .3s;
      }

      a:hover {
        color: var(--primary-color);
        text-decoration: underline;
      }
    }

    .rules {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      a {
        text-decoration: none;
        color: #000;
        transition: all .3s;
      }

      a:hover {
        text-decoration: underline;
        color: var(--primary-color);
      }

      ::v-deep(.el-checkbox__label) {
        font-weight: normal;
      }
    }

    ::v-deep(.el-input) {
      border: none;

      .el-input__wrapper {
        box-shadow: none;
        padding: 0px;

        .el-button {
          margin-right: -10px;
        }
      }

      .el-input__inner {
        color: #000;
        font-size: 16px;
      }
    }
  }
}

.copyright {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 20px;
  text-align: center;
  color: #aaa;
  font-size: 12px;
  text-shadow: 0px 1px 1px rgba($color: #fff, $alpha: 1);
}
</style>
