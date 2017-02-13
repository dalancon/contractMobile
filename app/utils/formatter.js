import numeral from 'numeral'
import moment from 'moment'

export default {
  // 将数字转换为钱的字符形式
  formatMoney (value) {
    return numeral(value).format('000,000.00')
  },

  // 将UTC式时间转换为年月日的格式
  formatTime (value) {
    value = moment(parseInt(value))
    return value.format('YYYY-MM-DD HH:mm:ss')
  },

  // 将数字转换为百分比的字符形式(保留两位小数)
  formatPercent (value) {
    value *= 100
    value = value.toFixed(2)
    return value + '%'
  },

  formatQty (value) {
    return numeral(value).format('000')
  },

  // 将UTC式日期转换为年月日的格式
  formatDate (value) {
    value = moment(parseInt(value))
    return value.format('YYYY-MM-DD')
  },

  // 格式化字符串工具
  formatString (s) {
    var args = arguments
    return args[0].replace(/\{(\d+)\}/g, function (s, i) {
      return args[parseInt(i) + 1]
    })
  }
}
