# calendar
this is a componet for calendar

## 封装步骤
- [ ] click-outside指令(方法) --[iview的实现](https://github.com/iview/iview/blob/2.0/src/directives/clickoutside.js) [element的实现](https://github.com/ElemeFE/element/blob/dev/src/utils/clickoutside.js)

### 要点一：计算某年某月的天数

``` bash

const getMonthDays = (year, month) => {
  d = new Date()
  d.setYear(year)
  d.setMonth(month)
  d.setDate(0)
  return d.getDate()
}

```