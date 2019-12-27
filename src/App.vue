<template>
  <div id="app">
    <Upload></Upload>
    <div class="test1"></div>
    <div class="wrapper">
      <Calendar
        v-model="currentDate"
        format="yyyy/MM/dd"
        placeholder="亲，输入个日期吧~"
        placement="top-start"
        @onChange="changeDate" />
    </div>

      <!-- <router-link to="/about">去about页</router-link>
      <router-link to="/">来home页</router-link>

      <router-view></router-view> -->
      <div class="test2"></div>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar'
import Upload from '@/components/Upload'
export default {
  name: 'App',
  components: {
    Calendar, Upload
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
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 160px;
  display: flex;
  justify-content: center; */
  text-align: center;
}
.wrapper {
  margin-top: 30px;
  margin-left: 100px;
}
.test1,.test2 {
  height: 120vh;
}
</style>
