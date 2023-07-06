// pages/movie_info/movie_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      info:{}
  },
// 全部演职人员的事件
  go_actors(event){
    console.log(event);
    const info = event.currentTarget.dataset.id

  wx.navigateTo({
    url: '../info/info?info='+info,
  })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      console.log(options);
      const id = options.id
      wx.request({
        url: 'http://www.young1024.com:1234/filmInfo',
        data:{
          filmId:id
        },
        success:res=>{
          console.log(res);
          const code = res.data.status
          if(code==1001){
            wx.showToast({
              title: res.data.msg,
            })
          }
          if(code==0){
            this.setData({
              info:res.data.data.film
            })
          }
          if(code==500){
            wx.showToast({
              title:res.data.msg
            })
          }
        },
        fail:err=>{
          console.log(err);
        }
      })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})