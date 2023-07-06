// pages/cinema/cinema.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 首先拿到data当中的数组数据
        const list  = this.data.list;
  // 根据data当中的数组，来判断数组长度是否要小于等于0，如果等于0代表没有数据，我就需要发送请求，如果有长度，我就不需要发送请求
      if(list.length<=0){
          wx.request({
            url: 'http://www.young1024.com:1234/cinemaList',
            success:res=>{
              if(res.data.status==0){
                    this.setData({
                      list:res.data.data.cinemas
                    })
              }
            },
            fail:err=>{
              console.log(err);
            }
          })
      }
      else{
        wx.showToast({
          title: '成功',
        })
      }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
          console.log('xiala');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
        console.log('111111');
        if(this.data.list.length>0||this.data.list.length<this.data.list.length){
          wx.showToast({
            title: '没有更多了',
          })
          wx.hideLoading()
        }
        else{
          wx.showLoading({
            title: '网络较慢请耐心等候',
          })
        }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})