<template>
  <ADialog
    :title="(param.id ? '修改' : '添加') + UserEntity.getClassName()"
    :form-ref="form"
    :loading="isLoading"
    confirm-text="保存"
    :fullable="false"
    @on-confirm="submit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="form"
      :model="data"
      label-width="120px"
      :rules="UserService.createValidator(param)"
      @submit.prevent
    >
      <AGroup
        :column="2"
        title="基础信息"
      >
        <el-form-item
          :label="UserEntity.getFormFieldLabel('email')"
          prop="email"
        >
          <AInput
            v-model.email="data.email"
            :entity="UserEntity"
          />
        </el-form-item>
        <el-form-item
          :label="UserEntity.getFormFieldLabel('nickname')"
          prop="nickname"
        >
          <AInput
            v-model.nickname="data.nickname"
            :entity="UserEntity"
          />
        </el-form-item>
        <el-form-item
          :label="UserEntity.getFormFieldLabel('remark')"
          prop="remark"
        >
          <AInput
            v-model.remark="data.remark"
            :entity="UserEntity"
          />
        </el-form-item>
      </AGroup>
      <AGroup
        title="用户角色"
        :column="2"
      >
        <div class="role-list">
          <AButton
            type="ADD"
            @click="selectRole()"
          >
            选择
          </AButton>
          <el-tag
            v-for="(role, index) in data.roleList"
            :key="role.id"
            size="large"
            closable
            @close="data.roleList.splice(index, 1)"
          >
            {{ role.name }}
          </el-tag>
        </div>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  AButton, ADialog, AGroup, AInput,
} from '@/airpower/component'
import { AirFormInstance } from '@/airpower/type/AirType'
import { airPropsParam } from '@/airpower/config/AirProps'
import { UserService } from '@/model/user/UserService'
import { UserEntity } from '@/model/user/UserEntity'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { RoleSelector } from '../../role/component'

const props = defineProps(airPropsParam(new UserEntity()))
const isLoading = ref(false)

const data = ref(props.param.copy())

async function getDetail() {
  if (props.param.id) {
    data.value = await UserService.create(isLoading).getDetail(props.param.id)
  }
}
getDetail()

const form = ref<AirFormInstance>()
// 表单提交
async function submit() {
  await UserService.create(isLoading).save(data.value, data.value.id ? '修改权限成功' : '添加权限成功')
  props.onConfirm()
}

async function selectRole() {
  data.value.roleList = data.value.roleList || []
  data.value.roleList = await AirDialog.selectList(RoleSelector, data.value.roleList)
}
</script>

<style scoped lang="scss">
.role-list>* {

  margin-right: 5px;
}
</style>
