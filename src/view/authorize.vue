<template>
  <div class="authorize">
    <Logo />
    <div
      v-loading="isLoading"
      class="card"
    >
      <div class="title">
        授权 {{ appInfo.appName || '...' }} 访问你的
      </div>
      <div class="scopes">
        <div
          v-for="item in scopeList"
          :key="item.key"
          class="item"
        >
          {{ item.description }}
        </div>
      </div>
      <div class="footer">
        <el-button
          size="large"
          type="primary"
          @click="onConfirm()"
        >
          确认授权
        </el-button>
        <el-button
          size="large"
          @click="onCancel()"
        >
          取消授权
        </el-button>
      </div>
    </div>
    <Copyright />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { OpenAppService } from '@/model/open/app/OpenAppService'
import { OpenAppEntity } from '@/model/open/app/OpenAppEntity'
import { AirRouter } from '@/airpower/helper/AirRouter'
import Copyright from '@/component/login/Copyright.vue'
import Logo from '@/component/login/Logo.vue'
import { UserService } from '@/model/user/UserService'
import { OauthScope } from '@/model/oauth/OauthScope'

const appKey = (AirRouter.router.currentRoute.value.query.appKey || '').toString()
const scope = (AirRouter.router.currentRoute.value.query.scope || '').toString()
const redirectUri = (AirRouter.router.currentRoute.value.query.redirectUri || '/console').toString()

const appInfo = ref(new OpenAppEntity())

const scopeList = ref([] as OauthScope[])
const scopeNeed = ref([] as string[])

// 一些Loading状态
const isLoading = ref(false)

/**
 * ### 获取当前应用信息
 */
async function getAppInfo() {
  appInfo.value = await OpenAppService.create(isLoading)
    .getAppByKey(appKey)
}

async function getScopeList() {
  const list = await UserService.create(isLoading)
    .getScopeList()
  scopeList.value = list.filter((item) => scopeNeed.value.includes(item.name) || item.isDefault)
}

async function onConfirm() {
  const result = await UserService.create(isLoading).authorize(appKey, scope)
  window.location.href = `${redirectUri}?code=${result}`
}

function onCancel() {
  window.location.href = `${redirectUri}?error=cancel`
}

function init() {
  if (!appKey || !scope || !redirectUri) {
    window.location.replace('/')
    return
  }
  getAppInfo()
  getScopeList()
  scopeNeed.value = scope.split(',')
}

init()
</script>
<style lang="scss" scoped>
.authorize {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  align-items: center;
  justify-content: center;

  .logo {
    height: 60px;
    padding: 10px;
    background-color: rgba($color: #fff, $alpha: 0.1);
    border-radius: 20px;
    position: absolute;
    left: 30px;
    top: 30px;

    img {
      height: 100%;
    }
  }

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
    min-height: 200px;
    max-height: 500px;

    .title {
      font-size: 20px;
      font-weight: bold;
    }

    .scopes {
      background: #eee;
      margin: 20px 0;
      flex: 1;
      height: 0;
      overflow: hidden;
      overflow-y: auto;
      width: 100%;
      padding: 15px 20px;
      border-radius: 15px;

      .item{
        position: relative;
        color: #999;
        font-size: 14px;
        margin: 5px 0;
      }
      .item::before{
        content:'';
        background: #999;
        width: 8px;
        height: 8px;
        display: inline-block;
        margin-right: 5px;
        border-radius: 100%;
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
  font-size: 14px;
  text-shadow: 0 1px 1px rgba($color: #fff, $alpha: 1);
}

@media screen and ((orientation:portrait) and (max-width: 600px)) {
  .authorize {
    .logo {
      left: auto !important;
    }

    .card {
      width: 90% !important;
      background: transparent !important;
      backdrop-filter: blur(0px) !important;
      box-shadow: none !important;
    }

    .item-3 {
      display: none;
    }
  }
}
</style>
