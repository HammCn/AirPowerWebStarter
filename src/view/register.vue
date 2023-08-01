<template>
  <div class="reg">
    <div class="card">
      <el-tabs class="card-tabs">
        <el-tab-pane label="邮箱账号注册">
          <el-form
            ref="form"
            v-loading="isLoading"
            class="form"
            :model="regVo"
            label-width="80px"
            :rules="UserService.createValidator(regVo, rules)"
            @submit.prevent
          >
            <el-form-item
              :label="UserEntity.getFieldName('email')"
              prop="email"
            >
              <el-input
                v-model="regVo.email"
                placeholder="请输入早前注册的邮箱账号..."
                type="email"
              >
                <template #append>
                  <el-button
                    v-if="!isWaiting"
                    :disabled="!regVo.email || !AirValidator.isEmail(regVo.email)"
                    icon="Message"
                    @click="onSendCode()"
                  />
                  <template v-else>
                    {{ second }}s
                  </template>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              v-if="regVo.email && AirValidator.isEmail(regVo.email)"
              :label="UserRegVo.getFieldName('code')"
              prop="code"
            >
              <AInput
                v-model.code="regVo.code"
                :entity="UserRegVo"
              />
            </el-form-item>
            <el-form-item
              v-if="regVo.email && AirValidator.isEmail(regVo.email)"
              :label="UserEntity.getFieldName('password')"
              prop="password"
            >
              <AInput
                v-model.password="regVo.password"
                :entity="UserEntity"
                placeholder="请设置一个别人猜不到的密码..."
              />
            </el-form-item>
            <el-form-item class="form-footer">
              <AButton
                primary
                :disabled="!regVo.email || !regVo.code || !AirValidator.isEmail(regVo.email) || !regVo.password"
                @click="onRegister()"
              >
                注册账号
              </AButton>
              <el-link href="/login">
                已有账号,去登录
              </el-link>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { AButton, AInput } from '@/airpower/component'
import { UserEntity } from '@/model/user/UserEntity'
import { UserService } from '@/model/user/UserService'
import { AirValidator } from '@/airpower/helper/AirValidator'
import { AirConfig } from '@/airpower/config/AirConfig'
import { MailService } from '@/model/mail/MailService'
import { AirDateTime } from '@/airpower/helper/AirDateTime'
import { UserRegVo } from '@/model/user/UserRegVo'
import { AirNotification } from '@/airpower/feedback/AirNotification'

const regVo = ref(new UserRegVo())

const isLoading = ref(false)

const isWaiting = ref(false)

const waitingSecond = 60

const second = ref(waitingSecond)

const rules = AirValidator.create({
  email: [
    AirValidator.show('请输入你期望注册的邮箱账号').ifEmpty(),
    AirValidator.show('输入的账号不是有效的邮箱').ifNotEmail(),
  ],
  password: [
    AirValidator.show('请确保设置一个别人猜不到的登录密码').ifEmpty(),
  ],
  code: [
    AirValidator.show('请输入刚才收到的邮箱验证码').ifEmpty(),
  ],
})

async function onRegister() {
  await UserService.create(isLoading).register(regVo.value)
  await AirNotification.success('账号注册成功,快去登录吧~')
  AirConfig.router.push('/login')
}

async function waitTimer() {
  if (second.value === 0) {
    isWaiting.value = false
    return
  }
  second.value -= 1
  await AirDateTime.sleep(1000)
  waitTimer()
}

async function onSendCode() {
  if (isWaiting.value) {
    return
  }
  const mailRequest = new UserEntity()
  mailRequest.email = regVo.value.email
  await MailService.create(isLoading).sendCode(mailRequest)
  second.value = waitingSecond
  isWaiting.value = true
  waitTimer()
}
</script>
<style scoped lang="scss">
.reg {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: white url(@/assets/img/login/bg.png) no-repeat bottom center;
  background-size: auto 100%;
  align-items: center;
  justify-content: center;

  .card {
    background-color: white;
    border-radius: 15px;
    box-shadow: 0px 0px 50px rgba($color: #000000, $alpha: 0.3);
    padding: 20px 30px;
    width: 400px;

    ::v-deep(.card-tabs) {
      .el-tabs__item {
        font-size: 16px;
      }

      .form {
        padding-top: 20px;

        .form-footer {
          margin-top: 30px;

          .el-form-item__content>* {
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>
