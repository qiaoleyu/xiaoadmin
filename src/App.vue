<template>
  <div id="app">

    <!--<h1>{{msg}}</h1>-->
    <!--<img src="./assets/logo1.jpg" style="width: 250px;height: 150px">-->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {

  name: 'App',
  data(){
    return{
      msg:'Welcome to 后台管理页面'
    }
  },methods:{
    activated: function() {
      this.getCase()
    },
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
  margin-top: 0px;
}
</style>
