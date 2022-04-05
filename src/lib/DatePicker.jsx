import { useState, useRef } from 'react'
import { dayOfWeek, getNumberOfDays, months } from './utils'
import '../lib/datePicker.scss'

const DatePicker = () => {
  const date = new Date()

  const [selectedDate, modifyDate] = useState(date)
  const [selectedMonth, modifyMonth] = useState(date.getMonth())
  const [selectedYear, modifyYear] = useState(date.getFullYear())

  const monthInput = useRef(null)
  const yearInput = useRef(null)

  let monthLength = getNumberOfDays(selectedYear, selectedMonth)
  let weekDays = dayOfWeek(selectedYear, selectedMonth, monthLength)

  const [displayContainer, setDisplay] = useState(false)
  /**
   * toggle date picker display on or outside input focus
   */
  const display = () => {
    setDisplay(true) //for test only
  }

  /**
   * change displayed year or month
   * @param {string} target button affect year or month
   * @param {string} type increment or decrement target
   */
  const change = (target, type) => {
    let newDateInMs
    if (type) {
      newDateInMs =
        type === 'increment'
          ? selectedDate.setMonth(selectedMonth + 1)
          : selectedDate.setMonth(selectedMonth - 1)
    } else if (!type && target === 'month') {
      newDateInMs = selectedDate.setMonth(monthInput.current.value)
    } else if (!type && target === 'year') {
      newDateInMs = selectedDate.setFullYear(yearInput.current.value)
    }
    modifyDate(new Date(newDateInMs))
    modifyMonth(selectedDate.getMonth())
    modifyYear(selectedDate.getFullYear())
  }

  const today = () => {
    console.log(date)
    modifyDate(date)
    modifyMonth(date.getMonth())
    modifyYear(date.getFullYear())

    console.log("it's today")
  }

  let yearOptions = []
  for (let i = 1950; i < 2050; i++) {
    yearOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    )
  }

  return (
    <>
      <label htmlFor="date-of-birth">Date of Birth</label>
      <input
        id="date-of-birth"
        required
        defaultValue="1983-06-18"
        onFocus={display}
        onBlur={display}
      />
      {displayContainer && (
        <div className="container">
          <div className="datepicker">
            <div className="monthpicker">
              <button
                onClick={() => change('month', 'decrement')}
                className="prev"
              />
              <button onClick={today} className="today" />
              <div className="month">
                <select
                  id="month"
                  name="month"
                  key={selectedMonth}
                  defaultValue={selectedMonth}
                  onChange={() => change('month')}
                  ref={monthInput}
                >
                  {months.map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="year">
                <select
                  id="year"
                  name="year"
                  key={selectedYear}
                  defaultValue={selectedYear}
                  onChange={() => change('year')}
                  ref={yearInput}
                >
                  {yearOptions}
                </select>
              </div>
              <button
                onClick={() => change('month', 'increment')}
                className="next"
              />
            </div>
            <div className="calendar"></div>
          </div>
        </div>
      )}
    </>
  )
}

export default DatePicker

// <p>Year: {selectedYear}</p>

// <p>Numbre of days in month: {monthLength}</p>
// <p>First day of month: {weekDays.firstWeekDay}</p>
// <p>Last day of month: {weekDays.lastWeekDay}</p>
