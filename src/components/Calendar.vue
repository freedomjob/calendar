<template>
  <div>
    <div class="calendar" @click="change">calendar</div>
  </div>
</template>

<script>
export default {
  name: 'calendar',
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    change () {
      this.isShow = !this.isShow
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .calendar {
    font-size: 28px;
    color: @brown;
  }
</style>
