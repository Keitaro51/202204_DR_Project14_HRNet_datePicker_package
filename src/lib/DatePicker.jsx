import { useState } from 'react'
import { dayOfWeek, getNumberOfDays, months } from './utils'

const DatePicker = () => {
  const date = new Date()

  const [selectedDate, modifyDate] = useState(date)
  const [selectedMonth, modifyMonth] = useState(date.getMonth())
  const [selectedYear, modifyYear] = useState(date.getFullYear())

  let monthLength = getNumberOfDays(selectedYear, selectedMonth)
  let weekDays = dayOfWeek(selectedYear, selectedMonth, monthLength)

  /**
   * change displayed year or month
   * @param {string} target button affect year or month
   * @param {string} type increment or decrement target
   */
  const change = (target, type) => {
    let newDateInMs
    if (target === 'year') {
      newDateInMs =
        type === 'increment'
          ? selectedDate.setFullYear(selectedYear + 1)
          : selectedDate.setFullYear(selectedYear - 1)
    } else {
      newDateInMs =
        type === 'increment'
          ? selectedDate.setMonth(selectedMonth + 1)
          : selectedDate.setMonth(selectedMonth - 1)
    }
    modifyDate(new Date(newDateInMs))
    modifyMonth(selectedDate.getMonth())
    modifyYear(selectedDate.getFullYear())
  }

  return (
    <div className="date-picker-wrapper">
      <button onClick={() => change('month', 'decrement')}>-</button>
      <p>Month: {months[selectedMonth]}</p>
      <button onClick={() => change('month', 'increment')}>+</button>

      <button onClick={() => change('year', 'decrement')}>-</button>
      <p>Year: {selectedYear}</p>
      <button onClick={() => change('year', 'increment')}>+</button>

      <p>Numbre of days in month: {monthLength}</p>
      <p>First day of month: {weekDays.firstWeekDay}</p>
      <p>Last day of month: {weekDays.lastWeekDay}</p>
    </div>
  )
}

export default DatePicker
