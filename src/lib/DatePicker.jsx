import { useState, useRef } from 'react'
import { dayOfWeek, getNumberOfDays, months, formatUTCDate } from './utils'
import '../lib/datePicker.scss'

import Row from './WeekRow'

const DatePicker = ({ forId = 'date-of-birth' }) => {
  const date = new Date()

  const [selectedDate, modifyDate] = useState(date)
  const [selectedMonth, modifyMonth] = useState(date.getMonth())
  const [selectedYear, modifyYear] = useState(date.getFullYear())

  const input = useRef(null)
  const monthInput = useRef(null)
  const yearInput = useRef(null)

  let monthLength = getNumberOfDays(selectedYear, selectedMonth)
  let { startMonth, endMonth } = dayOfWeek(
    selectedYear,
    selectedMonth,
    monthLength
  )

  const [displayContainer, setDisplay] = useState(false)

  /**
   * toggle date picker display on or outside input focus
   */
  const display = () => {
    setDisplay(true) //TODO for test only, then toggle
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
    modifyDate(date)
    modifyMonth(date.getMonth())
    modifyYear(date.getFullYear())
  }

  let yearOptions = []
  for (let year = 1950; year < 2050; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    )
  }

  //FIXME
  /**
   * 5 very specific cases when month don't have 5 week rows but 4 or 6 (ex: fev2020, fev2026, fev2032, july2022 and oct2022)
   */
  const nbrOfRows = () => {
    console.log(endMonth.getDate())
    console.log(endMonth.getDay())
    return 42
  }

  return (
    <>
      <label htmlFor={forId}>Date of Birth</label>
      <input
        id={forId}
        required
        defaultValue={formatUTCDate(date)}
        onFocus={display}
        onBlur={display}
        ref={input}
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
            <div className="calendar">
              <table>
                <thead>
                  <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Row
                      firstDay={startMonth}
                      start={0}
                      forwardedRef={input}
                      setDisplay={setDisplay}
                      currentDay={date}
                      selectedMonth={selectedMonth}
                    />
                  </tr>
                  <tr>
                    <Row
                      firstDay={startMonth}
                      start={7}
                      forwardedRef={input}
                      setDisplay={setDisplay}
                      currentDay={date}
                      selectedMonth={selectedMonth}
                    />
                  </tr>
                  <tr>
                    <Row
                      firstDay={startMonth}
                      start={14}
                      forwardedRef={input}
                      setDisplay={setDisplay}
                      currentDay={date}
                      selectedMonth={selectedMonth}
                    />
                  </tr>
                  <tr>
                    <Row
                      firstDay={startMonth}
                      start={21}
                      forwardedRef={input}
                      setDisplay={setDisplay}
                      currentDay={date}
                      selectedMonth={selectedMonth}
                    />
                  </tr>
                  <tr>
                    <Row
                      firstDay={startMonth}
                      start={28}
                      forwardedRef={input}
                      setDisplay={setDisplay}
                      currentDay={date}
                      selectedMonth={selectedMonth}
                    />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DatePicker
