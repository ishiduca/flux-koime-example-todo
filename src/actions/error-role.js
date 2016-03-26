module.exports = {
    error: function (err) {
        this.push('error', err)
    }
  , off: function () {
        this.push('off', null)
    }
}
