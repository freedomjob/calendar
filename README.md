# calendar
this is a componet for calendar

## 要点一：计算某年某月的天数

``` bash

const getMonthDays = (year, month) => {
  d = new Date()
  d.setYear(year)
  d.setMonth(month)
  d.setDate(0)
  return d.getDate()
}

```