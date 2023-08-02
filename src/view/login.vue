<template>
  <div class="login">
    <div class="card">
      <el-tabs class="card-tabs">
        <el-tab-pane label="邮箱账号登录">
          <el-form
            ref="form"
            class="form"
            :model="loginVo"
            label-width="60px"
            :rules="UserService.createValidator(loginVo, rules)"
            @submit.prevent
          >
            <el-form-item
              :label="UserEntity.getFieldName('email')"
              prop="email"
            >
              <AInput
                v-model.email="loginVo.email"
                :entity="UserEntity"
              />
            </el-form-item>
            <el-form-item
              :label="UserEntity.getFieldName('password')"
              prop="password"
            >
              <AInput
                v-model.password="loginVo.password"
                :entity="UserEntity"
              />
            </el-form-item>
            <el-form-item class="form-footer">
              <AButton
                primary
                :disabled="!loginVo.email || !AirValidator.isEmail(loginVo.email) || !loginVo.password"
                @click="onLogin()"
              >
                立即登录
              </AButton>
              <router-link to="/register">
                注册账号
              </router-link>
              <router-link to="/forget">
                忘记密码
              </router-link>
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

const loginVo = ref(new UserEntity())

loginVo.value.email = 'admin@hamm.cn'
loginVo.value.password = '12345678'

const isLoading = ref(false)

const rules = AirValidator.create({
  email: [
    AirValidator.show('请输入登录的邮箱账号').ifEmpty(),
    AirValidator.show('输入的账号不是有效的邮箱').ifNotEmail(),
  ],
  password: [
    AirValidator.show('请输入登录的密码').ifEmpty(),
  ],
})

async function onLogin() {
  const accessToken = await UserService.create(isLoading).login(loginVo.value)
  AirConfig.saveAccessToken(accessToken)
  // 强制重新加载 更新下权限和菜单
  // eslint-disable-next-line no-restricted-globals
  location.replace('/console')
}
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

          a {
            color: #333;
            text-decoration: none;
          }

          a:hover {
            color: var(--primary-color);
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
