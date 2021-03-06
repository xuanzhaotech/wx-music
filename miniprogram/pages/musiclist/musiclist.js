// pages/musiclist/musiclist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musiclist: [], //当前歌单的歌曲列表
    listInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { // options 参数为链接上面的参数
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        $url: 'musiclist',
        playlistId: options.playlistId
      }
    }).then((res) => {
      const pl = res.result.playlist
      this.setData({
        musiclist: pl.tracks,
        listInfo: {
          coverImgUrl: pl.coverImgUrl,
          name: pl.name
        }
      })
      this._setMusiclist()
      wx.hideLoading()
    })
  },

  _setMusiclist() {
    // 本地存储
    wx.setStorageSync('musiclist', this.data.musiclist)
  }
})