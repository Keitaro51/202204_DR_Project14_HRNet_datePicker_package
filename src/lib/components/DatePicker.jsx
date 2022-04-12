import React, { useState, useRef } from 'react'
import {
  dayOfWeek,
  getNumberOfDays,
  months,
  formatUTCDate,
} from '../utils/utils'
import '../components/datePicker.scss'

import Row from '../components/WeekRow'

const DatePicker = ({ forId = 'date-of-birth', content = 'Date of Birth' }) => {
  const date = new Date()

  const [selectedDate, modifyDate] = useState(date)
  const [selectedMonth, modifyMonth] = useState(date.getMonth())
  const [selectedYear, modifyYear] = useState(date.getFullYear())

  const input = document.getElementById(`${forId}`)

  const monthInput = useRef(null)
  const yearInput = useRef(null)

  let monthLength = getNumberOfDays(selectedYear, selectedMonth)
  let { startMonth, nbrOfRows } = dayOfWeek(
    selectedYear,
    selectedMonth,
    monthLength
  )

  const [displayContainer, setDisplay] = useState(false)

  const onBlur = (e) => {
    if (
      e.relatedTarget !== null &&
      e.relatedTarget.classList.contains('ignore_blur')
    ) {
      input.focus()
    } else {
      setDisplay(false)
    }
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
  for (let year = 1950; year < 2051; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    )
  }

  return (
    <React.Fragment>
      <label htmlFor={forId}>{content}</label>
      <input
        id={forId}
        required
        defaultValue={formatUTCDate(date)}
        onClick={() => setDisplay(!displayContainer)}
        onBlur={onBlur}
      />
      {displayContainer && (
        <div className="container ignore_blur" tabIndex="0">
          <div className="datepicker">
            <div className="monthpicker">
              <button
                onClick={() => change('month', 'decrement')}
                className="prev ignore_blur"
              />
              <button onClick={today} className="today ignore_blur" />
              <div className="month ignore_blur">
                <select
                  name="month"
                  key={selectedMonth}
                  defaultValue={selectedMonth}
                  onChange={() => change('month')}
                  ref={monthInput}
                  className="ignore_blur"
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
                  className="ignore_blur"
                >
                  {yearOptions}
                </select>
              </div>
              <button
                onClick={() => change('month', 'increment')}
                className="next ignore_blur"
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
                  {nbrOfRows > 4 && (
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
                  )}

                  {nbrOfRows > 5 && (
                    <tr>
                      <Row
                        firstDay={startMonth}
                        start={34}
                        forwardedRef={input}
                        setDisplay={setDisplay}
                        currentDay={date}
                        selectedMonth={selectedMonth}
                      />
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default DatePicker
