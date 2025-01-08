<template>
  <div
    v-loading="isLoading"
    class="user-center slide"
  >
    <div
      v-if="userInfo"
      class="profile"
    >
      <div class="top">
        <div class="avatar">
          <el-upload
            :show-file-list="false"
          >
            <el-image
              :src="AirFile.getStaticFileUrl(userInfo.avatar)"
              fit="cover"
            >
              <template #error>
                <div class="image-slot">
                  <i class="el-icon-picture-outline-round" />
                </div>
              </template>
            </el-image>
          </el-upload>
          <div class="id">
            <span>UID {{ userInfo.id }}</span>
          </div>
        </div>
        <div class="form">
          <el-form
            ref="userForm"
            :model="userInfo"
            class="form-data"
            label-width="60px"
          >
            <el-form-item
              label="昵称"
              prop="user_name"
            >
              <el-input
                v-model="userInfo.nickname"
                placeholder="你牛逼的昵称"
              />
            </el-form-item>
            <el-form-item
              label="性别"
              prop="user_sex"
            >
              <AInput
                v-model.gender="userInfo.gender"
                :entity="UserEntity"
              />
            </el-form-item>
            <el-form-item
              label="签名"
              prop="user_remark"
            >
              <el-input
                v-model="userInfo.bio"
                type="textarea"
              />
            </el-form-item>
            <div class="footer">
              <div class="right">
                <el-button
                  type="danger"
                  @click="logout"
                >
                  注销
                </el-button>
                <el-button
                  type="primary"
                  @click="updateMyInfo()"
                >
                  更新资料
                </el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { UserService } from '@/model/user/UserService'
import { AppConfig } from '@/config/AppConfig'
import { AInput } from '@/airpower/component'
import { AirFile } from '@/airpower/helper/AirFile'
import { UserEntity } from '@/model/user/UserEntity'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { AirConfirm } from '@/airpower/feedback/AirConfirm'

const isLoading = ref(false)
const userInfo = ref(AppConfig.currentUser.value)

const emits = defineEmits(['update'])

async function getMyInfo() {
  userInfo.value = await UserService.create(isLoading).getMyInfo()
  AppConfig.currentUser.value = userInfo.value
}

async function logout() {
  // this.$confirm('是否确认退出当前帐号?', '退出登录', {
  //   confirmButtonText: '退出',
  //   cancelButtonText: '取消',
  //   type: 'warning',
  //   showClose: false,
  //   callback: (res) => {
  //     if (res === 'confirm') {
  //       this.$emit('logout')
  //     }
  //   },
  // })
  await AirConfirm.warning('是否确认切换登录的账号', '切换账号')
  window.location.replace('/login')
}

async function updateMyInfo() {
  await UserService.create(isLoading).updateMyInfo(userInfo.value)
  AirNotification.success('修改资料成功')
  getMyInfo()
  emits('update')
}

getMyInfo()
</script>
<style lang="scss" scoped>
.user-center {
  position: absolute;
  right: 10px;
  top: 60px;
  width: 360px;
  height: 450px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 10px;
  overflow: hidden;
  overflow-y: auto;

  .profile {
    .top {
      display: flex;
      flex-direction: column;
      padding: 20px;

      .avatar {
        width: 100%;
        text-align: center;

        .el-image {
          width: 100px;
          height: 100px;
          border-radius: 20px;
          background-color: white;
        }

        .id {
          text-align: center;
          margin-top: 5px;

          span {
            background-color: #ccc;
            display: inline-block;
            color: #fff;
            border-radius: 3px;
            padding: 2px 5px;
            font-size: 12px;
          }
        }
      }

      .form {
        margin-top: 20px;
        margin-right: 20px;
        flex: 1;

        .footer {
          display: flex;
          flex-direction: row;

          .left {
            flex: 1;
            margin-left: 60px;
          }
        }
      }
    }
  }
}
</style>
