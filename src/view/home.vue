<template>
  <div class="home">
    <img
      class="logo"
      src="@/assets/img/logo.png"
    >
    <iframe src="https://ac.hamm.cn" />
    <div class="intro">
      <img src="https://svg.hamm.cn?key=Lang&value=TypeScript">
      <img src="https://svg.hamm.cn?key=Base&value=Vue3">
      <img src="https://svg.hamm.cn?key=Build&value=Vite">
      <img src="https://svg.hamm.cn?key=UI&value=ElementPlus">
    </div>
    <div class="link">
      <router-link to="/console">
        Console
      </router-link>
      <router-link to="/chat">
        ChatRoom
      </router-link>
      <router-link to="/login">
        Login
      </router-link>
      <el-link
        href="https://github.com/HammCn"
        target="_blank"
      >
        Github
      </el-link>
      <el-link
        href="https://gitee.com/air-power"
        target="_blank"
      >
        Gitee
      </el-link>
      <el-link
        href="https://juejin.cn/post/7273290114921889807"
        target="_blank"
      >
        JueJin
      </el-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
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

  iframe {
    width: 420px;
    border: none;
    height: 200px;
  }

  .logo {
    width: 300px;
    margin-bottom: 50px;
  }

  .intro {
    img {
      margin: 0 5px;
    }
  }

  .link {
    display: flex;
    flex-direction: row;
    margin-top: 20px;

    a {
      margin: 0 5px;
      font-size: 16px;
      color: var(--el-color-primary);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
      font-weight: bold;
    }
  }
}
</style>
