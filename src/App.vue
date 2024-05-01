<template>
  <div id="app">
<Demo></Demo>
  </div>
</template>

<script>
import axios from 'axios';
import Demo from './components/Demo.vue'
export default {
  name: 'App',
  components :{
   Demo
  },
  created:function(){
    axios.get("http://localhost:8080/user3").then(function(response){

    })
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
