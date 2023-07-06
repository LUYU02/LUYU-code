let filters = {
  toFix2: function (value) {
    return parseFloat(value).toFixed(2)//此处2为保留两位小数
  },
  toFix1: function (value) {
    return parseFloat(value).toFixed(1)//此处1为保留一位小数
  },
  toFix: function (value) {
    return parseFloat(value).toFixed(0)//此处0为取整数
  }
}
module.exports = {
  toFix2: filters.toFix2,
  toFix1: filters.toFix1,
  toFix: filters.toFix
}
