import React from 'react'
import { formatUTCDate } from '../utils/utils'

const Row = ({
  firstDay,
  start,
  forwardedRef,
  setDisplay,
  currentDay,
  selectedMonth,
}) => {
  let week = []

  for (let day = start; day <= start + 6; day++) {
    const GMTDate = new Date(
      firstDay.getTime() - (firstDay.getDay() - day) * 24 * 60 * 60 * 1000
    )
    const UTCDate = new Date(
      Date.parse(GMTDate) - new Date().getTimezoneOffset() * 60 * 1000
    )

    week.push(
      <td
        key={day}
        className={
          `${currentDay.getMonth()}/${currentDay.getDate()}/${currentDay.getFullYear()}` ===
          `${UTCDate.getMonth()}/${UTCDate.getDate()}/${UTCDate.getFullYear()}`
            ? 'current'
            : selectedMonth !== UTCDate.getMonth()
            ? 'other_month'
            : ''
        }
        onClick={() => onClick(UTCDate)}
      >
        <div>{UTCDate.getUTCDate()}</div>
      </td>
    )
  }

  const onClick = (UTCDate) => {
    const formatedDate = formatUTCDate(UTCDate)
    forwardedRef.value = formatedDate
    setDisplay(false)
  }

  return week
}

export default Row
