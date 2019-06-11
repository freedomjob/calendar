<template>
  <div id="app">
    <Calendar class="wrapper" v-model="currentDate" @onChange="changeDate" format="yyyy-MM-dd" placeholder="亲，输入个日期吧~"/>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar'
export default {
  name: 'App',
  components: {
    Calendar
  },
  data () {
    return {
      currentDate: null
    }
  },
  watch: {
    currentDate (date) {
      console.log('日期值', date)
    }
  },
  methods: {
    changeDate (dateLabel) {
      console.log('格式化后的日期', dateLabel)
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
  margin-top: 160px;
  display: flex;
  justify-content: center;
}

</style>
