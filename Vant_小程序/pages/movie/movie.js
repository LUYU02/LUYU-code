// pages/movie/movie.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    list1: [],
    list2: [],
    pageNum: 1,
    cityId: 440300,
  },
  gotoinfo(event) {
    console.log(event);
    const ids = event.target.dataset.ids;
    const id = event.currentTarget.dataset.ite;
    const list = this.data.list2;

    if (ids != null || ids == 2) {
      wx.navigateTo({
        url: "../cinemadata/cinemadata",
      });
    } else {
      if (list.length > 0) {
        wx.navigateTo({
          url: "../movies_info/movies_info?id=" + id,
        });
      } else {
        wx.showLoading({
          title: "加载中",
        });
      }
    }
  },
  // 正在热映的预购页面
  goInfo(event) {
    // console.log(event);
    const ids = event.target.dataset.id;
    const id = event.currentTarget.dataset.id;
    const list = this.data.list1;
    if (ids != null || ids) {
      wx.navigateTo({
        // 跳转到购买页面
        url: `../cinemadata/cinemadata?ids=${ids}`,
      });
    } else {
      if (list.length > 0) {
        wx.navigateTo({
          // 电影详情页面
          url: `../movies_info/movies_info?id=${id}&name=${"小江"}`,
        });
      } else {
        wx.showLoading({
          title: "加载中...",
        });
      }
    }
  },
  onClick(event) {
    console.log(event.detail.index);
    const index = event.detail.index;
    const data1 = this.data.list1;
    const data2 = this.data.list2;
    if (index == 0) {
      if (data1.length <= 0) {
        wx.showLoading({
          title: "加载中",
        });
        this.gethot();
        wx.hideLoading();
      } else {
        wx.showToast({
          title: "成功",
        });
      }
    }
    if (index === 1) {
      console.log(data2);
      if (data2.length <= 0) {
        wx.showLoading({
          title: "加载中",
        });
        this.getsoon();
        wx.hideLoading();
      } else {
        wx.showToast({
          title: "成功",
        });
      }
    }
  },
  // 获取正在热映的接口
  gethot() {
    wx.request({
      url: "http://www.young1024.com:1234/hot",
      data: {
        pageNum: this.data.pageNum,
        cityId: this.data.cityId,
      },
      success: (res) => {
        const data = res.data;
        if (data.status == 0) {
          // 分页处理：判断当前页数是否要大于请求过来的页数，
          const maxPage = Math.ceil(data.data.total / 10);
          if (this.data.pageNum < maxPage) {
            this.data.pageNum++;
          } else {
            wx.showToast({
              title: "没有更多了",
            });
          }
          // 拼接两个数组，进行交换
          this.data.list1 = this.data.list1.concat(data.data.films);
          // 。。。是展开运算符
          this.data.list1 = [...this.data.list1, ...data.data.films];
          this.setData({
            list1: this.data.list1,
          });
        }
      },
      fail: (err) => {
        const data = err.data;
        // console.log(err);
        wx.showToast({
          title: data.msg,
        });
      },
    });
  },
  getsoon() {
    wx.request({
      url: "http://www.young1024.com:1234/soon",
      method: "GET",
      success: (res) => {
        console.log(res);
        const data = res.data;
        if (data.status == 0) {
          this.setData({
            list2: data.data.films,
          });
        }
      },
      fail: (err) => {
        console.log(err);
        wx.showToast({
          title: "请求失败",
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 通过监听第一次进来的页面来进行发送请求
    const data1 = this.data.list1;
    const data2 = this.data.list2;
    const index = this.data.active;
    if (index == 0 || data1 == null) {
      wx.showLoading({
        title: "加载中",
      });
      this.gethot();
      wx.hideLoading();
    }
    if (index == 1 && data2 == null) {
      wx.showLoading({
        title: "加载中",
      });
      this.getsoon();
      wx.hideLoading();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
