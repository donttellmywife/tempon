export function format(uglyDate) {
  // split string like `Sun Feb 24 2019 08:49:57 GMT+0200 (Eastern European Standard Time)` by time, and take only first two parts
  const [date, time] = new Date(uglyDate).toString().split(/(\d+:\d+:\d+)/)
  return [date, time].join('')
}

export default {
  formatDate: format,
}
