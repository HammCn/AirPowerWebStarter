<template>
  <div class="home">
    <el-image
      class="logo"
      src="logo"
    />
    <h1>Hello AirPower!</h1>
    <div class="intro">
      Based on Vue3 & TypeScript & Element-Plus & Vite
    </div>
    <div class="link">
      <el-link href="/console">
        Console
      </el-link>
      <el-link href="/login">
        Login
      </el-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import logo from '@/airpower/assets/img/logo.png'
</script>
<style scoped lang="scss">
.home {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .logo {
    width: 250px;
    height: 250px;
  }

  .link {
    display: flex;
    flex-direction: row;
    margin-top: 20px;

    .el-link {
      margin: 0px 5px;
      font-size: 16px;
    }
  }
}
</style>
