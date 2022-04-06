import { formatUTCDate } from './utils'

const Row = ({ firstDay, start, forwardedRef }) => {
  const weekNbr = (start + 7) / 7

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
        className={`week${weekNbr}`}
        onClick={() => onClick(UTCDate)}
      >
        <div>{UTCDate.getUTCDate()}</div>
      </td>
    )
  }

  const onClick = (UTCDate) => {
    const formatedDate = formatUTCDate(UTCDate)
    forwardedRef.current.value = formatedDate
  }

  return week
}

export default Row
