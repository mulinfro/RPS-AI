Page({

  gameinfo: function () {
    wx.navigateTo({
      //目的页面地址
      url: '../../pages/index/about',
      success: function (res) { }
    });
  },

  game_easy: function() {
    wx.navigateTo({
      //目的页面地址
      url: '../../pages/index/index?level=1',
      success: function (res) { }
    });
  },

  game_hard: function() {
    wx.navigateTo({
      //目的页面地址
      url: '../../pages/index/index?level=2',
      success: function (res) { }
    });
  },


  onShareAppMessage: function (res) {
    return {
      title: '石头剪刀布，你赢得了AI吗？',
      path: '/pages/start/start',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

});