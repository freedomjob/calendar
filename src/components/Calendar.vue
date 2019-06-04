<template>
  <div class="calendar" v-click-outside="closePanel">
    <input class="calendar-input" type="text" :placeholder="placeholder" readonly @click="openPanel" v-model="currentDateLabel">
    <span class="icon-calendar" v-if="showCalendarIcon" @mouseover="showCalendarIcon=false"></span>
    <span class="icon-close" v-if="!showCalendarIcon" @mouseout="showCalendarIcon=true"></span>
    <transition name="zoom-in-top">
      <div class="calendar-panel" v-show="showPanel">
        <div class="panel-header">
          <a href="#" class="prev-year" v-html="'<<'"></a>
          <a href="#" class="prev-month" v-html="'<'"></a>
          <span class="selected-year-month">2019年6月</span>
          <a href="#" class="next-year"  v-html="'>>'"></a>
          <a href="#" class="next-month" v-html="'>'"></a>
        </div>
        <table class="panel-body">
          <thead>
            <tr>
              <th v-for="(weekDay,weekInx) in weekDays" :key="weekInx">{{weekDay}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week,index) in [[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],[1,2,3,4,5,6,7]]" :key="index">
              <td v-for="(day,dayInx) in week" :key="dayInx" class="table-cell">
                <div class="table-date">
                  {{day}}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'calendar',
  props: {
    placeholder: {
      type: String,
      default: '请输入日历信息'
    }
  },
  data () {
    let currentDate = new Date()
    return {
      currentDateLabel: `${currentDate.getFullYear()}年 ${currentDate.getMonth() + 1}月 ${currentDate.getDate()}日`,
      showPanel: false,
      showCalendarIcon: true,
      weekDays: [ '日', '一', '二', '三', '四', '五', '六' ]
    }
  },
  methods: {
    openPanel () {
      this.showPanel = true
    },
    closePanel () {
      this.showPanel = false
    }
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
        flex: 1;
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
        cursor: pointer;
        .table-date {
          width: 26px;
          height: 26px;
          line-height: 26px;
          border-radius: 4px;
          margin: 0 auto;
          transition: .2s linear;
          &:hover {
            color: white;
            background: @purple;
          }
        }
      }
    }
  }
</style>
