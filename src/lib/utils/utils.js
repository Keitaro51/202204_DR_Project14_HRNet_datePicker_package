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

/**
 * deteremination of some usefull informations for the selected month
 *
 * @param   {number}  year         selected year
 * @param   {number}  month        selected month
 * @param   {number}  monthLength  number of day in month
 *
 * @return  {object}               date instances of the first and last days of month, and nbr of rows to display
 */
export const dayOfWeek = (year, month, monthLength) => {
  let startMonth = new Date(year, month, 1)
  let endMonth = new Date(year, month, monthLength)
  const nbrOfRows = rows(startMonth, endMonth, monthLength)
  return { startMonth, endMonth, nbrOfRows }
}

/**
 * 5 identified specific cases when month don't have 5 week rows but 4 or 6 (ex: fev2020 (5), fev2026 (4), fev2032 (5), july2022 (6) and oct2022 (6))
 *
 * @param   {object}  startMonth   date instance of the first day of month
 * @param   {object}  endMonth     date instance of the last day of month
 * @param   {number}  monthLength  number of day in month
 *
 * @return  {number}               number of rows to display in calendar
 */
const rows = (startMonth, endMonth, monthLength) => {
  if (
    (endMonth.getDay() === 0 && endMonth.getDate() === 31) ||
    (startMonth.getDay() === 6 &&
      startMonth.getDate() === 1 &&
      monthLength > 29)
  ) {
    return 6
  } else if (
    startMonth.getDate() === 1 &&
    startMonth.getDay() === 0 &&
    monthLength === 28
  ) {
    return 4
  } else {
    return 5
  }
}

/**
 * determine number of days in the selected month, including leap years
 *
 * @param   {number}  year   year description
 * @param   {number}  month  month description
 *
 * @return  {number}         number of day in month
 */
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

/**
 * convert date to mm/dd/yyy format
 *
 * @param   {object}  date  date instance
 *
 * @return  {[type]}        converted date
 */
export const formatUTCDate = (date) => {
  const formatDate =
    `${(date.getUTCMonth() + 1).toLocaleString('en-US', {
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
