# calendar
this is a componet for calendar

## 封装步骤
- [ ] click-outside指令(方法) --[iview的实现](https://github.com/iview/iview/blob/2.0/src/directives/clickoutside.js) [element的实现](https://github.com/ElemeFE/element/blob/dev/src/utils/clickoutside.js) 实现点击日历选框外部时，关闭日历选框
- [ ] input框 --readonly、placeholder、点击弹出日历选框、回显日期、日历图标和清除图标的切换
- [ ] 日历选框上部的年月切换(+-月、+-年)
- [ ] 日历选框下部的表格展示(要点一、二、三)、选择逻辑、在节点上放入年月日属性


### 要点一：计算某年某月的总天数

``` bash

const getMonthDays = (year, month) => {
  d = new Date()
  d.setYear(year)
  d.setMonth(month)
  d.setDate(0)
  return d.getDate()
}

```
### 要点二：week的排列和起始值（可以根据不同的需求，改变week排列）

``` bash

const WEEK_DAY_NAMES = ['一', '二', '三', '四', '五', '六', '日']
const START_OF_WEEK = 1 // 1代表周一，依次类推; 0代表周日

```
### 要点三：计算需要展示的日期数组（包括当月的和月前月后的若干天）

``` bash

const calenderWeeks = () => {
      const firstDayOfMonth = new Date(this.currDate)
      firstDayOfMonth.setDate(1)
      const beginDay = new Date(firstDayOfMonth) //找到当前月份的第一天
      // 当前月份第一天是星期几
      const firstDayOfMonthsWeekDay = firstDayOfMonth.getDay() || 7
      // 需要在第一行补的天数
      const offsetOfPrevMonth = START_OF_WEEK - firstDayOfMonthsWeekDay
      beginDay.setDate(offsetOfPrevMonth) //表格起始日期
      const dates = []
      // 计算当前月份的总天数
      const currMonthDays = getMonthDays(
        this.currDate.getFullYear(),
        this.currDate.getMonth() + 1
      )
      // 计算总共多少行
      const rowCount = Math.ceil((currMonthDays + Math.abs(offsetOfPrevMonth)) / 7) + 1
      // 日历选框起始日期
      const day = beginDay

      //将所有需要展示的日期组成数组
      for (let weekOfMonth = 0; weekOfMonth < rowCount; weekOfMonth++) {
        const week = []
        for (let i = 0; i < 7; i++) {
          day.setDate(day.getDate() + 1) //由于时间计算的原因，需要加一才是正确的起始日期
          week.push({ //每一行的日期
            year: day.getFullYear(),
            month: day.getMonth() + 1,
            date: day.getDate(),
          })
        }
        dates.push(week) 将每一行加入到日期数组中
      }
      return dates
    }
  }

```