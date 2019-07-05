<template>
  <div class="calendar" v-click-outside="closePanel">
    <input class="calendar-input" type="text" :placeholder="placeholder" readonly @click="openPanel" v-model="currentDateLabel">
    <span class="icon-calendar" v-if="showCalendarIcon" @mouseover="currentDateLabel && (showCalendarIcon=false)"  @click="openPanel"></span>
    <span class="icon-close" v-if="!showCalendarIcon" @mouseout="showCalendarIcon=true" @click="clearDate"></span>
    <transition name="zoom-in-top">
      <div class="calendar-panel" v-show="showPanel">
        <div class="panel-header">
          <a href="#" class="prev-year" v-html="'<<'" @click="changeDate(-1,'year')"></a>
          <a href="#" class="prev-month" v-html="'<'" @click="changeDate(-1,'month')" v-show="mode=='day'"></a>
          <span class="selected-year-month" @click="changeMode">{{`${currentDate.getFullYear()}年 ${currentDate.getMonth() + 1}月`}}</span>
          <a href="#" class="next-month" v-html="'>'" @click="changeDate(1,'month')" v-show="mode=='day'"></a>
          <a href="#" class="next-year"  v-html="'>>'" @click="changeDate(1,'year')"></a>
        </div>
        <table class="panel-body" v-show="mode === 'day'">
          <thead>
            <tr>
              <th v-for="(weekDay,weekInx) in weekDays" :key="weekInx">{{weekDay}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week,index) in calenderWeeks" :key="index">
              <td v-for="(day,dayInx) in week" :key="dayInx" class="table-cell">
                <div class="table-date"
                  :class="{current:day.date === currentDate.getDate() && (day.month === currentDate.getMonth()+1),
                      disabled:(day.month-1 != currentDate.getMonth())}"
                  @click="(day.month-1 == currentDate.getMonth()) && selectedDate(day)"
                  >
                  {{day.date}}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="panel-body__other"  v-show="mode === 'year'">
            <div v-for="(year,index) in calenderYears" :key="index" class="other-cell"
              :class="{current:year === currentDate.getFullYear()}"
             @click="selectedYear(year)">
              {{year}}
            </div>
        </div>
        <div class="panel-body__other"  v-show="mode === 'month'">
            <div v-for="(month,index) in calenderMonths" :key="index" class="other-cell"
            :class="{current:(month.slice(0, -1) - 1) === currentDate.getMonth()}"
            @click="selectedMonth(month)">
              {{month}}
            </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
