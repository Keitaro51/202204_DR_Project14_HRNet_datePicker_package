//TODO make same thing with new Intl.DateTimeFormat(undefined, {month: 'long',} ?
export const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
]

export const dayOfWeek = (year, month, monthLength) => {
  let startDay = new Date(year, month, 1)
  let endDay = new Date(year, month, monthLength)

  let firstWeekDay = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
  }).format(startDay)

  let lastWeekDay = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
  }).format(endDay)

  return { firstWeekDay, lastWeekDay }
}

export const getNumberOfDays = (year, month) => {
  const monthStart = new Date(year, month, 1)
  const monthEnd = new Date(year, month + 1, 1)
  const monthLength = Math.round(
    (monthEnd - monthStart) / (1000 * 60 * 60 * 24)
  )
  return monthLength
}

//alternative
// export const getNumberOfDays = (year, month) => {
//   var isLeap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
//   return [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
// }
