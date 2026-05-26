<template>
  <div id="app">
    <router-link to="/discover">发现音乐</router-link>
    <router-link to="/my">我的音乐</router-link>
    <router-link to="/friends">关注</router-link>
    <router-link to="/demo">ElementUi测试</router-link>
    <router-link to="/mock">MockJs测试</router-link>
    <router-link to="/checktable">CheckTable测试</router-link>
    <router-link to="/fileupload">文件上传</router-link>
    <router-link to="/user-manage">用户管理</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app a {
  margin: 0 8px;
}
</style>
