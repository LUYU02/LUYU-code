const app = getApp()

Page({
  data: {
    // 滑动比例计算
    slideWidth: '', //滑块宽
    slideLeft: 0, //滑块位置
    totalLength: '', //当前滚动列表总长
    slideShow: false, //滑块是否显示
    slideRatio: '', //滑块比例
    // 渲染数据
    dataList: [{
        text: '第1块'
      },{
        text: '第2块'
      }, {
        text: '第3块'
      },{
        text: '第4块'
      },{
        text: '第5块'
      },{
        text: '第6块'
      }],
  },
  onLoad: function () {
    // 这里是获取视口口宽度
    var systemInfo = wx.getSystemInfoSync();
    this.setData({
      windowWidth: systemInfo.windowWidth, // 320
    })
    this.getRatio()
  },
  getRatio() {
    if (this.data.dataList.length < 4) {
      this.setData({
        slideShow: false
      })
    } else {
      var _totalLength = this.data.dataList.length * 173; //分类列表总长度
      var _ratio = 80 / _totalLength * (750 / this.data.windowWidth); //滚动列表长度与滑条长度比例
      var _showLength = 750 / _totalLength * 80; //当前显示蓝色滑条的长度(保留两位小数)
      this.setData({
        slideWidth: _showLength,
        totalLength: _totalLength,
        slideShow: true,
        slideRatio: _ratio
      })
    }
  },
  //slideLeft动态变化
  getleft(e) {
    this.setData({
      slideLeft: e.detail.scrollLeft * this.data.slideRatio
    })
  },

})
