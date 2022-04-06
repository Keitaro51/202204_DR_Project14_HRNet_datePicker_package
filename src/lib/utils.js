//TODO make same thing with new Intl.DateTimeFormat(undefined, {month: 'long',} ?
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const dayOfWeek = (year, month, monthLength) => {
  let startMonth = new Date(year, month, 1)
  let endMonth = new Date(year, month, monthLength)
  return { startMonth, endMonth }
}

export const getNumberOfDays = (year, month) => {
  var isLeap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  return [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
}

//alternative
// export const getNumberOfDays = (year, month) => {
//   const monthStart = new Date(year, month, 1)
//   const monthEnd = new Date(year, month + 1, 1)
//   const monthLength = Math.round(
//     (monthEnd - monthStart) / (1000 * 60 * 60 * 24)
//   )
//   return monthLength
// }

export const formatUTCDate = (date) => {
  const formatDate =
    `${date.getUTCMonth().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    })}` +
    '/' +
    `${date.getUTCDate().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    })}` +
    '/' +
    `${date.getUTCFullYear()}`

  return formatDate
}
