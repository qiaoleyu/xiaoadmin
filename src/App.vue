<template>
  <div id="app">
    <img src="./assets/logo1.jpg" style="width: 250px;height: 150px">
    <h1>{{msg}}</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      msg:'Welcome to 小米 后台管理页面'
    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
