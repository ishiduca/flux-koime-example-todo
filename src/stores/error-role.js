module.exports = {
    error: function (err, done) {
        console.error(err)
        done(null, (this.opt.error = err))
    }
  , off: function (payload, done) {
        this.opt.error = null
        done(null, {/*dummy*/})
    }
}