const START_OF_WEEK = 0 // week排列起始值
export default {
  name: 'calendar',
  props: {
    value: Date,
    format: {
      type: String,
      default: 'yyyy年MM月dd日',
      validator: function (value) {
        return ['yyyy年MM月dd日', 'yyyy-MM-dd', 'yyyy/MM/dd'].includes(value)
      }
    },
    placeholder: {
      type: String,
      default: '请输入日历信息'
    }
  },
  data () {
    return {
      mode: 'day',
      currentDate: '',
      currentDateLabel: '',
      showPanel: false,
      showCalendarIcon: true,
      weekDays: [ '日', '一', '二', '三', '四', '五', '六' ]
    }
  },
  computed: {
    // 计算需要展示的日期数组
    calenderWeeks () {
      const firstDayOfMonth = new Date(this.currentDate)
      firstDayOfMonth.setDate(1)
      const beginDay = new Date(firstDayOfMonth)
      const firstDayOfMonthsWeekDay = firstDayOfMonth.getDay() || 7
      const offsetOfPrevMonth = START_OF_WEEK - firstDayOfMonthsWeekDay
      beginDay.setDate(offsetOfPrevMonth)
      const dates = []
      const currentMonthDays = this.getMonthDays(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1
      )
      let rowCount = Math.ceil((currentMonthDays + Math.abs(offsetOfPrevMonth)) / 7) + 1
      rowCount > 6 && (rowCount = 6)
      const day = beginDay
      for (let weekOfMonth = 0; weekOfMonth < rowCount; weekOfMonth++) {
        const week = []
        for (let i = 0; i < 7; i++) {
          day.setDate(day.getDate() + 1)
          week.push({
            year: day.getFullYear(),
            month: day.getMonth() + 1,
            date: day.getDate()
          })
        }
        dates.push(week)
      }
      return dates
    },
    // 计算需要展示的年份数组
    calenderYears () {
      let year = String(this.currentDate.getFullYear()).slice(0, -1)
      return Array.from({length: 10}).map((num, index) => +(year + index))
    },
    // 计算需要展示的月份数组
    calenderMonths () {
      return Array(12).fill().map((num, index) => `${index + 1}月`)
    }
  },
  methods: {
    openPanel () {
      this.showPanel = true
    },
    closePanel () {
      this.showPanel = false
    },
    clearDate () {
      this.currentDateLabel = ''
      this.currentDate = new Date()
      this.$emit('input', null)
      this.$emit('onChange', '')
    },
    changeDate (count, flag) {
      const newDate = new Date(this.currentDate)
      if (flag === 'year') {
        (this.mode === 'year') && (count *= 10)
        newDate.setYear(this.currentDate.getFullYear() + count)
      } else {
        newDate.setMonth(this.currentDate.getMonth() + count)
      }
      this.currentDate = newDate
    },
    changeMode () {
      if (this.mode === 'day') {
        this.mode = 'year'
      }
    },
    selectedDate (day) {
      let date = new Date()
      date.setYear(day.year)
      date.setMonth(day.month - 1)
      date.setDate(day.date)
      this.currentDate = date
      this.currentDateLabel = this.formatDate(date)
      this.$emit('input', date)
      this.$emit('onChange', this.currentDateLabel)
      this.closePanel()
    },
    selectedYear (year) {
      let date = new Date(this.currentDate)
      date.setYear(year)
      this.currentDate = date
      this.mode = 'month'
    },
    selectedMonth (month) {
      let date = new Date(this.currentDate)
      date.setMonth(month.slice(0, -1) - 1)
      this.currentDate = date
      this.mode = 'day'
    },
    // 格式化日期
    formatDate (date) {
      // let dateLabel = ''
      // if (this.format === 'yyyy-MM-dd') {
      //   dateLabel = `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())}`
      // } else if (this.format === 'yyyy/MM/dd') {
      //   dateLabel = `${date.getFullYear()}/${this.pad(date.getMonth() + 1)}/${this.pad(date.getDate())}`
      // } else {
      //   dateLabel = `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日`
      // }
      // return dateLabel
      return date.format(this.format)
    },
    pad (val) {
      val += ''
      return val.padStart(2, 0)
    },
    // 计算某年某月的总天数
    getMonthDays (year, month) {
      let d = new Date()
      d.setYear(year)
      d.setMonth(month)
      d.setDate(0)
      return d.getDate()
    }
  },
  created () {
    this.currentDate = this.value || new Date()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .zoom-in-top-enter-active,
  .zoom-in-top-leave-active {
    opacity: 1;
    transform: scaleY(1);
    transition: transform .3s cubic-bezier(0.23, 1, 0.32, 1), opacity .3s cubic-bezier(0.23, 1, 0.32, 1);
    transform-origin: center top;
  }
  .zoom-in-top-enter,
  .zoom-in-top-leave-active {
    opacity: 0;
    transform: scaleY(0);
  }

  .calendar {
    font-size: 28px;
    position: relative;
    width: 180px;
    .calendar-input {
      width: 180px;
      border: 1px solid @border;
      border-radius: 4px;
      color: rgba(0,0,0,0.65);
      padding: 9px 12px;
      transition: .3s all linear;
      position: absolute;
      left: 0;
      &:hover {
        border: 1px solid @purple;
      }
      &:focus {
        outline: none;
        border: 1px solid @purple;
      }
    }
    [class^="icon-"] {
      position: absolute;
      right: 12px;
      transform: translateY(50%);
    }
    .calendar-panel {
      width: 290px;
      height: 290px;
      box-shadow: rgba(0,0,0,0.15) 0 2px 8px 0;
      position: absolute;
      z-index: 999;
      top: 35px;
      font-size: 14px;
    }
    .panel-header {
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom: solid 1px @border;
      padding: 0 8px;
      .prev-year, .prev-month, .next-year, .next-month {
        padding: 0 5px;
        color: black;
        font-size: 16px;
        &:hover {
          color: @purple;
        }
      }
      .selected-year-month {
        cursor: pointer;
        flex: 1;
        margin: 0 44px;
      }
    }
    .panel-body {
      margin: 17px auto;
      tr {
        line-height: 18px;
      }
      th, td {
        width: 40px;
        padding: 3px 0;
      }
      .table-cell {
        .table-date {
          cursor: pointer;
          width: 26px;
          height: 26px;
          line-height: 26px;
          border-radius: 4px;
          margin: 0 auto;
          transition: .2s linear;
          &:hover,&.current {
            color: white;
            background: @purple;
          }
          &.disabled {
            cursor: default;
            color: rgba(0,0,0,0.25);
            background: white;
          }
        }
      }
      &__other {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: space-around;
        height: 250px;
        .other-cell {
          align-self: center;
          justify-self: center;
          padding: 10px;
          transition: .2s linear;
          cursor: pointer;
          &:hover,&.current {
            color: white;
            background: @purple;
            border-radius: 4px;
          }
        }
      }
    }
  }
</style>
