export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  getRandomColor,
  padNum,
  getDayName,
  getMonthName,
  saveToStorage,
  loadFromStorage,
  formatDate,
  getRelativeTime,
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function padNum(num) {
  return num > 9 ? num + '' : '0' + num
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  var color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getDayName(date, locale) {
  date = new Date(date)
  return date.toLocaleDateString(locale, { weekday: 'long' })
}

function getMonthName(date) {
  const monthNames = [
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
  return monthNames[date.getMonth()]
}

function formatDate(timeStamp) {
  const date = new Date(timeStamp)
  return date.toLocaleDateString()
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}

function getRelativeTime(timestamp) {
  const now = new Date()
  const diff = now - timestamp
  const oneHour = 60 * 60 * 1000
  const oneDay = 24 * oneHour
  const oneWeek = 7 * oneDay

  if (diff < oneDay) {
    // Less than 24 hours ago
    const hours = Math.floor(diff / oneHour)
    const minutes = Math.floor((diff % oneHour) / (60 * 1000))
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`
  } else if (diff < oneWeek) {
    // Less than a week ago
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    const dayIndex = timestamp.getDay()
    return days[dayIndex]
  } else {
    // Older than a week
    const year = timestamp.getFullYear()
    const month = (timestamp.getMonth() + 1).toString().padStart(2, '0')
    const day = timestamp.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}
