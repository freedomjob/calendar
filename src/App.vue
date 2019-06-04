<template>
  <div id="app">
    <Calendar class="wrapper"/>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar'
export default {
  name: 'App',
  components: {
    Calendar
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
  margin-left: 200px;
}

</style>
