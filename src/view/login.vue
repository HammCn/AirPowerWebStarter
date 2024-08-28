<template>
  <div class="login">
    <div
      v-loading="isLoadingApp"
      class="card"
    >
      <div class="logo">
        <img src="@/airpower/assets/img/airpower.svg">
      </div>
      <div class="app-name">
        {{ appInfo.appName }}
      </div>
      <div class="tabs">
        <div
          v-for="(item,index) in [LoginAction.LOGIN_VIA_PASSWORD, LoginAction.LOGIN_VIA_EMAIL, LoginAction.LOGIN_VIA_PHONE, LoginAction.LOGIN_VIA_QRCODE]"
          :key="item"
          class="item"
          :class="(currentAction === item ? 'active item-' : 'item-') + index"
          @click="
            currentAction = item;
            isQrcodeLogin = LoginAction.LOGIN_VIA_QRCODE === item;
          "
        >
          {{ getActionByLanguage(item) }}
        </div>
      </div>
      <div class="body">
        <template v-if="isQrcodeLogin">
          <div class="qrcode-login">
            <div class="qrcode-img">
              <img src="@/assets/img/login/qrcode.png">
            </div>
            <div class="desc">
              请使用App或微信扫码登录
            </div>
          </div>
        </template>

        <template v-else>
          <div
            v-if="currentAction === LoginAction.LOGIN_VIA_PASSWORD"
            class="form"
          >
            <div class="item">
              <div
                class="label"
                :class="!isValidAccount ? 'error' : ''"
              >
                ID / {{ Strings.get().Email || "邮箱" }}
              </div>
              <el-input
                v-model="user.email"
                type="text"
              />
            </div>
            <div class="item">
              <div class="label">
                {{ Strings.get().Password || "密码" }}
              </div>
              <el-input
                v-model="user.password"
                type="password"
              />
            </div>
          </div>
          <div
            v-if="currentAction === LoginAction.LOGIN_VIA_EMAIL"
            class="form"
          >
            <div class="item">
              <div
                class="label"
                :class="!AirValidator.isEmail(user.email) ? 'error' : ''"
              >
                {{ Strings.get().Email || "邮箱" }}
              </div>
              <el-input
                v-model="user.email"
                type="text"
              >
                <template #suffix>
                  <el-button
                    text
                    type="primary"
                    :disabled="!AirValidator.isEmail(user.email)"
                    :loading="isEmailCodeLoading"
                    @click="onSendEmailCode()"
                  >
                    {{ Strings.get().Send || "发送" }}
                  </el-button>
                </template>
              </el-input>
            </div>
            <div class="item">
              <div
                class="label"
                :class="!isValidCode ? 'error' : ''"
              >
                {{ Strings.get().Code || "验证码" }}
              </div>
              <el-input
                v-model="user.code"
                type="text"
                maxlength="8"
              />
            </div>
          </div>
          <div
            v-if="currentAction === LoginAction.LOGIN_VIA_PHONE"
            class="form"
          >
            <div class="item">
              <div
                class="label"
                :class="!AirValidator.isMobilePhone(user.phone) ? 'error' : ''"
              >
                {{ Strings.get().Phone || "手机号" }}
              </div>
              <el-input
                v-model="user.phone"
                type="text"
              >
                <template #suffix>
                  <el-button
                    text
                    type="primary"
                    :disabled="!AirValidator.isMobilePhone(user.phone)"
                  >
                    {{ Strings.get().Send || "发送验证码" }}
                  </el-button>
                </template>
              </el-input>
            </div>
            <div class="item">
              <div
                class="label"
                :class="!isValidCode ? 'error' : ''"
              >
                {{ Strings.get().Code || "验证码" }}
              </div>
              <el-input
                v-model="user.code"
                type="text"
                maxlength="8"
              />
            </div>
          </div>
          <div
            v-if="currentAction === LoginAction.REGISTER_VIA_EMAIL"
            class="form"
          >
            <div class="item">
              <div
                class="label"
                :class="!AirValidator.isEmail(user.email) ? 'error' : ''"
              >
                {{ Strings.get().Email || "邮箱" }}
              </div>
              <el-input
                v-model="user.email"
                type="text"
              >
                <template #suffix>
                  <el-button
                    text
                    type="primary"
                    :disabled="!AirValidator.isEmail(user.email)"
                    :loading="isEmailCodeLoading"
                    @click="onSendEmailCode()"
                  >
                    {{ Strings.get().Send || "发送" }}
                  </el-button>
                </template>
              </el-input>
            </div>
            <div class="item">
              <div
                class="label"
                :class="!isValidCode ? 'error' : ''"
              >
                {{ Strings.get().Code || "验证码" }}
              </div>
              <el-input
                v-model="user.code"
                type="text"
                maxlength="8"
              />
            </div>
            <div class="item">
              <div
                class="label"
                :class="!isValidPassword ? 'error' : ''"
              >
                {{ Strings.get().Password || "密码" }}
              </div>
              <el-input
                v-model="user.password"
                type="password"
              />
            </div>
          </div>
          <div class="rules">
            <el-checkbox v-model="isRead">
              {{ Strings.get().ReadAndAgreed || "我已阅读并同意" }} <a href="">
                {{ Strings.get().PrivacyPolicy || "隐私政策" }}
              </a> {{ Strings.get().And || "以及" }} <a href="">
                {{ Strings.get().TermsOfService || "服务条款" }}
              </a>
            </el-checkbox>
          </div>
          <div class="button">
            <div class="submit">
              <el-button
                v-if="LoginAction.REGISTER_VIA_EMAIL === currentAction"
                :loading="isLoadingReg"
                type="primary"
                :disabled="isButtonDisabled"
                @click="onSubmit()"
              >
                注册账号
              </el-button>
              <el-button
                v-else
                :loading="isLoadingLogin"
                type="primary"
                :disabled="isButtonDisabled"
                @click="onSubmit()"
              >
                {{ Strings.get().LoginNow || "立即登录" }} {{ AppConfig.currentUser.value.nickname }}
              </el-button>
            </div>
          </div>
        </template>
      </div>
      <div class="link">
        <a href="javascript:;">
          使用其他方式登录
        </a>
      </div>
      <el-dropdown
        v-if="AirI18n.getLanguages().length > 0"
        class="language"
        @command="changeLanguage"
      >
        <span class="el-dropdown-link">
          {{ AirI18n.getCurrentLanguage() }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in AirI18n.getLanguages().map(item => item.language)"
              :key="item"
              :command="item"
            >
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="copyright">
      Copyright Hamm.cn &copy;{{ new Date().getFullYear() }}, All Rights Reserved.
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { LoginAction } from '@/model/common/LoginAction'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'
import { AirValidator } from '@/airpower/helper/AirValidator'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { UserService } from '@/model/user/UserService'
import { AirConfig } from '@/airpower/config/AirConfig'
import { AirAlert } from '@/airpower/feedback/AirAlert'
import { MailService } from '@/model/mail/MailService'
import { Strings } from '@/config/Strings'
import { AirLanguage } from '@/airpower/enum/AirLanguage'
import { AirI18n } from '@/airpower/helper/AirI18n'
import { AppConfig } from '@/config/AppConfig'
import { OpenAppService } from '@/model/open/app/OpenAppService'
import { OpenAppEntity } from '@/model/open/app/OpenAppEntity'
import { UserEntity } from '@/model/user/UserEntity'

watch(AppConfig.currentUser, () => {
  AirNotification.success('User更新了')
})

/**
 * # 是否二维码登录
 */
const isQrcodeLogin = ref(false)

const currentAction = ref(LoginAction.LOGIN_VIA_PASSWORD)

function getActionByLanguage(action: LoginAction) {
  switch (action) {
    case LoginAction.LOGIN_VIA_EMAIL:
      return Strings.get().LoginViaEmail || '邮箱登录'
    case LoginAction.LOGIN_VIA_PHONE:
      return Strings.get().LoginViaPhone || '手机登录'
    case LoginAction.LOGIN_VIA_QRCODE:
      return Strings.get().LoginViaQrcode || '手机登录'
    default:
      return Strings.get().LoginViaPassword || '密码登录'
  }
}

/**
 * # 是否已阅读
 */
const isRead = ref(true)

const user = ref(new UserEntity())

const appKey = (AirConfig.router.currentRoute.value.query.appKey || '').toString()
const redirectUri = (AirConfig.router.currentRoute.value.query.redirectUri || '/console').toString()

const appInfo = ref(new OpenAppEntity())

user.value.email = 'admin@hamm.cn'
user.value.password = 'Aa123456'

// 一些Loading状态
const isLoadingApp = ref(false)
const isLoadingLogin = ref(false)
const isLoadingReg = ref(false)
const isEmailCodeLoading = ref(false)

// ! 判断是否输入有效格式的值
const isValidPassword = computed(() => user.value.password && user.value.password.length >= 6)
const isValidCode = computed(() => user.value.code && user.value.code.length === 6)
const isValidEmail = computed(() => user.value.email && AirValidator.isEmail(user.value.email))
const isValidPhone = computed(() => user.value.phone && AirValidator.isMobilePhone(user.value.phone))
const isValidAccount = computed(() => user.value.email && (AirValidator.isEmail(user.value.email) || AirValidator.isNaturalNumber(user.value.email)))

/**
 * # 计算是否禁用登录/注册按钮
 */
const isButtonDisabled = computed(() => {
  switch (currentAction.value) {
    case LoginAction.REGISTER_VIA_EMAIL:
      return !isValidEmail.value || !isValidCode.value || !isValidPassword.value
    case LoginAction.LOGIN_VIA_PHONE:
      return !isValidPhone.value || !isValidCode.value
    case LoginAction.LOGIN_VIA_EMAIL:
      return !isValidEmail.value || !isValidCode.value
    case LoginAction.LOGIN_VIA_PASSWORD:
      return !user.value.password || !isValidAccount.value
    default:
      return true
  }
})

/**
 * # 获取当前应用信息
 */
async function getAppInfo() {
  if (appKey) {
    user.value.appKey = appKey
    appInfo.value = await OpenAppService.create(isLoadingApp).getAppByKey(appKey)
  }
}

/**
 * # 处理登录重定向
 */
function loginRedirect(result: string) {
  if (appKey) {
    // Oauth登录 重定向code
    window.location.href = `${decodeURIComponent(redirectUri)}?code=${result}`
    return
  }
  AirConfig.saveAccessToken(result)
  // 正常登录 保存 AccessToken
  window.location.href = redirectUri
}

/**
 * # 邮箱+密码登录
 */
async function onLogin() {
  const request = user.value.copy()
  if (AirValidator.isNumber(request.email)) {
    request.id = parseInt(request.email, 10)
    request.exclude('email')
  }
  const result = await UserService.create(isLoadingLogin).login(request)
  loginRedirect(result)
}

/**
 * # 邮箱+验证码登录
 */
async function onEmailLogin() {
  const result = await UserService.create(isLoadingLogin).loginViaEmail(user.value)
  loginRedirect(result)
}

/**
 * # 注册
 */
async function onReg() {
  await UserService.create(isLoadingLogin).register(user.value)
  AirAlert.create().setConfirmText('去登录').show('账号注册成功, 你可以使用账号密码去登录了!')
  currentAction.value = LoginAction.LOGIN_VIA_PASSWORD
}

/**
 * # 登录/注册按钮事件
 */
async function onSubmit() {
  if (!isRead.value) {
    await AirConfirm.create().setConfirmText('我已阅读并同意').show('请阅读并同意隐私政策以及服务条款相关内容。', '确认提示')
    isRead.value = true
  }
  switch (currentAction.value) {
    case LoginAction.LOGIN_VIA_PASSWORD:
      onLogin()
      break
    case LoginAction.REGISTER_VIA_EMAIL:
      onReg()
      break
    case LoginAction.LOGIN_VIA_EMAIL:
      onEmailLogin()
      break
    default:
  }
}

/**
 * # 发送邮箱验证码事件
 */
async function onSendEmailCode() {
  const request = new UserEntity()
  request.email = user.value.email
  await MailService.create(isEmailCodeLoading).sendCode(request)
  AirNotification.success('邮箱验证码发送成功, 请注意查看是否被拦截')
}

/**
 * # 更换语言
 */
async function changeLanguage(language: AirLanguage) {
  AirI18n.setCurrentLanguage(language)
  window.location.replace(window.location.href)
}

getAppInfo()
</script>
<style scoped lang="scss">
.login {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: white url(@/assets/img/login/bg.jpg) no-repeat bottom center;
  background-size: cover;
  align-items: center;
  justify-content: center;

  .card {
    overflow: hidden;
    background-color: rgba($color: #f5f5f5, $alpha: 0.5);
    box-shadow: 0 0 60px rgba($color: #000, $alpha: 0.1);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 40px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 360px;
    height: 480px;

    .qrcode-login {
      margin-top: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;

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
      height: 80px;
      padding: 10px;
      background-color: rgba($color: #fff, $alpha: 0.1);
      border-radius: 20px;

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
        margin: 0 2px;
        padding: 4px 14px;
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

    .body {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 10px 60px;
      flex: 1;
      height: 0;

      .form {
        display: flex;
        flex-direction: column;
        width: 100%;

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
        margin: 0 5px;
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
    }

    .link {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      margin-top: 20px;

      a {
        margin: 0 5px;
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
        padding: 0;

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

  .language {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 20px;
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
  text-shadow: 0 1px 1px rgba($color: #fff, $alpha: 1);
}

@media screen and ((orientation:portrait) and (max-width: 600px)) {
  .login {
    .card {
      width: 90% !important;
      background: transparent !important;
      backdrop-filter: blur(0px) !important;
      box-shadow: none !important;
    }

    .item-3{
      display: none;
    }
  }
}
</style>
