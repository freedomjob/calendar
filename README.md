# calendar
this is a componet for calendar

## 参数说明

| 参数        | 说明                      | 类型      | 可选值  | 默认值    |
| ---------  | ----------------------- | ------- | ---- | ------ |
| value    | 日历框的值     | Date | -    | -   |
| format | 展示的日期格式 | String | 'yyyy年MM月dd日', 'yyyy-MM-dd', 'yyyy/MM/dd' | 'yyyy年MM月dd日' |
| placeholder    | 输入框默认文字     | String | -    | '请输入日历信息' |
| placement | 日历选框的位置 | String | auto/top/right/bottom/left [-start,-end] | 'bottom-start' |

## 事件说明

| 事件名        | 说明                  |  返回值  |
| ---------  | ----------------------- | ---- | 
| onChange    | 日期发生变化时触发     |  返回一个值，已经格式化后的日期   |

## 封装步骤
- [x] click-outside指令(方法) --[iview的实现](https://github.com/iview/iview/blob/2.0/src/directives/clickoutside.js) [element的实现](https://github.com/ElemeFE/element/blob/dev/src/utils/clickoutside.js) 实现点击日历选框外部时，关闭日历选框
- [x] input框 --readonly、placeholder、点击弹出日历选框、回显日期、日历图标和清除图标的切换
- [x] 日历选框上部的年月切换(+-月、+-年)
- [x] 日历选框下部的表格展示(要点一、二、三)、选择逻辑
- [x] 日历的年和月份的表格展示(要点四、五)、日历选框上部年月切换调整
- [x] 日历位置属性的完善和日历位置根据不同位置的动态改变

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

### 要点四：计算需要展示的月份数组

``` bash

const calenderMonths = () => {
    return Array(12).fill().map((num, index) => `${index + 1}月`)
}

```

### 要点五：计算需要展示的年份数组

``` bash

const calenderYears = () => {
    let year = String(this.currentDate.getFullYear()).slice(0, -1)
    return Array.from({length: 10}).map((num, index) => +(year + index))
}

```
### 要点六：格式化日期函数

``` bash

Date.prototype.format = function(fmt) {
	
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': this.getMonth() + 1,
		'd+': this.getDate(),
		'h+': this.getHours(),
		'm+': this.getMinutes(),
		's+': this.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : str.padStart(2,0));
		}
	}
	return fmt;
	
};

```
